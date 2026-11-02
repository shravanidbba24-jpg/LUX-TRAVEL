export type PackageCategory = 'holiday' | 'daytrip';

export type DestinationRegion = 'international' | 'india' | 'beaches' | 'hills' | 'heritage' | 'dayescape';

export interface TravelPackage {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  duration: string;
  priceINR: number;
  image: string;
  tags: string[];
  gradientClass: string;
  category: PackageCategory;
  region: DestinationRegion;
  rating: number;
  reviewCount: number;
  description: string;
  inclusions: string[];
  itinerary: { day: string; title: string; desc: string }[];
}

export interface Booking {
  id: string;
  packageName: string;
  packagePriceINR: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDate: string;
  persons: number;
  discountINR: number;
  totalINR: number;
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  specialRequests?: string;
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromINR: number;
}
