import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { AddCourseDialog } from "@/components/AddCourseDialog";
import { EditCourseDialog } from "@/components/EditCourseDialog";

interface Course {
  id: string;
  module_name: string;
  completion_status: number;
  performance_score: number;
  created_at: string;
}

interface CourseDashboardProps {
  userId: string;
}

export const CourseDashboard = ({ userId }: CourseDashboardProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [userId]);

  const handleDelete = async (courseId: string) => {
    try {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
      fetchCourses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">My Courses</h2>
        </div>
        <Button onClick={() => setAddDialogOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg border border-dashed">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">No courses yet</p>
          <Button onClick={() => setAddDialogOpen(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Course
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditCourse(course)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </div>
      )}

      <AddCourseDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        userId={userId}
        onSuccess={fetchCourses}
      />

      {editCourse && (
        <EditCourseDialog
          open={!!editCourse}
          onOpenChange={(open) => !open && setEditCourse(null)}
          course={editCourse}
          onSuccess={fetchCourses}
        />
      )}
    </div>
  );
};