import { useEffect, useState } from "react";
import axios from "axios";
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

const API_BASE_URL = "http://localhost:5000/api/links";

const Links = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 🔄 Fetch links
  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/all`);
      setLinks(res.data);
    } catch (error) {
      console.error("Error fetching links", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // ✏️ Edit button (placeholder)
  const handleEdit = (id: string) => {
    toast({
      title: "Edit Link",
      description: `Open edit modal for link ID: ${id}`,
    });
  };

  // ❌ Delete link
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      toast({ title: "Link deleted", description: `Link #${id} deleted.` });
      fetchLinks();
    } catch (error) {
      toast({ title: "Delete failed", description: "Could not delete the link." });
    }
  };

  // ➕ Add new link (placeholder)
  const handleAddNew = () => {
    toast({
      title: "Add New Link",
      description: "Open modal to add new link",
    });
  };

  // 📤 Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Link", "Title"];
    const rows = filteredLinks.map((link: any) => [link._id, link.link, link.title]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "links.csv";
    a.click();
  };

  // 🔍 Filtered + Paginated Links
  const filteredLinks = links.filter((link: any) =>
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
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <AdminLayout title="Links">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
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
              currentLinks.map((link: any, index: number) => (
                <tr key={link._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a href={`https://${link.link}`} target="_blank" rel="noopener noreferrer">
                      {link.link}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{link.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EditButton onClick={() => handleEdit(link._id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DeleteButton onClick={() => handleDelete(link._id)} />
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
