import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiKey = Deno.env.get('OPENAI_API_KEY') || 'demo-key';
const resendKey = Deno.env.get('RESEND_API_KEY') || 'demo-key';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface EmailTemplate {
  name: string;
  subject: string;
  content: string;
  stage: string;
  industry: string;
}

// Templates de email personalizados por indústria e estágio
const emailTemplates: EmailTemplate[] = [
  {
    name: 'health_supplements_initial',
    subject: '🏆 Premium {product_name} - American Quality at Competitive Prices',
    stage: 'initial_contact',
    industry: 'health_supplements',
    content: `Dear {contact_person},

I hope this email finds you well. I am reaching out from {company_name}, a leading American distributor specializing in premium health supplements with a proven track record of delivering exceptional value to partners worldwide.

I noticed {buyer_company}'s reputation in the {industry} sector and believe we have an outstanding opportunity that aligns perfectly with your procurement goals:

🏆 **PREMIUM {product_name}**
• Pharmaceutical-grade quality with full FDA compliance
• Third-party tested for purity and potency (COAs available)
• Manufactured in state-of-the-art US facilities
• Competitive wholesale pricing: \${price_per_unit}/unit
• Immediate availability from multiple US warehouses
• Complete dropshipping and fulfillment support

**EXCLUSIVE BENEFITS FOR {buyer_company}:**
✅ Volume discounts up to 25% for orders over {minimum_volume} units
✅ Flexible payment terms (Net 30/45 for qualified accounts)
✅ Free samples and comprehensive product documentation
✅ Dedicated account management and technical support
✅ Private labeling options available
✅ Same-day processing with 1-3 day shipping nationwide

Given your monthly requirement of {order_volume} and budget range of {budget_range}, we can structure a strategic partnership that delivers significant cost savings and supply chain advantages.

**NEXT STEPS:**
I'd love to schedule a brief 15-minute call this week to discuss:
- Your specific quality requirements and certifications needed
- Volume pricing tiers and payment terms
- Sample shipping and trial order process
- Long-term partnership opportunities

Are you available for a quick call on {proposed_date} at {proposed_time}? I'm confident we can provide exceptional value for {buyer_company}'s expansion goals.

Best regards,
{sales_person_name}
{title}
{company_name}
Direct: {phone_number}
Email: {email}
Website: {company_website}

P.S. We're currently offering a limited-time 15% discount for new partners who place their first order before {deadline}. I'd hate for {buyer_company} to miss this opportunity!`
  },
  {
    name: 'health_supplements_follow_up_1',
    subject: 'Re: Premium {product_name} Partnership - Quick Question',
    stage: 'follow_up_1',
    industry: 'health_supplements',
    content: `Hi {contact_person},

I wanted to follow up on my email from {days_ago} days ago regarding our premium {product_name} opportunity for {buyer_company}.

I understand you're likely evaluating multiple suppliers, so I wanted to share a quick case study that might be relevant:

**SUCCESS STORY:**
One of our partners, {similar_company} (similar size to {buyer_company}), increased their margins by 35% and reduced their procurement costs by $125K annually after switching to our supply chain.

**KEY RESULTS:**
• Faster fulfillment (2-3 days vs their previous 7-10 days)
• Zero quality issues in 18 months of partnership
• Streamlined ordering through our automated system
• Dedicated support team handling all logistics

**QUICK QUESTION:**
What's the biggest challenge you're currently facing with your existing {product_category} suppliers? 

Based on your answer, I can provide specific solutions and potentially arrange a brief demo of our fulfillment system.

Also, that 15% new partner discount expires in {days_remaining} days - would you like me to reserve pricing for {buyer_company}?

Best regards,
{sales_person_name}
{phone_number} | {email}`
  },
  {
    name: 'health_supplements_follow_up_2',
    subject: '⏰ Last Call: {product_name} Partnership Opportunity',
    stage: 'follow_up_2',
    industry: 'health_supplements',
    content: `{contact_person},

I hope you're doing well. This is my final follow-up regarding the {product_name} partnership opportunity for {buyer_company}.

**WHAT WE'VE OFFERED:**
✅ Premium US-manufactured {product_name}
✅ Competitive pricing at \${price_per_unit}/unit
✅ 15% new partner discount (expires tomorrow)
✅ Net 30 payment terms
✅ Complete dropshipping support

**THE NUMBERS:**
If {buyer_company} processes {order_volume} monthly as indicated:
• Annual savings: ~\${annual_savings}
• Profit improvement: {margin_improvement}%
• ROI on partnership: {roi_percentage}%

**FINAL OPPORTUNITY:**
I can extend the 15% discount for 48 more hours if you're interested in moving forward. After that, we'll move to standard pricing.

**YES or NO?**
Simply reply with:
• "YES" - I'll send contract and samples immediately
• "NO" - I'll remove you from follow-ups (no hard feelings!)
• "MORE INFO" - I'll call you directly

Either way, I appreciate your time and consideration.

Best regards,
{sales_person_name}
Direct Line: {phone_number}

*This offer expires in 48 hours*`
  }
];

