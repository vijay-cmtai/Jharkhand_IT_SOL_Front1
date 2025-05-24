// src/pages/ApplyJobPage.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; // Import useLocation
import { motion } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Paperclip,
  FileText,
  Send,
  Loader2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  portfolioLink: string;
}
const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";
const ApplyJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const location = useLocation(); // Use useLocation to get query parameters
  const queryParams = new URLSearchParams(location.search);
  const jobTitle = queryParams.get("title") || "Selected Position"; // Get job title from query param

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    portfolioLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
    setSuccess(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic file type/size validation (optional but recommended)
      if (file.size > 5 * 1024 * 1024) {
        // Max 5MB
        setError("Resume file is too large. Max 5MB allowed.");
        e.target.value = ""; // Clear the input
        setFormData((prev) => ({ ...prev, resume: null }));
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Please upload PDF or DOC/DOCX.");
        e.target.value = "";
        setFormData((prev) => ({ ...prev, resume: null }));
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.resume) {
      setError("Full Name, Email, and Resume are required.");
      return;
    }
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append("jobId", jobId || "general_application"); // If jobId is undefined, send a default
    submissionData.append("jobTitle", jobTitle);
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    if (formData.resume) {
      submissionData.append("resume", formData.resume);
    }
    submissionData.append("coverLetter", formData.coverLetter);
    submissionData.append("portfolioLink", formData.portfolioLink);

    try {
      // ACTUAL API CALL
      const response = await fetch(`${BASE_URL}/apply/upload`, {
        // Ensure this URL is correct
        method: "POST",
        body: submissionData, // FormData handles headers automatically for multipart/form-data
      });

      const responseData = await response
        .json()
        .catch(() => ({ message: "Invalid JSON response from server." }));

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to submit application."
        );
      }

      setSuccess(
        "Application submitted successfully! We will get back to you soon."
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
        portfolioLink: "",
      });
      const resumeInput = document.getElementById(
        "resume-upload"
      ) as HTMLInputElement;
      if (resumeInput) resumeInput.value = ""; // Clear file input
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      console.error("Application submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses =
    "block w-full rounded-md border-slate-600 bg-slate-700/50 text-slate-100 placeholder-slate-400 shadow-sm focus:border-jis-teal focus:ring-1 focus:ring-jis-teal sm:text-sm transition-colors";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black text-slate-100 py-12 md:py-20 px-4 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Link
            to="/career"
            className="inline-flex items-center text-jis-teal hover:text-jis-green mb-6 text-sm"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Careers
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-jis-green via-jis-teal to-white">
            Apply for: {jobTitle}
          </h1>
          <p className="text-slate-400 mt-2">
            Fill out the form below to submit your application.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-800/60 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div>
            <label htmlFor="fullName" className={labelClasses}>
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative mt-1">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={cn(inputBaseClasses, "pl-10 py-2.5")}
                placeholder="e.g., John Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={cn(inputBaseClasses, "pl-10 py-2.5")}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number
            </label>
            <div className="relative mt-1">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={cn(inputBaseClasses, "pl-10 py-2.5")}
                placeholder="(+91) XXXXX XXXXX"
              />
            </div>
          </div>

          <div>
            <label htmlFor="resume" className={labelClasses}>
              Upload Resume <span className="text-red-400">*</span>
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="resume-upload"
                className="flex items-center px-4 py-2.5 bg-slate-600/80 text-slate-300 rounded-md border border-slate-500 cursor-pointer hover:bg-slate-500/80 transition-colors text-sm"
              >
                <Paperclip size={16} className="mr-2" />
                <span>
                  {formData.resume ? formData.resume.name : "Choose File"}
                </span>
              </label>
              <input
                id="resume-upload"
                name="resume"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                required
                accept=".pdf,.doc,.docx"
              />
            </div>
            {formData.resume && (
              <p className="text-xs text-slate-400 mt-1.5">
                Selected: {formData.resume.name}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Max file size: 5MB. Allowed types: PDF, DOC, DOCX.
            </p>
          </div>

          <div>
            <label htmlFor="coverLetter" className={labelClasses}>
              Cover Letter (Optional)
            </label>
            <div className="relative mt-1">
              <FileText
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <textarea
                name="coverLetter"
                id="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={5}
                className={cn(inputBaseClasses, "pl-10 py-2.5 min-h-[120px]")}
                placeholder="Tell us why you're a great fit..."
              ></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="portfolioLink" className={labelClasses}>
              Portfolio/LinkedIn Link (Optional)
            </label>
            <div className="relative mt-1">
              <LinkIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="url"
                name="portfolioLink"
                id="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                className={cn(inputBaseClasses, "pl-10 py-2.5")}
                placeholder="https://linkedin.com/in/yourprofile or https://yourportfolio.com"
              />
            </div>
          </div>

          {error && (
            <div className="my-3 p-3 rounded-md bg-red-500/20 text-red-300 text-sm flex items-center">
              <AlertTriangle size={18} className="mr-2" /> {error}
            </div>
          )}
          {success && (
            <div className="my-3 p-3 rounded-md bg-green-500/20 text-green-300 text-sm flex items-center">
              <CheckCircle size={18} className="mr-2" /> {success}
            </div>
          )}

          <div className="pt-4 border-t border-slate-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group inline-flex items-center justify-center bg-jis-green hover:bg-jis-green/90 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-jis-green/30 transform transition-all hover:-translate-y-1 disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <Send
                  size={18}
                  className="mr-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ApplyJobPage;
