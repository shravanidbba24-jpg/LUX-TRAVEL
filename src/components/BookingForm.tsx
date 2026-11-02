import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Users, Phone, Mail, User, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { TravelPackage, CurrencyConfig, Booking } from '../types/travel';

interface BookingFormProps {
  packages: TravelPackage[];
  selectedPackage: TravelPackage | null;
  onSelectPackageByName: (name: string) => void;
  currency: CurrencyConfig;
  onSubmitBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  packages,
  selectedPackage,
  onSelectPackageByName,
  currency,
  onSubmitBooking,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [persons, setPersons] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Min date is tomorrow
  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const basePriceINR = selectedPackage ? selectedPackage.priceINR : 0;
  const subtotalINR = basePriceINR * persons;
  const discountINR = promoApplied ? Math.round(subtotalINR * 0.1) : 0;
  const finalTotalINR = subtotalINR - discountINR;

  const formatPrice = (amountINR: number) => {
    const converted = Math.round(amountINR * currency.rateFromINR);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'INFINITY10') {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setPromoError('Invalid code. Try "INFINITY10" for 10% off!');
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pkgName = e.target.value;
    onSelectPackageByName(pkgName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }
    if (!travelDate) {
      setErrorMessage('Please select a travel departure date');
      return;
    }
    if (!selectedPackage) {
      setErrorMessage('Please select a travel package to book');
      return;
    }

    onSubmitBooking({
      packageName: selectedPackage.name,
      packagePriceINR: selectedPackage.priceINR,
      customerName: fullName.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      travelDate,
      persons,
      discountINR,
      totalINR: finalTotalINR,
    });
  };

  return (
    <section id="booking" className="py-20 px-4 sm:px-8 bg-gradient-to-br from-[#0B192C] via-[#0E243F] to-[#132E4F] text-[#F0F9FF] relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-block bg-[#0284C7] text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 shadow-md">
            🎒 Instant Reservation
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black text-[#F0F9FF] mb-2">
            Book Your Trip
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base font-light">
            Fill in your travel preferences and confirm your verified booking in seconds
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/[0.04] backdrop-blur-md border border-[#0284C7]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Selected Package Banner */}
          {selectedPackage ? (
            <div className="bg-[#0284C7]/15 border border-[#0284C7] rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
              <div>
                <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block">
                  Selected Package
                </span>
                <h4 className="text-lg sm:text-xl font-serif-title font-bold text-[#F0F9FF] mt-0.5">
                  {selectedPackage.name}
                </h4>
                <p className="text-xs text-[#94A3B8]">
                  📍 {selectedPackage.location} • {selectedPackage.duration}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-lg font-bold text-[#38BDF8]">
                  {formatPrice(selectedPackage.priceINR)}
                </span>
                <span className="text-xs text-[#94A3B8] block">/ person</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#0E243F] border border-dashed border-[#0284C7]/40 rounded-2xl p-4 mb-8 text-center text-xs text-[#94A3B8]">
              💡 No package selected yet. Choose one from the dropdown below or select a card above!
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  <User className="w-3.5 h-3.5 inline mr-1 text-[#38BDF8]" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shravani Dhumal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/[0.08] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-3 rounded-xl text-sm outline-none transition placeholder:text-[#64748B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  <Mail className="w-3.5 h-3.5 inline mr-1 text-[#38BDF8]" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. shravani@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.08] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-3 rounded-xl text-sm outline-none transition placeholder:text-[#64748B]"
                />
              </div>
            </div>

            {/* Row 2: Phone and Travel Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-[#38BDF8]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/[0.08] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-3 rounded-xl text-sm outline-none transition placeholder:text-[#64748B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#38BDF8]" />
                  Travel Departure Date
                </label>
                <input
                  type="date"
                  required
                  min={minDate}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-white/[0.08] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-3 rounded-xl text-sm outline-none transition cursor-pointer"
                />
              </div>
            </div>

            {/* Row 3: Persons and Package Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  <Users className="w-3.5 h-3.5 inline mr-1 text-[#38BDF8]" />
                  Number of Persons
                </label>
                <select
                  value={persons}
                  onChange={(e) => setPersons(Number(e.target.value))}
                  className="w-full bg-[#0E243F] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-3 rounded-xl text-sm outline-none transition cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num} className="bg-[#0B192C] text-[#F0F9FF]">
                      {num} {num === 1 ? 'Person' : 'Persons'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  <Tag className="w-3.5 h-3.5 inline mr-1 text-[#38BDF8]" />
                  Select Travel Package
                </label>
                <select
                  value={selectedPackage ? selectedPackage.name : ''}
                  onChange={handlePackageChange}
                  className="w-full bg-[#0E243F] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-3 rounded-xl text-sm outline-none transition cursor-pointer"
                >
                  <option value="" disabled className="bg-[#0B192C]">
                    -- Choose a Package --
                  </option>
                  <optgroup label="✈️ Holiday Packages" className="bg-[#0B192C] text-[#38BDF8] font-bold">
                    {packages
                      .filter((p) => p.category === 'holiday')
                      .map((p) => (
                        <option key={p.id} value={p.name} className="text-[#F0F9FF] font-normal">
                          {p.name} — {formatPrice(p.priceINR)}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="🌅 Day Escapades" className="bg-[#0B192C] text-[#38BDF8] font-bold">
                    {packages
                      .filter((p) => p.category === 'daytrip')
                      .map((p) => (
                        <option key={p.id} value={p.name} className="text-[#F0F9FF] font-normal">
                          {p.name} — {formatPrice(p.priceINR)}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="bg-white/[0.03] border border-[#0284C7]/20 p-4 rounded-2xl">
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                Have a Promo Code? (Use <span className="text-[#38BDF8] font-mono">INFINITY10</span> for 10% off)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white/[0.08] border border-[#0284C7]/30 focus:border-[#38BDF8] text-[#F0F9FF] px-4 py-2 rounded-xl text-xs uppercase font-mono tracking-wider outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#132E4F] hover:bg-[#1A3B66] text-[#38BDF8] border border-[#0284C7]/40 rounded-xl text-xs font-semibold transition"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Promo applied: 10% discount on total tour cost!
                </p>
              )}
              {promoError && (
                <p className="text-red-400 text-xs mt-2">{promoError}</p>
              )}
            </div>

            {/* Total Calculation Display */}
            <div className="bg-[#0284C7]/10 border border-dashed border-[#0284C7]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-[#94A3B8] block">Estimated Total Amount</span>
                {promoApplied && (
                  <span className="text-[11px] text-emerald-400">
                    Includes 10% promo discount (-{formatPrice(discountINR)})
                  </span>
                )}
              </div>
              <div className="text-left sm:text-right">
                <strong className="text-2xl sm:text-3xl font-bold text-[#38BDF8] font-serif-title">
                  {formatPrice(finalTotalINR)}
                </strong>
                <span className="text-xs text-[#94A3B8] block">
                  ({persons} {persons === 1 ? 'traveler' : 'travelers'})
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0284C7] hover:bg-[#38BDF8] text-white py-4 rounded-xl font-bold text-base shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-white" />
              🎒 Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
