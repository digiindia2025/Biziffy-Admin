import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
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

const reviewsData = [
  {
    id: 1,
    userName: "amantiwari2357",
    title: "",
    email: "amankumartiwari5255@gmail.com",
    rating: 5.0,
    content: "00001",
    date: "2025-03-31 11:28:18",
  },
  {
    id: 2,
    userName: "user2",
    title: "Review 2",
    email: "user2@example.com",
    rating: 4.2,
    content: "Content 2",
    date: "2025-04-01 09:00:00",
  },
  {
    id: 3,
    userName: "user3",
    title: "Review 3",
    email: "user3@example.com",
    rating: 3.5,
    content: "Content 3",
    date: "2025-04-02 10:30:00",
  },
  {
    id: 4,
    userName: "user4",
    title: "Review 4",
    email: "user4@example.com",
    rating: 2.9,
    content: "Content 4",
    date: "2025-04-03 14:10:00",
  },
  {
    id: 5,
    userName: "user5",
    title: "Review 5",
    email: "user5@example.com",
    rating: 4.7,
    content: "Content 5",
    date: "2025-04-04 17:45:00",
  },
];

const Reviews = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleApprove = (id: number) => {
    toast({
      title: "Review Approved",
      description: `Review #${id} has been approved.`,
    });
  };

  const handleExportCSV = () => {
    const headers = ["ID", "User Name", "Title", "Email", "Rating", "Content", "Date"];
    const rows = filteredReviews.map((r) => [
      r.id,
      r.userName,
      r.title,
      r.email,
      r.rating,
      r.content,
      r.date,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "reviews.csv";
    a.click();
  };

  const filteredReviews = reviewsData.filter((r) =>
    Object.values(r).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const currentReviews = filteredReviews.slice(
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
    <AdminLayout title="All Reviews">
      <div className="mb-6 flex justify-between items-center">
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64"
        />
        <Button onClick={handleExportCSV} className="bg-green-500 hover:bg-green-600">
          Export to CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["SR. NO.", "USER NAME", "TITLE", "EMAIL", "RATING", "CONTENT", "DATE", "ACTION"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentReviews.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            ) : (
              currentReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{review.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{review.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{review.title || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{review.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        review.rating >= 4 ? "text-green-600" :
                        review.rating >= 3 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {review.rating.toFixed(1)}
                      </span>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{review.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{review.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      onClick={() => handleApprove(review.id)}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Approve
                    </Button>
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
              {renderPageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={() => paginate(page)}
                  >
                    {page}
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

export default Reviews;
