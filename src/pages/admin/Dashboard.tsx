import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, HelpCircle, FolderTree, PackageOpen, MapPin, Image, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Dashboard cards data based on the image
  const dashboardCards = [
    {
      title: "Listing Manage",
      // icon: <ShoppingCart className="h-12 w-12 text-[#FF7F27]" />,
      // data: 1;
      // description: "Track and update customer Listing.",
      linkText: "Listing Manage",
      linkTo: "/admin/listings"
    },
    {
      title: "Advertise Manage",
      // icon: <HelpCircle className="h-12 w-12 text-[#FF7F27]" />,
      // description: "View and respond to customer inquiries efficiently.",
      linkText: "View Inquiries",
      linkTo: "/admin/enquiries"
    },
    {
      title: "User Manage",
      // icon: <FolderTree className="h-12 w-12 text-[#FF7F27]" />,
      // description: "View, add, or edit product categories.",
      linkText: "Manage Categories",
      linkTo: "/admin/categories"
    },
    {
      title: "Categories Manage",
      // icon: <PackageOpen className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Manage product inventory and details.",
      linkText: "Manage Products",
      linkTo: "/admin/products"
    },
    {
      title: "Subcategories Manage",
      // icon: <Users className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Manage user accounts and permissions.",
      linkText: "View Users",
      linkTo: "/admin/users"
    },
    {
      title: "Child Categories Manage",
      // icon: <MapPin className="h-12 w-12 text-[#FF7F27]" />,
      // description: "View, add, or edit delivery pincodes.",
      linkText: "Manage  Child",
      linkTo: "/admin/pincode"
    },
    {
      title: "All Contact Manage",
      // icon: <Image className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Update banners displayed on the website.",
      linkText: "Manage Banners",
      linkTo: "/admin/contact-us"
    },
    {
      title: "Support",
      // icon: <Image className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Update banners displayed on the website.",
      linkText: "Manage Banners",
      linkTo: "/admin/contact-us"
    },
    {
      title: "Enquiries",
      // icon: <Image className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Update banners displayed on the website.",
      linkText: "Manage Banners",
      linkTo: "/admin/contact-us"
    },
    {
      title: "Links",
      // icon: <Image className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Update banners displayed on the website.",
      linkText: "Manage Banners",
      linkTo: "/admin/contact-us"
    },
    {
      title: "Reviews",
      // icon: <Image className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Update banners displayed on the website.",
      linkText: "Manage Banners",
      linkTo: "/admin/contact-us"
    },
    {
      title: "User Membership",
      // icon: <Image className="h-12 w-12 text-[#FF7F27]" />,
      // description: "Update banners displayed on the website.",
      linkText: "Manage Banners",
      linkTo: "/admin/contact-us"
    }
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="admin-card overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <Link to={card.linkTo} className="mt-auto">
                <Button className="admin-btn-primary w-full">
                  {card.linkText}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Recent Users Section - Will keep as a reference */}
        <Card className="admin-card">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">USER</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">CREATED ON</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { id: 1, name: "Aman", email: "aman@gmail.com", date: "26 jan 2025" },
                    { id: 2, name: "Deepak", email: "deepak@gmail.com", date: "19 feb 2024" },
                    { id: 3, name: "Mukesh", email: "mukesh@gmail.com", date: "10 march 2024" },
                    { id: 4, name: "Akash", email: "akash@gmail.com", phone: "", date: "1 apr 2025" },
                    { id: 5, name: "nitin", email: "nitin@gmail.com", phone: "", date: "18 march 2025" }
                  ].map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-blue-600">{user.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Link to="/admin/users">
                <Button variant="outline" size="sm" className="text-[#FF7F27] border-[#FF7F27] hover:bg-[#FF7F27] hover:text-white">
                  View All Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Orders Section */}
        <Card className="admin-card">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Listing</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">CUSTOMER</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">STATUS</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">DATE</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">VIEW</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { id: 1, customer: "Aman ", status: "Reject", date: "2 april 2025" },
                    { id: 2, customer: "Nitin", status: "Accept", date: "25 march 2025" },
                    { id: 3, customer: "Gourav", status: "Reject", date: "24 feb 2025" },
                    { id: 4, customer: "Vishnu", status: "Accept", date: "23 jan 2025" },
                    { id: 5, customer: "Mukesh", status: "Reject", date: "22 jan 2025" }
                  ].map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-blue-600">#{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.customer}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="ghost" className="text-[#FF7F27] hover:bg-[#FF7F27]/10">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Link to="/admin/listings">
                <Button variant="outline" size="sm" className="text-[#FF7F27] border-[#FF7F27] hover:bg-[#FF7F27] hover:text-white">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;