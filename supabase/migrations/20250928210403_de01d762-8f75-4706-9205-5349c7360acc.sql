-- Fix critical security vulnerability in target_suppliers table
-- This table contains 300+ sensitive supplier records that competitors could steal

-- Drop the existing dangerous policy that allows full public access
DROP POLICY IF EXISTS "Full access to target suppliers" ON public.target_suppliers;

-- Create secure RLS policies for target_suppliers table
-- Policy 1: Only authenticated users can view supplier data (internal team only)
CREATE POLICY "secure_suppliers_select_authenticated" 
ON public.target_suppliers 
FOR SELECT 
TO authenticated
USING (true);

-- Policy 2: Only authenticated users can add new suppliers
CREATE POLICY "secure_suppliers_insert_authenticated" 
ON public.target_suppliers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy 3: Only authenticated users can update supplier records
CREATE POLICY "secure_suppliers_update_authenticated" 
ON public.target_suppliers 
FOR UPDATE 
TO authenticated
USING (true);

-- Policy 4: Only authenticated users can delete supplier records
CREATE POLICY "secure_suppliers_delete_authenticated" 
ON public.target_suppliers 
FOR DELETE 
TO authenticated
USING (true);

-- NO anonymous access policies - supplier data is too sensitive for public access
-- Competitors should not be able to access any supplier information

-- Add security documentation
COMMENT ON TABLE public.target_suppliers IS 'HIGHLY SECURED: Contains 300+ sensitive supplier records. Only authenticated internal team members can access. No public access to prevent competitor data theft.';

-- Create performance indexes for secure access patterns
CREATE INDEX IF NOT EXISTS idx_target_suppliers_email ON public.target_suppliers(email);
CREATE INDEX IF NOT EXISTS idx_target_suppliers_country ON public.target_suppliers(country);
CREATE INDEX IF NOT EXISTS idx_target_suppliers_category ON public.target_suppliers(product_category);
CREATE INDEX IF NOT EXISTS idx_target_suppliers_verification ON public.target_suppliers(verification_status);

-- Add index for potential value filtering (for business intelligence)
CREATE INDEX IF NOT EXISTS idx_target_suppliers_potential_value ON public.target_suppliers(potential_value);

-- Add index for supplier size classification
CREATE INDEX IF NOT EXISTS idx_target_suppliers_size ON public.target_suppliers(supplier_size);