-- 0003_rls_policies.sql
-- Enable Row Level Security on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION auth.user_role() RETURNS user_role AS $$
  SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper function to get current user's tenant_id
CREATE OR REPLACE FUNCTION auth.user_tenant_id() RETURNS uuid AS $$
  SELECT tenant_id FROM public.users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Tenants Policies
-- Anyone can view tenants
CREATE POLICY "Tenants are viewable by everyone" ON tenants
    FOR SELECT USING (true);

-- Users Policies
-- Users can read their own data, super_admins can read all, school_admins can read within their tenant
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (
        auth.uid() = id
        OR auth.user_role() = 'super_admin'
        OR (auth.user_role() = 'school_admin' AND tenant_id = auth.user_tenant_id())
    );

-- Users can update their own data
CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Courses Policies
-- Anyone can view published courses
CREATE POLICY "Published courses are viewable by everyone" ON courses
    FOR SELECT USING (status = 'published');

-- Instructors can view all their courses (even drafts)
CREATE POLICY "Instructors can view their own courses" ON courses
    FOR SELECT USING (auth.uid() = instructor_id);

-- Admins can view all courses in their tenant
CREATE POLICY "Admins can view tenant courses" ON courses
    FOR SELECT USING (
        auth.user_role() = 'super_admin'
        OR (auth.user_role() = 'school_admin' AND tenant_id = auth.user_tenant_id())
    );

-- Instructors can insert/update courses for their tenant
CREATE POLICY "Instructors can manage their courses" ON courses
    FOR ALL USING (
        auth.uid() = instructor_id
        AND tenant_id = auth.user_tenant_id()
    );

-- Modules & Lessons Policies
-- Anyone who can view a course can view its modules/lessons (simplification for now)
CREATE POLICY "Modules viewable if course is viewable" ON modules
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM courses WHERE courses.id = modules.course_id)
    );

CREATE POLICY "Lessons viewable if course is viewable" ON lessons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM modules
            JOIN courses ON courses.id = modules.course_id
            WHERE modules.id = lessons.module_id
        )
    );

-- Enrollments Policies
-- Users can view their own enrollments
CREATE POLICY "Users view own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = student_id);

-- Lesson Progress Policies
-- Users can view and update their own progress
CREATE POLICY "Users manage own progress" ON lesson_progress
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM enrollments WHERE enrollments.id = lesson_progress.enrollment_id AND enrollments.student_id = auth.uid())
    );

CREATE POLICY "Users update own progress" ON lesson_progress
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM enrollments WHERE enrollments.id = lesson_progress.enrollment_id AND enrollments.student_id = auth.uid())
    );

-- Payments Policies
-- Users view own payments
CREATE POLICY "Users view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- Instructors view payouts (payments where they are instructor for the course)
CREATE POLICY "Instructors view payouts" ON payments
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM courses WHERE courses.id = payments.course_id AND courses.instructor_id = auth.uid())
    );

-- Live Sessions Policies
-- Enrolled students view sessions
CREATE POLICY "Enrolled students view sessions" ON live_sessions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM enrollments WHERE enrollments.course_id = live_sessions.course_id AND enrollments.student_id = auth.uid())
    );

-- Instructors view/manage own sessions
CREATE POLICY "Instructors manage own sessions" ON live_sessions
    FOR ALL USING (auth.uid() = instructor_id);

-- Certificates Policies
-- Users view own certificates
CREATE POLICY "Users view own certificates" ON certificates
    FOR SELECT USING (auth.uid() = student_id);

-- Anyone can view a certificate by verification_code (public verification)
CREATE POLICY "Public certificate verification" ON certificates
    FOR SELECT USING (true);
