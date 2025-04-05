import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { HistoryButton, EmailButton, StatusButton } from "@/components/ui/table-actions";
import { Search } from "lucide-react";
import { Download } from "lucide-react";

const membershipData = [
  {
    id: 1,
    membershipDetails: { title: "Standard Plan" },
    userDetails: { name: "Aman Tiwari", email: "amankumartiwari5255@gmail.com", phone: "9031359720" },
    paymentGateway: "Razorpay",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-02-21",
    expireDate: "2025-06-19"
  },
  {
    id: 2,
    membershipDetails: { title: "Premium Plan" },
    userDetails: { name: "Priya Sharma", email: "priyasharma123@gmail.com", phone: "9876543210" },
    paymentGateway: "Paytm",
    paymentStatus: "Pending",
    status: "Inactive",
    purchaseDate: "2025-01-15",
    expireDate: "2025-05-15"
  },
  {
    id: 3,
    membershipDetails: { title: "Gold Plan" },
    userDetails: { name: "Rahul Verma", email: "rahul.verma@gmail.com", phone: "9812345678" },
    paymentGateway: "Razorpay",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-03-01",
    expireDate: "2025-07-01"
  },
  {
    id: 4,
    membershipDetails: { title: "Basic Plan" },
    userDetails: { name: "Sneha Patil", email: "snehapatil@gmail.com", phone: "9123456780" },
    paymentGateway: "Paytm",
    paymentStatus: "Complete",
    status: "Inactive",
    purchaseDate: "2025-01-10",
    expireDate: "2025-04-10"
  },
  {
    id: 5,
    membershipDetails: { title: "Standard Plan" },
    userDetails: { name: "Rohan Joshi", email: "rohanjoshi@mail.com", phone: "9345678123" },
    paymentGateway: "Razorpay",
    paymentStatus: "Pending",
    status: "Inactive",
    purchaseDate: "2025-02-25",
    expireDate: "2025-06-25"
  },
  {
    id: 6,
    membershipDetails: { title: "Premium Plan" },
    userDetails: { name: "Anjali Mehra", email: "anjali.mehra@mail.com", phone: "9012345678" },
    paymentGateway: "PhonePe",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-03-12",
    expireDate: "2025-07-12"
  },
  {
    id: 7,
    membershipDetails: { title: "Gold Plan" },
    userDetails: { name: "Vikram Singh", email: "vikram.singh@gmail.com", phone: "9321456789" },
    paymentGateway: "Razorpay",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-02-05",
    expireDate: "2025-06-05"
  },
  {
    id: 8,
    membershipDetails: { title: "Standard Plan" },
    userDetails: { name: "Meera Nair", email: "meeranair@mail.com", phone: "9801234567" },
    paymentGateway: "Paytm",
    paymentStatus: "Pending",
    status: "Inactive",
    purchaseDate: "2025-01-20",
    expireDate: "2025-05-20"
  },
  {
    id: 9,
    membershipDetails: { title: "Basic Plan" },
    userDetails: { name: "Karan Kapoor", email: "karan.kapoor@gmail.com", phone: "9701234567" },
    paymentGateway: "PhonePe",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-03-18",
    expireDate: "2025-07-18"
  },
  {
    id: 10,
    membershipDetails: { title: "Premium Plan" },
    userDetails: { name: "Divya Reddy", email: "divya.reddy@gmail.com", phone: "9098765432" },
    paymentGateway: "Razorpay",
    paymentStatus: "Complete",
    status: "Active",
    purchaseDate: "2025-02-10",
    expireDate: "2025-06-10"
  }
];

const ITEMS_PER_PAGE = 4;

const Membership = () => {
  const { toast } = useToast();
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return membershipData.filter(member => {
      const matchesStatus = (filterActive && member.status === "Active") || (filterInactive && member.status === "Inactive");
      const matchesSearch = [member.userDetails.name, member.userDetails.email, member.membershipDetails.title]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filterActive, filterInactive, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleExportCSV = () => {
    const csvRows = [
      ["ID", "Membership Title", "Name", "Email", "Phone", "Gateway", "Payment Status", "Status", "Purchase Date", "Expire Date"],
      ...filteredData.map(m => [
        m.id,
        m.membershipDetails.title,
        m.userDetails.name,
        m.userDetails.email,
        m.userDetails.phone,
        m.paymentGateway,
        m.paymentStatus,
        m.status,
        m.purchaseDate,
        m.expireDate
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "user_memberships.csv";
    link.click();
  };

  return (
    <AdminLayout title="User Membership">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-2">
          <Button variant={filterActive ? "default" : "outline"} onClick={() => { setFilterActive(true); setFilterInactive(false); setPage(1); }}>
            Active
          </Button>
          <Button variant={filterInactive ? "default" : "outline"} onClick={() => { setFilterActive(false); setFilterInactive(true); setPage(1); }}>
            Inactive
          </Button>
        </div>

        <div className="flex space-x-2 items-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Membership", "User", "Gateway", "Payment", "Status", "Purchase", "Expire", "Actions"].map((text, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{member.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">Title: {member.membershipDetails.title}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>Name: {member.userDetails.name}</div>
                  <div>Email: {member.userDetails.email}</div>
                  <div>Phone: {member.userDetails.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{member.paymentGateway}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${member.paymentStatus === "Complete" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {member.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{member.purchaseDate}</td>
                <td className="px-6 py-4 text-sm">{member.expireDate}</td>
                <td className="px-6 py-4 text-sm text-right space-y-2">
                  <StatusButton onClick={() => toast({ title: "Status Change", description: `Change status for #${member.id}` })} />
                  <HistoryButton onClick={() => toast({ title: "View History", description: `History for #${member.id}` })} />
                  <EmailButton onClick={() => toast({ title: "Send Email", description: `Send email to #${member.id}` })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <Button variant="outline" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          )).slice(0, 4)}
          <Button variant="outline" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </AdminLayout>
  );
};

export default Membership;
