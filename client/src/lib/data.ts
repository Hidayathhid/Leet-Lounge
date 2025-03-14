export const lounges = [
  {
    name: "PlayStation Lounge",
    description: "Immerse yourself in the latest PlayStation games with friends on comfortable seating and premium displays.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
    icon: "fab fa-playstation",
    iconColor: "text-blue-500"
  },
  {
    name: "Smoking Lounge",
    description: "PC gaming with dedicated smoking areas featuring powerful ventilation and premium gaming rigs.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-smoking",
    iconColor: "text-gray-400",
    specs: {
      processor: "Core i7-14700F",
      monitor: "165Hz Monitor",
      ram: "32GB RAM",
      gpu: "RTX 3060 Ti"
    }
  },
  {
    name: "Non-Smoking Lounge",
    description: "A clean, smoke-free environment for focused PC gaming with high-performance setups.",
    image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-ban",
    iconColor: "text-red-500",
    specs: {
      processor: "Core i7-14700F",
      monitor: "165Hz Monitor",
      ram: "32GB RAM",
      gpu: "RTX 3060 Ti"
    }
  },
  {
    name: "VIP & Streaming",
    description: "Premium experience with top-tier equipment perfect for tournaments, streaming, and professional gaming.",
    image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-crown",
    iconColor: "text-yellow-500",
    specs: {
      processor: "Core i9-14900K",
      monitor: "BENQ 360Hz + 2x 240Hz",
      ram: "32GB RAM",
      gpu: "RTX 4090",
      extras: "Rhode Mic + Sony Cam"
    }
  }
];

export const featuredGames = [
  {
    name: "Cyberpunk 2077",
    platform: "PC",
    platformIcon: "fas fa-desktop",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    badge: "Popular",
    badgeColor: "bg-blue-500"
  },
  {
    name: "Call of Duty: Warzone",
    platform: "PC",
    platformIcon: "fas fa-desktop",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "FIFA 23",
    platform: "PlayStation",
    platformIcon: "fab fa-playstation",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    badge: "New",
    badgeColor: "bg-purple-500"
  },
  {
    name: "Grand Theft Auto V",
    platform: "PC",
    platformIcon: "fas fa-desktop",
    image: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "Fortnite",
    platform: "PC",
    platformIcon: "fas fa-desktop",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  }
];

export const gameCategories = [
  {
    name: "FPS Games",
    icon: "fas fa-crosshairs",
    iconColor: "text-red-500",
    games: ["Call of Duty Series", "Counter-Strike 2", "Apex Legends", "Valorant", "Rainbow Six Siege"]
  },
  {
    name: "MOBA Games",
    icon: "fas fa-chess-rook",
    iconColor: "text-blue-500",
    games: ["Dota 2", "League of Legends", "Heroes of the Storm", "SMITE", "Mobile Legends"]
  },
  {
    name: "Sports Games",
    icon: "fas fa-futbol",
    iconColor: "text-green-500",
    games: ["FIFA Series", "NBA 2K Series", "Madden NFL Series", "F1 Series", "EA Sports FC"]
  },
  {
    name: "Racing Games",
    icon: "fas fa-car",
    iconColor: "text-yellow-500",
    games: ["Forza Horizon Series", "Need for Speed Series", "Gran Turismo 7", "Assetto Corsa", "Dirt Rally"]
  },
  {
    name: "RPG Games",
    icon: "fas fa-dragon",
    iconColor: "text-purple-500",
    games: ["The Witcher 3", "Skyrim", "Elden Ring", "Baldur's Gate 3", "Cyberpunk 2077"]
  },
  {
    name: "Battle Royale",
    icon: "fas fa-parachute-box",
    iconColor: "text-orange-500",
    games: ["Fortnite", "PUBG", "Apex Legends", "Warzone", "Fall Guys"]
  }
];

export const foodItems = [
  {
    name: "Gamer's Pizza",
    description: "Loaded with pepperoni, mozzarella, and special sauce.",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "Power-Up Burger",
    description: "Angus beef with cheese, bacon, lettuce, and special sauce.",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "XP Nachos",
    description: "Crispy tortilla chips with melted cheese, jalapeños, and salsa.",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "Loaded Fries",
    description: "Crispy fries with cheese sauce, bacon bits, and green onions.",
    price: "$7.99",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  }
];

export const drinkItems = [
  {
    name: "Gamer Fuel",
    description: "Our special energy drink to keep you in the zone.",
    price: "$4.99",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "Respawn Coffee",
    description: "Specialty coffee to boost your focus and reaction time.",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "Level-Up Milkshake",
    description: "Creamy vanilla milkshake with cookie chunks and whipped cream.",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    name: "Classic Sodas",
    description: "Range of carbonated beverages to quench your thirst.",
    price: "$2.99",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  }
];

export const facilities = [
  {
    name: "Gigabit Internet",
    description: "Experience blazing-fast 1Gbps symmetrical fiber optic internet with ultra-low latency for competitive gaming.",
    image: "https://images.unsplash.com/photo-1618173745267-c78d8c6ff3d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-wifi"
  },
  {
    name: "Ergonomic Seating",
    description: "Premium gaming chairs designed for maximum comfort during extended gaming sessions.",
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-chair"
  },
  {
    name: "Tournament Area",
    description: "Dedicated space for hosting competitive gaming events and tournaments with spectator seating.",
    image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-trophy"
  },
  {
    name: "Chill-Out Zones",
    description: "Relaxation areas where gamers can take breaks, socialize, and enjoy refreshments.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-couch"
  },
  {
    name: "Pro Peripherals",
    description: "High-end gaming mice, mechanical keyboards, and professional headsets at every station.",
    image: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-keyboard"
  },
  {
    name: "Streaming Booths",
    description: "Professional streaming setups with sound isolation, green screens, and professional lighting.",
    image: "https://images.unsplash.com/photo-1625378082042-48fd62a9e597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    icon: "fas fa-video"
  }
];

export const faqItems = [
  {
    question: "What are your operating hours?",
    answer: "We're open 7 days a week from 10:00 AM to 2:00 AM. On weekends (Friday and Saturday), we extend our hours until 4:00 AM for late-night gaming sessions."
  },
  {
    question: "What are your pricing options?",
    answer: "We offer hourly rates starting at $5/hour for standard PCs, with discounted packages for longer sessions. VIP and Streaming stations are $10/hour. We also offer day passes and membership options that provide significant savings for regular gamers."
  },
  {
    question: "Can I reserve a station in advance?",
    answer: "Yes! We highly recommend reservations, especially for VIP and Streaming stations or during peak hours. You can make reservations through our website, mobile app, or by calling us directly. A 50% deposit is required for reservations longer than 3 hours."
  },
  {
    question: "Do you host tournaments?",
    answer: "Absolutely! We host weekly tournaments for popular games like Counter-Strike 2, Valorant, League of Legends, and more. Check our events calendar for upcoming tournaments. We also offer private tournament bookings for groups and organizations."
  },
  {
    question: "Is there an age restriction?",
    answer: "Players of all ages are welcome during regular hours (10 AM to 10 PM). After 10 PM, we switch to 18+ only. Gamers under 16 must be accompanied by an adult during their visit. We strictly adhere to game rating guidelines."
  },
  {
    question: "Can I install my own games?",
    answer: "Our PCs come pre-installed with over 100 popular games. If you want to play a game that's not in our library, please let us know in advance. We can install additional games with proper licensing. You can also log in to your personal accounts like Steam, Epic Games, etc."
  }
];
