import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormValues {
  name: string;
  icon: FileList | null;
  status: string;
}

const AddNewCategory = () => {
  const { toast } = useToast();
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  // Setup the form with default values
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      icon: null,
      status: "active",
    }
  });

  // Show a preview of the uploaded icon
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("icon", e.target.files as FileList); // set in form state
    }
  };

  // Submit form data to backend
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData(); // create multipart form data
    formData.append("name", data.name);
    formData.append("status", data.status);
    if (data.icon) {
      formData.append("icon", data.icon[0]); // only the first file
    }

    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Category Created",
          description: `Category "${result.category.name}" has been created successfully.`,
        });

        // Optional: Reset form after successful submission
        form.reset();
        setIconPreview(null);
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Create category error:", error);
      toast({
        title: "Server Error",
        description: "Unable to create category. Try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Add New Category">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will be displayed to users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Icon Upload */}
            <FormItem>
              <FormLabel>Category Icon</FormLabel>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="max-w-xs"
                />
                {iconPreview && (
                  <div className="h-16 w-16 relative">
                    <img
                      src={iconPreview}
                      alt="Icon preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <FormDescription>
                Upload an icon for this category (recommended size: 64x64px).
              </FormDescription>
            </FormItem>

            {/* Status Dropdown */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set whether this category is active or inactive.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                asChild
              >
                <Link to="/admin/categories">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Create Category
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddNewCategory;
