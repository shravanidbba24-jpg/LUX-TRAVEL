"""
Infinity Travels — Python Core Booking Engine & CLI
Run with: python travel_engine.py
"""
import random
from datetime import datetime

class TravelEngine:
    def __init__(self):
        self.packages = [
            {"id": "p1", "name": "Paris City of Love", "price": 100000, "days": 7, "type": "international"},
            {"id": "p2", "name": "Maldives Island Escape", "price": 80000, "days": 5, "type": "international"},
            {"id": "p3", "name": "Dubai Desert Glamour", "price": 100000, "days": 5, "type": "international"},
            {"id": "p4", "name": "Kerala Backwaters Bliss", "price": 25000, "days": 5, "type": "domestic"},
            {"id": "p5", "name": "Goa Beach Party", "price": 20000, "days": 5, "type": "domestic"},
            {"id": "p6", "name": "Hyderabad Heritage Tour", "price": 25000, "days": 4, "type": "domestic"},
            {"id": "p7", "name": "Mumbai City Lights", "price": 5500, "days": 3, "type": "domestic"},
            {"id": "p8", "name": "Pune Hills Getaway", "price": 12000, "days": 4, "type": "domestic"},
            {"id": "p9", "name": "Delhi Capital Explorer", "price": 18000, "days": 3, "type": "domestic"},
            {"id": "p10", "name": "Tirupati Divine Darshan", "price": 17000, "days": 3, "type": "domestic"},
            {"id": "p11", "name": "Ladakh Mountain Odyssey", "price": 58000, "days": 5, "type": "domestic"},
            {"id": "p12", "name": "Manali Snow Adventure", "price": 40000, "days": 7, "type": "domestic"},
            {"id": "p13", "name": "Rajasthan Royal Retreat", "price": 60000, "days": 7, "type": "domestic"},
            {"id": "p14", "name": "Bangkok Exotic Getaway", "price": 69000, "days": 5, "type": "international"},
            {"id": "p15", "name": "Pune City Darshan", "price": 1100, "days": 1, "type": "daytrip"},
            {"id": "p16", "name": "Mumbai City Darshan", "price": 1300, "days": 1, "type": "daytrip"}
        ]
        self.bookings = []

    def filter_packages(self, max_budget=None, package_type=None):
        results = self.packages
        if max_budget is not None:
            results = [p for p in results if p["price"] <= max_budget]
        if package_type is not None:
            results = [p for p in results if p["type"] == package_type]
        return results

    def calculate_quote(self, package_name, persons=1, promo_code=None):
        pkg = next((p for p in self.packages if p["name"].lower() == package_name.lower()), None)
        if not pkg:
            raise ValueError(f"Package '{package_name}' not found")
        
        base_cost = pkg["price"] * persons
        discount = 0.0
        if promo_code and promo_code.upper() == "INFINITY10":
            discount = 0.10 * base_cost

        final_cost = int(base_cost - discount)
        return {
            "package": pkg["name"],
            "base_price_per_person": pkg["price"],
            "persons": persons,
            "subtotal": base_cost,
            "discount": int(discount),
            "final_total": final_cost
        }

    def create_booking(self, customer_name, customer_email, package_name, persons=1, travel_date=None, promo_code=None):
        quote = self.calculate_quote(package_name, persons, promo_code)
        booking_id = f"IT-{random.randint(100000, 999999)}"
        booking_record = {
            "booking_id": booking_id,
            "customer_name": customer_name,
            "customer_email": customer_email,
            "travel_date": travel_date or datetime.now().strftime("%Y-%m-%d"),
            "quote": quote,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "status": "CONFIRMED"
        }
        self.bookings.append(booking_record)
        return booking_record

engine = TravelEngine()

if __name__ == "__main__":
    print("✈️  INFINITY TRAVELS — PYTHON ENGINE CLI")
    print("=" * 45)
    print(f"Total Destinations Loaded: {len(engine.packages)}")
    
    print("\n1. Filter packages under ₹25,000:")
    for p in engine.filter_packages(max_budget=25000):
        print(f"   • {p['name']:<28} ₹{p['price']:>7,} ({p['days']} days)")
        
    print("\n2. Test booking for Maldives Island Escape with promo:")
    quote = engine.calculate_quote("Maldives Island Escape", persons=2, promo_code="INFINITY10")
    print(f"   Base: ₹{quote['base_price_per_person']:,} x {quote['persons']}")
    print(f"   Subtotal: ₹{quote['subtotal']:,}")
    print(f"   Discount (10%): -₹{quote['discount']:,}")
    print(f"   Final Total: ₹{quote['final_total']:,}")
    
    booking = engine.create_booking("Shravani", "shravani@email.com", "Maldives Island Escape", 2, "2026-12-10", "INFINITY10")
    print(f"\n3. Booking created with ID: {booking['booking_id']}")
