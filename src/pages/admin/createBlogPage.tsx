import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  Tag,
  CalendarDays,
  User,
  Layers,
  Type,
  AlignLeft,
  Globe,
  Save,
  Send,
  Settings,
  Loader2,
  Trash2, // For delete button
  Edit3, // For edit button (optional, for future)
  AlertTriangle, // For error display
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- INTERFACES ---
interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: File | null;
  featuredImageUrlPreview: string | null;
  category: string;
  tags: string;
  author: string;
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published";
}

// Interface for blog posts fetched from the API for the list
interface ExistingBlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string; // "Draft" or "Published"
  imageUrl?: string; // Optional, as not all blogs might have it
  publishDate: string;
  // Add any other fields you want to display in the list
}

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

const initialFormData: BlogFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: null,
  featuredImageUrlPreview: null,
  category: "",
  tags: "",
  author: "Admin",
  publishDate: new Date().toISOString().split("T")[0],
  metaTitle: "",
  metaDescription: "",
  status: "draft",
};

const blogCategories = [
  "UI/UX Design",
  "Web Development",
  "Mobile Apps",
  "Digital Marketing",
  "Technology",
  "Tutorials",
  "Case Studies",
  "Company News",
];

// Helper to format date
const formatDateDisplay = (isoDateString: string) => {
  try {
    return new Date(isoDateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

const CreateBlogPage: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    "draft" | "publish" | null
  >(null);

  // State for the list of existing blog posts
  const [existingPosts, setExistingPosts] = useState<ExistingBlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  const navigate = useNavigate();

  // --- EFFECT HOOKS ---
  useEffect(() => {
    const currentPreviewUrl = formData.featuredImageUrlPreview;
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [formData.featuredImageUrlPreview]);

  // Fetch existing blog posts
  const fetchExistingPosts = async () => {
    setIsLoadingPosts(true);
    setPostsError(null);
    try {
      const response = await fetch(`${BASE_URL}/blogs`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      const data: ExistingBlogPost[] = await response.json();
      // Sort by publishDate descending
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
      setExistingPosts(sortedData);
    } catch (err) {
      setPostsError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error fetching existing posts:", err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchExistingPosts();
  }, []); // Fetch on component mount

  // --- HELPER FUNCTIONS ---
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  // --- EVENT HANDLERS ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      if (
        name === "title" &&
        (prev.slug === "" || prev.slug === generateSlug(prev.title))
      ) {
        newState.slug = generateSlug(value);
      }
      if (name === "title" && prev.metaTitle === "") newState.metaTitle = value;
      if (name === "excerpt" && prev.metaDescription === "")
        newState.metaDescription = value.substring(0, 160);
      return newState;
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large! Maximum size is 2MB.");
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
        featuredImageUrlPreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        featuredImage: null,
        featuredImageUrlPreview: null,
      }));
    }
  };

  const handleSubmitForm = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    publishAction: boolean
  ) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      alert(
        "Please fill in all required fields: Title, Content, and Category."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionType(publishAction ? "publish" : "draft");
    const finalStatus = publishAction ? "Published" : "Draft";
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "featuredImage" && value instanceof File) {
        payload.append("image", value, value.name); // Ensure 'image' matches backend multer field
      } else if (
        key !== "featuredImageUrlPreview" &&
        value !== null &&
        value !== undefined
      ) {
        // Exclude preview URL and ensure other values are not null/undefined
        if (key === "status") {
          payload.append(key, finalStatus); // Use the correctly cased finalStatus
        } else {
          payload.append(key, String(value));
        }
      }
    });
    // If slug, metaTitle, metaDescription are empty, generate/populate them
    if (!payload.has("slug") || !formData.slug)
      payload.set("slug", generateSlug(formData.title));
    if (!payload.has("metaTitle") || !formData.metaTitle)
      payload.set("metaTitle", formData.title);
    if (!payload.has("metaDescription") || !formData.metaDescription)
      payload.set("metaDescription", formData.excerpt.substring(0, 160));

    payload.set("status", finalStatus); // Ensure correct status is always set

    try {
      const response = await fetch(`${BASE_URL}/blogs/create`, {
        method: "POST",
        body: payload,
      });
      const responseText = await response.text();
      let responseData: any;
      try {
        responseData = JSON.parse(responseText);
      } catch (jsonError) {
        if (!response.ok)
          throw new Error(
            `Server error: ${response.status} - ${responseText || "Failed to parse server error response."}`
          );
        console.warn("API response was OK but not valid JSON:", responseText);
        responseData = {
          message:
            "Operation successful, but server response format was unexpected.",
        };
      }

      if (!response.ok) {
        const errorMessage =
          responseData?.message ||
          responseData?.error ||
          `Submission failed with status ${response.status}. Raw: ${responseText}`;
        throw new Error(errorMessage);
      }

      alert(
        `Blog post ${finalStatus === "Published" ? "published" : "saved as draft"} successfully!`
      );
      setFormData(initialFormData);
      fetchExistingPosts(); // Refresh the list of posts
    } catch (error) {
      console.error("Submission error details:", error);
      alert(
        `Failed to ${finalStatus === "Published" ? "publish" : "save draft"}. ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
      setSubmissionType(null);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    ) {
      return;
    }
    setDeletingPostId(postId);
    try {
      const response = await fetch(`${BASE_URL}/blogs/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `Failed to delete post: ${response.status}`,
        }));
        throw new Error(
          errorData.message || `Failed to delete post: ${response.status}`
        );
      }
      alert("Blog post deleted successfully.");
      fetchExistingPosts(); // Refresh the list
    } catch (err) {
      console.error("Error deleting post:", err);
      alert(
        `Failed to delete post. ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setDeletingPostId(null);
    }
  };

  // --- ANIMATION VARIANTS ---
  const formSectionVariants = {
    /* ... (same as before) ... */
  };
  const formItemVariants = {
    /* ... (same as before) ... */
  };
  const listAnimationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const listItemAnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-8 md:py-12 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl px-2 sm:px-4">
        {/* Header and Back Link (same as before) */}
        <motion.div /* ... */>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-center sm:text-left">
            Create & Manage Blog Posts
          </h1>
          <Link
            to="/admin/dashboard" // Assuming a general admin dashboard
            className="inline-flex items-center text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors py-1.5 px-3 rounded-md hover:bg-slate-700/50"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Form (same structure as before) */}
        <form
          onSubmit={(e) => handleSubmitForm(e, formData.status === "published")}
          className="space-y-6 md:space-y-8 mb-16"
        >
          {/* ... (Your entire form JSX goes here, unchanged) ... */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="lg:col-span-2 space-y-5 p-5 md:p-6 bg-slate-800/60 rounded-xl shadow-2xl border border-slate-700/80"
              // variants={formSectionVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Title, Slug, Excerpt, Main Content */}
              <motion.div>
                <label
                  htmlFor="title"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                >
                  Title <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Type
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                    placeholder="Enter blog title"
                  />
                </div>
              </motion.div>

              <motion.div>
                <label
                  htmlFor="slug"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                >
                  Slug (URL)
                </label>
                <div className="relative">
                  <Globe
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                    placeholder="auto-generated-slug"
                  />
                </div>
              </motion.div>

              <motion.div>
                <label
                  htmlFor="excerpt"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                >
                  Excerpt/Summary
                </label>
                <div className="relative">
                  <AlignLeft
                    size={16}
                    className="absolute left-3.5 top-3.5 text-gray-500 pointer-events-none"
                  />
                  <textarea
                    name="excerpt"
                    id="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-y min-h-[80px]"
                    placeholder="Short summary of the blog post..."
                  />
                </div>
              </motion.div>

              <motion.div>
                <label
                  htmlFor="content"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                >
                  Main Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="content"
                  id="content"
                  required
                  rows={18}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-y min-h-[300px]"
                  placeholder="Write your blog post here..."
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-1 space-y-5" // Reduced space-y for tighter sidebar
              // variants={formSectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }} // Slight delay for sidebar animation
            >
              <motion.div
                // variants={formItemVariants}
                className="p-5 bg-slate-800/60 rounded-xl shadow-2xl border border-slate-700/80"
              >
                <h3 className="text-md sm:text-lg font-semibold text-white mb-3.5">
                  Actions
                </h3>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    type="button"
                    disabled={isSubmitting && submissionType === "draft"}
                    onClick={(e) => handleSubmitForm(e, false)}
                    className="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-slate-600 text-xs sm:text-sm font-medium rounded-md text-gray-200 bg-slate-700 hover:bg-slate-600/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-60 transition-colors"
                  >
                    {isSubmitting && submissionType === "draft" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    {isSubmitting && submissionType === "draft"
                      ? "Saving..."
                      : "Save Draft"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmitForm(e, true)}
                    disabled={isSubmitting && submissionType === "publish"}
                    className="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-60 transition-all"
                  >
                    {isSubmitting && submissionType === "publish" ? (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Send size={16} className="mr-2" />
                    )}
                    {isSubmitting && submissionType === "publish"
                      ? "Publishing..."
                      : "Publish"}
                  </button>
                </div>
              </motion.div>

              <motion.div
                // variants={formItemVariants}
                className="p-5 bg-slate-800/60 rounded-xl shadow-2xl border border-slate-700/80"
              >
                <label
                  htmlFor="featuredImage-upload"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 cursor-pointer"
                >
                  Featured Image
                </label>
                <div
                  className={cn(
                    "mt-1 flex justify-center items-center px-6 py-8 border-2 border-slate-600 border-dashed rounded-lg hover:border-cyan-500/80 transition-colors cursor-pointer",
                    formData.featuredImageUrlPreview && "p-2 border-solid"
                  )}
                >
                  <div className="space-y-1 text-center">
                    {formData.featuredImageUrlPreview ? (
                      <img
                        src={formData.featuredImageUrlPreview}
                        alt="Preview"
                        className="mx-auto max-h-40 w-auto object-contain rounded-md mb-2 pointer-events-none"
                      />
                    ) : (
                      <UploadCloud
                        size={32}
                        className="mx-auto text-gray-500 mb-1 pointer-events-none"
                      />
                    )}
                    <div className="flex text-xs text-gray-400 justify-center">
                      <label
                        htmlFor="featuredImage-upload"
                        className="relative cursor-pointer bg-slate-600/70 rounded-md font-medium text-cyan-300 hover:text-cyan-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-cyan-500 px-2.5 py-1 transition-colors"
                      >
                        <span>
                          {formData.featuredImageUrlPreview
                            ? "Change file"
                            : "Upload a file"}
                        </span>
                        <input
                          id="featuredImage-upload"
                          name="featuredImage"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/png, image/jpeg, image/gif, image/webp"
                        />
                      </label>
                    </div>
                    {!formData.featuredImageUrlPreview && (
                      <p className="text-[10px] text-gray-500 mt-1 pointer-events-none">
                        PNG, JPG, GIF, WEBP up to 2MB
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                // variants={formItemVariants}
                className="p-5 bg-slate-800/60 rounded-xl shadow-2xl border border-slate-700/80"
              >
                <h3 className="text-md sm:text-lg font-semibold text-white mb-3.5">
                  Details
                </h3>
                <div className="space-y-3.5">
                  {" "}
                  {/* Added space-y for consistency */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                    >
                      Category <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Layers
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                      <select
                        name="category"
                        id="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                      >
                        <option value="">Select a category</option>
                        {blogCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                    >
                      Tags (comma-separated)
                    </label>
                    <div className="relative">
                      <Tag
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                        placeholder="e.g., webdev, react"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="author"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                    >
                      Author
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                      <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="publishDate"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                    >
                      Publish Date
                    </label>
                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events.none"
                      />
                      <input
                        type="date"
                        name="publishDate"
                        id="publishDate"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.details
                // variants={formItemVariants}
                className="group bg-slate-800/60 rounded-xl shadow-2xl border border-slate-700/80 overflow-hidden"
              >
                <summary className="flex justify-between items-center p-5 cursor-pointer text-md sm:text-lg font-semibold text-white hover:bg-slate-700/40 transition-colors">
                  SEO Settings
                  <Settings
                    size={18}
                    className="text-gray-400 group-open:rotate-90 transition-transform duration-300"
                  />
                </summary>
                <div className="p-5 border-t border-slate-700 space-y-3.5">
                  <div>
                    <label
                      htmlFor="metaTitle"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                    >
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                      placeholder="Optimal title for search engines"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="metaDescription"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5"
                    >
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      id="metaDescription"
                      rows={3}
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/60 border border-slate-600 text-gray-100 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-y min-h-[80px]"
                      placeholder="Short description for search results (approx. 160 chars)"
                    />
                  </div>
                </div>
              </motion.details>
            </motion.div>
          </div>
        </form>

        {/* Section for Existing Blog Posts */}
        <motion.div
          className="mt-12 md:mt-16 pt-8 border-t border-slate-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 mb-6">
            Manage Existing Posts
          </h2>
          {isLoadingPosts && (
            <div className="flex justify-center items-center py-10">
              <Loader2 size={32} className="animate-spin text-cyan-400 mr-3" />
              <span className="text-gray-400">Loading posts...</span>
            </div>
          )}
          {postsError && (
            <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
              <AlertTriangle size={24} className="inline mr-2" /> Error loading
              posts: {postsError}
            </div>
          )}
          {!isLoadingPosts && !postsError && existingPosts.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No blog posts found.
            </p>
          )}
          {!isLoadingPosts && !postsError && existingPosts.length > 0 && (
            <motion.div
              className="space-y-4"
              variants={listAnimationVariants}
              initial="hidden"
              animate="visible"
            >
              {existingPosts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={listItemAnimationVariants}
                  className="bg-slate-800/50 p-4 rounded-lg shadow-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-white group-hover:text-cyan-300 transition-colors">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      <span>
                        Category:{" "}
                        <span className="text-cyan-400">{post.category}</span>
                      </span>
                      <span>
                        Status:{" "}
                        <span
                          className={
                            post.status === "Published"
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }
                        >
                          {post.status}
                        </span>
                      </span>
                      <span>
                        Published:{" "}
                        <span className="text-gray-300">
                          {formatDateDisplay(post.publishDate)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                    {/* Optional Edit Button */}
                    {/* <button
                        onClick={() => navigate(`/admin/blog/edit/${post.slug}`)} // Assuming an edit route
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-md hover:bg-slate-700/70"
                        title="Edit Post"
                    >
                        <Edit3 size={18} />
                    </button> */}
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      disabled={deletingPostId === post._id}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors rounded-md hover:bg-slate-700/70 disabled:opacity-50"
                      title="Delete Post"
                    >
                      {deletingPostId === post._id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateBlogPage;
