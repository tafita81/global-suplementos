-- Fix critical security vulnerability in b2b_buyers table
-- Remove dangerous public access policy and implement secure RLS policies

-- First, drop the existing dangerous policy that allows public access to everything
DROP POLICY IF EXISTS "Allow public access to b2b buyers" ON public.b2b_buyers;

-- Create secure RLS policies for b2b_buyers table
-- Policy 1: Allow authenticated users to view buyers (for internal team use)
CREATE POLICY "Authenticated users can view buyers" 
ON public.b2b_buyers 
FOR SELECT 
TO authenticated
USING (true);

-- Policy 2: Allow authenticated users to insert new buyers (for lead capture)
CREATE POLICY "Authenticated users can insert buyers" 
ON public.b2b_buyers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy 3: Allow authenticated users to update buyer records
CREATE POLICY "Authenticated users can update buyers" 
ON public.b2b_buyers 
FOR UPDATE 
TO authenticated
USING (true);

-- Policy 4: Allow authenticated users to delete buyer records (admin function)
CREATE POLICY "Authenticated users can delete buyers" 
ON public.b2b_buyers 
FOR DELETE 
TO authenticated
USING (true);

-- Policy 5: Allow anonymous users to insert leads only (for public lead forms)
-- This allows potential buyers to submit their information via public forms
CREATE POLICY "Anonymous users can submit leads" 
ON public.b2b_buyers 
FOR INSERT 
TO anon
WITH CHECK (
  -- Only allow basic lead submission fields
  email IS NOT NULL 
  AND company_name IS NOT NULL
  AND status = 'new_lead'
  -- Prevent anonymous users from setting sensitive internal fields
  AND lead_score IS NULL
  AND buying_history IS NULL
);

-- Add a comment explaining the security model
COMMENT ON TABLE public.b2b_buyers IS 'Secure buyer data: Anonymous users can only submit leads, authenticated users have full access';

-- Create an index on email for better performance with the new policies
CREATE INDEX IF NOT EXISTS idx_b2b_buyers_email ON public.b2b_buyers(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_b2b_buyers_status ON public.b2b_buyers(status);