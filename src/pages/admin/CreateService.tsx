import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  UploadCloud,
  Loader2,
  Save,
  Layers,
  ArrowLeft,
  ImagePlus,
  Info,
  Type as TypeIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText as DescriptionIcon,
  RefreshCw,
  ListChecks,
  Edit3,
  XCircle, // New Icon for Cancel
} from "lucide-react";
import { Link } from "react-router-dom"; // useNavigate is no longer needed here
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

// --- INTERFACES (No changes here) ---
interface SubServiceFormData {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: File | null;
  imageUrlPreview: string | null;
  imagePublicId?: string; // Add this to track existing image IDs for updates
}

interface ServiceCategoryFormData {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  mainImage: File | null;
  mainImagePreview: string | null;
  mainImagePublicId?: string; // Add this
  subServices: SubServiceFormData[];
  isActive: boolean;
}

interface FetchedSubService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string;
}

interface FetchedServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  mainImagePublicId?: string;
  subServices: FetchedSubService[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const createSubService = (): SubServiceFormData => ({
  id: crypto.randomUUID(),
  name: "",
  slug: "",
  description: "",
  imageUrl: null,
  imageUrlPreview: null,
});

const initialServiceFormData: ServiceCategoryFormData = {
  name: "",
  slug: "",
  description: "",
  mainImage: null,
  mainImagePreview: null,
  subServices: [],
  isActive: true,
};

// --- API URLs ---
const SERVICES_API_BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";
const CREATE_SERVICE_URL = `${SERVICES_API_BASE_URL}/create`;
const FIND_SERVICES_URL = `${SERVICES_API_BASE_URL}/find`;
// Add UPDATE URL
const UPDATE_SERVICE_URL = (id: string) => `${SERVICES_API_BASE_URL}/${id}`;
const DELETE_SERVICE_URL = (id: string) => `${SERVICES_API_BASE_URL}/${id}`;

const AdminManageServicesPage: React.FC = () => {
  const [formData, setFormData] = useState<ServiceCategoryFormData>(
    initialServiceFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [fetchedServices, setFetchedServices] = useState<
    FetchedServiceCategory[]
  >([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [fetchServicesError, setFetchServicesError] = useState<string | null>(
    null
  );
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
    null
  );

  // --- NEW STATE FOR EDIT MODE ---
  const [isEditMode, setIsEditMode] = useState(false);
  const formRef = useRef<HTMLDivElement>(null); // To scroll to the form

  const fetchAllServices = useCallback(async () => {
    // ... (Your fetchAllServices function is good, no changes needed here)
    setIsLoadingServices(true);
    setFetchServicesError(null);
    try {
      const response = await fetch(FIND_SERVICES_URL);
      const contentType = response.headers.get("content-type");
      if (
        !response.ok ||
        !contentType ||
        !contentType.includes("application/json")
      ) {
        const errorText = await response.text();
        throw new Error(
          `Error ${response.status}: ${errorText || response.statusText}`
        );
      }
      const data = await response.json();
      setFetchedServices(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setFetchServicesError(errorMessage);
      console.error("Fetch services error:", err);
      setFetchedServices([]);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  // --- HELPER & HANDLER FUNCTIONS (generateSlug, inputs, etc. are good) ---
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/ & /g, "-and-")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleMainInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormError(null);
    setFormSuccess(null);
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => {
        const newState = { ...prev, [name]: value };
        if (
          name === "name" &&
          (!prev.slug || prev.slug === generateSlug(prev.name))
        ) {
          newState.slug = generateSlug(value);
        }
        return newState;
      });
    }
  };

  const handleMainImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // ... (Your file change handlers are good, no changes)
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          mainImage: file,
          mainImagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubServiceInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // ... (No changes here)
    const { name, value } = e.target;
    const updatedSubServices = formData.subServices.map((sub, i) => {
      if (i === index) {
        const newSub = { ...sub, [name]: value };
        if (
          name === "name" &&
          (!sub.slug || sub.slug === generateSlug(sub.name))
        ) {
          newSub.slug = generateSlug(value);
        }
        return newSub;
      }
      return sub;
    });
    setFormData((prev) => ({ ...prev, subServices: updatedSubServices }));
  };

  const handleSubServiceImageChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // ... (No changes here)
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSubServices = [...formData.subServices];
        updatedSubServices[index] = {
          ...updatedSubServices[index],
          imageUrl: file,
          imageUrlPreview: reader.result as string,
        };
        setFormData((prev) => ({ ...prev, subServices: updatedSubServices }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSubService = () => {
    // ... (No changes here)
    setFormData((prev) => ({
      ...prev,
      subServices: [...prev.subServices, createSubService()],
    }));
  };

  const removeSubService = (index: number) => {
    // ... (No changes here)
    setFormData((prev) => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index),
    }));
  };

  // --- NEW: Function to handle edit button click ---
  const handleEditService = (serviceId: string) => {
    const serviceToEdit = fetchedServices.find((s) => s._id === serviceId);
    if (serviceToEdit) {
      setFormData({
        _id: serviceToEdit._id,
        name: serviceToEdit.name,
        slug: serviceToEdit.slug,
        description: serviceToEdit.description,
        isActive: serviceToEdit.isActive,
        mainImage: null, // File is reset
        mainImagePreview: serviceToEdit.mainImage, // Show existing image
        mainImagePublicId: serviceToEdit.mainImagePublicId,
        subServices: serviceToEdit.subServices.map((sub) => ({
          id: sub._id, // Use _id as the React key
          _id: sub._id,
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          imageUrl: null, // File is reset
          imageUrlPreview: sub.imageUrl, // Show existing image
          imagePublicId: sub.imagePublicId,
        })),
      });
      setIsEditMode(true);
      formRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to form
      setFormSuccess(null);
      setFormError(null);
    }
  };

  // --- NEW: Function to cancel editing ---
  const cancelEditMode = () => {
    setIsEditMode(false);
    setFormData(initialServiceFormData);
    setFormError(null);
    setFormSuccess(null);
  };

  // --- MODIFIED: handleSubmit to handle both Create and Update ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Validation
    if (!formData.name || !formData.slug || !formData.description) {
      setFormError("Please fill all required main service fields.");
      return;
    }
    // Main image is only required for CREATE mode
    if (!isEditMode && !formData.mainImage) {
      setFormError("A main image is required when creating a new service.");
      return;
    }

    setIsSubmitting(true);
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("slug", formData.slug);
    payload.append("description", formData.description);
    payload.append("isActive", String(formData.isActive));

    // Only append main image if a new one was selected
    if (formData.mainImage) {
      payload.append("mainImage", formData.mainImage);
    }

    // For updates, we need to send the full sub-service data
    const subServicesMetadata = formData.subServices.map((sub) => ({
      _id: sub._id,
      name: sub.name,
      slug: sub.slug,
      description: sub.description,
      // If no new image file, send back the old URL to keep it.
      // If a new image is uploaded, this will be undefined, which is fine.
      imageUrl: sub.imageUrl ? undefined : sub.imageUrlPreview,
      imagePublicId: sub.imagePublicId,
    }));
    payload.append("subServicesData", JSON.stringify(subServicesMetadata));

    formData.subServices.forEach((sub, index) => {
      // Only append if a new file was selected
      if (sub.imageUrl) {
        payload.append(`subServiceImage_${index}`, sub.imageUrl);
      }
    });

    const url =
      isEditMode && formData._id
        ? UPDATE_SERVICE_URL(formData._id)
        : CREATE_SERVICE_URL;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, { method, body: payload });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            `Server error ${response.status}`
        );
      }

      setFormSuccess(
        `Service ${isEditMode ? "updated" : "created"} successfully!`
      );
      // Reset form and exit edit mode
      cancelEditMode();
      fetchAllServices();
      setTimeout(() => setFormSuccess(null), 5000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Submission error.";
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    setDeletingServiceId(serviceId);
    try {
      const response = await fetch(DELETE_SERVICE_URL(serviceId), {
        method: "DELETE",
      });
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Failed to delete.");
      setFormSuccess(responseData.message || "Service deleted successfully!");
      fetchAllServices();
      // If deleting the service being edited, cancel edit mode
      if (isEditMode && formData._id === serviceId) {
        cancelEditMode();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Deletion error.";
      setFormError(errorMessage);
    } finally {
      setDeletingServiceId(null);
    }
  };

  // --- STYLING & VARIANTS ---
  const pageContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  const sectionCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" },
    },
  };
  const formFieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  const inputBaseClasses =
    "block w-full rounded-md border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 shadow-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 sm:text-sm";
  const formLabelClasses = "block text-sm font-medium text-slate-300 mb-1";
  const formLabelSmClasses = "block text-xs font-medium text-slate-300 mb-0.5";
  const inputIconClasses =
    "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none";
  const inputIconSmClasses =
    "absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none";

  // DYNAMIC button classes
  const formSubmitButtonClasses = (isEdit: boolean) =>
    cn(
      "inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-60 transition-all",
      isEdit
        ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 focus:ring-yellow-500"
        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:ring-emerald-500"
    );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-slate-100 py-8 md:py-12 px-4"
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div className="mb-10 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500 mb-2 sm:mb-0">
            Manage Services
          </h1>
          <Link
            to="/admin"
            className="group inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft
              size={16}
              className="mr-1.5 group-hover:-translate-x-0.5 transition-transform"
            />{" "}
            Back to Admin
          </Link>
        </motion.div>

        {/* --- DYNAMIC FORM SECTION --- */}
        <motion.div
          className="mb-12 p-6 md:p-8 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700"
          variants={sectionCardVariants}
          ref={formRef} // Attach ref here
        >
          <div className="flex items-center justify-between border-b border-slate-600 pb-4 mb-6">
            <div className="flex items-center">
              {isEditMode ? (
                <Edit3 size={24} className="text-yellow-400 mr-3.5" />
              ) : (
                <PlusCircle size={24} className="text-emerald-400 mr-3.5" />
              )}
              <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">
                {isEditMode
                  ? `Editing: ${formData.name || "Service"}`
                  : "Create New Service"}
              </h2>
            </div>
            {isEditMode && (
              <button
                type="button"
                onClick={cancelEditMode}
                className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
              >
                <XCircle size={16} className="mr-1.5" /> Cancel Edit
              </button>
            )}
          </div>
          <motion.form onSubmit={handleSubmit} className="space-y-10">
            {/* The rest of the form is the same, it just uses the dynamic formData */}

            {/* Main Category Details */}
            <motion.div
              variants={formFieldVariants}
              className="p-6 md:p-8 bg-slate-700/60 rounded-xl shadow-lg border border-slate-600 space-y-6"
            >
              <div className="flex items-center border-b border-slate-600 pb-3 mb-6">
                <Layers size={22} className="text-cyan-400 mr-3" />
                <h3 className="text-xl font-semibold text-slate-100 tracking-tight">
                  Main Category Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* ... name and slug inputs ... */}
                <div>
                  <label htmlFor="name" className={formLabelClasses}>
                    Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <TypeIcon size={16} className={inputIconClasses} />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleMainInputChange}
                      required
                      className={cn(inputBaseClasses, "pl-10")}
                      placeholder="e.g., Web Development"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="slug" className={formLabelClasses}>
                    Slug <span className="text-red-400">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <LinkIcon size={16} className={inputIconClasses} />
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      value={formData.slug}
                      onChange={handleMainInputChange}
                      required
                      className={cn(inputBaseClasses, "pl-10")}
                      placeholder="e.g., web-development"
                    />
                  </div>
                </div>
              </div>
              <div>
                {/* ... description textarea ... */}
                <label htmlFor="description" className={formLabelClasses}>
                  Description <span className="text-red-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <DescriptionIcon
                    size={16}
                    className={`${inputIconClasses} top-3.5`}
                  />
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleMainInputChange}
                    required
                    rows={4}
                    className={cn(
                      inputBaseClasses,
                      "pl-10 min-h-[100px] py-2.5"
                    )}
                    placeholder="Detailed description..."
                  ></textarea>
                </div>
              </div>
            </motion.div>

            {/* Main Preview Image */}
            <motion.div
              variants={formFieldVariants}
              className="p-6 md:p-8 bg-slate-700/60 rounded-xl shadow-lg border border-slate-600 space-y-4"
            >
              <div className="flex items-center border-b border-slate-600 pb-3 mb-4">
                <ImageIcon size={20} className="text-cyan-400 mr-3" />
                <h3 className="text-xl font-semibold text-slate-100 tracking-tight">
                  Main Preview Image
                </h3>
              </div>
              <label
                htmlFor="mainImage-upload-btn"
                className={formLabelClasses}
              >
                Upload Image{" "}
                {!isEditMode && <span className="text-red-400">*</span>}
              </label>
              {/* ... image upload UI (no changes needed) ... */}
              <div
                className={cn(
                  "mt-1.5 flex flex-col justify-center items-center px-6 border-2 border-slate-600 border-dashed rounded-lg hover:border-cyan-500 transition-colors",
                  formData.mainImagePreview
                    ? "py-3 border-solid bg-slate-700/20"
                    : "py-10 bg-slate-700/40"
                )}
              >
                {formData.mainImagePreview ? (
                  <img
                    src={formData.mainImagePreview}
                    alt="Main Preview"
                    className="max-h-48 w-auto object-contain rounded-md mb-4 shadow-md"
                  />
                ) : (
                  <UploadCloud
                    size={40}
                    className="mx-auto text-slate-500 mb-2"
                  />
                )}
                <div className="flex text-sm text-gray-400 justify-center">
                  <label
                    htmlFor="mainImage-upload-btn"
                    className="relative cursor-pointer bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-md font-medium text-white focus-within:outline-none px-5 py-2.5 text-xs transition-all shadow-sm hover:shadow-md"
                  >
                    <span>
                      {formData.mainImagePreview
                        ? "Change Image"
                        : "Select an Image"}
                    </span>
                    <input
                      id="mainImage-upload-btn"
                      name="mainImage"
                      type="file"
                      className="sr-only"
                      onChange={handleMainImageFileChange}
                      accept="image/png, image/jpeg, image/gif, image/webp"
                    />
                  </label>
                </div>
                {!formData.mainImagePreview && (
                  <p className="text-xs text-slate-400 mt-2">
                    PNG, JPG, GIF, WEBP up to 2MB
                  </p>
                )}
              </div>
            </motion.div>

            {/* Is Active Checkbox */}
            <motion.div variants={formFieldVariants}>
              <label className="flex items-center text-sm font-medium text-slate-200 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleMainInputChange}
                  className="h-4 w-4 text-cyan-500 border-slate-500 rounded focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 mr-2.5 bg-slate-700"
                />{" "}
                Active (Visible on website)
              </label>
            </motion.div>

            {/* Sub-Services (no changes needed in this block) */}
            <motion.div
              variants={formFieldVariants}
              className="p-6 md:p-8 bg-slate-700/60 rounded-xl shadow-lg border border-slate-600 space-y-6"
            >
              <div className="flex items-center border-b border-slate-600 pb-3 mb-5">
                <Layers size={20} className="text-cyan-400 mr-3" />
                <h3 className="text-xl font-semibold text-slate-100 tracking-tight">
                  Sub-Services / Key Offerings
                </h3>
              </div>
              <AnimatePresence>
                {(formData.subServices || []).map((sub, index) => (
                  <motion.div
                    key={sub.id}
                    className="p-4 md:p-5 bg-slate-600/60 rounded-lg border border-slate-500/80 space-y-4 relative"
                    variants={formFieldVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      height: 0,
                      margin: 0,
                      padding: 0,
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    layout
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-semibold text-slate-100">
                        Sub-Service #{index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeSubService(index)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-500/70 rounded-md transition-colors"
                        title="Remove Sub-Service"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {/* ... sub-service fields ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor={`sub-name-${index}`}
                          className={formLabelSmClasses}
                        >
                          Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative mt-1">
                          <TypeIcon size={14} className={inputIconSmClasses} />
                          <input
                            type="text"
                            name="name"
                            id={`sub-name-${index}`}
                            value={sub.name}
                            onChange={(e) =>
                              handleSubServiceInputChange(index, e)
                            }
                            required
                            className={cn(
                              inputBaseClasses,
                              "pl-9 text-sm py-2"
                            )}
                            placeholder="e.g., UI/UX Design"
                          />
                        </div>
                      </div>
                      {/* Slug */}
                      <div>
                        <label
                          htmlFor={`sub-slug-${index}`}
                          className={formLabelSmClasses}
                        >
                          Slug <span className="text-red-400">*</span>
                        </label>
                        <div className="relative mt-1">
                          <LinkIcon size={14} className={inputIconSmClasses} />
                          <input
                            type="text"
                            name="slug"
                            id={`sub-slug-${index}`}
                            value={sub.slug}
                            onChange={(e) =>
                              handleSubServiceInputChange(index, e)
                            }
                            required
                            className={cn(
                              inputBaseClasses,
                              "pl-9 text-sm py-2"
                            )}
                            placeholder="e.g., ui-ux-design"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <div>
                      <label
                        htmlFor={`sub-description-${index}`}
                        className={formLabelSmClasses}
                      >
                        Description <span className="text-red-400">*</span>
                      </label>
                      <div className="relative mt-1">
                        <DescriptionIcon
                          size={14}
                          className={`${inputIconSmClasses} top-2.5`}
                        />
                        <textarea
                          name="description"
                          id={`sub-description-${index}`}
                          value={sub.description}
                          onChange={(e) =>
                            handleSubServiceInputChange(index, e)
                          }
                          required
                          rows={3}
                          className={cn(
                            inputBaseClasses,
                            "pl-9 min-h-[70px] text-sm py-2"
                          )}
                          placeholder="Short description..."
                        ></textarea>
                      </div>
                    </div>
                    {/* Image */}
                    <div>
                      <label className={formLabelSmClasses}>
                        Image{" "}
                        <span className="text-xs text-slate-400">
                          (Optional, max 1MB)
                        </span>
                      </label>
                      <div
                        className={cn(
                          "mt-1 flex items-center gap-3 p-2 border-2 border-slate-600 border-dashed rounded-md hover:border-cyan-600/70",
                          sub.imageUrlPreview && "border-solid bg-slate-600/20"
                        )}
                      >
                        {sub.imageUrlPreview ? (
                          <img
                            src={sub.imageUrlPreview}
                            alt={`Sub-service ${index + 1} Preview`}
                            className="h-16 w-16 object-cover rounded shadow"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-slate-700/40 rounded flex items-center justify-center border border-slate-600">
                            <ImagePlus size={24} className="text-slate-500" />
                          </div>
                        )}
                        <label
                          htmlFor={`sub-image-upload-${index}`}
                          className="relative cursor-pointer bg-slate-600 hover:bg-slate-500 rounded-md font-medium text-white text-xs px-3.5 py-2 transition-colors shadow-sm"
                        >
                          <span>
                            {sub.imageUrlPreview
                              ? "Change Image"
                              : "Upload Image"}
                          </span>
                          <input
                            id={`sub-image-upload-${index}`}
                            name={`subServiceImage_${index}`}
                            type="file"
                            className="sr-only"
                            onChange={(e) =>
                              handleSubServiceImageChange(index, e)
                            }
                            accept="image/png, image/jpeg, image/gif, image/webp"
                          />
                        </label>
                        {sub.imageUrlPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              const s = [...formData.subServices];
                              if (s[index]) {
                                s[index] = {
                                  ...s[index],
                                  imageUrl: null,
                                  imageUrlPreview: null,
                                };
                              }
                              setFormData((prev) => ({
                                ...prev,
                                subServices: s,
                              }));
                              const fileInput = document.getElementById(
                                `sub-image-upload-${index}`
                              ) as HTMLInputElement;
                              if (fileInput) fileInput.value = "";
                            }}
                            className="text-xs text-slate-400 hover:text-red-400 ml-auto px-2 py-1 hover:bg-slate-600/50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={addSubService}
                className="mt-4 inline-flex items-center px-4 py-2.5 border border-dashed border-cyan-700 hover:border-cyan-500 text-xs font-medium rounded-lg text-cyan-300 hover:text-cyan-100 hover:bg-cyan-700/20 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <PlusCircle size={16} className="mr-2" />
                Add Sub-Service
              </button>
            </motion.div>

            {/* ... Form Error/Success Display ... */}
            {(formError || formSuccess) && (
              <motion.div
                variants={formFieldVariants}
                className={cn(
                  "my-4 p-3.5 rounded-lg text-sm flex items-center gap-2.5 shadow",
                  formError
                    ? "bg-red-600/20 border border-red-500/40 text-red-300"
                    : "bg-green-600/20 border border-green-500/40 text-green-300"
                )}
              >
                {formError && <AlertTriangle size={18} />}{" "}
                {formSuccess && <Info size={18} />} {formError || formSuccess}
              </motion.div>
            )}

            {/* DYNAMIC SUBMIT BUTTON */}
            <motion.div
              variants={formFieldVariants}
              className="pt-6 border-t border-slate-600 flex justify-end"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={formSubmitButtonClasses(isEditMode)}
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="mr-2.5 animate-spin" />
                ) : (
                  <Save size={20} className="mr-2.5" />
                )}
                {isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Saving..."
                  : isEditMode
                    ? "Update Service"
                    : "Create Service"}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Existing Services List Section (no changes needed here) */}
        <motion.div
          className="p-6 md:p-8 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700"
          variants={sectionCardVariants}
        >
          {/* ... list header ... */}
          <div className="flex items-center justify-between border-b border-slate-600 pb-4 mb-6">
            <div className="flex items-center">
              <ListChecks size={24} className="text-sky-400 mr-3.5" />
              <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">
                Existing Services
              </h2>
            </div>
            <button
              onClick={fetchAllServices}
              disabled={isLoadingServices}
              className="p-2 text-sky-400 hover:text-sky-300 hover:bg-slate-700 rounded-md transition-colors disabled:opacity-50"
              title="Refresh List"
            >
              {isLoadingServices ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <RefreshCw size={20} />
              )}
            </button>
          </div>
          {/* ... loading/error/empty states ... */}
          {isLoadingServices && fetchedServices.length === 0 && (
            <div className="flex justify-center items-center py-10">
              <Loader2 size={32} className="animate-spin text-cyan-400" />
              <p className="ml-3 text-slate-300">Loading services...</p>
            </div>
          )}
          {fetchServicesError && (
            <div className="my-4 p-3.5 rounded-lg text-sm flex items-center gap-2.5 shadow bg-red-600/20 border border-red-500/40 text-red-300">
              <AlertTriangle size={18} /> {fetchServicesError}
            </div>
          )}
          {!isLoadingServices &&
            !fetchServicesError &&
            fetchedServices.length === 0 && (
              <p className="text-center text-slate-400 py-8">
                No services found. Start by creating one above!
              </p>
            )}

          {/* ... service list mapping ... */}
          {!fetchServicesError && fetchedServices.length > 0 && (
            <div className="space-y-4">
              {fetchedServices.map((service) => (
                <motion.div
                  key={service._id}
                  variants={formFieldVariants}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-700/60 rounded-lg border border-slate-600 hover:border-cyan-500/70 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <div className="flex-grow mb-3 sm:mb-0 pr-4">
                    <h3 className="text-lg font-semibold text-cyan-300">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Slug: {service.slug}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Sub-services: {service.subServices.length}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-1 font-medium",
                        service.isActive ? "text-green-400" : "text-yellow-400"
                      )}
                    >
                      Status: {service.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 self-start sm:self-center">
                    <button
                      onClick={() => handleEditService(service._id)}
                      className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-slate-600/70 rounded-md transition-colors"
                      title="Edit Service"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      disabled={deletingServiceId === service._id}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md transition-colors disabled:opacity-50"
                      title="Delete Service"
                    >
                      {deletingServiceId === service._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// If you renamed the file, change the export name too.
// export default AdminCreateServicePage;
export default AdminManageServicesPage;
