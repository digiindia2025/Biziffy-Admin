
import { useState } from "react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ViewButton, DeleteButton, EditButton } from "@/components/ui/table-actions";
import { useToast } from "@/hooks/use-toast";

const supportTicketsData = [
  // {
  //   id: 8,
  //   title: "package issues",
  //   priority: "urgent",
  //   dateTime: "10/03/2025 16:13:49",
  //   status: "close"
  // },
  // {
  //   id: 7,
  //   title: "Testing",
  //   priority: "high",
  //   dateTime: "27/11/2024 12:37:28",
  //   status: "open"
  // },
  // {
  //   id: 6,
  //   title: "Add New Ticket",
  //   priority: "medium",
  //   dateTime: "20/11/2024 05:14:39",
  //   status: "close"
  // },
  // {
  //   id: 5,
  //   title: "image not uploading",
  //   priority: "urgent",
  //   dateTime: "13/11/2024 06:02:38",
  //   status: "close"
  // },
];

const SupportTickets = () => {
  const { toast } = useToast();
  
  const handleView = (id: number) => {
    toast({
      title: "View Ticket",
      description: `View details for ticket #${id}`,
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: "Delete Ticket",
      description: `Delete ticket #${id}? This action cannot be undone.`,
    });
  };
  
  const handleEdit = (id: number) => {
    toast({
      title: "Edit Ticket",
      description: `Edit ticket #${id}`,
    });
  };
  
  const handleAddTicket = () => {
    toast({
      title: "Add Ticket",
      description: "Open form to add a new support ticket",
    });
  };
  
  const handleApplyBulkAction = () => {
    toast({
      title: "Bulk Action",
      description: "Apply bulk action to selected tickets",
    });
  };

  return (
    <AdminLayout title="All Tickets">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Bulk Action</option>
            <option>Mark as Open</option>
            <option>Mark as Closed</option>
            <option>Delete Selected</option>
          </select>
          <Button 
            onClick={handleApplyBulkAction}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Apply
          </Button>
        </div>
        
        <Button onClick={handleAddTicket} className="bg-blue-500 hover:bg-blue-600">
          Add Ticket
        </Button>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-800">Notice: The admin has the ability to create tickets for both the client and the freelancer if desired.</p>
        <p className="text-yellow-800">Notice: Admin can search by ticket id, ticket status, ticket priority.</p>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supportTicketsData.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ticket.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ticket.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ticket.priority === "urgent" 
                      ? "bg-red-100 text-red-800" 
                      : ticket.priority === "high"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ticket.dateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`w-2 h-8 rounded-l ${ticket.status === "open" ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded ${
                      ticket.status === "open" 
                        ? "text-green-800" 
                        : "text-red-800"
                    }`}>
                      {ticket.status === "open" ? "Open" : "Close"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <ViewButton onClick={() => handleView(ticket.id)} />
                    <DeleteButton onClick={() => handleDelete(ticket.id)} />
                    {ticket.status === "open" && (
                      <EditButton onClick={() => handleEdit(ticket.id)} />
                    )}
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

export default SupportTickets;
