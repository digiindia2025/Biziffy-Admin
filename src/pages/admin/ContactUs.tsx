import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

// Dummy contact data
const contactData = [
  {
    firstName: "Aman",
    lastName: "Tiwari",
    email: "amankumartiwari@gmail.com",
    phone: "+91-9031359720",
    message: "hello digi",
    state: "UP-16",
    city: "Varanasi",
    services: "UX Design",
    createdAt: "2025-02-23 09:08:13",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+91-1234567890",
    message: "Need help with website",
    state: "MH-12",
    city: "Mumbai",
    services: "Web Development",
    createdAt: "2025-03-01 10:20:00",
  },
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    phone: "+91-9988776655",
    message: "Looking for branding services",
    state: "DL-01",
    city: "Delhi",
    services: "Branding",
    createdAt: "2025-01-15 14:45:20",
  },
  {
    firstName: "Raj",
    lastName: "Verma",
    email: "raj.verma@example.com",
    phone: "+91-8877665544",
    message: "Need mobile app design",
    state: "KA-05",
    city: "Bangalore",
    services: "App Design",
    createdAt: "2025-02-10 11:30:10",
  },
  {
    firstName: "Sneha",
    lastName: "Patil",
    email: "sneha.patil@example.com",
    phone: "+91-7766554433",
    message: "Interested in SEO service",
    state: "MH-15",
    city: "Pune",
    services: "SEO",
    createdAt: "2025-03-05 09:55:50",
  },
  {
    firstName: "Ankit",
    lastName: "Gupta",
    email: "ankit.gupta@example.com",
    phone: "+91-9090909090",
    message: "Need a portfolio website",
    state: "RJ-19",
    city: "Jaipur",
    services: "Web Design",
    createdAt: "2025-01-25 16:20:00",
  },
  {
    firstName: "Divya",
    lastName: "Reddy",
    email: "divya.reddy@example.com",
    phone: "+91-8123456789",
    message: "Social media help needed",
    state: "TS-09",
    city: "Hyderabad",
    services: "Social Media",
    createdAt: "2025-02-14 12:10:30",
  },
  {
    firstName: "Karan",
    lastName: "Mehta",
    email: "karan.mehta@example.com",
    phone: "+91-9876543210",
    message: "Looking for UI/UX review",
    state: "GJ-01",
    city: "Ahmedabad",
    services: "UI/UX Review",
    createdAt: "2025-02-28 18:40:00",
  },
  {
    firstName: "Neha",
    lastName: "Joshi",
    email: "neha.joshi@example.com",
    phone: "+91-9663344552",
    message: "Need help with content strategy",
    state: "MP-09",
    city: "Bhopal",
    services: "Content Strategy",
    createdAt: "2025-03-10 08:15:00",
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    email: "ravi.kumar@example.com",
    phone: "+91-7001122334",
    message: "Looking for logo design",
    state: "BR-01",
    city: "Patna",
    services: "Logo Design",
    createdAt: "2025-03-15 17:35:45",
  },
];

const ContactUs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 4;

  // Search filter logic
  const filteredContacts = contactData.filter((contact) =>
    Object.values(contact).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Export CSV
  const handleExportToCSV = () => {
    const csvHeader = Object.keys(contactData[0]).join(",") + "\n";
    const csvRows = filteredContacts
      .map((contact) => Object.values(contact).join(","))
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
    toast({ title: "Exported", description: "Contacts exported to CSV successfully!" });
  };

  return (
    <AdminLayout title="">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="relative w-full sm:w-72">
          <Input
            type="text"
            placeholder="Search contact..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <Button onClick={handleExportToCSV} className="bg-green-500 hover:bg-green-600">
          Export to CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["First Name", "Last Name", "Email", "Phone", "Message", "State", "City", "Services", "Created At"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentContacts.map((contact, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{contact.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{contact.message}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.state || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.city || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.services || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{contact.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </AdminLayout>
  );
};

export default ContactUs;
