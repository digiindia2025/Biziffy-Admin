import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const gradientClasses = [
  "bg-gradient-to-tr from-blue-500 to-cyan-200",
  "bg-gradient-to-tr from-green-400 to-emerald-300",
  "bg-gradient-to-tr from-pink-500 to-rose-400",
  "bg-gradient-to-tr from-purple-500 to-indigo-300",
  "bg-gradient-to-tr from-yellow-500 to-orange-400",
  "bg-gradient-to-tr from-teal-500 to-lime-500",
  "bg-gradient-to-tr from-fuchsia-500 to-pink-500",
  "bg-gradient-to-tr from-sky-500 to-blue-500",
  "bg-gradient-to-tr from-red-500 to-orange-500",
  "bg-gradient-to-tr from-zinc-500 to-gray-400",
  "bg-gradient-to-tr from-amber-500 to-yellow-400",
  "bg-gradient-to-tr from-violet-500 to-indigo-500",
];

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

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch("/api/admin/listings/count"),
          fetch("/api/admin/advertisements/count"),
          fetch("/api/admin/users/count"),
          fetch("/api/admin/categories/count"),
          fetch("/api/admin/subcategories/count"),
          fetch("/api/admin/child-categories/count"),
          fetch("/api/admin/contact-us/count"),
          fetch("/api/admin/supports/count"),
          fetch("/api/admin/enquiries/count"),
          fetch("/api/admin/links/count"),
          fetch("/api/admin/reviews/count"),
          fetch("/api/admin/memberships/count"),
        ]);

        const data = await Promise.all(responses.map((res) => res.json()));

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
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    fetchDashboardCounts();
  }, []);

  const dashboardCards = [
    {
      title: "Listing Manage",
      count: dashboardData.listings,
      description: "Manage and monitor advertisements.",
      linkText: "View",
      linkTo: "/admin/listings",
    },
    {
      title: "Advertise Manage",
      count: dashboardData.advertisements,
      description: "Manage and monitor advertisements.",
      linkText: "View",
      linkTo: "/admin/advertisements",
    },
    {
      title: "User Manage",
      count: dashboardData.users,
      description: "Manage user accounts and permissions.",
      linkText: "View",
      linkTo: "/admin/users",
    },
    {
      title: "Categories Manage",
      count: dashboardData.categories,
      description: "View, add, or edit product categories.",
      linkText: "View",
      linkTo: "/admin/categories",
    },
    {
      title: "Subcat Manage",
      count: dashboardData.subcategories,
      description: "Manage product subcategories.",
      linkText: "View",
      linkTo: "/admin/subcategories",
    },
    {
      title: "Child categ Manage",
      count: dashboardData.childCategories,
      description: "Manage product child categories.",
      linkText: "View",
      linkTo: "/admin/child-categories",
    },
    {
      title: "All Contact Manage",
      count: dashboardData.contacts,
      description: "View and manage all contact inquiries.",
      linkText: "View",
      linkTo: "/admin/contact-us",
    },
    {
      title: "Support",
      count: dashboardData.supports,
      description: "Manage and respond to user support requests.",
      linkText: "View",
      linkTo: "/admin/support/department",
    },
    {
      title: "Enquiries",
      count: dashboardData.enquiries,
      description: "View and manage general enquiries.",
      linkText: "View",
      linkTo: "/admin/enquiries",
    },
    {
      title: "Links",
      count: dashboardData.links,
      description: "Manage important links.",
      linkText: "View",
      linkTo: "/admin/links",
    },
    {
      title: "Reviews",
      count: dashboardData.reviews,
      description: "Manage product and service reviews.",
      linkText: "View",
      linkTo: "/admin/reviews",
    },
    {
      title: "User Membership",
      count: dashboardData.memberships,
      description: "Manage user memberships.",
      linkText: "View",
      linkTo: "/admin/membership",
    },
    {
      title: "Reviews",
      count: dashboardData.reviews,
      description: "Manage product and service reviews.",
      linkText: "View",
      linkTo: "/admin/reviews",
    },
    {
      title: "User Membership",
      count: dashboardData.memberships,
      description: "Manage user memberships.",
      linkText: "View",
      linkTo: "/admin/membership",
    },
    {
      title: "Reviews",
      count: dashboardData.reviews,
      description: "Manage product and service reviews.",
      linkText: "View",
      linkTo: "/admin/reviews",
    },
    {
      title: "User Membership",
      count: dashboardData.memberships,
      description: "Manage user memberships.",
      linkText: "View",
      linkTo: "/admin/membership",
    },
    {
      title: "Reviews",
      count: dashboardData.reviews,
      description: "Manage product and service reviews.",
      linkText: "View",
      linkTo: "/admin/reviews",
    },
    {
      title: "User Membership",
      count: dashboardData.memberships,
      description: "Manage user memberships.",
      linkText: "View",
      linkTo: "/admin/membership",
    },


  ];

  const cardsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dashboardCards.length / cardsPerPage);
  const paginatedCards = dashboardCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {paginatedCards.map((card, index) => (
          <Card
            key={index}
            className={`admin-card overflow-hidden rounded-2xl shadow-xl hover:scale-[1.03] transition-transform duration-200 text-white ${gradientClasses[(index + (currentPage - 1) * cardsPerPage) % gradientClasses.length]} h-[210px]`}
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

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            size="sm"
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
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
