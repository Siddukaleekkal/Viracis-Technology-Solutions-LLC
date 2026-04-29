-- Supabase Schema for Lead Engine SaaS

-- 1. Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Tenants table
CREATE TABLE public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo_url TEXT,
  reply_email TEXT,
  phone TEXT,
  website TEXT,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'trial',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Users table (links to Auth users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'owner',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) on users and tenants
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Tenants RLS: users can only view their own tenant
CREATE POLICY "Users can view their own tenant"
ON public.tenants FOR SELECT
USING (id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Users RLS: users can view other users in their tenant
CREATE POLICY "Users can view members of their tenant"
ON public.users FOR SELECT
USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- 5. Create core data tables
CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  property_address TEXT NOT NULL,
  property_city TEXT,
  property_state TEXT,
  property_zip TEXT,
  property_sqft INTEGER,
  property_type TEXT,
  owner_name TEXT,
  owner_email TEXT,
  owner_mailing_address TEXT,
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'discovered',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant isolation for leads" ON public.leads
USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Additional tables for Phase 2+ can be added later (pricing_rules, service_areas, messages).

-- Function to handle new user signup and tenant creation via RPC
CREATE OR REPLACE FUNCTION create_tenant_and_user(
  company_name TEXT,
  user_id UUID,
  user_email TEXT,
  user_full_name TEXT
) RETURNS JSON AS $$
DECLARE
  new_tenant_id UUID;
BEGIN
  -- Insert tenant
  INSERT INTO public.tenants (name) VALUES (company_name) RETURNING id INTO new_tenant_id;
  
  -- Insert user mapping
  INSERT INTO public.users (id, tenant_id, email, full_name, role) 
  VALUES (user_id, new_tenant_id, user_email, user_full_name, 'owner');
  
  RETURN json_build_object('tenant_id', new_tenant_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
