// src/pages/ResetPasswordPage.tsx (Create this new file)
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Lock, KeyRound, Loader2, CheckCircle, XCircle } from "lucide-react";

const RESET_PASSWORD_API_URL = `${import.meta.env.VITE_API_BASE_URL || "https://jharkhand-it-sol-back1.onrender.com"}/api/auth/resetpassword`;

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>(); // Get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!token) {
      setMessage({
        type: "error",
        text: "Invalid or missing password reset token.",
      });
      // Optionally redirect after a delay
      // setTimeout(() => navigate('/login'), 3000);
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast({
        title: "Error",
        description: "Invalid reset token.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${RESET_PASSWORD_API_URL}/${token}`, {
        // Send token in URL
        method: "PUT", // Or POST, depending on your backend route for reset
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setMessage({
        type: "success",
        text:
          data.message || "Password reset successfully! You can now log in.",
      });
      toast({
        title: "Success",
        description:
          data.message || "Password reset successfully! Please log in.",
        variant: "default",
      });
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred.",
      });
      toast({
        title: "Error",
        description: error.message || "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700/50">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <KeyRound className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Set New Password
            </h1>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/30" : "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/30"} flex items-center`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          )}

          {!message?.text.includes("successfully") &&
            token && ( // Only show form if not successful and token exists
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <Input
                      id="new-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••• (min. 6 characters)"
                      required
                      className="pl-10 bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <Input
                      id="confirm-new-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-10 bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full py-3 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}
          {message && (
            <p className="mt-8 text-center text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Back to Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
