"""
Infinity Travels — Flask Server & Vercel Entrypoint
Provides REST endpoints and static file serving for Infinity Travels.
"""
import os
import random
from datetime import datetime

try:
    from flask import Flask, jsonify, request, send_from_directory
except ImportError:
    # Minimal fallback in case Flask is not installed in local environment
    Flask = None

PACKAGES = [
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

BOOKINGS = []

if Flask:
    app = Flask(__name__, static_folder="dist", static_url_path="")

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({
            "status": "healthy",
            "service": "Infinity Travels Flask Engine",
            "version": "1.0.0",
            "destinations_count": len(PACKAGES)
        })

    @app.route("/api/packages", methods=["GET"])
    def get_packages():
        pkg_type = request.args.get("type")
        max_budget = request.args.get("max_budget", type=int)
        
        filtered = PACKAGES
        if pkg_type:
            filtered = [p for p in filtered if p["type"] == pkg_type]
        if max_budget is not None:
            filtered = [p for p in filtered if p["price"] <= max_budget]
            
        return jsonify({"success": True, "count": len(filtered), "packages": filtered})

    @app.route("/api/quote", methods=["POST"])
    def calculate_quote():
        data = request.get_json(silent=True) or {}
        package_name = data.get("package_name") or data.get("package")
        persons = int(data.get("persons", 1))
        promo_code = (data.get("promo_code") or "").strip().upper()
        
        pkg = next((p for p in PACKAGES if p["name"].lower() == (package_name or "").lower()), None)
        if not pkg:
            pkg = PACKAGES[0]
            
        base_cost = pkg["price"] * persons
        discount = int(0.10 * base_cost) if promo_code == "INFINITY10" else 0
        final_total = base_cost - discount
        
        return jsonify({
            "success": True,
            "package": pkg["name"],
            "base_price": pkg["price"],
            "persons": persons,
            "subtotal": base_cost,
            "discount": discount,
            "final_total": final_total
        })

    @app.route("/api/book", methods=["POST"])
    def create_booking():
        data = request.get_json(silent=True) or {}
        booking_id = f"IT-{random.randint(100000, 999999)}"
        booking = {
            "booking_id": booking_id,
            "customer_name": data.get("customer_name", "Valued Traveler"),
            "customer_email": data.get("customer_email", ""),
            "customer_phone": data.get("customer_phone", ""),
            "package_name": data.get("package_name", "Maldives Island Escape"),
            "persons": int(data.get("persons", 1)),
            "travel_date": data.get("travel_date", datetime.now().strftime("%Y-%m-%d")),
            "status": "CONFIRMED",
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        BOOKINGS.append(booking)
        return jsonify({"success": True, "booking": booking})

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        dist_dir = os.path.join(os.path.dirname(__file__), "dist")
        if os.path.exists(dist_dir) and path and os.path.exists(os.path.join(dist_dir, path)):
            return send_from_directory(dist_dir, path)
        if os.path.exists(dist_dir) and os.path.exists(os.path.join(dist_dir, "index.html")):
            return send_from_directory(dist_dir, "index.html")
        return jsonify({
            "app": "Infinity Travels",
            "status": "Flask API running on Vercel",
            "endpoints": ["/api/health", "/api/packages", "/api/quote", "/api/book"],
            "frontend": "Build with `npm run build` to generate static frontend in dist/"
        })
else:
    # Basic WSGI application fallback
    def app(environ, start_response):
        status = '200 OK'
        headers = [('Content-type', 'application/json; charset=utf-8')]
        start_response(status, headers)
        return [b'{"app": "Infinity Travels", "status": "WSGI fallback active"}']

if __name__ == "__main__":
    if Flask:
        app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    else:
        print("Flask is not installed. Run: pip install flask")
