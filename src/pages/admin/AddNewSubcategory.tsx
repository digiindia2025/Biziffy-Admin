
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

const categories = [
  { id: 1, name: "Doctors, Clinics & Hospitals" },
  { id: 2, name: "Restaurants & Cafés" },
  { id: 3, name: "Hotels & Accommodation" }
];

interface FormValues {
  name: string;
  image: FileList | null;
  category: string;
  status: string;
}

const AddNewSubcategory = () => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      image: null,
      category: "",
      status: "active",
    }
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", e.target.files as FileList);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    toast({
      title: "Subcategory Created",
      description: `Subcategory "${data.name}" has been created successfully.`,
    });
  };

  return (
    <AdminLayout title="Add New Subcategory">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter subcategory name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will be displayed to users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Subcategory Image</FormLabel>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="max-w-xs"
                />
                {imagePreview && (
                  <div className="h-16 w-16 relative">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <FormDescription>
                Upload an image for this subcategory (recommended size: 200x200px).
              </FormDescription>
            </FormItem>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select main category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select which main category this subcategory belongs to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                    Set whether this subcategory is active or inactive.
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
                <Link to="/admin/subcategories">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Create Subcategory
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AddNewSubcategory;