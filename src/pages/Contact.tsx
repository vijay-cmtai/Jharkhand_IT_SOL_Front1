import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { motion } from "framer-motion";
// import TopBar from "../components/TopBar"; // Uncomment if you use these
// import Navbar from "../components/Navbar"; // Uncomment if you use these
import UnifiedNavbar from "../components/UnifiedNavbar"; // Assuming you use this
import Footer from "../components/Footer"; // Assuming you use this
import vedio2 from "../assets/vedio2.mp4"; // Import the video

import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  Loader2,
  Smartphone,
} from "lucide-react";

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com/contact/submit";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: FormDataState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

// --- MODIFICATION: Google Maps Embed Source URL ---
// **IMPORTANT:** Replace this with the ACTUAL 'src' URL from your Google Maps embed code!
// This is an example for "Jharkhand IT Solutions, Deoghar"
const GOOGLE_MAPS_EMBED_URL = "https://maps.app.goo.gl/btELRo4RXXxVDegs7"; // REPLACE THIS

const Contact = () => {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus({
        success: false,
        message: "Please fill out all required fields.",
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (formData.phone && !/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid phone number.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseData.error ||
          responseData.message ||
          `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSubmitStatus({
        success: true,
        message: responseData.message || "Message sent successfully!",
      });
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again.";
      setSubmitStatus({ success: false, message });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <UnifiedNavbar /> {/* Using UnifiedNavbar */}
      <main className="flex-grow">
        {/* Hero Section with Video Background */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          {" "}
          {/* Adjusted padding */}
          {/* Background Video & Overlays Container */}
          <div className="absolute inset-0 z-0">
            {/* Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover blur-sm" // Added blur-sm
              src={vedio2}
              // poster="optional_poster_image.jpg" // Optional: poster for while video loads
            >
              Your browser does not support the video tag.
            </video>
            {/* Color Gradient Overlay - To maintain UI color and text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-jis-green/80 via-jis-teal/70 to-jis-blue/60 opacity-80"></div>{" "}
            {/* Adjusted opacity and colors for better readability over video */}
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-50"></div>
          </div>
          {/* Content - Ensure this is above the background layers */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-300 drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Get In Touch
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md font-medium max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Have a project in mind or questions about our services? We'd
                love to hear from you. Reach out and let's build something great
                together.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards (Your Original Cards) */}
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-10">
              <motion.div
                className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-gray-700 hover:shadow-jis-teal/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-jis-teal to-jis-green mb-4 shadow-lg hover:shadow-jis-teal/50 transition-all">
                    <Mail className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-400 mb-4">
                    For general inquiries and information
                  </p>
                  <a
                    href="mailto:info@jharkhanditsolutions.com"
                    className="text-jis-teal hover:underline"
                  >
                    info@jharkhanditsolutions.com jharkhanditsolutions@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-gray-700 hover:shadow-jis-teal/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-jis-green to-jis-yellow mb-4 shadow-lg hover:shadow-jis-green/50 transition-all">
                    <Phone className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-400 mb-4">
                    For direct assistance and consultation
                  </p>
                  <a
                    href="tel:+91 7033333433"
                    className="text-jis-green hover:underline"
                  >
                    +91 7033333433
                  </a>
                  {/* <a
                    href="tel: +91 9031143738"
                    className="text-jis-green hover:underline"
                  >
                    +91 9031143738
                  </a> */}
                </div>
              </motion.div>

              <motion.div
                className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-gray-700 hover:shadow-jis-teal/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-jis-yellow to-jis-orange mb-4 shadow-lg hover:shadow-jis-yellow/50 transition-all">
                    <MapPin className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-400 mb-4">Our office location</p>
                  <address className="text-jis-yellow not-italic text-sm">
                    Riverview Colony, Near Vidya Vikas Public School, Boriya
                    Road,Morabadi,Ranchi-83400
                  </address>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section (Your Original Form Structure) */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Side: Form */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 md:p-8 border border-gray-700 shadow-xl h-full">
                  <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-jis-teal via-jis-green to-jis-teal">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Fill out the form and we'll get back to you as soon as
                    possible.
                  </p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-jis-teal transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-jis-teal transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Smartphone
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-jis-teal transition-all duration-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-jis-teal transition-all duration-300"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-jis-teal transition-all duration-300 resize-none"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>

                    {submitStatus && (
                      <div
                        className={`p-3 rounded-md text-sm ${submitStatus.success ? "bg-green-600/20 text-green-300 border border-green-500/30" : "bg-red-600/20 text-red-300 border border-red-500/30"}`}
                      >
                        {submitStatus.message}
                      </div>
                    )}
                    <div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-jis-teal to-jis-green text-white font-medium rounded-md shadow-lg hover:shadow-jis-teal/50 transition-all button-3d transform hover:-translate-y-1 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight
                              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              size={16}
                            />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Right Side: More Ways to Connect - WITH MAP */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 md:p-8 border border-gray-700 shadow-xl h-full flex flex-col">
                  <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-jis-yellow via-jis-orange to-jis-yellow">
                    More Ways to Connect
                  </h2>
                  <div className="space-y-8 flex-grow flex flex-col">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-jis-teal/20 to-jis-green/20 shadow-inner border border-gray-700">
                          <MessageSquare className="text-jis-teal" size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Live Chat Support
                        </h3>
                        <p className="text-gray-400">
                          Get instant answers through our live chat service
                          during business hours.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-jis-yellow/20 to-jis-orange/20 shadow-inner border border-gray-700">
                          <Clock className="text-jis-yellow" size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Business Hours
                        </h3>
                        <p className="text-gray-400">
                          Monday-Friday: 9AM-6PM
                          <br />
                          Saturday: 10AM-4PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-auto rounded-lg overflow-hidden h-64 md:h-72 lg:h-80 border border-gray-700 shadow-inner flex-grow">
                      <iframe
                        src={GOOGLE_MAPS_EMBED_URL}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Jharkhand IT Solutions Location"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section (Placeholder) */}
      </main>
    </div>
  );
};

export default Contact;
