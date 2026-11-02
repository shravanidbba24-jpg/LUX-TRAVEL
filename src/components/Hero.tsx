import React from 'react';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenPythonStudio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16 bg-[#0B192C] overflow-hidden">
      {/* Background Image with Azure Sky Overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 scale-105 transform transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#081321]/85 via-[#0B192C]/75 to-[#0B192C]" />

      {/* Decorative Sky Blue Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0284C7]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#0284C7] text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-[#0284C7]/25">
          <Sparkles className="w-3.5 h-3.5" />
          <span>India & International Packages</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-black text-[#F0F9FF] tracking-tight leading-[1.08] mb-5">
          Travel Beyond <br />
          <span className="text-[#38BDF8] drop-shadow-sm">Your Limits</span>
        </h1>

        {/* Description */}
        <p className="text-[#94A3B8] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          Handpicked travel packages for every kind of explorer. From local day trips to international adventures — we've got you covered.
        </p>

        {/* Action Button */}
        <div className="flex justify-center w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0284C7] hover:bg-[#38BDF8] text-white font-bold text-base shadow-xl shadow-[#0284C7]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5" />
            Explore Packages →
          </button>
        </div>

        {/* Key Features Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-14 pt-8 border-t border-[#0284C7]/20 w-full max-w-2xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0284C7]/15 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">16+ Destinations</p>
              <p className="text-[#94A3B8] text-xs">Curated world tours</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0284C7]/15 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">100% Verified</p>
              <p className="text-[#94A3B8] text-xs">Luxury 4★ & 5★ hotels</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
