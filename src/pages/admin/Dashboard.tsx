
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, Star, FileText, ShoppingCart, BarChart3, TrendingUp, MessageSquare } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UsersRound className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card> */}
        
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card> */}
        
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">5 pending responses</p>
          </CardContent>
        </Card> */}
        
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Memberships</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div> */}
      
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Membership Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-gray-300" />
              <span className="ml-4 text-gray-500">Membership statistics will appear here</span>
            </div>
          </CardContent>
        </Card>
         */}
        <Card>
          <CardHeader>
            {/* <CardTitle className="text-xl">Recent Activities</CardTitle> */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {/* <TrendingUp className="h-4 w-4 text-green-500" /> */}
                </div>
                <div>
                  {/* <p className="text-sm font-medium">New membership purchase</p> */}
                  {/* <p className="text-xs text-gray-500">Standard Plan by Vipin Dhiman</p> */}
                  {/* <p className="text-xs text-gray-400">2 hours ago</p> */}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {/* <Star className="h-4 w-4 text-yellow-500" /> */}
                </div>
                <div>
                  {/* <p className="text-sm font-medium">New 5-star review</p> */}
                  {/* <p className="text-xs text-gray-500">From Pardeep Kumar</p> */}
                  {/* <p className="text-xs text-gray-400">5 hours ago</p> */}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {/* <MessageSquare className="h-4 w-4 text-blue-500" /> */}
                </div>
                <div>
                  {/* <p className="text-sm font-medium">New support ticket</p> */}
                  {/* <p className="text-xs text-gray-500">Image not uploading</p> */}
                  {/* <p className="text-xs text-gray-400">Yesterday</p> */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
