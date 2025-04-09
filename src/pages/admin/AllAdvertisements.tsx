import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import axios from "@/api/axios"; // ✅ Make sure this file exists

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Advertisement {
  id: number;
  category: string;
  title: string;
  type: string;
  status: "Active" | "Inactive" | string;
  imageUrl: string;
}

const AllAdvertisements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get("/advertisements"); // 👈 Your backend endpoint
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Failed to fetch advertisements", error);
      }
    };

    fetchAdvertisements();
  }, []);

  const filteredAdvertisements = advertisements.filter((ad) => {
    const searchMatch = ad.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = filterCategory === "All" || ad.category === filterCategory;
    return searchMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredAdvertisements.length / itemsPerPage);
  const paginatedAds = filteredAdvertisements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>;
      case "Inactive":
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">Inactive</span>;
      default:
        return <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const handleExportToCSV = () => {
    const csvRows = [
      ["ID", "Category", "Title", "Type", "Status"],
      ...filteredAdvertisements.map(ad => [
        ad.id,
        ad.category,
        ad.title,
        ad.type,
        ad.status
      ])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "advertisements.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Advertisements</h1>
      </div>

      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 border rounded-md" defaultValue="Bulk Action">
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Activate">Activate</option>
            <option value="Deactivate">Deactivate</option>
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600">Apply</Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Input
            type="text"
            placeholder="Search"
            className="w-64"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            {[...new Set(advertisements.map((ad) => ad.category))].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Button className="bg-green-500 hover:bg-green-600" onClick={handleExportToCSV}>
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><input type="checkbox" className="h-4 w-4" /></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAds.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell><input type="checkbox" className="h-4 w-4" /></TableCell>
                <TableCell>{ad.id}</TableCell>
                <TableCell>{ad.category}</TableCell>
                <TableCell>{ad.title}</TableCell>
                <TableCell>{ad.type}</TableCell>
                <TableCell>
                  <img src={ad.imageUrl} alt={`Ad ${ad.id}`} className="h-12 w-12 object-cover rounded-md" />
                </TableCell>
                <TableCell>{getStatusBadge(ad.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AllAdvertisements;
