import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  HistoryButton,
  EmailButton,
  StatusButton,
} from "@/components/ui/table-actions";
import { Search, Download } from "lucide-react";
import axios from "axios";

const ITEMS_PER_PAGE = 4;

const Membership = () => {
  const { toast } = useToast();
  const [memberships, setMemberships] = useState<any[]>([]);
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/memberships");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.memberships || [];
        setMemberships(data);
      } catch (err) {
        console.error(err);
        setMemberships([]);
      }
    };
    fetchMemberships();
  }, []);

  const filteredData = useMemo(() => {
    return memberships.filter((member) => {
      const matchesStatus =
        (filterActive && member.status === "Active") ||
        (filterInactive && member.status === "Inactive");

      const matchesSearch = [
        member.userDetails?.name,
        member.userDetails?.email,
        member.membershipDetails?.title,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [memberships, filterActive, filterInactive, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleExportCSV = () => {
    const csvRows = [
      [
        "ID",
        "Membership Title",
        "Name",
        "Email",
        "Phone",
        "Gateway",
        "Payment Status",
        "Status",
        "Purchase Date",
        "Expire Date",
      ],
      ...filteredData.map((m: any, i: number) => [
        i + 1,
        m.membershipDetails?.title,
        m.userDetails?.name,
        m.userDetails?.email,
        m.userDetails?.phone,
        m.paymentGateway,
        m.paymentStatus,
        m.status,
        m.purchaseDate,
        m.expireDate,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "user_memberships.csv";
    link.click();
  };

  return (
    <AdminLayout title="User Memberships">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-2">
          <Button
            variant={filterActive ? "default" : "outline"}
            onClick={() => {
              setFilterActive(true);
              setFilterInactive(false);
              setPage(1);
            }}
          >
            Active
          </Button>
          <Button
            variant={filterInactive ? "default" : "outline"}
            onClick={() => {
              setFilterActive(false);
              setFilterInactive(true);
              setPage(1);
            }}
          >
            Inactive
          </Button>
        </div>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
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
              {[
                "#",
                "Membership",
                "User",
                "Gateway",
                "Payment",
                "Status",
                "Purchase",
                "Expire",
                "Actions",
              ].map((text, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((member: any, i: number) => (
              <tr key={member._id || `${member.userDetails?.email}-${i}`}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {i + 1 + (page - 1) * ITEMS_PER_PAGE}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.membershipDetails?.title || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>{member.userDetails?.name}</div>
                  <div className="text-xs text-gray-500">
                    {member.userDetails?.email}
                  </div>
                  <div className="text-xs text-gray-500">
                    {member.userDetails?.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {member.paymentGateway}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      member.paymentStatus === "Complete"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{member.purchaseDate}</td>
                <td className="px-6 py-4 text-sm">{member.expireDate}</td>
                <td className="px-6 py-4 text-sm text-right space-y-2">
                  <StatusButton
                    onClick={() =>
                      toast({
                        title: "Status Change",
                        description: `Change status for ${member.userDetails?.name}`,
                      })
                    }
                  />
                  <HistoryButton
                    onClick={() =>
                      toast({
                        title: "View History",
                        description: `History for ${member.userDetails?.name}`,
                      })
                    }
                  />
                  <EmailButton
                    onClick={() =>
                      toast({
                        title: "Send Email",
                        description: `Send email to ${member.userDetails?.email}`,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)]
            .map((_, i) => i + 1)
            .slice(0, 4)
            .map((pg) => (
              <Button
                key={pg}
                variant={page === pg ? "default" : "outline"}
                onClick={() => setPage(pg)}
              >
                {pg}
              </Button>
            ))}
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </AdminLayout>
  );
};

export default Membership;
