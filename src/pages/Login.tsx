// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Mail, Lock, LogInIcon, Loader2, Send, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGIN_API_URL = `${import.meta.env.VITE_API_BASE_URL || "https://jharkhand-it-sol-back1.onrender.com"}/api/auth/login`;
const FORGOT_PASSWORD_API_URL = `${import.meta.env.VITE_API_BASE_URL || "https://jharkhand-it-sol-back1.onrender.com"}/api/auth/requestpasswordreset`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthState } = useAuth(); // From your API-connected useAuth
  const navigate = useNavigate();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSendingReset, setIsSendingReset] = useState(false);

  // --- THIS IS THE CORRECTED/RESTORED LOGIN SUBMIT HANDLER ---
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      if (data.user && data.token) {
        setAuthState(data.user, data.token); // Call setAuthState from useAuth
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.user.name || "User"}!`,
          variant: "default",
        });

        // Navigate based on role (or just to home if all logged in see admin panel)
        if (data.user.role === "admin") {
          // This relies on backend sending correct role
          console.log("Navigating to /admin because backend role is admin");
          navigate("/admin");
        } else {
          console.log(
            "Navigating to / because user successfully logged in (UI shows admin panel). Backend role:",
            data.user.role
          );
          navigate("/"); // Or wherever you want "UI admins" to go
        }
      } else {
        throw new Error(
          "Login response did not include expected user data or token."
        );
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description:
          error.message || "An unexpected error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // --- END OF CORRECTED LOGIN SUBMIT HANDLER ---

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingReset(true);
    if (!forgotEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset password.",
        variant: "destructive",
      });
      setIsSendingReset(false);
      return;
    }

    try {
      const response = await fetch(FORGOT_PASSWORD_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send password reset email.");
      }

      toast({
        title: "Reset Email Sent",
        description:
          data.message ||
          "If an account exists for this email, a reset link has been sent. Please check your inbox (and spam folder).",
        variant: "default",
      });

      setForgotEmail("");
      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Could not process password reset request.",
        variant: "destructive",
      });
    } finally {
      setIsSendingReset(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl rounded-xl overflow-hidden border border-gray-700/50">
        <div className="p-6 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!showForgotPassword ? (
              <motion.div
                key="login-form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-center mb-8">
                  <LogInIcon className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Welcome Back!
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Sign in to continue to your account.
                  </p>
                </div>

                {/* The login form's onSubmit calls handleLoginSubmit */}
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="pl-10 bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pl-10 bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
                {/* <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
                  Not a member?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Sign up now
                  </Link>
                </p> */}
              </motion.div>
            ) : (
              <motion.div
                key="forgot-password-form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-center mb-8 relative">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="absolute top-0 left-0 text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-300 transition-colors p-1"
                    aria-label="Back to login"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <Send className="mx-auto h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-3" />
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Reset Password
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Enter your email to receive a reset link.
                  </p>
                </div>
                {/* The forgot password form's onSubmit calls handleForgotPasswordSubmit */}
                <form
                  onSubmit={handleForgotPasswordSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="forgot-email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Your Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <Input
                        id="forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="pl-10 bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-all"
                    disabled={isSendingReset}
                  >
                    {isSendingReset ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
                <p className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Back to Sign In
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;
