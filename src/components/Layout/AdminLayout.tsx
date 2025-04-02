import React from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewSite = () => {
    window.location.href = "https://classified.dextrous.co.in/";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <Input
                  type="text"
                  placeholder="Search here"
                  className="pl-10 pr-4 py-2 border rounded-md"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                onClick={handleViewSite}
              >
                <LogOut className="h-4 w-4" />
                <span>View Site</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
        <footer className="bg-white border-t py-3 px-4 text-center text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <span> Biziffy All copyright (C) 2025 Reserved</span>
            {/* <span>V-1.0.1</span> */}
          </div>
        </footer>
      </div>
    </div>
  );
};
