import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const enquiriesData = [
  { id: 1, userName: "amantiwari2357", title: "Aman", name: "Tiwari", requirement: "jaldi me " },
  { id: 2, userName: "amantiwari2357", title: "Aman", name: "Tiwari", requirement: "jaldi me " },
  { id: 3, userName: "john123", title: "John", name: "Doe", requirement: "Urgent need" },
  { id: 4, userName: "jane456", title: "Jane", name: "Smith", requirement: "Requirement A" },
  { id: 5, userName: "alex789", title: "Alex", name: "Johnson", requirement: "Requirement B" },
  { id: 6, userName: "sam007", title: "Sam", name: "Brown", requirement: "Something quick" },
];

const Enquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 4;

  const filteredEnquiries = enquiriesData.filter((enquiry) =>
    Object.values(enquiry).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);
  const indexOfLast = currentPage * enquiriesPerPage;
  const indexOfFirst = indexOfLast - enquiriesPerPage;
  const currentEnquiries = filteredEnquiries.slice(indexOfFirst, indexOfLast);

  const paginate = (page: number) => setCurrentPage(page);

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

  const exportToCSV = () => {
    const headers = ["ID", "User Name", "Title", "Name", "Requirement"];
    const rows = filteredEnquiries.map(e => [e.id, e.userName, e.title, e.name, e.requirement]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "enquiries.csv";
    a.click();
  };

  return (
    <AdminLayout title="">
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Search enquiries..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64"
        />
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={exportToCSV}>
          Export to CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sr. No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requirement</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEnquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            ) : (
              currentEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{enquiry.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enquiry.userName || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enquiry.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enquiry.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-lg">{enquiry.requirement || enquiry.name}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="py-4 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {renderPageNumbers().map((num) => (
                <PaginationItem key={num}>
                  <PaginationLink
                    href="#"
                    onClick={() => paginate(num)}
                    isActive={num === currentPage}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </AdminLayout>
  );
};

export default Enquiries;
