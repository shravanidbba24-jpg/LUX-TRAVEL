export interface PythonFrameworkCode {
  id: string;
  name: string;
  category: 'Modern Web' | 'Full-Stack Web' | 'Desktop GUI' | 'Browser WASM';
  filename: string;
  description: string;
  runCommand: string;
  installCommand: string;
  code: string;
}

export const PYTHON_FRAMEWORKS: PythonFrameworkCode[] = [
  {
    id: 'streamlit',
    name: 'Streamlit Frontend',
    category: 'Modern Web',
    filename: 'app_streamlit.py',
    description: 'Interactive Python web frontend with reactive state, sidebars, grid cards, booking calculation, and receipt generation.',
    installCommand: 'pip install streamlit',
    runCommand: 'streamlit run app_streamlit.py',
    code: `"""
Infinity Travels — Streamlit Frontend
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
        color: #0B192C;
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 0.2rem;
    }
    .main-subtitle {
        color: #0284C7;
        font-family: 'Playfair Display', serif;
    }
    .badge-tag {
        background: #0EA5E9;
        color: white;
        padding: 4px 14px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        display: inline-block;
    }
    .travel-card {
        background: white;
        border-radius: 16px;
        padding: 1.2rem;
        box-shadow: 0 4px 20px rgba(26,18,8,0.08);
        border: 1px solid #E0F2FE;
        margin-bottom: 1.2rem;
    }
    .price-text {
        color: #0284C7;
        font-size: 1.4rem;
        font-weight: 700;
    }
</style>
""", unsafe_allow_html=True)

# Dataset
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
    st.metric(label="Available Destinations", value=f"{len(PACKAGES)}+", delta="Best Price Guarantee")

st.divider()

# Sidebar: Instant Booking Form
st.sidebar.markdown("### 🎒 Book Your Trip")
with st.sidebar.form("booking_form"):
    pkg_names = [p["name"] for p in PACKAGES]
    default_idx = pkg_names.index(st.session_state.selected_pkg) if st.session_state.selected_pkg in pkg_names else 0
    chosen_pkg = st.selectbox("Select Package", pkg_names, index=default_idx)
    
    pkg_data = next(p for p in PACKAGES if p["name"] == chosen_pkg)
    
    full_name = st.text_input("Full Name", placeholder="e.g. Shravani Dhumal")
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

# Main View: Package Catalog
tab1, tab2, tab3 = st.tabs(["✈️ Holiday Packages", "🌅 Day Escapades", "📋 My Bookings"])

with tab1:
    holidays = [p for p in PACKAGES if "Day Trip" not in p["loc"]]
    cols = st.columns(3)
    for i, p in enumerate(holidays):
        with cols[i % 3]:
            with st.container(border=True):
                st.caption(f"📍 {p['loc']} • {p['duration']}")
                st.subheader(p["name"])
                st.write(" ".join([f"\`{t}\`" for t in p["tags"]]))
                st.markdown(f'<span class="price-text">₹{p["price"]:,}</span> <small>/person</small>', unsafe_allow_html=True)
                if st.button("Select for Booking", key=f"sel_{p['name']}"):
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
                st.write(" ".join([f"\`{t}\`" for t in p["tags"]]))
                st.markdown(f'<span class="price-text">₹{p["price"]:,}</span> <small>/person</small>', unsafe_allow_html=True)
                if st.button("Select Day Trip", key=f"sel_day_{p['name']}"):
                    st.session_state.selected_pkg = p["name"]
                    st.rerun()

with tab3:
    if not st.session_state.bookings_list:
        st.info("No bookings made yet in this session. Select a package and book via the sidebar!")
    else:
        st.subheader("Your Confirmed Bookings")
        for b in reversed(st.session_state.bookings_list):
            with st.expander(f"Booking {b['id']} — {b['package']} (₹{b['total']:,})"):
                st.write(f"**Customer:** {b['name']} ({b['email']})")
                st.write(f"**Travel Date:** {b['date']}")
                st.write(f"**Persons:** {b['persons']}")
                st.write(f"**Total Amount Paid:** ₹{b['total']:,}")
                st.download_button(
                    "Download Ticket / Receipt (.txt)",
                    data=f"INFINITY TRAVELS BOOKING CONFIRMATION\\nBooking ID: {b['id']}\\nName: {b['name']}\\nPackage: {b['package']}\\nTravel Date: {b['date']}\\nPersons: {b['persons']}\\nTotal: ₹{b['total']:,}\\nStatus: Confirmed",
                    file_name=f"ticket_{b['id']}.txt",
                    key=f"dl_{b['id']}"
                )
`
  },
  {
    id: 'nicegui',
    name: 'NiceGUI Frontend',
    category: 'Modern Web',
    filename: 'app_nicegui.py',
    description: 'Pure Python web frontend powered by FastAPI + Tailwind CSS with reactive components, dialogs, and real-time computation.',
    installCommand: 'pip install nicegui',
    runCommand: 'python app_nicegui.py',
    code: `"""
Infinity Travels — NiceGUI Pure Python Frontend
Run with: python app_nicegui.py
"""
from nicegui import ui, app
import random

ui.page_title('Infinity Travels — Pure Python Frontend')

# Theme styling
ui.add_head_html("""
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
    body { font-family: 'DM Sans', sans-serif; background-color: #F0F9FF; color: #0B192C; }
    .font-serif { font-family: 'Playfair Display', serif; }
</style>
""")

PACKAGES = [
    {"name": "Paris City of Love", "price": 100000, "duration": "7 Days", "loc": "Paris, France"},
    {"name": "Maldives Island Escape", "price": 80000, "duration": "4N/5D", "loc": "Maldives"},
    {"name": "Dubai Desert Glamour", "price": 100000, "duration": "4N/5D", "loc": "Dubai, UAE"},
    {"name": "Kerala Backwaters Bliss", "price": 25000, "duration": "4N/5D", "loc": "Kerala, India"},
    {"name": "Goa Beach Party", "price": 20000, "duration": "4N/5D", "loc": "Goa, India"},
    {"name": "Hyderabad Heritage Tour", "price": 25000, "duration": "3N/4D", "loc": "Hyderabad, India"},
    {"name": "Mumbai City Lights", "price": 5500, "duration": "2N/3D", "loc": "Mumbai, India"},
    {"name": "Pune Hills Getaway", "price": 12000, "duration": "3N/4D", "loc": "Pune, India"},
    {"name": "Delhi Capital Explorer", "price": 18000, "duration": "2N/3D", "loc": "Delhi, India"},
    {"name": "Tirupati Divine Darshan", "price": 17000, "duration": "2N/3D", "loc": "Tirupati, Andhra Pradesh"},
    {"name": "Ladakh Mountain Odyssey", "price": 58000, "duration": "4N/5D", "loc": "Leh, Nubra, Pangong"},
    {"name": "Manali Snow Adventure", "price": 40000, "duration": "7 Days", "loc": "Manali, Himachal Pradesh"},
    {"name": "Rajasthan Royal Retreat", "price": 60000, "duration": "7 Days", "loc": "Jaipur · Jodhpur · Udaipur"},
    {"name": "Bangkok Exotic Getaway", "price": 69000, "duration": "4N/5D", "loc": "Bangkok, Thailand"},
    {"name": "Pune City Darshan", "price": 1100, "duration": "1 Day", "loc": "Pune · 1 Day Trip"},
    {"name": "Mumbai City Darshan", "price": 1300, "duration": "1 Day", "loc": "Mumbai · 1 Day Trip"}
]

state = {
    'selected_pkg': PACKAGES[0]['name'],
    'persons': 1,
    'total': PACKAGES[0]['price']
}

def update_total():
    pkg = next(p for p in PACKAGES if p['name'] == state['selected_pkg'])
    state['total'] = pkg['price'] * state['persons']
    total_label.set_text(f"₹{state['total']:,}")

def select_package(pkg_name):
    state['selected_pkg'] = pkg_name
    select_input.value = pkg_name
    update_total()
    ui.notify(f"Selected: {pkg_name}", color="amber-8")

# Header
with ui.header().classes('bg-[#0B192C] text-white px-8 py-4 flex justify-between items-center shadow-lg'):
    ui.label('Infinity Travels').classes('text-2xl font-serif text-[#38BDF8] font-bold')
    with ui.row().classes('gap-4'):
        ui.link('Packages', '#packages').classes('text-[#E0F2FE] hover:text-[#38BDF8]')
        ui.link('Book Now', '#booking').classes('text-[#E0F2FE] hover:text-[#38BDF8]')

# Hero
with ui.column().classes('w-full items-center text-center py-16 px-4 bg-[#0B192C] text-white'):
    ui.label('✈️ INDIA & INTERNATIONAL PACKAGES').classes('bg-[#0EA5E9] text-white px-4 py-1 rounded-full text-xs font-bold')
    ui.label('Travel Beyond Your Limits').classes('text-5xl font-serif text-[#E0F2FE] mt-4 font-bold')
    ui.label('Handpicked travel packages for every kind of explorer.').classes('text-[#A89880] text-lg max-w-xl mt-2')

# Packages Grid
ui.label('Our Travel Packages').classes('text-3xl font-serif text-[#0B192C] text-center w-full mt-12 font-bold')
with ui.grid(columns=3).classes('w-full max-w-6xl mx-auto gap-6 p-6'):
    for p in PACKAGES:
        with ui.card().classes('bg-white p-6 rounded-2xl shadow-md border border-[#E0F2FE] hover:shadow-xl transition'):
            ui.label(p['loc']).classes('text-xs text-[#6B5B45]')
            ui.label(p['name']).classes('text-xl font-serif font-bold text-[#0B192C]')
            ui.label(f"Duration: {p['duration']}").classes('text-sm text-gray-500')
            with ui.row().classes('w-full justify-between items-center mt-4'):
                ui.label(f"₹{p['price']:,}").classes('text-xl font-bold text-[#0284C7]')
                ui.button('Select', on_click=lambda p_name=p['name']: select_package(p_name)).classes('bg-[#0B192C] text-white rounded-full px-4')

# Booking Section
with ui.card().classes('w-full max-w-xl mx-auto my-12 p-8 bg-[#0B192C] text-white rounded-3xl shadow-2xl'):
    ui.label('🎒 Book Your Trip').classes('text-2xl font-serif text-[#38BDF8] font-bold text-center w-full')
    
    select_input = ui.select([p['name'] for p in PACKAGES], value=state['selected_pkg'], label='Package',
                             on_change=lambda e: (state.update({'selected_pkg': e.value}), update_total())).classes('w-full')
    name_input = ui.input('Full Name', placeholder='e.g. Shravani').classes('w-full')
    email_input = ui.input('Email', placeholder='e.g. shravani@email.com').classes('w-full')
    phone_input = ui.input('Phone Number', placeholder='e.g. 9876543210').classes('w-full')
    persons_slider = ui.slider(min=1, max=10, value=1, on_change=lambda e: (state.update({'persons': e.value}), update_total())).classes('w-full')
    ui.label().bind_text_from(persons_slider, 'value', backward=lambda v: f"Travelers: {v} person(s)")

    with ui.row().classes('w-full justify-between items-center bg-[#2D1E0A] p-4 rounded-xl my-4'):
        ui.label('Total Amount:').classes('text-gray-300')
        total_label = ui.label(f"₹{state['total']:,}").classes('text-2xl font-bold text-[#38BDF8]')

    def confirm_booking():
        if not name_input.value or not email_input.value:
            ui.notify('Please fill in Name and Email!', color='negative')
            return
        bid = f"IT-{random.randint(100000, 999999)}"
        with ui.dialog() as dialog, ui.card().classes('p-8 text-center'):
            ui.label('🎉 Booking Confirmed!').classes('text-2xl font-serif font-bold text-[#0B192C]')
            ui.label(f"Booking ID: {bid}").classes('text-lg font-bold text-[#0284C7] my-2')
            ui.label(f"Thank you {name_input.value}, confirmation sent to {email_input.value}!")
            ui.button('Done', on_click=dialog.close).classes('bg-[#0B192C] text-white mt-4')
        dialog.open()

    ui.button('Confirm Booking Now', on_click=confirm_booking).classes('w-full bg-[#0284C7] hover:bg-[#38BDF8] text-[#0B192C] font-bold py-3 rounded-xl')

ui.run(port=8080, title='Infinity Travels')
`
  },
  {
    id: 'fasthtml',
    name: 'FastHTML Frontend',
    category: 'Modern Web',
    filename: 'app_fasthtml.py',
    description: 'Ultra-modern Python web framework for blazing fast interactive frontends with pure Python components.',
    installCommand: 'pip install python-fasthtml',
    runCommand: 'python app_fasthtml.py',
    code: `"""
Infinity Travels — FastHTML Pure Python Frontend
Run with: python app_fasthtml.py
"""
from fasthtml.common import *
import random

app, rt = fast_app(
    hdrs=(
        Link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"),
        Style("""
            :root { --pico-primary: #0284C7; --pico-primary-hover: #38BDF8; }
            body { background-color: #F0F9FF; color: #0B192C; }
            .gold { color: #0284C7; font-weight: bold; }
            .hero { text-align: center; padding: 3rem 1rem; background: #0B192C; color: #E0F2FE; border-radius: 1rem; }
            .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
        """)
    )
)

PACKAGES = [
    ("Paris City of Love", 100000, "Paris, France", "7 Days"),
    ("Maldives Island Escape", 80000, "Maldives", "4N/5D"),
    ("Dubai Desert Glamour", 100000, "Dubai, UAE", "4N/5D"),
    ("Kerala Backwaters Bliss", 25000, "Kerala, India", "4N/5D"),
    ("Goa Beach Party", 20000, "Goa, India", "4N/5D"),
    ("Hyderabad Heritage Tour", 25000, "Hyderabad, India", "3N/4D"),
    ("Mumbai City Lights", 5500, "Mumbai, India", "2N/3D"),
    ("Pune Hills Getaway", 12000, "Pune, India", "3N/4D"),
    ("Delhi Capital Explorer", 18000, "Delhi, India", "2N/3D"),
    ("Tirupati Divine Darshan", 17000, "Tirupati, AP", "2N/3D"),
    ("Ladakh Mountain Odyssey", 58000, "Leh, Pangong", "4N/5D"),
    ("Manali Snow Adventure", 40000, "Manali, HP", "7 Days"),
    ("Rajasthan Royal Retreat", 60000, "Jaipur, Udaipur", "7 Days"),
    ("Bangkok Exotic Getaway", 69000, "Bangkok, Thailand", "4N/5D"),
    ("Pune City Darshan", 1100, "Pune · 1 Day", "1 Day"),
    ("Mumbai City Darshan", 1300, "Mumbai · 1 Day", "1 Day")
]

@rt("/")
def get():
    cards = [
        Article(
            H4(name),
            P(Small(f"📍 {loc} • {dur}")),
            P(Strong(f"₹{price:,}"), Small(" /person"), cls="gold"),
            Button("Book This", hx_get=f"/select?name={name}&price={price}", hx_target="#booking-box")
        )
        for name, price, loc, dur in PACKAGES
    ]

    return Main(
        Div(
            H1("Infinity Travels"),
            P("Travel Beyond Your Limits — India & International Holiday Packages"),
            cls="hero"
        ),
        H2("Holiday Packages & Day Escapades", style="margin-top:2rem;"),
        Div(*cards, cls="card-grid"),
        Div(id="booking-box", style="margin-top: 3rem;"),
        cls="container"
    )

@rt("/select")
def get(name: str, price: int):
    return Article(
        H3("🎒 Selected: " + name),
        P(f"Base price: ₹{price:,} per person"),
        Form(
            Hidden(name="pkg_name", value=name),
            Hidden(name="pkg_price", value=price),
            Label("Full Name", Input(type="text", name="name", required=True)),
            Label("Email Address", Input(type="email", name="email", required=True)),
            Label("No. of Persons", Input(type="number", name="persons", value="2", min="1", max="10")),
            Label("Travel Date", Input(type="date", name="date", required=True)),
            Button("Confirm Booking 🚀", type="submit"),
            hx_post="/confirm",
            hx_target="#booking-box"
        ),
        style="background: #0B192C; color: #E0F2FE; padding: 2rem; border-radius: 1rem;"
    )

@rt("/confirm")
def post(pkg_name: str, pkg_price: int, name: str, email: str, persons: int, date: str):
    total = pkg_price * int(persons)
    bid = f"IT-{random.randint(100000, 999999)}"
    return Article(
        H2("🎉 Booking Confirmed!"),
        P(f"Booking ID: "), Strong(bid, cls="gold"),
        P(f"Customer: {name} ({email})"),
        P(f"Package: {pkg_name} on {date}"),
        P(f"Travelers: {persons} Person(s)"),
        H3(f"Total Amount: ₹{total:,}", cls="gold"),
        A("← Book Another Tour", href="/", role="button")
    )

serve()
`
  },
  {
    id: 'flask',
    name: 'Flask + Jinja2 Frontend',
    category: 'Full-Stack Web',
    filename: 'app_flask.py',
    description: 'Classic and reliable Python full-stack web application with route handling, HTML templating, and REST API.',
    installCommand: 'pip install flask',
    runCommand: 'python app_flask.py',
    code: `"""
Infinity Travels — Flask Web Frontend & API
Run with: python app_flask.py
Visit: http://127.0.0.1:5000
"""
from flask import Flask, render_template_string, request, jsonify
import random

app = Flask(__name__)

PACKAGES = [
    {"name": "Paris City of Love", "price": 100000, "duration": "7 Days", "loc": "Paris, France"},
    {"name": "Maldives Island Escape", "price": 80000, "duration": "4N/5D", "loc": "Maldives"},
    {"name": "Dubai Desert Glamour", "price": 100000, "duration": "4N/5D", "loc": "Dubai, UAE"},
    {"name": "Kerala Backwaters Bliss", "price": 25000, "duration": "4N/5D", "loc": "Kerala, India"},
    {"name": "Goa Beach Party", "price": 20000, "duration": "4N/5D", "loc": "Goa, India"},
    {"name": "Hyderabad Heritage Tour", "price": 25000, "duration": "3N/4D", "loc": "Hyderabad, India"},
    {"name": "Mumbai City Lights", "price": 5500, "duration": "2N/3D", "loc": "Mumbai, India"},
    {"name": "Pune Hills Getaway", "price": 12000, "duration": "3N/4D", "loc": "Pune, India"},
    {"name": "Delhi Capital Explorer", "price": 18000, "duration": "2N/3D", "loc": "Delhi, India"},
    {"name": "Tirupati Divine Darshan", "price": 17000, "duration": "2N/3D", "loc": "Tirupati, Andhra Pradesh"},
    {"name": "Ladakh Mountain Odyssey", "price": 58000, "duration": "4N/5D", "loc": "Leh, Nubra, Pangong"},
    {"name": "Manali Snow Adventure", "price": 40000, "duration": "7 Days", "loc": "Manali, Himachal Pradesh"},
    {"name": "Rajasthan Royal Retreat", "price": 60000, "duration": "7 Days", "loc": "Jaipur · Jodhpur · Udaipur"},
    {"name": "Bangkok Exotic Getaway", "price": 69000, "duration": "4N/5D", "loc": "Bangkok, Thailand"},
    {"name": "Pune City Darshan", "price": 1100, "duration": "1 Day", "loc": "Pune · 1 Day Trip"},
    {"name": "Mumbai City Darshan", "price": 1300, "duration": "1 Day", "loc": "Mumbai · 1 Day Trip"}
]

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Infinity Travels — Flask Frontend</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root { --gold: #0284C7; --deep: #0B192C; --sand: #E0F2FE; }
        body { font-family: 'DM Sans', sans-serif; background: #F0F9FF; margin: 0; color: var(--deep); }
        header { background: var(--deep); padding: 1.5rem 2rem; color: #38BDF8; font-family: 'Playfair Display', serif; font-size: 1.5rem; }
        .hero { background: var(--deep); color: white; text-align: center; padding: 4rem 1rem; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: 3rem; margin: 0; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .card h3 { font-family: 'Playfair Display', serif; margin: 0.5rem 0; }
        .price { color: var(--gold); font-size: 1.4rem; font-weight: bold; }
        .btn { background: var(--deep); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 20px; cursor: pointer; font-weight: bold; }
        .btn:hover { background: var(--gold); }
        .booking-box { max-width: 600px; margin: 3rem auto; background: var(--deep); color: white; padding: 2rem; border-radius: 20px; }
        input, select { width: 100%; padding: 0.8rem; margin: 0.5rem 0 1rem; border-radius: 8px; border: 1px solid #444; background: #2A1D11; color: white; box-sizing: border-box; }
    </style>
</head>
<body>
    <header>Infinity Travels <span>✈️</span></header>
    <div class="hero">
        <h1>Travel Beyond Your Limits</h1>
        <p>Converted Python Flask Frontend with dynamic routing</p>
    </div>
    <div class="grid">
        {% for p in packages %}
        <div class="card">
            <small>📍 {{ p.loc }} • {{ p.duration }}</small>
            <h3>{{ p.name }}</h3>
            <div class="price">₹{{ '{:,}'.format(p.price) }} <small style="color:#666; font-size:0.8rem;">/person</small></div>
            <br>
            <button class="btn" onclick="document.getElementById('pkgSelect').value='{{ p.name }}|{{ p.price }}'; window.location.hash='booking';">Book Now</button>
        </div>
        {% endfor %}
    </div>

    <div class="booking-box" id="booking">
        <h2 style="font-family:'Playfair Display',serif; color:#38BDF8; text-align:center;">Book Your Trip</h2>
        <form method="POST" action="/book">
            <label>Full Name</label>
            <input type="text" name="name" required placeholder="Shravani">
            <label>Email</label>
            <input type="email" name="email" required placeholder="shravani@email.com">
            <label>Package</label>
            <select name="pkg" id="pkgSelect">
                {% for p in packages %}
                <option value="{{ p.name }}|{{ p.price }}">{{ p.name }} — ₹{{ '{:,}'.format(p.price) }}</option>
                {% endfor %}
            </select>
            <label>No. of Persons</label>
            <input type="number" name="persons" value="1" min="1" max="10">
            <label>Travel Date</label>
            <input type="date" name="date" required>
            <button type="submit" class="btn" style="width:100%; background:var(--gold); color:black; padding:1rem; font-size:1.1rem;">Confirm Booking</button>
        </form>
    </div>
</body>
</html>
"""

@app.route("/")
def index():
    return render_template_string(HTML_TEMPLATE, packages=PACKAGES)

@app.route("/book", methods=["POST"])
def book():
    name = request.form.get("name")
    email = request.form.get("email")
    pkg_raw = request.form.get("pkg")
    pkg_name, price = pkg_raw.split("|")
    persons = int(request.form.get("persons", 1))
    date = request.form.get("date")
    total = int(price) * persons
    booking_id = f"IT-{random.randint(100000, 999999)}"

    return f"""
    <body style="font-family:sans-serif; text-align:center; padding:3rem; background:#F0F9FF;">
        <h1 style="color:#0284C7;">🎉 Booking Confirmed!</h1>
        <h2>Booking ID: {booking_id}</h2>
        <p>Dear {name}, your tour for <strong>{pkg_name}</strong> on {date} for {persons} traveler(s) is confirmed.</p>
        <h3>Total Paid: ₹{total:,}</h3>
        <p>Confirmation email sent to: {email}</p>
        <a href="/">← Return to Packages</a>
    </body>
    """

if __name__ == "__main__":
    app.run(debug=True, port=5000)
`
  },
  {
    id: 'tkinter',
    name: 'CustomTkinter Desktop GUI',
    category: 'Desktop GUI',
    filename: 'app_desktop_gui.py',
    description: 'Modern desktop Python frontend with dark/gold theme, package selection, and booking engine dialogs.',
    installCommand: 'pip install customtkinter',
    runCommand: 'python app_desktop_gui.py',
    code: `"""
Infinity Travels — CustomTkinter Desktop GUI Frontend
Run with: python app_desktop_gui.py
"""
import customtkinter as ctk
import random
from tkinter import messagebox

ctk.set_appearance_mode("Dark")
ctk.set_default_color_theme("green")

PACKAGES = {
    "Paris City of Love (7 Days)": 100000,
    "Maldives Island Escape (4N/5D)": 80000,
    "Dubai Desert Glamour (4N/5D)": 100000,
    "Kerala Backwaters Bliss (4N/5D)": 25000,
    "Goa Beach Party (4N/5D)": 20000,
    "Hyderabad Heritage Tour (3N/4D)": 25000,
    "Mumbai City Lights (2N/3D)": 5500,
    "Pune Hills Getaway (3N/4D)": 12000,
    "Delhi Capital Explorer (2N/3D)": 18000,
    "Tirupati Divine Darshan (2N/3D)": 17000,
    "Ladakh Mountain Odyssey (4N/5D)": 58000,
    "Manali Snow Adventure (7 Days)": 40000,
    "Rajasthan Royal Retreat (7 Days)": 60000,
    "Bangkok Exotic Getaway (4N/5D)": 69000,
    "Pune City Darshan (1 Day)": 1100,
    "Mumbai City Darshan (1 Day)": 1300
}

class InfinityTravelsApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Infinity Travels — Desktop Python Frontend")
        self.geometry("900x700")
        self.configure(fg_color="#0B192C")

        # Header
        self.header_frame = ctk.CTkFrame(self, fg_color="#2D1E0A", height=70, corner_radius=0)
        self.header_frame.pack(fill="x")
        self.logo_label = ctk.CTkLabel(self.header_frame, text="✈️ Infinity Travels", font=("Playfair Display", 24, "bold"), text_color="#38BDF8")
        self.logo_label.pack(side="left", padx=25, pady=15)

        # Split Layout
        self.main_frame = ctk.CTkFrame(self, fg_color="transparent")
        self.main_frame.pack(fill="both", expand=True, padx=25, pady=20)

        # Left: Packages List
        self.list_frame = ctk.CTkFrame(self.main_frame, fg_color="#251909", width=420)
        self.list_frame.pack(side="left", fill="both", expand=True, padx=(0, 10))
        self.list_title = ctk.CTkLabel(self.list_frame, text="Select a Travel Package", font=("Arial", 16, "bold"), text_color="#38BDF8")
        self.list_title.pack(anchor="w", padx=15, pady=10)

        self.scroll_box = ctk.CTkScrollableFrame(self.list_frame, fg_color="transparent")
        self.scroll_box.pack(fill="both", expand=True, padx=10, pady=5)

        self.selected_pkg = ctk.StringVar(value=list(PACKAGES.keys())[0])

        for pkg, price in PACKAGES.items():
            btn = ctk.CTkRadioButton(
                self.scroll_box,
                text=f"{pkg} — ₹{price:,}",
                value=pkg,
                variable=self.selected_pkg,
                command=self.calculate_total,
                text_color="#E0F2FE",
                fg_color="#0284C7"
            )
            btn.pack(anchor="w", pady=6, padx=5)

        # Right: Booking Form
        self.form_frame = ctk.CTkFrame(self.main_frame, fg_color="#251909", width=380)
        self.form_frame.pack(side="right", fill="both", expand=True, padx=(10, 0))

        self.form_title = ctk.CTkLabel(self.form_frame, text="🎒 Book Your Tour", font=("Arial", 18, "bold"), text_color="#38BDF8")
        self.form_title.pack(pady=15)

        self.entry_name = ctk.CTkEntry(self.form_frame, placeholder_text="Full Name", width=300)
        self.entry_name.pack(pady=8)

        self.entry_email = ctk.CTkEntry(self.form_frame, placeholder_text="Email Address", width=300)
        self.entry_email.pack(pady=8)

        self.entry_phone = ctk.CTkEntry(self.form_frame, placeholder_text="Phone Number", width=300)
        self.entry_phone.pack(pady=8)

        self.entry_date = ctk.CTkEntry(self.form_frame, placeholder_text="Travel Date (YYYY-MM-DD)", width=300)
        self.entry_date.pack(pady=8)

        self.persons_label = ctk.CTkLabel(self.form_frame, text="Number of Persons: 1", text_color="#A89880")
        self.persons_label.pack(pady=(10, 0))

        self.persons_slider = ctk.CTkSlider(self.form_frame, from_=1, to=10, number_of_steps=9, command=self.update_persons)
        self.persons_slider.set(1)
        self.persons_slider.pack(pady=5)

        self.total_label = ctk.CTkLabel(self.form_frame, text="Total: ₹0", font=("Arial", 20, "bold"), text_color="#38BDF8")
        self.total_label.pack(pady=15)

        self.book_btn = ctk.CTkButton(
            self.form_frame,
            text="Confirm Booking 🚀",
            font=("Arial", 14, "bold"),
            fg_color="#0284C7",
            hover_color="#38BDF8",
            text_color="#0B192C",
            width=300,
            height=40,
            command=self.confirm_booking
        )
        self.book_btn.pack(pady=15)

        self.calculate_total()

    def update_persons(self, val):
        p = int(val)
        self.persons_label.configure(text=f"Number of Persons: {p}")
        self.calculate_total()

    def calculate_total(self):
        pkg = self.selected_pkg.get()
        price = PACKAGES.get(pkg, 0)
        persons = int(self.persons_slider.get())
        total = price * persons
        self.total_label.configure(text=f"Total: ₹{total:,}")

    def confirm_booking(self):
        name = self.entry_name.get().strip()
        email = self.entry_email.get().strip()
        phone = self.entry_phone.get().strip()
        travel_date = self.entry_date.get().strip()

        if not name or not email or not phone:
            messagebox.showerror("Validation Error", "Please fill in all contact details!")
            return

        bid = f"IT-{random.randint(100000, 999999)}"
        pkg = self.selected_pkg.get()
        total = PACKAGES.get(pkg, 0) * int(self.persons_slider.get())

        receipt = f"🎉 Booking Confirmed!\\n\\nBooking ID: {bid}\\nName: {name}\\nEmail: {email}\\nPackage: {pkg}\\nDate: {travel_date}\\nTotal: ₹{total:,}"
        messagebox.showinfo("Infinity Travels Confirmation", receipt)

if __name__ == "__main__":
    app = InfinityTravelsApp()
    app.mainloop()
`
  },
  {
    id: 'pyscript',
    name: 'PyScript / Pyodide In-Browser',
    category: 'Browser WASM',
    filename: 'travel_engine.py',
    description: 'Python code that runs directly in web browsers via WebAssembly/Pyodide with no Python server required.',
    installCommand: '# No installation required! Runs inside browser via WASM/Pyodide',
    runCommand: '# Execute via PyScript tag or Pyodide runtime',
    code: `"""
Infinity Travels — In-Browser Python WASM Engine
Runs client-side in the browser via Pyodide / PyScript
"""
import json
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

    def calculate_quote(self, package_name, persons, promo_code=None):
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

    def create_booking(self, customer_name, customer_email, package_name, persons, travel_date, promo_code=None):
        quote = self.calculate_quote(package_name, persons, promo_code)
        booking_id = f"IT-{len(self.bookings) + 100001}"
        booking_record = {
            "booking_id": booking_id,
            "customer_name": customer_name,
            "customer_email": customer_email,
            "travel_date": travel_date,
            "quote": quote,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "status": "CONFIRMED"
        }
        self.bookings.append(booking_record)
        return booking_record

# Interactive Demo Execution:
engine = TravelEngine()
print("✈️ [Infinity Travels Python Engine Initialized]")
print("==============================================")
print(f"Total Packages Loaded: {len(engine.packages)}")
print("\\n1. Filtering packages under ₹30,000:")
budget_trips = engine.filter_packages(max_budget=30000)
for t in budget_trips:
    print(f"   - {t['name']}: ₹{t['price']:,} ({t['days']} days)")

print("\\n2. Simulating a booking with promo code 'INFINITY10':")
quote = engine.calculate_quote("Maldives Island Escape", persons=2, promo_code="INFINITY10")
print(f"   Package: {quote['package']}")
print(f"   Subtotal: ₹{quote['subtotal']:,}")
print(f"   Discount (10%): -₹{quote['discount']:,}")
print(f"   Total Payable: ₹{quote['final_total']:,}")

booking = engine.create_booking("Shravani", "shravani@email.com", "Maldives Island Escape", 2, "2026-12-15", "INFINITY10")
print(f"\\n3. Booking Record Generated Successfully: {booking['booking_id']}")
`
  }
];

