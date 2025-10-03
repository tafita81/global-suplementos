export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_agent_logs: {
        Row: {
          action: string
          agent_type: string
          ein_number: string
          id: string
          payload: Json | null
          result: Json | null
          status: string
          timestamp: string
        }
        Insert: {
          action: string
          agent_type: string
          ein_number: string
          id?: string
          payload?: Json | null
          result?: Json | null
          status?: string
          timestamp?: string
        }
        Update: {
          action?: string
          agent_type?: string
          ein_number?: string
          id?: string
          payload?: Json | null
          result?: Json | null
          status?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_logs_ein_number_fkey"
            columns: ["ein_number"]
            isOneToOne: false
            referencedRelation: "company_memory"
            referencedColumns: ["ein_number"]
          },
        ]
      }
      ai_configs: {
        Row: {
          active: boolean | null
          config: Json
          created_at: string
          id: string
          last_learning: string | null
          module_name: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          config: Json
          created_at?: string
          id?: string
          last_learning?: string | null
          module_name: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          config?: Json
          created_at?: string
          id?: string
          last_learning?: string | null
          module_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          campaigns_launched: number | null
          completed_at: string | null
          emails_sent: number | null
          execution_data: Json | null
          execution_type: string
          id: string
          started_at: string | null
          status: string | null
          success_rate: number | null
          suppliers_found: number | null
          target_categories: string[] | null
          target_countries: string[] | null
        }
        Insert: {
          campaigns_launched?: number | null
          completed_at?: string | null
          emails_sent?: number | null
          execution_data?: Json | null
          execution_type: string
          id?: string
          started_at?: string | null
          status?: string | null
          success_rate?: number | null
          suppliers_found?: number | null
          target_categories?: string[] | null
          target_countries?: string[] | null
        }
        Update: {
          campaigns_launched?: number | null
          completed_at?: string | null
          emails_sent?: number | null
          execution_data?: Json | null
          execution_type?: string
          id?: string
          started_at?: string | null
          status?: string | null
          success_rate?: number | null
          suppliers_found?: number | null
          target_categories?: string[] | null
          target_countries?: string[] | null
        }
        Relationships: []
      }
      b2b_buyers: {
        Row: {
          budget_range: string | null
          buying_history: Json | null
          company_name: string
          company_size: string | null
          contact_person: string | null
          country: string | null
          created_at: string
          decision_maker_level: string | null
          email: string | null
          id: string
          industry: string | null
          lead_score: number | null
          order_volume: string | null
          phone: string | null
          platform: string
          product_needs: string[] | null
          status: string | null
          timeline: string | null
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          buying_history?: Json | null
          company_name: string
          company_size?: string | null
          contact_person?: string | null
          country?: string | null
          created_at?: string
          decision_maker_level?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          lead_score?: number | null
          order_volume?: string | null
          phone?: string | null
          platform: string
          product_needs?: string[] | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          buying_history?: Json | null
          company_name?: string
          company_size?: string | null
          contact_person?: string | null
          country?: string | null
          created_at?: string
          decision_maker_level?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          lead_score?: number | null
          order_volume?: string | null
          phone?: string | null
          platform?: string
          product_needs?: string[] | null
          status?: string | null
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_documents: {
        Row: {
          auto_use_for: Json | null
          content_type: string | null
          created_at: string
          document_name: string
          document_type: string
          ein_number: string
          file_path: string
          file_size: number | null
          id: string
          priority: number | null
          updated_at: string
          uploaded_at: string
          usage_instructions: string | null
        }
        Insert: {
          auto_use_for?: Json | null
          content_type?: string | null
          created_at?: string
          document_name: string
          document_type: string
          ein_number: string
          file_path: string
          file_size?: number | null
          id?: string
          priority?: number | null
          updated_at?: string
          uploaded_at?: string
          usage_instructions?: string | null
        }
        Update: {
          auto_use_for?: Json | null
          content_type?: string | null
          created_at?: string
          document_name?: string
          document_type?: string
          ein_number?: string
          file_path?: string
          file_size?: number | null
          id?: string
          priority?: number | null
          updated_at?: string
          uploaded_at?: string
          usage_instructions?: string | null
        }
        Relationships: []
      }
      company_memory: {
        Row: {
          ai_learning_data: Json | null
          company_data: Json
          created_at: string
          ein_number: string
          id: string
          last_updated: string
        }
        Insert: {
          ai_learning_data?: Json | null
          company_data: Json
          created_at?: string
          ein_number: string
          id?: string
          last_updated?: string
        }
        Update: {
          ai_learning_data?: Json | null
          company_data?: Json
          created_at?: string
          ein_number?: string
          id?: string
          last_updated?: string
        }
        Relationships: []
      }
      compliance_checks: {
        Row: {
          check_type: string
          created_at: string
          id: string
          opportunity_id: string | null
          result: Json | null
          status: string
        }
        Insert: {
          check_type: string
          created_at?: string
          id?: string
          opportunity_id?: string | null
          result?: Json | null
          status?: string
        }
        Update: {
          check_type?: string
          created_at?: string
          id?: string
          opportunity_id?: string | null
          result?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_checks_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      distributor_campaigns: {
        Row: {
          campaign_type: string
          created_at: string
          cultural_strategy: Json | null
          current_stage: number | null
          deal_status: string | null
          deal_value: number | null
          email_sequence: Json | null
          expected_timeline: string | null
          id: string
          next_email_date: string | null
          opened_count: number | null
          replied_count: number | null
          response_content: string | null
          response_received: boolean | null
          status: string | null
          success_probability: number | null
          supplier_id: string | null
          total_emails_sent: number | null
          updated_at: string
        }
        Insert: {
          campaign_type: string
          created_at?: string
          cultural_strategy?: Json | null
          current_stage?: number | null
          deal_status?: string | null
          deal_value?: number | null
          email_sequence?: Json | null
          expected_timeline?: string | null
          id?: string
          next_email_date?: string | null
          opened_count?: number | null
          replied_count?: number | null
          response_content?: string | null
          response_received?: boolean | null
          status?: string | null
          success_probability?: number | null
          supplier_id?: string | null
          total_emails_sent?: number | null
          updated_at?: string
        }
        Update: {
          campaign_type?: string
          created_at?: string
          cultural_strategy?: Json | null
          current_stage?: number | null
          deal_status?: string | null
          deal_value?: number | null
          email_sequence?: Json | null
          expected_timeline?: string | null
          id?: string
          next_email_date?: string | null
          opened_count?: number | null
          replied_count?: number | null
          response_content?: string | null
          response_received?: boolean | null
          status?: string | null
          success_probability?: number | null
          supplier_id?: string | null
          total_emails_sent?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "distributor_campaigns_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "target_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      dropship_partners: {
        Row: {
          active: boolean | null
          api_credentials: Json | null
          commission_rate: number | null
          contact_info: Json | null
          country: string
          coverage_notes: string | null
          created_at: string
          fulfillment_time_days: number | null
          id: string
          integration_status: string | null
          language_support: string[] | null
          minimum_order_value: number | null
          partner_name: string
          payment_methods: string[] | null
          rating: number | null
          regulatory_certifications: string[] | null
          shipping_zones: string[] | null
          specialties: string[] | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          api_credentials?: Json | null
          commission_rate?: number | null
          contact_info?: Json | null
          country: string
          coverage_notes?: string | null
          created_at?: string
          fulfillment_time_days?: number | null
          id?: string
          integration_status?: string | null
          language_support?: string[] | null
          minimum_order_value?: number | null
          partner_name: string
          payment_methods?: string[] | null
          rating?: number | null
          regulatory_certifications?: string[] | null
          shipping_zones?: string[] | null
          specialties?: string[] | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          api_credentials?: Json | null
          commission_rate?: number | null
          contact_info?: Json | null
          country?: string
          coverage_notes?: string | null
          created_at?: string
          fulfillment_time_days?: number | null
          id?: string
          integration_status?: string | null
          language_support?: string[] | null
          minimum_order_value?: number | null
          partner_name?: string
          payment_methods?: string[] | null
          rating?: number | null
          regulatory_certifications?: string[] | null
          shipping_zones?: string[] | null
          specialties?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      email_analytics: {
        Row: {
          action: string
          details: Json | null
          id: string
          ip_address: string | null
          negotiation_id: string | null
          timestamp: string
          user_agent: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          negotiation_id?: string | null
          timestamp?: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          negotiation_id?: string | null
          timestamp?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_analytics_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequences: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          negotiation_id: string | null
          scheduled_for: string
          sent_at: string | null
          stage: string
          status: string | null
          template_name: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          negotiation_id?: string | null
          scheduled_for: string
          sent_at?: string | null
          stage: string
          status?: string | null
          template_name?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          negotiation_id?: string | null
          scheduled_for?: string
          sent_at?: string | null
          stage?: string
          status?: string | null
          template_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sequences_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          active: boolean | null
          content: string
          conversion_rate: number | null
          created_at: string
          id: string
          industry: string | null
          language: string | null
          name: string
          stage: string
          subject: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          content: string
          conversion_rate?: number | null
          created_at?: string
          id?: string
          industry?: string | null
          language?: string | null
          name: string
          stage: string
          subject: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          content?: string
          conversion_rate?: number | null
          created_at?: string
          id?: string
          industry?: string | null
          language?: string | null
          name?: string
          stage?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      execution_history: {
        Row: {
          action_details: Json | null
          action_type: string
          created_at: string | null
          entity_id: string
          entity_type: string
          executed_by: string | null
          execution_status: string | null
          execution_time_ms: number | null
          id: string
          result_data: Json | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          executed_by?: string | null
          execution_status?: string | null
          execution_time_ms?: number | null
          id?: string
          result_data?: Json | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          executed_by?: string | null
          execution_status?: string | null
          execution_time_ms?: number | null
          id?: string
          result_data?: Json | null
        }
        Relationships: []
      }
      logistics_execution: {
        Row: {
          created_at: string
          customs_data: Json | null
          id: string
          insurance_data: Json | null
          opportunity_id: string | null
          shipping_method: string | null
          status: string | null
          tracking_info: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customs_data?: Json | null
          id?: string
          insurance_data?: Json | null
          opportunity_id?: string | null
          shipping_method?: string | null
          status?: string | null
          tracking_info?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customs_data?: Json | null
          id?: string
          insurance_data?: Json | null
          opportunity_id?: string | null
          shipping_method?: string | null
          status?: string | null
          tracking_info?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "logistics_execution_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_operations: {
        Row: {
          cost_breakdown: Json | null
          created_at: string | null
          destination: string
          estimated_delivery: string | null
          id: string
          operation_type: string
          origin: string
          product_info: Json | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          cost_breakdown?: Json | null
          created_at?: string | null
          destination: string
          estimated_delivery?: string | null
          id?: string
          operation_type: string
          origin: string
          product_info?: Json | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          cost_breakdown?: Json | null
          created_at?: string | null
          destination?: string
          estimated_delivery?: string | null
          id?: string
          operation_type?: string
          origin?: string
          product_info?: Json | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      market_analysis: {
        Row: {
          analysis_date: string | null
          competition_level: string | null
          confidence_score: number | null
          created_at: string | null
          data_sources: string[] | null
          demand_forecast: Json | null
          growth_rate_percent: number | null
          id: string
          key_insights: string[] | null
          market_region: string
          market_size_usd: number | null
          price_trends: Json | null
          product_category: string
          updated_at: string | null
        }
        Insert: {
          analysis_date?: string | null
          competition_level?: string | null
          confidence_score?: number | null
          created_at?: string | null
          data_sources?: string[] | null
          demand_forecast?: Json | null
          growth_rate_percent?: number | null
          id?: string
          key_insights?: string[] | null
          market_region: string
          market_size_usd?: number | null
          price_trends?: Json | null
          product_category: string
          updated_at?: string | null
        }
        Update: {
          analysis_date?: string | null
          competition_level?: string | null
          confidence_score?: number | null
          created_at?: string | null
          data_sources?: string[] | null
          demand_forecast?: Json | null
          growth_rate_percent?: number | null
          id?: string
          key_insights?: string[] | null
          market_region?: string
          market_size_usd?: number | null
          price_trends?: Json | null
          product_category?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mycogenesis_products: {
        Row: {
          category: string | null
          created_at: string
          formula: Json | null
          id: string
          market_analysis: Json | null
          name: string
          production_status: string | null
          target_markets: string[] | null
          updated_at: string
          viral_campaigns: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          formula?: Json | null
          id?: string
          market_analysis?: Json | null
          name: string
          production_status?: string | null
          target_markets?: string[] | null
          updated_at?: string
          viral_campaigns?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string
          formula?: Json | null
          id?: string
          market_analysis?: Json | null
          name?: string
          production_status?: string | null
          target_markets?: string[] | null
          updated_at?: string
          viral_campaigns?: Json | null
        }
        Relationships: []
      }
      negotiations: {
        Row: {
          buyer_company: string
          contact_email: string | null
          contract_sent: boolean | null
          created_at: string
          deal_closed: boolean | null
          deal_value: number | null
          email_content: string | null
          id: string
          last_contact_date: string | null
          meeting_scheduled: boolean | null
          negotiation_stage: string | null
          next_action: string | null
          next_action_date: string | null
          opportunity_id: string | null
          response_content: string | null
          response_received: boolean | null
          status: string | null
          success_probability: number | null
          updated_at: string
        }
        Insert: {
          buyer_company: string
          contact_email?: string | null
          contract_sent?: boolean | null
          created_at?: string
          deal_closed?: boolean | null
          deal_value?: number | null
          email_content?: string | null
          id?: string
          last_contact_date?: string | null
          meeting_scheduled?: boolean | null
          negotiation_stage?: string | null
          next_action?: string | null
          next_action_date?: string | null
          opportunity_id?: string | null
          response_content?: string | null
          response_received?: boolean | null
          status?: string | null
          success_probability?: number | null
          updated_at?: string
        }
        Update: {
          buyer_company?: string
          contact_email?: string | null
          contract_sent?: boolean | null
          created_at?: string
          deal_closed?: boolean | null
          deal_value?: number | null
          email_content?: string | null
          id?: string
          last_contact_date?: string | null
          meeting_scheduled?: boolean | null
          negotiation_stage?: string | null
          next_action?: string | null
          next_action_date?: string | null
          opportunity_id?: string | null
          response_content?: string | null
          response_received?: boolean | null
          status?: string | null
          success_probability?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "negotiations_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_required: boolean | null
          action_url: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          expires_at: string | null
          id: string
          message: string
          notification_type: string
          priority: string | null
          read_status: boolean | null
          title: string
        }
        Insert: {
          action_required?: boolean | null
          action_url?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          id?: string
          message: string
          notification_type: string
          priority?: string | null
          read_status?: boolean | null
          title: string
        }
        Update: {
          action_required?: boolean | null
          action_url?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          id?: string
          message?: string
          notification_type?: string
          priority?: string | null
          read_status?: boolean | null
          title?: string
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          ai_analysis: Json | null
          compliance_status: Json | null
          created_at: string
          estimated_value: number | null
          execution_data: Json | null
          id: string
          margin_percentage: number | null
          product_category: string | null
          product_name: string | null
          quantity: number | null
          risk_score: number | null
          source: string
          status: string
          target_country: string | null
          type: string
          updated_at: string
        }
        Insert: {
          ai_analysis?: Json | null
          compliance_status?: Json | null
          created_at?: string
          estimated_value?: number | null
          execution_data?: Json | null
          id?: string
          margin_percentage?: number | null
          product_category?: string | null
          product_name?: string | null
          quantity?: number | null
          risk_score?: number | null
          source: string
          status?: string
          target_country?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          ai_analysis?: Json | null
          compliance_status?: Json | null
          created_at?: string
          estimated_value?: number | null
          execution_data?: Json | null
          id?: string
          margin_percentage?: number | null
          product_category?: string | null
          product_name?: string | null
          quantity?: number | null
          risk_score?: number | null
          source?: string
          status?: string
          target_country?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      opportunity_suppliers: {
        Row: {
          created_at: string | null
          id: string
          lead_time_days: number | null
          minimum_order_quantity: number | null
          opportunity_id: string | null
          quote_valid_until: string | null
          quoted_price: number | null
          status: string | null
          supplier_id: string | null
          supplier_notes: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_time_days?: number | null
          minimum_order_quantity?: number | null
          opportunity_id?: string | null
          quote_valid_until?: string | null
          quoted_price?: number | null
          status?: string | null
          supplier_id?: string | null
          supplier_notes?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_time_days?: number | null
          minimum_order_quantity?: number | null
          opportunity_id?: string | null
          quote_valid_until?: string | null
          quoted_price?: number | null
          status?: string | null
          supplier_id?: string | null
          supplier_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_suppliers_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunity_suppliers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          delivery_date: string | null
          id: string
          notes: string | null
          opportunity_id: string | null
          order_date: string | null
          payment_status: string | null
          profit_margin: number | null
          quantity: number
          status: string | null
          supplier_id: string | null
          total_amount: number
          tracking_info: Json | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_date?: string | null
          id?: string
          notes?: string | null
          opportunity_id?: string | null
          order_date?: string | null
          payment_status?: string | null
          profit_margin?: number | null
          quantity: number
          status?: string | null
          supplier_id?: string | null
          total_amount: number
          tracking_info?: Json | null
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_date?: string | null
          id?: string
          notes?: string | null
          opportunity_id?: string | null
          order_date?: string | null
          payment_status?: string | null
          profit_margin?: number | null
          quantity?: number
          status?: string | null
          supplier_id?: string | null
          total_amount?: number
          tracking_info?: Json | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_analytics: {
        Row: {
          breakdown: Json | null
          created_at: string
          date: string
          id: string
          metric_name: string
          metric_value: number
        }
        Insert: {
          breakdown?: Json | null
          created_at?: string
          date: string
          id?: string
          metric_name: string
          metric_value: number
        }
        Update: {
          breakdown?: Json | null
          created_at?: string
          date?: string
          id?: string
          metric_name?: string
          metric_value?: number
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          active: boolean | null
          category: string | null
          compliance_status: Json | null
          contact_info: Json | null
          country: string
          created_at: string
          id: string
          name: string
          reliability_score: number | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          compliance_status?: Json | null
          contact_info?: Json | null
          country: string
          created_at?: string
          id?: string
          name: string
          reliability_score?: number | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          compliance_status?: Json | null
          contact_info?: Json | null
          country?: string
          created_at?: string
          id?: string
          name?: string
          reliability_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          action: string
          created_at: string
          data: Json | null
          error_message: string | null
          id: string
          module: string
          success: boolean | null
        }
        Insert: {
          action: string
          created_at?: string
          data?: Json | null
          error_message?: string | null
          id?: string
          module: string
          success?: boolean | null
        }
        Update: {
          action?: string
          created_at?: string
          data?: Json | null
          error_message?: string | null
          id?: string
          module?: string
          success?: boolean | null
        }
        Relationships: []
      }
      target_suppliers: {
        Row: {
          accepts_us_distribution: string | null
          accepts_us_dropshipping: string | null
          annual_revenue: number | null
          company_exists: boolean | null
          company_name: string
          contact_person: string | null
          country: string
          created_at: string
          data_source: string | null
          deep_validation_score: number | null
          email: string
          employee_count: number | null
          id: string
          industry: string | null
          last_verification: string | null
          phone: string | null
          potential_value: number | null
          product_category: string | null
          real_data_verified: boolean | null
          specialties: string[] | null
          supplier_size: string | null
          updated_at: string
          verification_notes: string | null
          verification_status: string | null
          website: string | null
        }
        Insert: {
          accepts_us_distribution?: string | null
          accepts_us_dropshipping?: string | null
          annual_revenue?: number | null
          company_exists?: boolean | null
          company_name: string
          contact_person?: string | null
          country: string
          created_at?: string
          data_source?: string | null
          deep_validation_score?: number | null
          email: string
          employee_count?: number | null
          id?: string
          industry?: string | null
          last_verification?: string | null
          phone?: string | null
          potential_value?: number | null
          product_category?: string | null
          real_data_verified?: boolean | null
          specialties?: string[] | null
          supplier_size?: string | null
          updated_at?: string
          verification_notes?: string | null
          verification_status?: string | null
          website?: string | null
        }
        Update: {
          accepts_us_distribution?: string | null
          accepts_us_dropshipping?: string | null
          annual_revenue?: number | null
          company_exists?: boolean | null
          company_name?: string
          contact_person?: string | null
          country?: string
          created_at?: string
          data_source?: string | null
          deep_validation_score?: number | null
          email?: string
          employee_count?: number | null
          id?: string
          industry?: string | null
          last_verification?: string | null
          phone?: string | null
          potential_value?: number | null
          product_category?: string | null
          real_data_verified?: boolean | null
          specialties?: string[] | null
          supplier_size?: string | null
          updated_at?: string
          verification_notes?: string | null
          verification_status?: string | null
          website?: string | null
        }
        Relationships: []
      }
      viral_campaigns: {
        Row: {
          budget_usd: number | null
          campaign_name: string
          campaign_type: string | null
          created_at: string | null
          end_date: string | null
          id: string
          performance_metrics: Json | null
          product_id: string | null
          roi_percent: number | null
          start_date: string | null
          status: string | null
          target_audience: Json | null
          updated_at: string | null
        }
        Insert: {
          budget_usd?: number | null
          campaign_name: string
          campaign_type?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          performance_metrics?: Json | null
          product_id?: string | null
          roi_percent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
        }
        Update: {
          budget_usd?: number | null
          campaign_name?: string
          campaign_type?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          performance_metrics?: Json | null
          product_id?: string | null
          roi_percent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "viral_campaigns_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mycogenesis_products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_priority_documents_for_use: {
        Args: { usage_type?: string }
        Returns: {
          content_type: string
          document_name: string
          document_type: string
          file_path: string
          id: string
          priority: number
          usage_instructions: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
