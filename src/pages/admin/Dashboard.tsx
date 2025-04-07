import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import gradientClasses from "../data/gradientClasses";
import dashboardCardTemplates from "../data/dashboardCards";

const Dashboard = () => {
  const { user } = useAuth();

  // Initial empty state for dashboard data
  const [dashboardData, setDashboardData] = useState({
    listings: 0,
    advertisements: 0,
    users: 0,
    categories: 0,
    subcategories: 0,
    childCategories: 0,
    contacts: 0,
    supports: 0,
    enquiries: 0,
    links: 0,
    reviews: 0,
    memberships: 0,
  });

  // Detect mobile screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // if screen width ≤ 768px, it's mobile
    };

    handleResize(); // Run on first load
    window.addEventListener("resize", handleResize); // Listen to resize changes
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch counts for all dashboard sections
  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const endpoints = [
          "listings",
          "advertisements",
          "users",
          "categories",
          "subcategories",
          "child-categories",
          "contact-us",
          "supports",
          "enquiries",
          "links",
          "reviews",
          "memberships",
        ];

        // Fetch all counts in parallel
        const responses = await Promise.all(
          endpoints.map((e) => fetch(`/api/admin/${e}/count`))
        );
        const data = await Promise.all(responses.map((r) => r.json()));

        // Set the dashboard data
        setDashboardData({
          listings: data[0].count,
          advertisements: data[1].count,
          users: data[2].count,
          categories: data[3].count,
          subcategories: data[4].count,
          childCategories: data[5].count,
          contacts: data[6].count,
          supports: data[7].count,
          enquiries: data[8].count,
          links: data[9].count,
          reviews: data[10].count,
          memberships: data[11].count,
        });
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
      }
    };

    fetchDashboardCounts();
  }, []);

  // Combine static template data with dynamic counts
  const dashboardCards = dashboardCardTemplates.map((tpl) => ({
    ...tpl,
    count: dashboardData[tpl.key] || 0,
    linkText: "View",
  }));

  // Set cards per page (mobile: 3, desktop: 15)
  const cardsPerPage = isMobile ? 3 : 15;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(dashboardCards.length / cardsPerPage);

  // ✅ Updated: On mobile, show only the first 6 cards (2 rows of 3)
  const paginatedCards = isMobile
    ? dashboardCards.slice(0, 6)
    : dashboardCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <AdminLayout title="">
      {/* Header - only shows on medium and larger screens */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold hidden md:block">Admin Dashboard</h1>
      </div>

      {/* Dashboard cards grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {paginatedCards.map((card, idx) => (
          <Card
            key={idx}
            className={`
              admin-card overflow-hidden rounded-2xl shadow-xl 
              hover:scale-[1.03] transition-transform duration-200 text-white 
              ${gradientClasses[
                (idx + (currentPage - 1) * cardsPerPage) % gradientClasses.length
              ]} h-[210px]`}
          >
            <CardContent className="p-3 flex flex-col items-center text-center">
              {/* Count */}
              <span className="text-2xl font-bold mb-1">{card.count}</span>

              {/* Title */}
              <h3 className="text-base font-semibold mb-1">{card.title}</h3>

              {/* Description - only on medium and larger screens */}
              <p className="text-sm opacity-90 mb-2 hidden md:block">
                {card.description}
              </p>

              {/* View Button */}
              <Link to={card.linkTo} className="mt-auto w-full">
                <Button className="w-full bg-white text-black hover:bg-gray-200 transition duration-150 font-semibold text-sm">
                  {card.linkText}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {/* Page number buttons (limited on mobile) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (!isMobile) return true; // show all on desktop
            // show only first, last, and adjacent pages on mobile
            return (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            );
          })
          .map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
