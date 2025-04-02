
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

const childCategoriesData = [
  {
    id: 1,
    childCategory: "kuch bhi",
    image: "/images/profile-icon.png",
    subcategory: "vishnu, nitin & aman",
    mainCategory: "Deepak, Aman & Nitin",
    status: "active",
    createDate: "31-03-2025"
  }
];

const ChildCategories = () => {
  const { toast } = useToast();
  
  const handleEdit = (id: number) => {
    toast({
      title: "Edit Child Category",
      description: `Edit child category #${id}`,
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: "Delete Child Category",
      description: `Delete child category #${id}? This action cannot be undone.`,
    });
  };
  
  const handleAddCategory = () => {
    toast({
      title: "Add Child Category",
      description: "Navigate to add child category form",
    });
  };
  
  const handleExportToCSV = () => {
    toast({
      title: "Export to CSV",
      description: "Export child categories to CSV file",
    });
  };
  
  const handleApplyBulkAction = () => {
    toast({
      title: "Apply Bulk Action",
      description: "Apply bulk action to selected child categories",
    });
  };

  return (
    <AdminLayout title="All Child Categories">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Delete Selected</option>
            <option>Mark as Active</option>
            <option>Mark as Inactive</option>
          </select>
          <Button 
            onClick={handleApplyBulkAction}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Apply
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button onClick={handleAddCategory} className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
            Add Child Category
          </Button>
          
          <div className="relative w-64">
            <Input 
              type="text" 
              placeholder="Search" 
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
            Export to CSV
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Child Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategory
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Main Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {childCategoriesData.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.childCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.image ? (
                    <img src={category.image} alt={category.childCategory} className="h-10 w-10 rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                      No img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.subcategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.mainCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`w-2 h-8 rounded-l ${category.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded ${
                      category.status === "active" 
                        ? "text-green-800" 
                        : "text-red-800"
                    }`}>
                      {category.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.createDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <DeleteButton onClick={() => handleDelete(category.id)} />
                    <EditButton onClick={() => handleEdit(category.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ChildCategories;
