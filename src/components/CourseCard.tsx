import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Edit, Trash2, FileText } from "lucide-react";
import { useState } from "react";
import { MaterialsDialog } from "@/components/MaterialsDialog";

interface Course {
  id: string;
  module_name: string;
  completion_status: number;
  performance_score: number;
}

interface CourseCardProps {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
}

export const CourseCard = ({ course, onEdit, onDelete }: CourseCardProps) => {
  const [materialsOpen, setMaterialsOpen] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 flex-1">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-sm line-clamp-2">
                {course.module_name}
              </h3>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.completion_status}%</span>
            </div>
            <Progress value={course.completion_status} className="h-2" />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Performance</span>
            <span className={`font-bold ${getScoreColor(course.performance_score || 0)}`}>
              {course.performance_score?.toFixed(1) || "N/A"}%
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMaterialsOpen(true)}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-1" />
            Materials
          </Button>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </CardFooter>
      </Card>

      <MaterialsDialog
        open={materialsOpen}
        onOpenChange={setMaterialsOpen}
        courseId={course.id}
        courseName={course.module_name}
      />
    </>
  );
};