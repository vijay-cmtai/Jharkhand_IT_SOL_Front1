import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Edit2, // Subject/Topic for contact
  MessageSquare,
  CalendarDays,
  Trash2,
  Eye,
  EyeOff,
  Inbox,
  AlertTriangle,
  Loader2,
  Search,
  Smartphone,
  Paperclip, // For resume
  Link as LinkIcon, // For portfolio link
  Layers, // For application status or job title icon
  Briefcase, // For job title icon in application
  CheckCircle, // For success messages
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom"; // To avoid conflict with LinkIcon
import { cn } from "@/lib/utils";

// --- INTERFACES ---
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

interface JobApplication {
  _id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  resumePath: string;
  coverLetter?: string;
  portfolioLink?: string;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com"; // For contact messages and resume links
const CAREERS_API_BASE_URL =
  "https://jharkhand-it-sol-back1.onrender.com/apply"; // For job applications API

const formatDate = (dateString: string): string => {
  try {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return "Invalid Date";
  }
};

const AdminContactMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState<boolean>(true);
  const [contactError, setContactError] = useState<string | null>(null);
  const [selectedContactMessage, setSelectedContactMessage] =
    useState<ContactMessage | null>(null);

  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoadingApplications, setIsLoadingApplications] =
    useState<boolean>(true);
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [selectedJobApplication, setSelectedJobApplication] =
    useState<JobApplication | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null); // For delete loaders

  const [activeView, setActiveView] = useState<"contacts" | "applications">(
    "contacts"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRead, setFilterRead] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [filterAppStatus, setFilterAppStatus] = useState<string>("all");

  const fetchContactMessages = useCallback(async () => {
    setIsLoadingContacts(true);
    setContactError(null);
    try {
      const response = await fetch(`${BASE_URL}/contact/find`);
      if (!response.ok) {
        let errorMessage = `Failed to fetch messages: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          /* ignore */
        }
        throw new Error(errorMessage);
      }
      const data: ContactMessage[] = await response.json();
      setMessages(
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err) {
      setContactError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      console.error("Error fetching contact messages:", err);
    } finally {
      setIsLoadingContacts(false);
    }
  }, []);

  const fetchJobApplications = useCallback(async () => {
    setIsLoadingApplications(true);
    setApplicationError(null);
    try {
      const response = await fetch(`${CAREERS_API_BASE_URL}/applications`);
      if (!response.ok) {
        let errorMessage = `Failed to fetch job applications: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          /* ignore */
        }
        throw new Error(errorMessage);
      }
      const data: JobApplication[] = await response.json();
      setJobApplications(
        data.sort(
          (a, b) =>
            new Date(b.appliedAt || b.createdAt).getTime() -
            new Date(a.appliedAt || a.createdAt).getTime()
        )
      );
    } catch (err) {
      setApplicationError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while fetching applications."
      );
      console.error("Error fetching job applications:", err);
    } finally {
      setIsLoadingApplications(false);
    }
  }, []);

  useEffect(() => {
    if (activeView === "contacts") {
      fetchContactMessages();
    } else if (activeView === "applications") {
      fetchJobApplications();
    }
  }, [activeView, fetchContactMessages, fetchJobApplications]);

  const handleDeleteContactMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    setDeletingItemId(id);
    try {
      const response = await fetch(`${BASE_URL}/contact/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        /* ... error handling ... */ throw new Error(
          "Failed to delete message"
        );
      }
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (selectedContactMessage?._id === id) setSelectedContactMessage(null);
      alert("Message deleted successfully.");
    } catch (err) {
      /* ... error handling ... */ alert("Could not delete message.");
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleToggleReadStatus = async (message: ContactMessage) => {
    const newReadStatus = !message.isRead;
    try {
      const response = await fetch(`${BASE_URL}/contact/${message._id}/read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: newReadStatus }),
      });
      if (!response.ok) {
        /* ... error handling ... */ throw new Error(
          "Failed to update read status"
        );
      }
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === message._id ? { ...msg, isRead: newReadStatus } : msg
        )
      );
      if (selectedContactMessage?._id === message._id)
        setSelectedContactMessage((prev) =>
          prev ? { ...prev, isRead: newReadStatus } : null
        );
    } catch (err) {
      /* ... error handling ... */ alert("Could not update read status.");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to delete this job application?")
    )
      return;
    setDeletingItemId(id);
    try {
      // Ensure this matches your backend route: DELETE /apply/applications/:id
      const response = await fetch(
        `${CAREERS_API_BASE_URL}/applications/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        let errMsg = "Failed to delete job application";
        try {
          const errData = await response.json();
          errMsg = errData.message || errMsg;
        } catch (e) {}
        throw new Error(errMsg);
      }
      setJobApplications((prev) => prev.filter((app) => app._id !== id));
      if (selectedJobApplication?._id === id) setSelectedJobApplication(null);
      alert("Job application deleted successfully.");
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Could not delete job application."
      );
      console.error("Error deleting job application:", err);
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleUpdateApplicationStatus = async (
    applicationId: string,
    newStatus: JobApplication["status"]
  ) => {
    try {
      const response = await fetch(
        `${CAREERS_API_BASE_URL}/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        /* ... error handling ... */ throw new Error(
          "Failed to update application status"
        );
      }
      const updatedData = await response.json();
      const updatedApp = updatedData.application || updatedData; // Handle if nested under 'application' key

      setJobApplications((prevApps) =>
        prevApps.map((app) => (app._id === applicationId ? updatedApp : app))
      );
      if (selectedJobApplication?._id === applicationId) {
        setSelectedJobApplication((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }
      alert("Application status updated.");
    } catch (err) {
      /* ... error handling ... */ alert(
        "Could not update application status."
      );
      console.error("Error updating app status:", err);
    }
  };

  const filteredContactMessages = messages.filter((message) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      message.name.toLowerCase().includes(searchTermLower) ||
      message.email.toLowerCase().includes(searchTermLower) ||
      (message.phone &&
        message.phone.toLowerCase().includes(searchTermLower)) ||
      message.subject.toLowerCase().includes(searchTermLower) ||
      message.message.toLowerCase().includes(searchTermLower);
    const matchesReadFilter =
      filterRead === "all" ||
      (filterRead === "read" && message.isRead) ||
      (filterRead === "unread" && !message.isRead);
    return matchesSearchTerm && matchesReadFilter;
  });

  const filteredJobApplications = jobApplications.filter((application) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      application.fullName.toLowerCase().includes(searchTermLower) ||
      application.email.toLowerCase().includes(searchTermLower) ||
      (application.phone &&
        application.phone.toLowerCase().includes(searchTermLower)) ||
      application.jobTitle.toLowerCase().includes(searchTermLower);
    const matchesStatusFilter =
      filterAppStatus === "all" || application.status === filterAppStatus;
    return matchesSearchTerm && matchesStatusFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
          <Inbox size={36} className="inline-block mr-3 -mt-1" />
          {activeView === "contacts" ? "Contact Messages" : "Job Applications"}
        </h1>
        <p className="text-slate-400 mt-1">
          {activeView === "contacts"
            ? "View and manage messages submitted through the contact form."
            : "Review and manage job applications."}
        </p>
      </motion.div>

      <motion.div
        className="mb-6 flex space-x-2 p-1 bg-slate-800/80 backdrop-blur-sm rounded-lg max-w-md shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <button
          onClick={() => setActiveView("contacts")}
          className={cn(
            "w-full py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ease-in-out",
            activeView === "contacts"
              ? "bg-cyan-600 text-white shadow-cyan-500/30 shadow-lg"
              : "text-slate-300 hover:bg-slate-700/70"
          )}
        >
          Contact Messages
        </button>
        <button
          onClick={() => setActiveView("applications")}
          className={cn(
            "w-full py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-300 ease-in-out",
            activeView === "applications"
              ? "bg-purple-600 text-white shadow-purple-500/30 shadow-lg"
              : "text-slate-300 hover:bg-slate-700/70"
          )}
        >
          Job Applications
        </button>
      </motion.div>

      <motion.div
        className="mb-6 p-4 bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative flex-grow w-full sm:w-auto">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={`Search ${activeView === "contacts" ? "messages" : "applications"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors"
          />
        </div>
        {activeView === "contacts" && (
          <div className="flex-shrink-0 w-full sm:w-auto">
            <select
              value={filterRead}
              onChange={(e) =>
                setFilterRead(e.target.value as "all" | "read" | "unread")
              }
              className="w-full sm:w-auto bg-slate-700 border border-slate-600 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none appearance-none transition-colors"
            >
              <option value="all">All Statuses</option>{" "}
              <option value="unread">Unread</option>{" "}
              <option value="read">Read</option>
            </select>
          </div>
        )}
        {activeView === "applications" && (
          <div className="flex-shrink-0 w-full sm:w-auto">
            <select
              value={filterAppStatus}
              onChange={(e) => setFilterAppStatus(e.target.value)}
              className="w-full sm:w-auto bg-slate-700 border border-slate-600 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none appearance-none transition-colors"
            >
              <option value="all">All Statuses</option>{" "}
              <option value="Pending">Pending</option>{" "}
              <option value="Reviewed">Reviewed</option>{" "}
              <option value="Shortlisted">Shortlisted</option>{" "}
              <option value="Rejected">Rejected</option>{" "}
              <option value="Hired">Hired</option>
            </select>
          </div>
        )}
      </motion.div>

      {/* CONTACTS VIEW */}
      {activeView === "contacts" && (
        <>
          {isLoadingContacts && (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={48} className="animate-spin text-cyan-400" />
            </div>
          )}
          {contactError && (
            <div className="text-center py-10 px-4 bg-red-900/30 border border-red-700 rounded-lg">
              <AlertTriangle size={32} className="mx-auto mb-2 text-red-400" />
              <p className="text-red-400">Error: {contactError}</p>
              <button
                onClick={fetchContactMessages}
                className="mt-4 px-4 py-2 bg-red-600/70 hover:bg-red-500/70 text-white rounded-md text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          {!isLoadingContacts && !contactError && (
            <>
              {filteredContactMessages.length === 0 ? (
                <motion.p
                  className="text-center text-slate-500 py-16 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {" "}
                  No contact messages found.{" "}
                </motion.p>
              ) : (
                <motion.div
                  className="grid grid-cols-1 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredContactMessages.map((msg) => (
                    <motion.div
                      key={msg._id}
                      variants={itemVariants}
                      layout
                      className={cn(
                        "bg-slate-800 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 hover:shadow-cyan-500/20",
                        msg.isRead
                          ? "border-slate-600 opacity-70 hover:opacity-100"
                          : "border-emerald-500"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                        <div className="flex items-center mb-2 sm:mb-0">
                          {" "}
                          {!msg.isRead && (
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2.5 shrink-0"></span>
                          )}{" "}
                          <h3
                            className="text-lg font-semibold text-white truncate max-w-[200px] sm:max-w-[300px] md:max-w-md"
                            title={msg.subject}
                          >
                            {" "}
                            {msg.subject}{" "}
                          </h3>{" "}
                        </div>
                        <span className="text-xs text-slate-400 flex items-center">
                          {" "}
                          <CalendarDays size={14} className="mr-1.5" />{" "}
                          {formatDate(msg.createdAt)}{" "}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300 mb-3">
                        <p className="flex items-center mb-1">
                          {" "}
                          <User
                            size={15}
                            className="mr-2 text-cyan-400 shrink-0"
                          />{" "}
                          <span className="font-medium mr-1">From:</span>{" "}
                          {msg.name}{" "}
                          <a
                            href={`mailto:${msg.email}`}
                            className="ml-2 text-cyan-400 hover:underline text-xs"
                          >
                            {" "}
                            ({msg.email}){" "}
                          </a>{" "}
                        </p>
                        {msg.phone && (
                          <p className="flex items-center text-xs mt-1">
                            {" "}
                            <Smartphone
                              size={14}
                              className="mr-2 text-slate-500 shrink-0"
                            />{" "}
                            <span className="text-slate-400">
                              {msg.phone}
                            </span>{" "}
                          </p>
                        )}
                      </div>
                      <p
                        className="text-sm text-slate-400 line-clamp-2 mb-4"
                        title={msg.message}
                      >
                        {" "}
                        {msg.message}{" "}
                      </p>
                      <div className="flex flex-wrap gap-2 items-center justify-end border-t border-slate-700 pt-3">
                        <button
                          onClick={() => setSelectedContactMessage(msg)}
                          className="px-3 py-1.5 text-xs bg-blue-600/80 hover:bg-blue-500/80 text-white rounded-md transition-colors flex items-center"
                        >
                          {" "}
                          <Eye size={14} className="mr-1.5" /> View{" "}
                        </button>
                        <button
                          onClick={() => handleToggleReadStatus(msg)}
                          className={cn(
                            "px-3 py-1.5 text-xs text-white rounded-md transition-colors flex items-center",
                            msg.isRead
                              ? "bg-yellow-600/80 hover:bg-yellow-500/80"
                              : "bg-green-600/80 hover:bg-green-500/80"
                          )}
                        >
                          {" "}
                          {msg.isRead ? (
                            <EyeOff size={14} className="mr-1.5" />
                          ) : (
                            <Eye size={14} className="mr-1.5" />
                          )}{" "}
                          {msg.isRead ? "Unread" : "Read"}{" "}
                        </button>
                        <button
                          onClick={() => handleDeleteContactMessage(msg._id)}
                          disabled={deletingItemId === msg._id}
                          className="px-3 py-1.5 text-xs bg-red-700/80 hover:bg-red-600/80 text-white rounded-md transition-colors flex items-center disabled:opacity-50"
                        >
                          {" "}
                          {deletingItemId === msg._id ? (
                            <Loader2
                              size={14}
                              className="animate-spin mr-1.5"
                            />
                          ) : (
                            <Trash2 size={14} className="mr-1.5" />
                          )}{" "}
                          Delete{" "}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </>
      )}

      {/* JOB APPLICATIONS VIEW */}
      {activeView === "applications" && (
        <>
          {isLoadingApplications && (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={48} className="animate-spin text-purple-400" />
            </div>
          )}
          {applicationError && (
            <div className="text-center py-10 px-4 bg-red-900/30 border border-red-700 rounded-lg">
              <AlertTriangle size={32} className="mx-auto mb-2 text-red-400" />
              <p className="text-red-400">Error: {applicationError}</p>
              <button
                onClick={fetchJobApplications}
                className="mt-4 px-4 py-2 bg-red-600/70 hover:bg-red-500/70 text-white rounded-md text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          {!isLoadingApplications && !applicationError && (
            <>
              {filteredJobApplications.length === 0 ? (
                <motion.p
                  className="text-center text-slate-500 py-16 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {" "}
                  No job applications found.{" "}
                </motion.p>
              ) : (
                <motion.div
                  className="grid grid-cols-1 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredJobApplications.map((app) => (
                    <motion.div
                      key={app._id}
                      variants={itemVariants}
                      layout
                      className="bg-slate-800 p-4 rounded-lg shadow-lg border-l-4 border-purple-500 transition-all duration-300 hover:shadow-purple-500/20"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                        <div className="flex items-center">
                          <Briefcase
                            size={16}
                            className="mr-2 text-purple-400 shrink-0"
                          />
                          <h3
                            className="text-lg font-semibold text-white truncate max-w-[180px] sm:max-w-[280px] md:max-w-sm"
                            title={app.jobTitle}
                          >
                            {" "}
                            {app.jobTitle}{" "}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 flex items-center mt-1 sm:mt-0">
                          {" "}
                          <CalendarDays size={14} className="mr-1.5" />{" "}
                          {formatDate(app.appliedAt || app.createdAt)}{" "}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300 mb-3 space-y-1">
                        <p className="flex items-center">
                          {" "}
                          <User
                            size={15}
                            className="mr-2 text-purple-400 shrink-0"
                          />{" "}
                          <span className="font-medium mr-1">Applicant:</span>{" "}
                          {app.fullName}{" "}
                          <a
                            href={`mailto:${app.email}`}
                            className="ml-2 text-purple-300 hover:underline text-xs"
                          >
                            ({app.email})
                          </a>{" "}
                        </p>
                        {app.phone && (
                          <p className="flex items-center text-xs">
                            {" "}
                            <Smartphone
                              size={14}
                              className="mr-2 text-slate-500 shrink-0"
                            />{" "}
                            <span className="text-slate-400">
                              {app.phone}
                            </span>{" "}
                          </p>
                        )}
                        <p className="flex items-center text-xs">
                          {" "}
                          <Layers
                            size={14}
                            className="mr-2 text-slate-500 shrink-0"
                          />{" "}
                          <span className="font-medium mr-1">Status:</span>{" "}
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              app.status === "Pending"
                                ? "bg-yellow-600/30 text-yellow-200"
                                : app.status === "Reviewed"
                                  ? "bg-blue-600/30 text-blue-200"
                                  : app.status === "Shortlisted"
                                    ? "bg-sky-600/30 text-sky-200"
                                    : app.status === "Hired"
                                      ? "bg-green-600/30 text-green-200"
                                      : "bg-red-600/30 text-red-200"
                            )}
                          >
                            {" "}
                            {app.status}{" "}
                          </span>{" "}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center justify-end border-t border-slate-700 pt-3">
                        <button
                          onClick={() => setSelectedJobApplication(app)}
                          className="px-3 py-1.5 text-xs bg-blue-600/80 hover:bg-blue-500/80 text-white rounded-md transition-colors flex items-center"
                        >
                          {" "}
                          <Eye size={14} className="mr-1.5" /> View{" "}
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(app._id)}
                          disabled={deletingItemId === app._id}
                          className="px-3 py-1.5 text-xs bg-red-700/80 hover:bg-red-600/80 text-white rounded-md transition-colors flex items-center disabled:opacity-50"
                        >
                          {" "}
                          {deletingItemId === app._id ? (
                            <Loader2
                              size={14}
                              className="animate-spin mr-1.5"
                            />
                          ) : (
                            <Trash2 size={14} className="mr-1.5" />
                          )}{" "}
                          Delete{" "}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </>
      )}

      {/* Modal for Contact Message Details */}
      <AnimatePresence>
        {selectedContactMessage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedContactMessage(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                {" "}
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {" "}
                  Message Details{" "}
                </h2>{" "}
                <button
                  onClick={() => setSelectedContactMessage(null)}
                  className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
                >
                  ×
                </button>{" "}
              </div>
              <div className="space-y-3 text-sm">
                <p className="flex items-start">
                  {" "}
                  <User
                    size={16}
                    className="mr-3 mt-0.5 text-cyan-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-20 shrink-0">From:</span>{" "}
                  <span className="text-slate-200">
                    {selectedContactMessage.name} (
                    <a
                      href={`mailto:${selectedContactMessage.email}`}
                      className="text-cyan-300 hover:underline"
                    >
                      {selectedContactMessage.email}
                    </a>
                    )
                  </span>{" "}
                </p>
                {selectedContactMessage.phone && (
                  <p className="flex items-start">
                    {" "}
                    <Smartphone
                      size={16}
                      className="mr-3 mt-0.5 text-cyan-400 shrink-0"
                    />{" "}
                    <span className="font-semibold w-20 shrink-0">Phone:</span>{" "}
                    <span className="text-slate-200">
                      {selectedContactMessage.phone}
                    </span>{" "}
                  </p>
                )}
                <p className="flex items-start">
                  {" "}
                  <CalendarDays
                    size={16}
                    className="mr-3 mt-0.5 text-cyan-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-20 shrink-0">Received:</span>{" "}
                  <span className="text-slate-200">
                    {formatDate(selectedContactMessage.createdAt)}
                  </span>{" "}
                </p>
                <p className="flex items-start">
                  {" "}
                  <Edit2
                    size={16}
                    className="mr-3 mt-0.5 text-cyan-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-20 shrink-0">Subject:</span>{" "}
                  <span className="text-slate-200">
                    {selectedContactMessage.subject}
                  </span>{" "}
                </p>
                <div className="pt-2">
                  {" "}
                  <p className="flex items-start">
                    {" "}
                    <MessageSquare
                      size={16}
                      className="mr-3 mt-0.5 text-cyan-400 shrink-0"
                    />{" "}
                    <span className="font-semibold w-20 shrink-0">
                      {" "}
                      Message:{" "}
                    </span>{" "}
                  </p>{" "}
                  <div className="mt-1 pl-[32px] bg-slate-700/50 p-3 rounded-md whitespace-pre-wrap text-slate-200 leading-relaxed">
                    {" "}
                    {selectedContactMessage.message}{" "}
                  </div>{" "}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    if (selectedContactMessage)
                      handleToggleReadStatus(selectedContactMessage);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm rounded-md transition-colors flex items-center",
                    selectedContactMessage?.isRead
                      ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  )}
                >
                  {" "}
                  {selectedContactMessage?.isRead ? (
                    <EyeOff size={16} className="mr-2" />
                  ) : (
                    <Eye size={16} className="mr-2" />
                  )}{" "}
                  {selectedContactMessage?.isRead
                    ? "Mark as Unread"
                    : "Mark as Read"}{" "}
                </button>
                <button
                  onClick={() => setSelectedContactMessage(null)}
                  className="px-4 py-2 text-sm bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors"
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Job Application Details */}
      <AnimatePresence>
        {selectedJobApplication && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJobApplication(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                {" "}
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {" "}
                  Application: {selectedJobApplication.jobTitle}{" "}
                </h2>{" "}
                <button
                  onClick={() => setSelectedJobApplication(null)}
                  className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
                >
                  ×
                </button>{" "}
              </div>
              <div className="space-y-3 text-sm">
                <p className="flex items-start">
                  {" "}
                  <User
                    size={16}
                    className="mr-3 mt-0.5 text-purple-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-28 shrink-0">
                    Applicant:
                  </span>{" "}
                  <span className="text-slate-200">
                    {selectedJobApplication.fullName} (
                    <a
                      href={`mailto:${selectedJobApplication.email}`}
                      className="text-purple-300 hover:underline"
                    >
                      {selectedJobApplication.email}
                    </a>
                    )
                  </span>{" "}
                </p>
                {selectedJobApplication.phone && (
                  <p className="flex items-start">
                    {" "}
                    <Smartphone
                      size={16}
                      className="mr-3 mt-0.5 text-purple-400 shrink-0"
                    />{" "}
                    <span className="font-semibold w-28 shrink-0">Phone:</span>{" "}
                    <span className="text-slate-200">
                      {selectedJobApplication.phone}
                    </span>{" "}
                  </p>
                )}
                <p className="flex items-start">
                  {" "}
                  <CalendarDays
                    size={16}
                    className="mr-3 mt-0.5 text-purple-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-28 shrink-0">
                    Applied On:
                  </span>{" "}
                  <span className="text-slate-200">
                    {formatDate(
                      selectedJobApplication.appliedAt ||
                        selectedJobApplication.createdAt
                    )}
                  </span>{" "}
                </p>
                <p className="flex items-start">
                  {" "}
                  <Layers
                    size={16}
                    className="mr-3 mt-0.5 text-purple-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-28 shrink-0">
                    Current Status:
                  </span>
                  <select
                    value={selectedJobApplication.status}
                    onChange={(e) =>
                      handleUpdateApplicationStatus(
                        selectedJobApplication._id,
                        e.target.value as JobApplication["status"]
                      )
                    }
                    className="ml-2 bg-slate-700 border border-slate-600 rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none appearance-none"
                  >
                    <option value="Pending">Pending</option>{" "}
                    <option value="Reviewed">Reviewed</option>{" "}
                    <option value="Shortlisted">Shortlisted</option>{" "}
                    <option value="Rejected">Rejected</option>{" "}
                    <option value="Hired">Hired</option>
                  </select>
                </p>
                {selectedJobApplication.portfolioLink && (
                  <p className="flex items-start">
                    {" "}
                    <LinkIcon
                      size={16}
                      className="mr-3 mt-0.5 text-purple-400 shrink-0"
                    />{" "}
                    <span className="font-semibold w-28 shrink-0">
                      Portfolio:
                    </span>{" "}
                    <a
                      href={selectedJobApplication.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:underline truncate max-w-xs"
                    >
                      {selectedJobApplication.portfolioLink}
                    </a>{" "}
                  </p>
                )}
                <p className="flex items-start">
                  {" "}
                  <Paperclip
                    size={16}
                    className="mr-3 mt-0.5 text-purple-400 shrink-0"
                  />{" "}
                  <span className="font-semibold w-28 shrink-0">Resume:</span>
                  <a
                    href={`${BASE_URL}/${selectedJobApplication.resumePath.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:underline"
                  >
                    {" "}
                    View/Download Resume{" "}
                  </a>
                </p>
                {selectedJobApplication.coverLetter && (
                  <div className="pt-2">
                    <p className="flex items-start">
                      {" "}
                      <MessageSquare
                        size={16}
                        className="mr-3 mt-0.5 text-purple-400 shrink-0"
                      />{" "}
                      <span className="font-semibold w-28 shrink-0">
                        {" "}
                        Cover Letter:{" "}
                      </span>{" "}
                    </p>
                    <div className="mt-1 pl-[40px] bg-slate-700/50 p-3 rounded-md whitespace-pre-wrap text-slate-200 leading-relaxed">
                      {" "}
                      {selectedJobApplication.coverLetter}{" "}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedJobApplication(null)}
                  className="px-4 py-2 text-sm bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors"
                >
                  {" "}
                  Close{" "}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContactMessagesPage;
