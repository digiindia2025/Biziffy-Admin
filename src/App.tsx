
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Membership from "./pages/admin/Membership";
import Reviews from "./pages/admin/Reviews";
import Links from "./pages/admin/Links";
import Enquiries from "./pages/admin/Enquiries";
import SupportTickets from "./pages/admin/SupportTickets";
import Departments from "./pages/admin/Departments";
import ContactUs from "./pages/admin/ContactUs";
import ChildCategories from "./pages/admin/ChildCategories";
import AddChildCategory from "./pages/admin/AddChildCategory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
            <Route path="/admin/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
            <Route path="/admin/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
            <Route path="/admin/support/tickets" element={<ProtectedRoute><SupportTickets /></ProtectedRoute>} />
            <Route path="/admin/support/department" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
            <Route path="/admin/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
            <Route path="/admin/child-categories" element={<ProtectedRoute><ChildCategories /></ProtectedRoute>} />
            <Route path="/admin/child-categories/add" element={<ProtectedRoute><AddChildCategory /></ProtectedRoute>} />
            
            {/* Logout Route */}
            <Route 
              path="/logout" 
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
