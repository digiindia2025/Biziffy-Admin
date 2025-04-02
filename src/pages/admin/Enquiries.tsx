
import { AdminLayout } from "@/components/Layout/AdminLayout";

const enquiriesData = [
  // {
  //   id: 1,
  //   userName: "sachin@dextrousinfo.in",
  //   title: "sunil",
  //   name: "kumar",
  //   requirement: ""
  // },
  // {
  //   id: 2,
  //   userName: "sachin@dextrousinfo.in",
  //   title: "good",
  //   name: "noon",
  //   requirement: ""
  // },
  // {
  //   id: 3,
  //   userName: "sachin@dextrousinfo.in",
  //   title: "Sachin",
  //   name: "fsdfs",
  //   requirement: ""
  // },
  // {
  //   id: 4,
  //   userName: "sachin@dextrousinfo.in",
  //   title: "ee",
  //   name: "ee",
  //   requirement: ""
  // },
  // {
  //   id: 5,
  //   userName: "",
  //   title: "vipin",
  //   name: "i want sofa set",
  //   requirement: ""
  // },
  // {
  //   id: 6,
  //   userName: "super_admin",
  //   title: "Pardeep Kumar",
  //   name: "abcs",
  //   requirement: ""
  // },
  // {
  //   id: 7,
  //   userName: "sachin@dextrousinfo.in",
  //   title: "Karamjeet Kaur",
  //   name: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  //   requirement: ""
  // },
  // {
  //   id: 8,
  //   userName: "",
  //   title: "Abhishek Tyagi",
  //   name: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  //   requirement: ""
  // }
];

const Enquiries = () => {
  return (
    <AdminLayout title="All Enquiries">
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr. No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requirement
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enquiriesData.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enquiry.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enquiry.userName || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enquiry.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enquiry.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-lg">
                    {enquiry.requirement || enquiry.name}
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

export default Enquiries;
