import { useEffect, useState } from "react";
import axios from "axios";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Eye, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Listing {
  _id: string;
  title?: string;
  category?: string;
  user?: string;
  createdDate?: string;
  publishedDate?: string;
  status?: string;
  businessStatus?: string;
  trustStatus?: string;
}

export const AllListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState("Bulk Action");
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 5;
  const [editingPublishStatusId, setEditingPublishStatusId] = useState<string | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [publishStatusOptions] = useState(["Pending", "Published", "Unpublished"]);
  const [statusOptions] = useState(["Pending", "Approved", "Rejected"]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchListings();
  }, [currentPage]);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/listings?page=${currentPage}&limit=${listingsPerPage}`);
      setListings(res.data.listings);
      setTotalPages(Math.ceil(res.data.total / listingsPerPage));
    } catch (error) {
      console.error("Failed to fetch listings", error);
    }
  };

  const filteredListings = listings.filter((listing) => {
    const query = searchQuery.toLowerCase();
    return (
      listing.title?.toLowerCase().includes(query) ||
      listing.category?.toLowerCase().includes(query) ||
      listing.user?.toLowerCase().includes(query) ||
      listing.createdDate?.toLowerCase().includes(query) ||
      listing.publishedDate?.toLowerCase().includes(query) ||
      listing.status?.toLowerCase().includes(query) ||
      listing.businessStatus?.toLowerCase().includes(query) ||
      listing.trustStatus?.toLowerCase().includes(query)
    );
  });

  const currentListings = filteredListings;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleBulkAction = async () => {
    
    if (selectedAction === "Bulk Action" || selectedListings.length === 0) return;

    try {
      await axios.post(`http://localhost:5000/api/admin/listings/bulk-action`, {
        ids: selectedListings,
        action: selectedAction,
        
      });
      fetchListings();
      setSelectedListings([]);
      setSelectedAction("Bulk Action");
    } catch (error) {
      console.error(`Failed to ${selectedAction} listings`, error);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedListings.includes(id)) {
      setSelectedListings(selectedListings.filter((item) => item !== id));
    } else {
      setSelectedListings([...selectedListings, id]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedListings(currentListings.map((listing) => listing._id));
    } else {
      setSelectedListings([]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Approved</span>;
      case "Pending":
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      case "Rejected":
        return <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">Rejected</span>;
      default:
        return <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getBusinessTrustStatus = (status: string) => {
    const color = status === "Approved" ? "bg-blue-600" : "bg-red-600";
    return <span className={`px-2 py-1 text-xs ${color} text-white rounded-md`}>{status} Business Status</span>;
  };

  const getTrustStatus = (status: string) => {
    const color = status === "Approved" ? "bg-green-600" : "bg-yellow-600";
    return <span className={`px-2 py-1 text-xs ${color} text-white rounded-md`}>{status} Trust Status</span>;
  };

  const handleUpdatePublishStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/listings/${id}`, { publishedDate: newStatus });
      setListings(listings.map((listing) =>
        listing._id === id ? { ...listing, publishedDate: newStatus } : listing
      ));
      setEditingPublishStatusId(null);
    } catch (error) {
      console.error("Failed to update publish status", error);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/listings/${id}`, { status: newStatus });
      setListings(listings.map((listing) => {
        if (listing._id === id) {
          return {
            ...listing,
            status: newStatus,
            businessStatus: newStatus === "Approved" ? "Approved" : "Not Approved",
            trustStatus: newStatus === "Approved" || newStatus === "Pending" ? "Approved" : "Not Approved",
          };
        }
        return listing;
      }));
      setEditingStatusId(null);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/listings/${id}`);
        fetchListings();
      } catch (error) {
        console.error("Failed to delete listing", error);
      }
    }
  };

  return (
    <AdminLayout title="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All User Listings</h1>
      </div>

      {/* Bulk Actions + Search/Export */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Approve">Approve</option>
            <option value="Reject">Reject</option>
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleBulkAction} disabled={selectedListings.length === 0}>
            Apply
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-40 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CSVLink
            data={filteredListings}
            filename="listings.csv"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm text-center w-28 sm:w-auto"
          >
            Export to CSV
          </CSVLink>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={handleSelectAll}
                  checked={
                    currentListings.length > 0 &&
                    selectedListings.length === currentListings.length
                  }
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentListings.map((listing) => (
              <TableRow key={listing._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedListings.includes(listing._id)}
                    onChange={() => handleCheckboxChange(listing._id)}
                  />
                </TableCell>
                <TableCell>{listing._id}</TableCell>
                <TableCell>{listing.title}</TableCell>
                <TableCell>{listing.category}</TableCell>
                <TableCell>{listing.user}</TableCell>
                <TableCell>{listing.createdDate}</TableCell>
                <TableCell>
                  {editingPublishStatusId === listing._id ? (
                    <select
                      className="px-2 py-1 border rounded-md"
                      value={listing.publishedDate}
                      onChange={(e) => handleUpdatePublishStatus(listing._id, e.target.value)}
                      onBlur={() => setEditingPublishStatusId(null)}
                      autoFocus
                    >
                      {publishStatusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{listing.publishedDate}</span>
                      <button
                        onClick={() => setEditingPublishStatusId(listing._id)}
                        className="p-1 bg-orange-200 rounded-md hover:bg-orange-300 transition-colors w-6 h-6 flex items-center justify-center"
                      >
                        <Pencil className="w-3 h-3 text-orange-600" />
                      </button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingStatusId === listing._id ? (
                    <select
                      className="px-2 py-1 border rounded-md"
                      value={listing.status}
                      onChange={(e) => handleUpdateStatus(listing._id, e.target.value)}
                      onBlur={() => setEditingStatusId(null)}
                      autoFocus
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      {getStatusBadge(listing.status || "")}
                      <button
                        onClick={() => setEditingStatusId(listing._id)}
                        className="p-1 bg-orange-200 rounded-md hover:bg-orange-300 transition-colors w-6 h-6 flex items-center justify-center"
                      >
                        <Pencil className="w-3 h-3 text-orange-600" />
                      </button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Link to={`/admin/listings/details/${listing._id}`}>
                        <Button size="sm" variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteListing(listing._id)}>
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {getBusinessTrustStatus(listing.businessStatus || "Not Approved")}
                      {getTrustStatus(listing.trustStatus || "Not Approved")}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          <Button size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllListings;