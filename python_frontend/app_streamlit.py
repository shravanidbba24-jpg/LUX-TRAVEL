"""
Infinity Travels — Streamlit Python Frontend
Run with: streamlit run app_streamlit.py
"""
import streamlit as st
from datetime import date, timedelta
import random

st.set_page_config(
    page_title="Infinity Travels — Your Journey Begins Here",
    page_icon="✈️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling (Gold & Terracotta luxury palette matching the original HTML)
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600&display=swap');
    
    .main-title {
        font-family: 'Playfair Display', serif;
        font-size: 3.2rem;
        color: #1A1208;
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 0.2rem;
    }
    .main-subtitle {
        color: #C8922A;
        font-family: 'Playfair Display', serif;
    }
    .badge-tag {
        background: #C4613A;
        color: white;
        padding: 4px 14px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        display: inline-block;
    }
    .price-text {
        color: #C8922A;
        font-size: 1.4rem;
        font-weight: 700;
    }
</style>
""", unsafe_allow_html=True)

# Dataset matching the 16 packages in original HTML
PACKAGES = [
    {"name": "Paris City of Love", "price": 100000, "duration": "7 Days", "loc": "Paris, France", "tags": ["🏨 Hotel", "✈️ Flight", "🗺️ Sightseeing"]},
    {"name": "Maldives Island Escape", "price": 80000, "duration": "4N/5D", "loc": "Maldives", "tags": ["🏨 Resort", "🤿 Snorkeling", "🍽️ Meals"]},
    {"name": "Dubai Desert Glamour", "price": 100000, "duration": "4N/5D", "loc": "Dubai, UAE", "tags": ["🏨 Hotel", "🐪 Desert Safari", "✈️ Flight"]},
    {"name": "Kerala Backwaters Bliss", "price": 25000, "duration": "4N/5D", "loc": "Kerala, India", "tags": ["🛶 Houseboat", "🌿 Nature", "🍽️ Meals"]},
    {"name": "Goa Beach Party", "price": 20000, "duration": "4N/5D", "loc": "Goa, India", "tags": ["🏨 Hotel", "🚌 Transport", "🏄 Water Sports"]},
    {"name": "Hyderabad Heritage Tour", "price": 25000, "duration": "3N/4D", "loc": "Hyderabad, India", "tags": ["🏨 Hotel", "🍛 Biryani Trail", "🗺️ Sightseeing"]},
    {"name": "Mumbai City Lights", "price": 5500, "duration": "2N/3D", "loc": "Mumbai, India", "tags": ["🏨 Hotel", "🚌 Transport", "🎭 Bollywood"]},
    {"name": "Pune Hills Getaway", "price": 12000, "duration": "3N/4D", "loc": "Pune, India", "tags": ["🏨 Hotel", "🌄 Forts", "🚌 Transport"]},
    {"name": "Delhi Capital Explorer", "price": 18000, "duration": "2N/3D", "loc": "Delhi, India", "tags": ["🏨 Hotel", "🕌 Heritage", "🍢 Street Food"]},
    {"name": "Tirupati Divine Darshan", "price": 17000, "duration": "2N/3D", "loc": "Tirupati, Andhra Pradesh", "tags": ["🏨 Hotel", "🚌 Transport", "🎟️ VIP Darshan"]},
    {"name": "Ladakh Mountain Odyssey", "price": 58000, "duration": "4N/5D", "loc": "Leh, Nubra, Pangong", "tags": ["⛺ Camping", "🏍️ Bike Ride", "🌌 Stargazing"]},
    {"name": "Manali Snow Adventure", "price": 40000, "duration": "7 Days", "loc": "Manali, Himachal Pradesh", "tags": ["🏨 Hotel", "⛷️ Snow Sports", "🚌 Transport"]},
    {"name": "Rajasthan Royal Retreat", "price": 60000, "duration": "7 Days", "loc": "Jaipur · Jodhpur · Udaipur", "tags": ["🏯 Heritage Hotel", "🐪 Camel Safari", "🎨 Culture"]},
    {"name": "Bangkok Exotic Getaway", "price": 69000, "duration": "4N/5D", "loc": "Bangkok, Thailand", "tags": ["🏨 Hotel", "✈️ Flight", "🌃 Nightlife"]},
    {"name": "Pune City Darshan", "price": 1100, "duration": "1 Day", "loc": "Pune · 1 Day Trip", "tags": ["🚌 AC Bus", "🗺️ Guided Tour"]},
    {"name": "Mumbai City Darshan", "price": 1300, "duration": "1 Day", "loc": "Mumbai · 1 Day Trip", "tags": ["🚌 AC Bus", "🗺️ Guided Tour"]}
]

if "selected_pkg" not in st.session_state:
    st.session_state.selected_pkg = PACKAGES[0]["name"]
if "bookings_list" not in st.session_state:
    st.session_state.bookings_list = []

# Hero Header
col1, col2 = st.columns([3, 1])
with col1:
    st.markdown('<span class="badge-tag">✈️ India & International Packages</span>', unsafe_allow_html=True)
    st.markdown('<div class="main-title">Travel Beyond <span class="main-subtitle">Your Limits</span></div>', unsafe_allow_html=True)
    st.write("Handpicked travel packages for every kind of explorer. From local day trips to international adventures — we've got you covered.")

with col2:
    st.metric(label="Curated Tours", value=f"{len(PACKAGES)} Destinations", delta="Best Price Guarantee")

st.divider()

# Sidebar: Booking Form
st.sidebar.markdown("### 🎒 Book Your Trip")
with st.sidebar.form("booking_form"):
    pkg_names = [p["name"] for p in PACKAGES]
    default_idx = pkg_names.index(st.session_state.selected_pkg) if st.session_state.selected_pkg in pkg_names else 0
    chosen_pkg = st.selectbox("Select Package", pkg_names, index=default_idx)
    
    pkg_data = next(p for p in PACKAGES if p["name"] == chosen_pkg)
    
    full_name = st.text_input("Full Name", placeholder="e.g. Shravani")
    email = st.text_input("Email", placeholder="e.g. shravani@email.com")
    phone = st.text_input("Phone Number", placeholder="e.g. 9876543210")
    travel_date = st.date_input("Travel Date", min_value=date.today() + timedelta(days=1))
    persons = st.number_input("No. of Persons", min_value=1, max_value=20, value=2, step=1)
    
    promo = st.text_input("Promo Code (Try 'INFINITY10')", placeholder="Promo Code")
    discount_pct = 0.10 if promo.strip().upper() == "INFINITY10" else 0.0
    
    subtotal = pkg_data["price"] * persons
    discount_amount = int(subtotal * discount_pct)
    final_total = subtotal - discount_amount
    
    st.markdown(f"**Base Price:** ₹{pkg_data['price']:,} / person")
    if discount_pct > 0:
        st.markdown(f"🎉 **Promo Applied (10% OFF):** -₹{discount_amount:,}")
    st.markdown(f"### Total Amount: :green[₹{final_total:,}]")
    
    submitted = st.form_submit_button("Confirm Booking 🚀", use_container_width=True)
    if submitted:
        if not full_name:
            st.error("Please enter your full name!")
        elif not email or "@" not in email:
            st.error("Please enter a valid email address!")
        elif not phone or len(phone) < 10:
            st.error("Please enter a valid 10-digit phone number!")
        else:
            booking_id = f"IT-{random.randint(100000, 999999)}"
            new_booking = {
                "id": booking_id,
                "name": full_name,
                "email": email,
                "package": chosen_pkg,
                "date": str(travel_date),
                "persons": persons,
                "total": final_total
            }
            st.session_state.bookings_list.append(new_booking)
            st.success(f"🎉 Booking Confirmed! ID: **{booking_id}**")
            st.balloons()

# Main View: Tabs
tab1, tab2, tab3 = st.tabs(["✈️ Holiday Packages", "🌅 Day Escapades", "📋 My Bookings"])

with tab1:
    holidays = [p for p in PACKAGES if "Day Trip" not in p["loc"]]
    cols = st.columns(3)
    for i, p in enumerate(holidays):
        with cols[i % 3]:
            with st.container(border=True):
                st.caption(f"📍 {p['loc']} • {p['duration']}")
                st.subheader(p["name"])
                st.write(" ".join([f"`{t}`" for t in p["tags"]]))
                st.markdown(f'<span class="price-text">₹{p["price"]:,}</span> <small>/person</small>', unsafe_allow_html=True)
                if st.button("Select Package", key=f"sel_{p['name']}"):
                    st.session_state.selected_pkg = p["name"]
                    st.rerun()

with tab2:
    day_trips = [p for p in PACKAGES if "Day Trip" in p["loc"]]
    cols = st.columns(2)
    for i, p in enumerate(day_trips):
        with cols[i % 2]:
            with st.container(border=True):
                st.caption(f"📍 {p['loc']}")
                st.subheader(p["name"])
                st.write(" ".join([f"`{t}`" for t in p["tags"]]))
                st.markdown(f'<span class="price-text">₹{p["price"]:,}</span> <small>/person</small>', unsafe_allow_html=True)
                if st.button("Select Day Trip", key=f"sel_day_{p['name']}"):
                    st.session_state.selected_pkg = p["name"]
                    st.rerun()

with tab3:
    if not st.session_state.bookings_list:
        st.info("No bookings made yet in this session. Choose a tour and submit via sidebar!")
    else:
        st.subheader("Your Confirmed Bookings")
        for b in reversed(st.session_state.bookings_list):
            with st.expander(f"Booking {b['id']} — {b['package']} (₹{b['total']:,})"):
                st.write(f"**Customer:** {b['name']} ({b['email']})")
                st.write(f"**Travel Date:** {b['date']}")
                st.write(f"**Persons:** {b['persons']}")
                st.write(f"**Total Amount:** ₹{b['total']:,}")
                st.download_button(
                    "Download Voucher (.txt)",
                    data=f"INFINITY TRAVELS CONFIRMATION\\nBooking ID: {b['id']}\\nCustomer: {b['name']}\\nPackage: {b['package']}\\nDate: {b['date']}\\nTravelers: {b['persons']}\\nTotal: ₹{b['total']:,}",
                    file_name=f"Voucher_{b['id']}.txt",
                    key=f"dl_{b['id']}"
                )
