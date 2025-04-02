
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for users
  const users = [
    { id: 1, name: "Aman Tiwari", email: "amantiwari@gmail.com", phone: "9031359720", status: "Active" },
    
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>;
      case "Inactive":
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">Inactive</span>;
      case "Deactivated":
        return <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">Deactivated</span>;
      default:
        return <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  return (
    <AdminLayout title="All Users">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <select 
            className="px-4 py-2 border rounded-md"
            defaultValue="Bulk Action"
          >
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
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
                <input type="checkbox" className="h-4 w-4" />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {user.email}
                    <span className="ml-2 inline-block rounded-full bg-green-100 p-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.3584 6.64L7.76 10.24C7.66292 10.3368 7.53238 10.3915 7.39599 10.3915C7.25959 10.3915 7.12905 10.3368 7.03197 10.24L4.64001 7.85C4.55628 7.75371 4.51375 7.6272 4.52122 7.49947C4.52869 7.37175 4.58555 7.25115 4.67871 7.16511C4.77187 7.07907 4.89647 7.03272 5.02481 7.03632C5.15316 7.03992 5.27465 7.09315 5.36362 7.18401L7.4 9.22L10.6384 5.96C10.728 5.87146 10.8486 5.82006 10.9755 5.81747C11.1024 5.81487 11.225 5.86128 11.3181 5.94551C11.4112 6.02975 11.4685 6.14574 11.4797 6.27224C11.4909 6.39874 11.4551 6.52532 11.3784 6.62667L11.3584 6.64Z" fill="#22C55E"/>
                      </svg>
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="default" className="bg-blue-500 hover:bg-blue-600">
                      <Eye className="h-4 w-4" />
                      User Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Lock className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllUsers;