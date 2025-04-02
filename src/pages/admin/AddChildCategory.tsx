
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddChildCategory = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentCategory: "",
    subCategory: "",
    childCategoryName: "",
    image: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form Submitted",
      description: "Child category would be created in a real app",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    toast({
      title: "Upload Image",
      description: "Image upload functionality would be implemented in a real app",
    });
  };

  return (
    <AdminLayout title="Add New Child Category">
      <div className="flex justify-end mb-4">
        {/* <Button asChild className="bg-blue-500 hover:bg-blue-600">
          <Link to="/admin/child-categories">All Child Categories</Link>
        </Button> */}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              {/* <Label htmlFor="parentCategory" className="text-base after:content-['*'] after:text-red-500 after:ml-1">
                Select Parent Category
              </Label> */}
              <select 
                id="parentCategory"
                name="parentCategory"
                value={formData.parentCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {/* <option value="">Select Category</option> */}
                {/* <option value="1">Doctors, Clinics & Hospitals</option> */}
                {/* <option value="2">Daily Needs</option>
                <option value="3">Education</option> */}
              </select>
            </div>
            
            <div className="space-y-2">
              {/* <Label htmlFor="subCategory" className="text-base after:content-['*'] after:text-red-500 after:ml-1">
                Select Sub Category
              </Label> */}
              <select 
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {/* <option value="">Select Sub Category</option>
                <option value="1">Pharmacy, Chemists & Medical Supplies</option>
                <option value="2">Doctors</option>
                <option value="3">Hospitals</option> */}
              </select>
            </div>
            
            <div>
              {/* <Label htmlFor="childCategoryName" className="text-base">Child Category</Label> */}
              <Input 
                id="childCategoryName"
                name="childCategoryName"
                placeholder="Child Category Name"
                value={formData.childCategoryName}
                onChange={handleChange}
                className="w-full mt-1"
              />
            </div>
            
            <div>
              {/* <Label className="text-base">Upload Child Category Image</Label> */}
              <div className="mt-1">
                {/* <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleImageUpload}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Upload Image
                </Button> */}
              </div>
            </div>
            
              {/* <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600"
              >
                Submit
              </Button> */}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddChildCategory;
