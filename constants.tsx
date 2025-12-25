
import { Venue, Hotel, TravelTip, EventOption } from './types';

const today = new Date();
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15).toISOString().split('T')[0];
const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 20).toISOString().split('T')[0];

export const VENUES: Venue[] = [
  {
    id: 1,
    name: "Golden Oak Estate",
    location: "Napa Valley, CA",
    capacity: 250,
    price: 15000,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    description: "A stunning historic manor surrounded by lush vineyards and century-old oak trees. Perfect for elegant weddings or dignified memorial services.",
    unavailableDates: [nextMonth, nextMonthEnd],
    amenities: ["Valet Parking", "Catering Kitchen", "Outdoor Garden", "Bridal/Host Suite", "WiFi"],
    contactEmail: "events@goldenoak.com",
    phone: "+1 (555) 123-4567",
    websiteUrl: "https://example.com/goldenoak"
  },
  {
    id: 2,
    name: "Azure Coast Resort",
    location: "Malibu, CA",
    capacity: 150,
    price: 12000,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
    description: "Breathtaking oceanfront views with a modern, glass-walled reception hall. Ideal for graduations and naming ceremonies.",
    unavailableDates: [new Date(today.getFullYear(), today.getMonth(), 25).toISOString().split('T')[0]],
    amenities: ["Oceanfront View", "Sound System", "Handicap Accessible", "Private Beach Access"],
    contactEmail: "booking@azurecoast.resort",
    phone: "+1 (555) 987-6543",
    websiteUrl: "https://example.com/azurecoast"
  },
  {
    id: 3,
    name: "The Grand Atrium",
    location: "Chicago, IL",
    capacity: 500,
    price: 20000,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
    description: "An architectural masterpiece in the heart of the city, featuring high ceilings and marble floors.",
    unavailableDates: [],
    amenities: ["Ballroom", "Central AC", "Professional Stage", "Built-in Bar"],
    contactEmail: "info@grandatrium.com",
    phone: "+1 (555) 555-0199",
    websiteUrl: "https://example.com/grandatrium"
  }
];

export const SERVICE_VENDORS = [
  { 
    id: 'v1', 
    name: 'Elite Catering Co.', 
    category: 'Catering', 
    price: 4500, 
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
    description: 'Award-winning farm-to-table menus for grand galas and intimate gatherings.',
    estimatedTime: '6-8 Hours Service'
  },
  { 
    id: 'v2', 
    name: 'SnapMagic Photos', 
    category: 'Photography', 
    price: 2800, 
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=600',
    description: 'Capturing timeless moments with a blend of journalistic and fine-art styles.',
    estimatedTime: '10 Hours Coverage'
  },
  { 
    id: 'v3', 
    name: 'Bloom & Petal', 
    category: 'Florist', 
    price: 1500, 
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600',
    description: 'Bespoke floral arrangements that transform spaces into botanical wonderlands.',
    estimatedTime: '4 Hours Setup'
  },
  { 
    id: 'v4', 
    name: 'BeatDrop Entertainment', 
    category: 'Music/DJ', 
    price: 1200, 
    rating: 5.0,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
    description: 'High-energy performers and curators for the ultimate event atmosphere.',
    estimatedTime: '5 Hours Live Play'
  },
  { 
    id: 'v5', 
    name: 'Velvet Decor', 
    category: 'Decor', 
    price: 3200, 
    rating: 4.6,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
    description: 'Luxury rentals and spatial design for sophisticated milestones.',
    estimatedTime: 'Full Day Installation'
  },
  { 
    id: 'v6', 
    name: 'Crystal Patisserie', 
    category: 'Catering', 
    price: 950, 
    rating: 4.9,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=600',
    description: 'Exquisite cakes and dessert tables crafted by master pastry chefs.',
    estimatedTime: 'Delivery & Setup'
  }
];

export const EVENT_TYPES: string[] = ['Wedding', 'Burial', 'Graduation', 'Naming Ceremony', 'Corporate Event', 'Coronation', 'Birthday', 'Promotion'];

export const CATERING_OPTIONS: EventOption[] = [
  {
    id: 'c1',
    name: 'Gourmet Garden Buffet',
    description: 'A relaxed but elegant selection of seasonal farm-to-table dishes.',
    price: 85,
    priceType: 'per_person',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'c2',
    name: 'Royal Signature Dining',
    description: 'Multi-course plated dinner with premium wine pairings and dedicated servers.',
    price: 150,
    priceType: 'per_person',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400'
  }
];

export const ENTERTAINMENT_OPTIONS: EventOption[] = [
  {
    id: 'e1',
    name: 'Acoustic String Quartet',
    description: 'Perfect for romantic ceremonies or somber memorial services.',
    price: 1200,
    priceType: 'fixed',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'e2',
    name: 'Elite Party DJ & Lights',
    description: 'Full sound system, professional lighting, and an MC to keep the dance floor packed.',
    price: 2500,
    priceType: 'fixed',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400'
  }
];

export const ADDON_OPTIONS: EventOption[] = [
  {
    id: 'a1',
    name: 'Full Day Photography',
    description: '10 hours of coverage with 2 photographers and a digital gallery.',
    price: 3200,
    priceType: 'fixed',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: "The Grand Napa Resort",
    description: "Our primary block of rooms. Mention 'EverAfter' for a discount.",
    priceRange: "$$$",
    link: "#",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    distance: "2 miles from venue"
  }
];

export const TRAVEL_TIPS: TravelTip[] = [
  {
    id: 't1',
    title: "Complimentary Shuttle",
    content: "We provide shuttle services for all major event types hosted through our platform.",
    type: 'transport'
  }
];
