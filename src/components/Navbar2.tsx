import { Mail, MapPin, Phone } from "lucide-react";

export default function TopNavbar() {
  return (
    <div className="bg-gray-50 border-b-2 border-[#00bfff] py-4 px-6 flex flex-wrap md:flex-nowrap justify-between items-center text-sm text-gray-800 font-medium shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 w-full md:w-auto mb-4 md:mb-0">
        <div className="flex items-center space-x-1">
          <img
            src="https://www.jharkhanditsolutions.com/wp-content/uploads/2016/10/logo-1.png"
            alt="mobile-logo"
          />
          <div>
            <h1 className="text-[#ff9900] text-2xl font-bold leading-tight">
              JIS
            </h1>
            <p className="text-[#00bfff] text-[10px] tracking-wider uppercase">
              Jharkhand IT Solutions
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start space-x-3 w-full md:w-auto mb-4 md:mb-0">
        <MapPin className="text-gray-500 mt-1" size={20} />
        <p className="leading-snug">
          Riverview Colony, Near Vidya Vikas Public School,
          <br />
          Boriya Road, Morabadi, Ranchi – 834006
        </p>
      </div>

      {/* Phone */}
      <div className="flex items-start space-x-3 w-full md:w-auto mb-4 md:mb-0">
        <Phone className="text-gray-500 mt-1" size={20} />
        <div>
          <p>+91 9031143738</p>
          <p>+91 7033333433</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start space-x-3 w-full md:w-auto">
        <Mail className="text-gray-500 mt-1" size={20} />
        <div>
          <p>info@jharkhanditsolutions.com</p>
          <p>jharkhanditsolutions@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
