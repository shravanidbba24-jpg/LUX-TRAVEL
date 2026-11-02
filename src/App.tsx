/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackagesSection } from './components/PackagesSection';
import { DayTripsSection } from './components/DayTripsSection';
import { BookingForm } from './components/BookingForm';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { PackageModal } from './components/PackageModal';
import { BookingHistoryDrawer } from './components/BookingHistoryDrawer';
import { PythonFrontendStudio } from './components/PythonFrontendStudio';
import { Footer } from './components/Footer';
import { PACKAGES, CURRENCIES } from './data/packages';
import { TravelPackage, Booking, CurrencyCode } from './types/travel';

export default function App() {
  const [activeView, setActiveView] = useState<'travel' | 'python'>('travel');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('INR');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(PACKAGES[0]);
  const [modalPackage, setModalPackage] = useState<TravelPackage | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('infinity_travels_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('infinity_travels_bookings', JSON.stringify(bookings));
    } catch {
      // Ignore storage errors
    }
  }, [bookings]);

  const handleSelectPackage = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    if (activeView !== 'travel') {
      setActiveView('travel');
    }
    // Smooth scroll down to booking section
    setTimeout(() => {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleSelectPackageByName = (pkgName: string) => {
    const found = PACKAGES.find((p) => p.name === pkgName);
    if (found) {
      setSelectedPackage(found);
    }
  };

  const handleCreateBooking = (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>
  ) => {
    const bookingId = `IT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: bookingId,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };

    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const currencyConfig = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0B192C] flex flex-col font-sans-body">
      {/* Navbar */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        bookingCount={bookings.length}
        onOpenBookings={() => setIsHistoryDrawerOpen(true)}
        activeView={activeView}
        onToggleView={setActiveView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'travel' ? (
          <div id="top" className="animate-fadeIn">
            {/* Hero Section */}
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('packages');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPythonStudio={() => setActiveView('python')}
            />

            {/* Holiday Packages Catalog */}
            <PackagesSection
              packages={PACKAGES}
              selectedPackageId={selectedPackage?.id || null}
              onSelectPackage={handleSelectPackage}
              onViewDetails={setModalPackage}
              currency={currencyConfig}
            />

            {/* Quick Escapes Day Trips */}
            <DayTripsSection
              packages={PACKAGES}
              selectedPackageId={selectedPackage?.id || null}
              onSelectPackage={handleSelectPackage}
              onViewDetails={setModalPackage}
              currency={currencyConfig}
            />

            {/* Booking Engine */}
            <BookingForm
              packages={PACKAGES}
              selectedPackage={selectedPackage}
              onSelectPackageByName={handleSelectPackageByName}
              currency={currencyConfig}
              onSubmitBooking={handleCreateBooking}
            />
          </div>
        ) : (
          <PythonFrontendStudio onBackToApp={() => setActiveView('travel')} />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenPythonStudio={() => setActiveView('python')} />

      {/* Modals & Overlays */}
      <PackageModal
        pkg={modalPackage}
        onClose={() => setModalPackage(null)}
        onSelect={handleSelectPackage}
        currency={currencyConfig}
      />

      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        currency={currencyConfig}
      />

      <BookingHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        currency={currencyConfig}
      />
    </div>
  );
}
