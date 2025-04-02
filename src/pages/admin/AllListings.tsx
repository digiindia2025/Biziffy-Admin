
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
  
  // Mock data for listings
  const listings = [
    // { id: 176, title: "aaaaaaaa.a", category: "Daily Home Needs", user: "Karamjeet Kaur", createdDate: "3 months ago", publishedDate: "Published", status: "Approved", businessStatus: "Not Approved", trustStatus: "Not Approved" },
    // { id: 174, title: "Green Leaf Organic Medicine", category: "Doctors, Clinics & Hospitals", user: "vipin dhiman", createdDate: "3 months ago", publishedDate: "Published", status: "Pending", businessStatus: "Not Approved", trustStatus: "Not Approved" },
    // { id: 173, title: "Biziffy Local Business1", category: "Daily Home Needs", user: "Karamjeet Kaur", createdDate: "3 months ago", publishedDate: "Published", status: "Pending", businessStatus: "Approved", trustStatus: "Approved" },
    // { id: 171, title: "Wooden Street", category: "Daily Home Needs", user: "Karamjeet Kaur", createdDate: "3 months ago", publishedDate: "Published", status: "Pending", businessStatus: "Approved", trustStatus: "Approved" },
    // { id: 169, title: "Park Inn Hotel", category: "Hotels & Accommodation", user: "Karamjeet Kaur", createdDate: "4 months ago", publishedDate: "Published", status: "Pending", businessStatus: "Approved", trustStatus: "Approved" },
    // { id: 168, title: "ABC Holidays Pvt Ltd", category: "Hotels & Accommodation", user: "Karamjeet Kaur", createdDate: "4 months ago", publishedDate: "Published", status: "Pending", businessStatus: "Approved", trustStatus: "Approved" },
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
            defaultValue="Bulk Action"
          >
            {/* <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Approve">Approve</option>
            <option value="Reject">Reject</option> */}
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
          <Button className="bg-blue-500 hover:bg-blue-600">
            {/* Export to CSV */}
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <input type="checkbox" className="h-4 w-4" />
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
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
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