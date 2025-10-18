-- Create Events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  university_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  relevance_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for events (public readable since they're university-wide)
CREATE POLICY "Events are viewable by authenticated users" 
ON public.events 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Temporarily disable RLS for data insertion
ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;

-- Insert mock conversations with Malaysian context and Manglish
INSERT INTO public.conversations (user_id, role, message_text, sentiment_score, created_at)
VALUES 
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'user', 'Wah stress lah, assignment due tomorrow but havent start', -0.6, now() - interval '2 days'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'assistant', 'I understand you''re feeling stressed. Let me help you break down the assignment into manageable steps.', 0.7, now() - interval '2 days'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'user', 'Can you help me with Calculus II? The limits topic very confusing', -0.3, now() - interval '1 day'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'assistant', 'Of course! Let''s work through some limit problems together step by step.', 0.8, now() - interval '1 day'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'user', 'Thank you so much! Now I understand better already', 0.9, now() - interval '1 day'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'user', 'Got any tips for the midterm exam next week?', 0.1, now() - interval '12 hours'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'assistant', 'Yes! Focus on practicing past year papers and reviewing your weak topics. Would you like me to create a study schedule?', 0.6, now() - interval '12 hours'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'user', 'Aiyo, group project members not responding at all. How to finish like this?', -0.8, now() - interval '6 hours'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'assistant', 'That sounds frustrating. Have you tried reaching out through different channels? I can help you plan what parts you can complete independently.', 0.4, now() - interval '6 hours'),
  ('c5148ab5-5224-413f-942f-eaf31bb8d4d6', 'user', 'Just finished my Database Systems project! Feel so relieved lah', 0.95, now() - interval '2 hours');

-- Insert mock events for Malaysian universities
INSERT INTO public.events (category, university_id, event_name, event_date, relevance_score)
VALUES 
  ('Academic', 'UM', 'Engineering Faculty Orientation Week', now() + interval '5 days', 0.85),
  ('Career', 'UM', 'Tech Career Fair 2025', now() + interval '15 days', 0.92),
  ('Workshop', 'UTM', 'Machine Learning Workshop for Beginners', now() + interval '8 days', 0.78),
  ('Social', 'Sunway', 'International Students Welcome Party', now() + interval '3 days', 0.65),
  ('Academic', 'UM', 'Mathematics Help Session - Calculus & Statistics', now() + interval '2 days', 0.88),
  ('Sports', 'UTM', 'Inter-Faculty Badminton Tournament', now() + interval '20 days', 0.45),
  ('Academic', 'UM', 'Final Exam Preparation Workshop', now() + interval '12 days', 0.95),
  ('Career', 'Sunway', 'Resume Building & Interview Skills Seminar', now() + interval '10 days', 0.82),
  ('Cultural', 'UM', 'Merdeka Day Celebration 2025', now() + interval '30 days', 0.55),
  ('Workshop', 'UTM', 'Cloud Computing Certification Bootcamp', now() + interval '25 days', 0.73);

-- Re-enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;