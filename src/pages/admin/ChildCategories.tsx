import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

// Dummy data
const childCategoriesData = [
  {
    id: 1,
    childCategory: "Burger",
    image: "/images/profile-icon.png",
    subcategory: "Fast Food",
    mainCategory: "Food",
    status: "active",
    createDate: "31-03-2025"
  },
  {
    id: 2,
    childCategory: "Laptop",
    image: "/images/profile-icon.png",
    subcategory: "Electronics",
    mainCategory: "Gadgets",
    status: "inactive",
    createDate: "30-03-2025"
  },
  {
    id: 3,
    childCategory: "Shampoo",
    image: "/images/profile-icon.png",
    subcategory: "Hair Care",
    mainCategory: "Beauty",
    status: "active",
    createDate: "29-03-2025"
  },
  {
    id: 4,
    childCategory: "T-shirt",
    image: "/images/profile-icon.png",
    subcategory: "Clothing",
    mainCategory: "Fashion",
    status: "active",
    createDate: "28-03-2025"
  },
  {
    id: 5,
    childCategory: "Mobile Cover",
    image: "/images/profile-icon.png",
    subcategory: "Accessories",
    mainCategory: "Mobile",
    status: "inactive",
    createDate: "27-03-2025"
  },
  {
    id: 6,
    childCategory: "Sofa Set",
    image: "/images/profile-icon.png",
    subcategory: "Living Room",
    mainCategory: "Furniture",
    status: "active",
    createDate: "26-03-2025"
  },
  {
    id: 7,
    childCategory: "Action Figure",
    image: "/images/profile-icon.png",
    subcategory: "Toys",
    mainCategory: "Kids",
    status: "active",
    createDate: "25-03-2025"
  },
  {
    id: 8,
    childCategory: "Sneakers",
    image: "/images/profile-icon.png",
    subcategory: "Footwear",
    mainCategory: "Shoes",
    status: "inactive",
    createDate: "24-03-2025"
  },
  {
    id: 9,
    childCategory: "Headphones",
    image: "/images/profile-icon.png",
    subcategory: "Audio",
    mainCategory: "Tech",
    status: "active",
    createDate: "23-03-2025"
  },
  {
    id: 10,
    childCategory: "Notebook",
    image: "/images/profile-icon.png",
    subcategory: "Stationery",
    mainCategory: "Office",
    status: "inactive",
    createDate: "22-03-2025"
  }
];

const ChildCategories = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = childCategoriesData.filter((item) =>
    item.childCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mainCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id: number) => {
    toast({ title: "Edit Child Category", description: `Edit child category #${id}` });
  };

  const handleDelete = (id: number) => {
    toast({ title: "Delete Child Category", description: `Delete child category #${id}` });
  };

  const handleExportToCSV = () => {
    const headers = ["ID", "Child Category", "Subcategory", "Main Category", "Status", "Create Date"];
    const rows = filteredData.map((item) => [
      item.id,
      item.childCategory,
      item.subcategory,
      item.mainCategory,
      item.status,
      item.createDate
    ]);

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "child_categories.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="All Child Categories">
      {/* Top Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Delete Selected</option>
            <option>Mark as Active</option>
            <option>Mark as Inactive</option>
          </select>
          <Button onClick={() => toast({ title: "Bulk Action" })} className="bg-blue-500 hover:bg-blue-600">
            Apply
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button onClick={() => toast({ title: "Navigate to Add" })} className="bg-blue-500 hover:bg-blue-600">
            Add Child Category
          </Button>

          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3"><input type="checkbox" /></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subcategory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Main Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4"><input type="checkbox" /></td>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.childCategory}</td>
                <td className="px-6 py-4">
                  {item.image ? (
                    <img src={item.image} alt={item.childCategory} className="h-10 w-10 rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-500">No img</div>
                  )}
                </td>
                <td className="px-6 py-4">{item.subcategory}</td>
                <td className="px-6 py-4">{item.mainCategory}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold ${item.status === "active" ? "text-green-600" : "text-red-600"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">{item.createDate}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <DeleteButton onClick={() => handleDelete(item.id)} />
                    <EditButton onClick={() => handleEdit(item.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default ChildCategories;
