import React from 'react';
import { X, MapPin, Clock, Star, CheckCircle, Compass, Calendar } from 'lucide-react';
import { TravelPackage, CurrencyConfig } from '../types/travel';

interface PackageModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onSelect: (pkg: TravelPackage) => void;
  currency: CurrencyConfig;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  pkg,
  onClose,
  onSelect,
  currency,
}) => {
  if (!pkg) return null;

  const formatPrice = (priceINR: number) => {
    const converted = Math.round(priceINR * currency.rateFromINR);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[#0284C7]/20 animate-scaleUp">
        {/* Modal Header with Hero Image */}
        <div className="relative h-60 w-full shrink-0 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-black/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Badges overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#0284C7] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {pkg.category === 'holiday' ? 'Holiday Package' : 'Day Trip'}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {pkg.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-[#38BDF8] fill-[#38BDF8]" />
                {pkg.rating} ({pkg.reviewCount})
              </span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold leading-tight">
              {pkg.name}
            </h2>
            <p className="text-xs text-[#E0F2FE]/90 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              {pkg.location}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#0B192C]">
          {/* Description */}
          <div>
            <h4 className="font-serif-title text-base font-bold text-[#0B192C] mb-1">
              Overview
            </h4>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <h4 className="font-serif-title text-base font-bold text-[#0B192C] mb-2.5">
              What's Included in This Package
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#64748B]">
                  <CheckCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <h4 className="font-serif-title text-base font-bold text-[#0B192C] mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              Detailed Schedule & Itinerary
            </h4>
            <div className="space-y-3 border-l-2 border-[#0284C7]/30 pl-4 ml-2">
              {pkg.itinerary.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#0284C7] ring-4 ring-white" />
                  <div className="text-xs font-bold text-[#0284C7] tracking-wider uppercase">
                    {step.day}
                  </div>
                  <div className="text-sm font-semibold text-[#0B192C] mt-0.5">
                    {step.title}
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5 font-light">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#F0F9FF] border-t border-[#BAE6FD] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">
              Package Rate
            </span>
            <div className="font-bold text-xl sm:text-2xl text-[#0284C7]">
              {formatPrice(pkg.priceINR)}
              <span className="text-xs text-[#64748B] font-normal"> / person</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#64748B] hover:text-[#0B192C] transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelect(pkg);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#0284C7] hover:bg-[#38BDF8] text-white font-bold text-xs shadow-md transition flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Book This Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
