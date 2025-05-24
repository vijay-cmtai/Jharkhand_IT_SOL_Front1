
import React from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-10 left-4 z-50 flex flex-col space-y-3">
      <a 
        href="tel:+919031143738" 
        className="w-12 h-12 rounded-full bg-jis-blue flex items-center justify-center hover:bg-blue-700 
         transition-colors shadow-lg"
        aria-label="Call us"
      >
        <FaPhone className="text-white" size={20} />
      </a>
      
      <a 
        href="https://wa.me/919031143738" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-12 h-12 rounded-full bg-jis-green flex items-center justify-center hover:bg-green-700 
         transition-colors shadow-lg"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white" size={22} />
      </a>
    </div>
  );
};

export default FloatingButtons;
