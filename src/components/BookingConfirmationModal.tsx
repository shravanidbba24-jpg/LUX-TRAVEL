import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, Download, Calendar, Users, MapPin, Ticket, X } from 'lucide-react';
import { Booking, CurrencyConfig } from '../types/travel';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
  currency: CurrencyConfig;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  currency,
}) => {
  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284C7', '#38BDF8', '#0EA5E9', '#0B192C'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [booking]);

  if (!booking) return null;

  const formatPrice = (amountINR: number) => {
    const converted = Math.round(amountINR * currency.rateFromINR);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  const formattedDate = new Date(booking.travelDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownloadReceipt = () => {
    const text = `================================================
INFINITY TRAVELS — OFFICIAL BOOKING CONFIRMATION
================================================
Booking Reference: ${booking.id}
Date Issued:       ${booking.createdAt}
Status:            ${booking.status}

TRAVELER DETAILS:
-----------------
Passenger Name:    ${booking.customerName}
Contact Email:     ${booking.customerEmail}
Contact Phone:     ${booking.customerPhone}

TOUR DETAILS:
-------------
Package Booked:    ${booking.packageName}
Departure Date:    ${formattedDate}
Total Travelers:   ${booking.persons} person(s)

PAYMENT SUMMARY:
----------------
Base Fare:         ${formatPrice(booking.packagePriceINR * booking.persons)}
Discount Applied:  ${formatPrice(booking.discountINR)}
TOTAL PAID:        ${formatPrice(booking.totalINR)}

Important Instructions:
- Please carry a valid government-issued photo ID during travel.
- Our representative will contact you via WhatsApp/Email 24 hours prior.
- Helpline / Concierge Support: +91 98765 43210

Thank you for choosing Infinity Travels!
================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `InfinityTravels_Ticket_${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-[#0284C7]/20 relative animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#64748B] hover:text-[#0B192C] hover:bg-[#E0F2FE] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Icon */}
        <div className="w-16 h-16 rounded-full bg-[#0284C7]/15 border-2 border-[#0284C7] flex items-center justify-center mx-auto mb-4 text-3xl">
          🎉
        </div>

        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0B192C] mb-1">
          Booking Confirmed!
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mb-6">
          Your dream trip is booked! Our travel specialists will contact you shortly with your detailed travel voucher.
        </p>

        {/* Booking ID Pill */}
        <div className="bg-[#E0F2FE] border border-[#0284C7]/30 rounded-2xl p-3 mb-6">
          <span className="text-[10px] font-bold text-[#0369A1] uppercase tracking-wider block">
            Booking ID
          </span>
          <strong className="text-xl font-mono tracking-widest text-[#0284C7]">
            {booking.id}
          </strong>
        </div>

        {/* Details List */}
        <div className="bg-[#F0F9FF] rounded-2xl p-4 text-left text-xs space-y-2.5 mb-6 border border-[#BAE6FD]">
          <div className="flex items-center justify-between pb-2 border-b border-[#BAE6FD]">
            <span className="text-[#64748B]">Passenger Name</span>
            <span className="font-bold text-[#0B192C]">{booking.customerName}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#BAE6FD]">
            <span className="text-[#64748B]">Email Address</span>
            <span className="font-medium text-[#0B192C]">{booking.customerEmail}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#BAE6FD]">
            <span className="text-[#64748B]">Selected Tour</span>
            <span className="font-bold text-[#0284C7] text-right truncate max-w-[180px]">
              {booking.packageName}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#BAE6FD]">
            <span className="text-[#64748B]">Travel Date</span>
            <span className="font-semibold text-[#0B192C]">{formattedDate}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[#BAE6FD]">
            <span className="text-[#64748B]">Travelers</span>
            <span className="font-semibold text-[#0B192C]">{booking.persons} Person(s)</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-[#0B192C]">Total Paid</span>
            <span className="text-base font-bold text-[#0284C7]">
              {formatPrice(booking.totalINR)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleDownloadReceipt}
            className="w-full py-3 rounded-full bg-[#0B192C] hover:bg-[#132A45] text-[#38BDF8] font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Download Printable Voucher
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#0284C7] hover:bg-[#38BDF8] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            Done ✓
          </button>
        </div>
      </div>
    </div>
  );
};
