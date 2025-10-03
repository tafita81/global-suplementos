-- Check current policies and fix the security vulnerability
-- First, let's see what policies exist and drop all existing insecure policies

-- Drop all existing policies on b2b_buyers table
DROP POLICY IF EXISTS "Allow public access to b2b buyers" ON public.b2b_buyers;
DROP POLICY IF EXISTS "Authenticated users can view buyers" ON public.b2b_buyers;
DROP POLICY IF EXISTS "Authenticated users can insert buyers" ON public.b2b_buyers;
DROP POLICY IF EXISTS "Authenticated users can update buyers" ON public.b2b_buyers;
DROP POLICY IF EXISTS "Authenticated users can delete buyers" ON public.b2b_buyers;
DROP POLICY IF EXISTS "Anonymous users can submit leads" ON public.b2b_buyers;

-- Now create the secure policies with unique names
-- Policy 1: Allow authenticated users to view all buyers (internal team access)
CREATE POLICY "secure_buyers_select_authenticated" 
ON public.b2b_buyers 
FOR SELECT 
TO authenticated
USING (true);

-- Policy 2: Allow authenticated users to manage buyers (full CRUD)
CREATE POLICY "secure_buyers_insert_authenticated" 
ON public.b2b_buyers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "secure_buyers_update_authenticated" 
ON public.b2b_buyers 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "secure_buyers_delete_authenticated" 
ON public.b2b_buyers 
FOR DELETE 
TO authenticated
USING (true);

-- Policy 3: Allow anonymous users to only submit basic lead information
-- This enables public lead forms while protecting sensitive data
CREATE POLICY "secure_buyers_anonymous_lead_submission" 
ON public.b2b_buyers 
FOR INSERT 
TO anon
WITH CHECK (
  -- Require essential fields
  email IS NOT NULL 
  AND company_name IS NOT NULL
  AND status = 'new_lead'
  -- Prevent anonymous users from setting sensitive internal tracking fields
  AND lead_score IS NULL
  AND buying_history IS NULL
  AND decision_maker_level IS NULL
);

-- Add security documentation
COMMENT ON TABLE public.b2b_buyers IS 'SECURED: Anonymous users can only submit leads with basic info. Authenticated users have full access. This prevents competitor data theft.';

-- Create performance indexes for the new security policies
CREATE INDEX IF NOT EXISTS idx_b2b_buyers_email ON public.b2b_buyers(email);
CREATE INDEX IF NOT EXISTS idx_b2b_buyers_status ON public.b2b_buyers(status);
CREATE INDEX IF NOT EXISTS idx_b2b_buyers_company ON public.b2b_buyers(company_name);