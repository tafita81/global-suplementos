-- Atualizar dados completos da empresa com todas as informações
UPDATE company_memory 
SET company_data = '{
  "company_name": "RAFAEL ROBERTO RODRIGUES DE OLIVEIRA CONSULTORIA EM TECNOLOGIA DA INFORMACAO CORP",
  "ein": "33-3939483",
  "state": "Florida",
  "document_number": "P25000013937",
  "incorporation_date": "2025-02-23",
  "effective_date": "2025-02-23",
  "registered_agent": "MDM GOAL SERVICES LLC",
  "registered_agent_address": "2317 LAKE DEBRA DR APT 2717, ORLANDO, FL 32835",
  "business_address": "6200 METROWEST BLVD ST 201 G, ORLANDO, FL 32835",
  "mailing_address": "6200 METROWEST BLVD ST 201 G, ORLANDO, FL 32835",
  "status": "active",
  "business_purpose": "ANY AND ALL LAWFUL BUSINESS",
  "authorized_shares": 1000,
  "president": "RAFAEL ROBERTO RODRIGUES DE OLIVEIRA",
  "president_address": "6200 METROWEST BLVD ST 201 G, ORLANDO, FL 32835",
  "florida_certificate": "250-311-093-515-00044504645",
  "authentication_code": "25031109351500044504645",
  "sam_gov_eligible": true,
  "federal_contracting_eligible": true,
  "duns_required": false,
  "validated": true,
  "contact_email": "contact@globalsupplements.site",
  "business_type": "Technology Consulting Corporation",
  "industry": "Information Technology Consulting"
}',
ai_learning_data = '{
  "sam_gov_registration": {"status": "pending_automation", "documents_ready": true, "priority": "high"},
  "federal_contracts": {"eligible": true, "ein_verified": true, "ready_to_apply": true},
  "alibaba_verification": {"status": "pending_automation", "business_license": true, "priority": "high"},
  "amazon_business": {"status": "pending_automation", "ready": true, "priority": "medium"},
  "trade_compliance": {"status": "compliant", "export_license": "not_required"},
  "banking_setup": {"payoneer": "pending_automation", "wire_transfers": "available", "priority": "high"},
  "automation_status": {
    "email_configured": true,
    "auto_registration": true,
    "contact_email": "contact@globalsupplements.site",
    "last_automation": null
  }
}'
WHERE ein_number = '33-3939483';