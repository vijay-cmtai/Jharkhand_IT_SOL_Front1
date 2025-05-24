
import React, { useEffect } from 'react';
import UnifiedNavbar from './UnifiedNavbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white pt-16"> {/* Added pt-16 for navbar spacing */}
      <UnifiedNavbar />
      {children}
      <Footer />
      <FloatingButtons />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
