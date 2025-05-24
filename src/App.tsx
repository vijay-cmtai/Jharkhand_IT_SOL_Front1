import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Assuming this is 'sonner' and not a typo for 'sooner'
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "@/hooks/useAuth";

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebDesignGraphics from "./pages/WebDesignGraphics";
import WebDevelopment from "./pages/WebDevelopment";
import SoftwareMobile from "./pages/SoftwareMobile";
import WebMarketing from "./pages/WebMarketing";
import HireUs from "./pages/HireUs";
import Portfolio from "./pages/Portfolio";
import Company from "./pages/Company";
import Training from "./pages/Training";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FullTechStackPage from "./pages/FullTechStackpage"; // Corrected casing
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ApplyJobPage from "./pages/ApplyJobPage"; // Corrected casing
import Industries from "./pages/Industries";
import IndustriesDetails from "./pages/IndustriesDetails/IndustriesDetails";
import Finance from "./pages/IndustriesDetails/Finance";
import Ecommerce from "./pages/IndustriesDetails/Ecommerce";
import Education from "./pages/IndustriesDetails/Education";
import Realestate from "./pages/IndustriesDetails/RealeState";
import Manufacturing from "./pages/IndustriesDetails/Manufacturing";
import ResetPasswordPage from "./pages/ResetPasswordPage";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateService from "./pages/admin/CreateService";
import CreatePortfolio from "./pages/admin/CreatePortfolio";
import BlogPostDetails from "./pages/BlogsPostDetails";
import ShowContactsPage from "./pages/admin/showContacts";
import CreateBlogPage from "./pages/admin/createBlogPage";

// Submenu page imports
import ResponsiveWebDesigning from "./pages/WebDesignSubPages/ResponsiveWebDesigning";
import WebsiteRedesigning from "./pages/WebDesignSubPages/WebsiteRedesigning";
import LogoDesigning from "./pages/WebDesignSubPages/LogoDesigning";
import WordpressDevelopment from "./pages/WebDevelopmentSubPages/WordpressDevelopment";
import CustomDevelopment from "./pages/WebDevelopmentSubPages/CustomDevelopment";
import MobileAppDevelopment from "./pages/SoftwareMobileSubPages/MobileAppDevelopment";
import SeoServices from "./pages/WebMarketingSubPages/SeoServices";
import ScrollRestoration from "./components/ScrollRestoration";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <BrowserRouter>
          <ScrollRestoration />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Main menu routes */}
            <Route
              path="/web-design-&-graphics"
              element={
                <Layout>
                  <WebDesignGraphics />
                </Layout>
              }
            />
            <Route
              path="/web-development"
              element={
                <Layout>
                  <WebDevelopment />
                </Layout>
              }
            />
            <Route
              path="/software-&-mobile"
              element={
                <Layout>
                  <SoftwareMobile />
                </Layout>
              }
            />
            <Route
              path="/web-marketing"
              element={
                <Layout>
                  <WebMarketing />
                </Layout>
              }
            />
            <Route
              path="/hire-us"
              element={
                <Layout>
                  <HireUs />
                </Layout>
              }
            />
            <Route
              path="/portfolio"
              element={
                <Layout>
                  <Portfolio />
                </Layout>
              }
            />
            <Route
              path="/company"
              element={
                <Layout>
                  <Company />
                </Layout>
              }
            />
            <Route
              path="/training"
              element={
                <Layout>
                  <Training />
                </Layout>
              }
            />
            <Route
              path="/career"
              element={
                <Layout>
                  <Career />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/admin/showcontacts"
              element={
                <Layout>
                  <ShowContactsPage />
                </Layout>
              }
            />
            <Route
              path="/faq"
              element={
                <Layout>
                  <FAQ />
                </Layout>
              }
            />
            <Route
              path="/blog"
              element={
                <Layout>
                  <Blog />
                </Layout>
              }
            />
            <Route
              path="/services"
              element={
                <Layout>
                  <Services />
                </Layout>
              }
            />
            <Route
              path="/services/:serviceSlug"
              element={<ServiceDetailPage />} // Assuming this page handles its own layout or doesn't need the main one
            />
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/signup"
              element={
                <Layout>
                  <Signup />
                </Layout>
              }
            />
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <Layout>
                  <AdminDashboard />
                </Layout>
              }
            />
            <Route
              path="/admin/create-service"
              element={
                <Layout>
                  <CreateService />
                </Layout>
              }
            />
            <Route
              path="/admin/create-portfolio"
              element={
                <Layout>
                  <CreatePortfolio />
                </Layout>
              }
            />
            <Route
              path="/admin/createBlogs"
              element={
                <Layout>
                  <CreateBlogPage />
                </Layout>
              }
            />
            {/* Individual Blog Post Details */}
            <Route
              path="/blog/:slug"
              element={
                <Layout>
                  <BlogPostDetails />
                </Layout>
              }
            />
            {/* Web Design & Graphics submenu */}
            <Route
              path="/web-designing/responsive-web-designing"
              element={
                <Layout>
                  <ResponsiveWebDesigning />
                </Layout>
              }
            />
            <Route path="/FullTechStack" element={<FullTechStackPage />} />
            <Route
              path="/web-designing/website-redesigning"
              element={
                <Layout>
                  <WebsiteRedesigning />
                </Layout>
              }
            />
            <Route
              path="/graphics-design-services/logo-designing"
              element={
                <Layout>
                  <LogoDesigning />
                </Layout>
              }
            />
            {/* Web Development submenu */}
            <Route
              path="/cms-development/wordpress-development"
              element={
                <Layout>
                  <WordpressDevelopment />
                </Layout>
              }
            />
            <Route
              path="/backend-development/custom-development"
              element={
                <Layout>
                  <CustomDevelopment />
                </Layout>
              }
            />
            {/* Software & Mobile submenu */}
            <Route
              path="/mobile-apps/android-development"
              element={
                <Layout>
                  <MobileAppDevelopment />
                </Layout>
              }
            />
            {/* Web Marketing submenu */}
            <Route
              path="/seo-services/on-page-seo"
              element={
                <Layout>
                  <SeoServices />
                </Layout>
              }
            />
            <Route
              path="/industries"
              element={
                <Layout>
                  <Industries />
                </Layout>
              }
            />
            <Route
              path="/industriesDetails"
              element={
                <Layout>
                  <IndustriesDetails />
                </Layout>
              }
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/finance"
              element={
                <Layout>
                  <Finance />
                </Layout>
              }
            />
            <Route
              path="/ecommerce"
              element={
                <Layout>
                  <Ecommerce />
                </Layout>
              }
            />
            <Route
              path="/realestate"
              element={
                <Layout>
                  <Realestate />
                </Layout>
              }
            />
            <Route
              path="/education"
              element={
                <Layout>
                  <Education />
                </Layout>
              }
            />
            <Route
              path="/manufacturing"
              element={
                <Layout>
                  <Manufacturing />
                </Layout>
              }
            />

            <Route
              path="/careers/apply/:jobId"
              element={
                <Layout>
                  <ApplyJobPage />
                </Layout>
              }
            />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
