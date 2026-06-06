// Database types for Supabase tables

export interface Profile {
  id: string; // UUID
  name: string;
  email: string | null;
  phone: string | null;
  university: string | null;
  bio: string | null;
  avatar_url: string | null;
  join_date: string;
  rating: number;
  response_time: string | null;
  is_verified: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  emoji: string | null;
}

export interface Listing {
  id: number;
  title: string;
  description: string | null;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  status: 'Active' | 'Sold';
  category_id: number | null;
  seller_id: string; // UUID
  university: string | null;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface ListingWithDetails extends Listing {
  seller: Profile;
  category: Category | null;
}

export interface Favorite {
  id: number;
  user_id: string; // UUID
  listing_id: number;
  created_at: string;
}

export interface Conversation {
  id: number;
  listing_id: number | null;
  buyer_id: string; // UUID
  seller_id: string; // UUID
  last_message: string | null;
  last_message_at: string | null;
  buyer_unread: number;
  seller_unread: number;
  created_at: string;
}

export interface ConversationWithDetails extends Conversation {
  listing: Listing | null;
  buyer: Profile;
  seller: Profile;
  other_user?: Profile; // The other participant (computed)
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: string; // UUID
  content: string;
  created_at: string;
}

export interface Review {
  id: number;
  reviewer_id: string; // UUID
  seller_id: string; // UUID
  listing_id: number | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: string; // UUID
  type: 'message' | 'offer' | 'sold' | 'review' | 'system';
  title: string;
  body: string | null;
  is_read: boolean;
  related_id: number | null;
  created_at: string;
}
