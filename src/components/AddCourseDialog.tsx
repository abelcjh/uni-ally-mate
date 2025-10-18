import { useState } from "react";
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

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSuccess: () => void;
}

export const AddCourseDialog = ({
  open,
  onOpenChange,
  userId,
  onSuccess,
}: AddCourseDialogProps) => {
  const [moduleName, setModuleName] = useState("");
  const [completionStatus, setCompletionStatus] = useState(0);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("courses").insert({
        user_id: userId,
        module_name: moduleName,
        completion_status: completionStatus,
        performance_score: performanceScore,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Course added successfully",
      });
      
      setModuleName("");
      setCompletionStatus(0);
      setPerformanceScore(0);
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add course",
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
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="module-name">Course Name</Label>
            <Input
              id="module-name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="e.g., Software Engineering"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="completion">Completion Status (%)</Label>
            <Input
              id="completion"
              type="number"
              min="0"
              max="100"
              value={completionStatus}
              onChange={(e) => setCompletionStatus(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="performance">Performance Score (%)</Label>
            <Input
              id="performance"
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
              {loading ? "Adding..." : "Add Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};