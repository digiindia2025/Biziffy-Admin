
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const AddNewAdvertisement = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    businessCategory: "",
    subCategory: "",
    childCategory: "",
    redirectUrl: "",
    status: "Inactive",
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send this data to an API
  };

  return (
    <AdminLayout title="Add New Advertisement">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Advertisement</h1>
        <Link to="/admin/advertisements">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add  Advertisements
          </Button>
        </Link>
      </div>
      
      {/* <div className="bg-white rounded-md border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6"> */}
            {/* <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter advertisement title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
             */}
            {/* <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select 
                id="type"
                name="type"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Type</option>
                <option value="Listing detail center">Listing detail center</option>
                <option value="Listing detail Right">Listing detail Right</option>
                <option value="Listing Bottom">Listing Bottom</option>
              </select>
            </div>
             */}
            {/* <div className="space-y-2">
              <Label htmlFor="businessCategory">Business Category *</Label>
              <select 
                id="businessCategory"
                name="businessCategory"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.businessCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Advertising & Marketing">Advertising & Marketing</option>
                <option value="Gifting">Gifting</option>
                <option value="Daily Home Needs">Daily Home Needs</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subCategory">Sub Category</Label>
              <select 
                id="subCategory"
                name="subCategory"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.subCategory}
                onChange={handleInputChange}
              >
                <option value="">Select Sub Category</option>
                <option value="Advertising & PR Agencies">Advertising & PR Agencies</option>
              </select>
            </div>
             */}
            {/* <div className="space-y-2">
              <Label htmlFor="childCategory">Child Category</Label>
              <select 
                id="childCategory"
                name="childCategory"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.childCategory}
                onChange={handleInputChange}
              >
                <option value="">Select Child Category</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="redirectUrl">Redirect URL</Label>
              <Input
                id="redirectUrl"
                name="redirectUrl"
                placeholder="https://example.com"
                value={formData.redirectUrl}
                onChange={handleInputChange}
                required
              />
            </div>
             */}
            {/* <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status"
                name="status"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Advertisement Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="space-y-2">
                <div className="flex justify-center"> */}
                  {/* <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-200 hover:bg-gray-300"
                  >
                    Upload Image
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div> */}
          
          {/* <Button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 px-6"
          >
            Submit Advertise
          </Button>
        </form> */}
      {/* </div> */}
    </AdminLayout>
  );
};

export default AddNewAdvertisement;