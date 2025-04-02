
import { AdminLayout } from "@/components/Layout/AdminLayout";

const contactData = [
  // {
  //   firstName: "admin",
  //   lastName: "dextrousinfo",
  //   email: "farhancse111@gmail.com",
  //   phone: "07667711493",
  //   message: "asd",
  //   state: "",
  //   city: "",
  //   services: "UX design",
  //   createdAt: "2024-09-23 09:08:13"
  // },
  // {
  //   firstName: "test",
  //   lastName: "dextrousinfo",
  //   email: "farhancse111@gmail.com",
  //   phone: "07667711493",
  //   message: "asd",
  //   state: "",
  //   city: "",
  //   services: "Website design",
  //   createdAt: "2024-09-23 09:08:44"
  // },
  // {
  //   firstName: "ss",
  //   lastName: "aa",
  //   email: "outline@gmail.com",
  //   phone: "9810019909",
  //   message: "aa",
  //   state: "",
  //   city: "",
  //   services: "",
  //   createdAt: "2024-10-09 11:51:00"
  // },
  // {
  //   firstName: "aa",
  //   lastName: "aa",
  //   email: "outline@gmail.com",
  //   phone: "9810019909",
  //   message: "asas",
  //   state: "",
  //   city: "",
  //   services: "Website design, Content creation, UX design, Strategy & consulting",
  //   createdAt: "2024-10-09 11:52:33"
  // },
  // {
  //   firstName: "Pardeep",
  //   lastName: "Kumar",
  //   email: "pkpardeepkumar2@gmail.com",
  //   phone: "09729606097",
  //   message: "call",
  //   state: "",
  //   city: "",
  //   services: "Website design",
  //   createdAt: "2024-11-20 08:23:49"
  // }
];

const ContactUs = () => {
  return (
    <AdminLayout title="All Contact Us">
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contactData.map((contact, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {contact.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.state || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.city || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {contact.services || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ContactUs;
