
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { HistoryButton, EmailButton, StatusButton } from "@/components/ui/table-actions";
import { Search } from "lucide-react";

const membershipData = [
  {
    id: 1,
    membershipDetails: {
      title: "Standard Plan"
    },
    userDetails: {
      name: "Aman Tiwari",
      email: "amankumartiwari5255@gmail.com",
      phone: "9031359720"
    },
    paymentGateway: "Razorpay",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-2-21",
    expireDate: "2025-06-19"
  },
 
];

const Membership = () => {
  const { toast } = useToast();
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  
  const handleStatusChange = (id: number) => {
    toast({
      title: "Status Change",
      description: `Status change dialog would appear for membership #${id}`,
    });
  };
  
  const handleHistory = (id: number) => {
    toast({
      title: "View History",
      description: `History for membership #${id} would be displayed`,
    });
  };
  
  const handleSendEmail = (id: number) => {
    toast({
      title: "Send Email",
      description: `Email dialog for membership #${id} would appear`,
    });
  };

  return (
    <AdminLayout title="User membership">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={filterActive ? "default" : "outline"}
            onClick={() => {
              setFilterActive(true);
              setFilterInactive(false);
            }}
          >
            Active 0
          </Button>
          <Button
            variant={filterInactive ? "default" : "outline"}
            onClick={() => {
              setFilterActive(false);
              setFilterInactive(true);
            }}
          >
            Inactive 0
          </Button>
        </div>
        
        <div className="relative w-64">
          <Input 
            type="text" 
            placeholder="Search" 
            className="pl-10 pr-4 py-2"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MEMBERSHIP DETAILS
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                USER DETAILS
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PAYMENT GATEWAY
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PAYMENT STATUS
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PURCHASE DATE
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EXPIRE DATE
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {membershipData
              .filter(member => (filterActive && member.status === "Active") || (filterInactive && member.status === "Inactive"))
              .map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Title: {member.membershipDetails.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>Name: {member.userDetails.name}</div>
                    <div>Email: {member.userDetails.email}</div>
                    <div>Phone: {member.userDetails.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.paymentGateway}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.paymentStatus === "Complete" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {member.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.purchaseDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.expireDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-y-2">
                    <div className="flex flex-col space-y-2">
                      <StatusButton onClick={() => handleStatusChange(member.id)} />
                      <HistoryButton onClick={() => handleHistory(member.id)} />
                      <EmailButton onClick={() => handleSendEmail(member.id)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Membership;
