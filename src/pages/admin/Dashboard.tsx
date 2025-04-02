import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data for Recent Users
  const recentUsers = [
    { id: 1, name: "aman", email: "aman@gmail.com",  phone: "9031359720", date: "26 March 2025" },
    { id: 2, name: "gourav", email: "gourav@gmail.com",  phone: "9319846114", date: "27 March 2025" },
    { id: 3, name: "vishnu", email: "vishnu@gmail.com",  phone: "9315949626", date: "28 March 2025" },
    { id: 4, name: "nitin", email: "nitin.com", phone: "9355239436", date: "29 March 2025" },
    { id: 5, name: "sanjay ji", email: "sanjay@gmail.com", phone: "8504069643", date: "30 March 2025" }
  ];
  
  // Mock data for Recent Listings
  const recentListings = [
    { id: 1, user: "Mukesh", email: "mukesh@gmail.com", phone: "7530979185", title: ".........", date: "23 march 2025" },
    { id: 2, user: "aman", email: "er.dhiman17@gmail.com", phone: "7604667888", title: "...........", date: "24 march 2025" },
    { id: 3, user: "nikunj", email: "dextrous7833@gmail.com", phone: "7530979185", title: ".......", date: "25 march 2025" },
    { id: 4, user: "deepak", email: "dextrous7833@gmail.com", phone: "7530979185", title: ".....", date: "26 march 2025" },
    { id: 5, user: "akash", email: "dextrous7833@gmail.com", phone: "7530979185", title: "......", date: "27 march 2025" }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Good Morning, {user?.name || "Admin"}</h1>
        <p className="text-gray-500">Manage your dashboard here</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Users Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                  {recentUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-blue-600">{user.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            {user.phone && <p className="text-xs text-gray-500">{user.phone}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Listings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Listings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">USER</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">TITLE</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">IMAGE</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">DETAILS</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">CREATED ON</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentListings.map(listing => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-blue-600">{listing.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{listing.title}</td>
                      <td className="py-3 px-4">
                        <div className="h-12 w-12 rounded border bg-gray-100"></div>
                      </td>
                      <td className="py-3 px-4">
                        <Link to={`/admin/listings/details/${listing.id}`}>
                          <Button size="sm" variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">{listing.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;