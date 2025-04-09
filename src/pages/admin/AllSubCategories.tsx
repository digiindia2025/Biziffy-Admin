import { useState, useEffect } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const AllSubcategories = () => {
  const { toast } = useToast();
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const subcategoriesPerPage = 5;

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/subcategories");
      setSubcategoriesData(res.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast({ title: "Error", description: "Failed to fetch subcategories" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleEdit = (id: string) => {
    toast({ title: "Edit Subcategory", description: `Edit subcategory #${id}` });
  };

  const handleDelete = (id: string) => {
    toast({ title: "Delete Subcategory", description: `Delete subcategory #${id}` });
  };

  const handleExportToCSV = () => {
    const headers = ["ID", "Name", "Category", "Status", "Create Date"];
    const rows = filteredSubcategories.map((sub: any) => [
      sub._id,
      sub.name,
      sub.category,
      sub.status,
      new Date(sub.createdAt).toLocaleDateString(),
    ]);

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
    toast({ title: "Apply Bulk Action", description: "Bulk action applied" });
  };

  const filteredSubcategories = subcategoriesData.filter((sub: any) =>
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
          <Button onClick={handleApplyBulkAction} className="bg-blue-500 hover:bg-blue-600">
            Apply
          </Button>
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
              <th className="px-6 py-3"><input type="checkbox" /></th>
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
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-6">Loading...</td>
              </tr>
            ) : currentSubcategories.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6">No subcategories found.</td>
              </tr>
            ) : (
              currentSubcategories.map((subcategory: any) => (
                <tr key={subcategory._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><input type="checkbox" /></td>
                  <td className="px-6 py-4">{subcategory._id}</td>
                  <td className="px-6 py-4">{subcategory.name}</td>
                  <td className="px-6 py-4">
                    <img
                      src={subcategory.imageUrl || "https://via.placeholder.com/40"}
                      alt={subcategory.name}
                      className="h-10 w-10 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{subcategory.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${subcategory.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {subcategory.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(subcategory.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <DeleteButton onClick={() => handleDelete(subcategory._id)} />
                      <EditButton onClick={() => handleEdit(subcategory._id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
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

        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AllSubcategories;
