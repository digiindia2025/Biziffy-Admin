import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState("Bulk Action");
  const [selectedListings, setSelectedListings] = useState([]);
  
  // Mock data for listings
  const listings = [
    { id: 1, title: "digi india solution pvt Ltd", category: "Software Development", user: "Aman Tiwari", createdDate: "1 days ago", publishedDate: "Published", status: "Approved", businessStatus: "Not Approved", trustStatus: "Not Approved" },
    { id: 2, title: "Biziffy Costomer Engagement Pvt Ltd", category: "Engagement", user: "Gourav Panchal", createdDate: "2 days ago", publishedDate: "Not Published", status: "Reject", businessStatus: "Approved", trustStatus: "Approved" },
    { id: 3, title: "Justdial Software Pvt Ltd", category: "Service", user: "Deepak Verma", createdDate: "3 days ago", publishedDate: "Published", status: "Approved", businessStatus: "NotApproved", trustStatus: "Not Approved" },
  ];

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.createdDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.publishedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.businessStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.trustStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBulkAction = () => {
    if (selectedAction === "Bulk Action") return;

    if (selectedAction === "Delete") {
      // Implement delete logic here using selectedListings
      console.log("Deleting listings:", selectedListings);
    } else if (selectedAction === "Approve") {
      // Implement approve logic here using selectedListings
      console.log("Approving listings:", selectedListings);
    } else if (selectedAction === "Reject") {
      // Implement reject logic here using selectedListings
      console.log("Rejecting listings:", selectedListings);
    }
    // Clear selection after action
    setSelectedListings([]);
  };

  const handleCheckboxChange = (id) => {
    if (selectedListings.includes(id)) {
      setSelectedListings(selectedListings.filter((item) => item !== id));
    } else {
      setSelectedListings([...selectedListings, id]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedListings(filteredListings.map((listing) => listing.id));
    } else {
      setSelectedListings([]);
    }
  };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Category", key: "category" },
    { label: "User Name", key: "user" },
    { label: "Created Date", key: "createdDate" },
    { label: "Published Date", key: "publishedDate" },
    { label: "Status", key: "status" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Approved</span>;
      case "Pending":
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      default:
        return <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getBusinessTrustStatus = (status: string) => {
    if (status === "Approved") {
      return <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md">{status} Business Status</span>;
    } else {
      return <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-md">{status} Business Status</span>;
    }
  };

  const getTrustStatus = (status: string) => {
    if (status === "Approved") {
      return <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-md">{status} Trust Status</span>;
    } else {
      return <span className="px-2 py-1 text-xs bg-yellow-600 text-white rounded-md">{status} Trust Status</span>;
    }
  };

  return (
    <AdminLayout title="All User Listings">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All User Listings</h1>
      </div>
      
      <div className="flex justify-between mb-4">
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
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleBulkAction}>
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
          <Button className="bg-blue-500 hover:bg-blue-600">
            Export to CSV
          </Button>
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
                  checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
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
            {filteredListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedListings.includes(listing.id)}
                    onChange={() => handleCheckboxChange(listing.id)}
                  />
                </TableCell>
                <TableCell>{listing.id}</TableCell>
                <TableCell>{listing.title}</TableCell>
                <TableCell>{listing.category}</TableCell>
                <TableCell>{listing.user}</TableCell>
                <TableCell>{listing.createdDate}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded inline-block w-fit">
                      {listing.publishedDate}
                    </span>
                    <button className="p-2 bg-orange-200 rounded-md hover:bg-orange-300 transition-colors w-8 h-8 flex items-center justify-center">
                      <Pencil className="w-4 h-4 text-orange-600" />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(listing.status)}
                    <button className="p-2 bg-orange-200 rounded-md hover:bg-orange-300 transition-colors w-8 h-8 flex items-center justify-center">
                      <Pencil className="w-4 h-4 text-orange-600" />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Link to={`/admin/listings/details/${listing.id}`}>
                        <Button size="sm" variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button size="sm" variant="destructive">
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {getBusinessTrustStatus(listing.businessStatus)}
                      {getTrustStatus(listing.trustStatus)}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AllListings;