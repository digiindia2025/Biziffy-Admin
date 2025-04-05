import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { EditButton, DeleteButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const linksData = [
  { id: 1, link: "biziffy-admin.vercel.app", title: "nitin" },
  { id: 2, link: "example.com", title: "Example" },
  { id: 3, link: "nextjs.org", title: "Next.js" },
  { id: 4, link: "reactjs.org", title: "React" },
  { id: 5, link: "tailwindcss.com", title: "Tailwind CSS" },
];

const Links = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Link",
      description: `Edit link #${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Link",
      description: `Delete link #${id}? This action cannot be undone.`,
    });
  };

  const handleAddNew = () => {
    toast({
      title: "Add New Link",
      description: "Open dialog to add a new link",
    });
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Link", "Title"];
    const rows = filteredLinks.map((link) => [link.id, link.link, link.title]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "links.csv";
    a.click();
  };

  const filteredLinks = linksData.filter((link) =>
    Object.values(link).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const currentLinks = filteredLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <AdminLayout title="All Links">
      <div className="mb-6 flex justify-between items-center">
        <Input
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64"
        />
        <div className="flex gap-3">
          <Button onClick={handleExportCSV} className="bg-green-500 hover:bg-green-600">
            Export to CSV
          </Button>
          <Button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-600">
            Add New Link
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sr. No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLinks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No links found.
                </td>
              </tr>
            ) : (
              currentLinks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{link.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a href={`https://${link.link}`} target="_blank" rel="noopener noreferrer">
                      {link.link}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{link.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EditButton onClick={() => handleEdit(link.id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DeleteButton onClick={() => handleDelete(link.id)} />
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

export default Links;
