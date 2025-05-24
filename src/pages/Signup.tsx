// src/pages/Signup.tsx (or your path)
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// No need to import `signup` from useAuth if it doesn't make the API call
// import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const SIGNUP_API_URL =
  "https://jharkhand-it-sol-back1.onrender.com/api/auth/signup"; // Adjust if your backend runs elsewhere

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { setAuthState } = useAuth(); // Get setAuthState if you plan to auto-login after signup
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(SIGNUP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific backend error messages
        let errorMessage = "Signup failed. Please try again.";
        if (data.message) {
          errorMessage = data.message;
        } else if (data.errors) {
          errorMessage = Object.values(data.errors).join(", ");
        }
        throw new Error(errorMessage);
      }

      toast({
        title: data.message || "Account Created Successfully!",
        description: "You can now log in with your credentials.",
        variant: "default", // Or "success"
      });

      // After successful signup, navigate to the login page
      navigate("/login");

      // If you wanted to auto-login the user after signup:
      // if (data.user && data.token) {
      //   setAuthState(data.user, data.token); // Call the function from useAuth context
      //   navigate("/"); // Redirect to home or dashboard
      // } else {
      //    navigate("/login"); // Fallback if auto-login data is not complete
      // }
    } catch (error: any) {
      console.error("Signup API error:", error);
      toast({
        title: "Signup Failed",
        description:
          error.message || "An unexpected error occurred during signup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 md:py-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-md w-full bg-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700">
        <div className="px-6 py-8 md:px-8 md:py-10">
          <h2 className="text-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="bg-gray-700/50 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-gray-700/50 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (min. 6 characters)"
                required
                className="bg-gray-700/50 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-700/50 border-gray-600 text-white focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
