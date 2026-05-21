-- 0004_user_trigger.sql

-- Trigger function to automatically insert into public.users when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    full_name,
    email,
    role,
    student_group,
    parent_email,
    locale
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown'),
    NEW.email,
    -- Default to student if not provided, safely cast to user_role
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role),
    (NEW.raw_user_meta_data->>'student_group')::student_group,
    NEW.raw_user_meta_data->>'parent_email',
    COALESCE((NEW.raw_user_meta_data->>'locale')::user_locale, 'en'::user_locale)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
