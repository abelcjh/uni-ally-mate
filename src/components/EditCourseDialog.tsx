import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Course {
  id: string;
  module_name: string;
  completion_status: number;
  performance_score: number;
}

interface EditCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  onSuccess: () => void;
}

export const EditCourseDialog = ({
  open,
  onOpenChange,
  course,
  onSuccess,
}: EditCourseDialogProps) => {
  const [moduleName, setModuleName] = useState(course.module_name);
  const [completionStatus, setCompletionStatus] = useState(course.completion_status);
  const [performanceScore, setPerformanceScore] = useState(course.performance_score);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setModuleName(course.module_name);
    setCompletionStatus(course.completion_status);
    setPerformanceScore(course.performance_score);
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("courses")
        .update({
          module_name: moduleName,
          completion_status: completionStatus,
          performance_score: performanceScore,
        })
        .eq("id", course.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Course updated successfully",
      });
      
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update course",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-module-name">Course Name</Label>
            <Input
              id="edit-module-name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-completion">Completion Status (%)</Label>
            <Input
              id="edit-completion"
              type="number"
              min="0"
              max="100"
              value={completionStatus}
              onChange={(e) => setCompletionStatus(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-performance">Performance Score (%)</Label>
            <Input
              id="edit-performance"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={performanceScore}
              onChange={(e) => setPerformanceScore(Number(e.target.value))}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};