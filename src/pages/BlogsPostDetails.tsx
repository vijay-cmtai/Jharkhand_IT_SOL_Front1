// src/pages/BlogsFullDetails.tsx (or BlogsPostDetails.tsx - ensure filename matches)

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  UserCircle,
  ArrowLeft,
  Mail,
  Share2,
  Tag,
  Info,
  ThumbsUp,
  Eye,
  Clock,
  BookOpen,
  Loader2,
  AlertTriangle,
  Printer,
  Copy,
  ListOrdered,
  Linkedin,
  Twitter,
  Facebook,
  Edit3,
  MessageSquareText,
  Zap,
  Sparkles,
  Users,
  ChevronRight,
  Globe as WebsiteIcon,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Ensure this path is correct
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import MainNavbar from "../components/UnifiedNavbar"; // Ensure this path is correct
import Footer from "../components/Footer"; // Ensure this path is correct
import { cn } from "@/lib/utils"; // Ensure this path is correct

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

// --- Interfaces ---
interface Author {
  name: string;
  avatarUrl?: string;
  bio?: string;
  profileUrl?: string;
  socialLinks?: { twitter?: string; linkedin?: string; website?: string };
}
interface Category {
  name: string;
  slug?: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  excerpt?: string;
  categoryName?: string;
}

interface ApiPostDetailsData {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: Author | string;
  category: Category | string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
  publishDate?: string;
  commentsCount?: number;
  viewsCount?: number;
  likesCount?: number;
  readingTime?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  tableOfContents?: { level: number; text: string; id: string }[];
}

interface PostDetails
  extends Omit<
    ApiPostDetailsData,
    "author" | "category" | "createdAt" | "publishDate" | "updatedAt"
  > {
  authorData: Author;
  categoryData: Category;
  formattedPublishDate: string;
  formattedUpdateDate?: string;
}

const formatDate = (
  dateString?: string,
  options?: Intl.DateTimeFormatOptions
) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return "Invalid Date";
  }
};

const staticKeyTopics = [
  { id: "intro", text: "Introduction to the Subject" },
  { id: "core-features", text: "Exploring Core Features" },
  { id: "how-it-works", text: "How It Works: A Deep Dive" },
  { id: "use-cases", text: "Real-World Use Cases" },
  { id: "getting-started", text: "Getting Started Guide" },
  { id: "conclusion", text: "Conclusion & Next Steps" },
];

const staticPlaceholderTags = [
  "TechInnovation",
  "WebDev",
  "DigitalStrategy",
  "FutureTech",
  "Software",
];

const placeholderRelatedPosts: RelatedPost[] = [
  {
    _id: "s1",
    title: "Exploring Advanced JavaScript Techniques",
    slug: "advanced-js",
    imageUrl:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=400",
    excerpt:
      "Dive deep into closures, prototypes, and asynchronous JavaScript patterns.",
    categoryName: "Web Development",
  },
  {
    _id: "s2",
    title: "The Essential Guide to UI/UX Design Principles",
    slug: "ui-ux-guide",
    imageUrl:
      "https://images.unsplash.com/photo-1600697395347-256c8etu6a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=400",
    excerpt:
      "Learn the fundamentals that make user interfaces intuitive and delightful.",
    categoryName: "Design",
  },
  {
    _id: "s3",
    title: "Optimizing Cloud Infrastructure for Scalability",
    slug: "cloud-scalability",
    imageUrl:
      "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=400",
    excerpt:
      "Strategies for building robust and scalable applications in the cloud.",
    categoryName: "Cloud Computing",
  },
];

const BlogsFullDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otherPosts, setOtherPosts] = useState<RelatedPost[]>(
    placeholderRelatedPosts
  );
  const [loadingOtherPosts, setLoadingOtherPosts] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) {
      setError("Blog post identifier missing.");
      setLoading(false);
      setLoadingOtherPosts(false);
      return;
    }

    const fetchPostAndOtherPosts = async () => {
      setLoading(true);
      setLoadingOtherPosts(true);
      setError(null);

      try {
        const postResponse = await fetch(`${BASE_URL}/blogs/slug/${slug}`);
        if (!postResponse.ok) {
          if (postResponse.status === 404)
            throw new Error(
              "Article not found. It might have been moved or deleted."
            );
          throw new Error(
            `Network error fetching main post: ${postResponse.statusText || postResponse.status}`
          );
        }
        const postData: ApiPostDetailsData = await postResponse.json();

        const defaultAuthorBio =
          "A passionate JISS team member dedicated to sharing knowledge and insights on the latest in technology and digital solutions. Connect with us to learn more!";
        const defaultSocialLinks = {
          twitter: "https://twitter.com/jissolutions",
          linkedin: "https://linkedin.com/company/jissolutions",
          website: "https://jharkhanditsolutions.com",
        };

        const authorData: Author =
          typeof postData.author === "string"
            ? {
                name: postData.author,
                bio: defaultAuthorBio,
                avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(postData.author)}&background=0284c7&color=fff&size=128&font-size=0.33&bold=true`,
                socialLinks: defaultSocialLinks,
              }
            : {
                ...postData.author,
                bio: postData.author.bio || defaultAuthorBio,
                avatarUrl:
                  postData.author.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(postData.author.name)}&background=0284c7&color=fff&size=128&font-size=0.33&bold=true`,
                socialLinks: postData.author.socialLinks || defaultSocialLinks,
              };

        const categoryData: Category =
          typeof postData.category === "string"
            ? {
                name: postData.category,
                slug: postData.category.toLowerCase().replace(/\s+/g, "-"),
              }
            : postData.category;

        setPost({
          ...postData,
          authorData,
          categoryData,
          formattedPublishDate: formatDate(
            postData.publishDate || postData.createdAt
          ),
          formattedUpdateDate:
            postData.updatedAt &&
            new Date(postData.updatedAt).getTime() >
              new Date(postData.publishDate || postData.createdAt).getTime()
              ? formatDate(postData.updatedAt)
              : undefined,
        });
        setLoading(false);

        try {
          const allPostsResponse = await fetch(`${BASE_URL}/blogs`);
          if (!allPostsResponse.ok) {
            console.warn(
              `Could not fetch other posts: ${allPostsResponse.statusText}`
            );
            setOtherPosts(placeholderRelatedPosts);
            setLoadingOtherPosts(false);
            return;
          }
          const allPostsData: ApiPostDetailsData[] =
            await allPostsResponse.json();

          const filteredAndSortedPosts = allPostsData
            .filter((p) => p.slug !== slug)
            .sort(
              (a, b) =>
                new Date(a.publishDate || a.createdAt).getTime() -
                new Date(b.publishDate || b.createdAt).getTime()
            )
            .reverse() // To get most recent first
            .slice(0, 3)
            .map((p) => ({
              _id: p._id,
              title: p.title,
              slug: p.slug,
              imageUrl: p.imageUrl,
              excerpt: p.excerpt,
              categoryName:
                typeof p.category === "string"
                  ? p.category
                  : (p.category as Category)?.name || "General",
            }));
          setOtherPosts(
            filteredAndSortedPosts.length > 0
              ? filteredAndSortedPosts
              : placeholderRelatedPosts
          );
        } catch (otherPostsError) {
          console.warn("Failed to fetch other blog posts:", otherPostsError);
          setOtherPosts(placeholderRelatedPosts);
        } finally {
          setLoadingOtherPosts(false);
        }
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Unknown error fetching post details."
        );
        setLoading(false);
        setLoadingOtherPosts(false);
      }
    };
    fetchPostAndOtherPosts();
  }, [slug]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };
  const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handlePrint = () => window.print();
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy link: ", err));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-300">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <motion.p
          className="text-xl text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Unveiling the article...
        </motion.p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <>
        <MainNavbar />
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-red-900/30 to-black text-slate-300 p-6 text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mb-6" />
          <motion.h2
            className="text-2xl font-semibold text-red-300 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Houston, we have a problem!
          </motion.h2>
          <motion.p
            className="text-md text-slate-400 mb-8 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {error}
          </motion.p>
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="text-cyan-300 border-cyan-500 hover:bg-cyan-500/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retreat to Blog
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    // This check comes after loading is false and specific error check.
    return (
      <>
        <MainNavbar />
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-slate-900 to-black text-slate-300 p-6 text-center">
          <BookOpen className="w-16 h-16 text-slate-500 mb-6" />
          <motion.h2
            className="text-2xl font-semibold text-slate-400 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            This Page is a Mystery
          </motion.h2>
          <motion.p
            className="text-md text-slate-500 mb-8 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The content you seek is elusive. Perhaps explore other tales?
          </motion.p>
          <Button
            variant="outline"
            onClick={() => navigate("/blog")}
            className="text-cyan-300 border-cyan-500 hover:bg-cyan-500/20"
          >
            Discover Other Articles
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const socialShareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title || "Interesting Article")}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title || "Interesting Article")}&summary=${encodeURIComponent(post.excerpt || "Check this out!")}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
  };

  const displayTags =
    post.tags && post.tags.length > 0 ? post.tags : staticPlaceholderTags;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <MainNavbar />
      <motion.div
        className="flex-grow bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-300 selection:bg-cyan-600/40 selection:text-cyan-100"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
      >
        <main className="pt-8 pb-16 md:pb-24">
          <div className="container mx-auto px-4 mb-6 md:mb-10">
            <motion.div className="flex justify-start" variants={itemVariants}>
              <Link
                to="/blog"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-200 transition-colors group text-sm font-medium py-2 px-3 bg-slate-800/80 hover:bg-slate-700/90 rounded-lg shadow-sm"
              >
                <ArrowLeft
                  size={16}
                  className="mr-1.5 transition-transform group-hover:-translate-x-0.5"
                />
                All Articles
              </Link>
            </motion.div>
          </div>

          <header className="container mx-auto px-4 text-center mb-8 md:mb-12">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 leading-tight"
              variants={itemVariants}
            >
              {post.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap justify-center items-center text-xs sm:text-sm text-slate-400/90 gap-x-4 gap-y-1"
              variants={itemVariants}
              transition={{ delay: 0.1 }}
            >
              <span className="flex items-center">
                {post.authorData.avatarUrl ? (
                  <img
                    src={post.authorData.avatarUrl}
                    alt={post.authorData.name}
                    className="w-5 h-5 rounded-full mr-1.5 border border-slate-600 object-cover"
                  />
                ) : (
                  <UserCircle size={16} className="mr-1.5 text-cyan-400/80" />
                )}
                By{" "}
                <Link
                  to={post.authorData.profileUrl || "#"}
                  className="ml-1 font-medium text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {post.authorData.name}
                </Link>
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center">
                {" "}
                <CalendarDays
                  size={15}
                  className="mr-1.5 text-cyan-400/80"
                />{" "}
                Published: {post.formattedPublishDate}{" "}
              </span>
              {post.formattedUpdateDate && (
                <>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <span className="flex items-center text-slate-500 italic">
                    <Clock size={15} className="mr-1.5" /> Updated:{" "}
                    {post.formattedUpdateDate}
                  </span>
                </>
              )}
            </motion.div>
            <motion.div
              className="mt-3 text-xs text-sky-400/80 flex justify-center items-center gap-3"
              variants={itemVariants}
              transition={{ delay: 0.2 }}
            >
              {post.readingTime && (
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" /> {post.readingTime}
                </span>
              )}
              {post.viewsCount !== undefined && (
                <span className="flex items-center">
                  <Eye size={14} className="mr-1" />{" "}
                  {post.viewsCount.toLocaleString()} views
                </span>
              )}
            </motion.div>
          </header>

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12">
              <motion.div
                className="lg:w-8/12 xl:w-3/4 space-y-8"
                variants={itemVariants}
              >
                {post.imageUrl && (
                  <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border-2 border-slate-700/60 bg-slate-800">
                    <AspectRatio ratio={16 / 8.5} className="bg-slate-700/50">
                      <img
                        src={
                          post.imageUrl.startsWith("http")
                            ? post.imageUrl
                            : `${BASE_URL}${post.imageUrl.startsWith("/") ? "" : "/"}${post.imageUrl}`
                        }
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </div>
                )}
                <div className="bg-slate-800/70 p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md ring-1 ring-slate-700/50">
                  <div
                    className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-emerald-300 prose-headings:via-cyan-300 prose-headings:to-sky-400 prose-headings:scroll-mt-24 prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0 prose-p:leading-relaxed prose-p:text-slate-300/95 prose-p:my-4 md:prose-p:my-5 prose-a:text-cyan-400 hover:prose-a:text-cyan-200 prose-a:transition-colors prose-a:duration-200 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-100 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 md:prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-slate-400 prose-blockquote:bg-slate-700/40 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:my-6 prose-code:bg-slate-700/70 prose-code:text-emerald-300 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-cyan-400 prose-li:my-2 prose-li:ml-1 prose-img:rounded-lg prose-img:shadow-lg prose-img:border-2 prose-img:border-slate-700/60 prose-img:max-w-full prose-img:mx-auto prose-img:my-8 prose-hr:border-slate-700/80 prose-hr:my-10 prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-slate-600 prose-th:p-2 md:prose-th:p-3 prose-th:bg-slate-700/60 prose-th:text-left prose-td:border prose-td:border-slate-700 prose-td:p-2 md:prose-td:p-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        post.content ||
                        "<p class='text-slate-400 italic'>Content is currently being crafted by our digital artisans...</p>",
                    }}
                  />
                </div>
              </motion.div>

              <aside className="lg:w-4/12 xl:w-1/4 space-y-6 md:space-y-8 sticky top-24 self-start">
                <motion.div
                  className="bg-slate-800/70 p-4 md:p-5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <h3 className="text-md font-semibold text-slate-200 mb-3.5 flex items-center">
                    <Sparkles size={18} className="mr-2.5 text-sky-400" /> In
                    This Article
                  </h3>
                  <nav>
                    <ul className="space-y-1.5">
                      {staticKeyTopics.map((item) => (
                        <li key={item.id} className="text-xs">
                          <a
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              alert(
                                `Navigating to section: '${item.text}' (Implement actual scroll or routing based on IDs in your content if available)`
                              );
                            }}
                            className="text-slate-400 hover:text-cyan-300 transition-colors hover:underline block py-0.5 group flex items-center"
                          >
                            <ChevronRight
                              size={12}
                              className="mr-1.5 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0"
                            />
                            <span className="truncate">{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>

                <motion.div
                  className="bg-slate-800/70 p-4 md:p-5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <h3 className="text-md font-semibold text-slate-200 mb-3.5 flex items-center">
                    <UserCircle size={20} className="mr-2.5 text-emerald-400" />{" "}
                    Author
                  </h3>
                  <div className="flex items-center mb-2.5">
                    <img
                      src={
                        post.authorData.avatarUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorData.name)}&background=0284c7&color=fff&size=96&font-size=0.33&bold=true`
                      }
                      alt={post.authorData.name}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-cyan-500/70 shadow-md object-cover"
                    />
                    <Link
                      to={post.authorData.profileUrl || "#"}
                      className="font-semibold text-slate-200 hover:text-cyan-300 transition-colors text-md"
                    >
                      {post.authorData.name}
                    </Link>
                  </div>
                  <p className="text-xs text-slate-400/90 leading-relaxed line-clamp-3 mb-2.5">
                    {post.authorData.bio ||
                      "A key contributor at JISS, passionate about demystifying technology and sharing practical knowledge to empower our readers."}
                  </p>
                  {post.authorData.socialLinks && (
                    <div className="flex items-center gap-3 mt-2.5 border-t border-slate-700/50 pt-2.5">
                      {post.authorData.socialLinks.twitter && (
                        <a
                          href={post.authorData.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-sky-400 transition-colors"
                          title="Twitter"
                        >
                          <Twitter size={16} />
                        </a>
                      )}
                      {post.authorData.socialLinks.linkedin && (
                        <a
                          href={post.authorData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-blue-400 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      {post.authorData.socialLinks.website && (
                        <a
                          href={post.authorData.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-emerald-400 transition-colors"
                          title="Website"
                        >
                          <WebsiteIcon size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="bg-slate-800/70 p-4 md:p-5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <h3 className="text-md font-semibold text-slate-200 mb-3 flex items-center">
                    <Tag size={18} className="mr-2 text-cyan-400" /> Related
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {displayTags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="px-2.5 py-1 bg-slate-700/80 text-cyan-300 text-[11px] font-medium rounded-full hover:bg-cyan-600/60 hover:text-cyan-100 transition-all duration-200 shadow-sm border border-slate-600/50 hover:border-cyan-500/70"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-slate-800/70 p-4 md:p-5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-sm"
                  variants={itemVariants}
                >
                  <h3 className="text-md font-semibold text-slate-200 mb-3">
                    Utilities & Share
                  </h3>
                  <div className="space-y-2.5">
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="w-full justify-start text-slate-300 border-slate-600 hover:bg-slate-700/60 hover:border-cyan-500/80 hover:text-cyan-300 transition-colors text-xs py-2 h-auto"
                    >
                      <Copy size={14} className="mr-2" /> Copy Article Link
                    </Button>
                    <Button
                      onClick={handlePrint}
                      variant="outline"
                      className="w-full justify-start text-slate-300 border-slate-600 hover:bg-slate-700/60 hover:border-cyan-500/80 hover:text-cyan-300 transition-colors text-xs py-2 h-auto"
                    >
                      <Printer size={14} className="mr-2" /> Print / Save as PDF
                    </Button>
                    <p className="text-xs text-slate-500 pt-1.5">
                      Share this insight:
                    </p>
                    <div className="flex items-center gap-2.5">
                      <a
                        href={socialShareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-slate-700/80 hover:bg-sky-500/90 rounded-full text-sky-400 hover:text-white transition-colors shadow-sm"
                        title="Share on Twitter"
                      >
                        {" "}
                        <Twitter size={16} />{" "}
                      </a>
                      <a
                        href={socialShareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-slate-700/80 hover:bg-blue-600/90 rounded-full text-blue-400 hover:text-white transition-colors shadow-sm"
                        title="Share on LinkedIn"
                      >
                        {" "}
                        <Linkedin size={16} />{" "}
                      </a>
                      <a
                        href={socialShareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-slate-700/80 hover:bg-indigo-600/90 rounded-full text-indigo-400 hover:text-white transition-colors shadow-sm"
                        title="Share on Facebook"
                      >
                        {" "}
                        <Facebook size={16} />{" "}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </aside>
            </div>
          </div>

          <motion.section
            className="container mx-auto px-4 mt-16 md:mt-20 py-12 md:py-16 bg-slate-800/50 rounded-2xl shadow-xl border border-slate-700/60 backdrop-blur-sm"
            variants={itemVariants}
          >
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 md:gap-8">
              {post.authorData.avatarUrl && (
                <img
                  src={post.authorData.avatarUrl}
                  alt={post.authorData.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-cyan-500/70 shadow-lg flex-shrink-0 object-cover"
                />
              )}
              <div>
                <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                  Meet The Author
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2.5">
                  {post.authorData.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {post.authorData.bio ||
                    "A key member of the Jharkhand IT Solutions team, dedicated to sharing valuable insights and fostering discussion within the tech community. Expertise includes web development, cloud solutions, and digital strategy."}
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {post.authorData.profileUrl && (
                    <Button
                      asChild
                      variant="link"
                      className="text-emerald-400 hover:text-emerald-300 p-0 h-auto text-sm"
                    >
                      <Link to={post.authorData.profileUrl}>
                        View all posts by {post.authorData.name}
                      </Link>
                    </Button>
                  )}
                  {post.authorData.socialLinks?.twitter && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-sky-400 hover:bg-sky-500/10"
                    >
                      <a
                        href={post.authorData.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter size={16} className="mr-1.5" /> Twitter
                      </a>
                    </Button>
                  )}
                  {post.authorData.socialLinks?.linkedin && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <a
                        href={post.authorData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin size={16} className="mr-1.5" /> LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {!loadingOtherPosts && otherPosts.length > 0 && (
            <motion.section
              className="container mx-auto px-4 mt-16 md:mt-20 py-10"
              variants={itemVariants}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8 md:mb-10 text-center sm:text-left">
                Continue Your Journey
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherPosts.map((related) => (
                  <motion.div
                    key={related._id}
                    className="bg-slate-800/60 rounded-xl shadow-lg border border-slate-700/70 overflow-hidden flex flex-col group hover:border-cyan-500/60 transition-all duration-300 hover:shadow-cyan-500/10 backdrop-blur-sm"
                    variants={itemVariants}
                  >
                    {related.imageUrl && (
                      <Link to={`/blog/${related.slug}`} className="block">
                        {" "}
                        <AspectRatio ratio={16 / 9} className="bg-slate-700">
                          {" "}
                          <img
                            src={
                              related.imageUrl.startsWith("http")
                                ? related.imageUrl
                                : `${BASE_URL}${related.imageUrl.startsWith("/") ? "" : "/"}${related.imageUrl}`
                            }
                            alt={related.title || "Related article image"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />{" "}
                        </AspectRatio>{" "}
                      </Link>
                    )}
                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="text-md sm:text-lg font-semibold text-slate-200 group-hover:text-cyan-300 mb-1.5 leading-tight line-clamp-2">
                        {" "}
                        <Link to={`/blog/${related.slug}`}>
                          {related.title || "Untitled Post"}
                        </Link>{" "}
                      </h3>
                      {related.excerpt && (
                        <p className="text-xs text-slate-400/90 mb-3 line-clamp-2">
                          {related.excerpt}
                        </p>
                      )}
                      <Link
                        to={`/blog/${related.slug}`}
                        className="mt-auto text-xs font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center self-start group/readmore"
                      >
                        {" "}
                        Read Article{" "}
                        <ArrowLeft
                          size={12}
                          className="ml-1 rotate-180 transition-transform group-hover/readmore:translate-x-0.5"
                        />{" "}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
          {loadingOtherPosts && (
            <div className="container mx-auto px-4 mt-12 md:mt-16 py-10 text-center">
              {" "}
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />{" "}
              <p className="text-slate-400">Loading more articles...</p>{" "}
            </div>
          )}

          <motion.section
            className="container mx-auto px-4 mt-16 md:mt-20 py-16 md:py-20 bg-gradient-to-br from-slate-800 via-slate-800/70 to-slate-800 rounded-2xl shadow-2xl border border-cyan-500/30 relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-600/15 rounded-full blur-3xl opacity-60 animate-pulse-slow animation-delay-2000"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <Zap
                size={40}
                className="text-cyan-300 mx-auto mb-5 animate-bounce"
              />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Innovate
                </span>
                ?
              </h2>
              <p className="text-slate-300/90 mb-10 max-w-xl mx-auto leading-relaxed text-md">
                Your digital transformation starts here. Jharkhand IT Solutions
                offers cutting-edge development, design, and marketing services
                tailored to your unique needs. Let's build something amazing
                together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:scale-105 text-base px-8 py-3.5"
                >
                  <Link to="/services">Discover Our Expertise</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-slate-200 border-slate-500 hover:bg-slate-700/60 hover:border-cyan-500 hover:text-cyan-200 transition-colors transform hover:scale-105 text-base px-8 py-3.5"
                >
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </main>
      </motion.div>
      {/* <Footer /> */}
    </div>
  );
};

export default BlogsFullDetails;
