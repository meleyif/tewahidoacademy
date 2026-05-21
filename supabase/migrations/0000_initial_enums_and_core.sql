-- 0000_initial_enums_and_core.sql
-- Create ENUM types
CREATE TYPE tenant_plan AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE user_role AS ENUM ('super_admin', 'school_admin', 'instructor', 'student');
CREATE TYPE student_group AS ENUM ('middle', 'high', 'college', 'deacon');
CREATE TYPE user_locale AS ENUM ('en', 'am');

-- Create core tables
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    custom_domain TEXT,
    stripe_account_id TEXT,
    plan tenant_plan DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: users table extends auth.users (assuming auth schema is already created by Supabase)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL,
    student_group student_group,
    locale user_locale DEFAULT 'en',
    parent_email TEXT,
    stripe_customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
