
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Lock, Trash2 } from "lucide-react";
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

const DeactivatedUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for deactivated users - initially empty
  const deactivatedUsers: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
  }> = [];

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
    <AdminLayout title="Deactivated Users">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Deactivated Users</h1>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <select 
            className="px-4 py-2 border rounded-md"
            defaultValue="Bulk Action"
          >
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Restore">Restore</option>
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
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deactivatedUsers.length > 0 ? (
              deactivatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4" />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-red-500 font-medium text-lg">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {deactivatedUsers.length > 0 && (
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
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DeactivatedUsers;