-- Clear existing test data and insert comprehensive mock courses
-- Temporarily disable RLS to manage seed data
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;

-- Delete existing test courses
DELETE FROM public.courses WHERE user_id = 'c5148ab5-5224-413f-942f-eaf31bb8d4d6';

-- Insert diverse mock courses representing different student scenarios:
-- Mix of high/medium/low performance, various completion stages, different subjects
INSERT INTO public.courses (user_id, module_name, completion_status, performance_score)
VALUES 
  -- Strong performance, high completion
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Advanced Software Engineering', 95, 94.7),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Database Systems', 90, 92.1),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Web Technologies', 88, 90.4),
  
  -- Moderate performance, mid-range completion
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Data Structures & Algorithms', 65, 73.8),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Operating Systems', 60, 76.2),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Business Statistics', 55, 68.4),
  
  -- Struggling, needs support
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Engineering Mathematics I', 42, 62.5),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Physics for Engineers', 38, 58.2),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Calculus II', 35, 52.3),
  
  -- Just started, low completion
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Machine Learning Basics', 25, 67.5),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Network Security', 18, 71.2),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Mobile App Development', 12, 64.8),
  
  -- In progress with varied performance
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Cloud Computing Architecture', 70, 85.5),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Research Methodology', 48, 79.3),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'Digital Marketing', 52, 70.9);

-- Re-enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;