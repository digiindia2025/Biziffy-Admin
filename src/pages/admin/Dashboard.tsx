import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, HelpCircle, FolderTree, PackageOpen, MapPin, Image, Users } from "lucide-react";
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

  // Simulate fetching data for counts (replace with your actual API calls)
  useEffect(() => {
    // Example API calls (replace with your actual endpoints)
    const fetchDashboardCounts = async () => {
      try {
        const listingsResponse = await fetch('/api/admin/listings/count');
        const listingsData = await listingsResponse.json();
        setDashboardData(prev => ({ ...prev, listings: listingsData.count }));

        const advertiseResponse = await fetch('/api/admin/advertisements/count');
        const advertiseData = await advertiseResponse.json();
        setDashboardData(prev => ({ ...prev, advertisements: advertiseData.count }));

        const usersResponse = await fetch('/api/admin/users/count');
        const usersData = await usersResponse.json();
        setDashboardData(prev => ({ ...prev, users: usersData.count }));

        const categoriesResponse = await fetch('/api/admin/categories/count');
        const categoriesData = await categoriesResponse.json();
        setDashboardData(prev => ({ ...prev, categories: categoriesData.count }));

        const subcategoriesResponse = await fetch('/api/admin/subcategories/count');
        const subcategoriesData = await subcategoriesResponse.json();
        setDashboardData(prev => ({ ...prev, subcategories: subcategoriesData.count }));

        const childCategoriesResponse = await fetch('/api/admin/child-categories/count');
        const childCategoriesData = await childCategoriesResponse.json();
        setDashboardData(prev => ({ ...prev, childCategories: childCategoriesData.count }));

        const contactsResponse = await fetch('/api/admin/contact-us/count');
        const contactsData = await contactsResponse.json();
        setDashboardData(prev => ({ ...prev, contacts: contactsData.count }));

        const supportsResponse = await fetch('/api/admin/supports/count');
        const supportsData = await supportsResponse.json();
        setDashboardData(prev => ({ ...prev, supports: supportsData.count }));

        const enquiriesResponse = await fetch('/api/admin/enquiries/count');
        const enquiriesData = await enquiriesResponse.json();
        setDashboardData(prev => ({ ...prev, enquiries: enquiriesData.count }));

        const linksResponse = await fetch('/api/admin/links/count');
        const linksData = await linksResponse.json();
        setDashboardData(prev => ({ ...prev, links: linksData.count }));

        const reviewsResponse = await fetch('/api/admin/reviews/count');
        const reviewsData = await reviewsResponse.json();
        setDashboardData(prev => ({ ...prev, reviews: reviewsData.count }));

        const membershipsResponse = await fetch('/api/admin/memberships/count');
        const membershipsData = await membershipsResponse.json();
        setDashboardData(prev => ({ ...prev, memberships: membershipsData.count }));

        // Add similar calls for other data as needed
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    fetchDashboardCounts();
  }, []);

  // Dashboard cards data
  const dashboardCards = [
    {
      title: "Listing Manage",
      count: dashboardData.listings,
      icon: <ShoppingCart className="h-6 w-6 text-[#3b82f6]" />,
      description: "Manage and monitor advertisements.",

      linkText: "View",
      linkTo: "/admin/listings"
    },
    {
      title: "Advertise Manage",
      count: dashboardData.advertisements,
      icon: <Image className="h-6 w-6 text-[#10b981]" />, // Green
      description: "Manage and monitor advertisements.",
      linkText: "View",
      linkTo: "/admin/advertisements" // Assuming a route for advertisements
    },
    {
      title: "User Manage",
      count: dashboardData.users,
      icon: <Users className="h-6 w-6 text-[#f59e0b]" />, // Yellow/Amber
      description: "Manage user accounts and permissions.",
      linkText: "View",
      linkTo: "/admin/users"
    },
    {
      title: "Categories Manage",
      count: dashboardData.categories,
      icon: <FolderTree className="h-6 w-6 text-[#e11d48]" />, // Red
      description: "View, add, or edit product categories.",
      linkText: "View",
      linkTo: "/admin/categories"
    },
    {
      title: "Subcategories Manage",
      count: dashboardData.subcategories,
      icon: <PackageOpen className="h-6 w-6 text-[#8b5cf6]" />, // Purple
      description: "Manage product subcategories.",
      linkText: "View",
      linkTo: "/admin/subcategories" // Assuming a route for subcategories
    },
    {
      title: "Child Categories Manage",
      count: dashboardData.childCategories,
      icon: <FolderTree className="h-6 w-6 text-[#06b6d4]" />, // Cyan
      description: "Manage product child categories.",
      linkText: "View",
      linkTo: "/admin/child-categories" // Assuming a route for child categories
    },
    {
      title: "All Contact Manage",
      count: dashboardData.contacts,
      icon: <MapPin className="h-6 w-6 text-[#a855f7]" />, // Purple-500
      description: "View and manage all contact inquiries.",
      linkText: "View",
      linkTo: "/admin/contact-us"
    },
    {
      title: "Support",
      count: dashboardData.supports,
      icon: <HelpCircle className="h-6 w-6 text-[#d97706]" />, // Orange-600
      description: "Manage and respond to user support requests.",
      linkText: "View",
      linkTo: "/admin/support/department" // Assuming a route for support
    },
    {
      title: "Enquiries",
      count: dashboardData.enquiries,
      icon: <Eye className="h-6 w-6 text-[#0ea5e9]" />, // Sky-500
      description: "View and manage general enquiries.",
      linkText: "View",
      linkTo: "/admin/enquiries"
    },
    {
      title: "Links",
      count: dashboardData.links,
      icon: <FolderTree className="h-6 w-6 text-[#6b7280]" />, // Gray-500
      description: "Manage important links.",
      linkText: "View",
      linkTo: "/admin/links" // Assuming a route for links
    },
    {
      title: "Reviews",
      count: dashboardData.reviews,
      icon: <ShoppingCart className="h-6 w-6 text-[#4ade80]" />, // Emerald-400
      description: "Manage product and service reviews.",
      linkText: "View",
      linkTo: "/admin/reviews" // Assuming a route for reviews
    },
    {
      title: "User Membership",
      count: dashboardData.memberships,
      icon: <Users className="h-6 w-6 text-[#f472b6]" />, // Pink-400
      description: "Manage user memberships.",
      linkText: "View",
      linkTo: "/admin/membership" // Assuming a route for memberships
    }
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardCards.map((card, index) => (
         <Card
         className={`admin-card overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200 text-white ${gradientClasses[index % gradientClasses.length]}`}
>
         <CardContent className="p-6 flex flex-col items-center text-center">
           <div className="mb-4 flex items-center justify-center rounded-full bg-white bg-opacity-20 p-4">
             {card.icon}
           </div>
           <span className="text-3xl font-bold mb-2">{card.count}</span>
           <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
           <p className="text-sm opacity-90 mb-4">{card.description}</p>
           <Link to={card.linkTo} className="mt-auto w-full">
             <Button className="w-full bg-white text-black hover:bg-gray-200 transition duration-150 font-semibold">
               {card.linkText}
             </Button>
           </Link>
         </CardContent>
       </Card>
       
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;