import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddNewAdvertisement from "./AddNewAdvertisement";

const AllAdvertisements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [advertisements, setAdvertisements] = useState([
    { id: 1, category: "Advertising", title: "hii", type: "listener", status: "Active", imageUrl: "/images/profile-icon.png" },
    { id: 2, category: "Advertising", title: "hii", type: "Listing", status: "Active", imageUrl: "/images/profile-icon.png" },
    { id: 3, category: "Gifting", title: "test", type: "detail", status: "Active", imageUrl: "/images/profile-icon.png" },
    { id: 4, category: "Gifting", title: "test", type: "detail", status: "Active", imageUrl: "/images/profile-icon.png" },
    { id: 5, category: "Daily Home", title: "test", type: "Listing", status: "Active", imageUrl: "/images/profile-icon.png" },
  ]);

  const filteredAdvertisements = advertisements.filter((ad) => {
    const searchMatch = ad.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = filterCategory === "All" || ad.category === filterCategory;
    return searchMatch && categoryMatch;
  });

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

  const handleAddAdvertisement = (newAdvertisement) => {
    setAdvertisements([...advertisements, newAdvertisement]);
    setShowAddForm(false);
  };

  return (
    <AdminLayout title="All Advertisements">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Advertisements</h1>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2 border rounded-md"
            defaultValue="Bulk Action"
          >
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Activate">Activate</option>
            <option value="Deactivate">Deactivate</option>
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Apply
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {[...new Set(advertisements.map((ad) => ad.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowAddForm(true)}>
            Add Advertisement
          </Button>
        </div>
      </div>

      {showAddForm && (
        <AddNewAdvertisement onAddAdvertisement={handleAddAdvertisement} />
      )}

      {!showAddForm && (
        <div className="bg-white rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="h-4 w-4" />
                </TableHead>
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
              {filteredAdvertisements.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4" />
                  </TableCell>
                  <TableCell>{ad.id}</TableCell>
                  <TableCell>{ad.category}</TableCell>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>{ad.type}</TableCell>
                  <TableCell>
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img
                        src={ad.imageUrl}
                        alt={`Ad ${ad.id}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ad.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
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
      )}
    </AdminLayout>
  );
};

export default AllAdvertisements;