import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Link as LinkIcon, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Material {
  id: string;
  title: string;
  file_url: string | null;
  description: string | null;
  uploaded_at: string;
}

interface MaterialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseName: string;
}

export const MaterialsDialog = ({
  open,
  onOpenChange,
  courseId,
  courseName,
}: MaterialsDialogProps) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    file_url: "",
    description: "",
  });
  const { toast } = useToast();

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from("course_materials")
        .select("*")
        .eq("course_id", courseId)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load materials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchMaterials();
    }
  }, [open, courseId]);

  const handleAdd = async () => {
    if (!newMaterial.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }

    setAdding(true);
    try {
      const { error } = await supabase.from("course_materials").insert({
        course_id: courseId,
        title: newMaterial.title,
        file_url: newMaterial.file_url || null,
        description: newMaterial.description || null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Material added successfully",
      });
      
      setNewMaterial({ title: "", file_url: "", description: "" });
      fetchMaterials();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add material",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("course_materials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Material deleted successfully",
      });
      fetchMaterials();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete material",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Materials - {courseName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Material Form */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material-title">Title</Label>
                <Input
                  id="material-title"
                  value={newMaterial.title}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, title: e.target.value })
                  }
                  placeholder="e.g., Lecture Notes Week 5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="material-url">File URL or Link</Label>
                <Input
                  id="material-url"
                  value={newMaterial.file_url}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, file_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="material-desc">Description (optional)</Label>
                <Textarea
                  id="material-desc"
                  value={newMaterial.description}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      description: e.target.value,
                    })
                  }
                  placeholder="Brief description of the material"
                  rows={2}
                />
              </div>

              <Button onClick={handleAdd} disabled={adding} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {adding ? "Adding..." : "Add Material"}
              </Button>
            </CardContent>
          </Card>

          {/* Materials List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">
              Existing Materials ({materials.length})
            </h3>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : materials.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground text-sm">
                No materials yet. Add your first one above!
              </p>
            ) : (
              <div className="space-y-2">
                {materials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="flex items-start justify-between p-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-sm">{material.title}</h4>
                        </div>
                        {material.description && (
                          <p className="text-xs text-muted-foreground">
                            {material.description}
                          </p>
                        )}
                        {material.file_url && (
                          <a
                            href={material.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            Open link
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(material.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};