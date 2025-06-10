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
const FIND_URL = `${API_BASE_URL}/all`; // Assuming an endpoint to get all portfolios
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


  // --- AUTH & DATA FETCHING ---
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
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio items.");
      }
      const data: FetchedPortfolioItem[] = await response.json();
      setFetchedPortfolios(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast({ title: "Fetch Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAllPortfolios();
    }
  }, [isAdmin, fetchAllPortfolios]);

  // --- FORM HANDLERS ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (item: FetchedPortfolioItem) => {
    setFormData({
        _id: item._id,
        category: item.category,
        title: item.title,
        description: item.description,
        projectLink: item.projectLink,
        imageUrl: item.imageUrl,
        imagePreview: `${API_IMAGE_URL}/${item.imageUrl}`, // Show existing image
        image: null,
    });
    setIsEditMode(true);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const cancelEditMode = () => {
      setIsEditMode(false);
      setFormData(initialFormData);
  };

  // --- CRUD OPERATIONS ---
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

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditMode ? 'update' : 'create'} portfolio.`);
      }

      toast({ title: `Portfolio ${isEditMode ? 'Updated' : 'Created'}`, description: data.message });
      cancelEditMode();
      fetchAllPortfolios(); // Refresh list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      toast({ title: "Submission Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this portfolio item?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(DELETE_URL(id), { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete portfolio item.');
      }
      
      toast({ title: "Portfolio Deleted", description: data.message });
      fetchAllPortfolios(); // Refresh list
      if (isEditMode && formData._id === id) {
        cancelEditMode();
      }
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
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          {isEditMode ? <Edit3 className="h-8 w-8 text-yellow-400"/> : <PlusCircle className="h-8 w-8 text-cyan-400"/>}
          <h1 className="text-3xl font-bold">{isEditMode ? `Editing: ${formData.title}` : "Create Portfolio Item"}</h1>
        </div>
        <Link to="/admin" className="flex items-center text-sm text-cyan-400 hover:text-cyan-300">
            <ArrowLeft size={16} className="mr-1.5" /> Back to Admin
        </Link>
      </motion.div>

      {/* Form Section */}
      <motion.div ref={formRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-slate-800/70 border border-slate-700 shadow-lg">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="text-xl text-white">Portfolio Details</CardTitle>
            <CardDescription className="text-slate-400">
              {isEditMode ? 'Update the details of this project.' : 'Add a new project to your portfolio showcase.'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category (e.g., Web Development)" required className="bg-slate-700 border-slate-600"/>
                    <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required className="bg-slate-700 border-slate-600"/>
                </div>
                <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="min-h-32 bg-slate-700 border-slate-600"/>
                <Input name="projectLink" value={formData.projectLink} onChange={handleInputChange} placeholder="Project Link (https://...)" required className="bg-slate-700 border-slate-600"/>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-slate-300 mb-1">Project Image</label>
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
            <CardFooter className="bg-slate-800/50 border-t border-slate-700 py-4 px-6 flex justify-between">
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16">
        <div className="flex items-center mb-6 space-x-3">
          <ListChecks className="h-8 w-8 text-cyan-400"/>
          <h2 className="text-2xl font-bold">Existing Portfolio Items</h2>
          <Button variant="ghost" size="icon" onClick={fetchAllPortfolios} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4"/>}
          </Button>
        </div>
        
        {isLoading && <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-cyan-400"/></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/20 rounded-md flex items-center gap-2"><AlertTriangle size={16}/> {error}</div>}
        
        {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fetchedPortfolios.map(item => (
                    <Card key={item._id} className="bg-slate-800 border-slate-700 overflow-hidden">
                        <img src={`${API_IMAGE_URL}/${item.imageUrl}`} alt={item.title} className="w-full h-48 object-cover"/>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.category}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-end space-x-2 bg-slate-800/50 border-t border-slate-700 py-3">
                            <Button size="sm" variant="outline" onClick={() => handleEditClick(item)} className="text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-300">
                                <Edit3 className="mr-2 h-4 w-4"/> Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)} disabled={deletingId === item._id}>
                                {deletingId === item._id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Trash2 className="mr-2 h-4 w-4"/>}
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminManagePortfolioPage;
