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
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

// --- INTERFACES ---
interface SubServiceFormData {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: File | null;
  imageUrlPreview: string | null;
}

interface ServiceCategoryFormData {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  mainImage: File | null;
  mainImagePreview: string | null;
  subServices: SubServiceFormData[];
  isActive: boolean;
}

interface FetchedSubService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string; // This is a relative path like 'uploads/...'
}

interface FetchedServiceCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string; // This is a relative path like 'uploads/...'
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
const API_BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";
const SERVICES_API_BASE_URL = `${API_BASE_URL}/services`;

const CREATE_SERVICE_URL = `${SERVICES_API_BASE_URL}/create`;
const FIND_SERVICES_URL = `${SERVICES_API_BASE_URL}/find`;
const UPDATE_SERVICE_URL = (id: string) => `${SERVICES_API_BASE_URL}/${id}`;
const DELETE_SERVICE_URL = (id: string) => `${SERVICES_API_BASE_URL}/${id}`;

const AdminManageServicesPage: React.FC = () => {
  const [formData, setFormData] = useState<ServiceCategoryFormData>(initialServiceFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [fetchedServices, setFetchedServices] = useState<FetchedServiceCategory[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [fetchServicesError, setFetchServicesError] = useState<string | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const fetchAllServices = useCallback(async () => {
    setIsLoadingServices(true);
    setFetchServicesError(null);
    try {
      const response = await fetch(FIND_SERVICES_URL);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP Error: ${response.status}`}));
        throw new Error(errorData.message || 'Failed to fetch services.');
      }
      const data = await response.json();
      setFetchedServices(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setFetchServicesError(errorMessage);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  const generateSlug = (text: string): string => text.toLowerCase().trim().replace(/ & /g, "-and-").replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleMainInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormError(null); setFormSuccess(null);
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => {
        const newState = { ...prev, [name]: value };
        if (name === "name" && (!prev.slug || prev.slug === generateSlug(prev.name))) {
          newState.slug = generateSlug(value);
        }
        return newState;
      });
    }
  };

  const handleFileChange = (file: File | null, field: 'mainImage' | `subServiceImage_${number}`, index?: number) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (field === 'mainImage') {
        setFormData(prev => ({ ...prev, mainImage: file, mainImagePreview: result }));
      } else if (typeof index === 'number') {
        const updatedSubServices = [...formData.subServices];
        updatedSubServices[index] = { ...updatedSubServices[index], imageUrl: file, imageUrlPreview: result };
        setFormData(prev => ({ ...prev, subServices: updatedSubServices }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addSubService = () => setFormData(prev => ({...prev, subServices: [...prev.subServices, createSubService()] }));
  const removeSubService = (index: number) => setFormData(prev => ({...prev, subServices: prev.subServices.filter((_, i) => i !== index) }));

  // --- THIS FUNCTION IS NOW CORRECTED ---
  const handleEditService = (serviceId: string) => {
    const serviceToEdit = fetchedServices.find((s) => s._id === serviceId);
    if (serviceToEdit) {
      setFormData({
        _id: serviceToEdit._id,
        name: serviceToEdit.name,
        slug: serviceToEdit.slug,
        description: serviceToEdit.description,
        isActive: serviceToEdit.isActive,
        mainImage: null,
        // Correctly construct the full URL for the preview
        mainImagePreview: `${API_BASE_URL}/${serviceToEdit.mainImage}`,
        subServices: serviceToEdit.subServices.map((sub) => ({
          id: sub._id,
          _id: sub._id,
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          imageUrl: null,
          // Correctly construct the full URL for sub-service previews
          imageUrlPreview: sub.imageUrl ? `${API_BASE_URL}/${sub.imageUrl}` : null,
        })),
      });
      setIsEditMode(true);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      setFormSuccess(null);
      setFormError(null);
    }
  };

  const cancelEditMode = () => {
    setIsEditMode(false);
    setFormData(initialServiceFormData);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    if (!formData.name || !formData.slug || !formData.description) return setFormError("Please fill all required main service fields.");
    if (!isEditMode && !formData.mainImage) return setFormError("A main image is required when creating a new service.");

    setIsSubmitting(true);
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("slug", formData.slug);
    payload.append("description", formData.description);
    payload.append("isActive", String(formData.isActive));
    if (formData.mainImage) payload.append("mainImage", formData.mainImage);

    const subServicesMetadata = formData.subServices.map(sub => ({
      _id: sub._id,
      name: sub.name,
      slug: sub.slug,
      description: sub.description,
      imageUrl: sub.imageUrl ? undefined : sub.imageUrlPreview?.replace(`${API_BASE_URL}/`, '') || null,
    }));
    payload.append("subServicesData", JSON.stringify(subServicesMetadata));
    formData.subServices.forEach((sub, index) => { if (sub.imageUrl) payload.append(`subServiceImage_${index}`, sub.imageUrl); });

    const url = isEditMode && formData._id ? UPDATE_SERVICE_URL(formData._id) : CREATE_SERVICE_URL;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, { method, body: payload });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.error || responseData.message || `Server error ${response.status}`);
      
      setFormSuccess(`Service ${isEditMode ? "updated" : "created"} successfully!`);
      cancelEditMode();
      fetchAllServices();
      setTimeout(() => setFormSuccess(null), 5000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Submission error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    setDeletingServiceId(serviceId);
    try {
      const response = await fetch(DELETE_SERVICE_URL(serviceId), { method: "DELETE" });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Failed to delete.");
      
      setFormSuccess(responseData.message || "Service deleted successfully!");
      fetchAllServices();
      if (isEditMode && formData._id === serviceId) cancelEditMode();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Deletion error.");
    } finally {
      setDeletingServiceId(null);
    }
  };

  // --- STYLING & JSX --- (No changes needed in the return block)
  const formSubmitButtonClasses = (isEdit: boolean) => cn("...", isEdit ? "..." : "...");

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-slate-100 py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* ... Header JSX ... */}
        <motion.div className="mb-10 flex flex-col sm:flex-row justify-between items-center">
            {/* ... */}
        </motion.div>
        
        {/* --- DYNAMIC FORM SECTION --- */}
        <motion.div ref={formRef} className="mb-12 p-6 md:p-8 bg-slate-800/70 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between border-b border-slate-600 pb-4 mb-6">
            <div className="flex items-center">
              {isEditMode ? <Edit3/> : <PlusCircle/>}
              <h2 className="text-2xl font-semibold ml-3.5">{isEditMode ? `Editing: ${formData.name || "Service"}`: "Create New Service"}</h2>
            </div>
            {isEditMode && <button onClick={cancelEditMode}><XCircle/></button>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Main Category Details */}
            <div className="p-6 bg-slate-700/60 rounded-xl border border-slate-600 space-y-6">
              {/* ... Inputs for name, slug, description ... */}
            </div>
            {/* Main Preview Image */}
            <div className="p-6 bg-slate-700/60 rounded-xl border border-slate-600">
                <label>Upload Image { !isEditMode && <span className="text-red-400">*</span> }</label>
                <div className="mt-1.5 flex flex-col items-center ...">
                    {formData.mainImagePreview ? <img src={formData.mainImagePreview}/> : <UploadCloud/>}
                    <label htmlFor="mainImage-upload-btn">
                        <span>{formData.mainImagePreview ? "Change Image" : "Select an Image"}</span>
                        <input id="mainImage-upload-btn" type="file" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'mainImage')}/>
                    </label>
                </div>
            </div>
            {/* Is Active Checkbox */}
            <div>{/* ... */}</div>
            {/* Sub-Services */}
            <div className="p-6 bg-slate-700/60 rounded-xl border border-slate-600 space-y-6">
                <AnimatePresence>
                    {(formData.subServices || []).map((sub, index) => (
                        <motion.div key={sub.id} /* ... */>
                            {/* ... sub-service inputs and image upload ... */}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button type="button" onClick={addSubService}>Add Sub-Service</button>
            </div>
            {/* Error/Success messages */}
            {/* Submit Button */}
          </form>
        </motion.div>

        {/* Existing Services List Section */}
        <motion.div className="p-6 bg-slate-800/70 rounded-xl border border-slate-700">
            {/* ... List Header and Content ... */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminManageServicesPage;
