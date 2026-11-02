import React from 'react';
import { Plane, Heart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPythonStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#0B192C] text-[#94A3B8] border-t border-[#0284C7]/20 pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0EA5E9] flex items-center justify-center text-white shadow-md">
              <Plane className="w-4 h-4" />
            </div>
            <div className="font-serif-title text-xl font-bold text-[#38BDF8]">
              Infinity<span className="text-[#0EA5E9]"> Travels</span>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
            Crafting memories across breathtaking destinations. Handpicked holiday tours, fast day escapades, and custom bespoke itineraries.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#38BDF8]">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <span>Govt. Approved Tourism Partner</span>
          </div>
        </div>

        {/* Popular Tours */}
        <div>
          <h4 className="font-serif-title text-sm font-bold text-[#F0F9FF] uppercase tracking-wider mb-4">
            Popular Destinations
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#packages" className="hover:text-[#38BDF8] transition">Paris City of Love (7 Days)</a></li>
            <li><a href="#packages" className="hover:text-[#38BDF8] transition">Maldives Island Escape (4N/5D)</a></li>
            <li><a href="#packages" className="hover:text-[#38BDF8] transition">Dubai Desert Glamour (4N/5D)</a></li>
            <li><a href="#packages" className="hover:text-[#38BDF8] transition">Kerala Backwaters Bliss (4N/5D)</a></li>
            <li><a href="#packages" className="hover:text-[#38BDF8] transition">Ladakh Mountain Odyssey (4N/5D)</a></li>
            <li><a href="#packages" className="hover:text-[#38BDF8] transition">Rajasthan Royal Retreat (7 Days)</a></li>
          </ul>
        </div>

        {/* 24/7 Support */}
        <div>
          <h4 className="font-serif-title text-sm font-bold text-[#F0F9FF] uppercase tracking-wider mb-4">
            Contact & Support
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>+91 98765 43210 / +91 80000 12345</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>bookings@infinitytravels.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
              <span>Level 4, Horizon Tower, MG Road, Mumbai & Pune, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar matching user HTML */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#0284C7]/15 text-center text-xs">
        <p>
          © 2025 <span className="text-[#38BDF8] font-semibold">Infinity Travels</span>. All rights reserved. | Made with{' '}
          <Heart className="w-3.5 h-3.5 text-[#0EA5E9] inline mx-1 fill-current" /> for Explorers
        </p>
      </div>
    </footer>
  );
};
