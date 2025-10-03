-- Habilitar RLS na tabela target_suppliers
ALTER TABLE target_suppliers ENABLE ROW LEVEL SECURITY;

-- Política para permitir acesso público aos dados dos fornecedores
CREATE POLICY "Allow public access to target suppliers" 
ON target_suppliers 
FOR ALL 
USING (true);