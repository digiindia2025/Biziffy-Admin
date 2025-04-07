import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Eye, Trash2 } from "lucide-react";
import AllUserData from "../data/AllUserData"
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
import { useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Deactivated";
}

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();
  

  const users: UserData[] = [
    { id: 1, name: "Aman Tiwari", email: "aman@gmail.com", phone: "9031359720", status: "Active" },
    { id: 2, name: "Gourav", email: "gourav@gmail.com", phone: "9031359720", status: "Inactive" },
    { id: 3, name: "Vishnu", email: "Vishnu@gmail.com", phone: "9031359720", status: "Active" },
    { id: 4, name: "Nitin", email: "nitin@gmail.com", phone: "9031359720", status: "Inactive" },
    { id: 5, name: "Anjali Sharma", email: "anjali@gmail.com", phone: "9876543210", status: "Active" },
    { id: 6, name: "Rohan Verma", email: "rohan@gmail.com", phone: "8765432109", status: "Inactive" },
    { id: 7, name: "Priya Gupta", email: "priya@gmail.com", phone: "7654321098", status: "Active" },
    { id: 8, name: "Kunal Singh", email: "kunal@gmail.com", phone: "6543210987", status: "Inactive" },
    { id: 9, name: "Sneha Patel", email: "sneha@gmail.com", phone: "5432109876", status: "Active" },
    { id: 10, name: "Rajesh Yadav", email: "rajes@gmail.com", phone: "4321098765", status: "Inactive" },
    { id: 11, name: "Shweta Kumari", email: "shweta@gmail.com", phone: "3210987654", status: "Active" },
    { id: 12, name: "Vikram Mehra", email: "vikram@gmail.com", phone: "2109876543", status: "Inactive" },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadge = (status: UserData["status"]) => {
    const badgeColor =
      status === "Active" ? "green" :
      status === "Inactive" ? "yellow" :
      "red";
    return (
      <span className={`px-3 py-1 text-sm bg-${badgeColor}-100 text-${badgeColor}-800 rounded-full`}>
        {status}
      </span>
    );
  };

  const handleViewUserDetails = (userId: number) => {
    navigate(`/admin/users/${userId}`);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Status"];
    const rows = filteredUsers.map(u => [u.id, u.name, u.email, u.phone, u.status]);
    const csvContent = [headers, ...rows]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "users.csv";
    a.click();
  };

  const renderPageNumbers = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <AdminLayout title="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 border rounded-md" defaultValue="Bulk Action">
            <option value="Bulk Action">Bulk Action</option>
            <option value="Delete">Delete</option>
            <option value="Deactivate">Deactivate</option>
          </select>
          <Button className="bg-blue-500 hover:bg-blue-600">Apply</Button>
        </div>

        <div className="flex items-center gap-2">
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
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={exportToCSV}>
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
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell><input type="checkbox" className="h-4 w-4" /></TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleViewUserDetails(user.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button size="sm" variant="outline"><Lock className="h-4 w-4" /></Button>
                    <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="py-4 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {renderPageNumbers().map((num) => (
                <PaginationItem key={num} isActive={num === currentPage}>
                  <PaginationLink href="#" onClick={() => paginate(num)}>
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllUsers;
