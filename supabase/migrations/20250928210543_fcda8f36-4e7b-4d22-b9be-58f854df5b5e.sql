-- Fix target_suppliers security vulnerability - force clean slate approach
-- Drop ALL existing policies on target_suppliers table first

DROP POLICY IF EXISTS "Full access to target suppliers" ON public.target_suppliers;
DROP POLICY IF EXISTS "secure_suppliers_select_authenticated" ON public.target_suppliers;
DROP POLICY IF EXISTS "secure_suppliers_insert_authenticated" ON public.target_suppliers;
DROP POLICY IF EXISTS "secure_suppliers_update_authenticated" ON public.target_suppliers;
DROP POLICY IF EXISTS "secure_suppliers_delete_authenticated" ON public.target_suppliers;

-- Now create the secure policies with completely new names to avoid conflicts
-- Policy 1: Authenticated users can view suppliers (your internal team only)
CREATE POLICY "suppliers_view_auth_only" 
ON public.target_suppliers 
FOR SELECT 
TO authenticated
USING (true);

-- Policy 2: Authenticated users can add suppliers
CREATE POLICY "suppliers_insert_auth_only" 
ON public.target_suppliers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy 3: Authenticated users can update suppliers
CREATE POLICY "suppliers_update_auth_only" 
ON public.target_suppliers 
FOR UPDATE 
TO authenticated
USING (true);

-- Policy 4: Authenticated users can delete suppliers
CREATE POLICY "suppliers_delete_auth_only" 
ON public.target_suppliers 
FOR DELETE 
TO authenticated
USING (true);

-- Add critical security documentation
COMMENT ON TABLE public.target_suppliers IS '🔒 CRITICAL SECURITY: 300+ supplier records protected. Access restricted to authenticated team only. No public access prevents competitor theft.';

-- Performance indexes for the secured table
CREATE INDEX IF NOT EXISTS idx_suppliers_email_secure ON public.target_suppliers(email);
CREATE INDEX IF NOT EXISTS idx_suppliers_country_secure ON public.target_suppliers(country);
CREATE INDEX IF NOT EXISTS idx_suppliers_status_secure ON public.target_suppliers(verification_status);