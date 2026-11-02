import React from 'react';
import { Plane, Ticket, Globe } from 'lucide-react';
import { CurrencyCode, CurrencyConfig } from '../types/travel';
import { CURRENCIES } from '../data/packages';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  bookingCount: number;
  onOpenBookings: () => void;
  activeView: 'travel' | 'python';
  onToggleView: (view: 'travel' | 'python') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  bookingCount,
  onOpenBookings,
  activeView,
  onToggleView,
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#0B192C]/95 backdrop-blur-md border-b border-[#0284C7]/20 transition-all">
      {/* Logo */}
      <a
        href="#top"
        onClick={(e) => {
          if (activeView !== 'travel') {
            e.preventDefault();
            onToggleView('travel');
          }
        }}
        className="flex items-center gap-2 group text-decoration-none"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0EA5E9] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
          <Plane className="w-5 h-5 text-white" />
        </div>
        <div className="font-serif-title text-xl sm:text-2xl font-bold tracking-tight text-[#38BDF8]">
          Infinity<span className="text-[#0EA5E9]"> Travels</span>
        </div>
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => onToggleView('travel')}
          className={`transition ${activeView === 'travel' ? 'text-[#38BDF8] font-semibold' : 'text-[#E0F2FE]/80 hover:text-[#38BDF8]'}`}
        >
          Destinations
        </button>
        <a
          href="#daytrips"
          onClick={() => {
            if (activeView !== 'travel') onToggleView('travel');
          }}
          className="text-[#E0F2FE]/80 hover:text-[#38BDF8] transition"
        >
          Day Trips
        </a>
        <a
          href="#booking"
          onClick={() => {
            if (activeView !== 'travel') onToggleView('travel');
          }}
          className="text-[#E0F2FE]/80 hover:text-[#38BDF8] transition"
        >
          Book Now
        </a>
      </div>

      {/* Right Controls: Currency & Bookings */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Currency Switcher */}
        <div className="relative flex items-center bg-[#132A45] border border-[#0284C7]/30 rounded-lg px-2 py-1 text-xs text-[#E0F2FE]">
          <Globe className="w-3 h-3 text-[#38BDF8] mr-1 hidden sm:block" />
          <select
            value={currentCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
            className="bg-transparent text-xs text-[#E0F2FE] focus:outline-none cursor-pointer pr-1"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c} className="bg-[#0B192C] text-[#E0F2FE]">
                {CURRENCIES[c].symbol} {c}
              </option>
            ))}
          </select>
        </div>

        {/* My Bookings Button */}
        <button
          onClick={onOpenBookings}
          className="relative p-2 rounded-xl bg-[#132A45] hover:bg-[#1C3B61] text-[#E0F2FE] border border-[#0284C7]/30 transition"
          title="View Your Bookings"
        >
          <Ticket className="w-4 h-4 text-[#38BDF8]" />
          {bookingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0284C7] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {bookingCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
