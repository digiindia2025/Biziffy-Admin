
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";

const linksData = [
  {
    id: 1,
    link: "biziffy-admin.vercel.app",
    title: "nitin"
  },
 
];

const Links = () => {
  const { toast } = useToast();
  
  const handleEdit = (id: number) => {
    toast({
      title: "Edit Link",
      description: `Edit link #${id}`,
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: "Delete Link",
      description: `Delete link #${id}? This action cannot be undone.`,
    });
  };
  
  const handleAddNew = () => {
    toast({
      title: "Add New Link",
      description: "Open dialog to add a new link",
    });
  };

  return (
    <AdminLayout title="All Links">
      <div className="mb-6">
        <Button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-600">
          Add New Link
        </Button>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr. No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {linksData.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {link.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.link}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {link.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EditButton onClick={() => handleEdit(link.id)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DeleteButton onClick={() => handleDelete(link.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Links;
