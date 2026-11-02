import React from 'react';
import { X, Ticket, Calendar, Users, Trash2, Download, CheckCircle2 } from 'lucide-react';
import { Booking, CurrencyConfig } from '../types/travel';

interface BookingHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  currency: CurrencyConfig;
}

export const BookingHistoryDrawer: React.FC<BookingHistoryDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  currency,
}) => {
  if (!isOpen) return null;

  const formatPrice = (amountINR: number) => {
    const converted = Math.round(amountINR * currency.rateFromINR);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const handleDownload = (b: Booking) => {
    const text = `INFINITY TRAVELS VOUCHER\nID: ${b.id}\nCustomer: ${b.customerName}\nPackage: ${b.packageName}\nDate: ${b.travelDate}\nTravelers: ${b.persons}\nTotal: ₹${b.totalINR}\nStatus: ${b.status}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Voucher_${b.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-[#0B192C] text-white flex items-center justify-between border-b border-[#0284C7]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0284C7]/20 flex items-center justify-center text-[#38BDF8]">
                <Ticket className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#38BDF8]">
                  My Bookings
                </h3>
                <p className="text-[11px] text-[#94A3B8]">
                  {bookings.length} {bookings.length === 1 ? 'trip recorded' : 'trips recorded'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookings List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F0F9FF]">
            {bookings.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Ticket className="w-12 h-12 text-[#0284C7]/40 mx-auto mb-3" />
                <h4 className="font-serif-title text-base font-bold text-[#0B192C] mb-1">
                  No Bookings Yet
                </h4>
                <p className="text-xs text-[#64748B]">
                  Select any travel package or day tour from our catalog and confirm your first trip!
                </p>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-4 border border-[#BAE6FD] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0284C7]">
                        {b.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        {b.status}
                      </span>
                    </div>

                    <h4 className="font-serif-title text-base font-bold text-[#0B192C]">
                      {b.packageName}
                    </h4>

                    <div className="text-xs text-[#64748B] space-y-1 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0EA5E9]" />
                        <span>Date: {b.travelDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0EA5E9]" />
                        <span>Travelers: {b.persons} ({b.customerName})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E0F2FE] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#64748B] block">Total Amount</span>
                      <strong className="text-sm font-bold text-[#0284C7]">
                        {formatPrice(b.totalINR)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDownload(b)}
                        className="p-1.5 text-xs text-[#64748B] hover:text-[#0B192C] rounded-lg hover:bg-[#E0F2FE] transition"
                        title="Download Voucher"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="p-1.5 text-xs text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-white border-t border-[#BAE6FD] text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full bg-[#0284C7] text-white text-xs font-semibold hover:bg-[#38BDF8] transition shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
