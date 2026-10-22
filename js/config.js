/* =====================================================================
   ZR MOBILE DETAILING: EDIT YOUR BUSINESS DETAILS HERE
   Everything the site shows about prices, services, add-ons, reviews,
   hours and service areas comes from this one file.
   Change a number, save, refresh the page. That's it.
   ===================================================================== */

window.ZR = {
  business: {
    name: "ZR Mobile Detailing LLC",
    motto: "We Come To You",
    phone: "9519070723",          // digits only
    phoneDisplay: "(951) 907-0723",
    email: "zrmobiledetailingllc@gmail.com",
    whatsapp: "19519070723",      // country code + number, digits only
    instagram: "https://www.instagram.com/zrdetail/",
    instagramHandle: "@zrdetail",
    city: "Kissimmee, FL",
    hours: "7 days a week · 7:00 AM – 7:00 PM", // CONFIRM with ZR
    googleReviewUrl: "",          // paste the Google "Ask for reviews" link here once the Google Business Profile is live
  },

  // Vehicle sizes. Prices below are listed in this order.
  sizes: [
    { id: "sedan", label: "Sedan / Coupe", short: "Sedan" },
    { id: "suv",   label: "SUV / Crossover", short: "SUV" },
    { id: "truck", label: "Truck / 3rd row / Van", short: "Truck / Van" },
  ],

  /* PACKAGES
     Confirmed by ZR (2026-10-22), sedan: Exterior $100, Interior $150, Full Detail $250.
     Still to confirm: the SUV and truck prices (2nd and 3rd numbers) and the Gold package. */
  packages: [
    {
      id: "exterior",
      name: "Exterior Detail",
      tagline: "That fresh-off-the-lot gloss.",
      prices: [100, 125, 150],
      duration: "1.5 – 2 hrs",
      features: [
        "Foam pre-wash + two-bucket hand wash",
        "Wheels, tires & wheel wells deep-cleaned",
        "Bug, lovebug & tar removal",
        "Door jambs wiped down",
        "Streak-free exterior glass",
        "Spray sealant + tire shine",
      ],
    },
    {
      id: "interior",
      name: "Interior Detail",
      tagline: "Clean you can smell.",
      prices: [150, 175, 200],
      duration: "2 – 3 hrs",
      features: [
        "Full vacuum: seats, carpets, trunk",
        "Dash, console, vents & cup holders",
        "Seat & carpet stain treatment",
        "Leather cleaned + conditioned",
        "Floor mats scrubbed & restored",
        "Interior glass + UV protectant",
      ],
    },
    {
      id: "full",
      name: "Full Detail",
      tagline: "Inside and out, in one visit.",
      prices: [250, 290, 330],
      duration: "3 – 4.5 hrs",
      badge: "Most popular",
      features: [
        "Everything in Exterior Detail",
        "Everything in Interior Detail",
        "Spray sealant for weeks of protection",
        "Trim dressing inside and out",
        "Fresh, neutral scent finish",
      ],
    },
    {
      id: "gold",
      name: "ZR Gold Package",
      tagline: "The full showroom treatment.",
      prices: [399, 449, 499],
      duration: "5 – 7 hrs",
      badge: "Best value",
      features: [
        "Everything in Full Detail",
        "Clay bar paint decontamination",
        "6-month paint sealant",
        "Hot-water extraction shampoo, seats & carpets",
        "Steam clean of vents & touch points",
        "Engine bay cleaning",
        "Headlight touch-up polish",
      ],
    },
  ],

  // Premium services (priced after seeing the car).
  premium: [
    {
      id: "correction",
      name: "Paint Correction",
      from: "Custom quote",
      text: "Machine polishing that removes swirl marks, light scratches and dull, oxidized paint from the Florida sun. One-step enhancement or two-step correction.",
    },
    {
      id: "ceramic",
      name: "Ceramic Coating",
      from: "Custom quote",
      text: "A hard, glossy layer bonded to your paint. Water beads off, bugs and bird droppings wipe away, and UV fading slows down. Includes decontamination and prep.",
    },
    {
      id: "fleet",
      name: "Fleet & Business",
      from: "Volume pricing",
      text: "Work trucks, dealership lots, rental and Turo hosts, office parking lots. Scheduled on a recurring basis so your vehicles always look the part.",
    },
  ],

  addons: [
    { id: "engine",    name: "Engine bay cleaning",        price: 50 },
    { id: "pet",       name: "Pet hair removal",           price: 45, note: "from" },
    { id: "shampoo",   name: "Seat & carpet shampoo",      price: 75 },
    { id: "odor",      name: "Odor elimination (ozone)",   price: 65 },
    { id: "headlight", name: "Headlight restoration",      price: 80 },
    { id: "clay",      name: "Clay bar + sealant",         price: 75 },
    { id: "leather",   name: "Leather deep conditioning",  price: 40 },
    { id: "trim",      name: "Plastic trim restoration",   price: 45 },
  ],

  // Shown in the online booking calendar. Times are customer-requested; ZR confirms.
  timeSlots: ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM"],
  closedWeekdays: [],   // e.g. [0] to close Sundays (0 = Sunday ... 6 = Saturday)

  areas: [
    "Kissimmee", "St. Cloud", "Celebration", "Poinciana", "Davenport",
    "ChampionsGate", "Four Corners", "Lake Nona", "Hunter's Creek",
    "Windermere", "Dr. Phillips", "Orlando", "Clermont", "Haines City",
  ],

  /* REVIEWS
     The first two are real comments left on @zrdetail's Instagram.
     Entries with  sample: true  show a "Sample" tag. Replace them with real
     Google reviews (copy the customer's words exactly, with permission) and
     delete the  sample: true  line. Never publish made-up reviews. */
  reviews: [
    { name: "Daniel G.", source: "Instagram", stars: 5, text: "Great job guys 💪" },
    { name: "Amo Bakery", source: "Instagram", stars: 5, text: "👏👏👏" },
    { name: "Customer name", source: "Google", stars: 5, sample: true,
      text: "Paste a real Google review here. Owners love hearing how the car looked and how easy it was to have someone come to their home." },
    { name: "Customer name", source: "Google", stars: 5, sample: true,
      text: "Paste a real Google review here. Mention the service and the neighborhood if the customer did (Celebration, St. Cloud, etc.)." },
    { name: "Customer name", source: "Google", stars: 5, sample: true,
      text: "Paste a real Google review here." },
  ],
};
