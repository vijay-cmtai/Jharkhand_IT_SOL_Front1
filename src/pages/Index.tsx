
import React from 'react';
import EnhancedHero from '../components/EnhancedHero';
import TechnologyShowcase from '../components/TechnologyShowcase';
import ServicesSlider from '../components/ServicesSlider';
import IndustriesWeServe from '../components/IndustriesWeServe';
import CompanyAwards from '../components/CompanyAwards';
import EnhancedTestimonials from '../components/EnhancedTestimonials';
import PortfolioSection from '../components/PortfolioSection';
import ConsultationCTA from '../components/ConsultationCTA';
import BlogSection from '../components/BlogSection';
import Layout from "../components/Layout";

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <EnhancedHero />

       {/* Services Slider */}
      <ServicesSlider />
      {/* Technology Showcase */}
      <TechnologyShowcase />
      
      {/* Services Slider */}
      <ServicesSlider />
      
      {/* Industries We Serve */}
      <IndustriesWeServe />
      
      {/* Company Awards */}
      <CompanyAwards />
      
      {/* Testimonials */}
      <EnhancedTestimonials />
      
      {/* Portfolio */}
      <PortfolioSection />
      
      {/* Talk to Consultant */}
      <ConsultationCTA />
      
      {/* Blog Section */}
      <BlogSection />
    </Layout>
  );
};

export default Index;
