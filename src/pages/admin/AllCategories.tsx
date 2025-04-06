import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { categoriesData } from "../data/categoryData";


const AllCategories = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const categoriesPerPage = 5;

  const filteredCategories = categoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const handleEdit = (id: number) => {
    toast({ title: "Edit Category", description: `Edit category #${id}` });
  };

  const handleDelete = (id: number) => {
    toast({ title: "Delete Category", description: `Delete category #${id}? This action cannot be undone.` });
  };

  const handleExportToCSV = () => {
    const headers = ["ID", "Name", "Icon", "Status", "Create Date"];
    const rows = filteredCategories.map(cat => [
      cat.id,
      `"${cat.name}"`,
      cat.icon,
      cat.status,
      cat.createDate
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "categories.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ title: "Exported", description: "Categories exported to CSV." });
  };

  const handleApplyBulkAction = () => {
    toast({ title: "Apply Bulk Action", description: "Apply bulk action to selected categories" });
  };

  return (
    <AdminLayout title="All Categories">
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
            <Link to="/admin/categories/add">Add New Category</Link>
          </Button>

          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset page
              }}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">Export to CSV</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.icon ? (
                    <img src={category.icon} alt={category.name} className="h-10 w-10 rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">No icon</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`w-2 h-8 rounded-l ${category.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded ${category.status === "active" ? "text-green-800" : "text-red-800"}`}>{category.status === "active" ? "Active" : "Inactive"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.createDate}</td>
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

export default AllCategories;
