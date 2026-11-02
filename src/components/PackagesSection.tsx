import React, { useState, useMemo } from 'react';
import { Search, MapPin, Eye, Check, Star, SlidersHorizontal } from 'lucide-react';
import { TravelPackage, CurrencyConfig, DestinationRegion } from '../types/travel';

interface PackagesSectionProps {
  packages: TravelPackage[];
  selectedPackageId: string | null;
  onSelectPackage: (pkg: TravelPackage) => void;
  onViewDetails: (pkg: TravelPackage) => void;
  currency: CurrencyConfig;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  selectedPackageId,
  onSelectPackage,
  onViewDetails,
  currency,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | DestinationRegion>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => pkg.category === 'holiday')
      .filter((pkg) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'international') return pkg.region === 'international';
        if (activeFilter === 'india') return pkg.region !== 'international';
        return pkg.region === activeFilter;
      })
      .filter((pkg) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          pkg.name.toLowerCase().includes(q) ||
          pkg.location.toLowerCase().includes(q) ||
          pkg.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
        if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [packages, activeFilter, searchQuery, sortBy]);

  const formatPrice = (priceINR: number) => {
    const converted = Math.round(priceINR * currency.rateFromINR);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="packages" className="py-20 px-4 sm:px-8 bg-[#F0F9FF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block bg-[#0284C7] text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm">
            ✈️ Holiday Packages
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] mb-3">
            Our Travel Packages
          </h2>
          <p className="text-[#475569] text-base font-normal">
            Click on any package to select and book your dream vacation
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-[#0284C7]/20">
          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'international', label: '🌍 International' },
              { id: 'india', label: '🇮🇳 India' },
              { id: 'beaches', label: '🏖️ Beaches' },
              { id: 'hills', label: '🏔️ Hills & Snow' },
              { id: 'heritage', label: '🏛️ Heritage' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeFilter === tab.id
                    ? 'bg-[#0B192C] text-[#38BDF8] shadow-sm'
                    : 'bg-white text-[#475569] hover:bg-[#E0F2FE] border border-[#0284C7]/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#0284C7]" />
              <input
                type="text"
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#0284C7]/30 rounded-full text-xs text-[#0B192C] placeholder-[#94A3B8] focus:outline-none focus:border-[#0284C7]"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-[#0284C7]/30 rounded-full px-3 py-1.5 text-xs text-[#475569]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284C7]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border-2 ${
                  isSelected
                    ? 'border-[#0284C7] ring-4 ring-[#0284C7]/15 transform -translate-y-1.5'
                    : 'border-transparent hover:-translate-y-1'
                }`}
              >
                {/* Image & Badges */}
                <div className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${pkg.gradientClass}`}>
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    {pkg.duration}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1 bg-[#0B192C]/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] text-white">
                    <Star className="w-3 h-3 text-[#38BDF8] fill-[#38BDF8]" />
                    <span className="font-semibold">{pkg.rating}</span>
                    <span className="text-[#94A3B8]">({pkg.reviewCount})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-title text-lg font-bold text-[#0B192C] group-hover:text-[#0284C7] transition-colors leading-snug">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#64748B] mt-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
                      <span className="truncate">{pkg.location}</span>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pkg.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#E0F2FE] text-[#0369A1] text-[11px] font-medium px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-3 border-t border-[#E0F2FE] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-[#0284C7] leading-tight">
                        {formatPrice(pkg.priceINR)}
                      </div>
                      <div className="text-[11px] text-[#64748B]">/person</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(pkg);
                        }}
                        className="p-1.5 rounded-full text-[#64748B] hover:text-[#0B192C] hover:bg-[#E0F2FE] transition"
                        title="View Day-by-Day Itinerary"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPackage(pkg);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#0284C7] text-white'
                            : 'bg-[#0B192C] hover:bg-[#0284C7] text-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
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
