
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock data for a listing - in a real app, this would come from an API
const mockListingData = {
  id: 176,
  businessName: "software development",
  category: "Software & Web Development",
  subCategory: "Software Development",
  childCategory: "  Software Development",
  phone: "+91-9031359720",
  hidePhoneNumber: false,
  services: "software development, web development",
  viewCount: 0,
  status: "Pending",
  address: "greater noida",
  city: "Noida",
  landmark: "9031359720",
  pin: "202357",
  state: "Uttar Pradesh",
  country: "India",
  description: `aase our free Lorem Ipsum`,
  gstNo: "",
  cin: "N/A",
  entity: "Proprietorship",
  user: {
    name: "Aman Tiwari",
    email: "aman@gmail.com",
    phone: "9031359720",
    profileImage: "./images/profile-icon.png",
  }
};

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(mockListingData);
  
  // In a real application, you would fetch the listing details from an API
  useEffect(() => {
    // Simulating API call
    console.log(`Fetching listing details for ID: ${id}`);
    // For now we'll use the mock data
    setListing(mockListingData);
  }, [id]);

  return (
    <AdminLayout title="Listing Details">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Listing Details</h2>
        <Link to="/admin/dashboard">
          <Button className="bg-blue-500 hover:bg-blue-600">
            All Listings
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Thumb Image:</h3>
            <div className="border border-gray-300 rounded-md w-32 h-32 flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 text-center p-4">
                <div className="text-5xl mb-2">?</div>

                <img
                  src="/images/profile-icon.png"
                   alt="Profile"
                   className="w-16 h-16  mb-2"
                     />


                {/* <p className="text-sm text-gray-500">No image available</p> */}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Gallery Images:</h3>
            <p className="text-gray-500">No gallery images available</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">User Info:</h3>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Name</p>
                    <p>{listing.user.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p>{listing.user.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p>{listing.user.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <p className="font-medium">Business Name:</p>
                  <p>{listing.businessName}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Category:</p>
                  <p>{listing.category}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Sub Category:</p>
                  <p>{listing.subCategory}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Child Category:</p>
                  <p>{listing.childCategory || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Phone:</p>
                  <p>{listing.phone}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Hide Phone Number:</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={listing.hidePhoneNumber}
                      readOnly
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Services:</p>
                  <p>{listing.services}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">View Count:</p>
                  <p>{listing.viewCount}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Status:</p>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    {listing.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Address:</p>
                  <p>{listing.address}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">City:</p>
                  <p>{listing.city}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Landmark:</p>
                  <p>{listing.landmark}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Pin:</p>
                  <p>{listing.pin}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">State:</p>
                  <p>{listing.state}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Country:</p>
                  <p>{listing.country}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <p className="font-medium">Description:</p>
                <p className="text-sm text-gray-600 mt-2">{listing.description}</p>
              </div>
              
              <div className="mt-6">
                <div className="mb-4">
                  <p className="font-medium">GST No.:</p>
                  <p>{listing.gstNo || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">CIN:</p>
                  <p>{listing.cin}</p>
                </div>
                <div className="mb-4">
                  <p className="font-medium">Entity:</p>
                  <p>{listing.entity}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ListingDetails;