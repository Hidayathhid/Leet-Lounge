export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  category: "news" | "event" | "offer" | "tournament";
}

export const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "Grand Summer Tournament 2025",
    content: "Join us for our biggest gaming event of the year. Over $5,000 in prizes to be won across multiple game categories. Pre-registration is now open!",
    date: "May 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    category: "tournament"
  },
  {
    id: 2,
    title: "New RTX 4090 Stations",
    content: "We've upgraded our VIP lounge with brand new RTX 4090 graphics cards. Experience the ultimate gaming performance with ray tracing and DLSS 3.5 technology.",
    date: "April 15, 2025",
    category: "news"
  },
  {
    id: 3,
    title: "Weekday Special Offer",
    content: "Book any station Monday through Thursday before 4 PM and get 1 hour free for every 2 hours booked. Offer valid until end of April.",
    date: "April 1, 2025",
    category: "offer"
  },
  {
    id: 4,
    title: "FIFA 26 Launch Party",
    content: "Be the first to play FIFA 26 at our exclusive launch event. Join us for tournaments, prizes, and special guests from the local esports scene.",
    date: "March 24, 2025",
    category: "event"
  }
];