
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, FilePlus, Plus } from "lucide-react";

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8 space-x-3">
          <LayoutDashboard className="h-8 w-8 text-jis-purple" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-jis-blue via-jis-purple to-jis-teal bg-clip-text text-transparent">Admin Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg hover:shadow-jis-blue/10 transition-all h-full">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="flex items-center gap-2 text-white">
                  <FilePlus className="h-5 w-5 text-jis-blue" />
                  Manage Services
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-400 mb-6">
                  Create and manage services offered by your company. Add subsections to organize your service offerings.
                </p>
                <Link to="/admin/create-service">
                  <Button className="bg-gradient-to-r from-jis-blue to-jis-teal hover:opacity-90 transition-all">
                    Create New Service
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg hover:shadow-jis-purple/10 transition-all h-full">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="h-5 w-5 text-jis-purple" />
                  Manage Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-400 mb-6">
                  Add new projects to your portfolio showcase. Include images, descriptions and links to showcase your work.
                </p>
                <Link to="/admin/create-portfolio">
                  <Button className="bg-gradient-to-r from-jis-purple to-jis-teal hover:opacity-90 transition-all">
                    Create Portfolio Item
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
