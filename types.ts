
export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'Invited' | 'Confirmed' | 'Declined';
  plusOne: boolean;
}

export interface Venue {
  id: number;
  name: string;
  location: string;
  capacity: number;
  price: number;
  image: string;
  description: string;
  unavailableDates?: string[];
  amenities: string[];
  contactEmail: string;
  phone: string;
  websiteUrl: string;
}

export type EventType = 'Wedding' | 'Burial' | 'Graduation' | 'Naming Ceremony' | 'Corporate' | 'Coronation' | 'Birthday' | 'Promotion' | 'Other';

export interface CustomExpense {
  id: string;
  category: string;
  amount: number;
}

export interface HiredVendor {
  id: string;
  name: string;
  category: string;
  price: number;
  isCustom: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  link: string;
  image: string;
  distance: string;
}

export interface TravelTip {
  id: string;
  title: string;
  content: string;
  type: 'transport' | 'tip' | 'warning';
}

export interface EventOption {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'fixed' | 'per_person';
  image: string;
}

export interface EventData {
  hostNames: string;
  eventType: EventType;
  date: string;
  location: string;
  budget: number;
  guests: Guest[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
