import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { subcategoriesData } from "../data/subcategoriesData";

const AllSubcategories = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const subcategoriesPerPage = 5;

  const handleEdit = (id: number) => {
    toast({ title: "Edit Subcategory", description: `Edit subcategory #${id}` });
  };

  const handleDelete = (id: number) => {
    toast({ title: "Delete Subcategory", description: `Delete subcategory #${id}` });
  };

  const handleExportToCSV = () => {
    const headers = ["ID", "Name", "Category", "Status", "Create Date"];
    const rows = filteredSubcategories.map(sub => [sub.id, sub.name, sub.category, sub.status, sub.createDate]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "subcategories.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast({ title: "Exported", description: "Subcategories exported to CSV." });
  };

  const handleApplyBulkAction = () => {
    toast({ title: "Apply Bulk Action", description: "Apply bulk action to selected subcategories" });
  };

  const filteredSubcategories = subcategoriesData.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * subcategoriesPerPage;
  const indexOfFirst = indexOfLast - subcategoriesPerPage;
  const currentSubcategories = filteredSubcategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSubcategories.length / subcategoriesPerPage);

  return (
    <AdminLayout title="">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Delete Selected</option>
            <option>Mark as Active</option>
            <option>Mark as Inactive</option>
          </select>
          <Button onClick={handleApplyBulkAction} className="bg-blue-500 hover:bg-blue-600">Apply</Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
            <Link to="/admin/subcategories/add">Add New Subcategory</Link>
          </Button>

          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Subcategory Name</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Main Category</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Create Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSubcategories.map((subcategory) => (
              <tr key={subcategory.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">{subcategory.id}</td>
                <td className="px-6 py-4">{subcategory.name}</td>
                <td className="px-6 py-4">
                  <img src={subcategory.image} alt={subcategory.name} className="h-10 w-10 rounded" />
                </td>
                <td className="px-6 py-4">{subcategory.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`w-2 h-8 rounded-l ${subcategory.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded ${subcategory.status === "active" ? "text-green-800" : "text-red-800"}`}>
                      {subcategory.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">{subcategory.createDate}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <DeleteButton onClick={() => handleDelete(subcategory.id)} />
                    <EditButton onClick={() => handleEdit(subcategory.id)} />
                  </div>
                </td>
              </tr>
            ))}
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

export default AllSubcategories;
