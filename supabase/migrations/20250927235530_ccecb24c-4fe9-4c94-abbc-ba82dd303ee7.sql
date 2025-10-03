-- Atualizar dados da empresa real nos EUA
INSERT INTO company_memory (ein_number, company_data, ai_learning_data) 
VALUES (
  '33-3939483',
  '{
    "company_name": "RAFAEL ROBERTO RODRIGUES DE OLIVEIRA CONSULTORIA EM TECNOLOGIA DA INFORMACAO CORP",
    "ein": "33-3939483",
    "state": "Florida",
    "document_number": "P25000013937",
    "incorporation_date": "2025-02-23",
    "registered_agent": "MDM GOAL SERVICES LLC",
    "address": "6200 METROWEST BLVD ST 201 G, ORLANDO, FL 32835",
    "status": "active",
    "business_purpose": "ANY AND ALL LAWFUL BUSINESS",
    "authorized_shares": 1000,
    "sam_gov_eligible": true,
    "federal_contracting_eligible": true,
    "duns_required": false,
    "validated": true
  }',
  '{
    "sam_gov_registration": {"status": "eligible", "documents_ready": true},
    "federal_contracts": {"eligible": true, "ein_verified": true},
    "alibaba_verification": {"status": "pending", "business_license": true},
    "trade_compliance": {"status": "compliant", "export_license": "not_required"},
    "banking_setup": {"payoneer": "pending", "wire_transfers": "available"}
  }'
) ON CONFLICT (ein_number) DO UPDATE SET
  company_data = EXCLUDED.company_data,
  ai_learning_data = EXCLUDED.ai_learning_data,
  last_updated = now();