export const PYTHON_REQUIREMENTS = `# Infinity Travels — Python Frontend Dependencies
# Install with: pip install -r requirements.txt

# For Streamlit Web Frontend:
streamlit>=1.35.0

# For NiceGUI Pure Python Frontend:
nicegui>=1.4.25

# For FastHTML Modern Web Frontend:
python-fasthtml>=0.1.4

# For Flask Full-Stack Frontend:
flask>=3.0.0

# For CustomTkinter Desktop GUI Frontend:
customtkinter>=5.2.0

# Standard utilities:
requests>=2.31.0
`;

export const PYTHON_README = `# ✈️ Infinity Travels — Python Frontend Suite

This project contains complete, production-grade Python frontend implementations converted from the original Infinity Travels HTML/JS project.

## Included Frontends:

1. **Streamlit Frontend (\`app_streamlit.py\`)**
   - Modern, reactive web UI with sidebar booking engine, dynamic cards, promo validator, and receipt generator.
   - Run: \`streamlit run app_streamlit.py\`

2. **NiceGUI Frontend (\`app_nicegui.py\`)**
   - 100% Python web UI powered by FastAPI and Tailwind CSS.
   - Run: \`python app_nicegui.py\`

3. **FastHTML Frontend (\`app_fasthtml.py\`)**
   - Cutting-edge hypermedia web app in pure Python.
   - Run: \`python app_fasthtml.py\`

4. **Flask + Jinja2 Frontend (\`app_flask.py\`)**
   - Classic Python fullstack web server and templated frontend.
   - Run: \`python app_flask.py\`

5. **CustomTkinter Desktop GUI (\`app_desktop_gui.py\`)**
   - Beautiful dark/gold native desktop application for Windows, macOS, and Linux.
   - Run: \`python app_desktop_gui.py\`

6. **PyScript / Pyodide Engine (\`travel_engine.py\`)**
   - In-browser Python WebAssembly execution engine.

## Quickstart (Run Streamlit in 30 Seconds):

\`\`\`bash
# 1. Install dependencies
pip install streamlit

# 2. Run the application
streamlit run app_streamlit.py
\`\`\`
`;
