import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Image as ImageIcon,
  PlusCircle,
  ListChecks,
  RefreshCw,
  Loader2,
  Edit3,
  Trash2,
  XCircle,
  Save,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- INTERFACES ---
interface PortfolioFormData {
  _id?: string;
  category: string;
  title: string;
  description: string;
  projectLink: string;
  image?: File | null;
  imageUrl?: string;
  imagePreview?: string | null;
}

interface FetchedPortfolioItem {
  _id: string;
  category: string;
  title: string;
  description: string;
  projectLink: string;
  imageUrl: string;
  createdAt: string;
}

const initialFormData: PortfolioFormData = {
  category: "",
  title: "",
  description: "",
  projectLink: "",
  image: null,
  imagePreview: null,
};

// --- API URLs ---
const API_BASE_URL = `${import.meta.env.VITE_API_BACKEND_URL || 'https://jharkhand-it-sol-back1.onrender.com'}/portfolio`;
const FIND_URL = `${API_BASE_URL}/all`;
const CREATE_URL = `${API_BASE_URL}/create`;
const UPDATE_URL = (id: string) => `${API_BASE_URL}/${id}`;
const DELETE_URL = (id: string) => `${API_BASE_URL}/${id}`;

const AdminManagePortfolioPage = () => {
  const [formData, setFormData] = useState<PortfolioFormData>(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fetchedPortfolios, setFetchedPortfolios] = useState<FetchedPortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const API_IMAGE_URL = import.meta.env.VITE_API_BACKEND_URL || 'https://jharkhand-it-sol-back1.onrender.com';

  useEffect(() => {
    if (!isAdmin) {
      toast({ title: "Access Denied", variant: "destructive" });
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const fetchAllPortfolios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(FIND_URL);
      if (!response.ok) throw new Error("Failed to fetch portfolio items.");
      const data: FetchedPortfolioItem[] = await response.json();
      setFetchedPortfolios(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAllPortfolios();
    }
  }, [isAdmin, fetchAllPortfolios]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }));
    }
  };

  const handleEditClick = (item: FetchedPortfolioItem) => {
    setFormData({
        _id: item._id,
        category: item.category,
        title: item.title,
        description: item.description,
        projectLink: item.projectLink,
        imageUrl: item.image,
        imagePreview: `${API_IMAGE_URL}/${item.imageUrl}`,
        image: null,
    });
    setIsEditMode(true);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const cancelEditMode = () => {
      setIsEditMode(false);
      setFormData(initialFormData);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = new FormData();
    payload.append("category", formData.category);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("projectLink", formData.projectLink);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    const url = isEditMode && formData._id ? UPDATE_URL(formData._id) : CREATE_URL;
    const method = isEditMode ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, { method, body: payload });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Failed to ${isEditMode ? 'update' : 'create'} portfolio.`);
      toast({ title: `Portfolio ${isEditMode ? 'Updated' : 'Created'}`, description: data.message });
      cancelEditMode();
      fetchAllPortfolios();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      toast({ title: "Submission Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    setDeletingId(id);
    try {
      const response = await fetch(DELETE_URL(id), { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete portfolio item.');
      toast({ title: "Portfolio Deleted", description: data.message });
      fetchAllPortfolios();
      if (isEditMode && formData._id === id) cancelEditMode();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      toast({ title: "Deletion Error", description: errorMessage, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto py-12 px-4 min-h-[80vh] text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          {isEditMode ? <Edit3 className="h-8 w-8 text-yellow-400"/> : <PlusCircle className="h-8 w-8 text-cyan-400"/>}
          <h1 className="text-3xl font-bold">{isEditMode ? `Editing Portfolio` : "Create Portfolio Item"}</h1>
        </div>
        <Link to="/admin" className="flex items-center text-sm text-cyan-400 hover:text-cyan-300">
            <ArrowLeft size={16} className="mr-1.5" /> Back to Admin
        </Link>
      </motion.div>

      <motion.div ref={formRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-slate-800/70 border border-slate-700 shadow-lg">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="text-xl text-white">Portfolio Details</CardTitle>
            <CardDescription className="text-slate-400">{isEditMode ? `Updating "${formData.title}"` : 'Add a new project.'}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category (e.g., Web Development)" required className="bg-slate-700 border-slate-600"/>
                    <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required className="bg-slate-700 border-slate-600"/>
                </div>
                <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="min-h-32 bg-slate-700 border-slate-600"/>
                <Input name="projectLink" value={formData.projectLink} onChange={handleInputChange} placeholder="Project Link (https://...)" required className="bg-slate-700 border-slate-600"/>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-slate-300 mb-1">Project Image {isEditMode ? '(Optional: only to replace)' : '*'}</label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="border-slate-600 bg-slate-700 file:bg-slate-600 file:text-white file:border-0"/>
                    <div className="mt-4">
                        {formData.imagePreview ? (
                            <img src={formData.imagePreview} alt="Preview" className="w-40 h-auto object-cover rounded-md border border-slate-600"/>
                        ) : (
                            <div className="flex items-center justify-center w-40 h-40 border-2 border-dashed border-slate-600 rounded-md">
                                <ImageIcon className="h-10 w-10 text-slate-500" />
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-slate-800/50 border-t border-slate-700 py-4 px-6 flex justify-between items-center">
                <Button type="submit" disabled={isSubmitting} className={cn(isEditMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-cyan-500 hover:bg-cyan-600")}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                    {isEditMode ? 'Update Portfolio' : 'Create Portfolio'}
                </Button>
                {isEditMode && (
                    <Button type="button" variant="ghost" onClick={cancelEditMode}>
                        <XCircle className="mr-2 h-4 w-4"/> Cancel
                    </Button>
                )}
            </CardFooter>
          </form>
        </Card>
      </motion.div>

      {/* Existing Portfolios Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }} 
        className="mt-16 p-6 md:p-8 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700"
      >
        <div className="flex items-center justify-between border-b border-slate-600 pb-4 mb-6">
            <div className="flex items-center">
                <ListChecks size={24} className="text-cyan-400 mr-3.5" />
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Existing Portfolio Items
                </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={fetchAllPortfolios} disabled={isLoading}>
                {isLoading && fetchedPortfolios.length === 0 ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <RefreshCw className="h-5 w-5" />
                )}
            </Button>
        </div>
        
        {isLoading && fetchedPortfolios.length === 0 && (
            <div className="flex justify-center items-center py-10">
                <Loader2 size={32} className="animate-spin text-cyan-400" />
                <p className="ml-3 text-slate-300">Loading portfolio...</p>
            </div>
        )}

        {error && (
            <div className="my-4 p-3.5 rounded-lg text-sm flex items-center gap-2.5 shadow bg-red-900/20 border border-red-500/40 text-red-300">
                <AlertTriangle size={18} /> {error}
            </div>
        )}
        
        {!isLoading && !error && fetchedPortfolios.length === 0 && (
            <p className="text-center text-slate-400 py-8">
                No portfolio items found. Start by creating one above!
            </p>
        )}

        {!isLoading && !error && fetchedPortfolios.length > 0 && (
            <div className="space-y-4">
                {fetchedPortfolios.map(item => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-700/60 rounded-lg border border-slate-600 hover:border-cyan-500/70 transition-colors"
                    >
                        <div className="flex-grow mb-3 sm:mb-0 pr-4">
                            <h3 className="text-lg font-semibold text-cyan-300">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-300">
                                Category: <span className="font-medium text-slate-200">{item.category}</span>
                            </p>
                            <a href={item.projectLink} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline break-all">
                                {item.projectLink}
                            </a>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditClick(item)}
                                className="text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-300"
                            >
                                <Edit3 className="mr-2 h-4 w-4"/> Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(item._id)}
                                disabled={deletingId === item._id}
                            >
                                {deletingId === item._id 
                                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> 
                                    : <Trash2 className="mr-2 h-4 w-4"/>
                                }
                                Delete
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminManagePortfolioPage;
