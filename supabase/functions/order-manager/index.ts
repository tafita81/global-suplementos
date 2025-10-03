import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, opportunity_id, supplier_id, quantity } = await req.json();

    let result;

    switch (action) {
      case 'create_order':
        result = await createOrder(opportunity_id, supplier_id, quantity);
        break;
      case 'get_orders':
        result = await getOrders();
        break;
      case 'update_order_status':
        const { order_id, status } = await req.json();
        result = await updateOrderStatus(order_id, status);
        break;
      case 'get_order_analytics':
        result = await getOrderAnalytics();
        break;
      default:
        throw new Error('Invalid action');
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Order Manager Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function createOrder(opportunity_id: string, supplier_id: string, quantity: number) {
  // Get opportunity and supplier details
  const { data: opportunity } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', opportunity_id)
    .single();

  const { data: supplier } = await supabase
    .from('suppliers')
    .select('*')
    .eq('id', supplier_id)
    .single();

  const { data: opportunitySupplier } = await supabase
    .from('opportunity_suppliers')
    .select('*')
    .eq('opportunity_id', opportunity_id)
    .eq('supplier_id', supplier_id)
    .single();

  if (!opportunity || !supplier || !opportunitySupplier) {
    throw new Error('Invalid opportunity or supplier');
  }

  const unit_price = opportunitySupplier.quoted_price;
  const total_amount = quantity * unit_price;
  const profit_margin = ((opportunity.estimated_value - unit_price) / opportunity.estimated_value) * 100;

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      opportunity_id,
      supplier_id,
      quantity,
      unit_price,
      total_amount,
      profit_margin,
      status: 'pending',
      payment_status: 'pending',
      tracking_info: {
        carrier: supplier.country === 'China' ? 'DHL Express' : 'FedEx',
        estimated_delivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      notes: `Automated order created for ${opportunity.product_name}`
    })
    .select()
    .single();

  if (error) throw error;

  // Log execution
  await supabase
    .from('execution_history')
    .insert({
      entity_type: 'order',
      entity_id: order.id,
      action_type: 'order_created',
      action_details: {
        opportunity: opportunity.product_name,
        supplier: supplier.name,
        amount: total_amount
      },
      execution_status: 'completed',
      result_data: { success: true, order_id: order.id }
    });

  // Create notification
  await supabase
    .from('notifications')
    .insert({
      notification_type: 'order_created',
      title: 'New Order Created',
      message: `Order for ${opportunity.product_name} from ${supplier.name} created successfully`,
      priority: 'medium',
      entity_type: 'order',
      entity_id: order.id,
      action_required: false
    });

  return order;
}

async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      opportunities(product_name, source),
      suppliers(name, country)
    `)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data;
}

async function updateOrderStatus(order_id: string, status: string) {
  const { data: order, error } = await supabase
    .from('orders')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', order_id)
    .select()
    .single();

  if (error) throw error;

  // Log status change
  await supabase
    .from('execution_history')
    .insert({
      entity_type: 'order',
      entity_id: order_id,
      action_type: 'status_updated',
      action_details: { new_status: status },
      execution_status: 'completed',
      result_data: { success: true }
    });

  return order;
}

async function getOrderAnalytics() {
  const { data: orderStats } = await supabase
    .from('orders')
    .select('status, total_amount, profit_margin, payment_status');

  const analytics = {
    total_orders: orderStats?.length || 0,
    total_revenue: orderStats?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0,
    average_margin: orderStats && orderStats.length > 0 
      ? orderStats.reduce((sum, order) => sum + (Number(order.profit_margin) || 0), 0) / orderStats.length
      : 0,
    status_breakdown: orderStats?.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {},
    payment_status_breakdown: orderStats?.reduce((acc, order) => {
      acc[order.payment_status] = (acc[order.payment_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {}
  };

  return analytics;
}