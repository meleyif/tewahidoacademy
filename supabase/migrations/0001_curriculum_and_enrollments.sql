-- 0001_curriculum_and_enrollments.sql
-- Create ENUM types for curriculum and enrollments
CREATE TYPE target_group AS ENUM ('middle', 'high', 'college', 'deacon', 'all');
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE content_type AS ENUM ('video', 'pdf', 'text', 'quiz', 'live');
CREATE TYPE enrollment_status AS ENUM ('active', 'expired', 'refunded');
CREATE TYPE lesson_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create curriculum and enrollment tables
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_am TEXT,
    thumbnail_url TEXT,
    target_group target_group,
    price_usd NUMERIC(10,2),
    price_eur NUMERIC(10,2),
    is_sequential BOOLEAN DEFAULT true,
    status course_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL,
    is_locked BOOLEAN DEFAULT false
);

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_am VARCHAR(255) NOT NULL,
    content_type content_type NOT NULL,
    content_url TEXT,
    duration_min INTEGER,
    order_index INTEGER NOT NULL,
    is_free_preview BOOLEAN DEFAULT false
);

CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    -- payment_id will be added as a foreign key later, after the payments table is created
    payment_id UUID,
    status enrollment_status DEFAULT 'active',
    progress_pct NUMERIC(5,2) DEFAULT 0,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status lesson_status DEFAULT 'not_started',
    watch_time_sec INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ
);
