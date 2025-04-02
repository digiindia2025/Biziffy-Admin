
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";

const departmentsData = [
  // {
  //   id: 14,
  //   department: "Testing1",
  //   status: "active"
  // },
  // {
  //   id: 7,
  //   department: "Test Department",
  //   status: "inactive"
  // },
  // {
  //   id: 6,
  //   department: "Support (default)",
  //   status: "active"
  // },
  // {
  //   id: 5,
  //   department: "Sales",
  //   status: "active"
  // },
  // {
  //   id: 4,
  //   department: "Maintenance",
  //   status: "active"
  // },
  // {
  //   id: 3,
  //   department: "Business",
  //   status: "active"
  // },
  // {
  //   id: 2,
  //   department: "Project Manager",
  //   status: "active"
  // }
];

const Departments = () => {
  const { toast } = useToast();
  
  const handleEdit = (id: number) => {
    toast({
      title: "Edit Department",
      description: `Edit department #${id}`,
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: "Delete Department",
      description: `Delete department #${id}? This action cannot be undone.`,
    });
  };
  
  const handleEdit2 = (id: number) => {
    toast({
      title: "Edit Department Details",
      description: `Edit additional details for department #${id}`,
    });
  };
  
  const handleAddDepartment = () => {
    toast({
      title: "Add Department",
      description: "Open form to add a new department",
    });
  };

  return (
    <AdminLayout title="All Departments">
      <div className="mb-6 flex justify-end">
        <Button onClick={handleAddDepartment} className="bg-blue-500 hover:bg-blue-600">
          Add Department
        </Button>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-800">Notice: Department status inactive means the department will not show while create a ticket.</p>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departmentsData.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dept.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dept.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`w-2 h-8 rounded-l ${dept.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded ${
                      dept.status === "active" 
                        ? "text-green-800" 
                        : "text-yellow-800"
                    }`}>
                      {dept.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <EditButton onClick={() => handleEdit(dept.id)} />
                    <DeleteButton onClick={() => handleDelete(dept.id)} />
                    <Button 
                      onClick={() => handleEdit2(dept.id)}
                      className="h-9 w-9 bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </Button>
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

export default Departments;
