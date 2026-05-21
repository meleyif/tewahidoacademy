-- 0002_financial_and_live.sql
-- Create ENUM types for financial and live sessions
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'refunded');
CREATE TYPE session_status AS ENUM ('scheduled', 'live', 'ended');

-- Create financial and live session tables
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT UNIQUE,
    amount NUMERIC(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL, -- USD/EUR
    status payment_status DEFAULT 'pending',
    instructor_payout_amount NUMERIC(10,2),
    platform_fee_amount NUMERIC(10,2),
    paid_at TIMESTAMPTZ
);

-- Add the missing foreign key constraint to enrollments table now that payments exists
ALTER TABLE enrollments
ADD CONSTRAINT fk_enrollment_payment
FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL;

CREATE TABLE live_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    zoom_meeting_id VARCHAR(50),
    join_url TEXT,
    host_url TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_min INTEGER NOT NULL,
    recording_url TEXT,
    status session_status DEFAULT 'scheduled'
);

CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    certificate_url TEXT NOT NULL,
    verification_code VARCHAR(16) UNIQUE NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW()
);
