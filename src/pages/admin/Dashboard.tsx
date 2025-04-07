import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Import your data arrays
import gradientClasses from "../data/gradientClasses";
import dashboardCardTemplates from "../data/dashboardCards";

const Dashboard = () => {
  const { user } = useAuth();
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

  // ✅ ADDED: Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        const responses = await Promise.all(
          endpoints.map((e) => fetch(`/api/admin/${e}/count`))
        );
        const data = await Promise.all(responses.map((r) => r.json()));

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

  // Merge template + dynamic count
  const dashboardCards = dashboardCardTemplates.map((tpl) => ({
    ...tpl,
    count: dashboardData[tpl.key] || 0,
    linkText: "View",
  }));

  // ✅ MODIFIED: Dynamic cardsPerPage based on screen size
  const cardsPerPage = isMobile ? 3 : 15;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dashboardCards.length / cardsPerPage);
  const paginatedCards = dashboardCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <AdminLayout title="">
      {/* Only show on medium and larger screens */}
<div className="mb-4 flex items-center justify-between flex-wrap gap-2">
<h1 className="text-2xl font-bold hidden md:block">Admin Dashboard</h1>
  </div>  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {paginatedCards.map((card, idx) => (
          <Card
            key={idx}
            className={`
              admin-card overflow-hidden rounded-2xl shadow-xl 
              hover:scale-[1.03] transition-transform duration-200 text-white 
              ${gradientClasses[
                (idx + (currentPage - 1) * cardsPerPage) %
                  gradientClasses.length
              ]} h-[210px]`}
          >
            <CardContent className="p-3 flex flex-col items-center text-center">
              <span className="text-2xl font-bold mb-1">{card.count}</span>
              <h3 className="text-base font-semibold mb-1">{card.title}</h3>
              <p className="text-sm opacity-90 mb-2">{card.description}</p>
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {/* ✅ MODIFIED: Show limited page numbers on mobile */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (!isMobile) return true;
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
