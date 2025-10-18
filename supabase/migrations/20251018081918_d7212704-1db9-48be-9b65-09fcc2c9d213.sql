-- Create materials table for course resources
CREATE TABLE public.course_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT,
  description TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

-- Users can view materials for their own courses
CREATE POLICY "Users can view their course materials"
ON public.course_materials
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = course_materials.course_id
    AND courses.user_id = auth.uid()
  )
);

-- Users can insert materials for their own courses
CREATE POLICY "Users can insert their course materials"
ON public.course_materials
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = course_materials.course_id
    AND courses.user_id = auth.uid()
  )
);

-- Users can update materials for their own courses
CREATE POLICY "Users can update their course materials"
ON public.course_materials
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = course_materials.course_id
    AND courses.user_id = auth.uid()
  )
);

-- Users can delete materials for their own courses
CREATE POLICY "Users can delete their course materials"
ON public.course_materials
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.courses
    WHERE courses.id = course_materials.course_id
    AND courses.user_id = auth.uid()
  )
);

-- Add foreign key constraint to courses table for referential integrity
ALTER TABLE public.courses ADD CONSTRAINT fk_courses_user 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;