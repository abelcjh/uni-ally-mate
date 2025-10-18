-- Seed mock course data for testing
-- Temporarily disable RLS to insert seed data
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;

-- Insert diverse mock courses for the existing user
INSERT INTO public.courses (user_id, module_name, completion_status, performance_score)
VALUES 
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Introduction to Programming', 85, 88.5),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Data Structures & Algorithms', 60, 72.3),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Database Management Systems', 45, 65.8),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Web Development Fundamentals', 90, 92.1),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Software Engineering Principles', 30, 58.4),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Machine Learning Basics', 15, 45.0),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Mobile App Development', 70, 79.6);

-- Re-enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;