
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
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      icon: null,
      status: "active",
    }
  });
  
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("icon", e.target.files as FileList);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    toast({
      title: "Category Created",
      description: `Category "${data.name}" has been created successfully.`,
    });
  };

  return (
    <AdminLayout title="Add New Category">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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