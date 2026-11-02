import React from 'react';
import { Clock, MapPin, Check, Eye } from 'lucide-react';
import { TravelPackage, CurrencyConfig } from '../types/travel';

interface DayTripsSectionProps {
  packages: TravelPackage[];
  selectedPackageId: string | null;
  onSelectPackage: (pkg: TravelPackage) => void;
  onViewDetails: (pkg: TravelPackage) => void;
  currency: CurrencyConfig;
}

export const DayTripsSection: React.FC<DayTripsSectionProps> = ({
  packages,
  selectedPackageId,
  onSelectPackage,
  onViewDetails,
  currency,
}) => {
  const dayTrips = packages.filter((p) => p.category === 'daytrip');

  const formatPrice = (priceINR: number) => {
    const converted = Math.round(priceINR * currency.rateFromINR);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="daytrips" className="py-20 px-4 sm:px-8 bg-[#E0F2FE]/50 border-t border-[#0284C7]/15">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block bg-[#0284C7] text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm">
            🌅 Quick Escapes
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] mb-3">
            Day Escapades
          </h2>
          <p className="text-[#475569] text-base font-normal">
            Short on time? These 1-day guided tours are perfect for a quick refreshing getaway!
          </p>
        </div>

        {/* Day Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {dayTrips.map((trip) => {
            const isSelected = selectedPackageId === trip.id;
            return (
              <div
                key={trip.id}
                onClick={() => onSelectPackage(trip)}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border-2 ${
                  isSelected
                    ? 'border-[#0284C7] ring-4 ring-[#0284C7]/15 transform -translate-y-1'
                    : 'border-transparent hover:-translate-y-1'
                }`}
              >
                {/* Image */}
                <div className={`relative h-48 w-full bg-gradient-to-br ${trip.gradientClass}`}>
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#38BDF8]" />
                    <span>1 Day Trip</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-title text-xl font-bold text-[#0B192C] mb-1">
                      {trip.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      <span>{trip.location}</span>
                    </div>

                    <p className="text-xs text-[#64748B] line-clamp-2 mb-4 leading-relaxed font-light">
                      {trip.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {trip.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#E0F2FE] text-[#0369A1] text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E0F2FE] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xl text-[#0284C7]">
                        {formatPrice(trip.priceINR)}
                      </div>
                      <div className="text-[11px] text-[#64748B]">/person (all inclusive)</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(trip);
                        }}
                        className="p-2 rounded-full text-[#64748B] hover:text-[#0B192C] hover:bg-[#E0F2FE] transition"
                        title="View Day Schedule"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPackage(trip);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#0284C7] text-white'
                            : 'bg-[#0B192C] hover:bg-[#0284C7] text-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
