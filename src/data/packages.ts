import { TravelPackage, CurrencyConfig } from '../types/travel';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rateFromINR: 1 },
  USD: { code: 'USD', symbol: '$', rateFromINR: 0.012 },
  EUR: { code: 'EUR', symbol: '€', rateFromINR: 0.011 },
  AED: { code: 'AED', symbol: 'د.إ', rateFromINR: 0.044 },
};

export const PACKAGES: TravelPackage[] = [
  {
    id: 'paris-city-of-love',
    name: 'Paris City of Love',
    subtitle: 'Romantic streets, Eiffel views & world-class art',
    location: 'Paris, France',
    duration: '7 Days',
    priceINR: 100000,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '✈️ Flight', '🗺️ Sightseeing'],
    gradientClass: 'from-[#2C3E8C] to-[#6A5ACD]',
    category: 'holiday',
    region: 'international',
    rating: 4.9,
    reviewCount: 142,
    description: 'Immerse yourself in Parisian elegance. Savor fresh croissants in Montmartre, cruise along the Seine at sunset, and stand in awe of the Eiffel Tower and Louvre Museum.',
    inclusions: [
      '4-Star Central Paris Hotel (6 Nights)',
      'Round-trip International Flights from Delhi/Mumbai',
      'Priority Eiffel Tower Summit Tickets & Seine Cruise',
      'Daily French Continental Breakfast',
      'Hop-on Hop-off Luxury Coach Sightseeing Pass',
      'Airport Transfers in Private Luxury Sedan'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Bienvenue à Paris', desc: 'Arrival at CDG Airport, private chauffeur transfer to hotel, evening Seine River welcome cruise.' },
      { day: 'Day 2', title: 'The Iron Lady & Louvre', desc: 'Fast-track entry to Eiffel Tower 3rd tier, afternoon exploring the Louvre masterpieces including Mona Lisa.' },
      { day: 'Day 3', title: 'Versailles Grand Palace', desc: 'Guided day trip to the Palace and Gardens of Versailles with Hall of Mirrors tour.' },
      { day: 'Day 4', title: 'Montmartre & Sacré-Cœur', desc: 'Walking tour through bohemian streets, artist plazas, and sweeping panoramic views over Paris.' },
      { day: 'Day 5', title: 'Champs-Élysées & Fashion', desc: 'Leisurely shopping day along Boulevard Haussmann and the Arc de Triomphe.' },
      { day: 'Day 6', title: 'Latin Quarter & French Bistro', desc: 'Culinary food tour with cheese tasting, wine pairings, and farewell gourmet dinner.' },
      { day: 'Day 7', title: 'Au Revoir Paris', desc: 'Morning café breakfast, souvenir shopping, and transfer to airport for departure.' }
    ]
  },
  {
    id: 'maldives-island-escape',
    name: 'Maldives Island Escape',
    subtitle: 'Overwater luxury villas & turquoise coral lagoons',
    location: 'Maldives',
    duration: '4N/5D',
    priceINR: 80000,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
    tags: ['🏨 Resort', '🤿 Snorkeling', '🍽️ Meals'],
    gradientClass: 'from-[#00B4D8] to-[#48CAE4]',
    category: 'holiday',
    region: 'international',
    rating: 5.0,
    reviewCount: 198,
    description: 'Awaken in an idyllic overwater villa perched directly above vibrant coral gardens. Bask in white sandy beaches, crystal-clear warm waters, and world-class luxury.',
    inclusions: [
      'Overwater Sunrise Villa with private sundeck',
      'Speedboat / Seaplane transfers between Male and Resort',
      'All-Inclusive Meals (Breakfast, Lunch, 4-Course Dinner)',
      'Free Snorkeling Equipment & Guided Coral Reef Safari',
      'Sunset Dolphin Watching Cruise with Mocktails',
      'Complimentary 60-min Balinese Couples Spa Session'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrive in Paradise', desc: 'Scenic speedboat transfer to the island resort, flower garland welcome, and villa check-in.' },
      { day: 'Day 2', title: 'Reef Snorkeling & Lagoon Dip', desc: 'Explore the house reef with marine biologists to spot manta rays and sea turtles.' },
      { day: 'Day 3', title: 'Sunset Dolphin Cruise', desc: 'Cruise the Indian Ocean alongside wild spinner dolphins, followed by candlelight beach buffet.' },
      { day: 'Day 4', title: 'Spa & Water Sports', desc: 'Indulge in an aromatherapy spa session or paddleboard across crystalline waters.' },
      { day: 'Day 5', title: 'Departure with Memories', desc: 'Sunrise yoga, buffet breakfast, and speedboat transfer back to Velana International Airport.' }
    ]
  },
  {
    id: 'dubai-desert-glamour',
    name: 'Dubai Desert Glamour',
    subtitle: 'Futuristic skylines, desert dunes & luxury shopping',
    location: 'Dubai, UAE',
    duration: '4N/5D',
    priceINR: 100000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '🐪 Desert Safari', '✈️ Flight'],
    gradientClass: 'from-[#D4A017] to-[#F4C542]',
    category: 'holiday',
    region: 'international',
    rating: 4.8,
    reviewCount: 164,
    description: 'Experience the magic of futuristic architecture juxtaposed with ancient Arabian heritage. Ascend Burj Khalifa, dune bash in 4x4s, and shop the world’s grandest malls.',
    inclusions: [
      '5-Star Dubai Marina Hotel with panoramic city views',
      'Round-trip Return Flights from India',
      'Burj Khalifa 124th & 125th Floor Observation Deck Tickets',
      'Red Dune Desert Safari with BBQ Dinner & Tanoura Show',
      'Dubai Marina Dhow Cruise with International Buffet',
      'UAE Tourist Visa & 24/7 Concierge Support'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Welcome to Dubai', desc: 'Arrival at DXB Airport, check-in, and evening Dubai Marina Dhow Cruise dinner.' },
      { day: 'Day 2', title: 'Burj Khalifa & Dubai Mall', desc: 'Ascend the tallest building on earth, watch the Dubai Fountain show, and explore the Dubai Aquarium.' },
      { day: 'Day 3', title: 'Thrill Desert Safari', desc: '4x4 dune bashing across golden sands, camel rides, sandboarding, and traditional Arabic banquet.' },
      { day: 'Day 4', title: 'Old Dubai & Gold Souk', desc: 'Abra boat ride across Dubai Creek, spice and gold souk bargaining, and visit to Museum of the Future.' },
      { day: 'Day 5', title: 'Farewell Dubai', desc: 'Last-minute tax-free luxury shopping, souvenir picking, and airport transfer.' }
    ]
  },
  {
    id: 'kerala-backwaters-bliss',
    name: 'Kerala Backwaters Bliss',
    subtitle: 'Serene houseboats, emerald canals & fragrant spice hills',
    location: 'Kerala, India',
    duration: '4N/5D',
    priceINR: 25000,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop',
    tags: ['🛶 Houseboat', '🌿 Nature', '🍽️ Meals'],
    gradientClass: 'from-[#2bb673] to-[#85e3c8]',
    category: 'holiday',
    region: 'india',
    rating: 4.9,
    reviewCount: 220,
    description: 'Drift through palm-fringed backwaters on a handcrafted luxury houseboat. Wake up to the gentle song of kingfishers and feast on authentic Kerala Karimeen and Appams.',
    inclusions: [
      '1 Night in Deluxe Private Houseboat with personal chef',
      '3 Nights in Munnar Tea Plantation Valley Resort',
      'All Traditional Keralite Meals on Houseboat',
      'Guided Spice Garden and Tea Museum Excursion',
      'AC Private Cab for the entire circuit',
      'Kathakali & Kalaripayattu Martial Arts cultural show'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Cochin to Munnar Hills', desc: 'Drive past Cheeyappara Waterfalls into the mist-clad hills of Munnar, tea garden walk.' },
      { day: 'Day 2', title: 'Munnar Sightseeing', desc: 'Visit Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, and Kundala Lake.' },
      { day: 'Day 3', title: 'Thekkady Periyar Wildlife', desc: 'Drive to Thekkady, boat safari in Periyar Tiger Reserve, and aromatic spice plantation tour.' },
      { day: 'Day 4', title: 'Alleppey Houseboat Cruise', desc: 'Board the traditional Kettuvallam, glide through Vembanad Lake, savor hot Kerala snacks.' },
      { day: 'Day 5', title: 'Departure via Kochi', desc: 'Morning cruise, checkout, Fort Kochi Chinese fishing nets visit, and drop at Cochin Airport.' }
    ]
  },
  {
    id: 'goa-beach-party',
    name: 'Goa Beach Party',
    subtitle: 'Sun, sand, water sports & electrifying coastal nightlife',
    location: 'Goa, India',
    duration: '4N/5D',
    priceINR: 20000,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '🚌 Transport', '🏄 Water Sports'],
    gradientClass: 'from-[#667eea] to-[#764ba2]',
    category: 'holiday',
    region: 'beaches',
    rating: 4.7,
    reviewCount: 310,
    description: 'The ultimate coastal getaway! From jet ski rides at Calangute to sunset shack parties at Anjuna and serene Portuguese villas in Fontainhas, Goa has it all.',
    inclusions: [
      '4 Nights in Beachside Resort near Baga/Candolim with pool',
      'Water Sports Combo (Parasailing, Jet Ski, Banana Ride, Bumper)',
      'AC Vehicle for North & South Goa Sightseeing',
      'Sunset Mandovi River Cruise with Goan folk dance',
      'Daily Buffet Breakfast',
      'Complimentary entry passes to top beach club'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Welcome to Coastal Paradise', desc: 'Airport/Station pickup, check-in, leisure sunset stroll at Baga Beach, shack dinner.' },
      { day: 'Day 2', title: 'North Goa & Water Adventures', desc: 'Fort Aguada, Calangute, thrill water sports package, and evening at Tito’s Lane.' },
      { day: 'Day 3', title: 'South Goa & Portuguese Heritage', desc: 'Basilica of Bom Jesus, Se Cathedral, Mangueshi Temple, and Miramar Beach.' },
      { day: 'Day 4', title: 'Dudhsagar & Spice Plantation', desc: 'Jeep safari to the mighty Dudhsagar Waterfalls and traditional Goan spice plantation buffet.' },
      { day: 'Day 5', title: 'Farewell Susegad', desc: 'Morning dip in the pool, local cashew and feni shopping, transfer to airport.' }
    ]
  },
  {
    id: 'hyderabad-heritage-tour',
    name: 'Hyderabad Heritage Tour',
    subtitle: 'Nizami palaces, Charminar bazaars & legendary Dum Biryani',
    location: 'Hyderabad, India',
    duration: '3N/4D',
    priceINR: 25000,
    image: '/assets/hyderabad.jpg',
    tags: ['🏨 Hotel', '🍛 Biryani Trail', '🗺️ Sightseeing'],
    gradientClass: 'from-[#f7971e] to-[#ffd200]',
    category: 'holiday',
    region: 'heritage',
    rating: 4.8,
    reviewCount: 115,
    description: 'Step into the realm of the Nizams. Explore the opulent Golconda Fort, gaze at Charminar, ride boats on Hussain Sagar, and indulge in world-famous royal Hyderabadi cuisine.',
    inclusions: [
      '3 Nights in 4-Star Heritage Property in Banjara Hills',
      'Exclusive Royal Biryani & Irani Chai tasting tour',
      'Golconda Fort Sound & Light Show VIP Entry',
      'Ramoji Film City Full Day Carnival Pass with buffet',
      'AC Cab with dedicated local historian guide',
      'Pearls and Ittar fragrance shopping assistance'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & The Heart of Hyderabad', desc: 'Pickup, visit Charminar, Laad Bazaar bangle shopping, Mecca Masjid, authentic Shadab Biryani.' },
      { day: 'Day 2', title: 'Golconda Fort & Qutb Shahi Tombs', desc: 'Explore acoustic secrets of Golconda Fort, royal tombs, and the evening Light & Sound spectacle.' },
      { day: 'Day 3', title: 'Ramoji Film City Wonder', desc: 'Full-day behind-the-scenes cinema experience, live stunt shows, Japanese garden.' },
      { day: 'Day 4', title: 'Salar Jung Museum & Departure', desc: 'Marvel at the Veiled Rebecca and Musical Clock at Salar Jung Museum before airport transfer.' }
    ]
  },
  {
    id: 'mumbai-city-lights',
    name: 'Mumbai City Lights',
    subtitle: 'Marine Drive sunsets, colonial splendor & Bollywood magic',
    location: 'Mumbai, India',
    duration: '2N/3D',
    priceINR: 5500,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '🚌 Transport', '🎭 Bollywood'],
    gradientClass: 'from-[#fc5c7d] to-[#6a3093]',
    category: 'holiday',
    region: 'india',
    rating: 4.6,
    reviewCount: 260,
    description: 'Feel the beating heart of India’s financial and entertainment capital. Stand by the Gateway of India, drive the Sea Link, and taste Mumbai street food favorites.',
    inclusions: [
      '2 Nights in Central Mumbai Hotel',
      'Gateway of India & Elephanta Caves Ferry ride',
      'Chauffeured Bandra-Worli Sea Link & Marine Drive Queen’s Necklace drive',
      'Authentic Mumbai Street Food Walk (Vada Pav, Pav Bhaji, Kulfi)',
      'Bollywood Studio tour pass',
      'AC Transport throughout'
    ],
    itinerary: [
      { day: 'Day 1', title: 'South Mumbai Heritage', desc: 'Gateway of India, Taj Mahal Palace, Elephanta Caves ferry, sunset ice-cream on Marine Drive.' },
      { day: 'Day 2', title: 'Bollywood & Celebrities', desc: 'Drive past Mannat and Galaxy in Bandra, Bollywood studio walkthrough, Juhu beach food street.' },
      { day: 'Day 3', title: 'Dharavi Art & Markets', desc: 'Crawford Market, Colaba Causeway street bargain shopping, and transfer to station/airport.' }
    ]
  },
  {
    id: 'pune-hills-getaway',
    name: 'Pune Hills Getaway',
    subtitle: 'Maratha forts, lush Western Ghats & historic landmarks',
    location: 'Pune, India',
    duration: '3N/4D',
    priceINR: 12000,
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '🌄 Forts', '🚌 Transport'],
    gradientClass: 'from-[#11998e] to-[#38ef7d]',
    category: 'holiday',
    region: 'hills',
    rating: 4.7,
    reviewCount: 140,
    description: 'Discover the cultural capital of Maharashtra. Trek to historic Sinhagad Fort, admire Shaniwar Wada, and take scenic mountain drives into Lonavala and Lavasa hills.',
    inclusions: [
      '3 Nights in Hill-view Hotel with breakfast',
      'Sinhagad Fort guided excursion with traditional Pithla Bhakri lunch',
      'Lonavala Bhushi Dam & Tiger Point day excursion',
      'Shaniwar Wada & Aga Khan Palace entry passes',
      'AC Private Vehicle for the duration of the trip'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Peshwa Legacy', desc: 'Visit Shaniwar Wada, Dagdusheth Ganpati Temple, and relish Puneri Misal Pav.' },
      { day: 'Day 2', title: 'Sinhagad Fort Trek & History', desc: 'Scenic mountain climb to Sinhagad, historic Tanaji Malusare memorial, authentic village cuisine.' },
      { day: 'Day 3', title: 'Lonavala & Khandala Ghats', desc: 'Tiger’s Leap, Karla Caves, chikki sampling, and evening misty view over Duke’s Nose.' },
      { day: 'Day 4', title: 'Aga Khan Palace & Departure', desc: 'Visit the serene historic monument where Mahatma Gandhi stayed, followed by drop-off.' }
    ]
  },
  {
    id: 'delhi-capital-explorer',
    name: 'Delhi Capital Explorer',
    subtitle: 'Mughal monuments, Chandni Chowk flavors & India Gate',
    location: 'Delhi, India',
    duration: '2N/3D',
    priceINR: 18000,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '🕌 Heritage', '🍢 Street Food'],
    gradientClass: 'from-[#ee0979] to-[#ff6a00]',
    category: 'holiday',
    region: 'heritage',
    rating: 4.8,
    reviewCount: 175,
    description: 'Immerse yourself in Delhi’s dramatic tapestry of old and new. From the narrow lanes of Chandni Chowk to the majestic Qutub Minar, Humayun’s Tomb and Lotus Temple.',
    inclusions: [
      '2 Nights in Central New Delhi 4-Star Hotel',
      'Guided Chandni Chowk Rickshaw food & spice tour',
      'Red Fort, Qutub Minar, and Humayun’s Tomb VIP entry tickets',
      'Private AC Cab for city sightseeing',
      'Evening illuminated drive past India Gate & Rashtrapati Bhavan'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Old Delhi Grandeur', desc: 'Jama Masjid, thrilling cycle rickshaw ride through Paranthe Wali Gali, and Red Fort.' },
      { day: 'Day 2', title: 'Lutyens Delhi & Monuments', desc: 'India Gate, Rashtrapati Bhavan drive, Humayun’s Tomb, and Lotus Temple.' },
      { day: 'Day 3', title: 'Qutub Minar & Dilli Haat', desc: 'Marvel at 12th-century Qutub Minar, handicraft shopping at Dilli Haat, airport drop.' }
    ]
  },
  {
    id: 'tirupati-divine-darshan',
    name: 'Tirupati Divine Darshan',
    subtitle: 'Sacred Seven Hills & Lord Venkateswara blessings',
    location: 'Tirupati, Andhra Pradesh',
    duration: '2N/3D',
    priceINR: 17000,
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '🚌 Transport', '🎟️ VIP Darshan'],
    gradientClass: 'from-[#f9a825] to-[#fdd835]',
    category: 'holiday',
    region: 'heritage',
    rating: 5.0,
    reviewCount: 380,
    description: 'A hassle-free divine pilgrimage to the holy shrine of Tirumala. Experience early morning Special Entry Darshan, receive Tirupati Laddu Prasadam, and visit ancient temples.',
    inclusions: [
      'Pre-booked Tirumala Special Entry Darshan (SED) Token',
      '2 Nights Deluxe Hotel stay in Tirupati town',
      'AC Private Cab for Tirumala ghat roads and temple hopping',
      'Visit to Padmavathi Ammavari Temple and Sri Kalahasti',
      'Authentic South Indian Pure Veg Meals and Laddus assistance'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival at Tirupati', desc: 'Pickup from station/airport, check-in, afternoon visit to Padmavathi Temple in Tiruchanur.' },
      { day: 'Day 2', title: 'Lord Venkateswara Holy Darshan', desc: 'Early ascent up the scenic 7 hills, Special Entry Darshan at Tirumala, collect holy prasadam.' },
      { day: 'Day 3', title: 'Sri Kalahasti Rahu-Ketu Kshetra', desc: 'Visit the world-renowned Vayu Linga at Sri Kalahasti, followed by return departure.' }
    ]
  },
  {
    id: 'ladakh-mountain-odyssey',
    name: 'Ladakh Mountain Odyssey',
    subtitle: 'High passes, turquoise Pangong Tso & starry camp nights',
    location: 'Leh, Nubra, Pangong',
    duration: '4N/5D',
    priceINR: 58000,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop',
    tags: ['⛺ Camping', '🏍️ Bike Ride', '🌌 Stargazing'],
    gradientClass: 'from-[#5C6BC0] to-[#B39DDB]',
    category: 'holiday',
    region: 'hills',
    rating: 4.9,
    reviewCount: 205,
    description: 'Touch the sky on the roof of the world. Cross Khardung La (one of the highest motorable passes), ride double-humped camels in Nubra Valley dunes, and stargaze by Pangong Lake.',
    inclusions: [
      '1 Night Luxury Swiss Tent camp at Pangong Lake shore',
      '1 Night Deluxe Camp in Hunder, Nubra Valley',
      '2 Nights in Central Leh Boutique Hotel',
      'Inner Line Permits (ILP) and Wildlife entry charges',
      'Dedicated 4x4 SUV (Innova/Scorpio) with oxygen cylinder backup',
      'All Breakfasts and Dinners included'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Touchdown in Leh & Acclimatization', desc: 'Scenic flight into Kushok Bakula Rimpochee Airport. Rest day, gentle evening walk to Shanti Stupa.' },
      { day: 'Day 2', title: 'Across Khardung La to Nubra Valley', desc: 'Drive across the world-famous pass (17,582 ft), sand dunes camel safari in Hunder.' },
      { day: 'Day 3', title: 'Nubra to Surreal Pangong Tso', desc: 'Drive along Shyok River to the legendary color-changing lake, lakeside bonfire under stars.' },
      { day: 'Day 4', title: 'Pangong to Leh via Chang La', desc: 'Sunrise photography at the lake, cross Chang La, visit Thiksey Monastery, return to Leh.' },
      { day: 'Day 5', title: 'Depart with Himalayan Wonders', desc: 'Buffet breakfast, transfer to Leh airport for departure flight.' }
    ]
  },
  {
    id: 'manali-snow-adventure',
    name: 'Manali Snow Adventure',
    subtitle: 'Pine forests, Solang Valley skiing & Rohtang Pass snow',
    location: 'Manali, Himachal Pradesh',
    duration: '7 Days',
    priceINR: 40000,
    image: '/assets/manali.jpg',
    tags: ['🏨 Hotel', '⛷️ Snow Sports', '🚌 Transport'],
    gradientClass: 'from-[#4facfe] to-[#00f2fe]',
    category: 'holiday',
    region: 'hills',
    rating: 4.8,
    reviewCount: 280,
    description: 'Escape into the snow-capped wonderland of the Himalayas. Glide on zip-lines, ski in Solang Valley, drive through the Atal Tunnel, and relax in Old Manali cafés.',
    inclusions: [
      '6 Nights in Luxury Cedar-wood Valley Cottage with balcony',
      'Excursion to Solang Valley & Atal Tunnel / Rohtang Pass',
      'Snow sports kit rental assistance',
      'Manali Local Tour (Hadimba Temple, Vashisht Hot Springs, Mall Road)',
      'AC Luxury Volvo Bus transfers from Delhi/Chandigarh',
      'Daily Breakfast & 4-Course Dinners'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Journey to the Hills', desc: 'Overnight Volvo journey from Delhi with picturesque mountain views.' },
      { day: 'Day 2', title: 'Manali Town & Hot Springs', desc: 'Check-in, cedar forest walk, ancient Hadimba Temple, and rejuvenating Vashisht sulfur baths.' },
      { day: 'Day 3', title: 'Solang Snow Sports Valley', desc: 'Skiing, zorbing, paragliding, and cable car ride in Solang.' },
      { day: 'Day 4', title: 'Atal Tunnel & Sissu Lahaul', desc: 'Drive through the marvel 9km Atal Tunnel into the snow-covered wonderland of Sissu.' },
      { day: 'Day 5', title: 'Naggar Castle & Heritage', desc: 'Explore historic wooden castle of Naggar and Nicholas Roerich Art Gallery.' },
      { day: 'Day 6', title: 'Old Manali Cafés & Shopping', desc: 'Café hopping, live acoustic music, local woollens and apple cider shopping on Mall Road.' },
      { day: 'Day 7', title: 'Homeward Bound', desc: 'Morning checkout, last scenic views, and return transfer.' }
    ]
  },
  {
    id: 'rajasthan-royal-retreat',
    name: 'Rajasthan Royal Retreat',
    subtitle: 'Golden dunes, grand palaces, Udaipur lakes & Rajput pride',
    location: 'Jaipur · Jodhpur · Udaipur',
    duration: '7 Days',
    priceINR: 60000,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop',
    tags: ['🏯 Heritage Hotel', '🐪 Camel Safari', '🎨 Culture'],
    gradientClass: 'from-[#fa709a] to-[#fee140]',
    category: 'holiday',
    region: 'heritage',
    rating: 4.9,
    reviewCount: 190,
    description: 'Live like royalty on the Golden Triangle of Rajasthan. Marvel at Amer Fort’s mirrors, gaze upon the Blue City from Mehrangarh, and cruise Lake Pichola at sunset.',
    inclusions: [
      'Heritage Haveli stays in Jaipur, Jodhpur & Udaipur',
      'Lake Pichola boat cruise in Udaipur',
      'Thar Desert camel ride & Kalbelia cultural folk evening',
      'All major fort entries with government-certified guides',
      'Private Chauffeur-driven AC Sedan throughout',
      'Royal Rajasthani Thali culinary experience'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Jaipur The Pink City', desc: 'Arrival in Jaipur, Hawa Mahal photo-stop, City Palace museum, and Chokhi Dhani village fair.' },
      { day: 'Day 2', title: 'Amer Fort & Nahargarh', desc: 'Elephant/jeep ride to Amer Fort, Sheesh Mahal, and sunset over Jaipur from Nahargarh Fort.' },
      { day: 'Day 3', title: 'Onwards to Jodhpur', desc: 'Drive to Jodhpur, check-in, explore the blue-painted brahmin alleys and Clock Tower market.' },
      { day: 'Day 4', title: 'Mehrangarh Fort & Jaswant Thada', desc: 'Gaze at the fortress of Mehrangarh, royal cenotaphs, and Umaid Bhawan Palace.' },
      { day: 'Day 5', title: 'Scenic Drive to Udaipur', desc: 'Drive via marble carvings of Ranakpur Jain Temple into Udaipur, City of Lakes.' },
      { day: 'Day 6', title: 'Udaipur City Palace & Lake Pichola', desc: 'Explore the grandest palace complex in Rajasthan, sunset boat cruise past Jag Mandir.' },
      { day: 'Day 7', title: 'Royal Farewell', desc: 'Saheliyon ki Bari gardens, souvenir buying (bandhani & miniature art), airport drop.' }
    ]
  },
  {
    id: 'bangkok-exotic-getaway',
    name: 'Bangkok Exotic Getaway',
    subtitle: 'Golden Buddhas, Chao Phraya riverfronts & night markets',
    location: 'Bangkok, Thailand',
    duration: '4N/5D',
    priceINR: 69000,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop',
    tags: ['🏨 Hotel', '✈️ Flight', '🌃 Nightlife'],
    gradientClass: 'from-[#a18cd1] to-[#fbc2eb]',
    category: 'holiday',
    region: 'international',
    rating: 4.8,
    reviewCount: 230,
    description: 'Immerse yourself in Thailand’s vibrant capital. From the shimmering spires of Wat Arun to buzzing night markets, rooftop lounges, and legendary Thai massages.',
    inclusions: [
      '4 Nights in 4-Star Sukhumvit Central Bangkok Hotel',
      'Round-trip International Flights from India',
      'Chao Phraya Princess Luxury Dinner Cruise with live band',
      'Grand Palace & Reclining Buddha (Wat Pho) guided tour',
      'Safari World & Marine Park Full Day excursion with buffet',
      'Private Airport Transfers'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Sawasdee Bangkok', desc: 'Arrive at BKK/DMK, transfer to hotel, evening Chao Phraya Princess river dinner cruise.' },
      { day: 'Day 2', title: 'Temples & Grand Palace', desc: 'Visit the Golden Buddha (Wat Traimit), Marble Temple, and Wat Pho reclining statue.' },
      { day: 'Day 3', title: 'Safari World & Marine Park', desc: 'Drive through open safari, dolphin show, spy war stunt show, and buffet lunch.' },
      { day: 'Day 4', title: 'Shopping Extravaganza', desc: 'Explore Platinum Fashion Mall, MBK, and evening Asiatique riverfront night bazaar.' },
      { day: 'Day 5', title: 'Farewell Land of Smiles', desc: 'Traditional Thai body massage, souvenir shopping, airport transfer.' }
    ]
  },
  // Day Trips
  {
    id: 'pune-city-darshan',
    name: 'Pune City Darshan',
    subtitle: 'Full-day AC coach tour through Pune’s culture and heritage',
    location: 'Pune · 1 Day Trip',
    duration: '1 Day',
    priceINR: 1100,
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&auto=format&fit=crop',
    tags: ['🚌 AC Bus', '🗺️ Guided Tour'],
    gradientClass: 'from-[#11998e] to-[#38ef7d]',
    category: 'daytrip',
    region: 'dayescape',
    rating: 4.7,
    reviewCount: 412,
    description: 'The easiest and most budget-friendly way to see the best of Pune in a single day! Includes Shaniwar Wada, Dagdusheth Ganpati, Aga Khan Palace, Sarasbaug, and tribal museum.',
    inclusions: [
      'Comfortable AC Luxury Coach Travel',
      'Experienced English/Hindi/Marathi Speaking Tour Guide',
      'All Entry Tickets to Historical Monuments Included',
      'Bottled Drinking Water & Morning Refreshment Snack',
      'Designated pickup and drop-off points across Pune'
    ],
    itinerary: [
      { day: '08:00 AM', title: 'Pickup from Pune Station / Deccan', desc: 'Board the AC coach and meet your tour guide.' },
      { day: '09:30 AM', title: 'Shaniwar Wada & Dagdusheth Halwai', desc: 'Explore Peshwa fortifications and seek blessings at the renowned temple.' },
      { day: '12:00 PM', title: 'Aga Khan Palace & Museum', desc: 'Gandhi memorials, lush Italian arches, and historical exhibitions.' },
      { day: '01:30 PM', title: 'Lunch Break', desc: 'Halt at a curated restaurant for traditional Maharashtrian Thali.' },
      { day: '03:00 PM', title: 'Kelkar Museum & Sarasbaug', desc: 'Unique antique collections and beautiful temple gardens.' },
      { day: '06:30 PM', title: 'Return Drop-off', desc: 'Disembark at original boarding points with sweet memories.' }
    ]
  },
  {
    id: 'mumbai-city-darshan',
    name: 'Mumbai City Darshan',
    subtitle: 'Explore the City of Dreams from colonial heritage to Marine Drive',
    location: 'Mumbai · 1 Day Trip',
    duration: '1 Day',
    priceINR: 1300,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop',
    tags: ['🚌 AC Bus', '🗺️ Guided Tour'],
    gradientClass: 'from-[#fc5c7d] to-[#6a3093]',
    category: 'daytrip',
    region: 'dayescape',
    rating: 4.8,
    reviewCount: 520,
    description: 'Witness the iconic landmarks of Mumbai in one exhilarating day. See Gateway of India, drive through Marine Drive, cross Bandra-Worli Sea Link, and see movie star bungalows.',
    inclusions: [
      'AC Luxury Tourist Coach with wide panoramic windows',
      'Licensed Mumbai Tourism Guide',
      'Toll charges included (including Bandra-Worli Sea Link)',
      'Gateway of India photo stop and heritage commentary',
      'Chhatrapati Shivaji Maharaj Terminus (CST) exterior stop'
    ],
    itinerary: [
      { day: '08:00 AM', title: 'Pickup & Gateway of India', desc: 'Start at the historic waterfront monument and Taj Mahal Palace Hotel.' },
      { day: '10:30 AM', title: 'Marine Drive & Hanging Gardens', desc: 'Panoramic view over Back Bay and photo op at the Old Woman’s Shoe.' },
      { day: '12:30 PM', title: 'Mani Bhavan & Mahalaxmi Temple', desc: 'Mahatma Gandhi memorial and the revered coastal shrine.' },
      { day: '01:30 PM', title: 'Lunch Halt at Worli', desc: 'Enjoy seaside dining and refreshing coastal breeze.' },
      { day: '03:00 PM', title: 'Bandra-Worli Sea Link & Bandstand', desc: 'Drive on the architectural cable bridge and spot superstar residences.' },
      { day: '06:00 PM', title: 'Evening Drop-off', desc: 'Convenient drop at Dadar, Bandra, and CST.' }
    ]
  }
];
