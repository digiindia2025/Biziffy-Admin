import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const departmentsData = [
  { id: 1, department: "HR", status: "active" },
  { id: 2, department: "IT", status: "inactive" },
  { id: 3, department: "Sales", status: "active" },
  { id: 4, department: "Marketing", status: "inactive" },
  { id: 5, department: "Finance", status: "active" },
  { id: 6, department: "Support", status: "active" },
];

const Departments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 4;

  const handleEdit = (id: number) => {
    toast({ title: "Edit Department", description: `Edit department #${id}` });
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

  const handleExportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Department,Status"]
        .concat(
          filteredDepartments.map((dept) =>
            [dept.id, dept.department, dept.status].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "departments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: "Exported", description: "Departments exported to CSV" });
  };

  const filteredDepartments = departmentsData.filter((dept) =>
    dept.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * departmentsPerPage;
  const indexOfFirst = indexOfLast - departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  return (
    <AdminLayout title="">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button onClick={handleAddDepartment} className="bg-blue-500 hover:bg-blue-600">
          Add Department
        </Button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search Department"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-800">
          Notice: Department status inactive means the department will not show while creating a ticket.
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDepartments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{dept.id}</td>
                <td className="px-6 py-4 text-sm">{dept.department}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-8 rounded-l ${
                        dept.status === "active" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></span>
                    <span
                      className={`ml-2 px-2 text-xs font-semibold rounded ${
                        dept.status === "active" ? "text-green-800" : "text-yellow-800"
                      }`}
                    >
                      {dept.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
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
            {currentDepartments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Departments;