// Gerar emails personalizados com IA
async function generatePersonalizedEmail(buyer: any, opportunity: any, template: EmailTemplate): Promise<string> {
  const prompt = `
Personalize this B2B sales email template for a health supplements company selling to international buyers.

BUYER INFORMATION:
- Company: ${buyer.company_name}
- Contact: ${buyer.contact_person}
- Country: ${buyer.country}
- Industry: ${buyer.industry}
- Order Volume: ${buyer.order_volume}
- Budget: ${buyer.budget_range}
- Timeline: ${buyer.timeline}
- Company Size: ${buyer.company_size}
- Decision Level: ${buyer.decision_maker_level}

PRODUCT OPPORTUNITY:
- Product: ${opportunity.product_name}
- Category: ${opportunity.product_category}
- Value: $${opportunity.estimated_value}
- Margin: ${opportunity.margin_percentage}%

EMAIL TEMPLATE:
${template.content}

PERSONALIZATION INSTRUCTIONS:
1. Replace all {variables} with appropriate content
2. Adjust tone based on buyer's decision maker level (high = formal, medium = professional, low = casual)
3. Customize benefits based on company size and country
4. Include relevant regulatory mentions (FDA for US, EU regulations for Europe, etc.)
5. Make pricing and terms specific and compelling
6. Add urgency appropriate for their timeline
7. Keep it professional but engaging
8. Ensure compliance with international trade terminology

Return ONLY the personalized email content, ready to send.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.7
      }),
    });

    const aiData = await response.json();
    return aiData.choices[0].message.content;
  } catch (error) {
    console.error('AI personalization error:', error);
    return template.content; // Fallback to template
  }
}

// Enviar email via Resend
async function sendEmailViaResend(to: string, subject: string, content: string, buyerCompany: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rafael Rodrigues <contact@globalsupplements.site>',
        to: [to],
        subject: subject,
        html: content.replace(/\n/g, '<br>'),
        text: content,
        tags: [
          { name: 'campaign', value: 'b2b_outreach' },
          { name: 'buyer_company', value: buyerCompany },
          { name: 'automation', value: 'true' }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return false;
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.id);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Sequência de follow-up automática
async function scheduleFollowUp(negotiationId: string, stage: string, days: number): Promise<void> {
  const followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + days);

  await supabase
    .from('email_sequences')
    .insert({
      negotiation_id: negotiationId,
      stage: stage,
      scheduled_for: followUpDate.toISOString(),
      status: 'scheduled'
    });
}

// Trackear engagement
async function trackEmailEngagement(negotiationId: string, action: string, details: any): Promise<void> {
  await supabase
    .from('email_analytics')
    .insert({
      negotiation_id: negotiationId,
      action: action,
      details: details,
      timestamp: new Date().toISOString()
    });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, buyer_id, negotiation_id, email_type, stage } = await req.json();

    let result;

    switch (action) {
      case 'send_initial_email':
        result = await sendInitialEmail(buyer_id);
        break;
      case 'send_follow_up':
        result = await sendFollowUpEmail(negotiation_id, stage);
        break;
      case 'process_scheduled_emails':
        result = await processScheduledEmails();
        break;
      case 'track_engagement':
        result = await trackEmailEngagement(negotiation_id, email_type, req.body);
        break;
      case 'get_email_analytics':
        result = await getEmailAnalytics();
        break;
      default:
        throw new Error('Invalid action');
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Email Automation Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function sendInitialEmail(buyerId: string) {
  // Buscar dados do comprador
  const { data: buyer } = await supabase
    .from('b2b_buyers')
    .select('*')
    .eq('id', buyerId)
    .single();

  if (!buyer) throw new Error('Buyer not found');

  // Buscar oportunidade relacionada
  const { data: opportunity } = await supabase
    .from('opportunities')
    .select('*')
    .eq('status', 'approved')
    .limit(1)
    .single();

  if (!opportunity) throw new Error('No opportunities available');

  // Selecionar template baseado na indústria
  const template = emailTemplates.find(t => 
    t.industry === buyer.industry?.toLowerCase() || t.industry === 'health_supplements'
  ) || emailTemplates[0];

  // Gerar email personalizado
  const personalizedContent = await generatePersonalizedEmail(buyer, opportunity, template);
  const personalizedSubject = template.subject
    .replace('{product_name}', opportunity.product_name)
    .replace('{buyer_company}', buyer.company_name);

  // Enviar email
  const emailSent = await sendEmailViaResend(
    buyer.email,
    personalizedSubject,
    personalizedContent,
    buyer.company_name
  );

  if (emailSent) {
    // Criar/atualizar negociação
    const { data: negotiation } = await supabase
      .from('negotiations')
      .upsert({
        buyer_company: buyer.company_name,
        opportunity_id: opportunity.id,
        contact_email: buyer.email,
        email_content: personalizedContent,
        status: 'sent',
        negotiation_stage: 'initial_contact',
        success_probability: buyer.lead_score,
        last_contact_date: new Date().toISOString()
      })
      .select()
      .single();

    // Agendar follow-up
    if (negotiation) {
      await scheduleFollowUp(negotiation.id, 'follow_up_1', 3); // 3 dias
      await scheduleFollowUp(negotiation.id, 'follow_up_2', 7); // 7 dias
    }

    // Track envio
    await trackEmailEngagement(negotiation?.id || 'unknown', 'sent', {
      template: template.name,
      buyer_company: buyer.company_name,
      subject: personalizedSubject
    });

    return { 
      email_sent: true, 
      negotiation_id: negotiation?.id,
      template_used: template.name,
      scheduled_followups: 2
    };
  }

  return { email_sent: false };
}

async function sendFollowUpEmail(negotiationId: string, stage: string) {
  // Buscar negociação
  const { data: negotiation } = await supabase
    .from('negotiations')
    .select('*, b2b_buyers(*), opportunities(*)')
    .eq('id', negotiationId)
    .single();

  if (!negotiation) throw new Error('Negotiation not found');

  // Selecionar template de follow-up
  const template = emailTemplates.find(t => t.stage === stage) || emailTemplates[1];

  // Gerar email personalizado
  const personalizedContent = await generatePersonalizedEmail(
    negotiation.b2b_buyers, 
    negotiation.opportunities, 
    template
  );

  const personalizedSubject = template.subject
    .replace('{product_name}', negotiation.opportunities.product_name)
    .replace('{buyer_company}', negotiation.buyer_company);

  // Enviar email
  const emailSent = await sendEmailViaResend(
    negotiation.contact_email,
    personalizedSubject,
    personalizedContent,
    negotiation.buyer_company
  );

  if (emailSent) {
    // Atualizar negociação
    await supabase
      .from('negotiations')
      .update({
        negotiation_stage: stage,
        last_contact_date: new Date().toISOString(),
        email_content: personalizedContent
      })
      .eq('id', negotiationId);

    // Track follow-up
    await trackEmailEngagement(negotiationId, 'follow_up_sent', {
      stage: stage,
      template: template.name
    });

    return { 
      follow_up_sent: true, 
      stage: stage,
      template_used: template.name
    };
  }

  return { follow_up_sent: false };
}

async function processScheduledEmails() {
  const now = new Date().toISOString();
  
  // Buscar emails agendados
  const { data: scheduledEmails } = await supabase
    .from('email_sequences')
    .select('*')
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)
    .limit(50);

  if (!scheduledEmails || scheduledEmails.length === 0) {
    return { processed: 0 };
  }

  let processed = 0;
  for (const email of scheduledEmails) {
    try {
      await sendFollowUpEmail(email.negotiation_id, email.stage);
      
      // Marcar como enviado
      await supabase
        .from('email_sequences')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', email.id);
      
      processed++;
    } catch (error) {
      console.error(`Failed to send scheduled email ${email.id}:`, error);
      
      // Marcar como falhado
      await supabase
        .from('email_sequences')
        .update({ 
          status: 'failed', 
          error_message: error instanceof Error ? error.message : 'Unknown error'
        })
        .eq('id', email.id);
    }
  }

  return { processed };
}

async function getEmailAnalytics() {
  // Estatísticas gerais
  const { data: totalSent } = await supabase
    .from('email_analytics')
    .select('*', { count: 'exact' })
    .eq('action', 'sent');

  const { data: responses } = await supabase
    .from('email_analytics')
    .select('*', { count: 'exact' })
    .eq('action', 'response_received');

  const { data: meetings } = await supabase
    .from('email_analytics')
    .select('*', { count: 'exact' })
    .eq('action', 'meeting_scheduled');

  return {
    total_sent: totalSent?.length || 0,
    responses_received: responses?.length || 0,
    meetings_scheduled: meetings?.length || 0,
    response_rate: totalSent?.length ? ((responses?.length || 0) / totalSent.length * 100).toFixed(1) : 0,
    meeting_rate: totalSent?.length ? ((meetings?.length || 0) / totalSent.length * 100).toFixed(1) : 0
  };
}