export type ScreenId =
  | 'onboarding'
  | 'home'
  | 'explore'
  | 'detail'
  | 'post'
  | 'chat'
  | 'profile';

export type CategoryId =
  | 'all'
  | 'books'
  | 'tech'
  | 'dorm'
  | 'winter';

export type ItemCondition = 'Brand New' | 'Like New' | 'Good' | 'Fair';

export interface SupabaseListingRow {
  id: string | number;
  title: string;
  price_kgs: number;
  category: string;
  seller_name: string;
  campus_zone: string;
  urgency_badge: string | null;
  image_url: string | null;
  created_at: string;
}

export interface NewListingPayload {
  title: string;
  price_kgs: number;
  category: string;
  seller_name: string;
  campus_zone: string;
  urgency_badge: string;
  image_url: string;
  condition: ItemCondition;
  handoffZoneDetail: string;
  photos: string[];
}

export interface SellerInfo {
  id: string;
  name: string;
  handle: string;
  campus: string;
  gradYear: string;
  major: string;
  avatar: string;
  verifiedId: string;
  rating: number;
  dealsCount: number;
  onTimeRate: string;
  zeroGhostingRate: string;
  avgResponse: string;
  activeSince: string;
  rehomedCount: number;
}

export interface ListingItem {
  id: string;
  title: string;
  shortTitle: string;
  priceKgs: number;
  retailKgs?: number;
  discountBadge?: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  condition: ItemCondition;
  conditionNote: string;
  conditionSummary: string;
  courseRequirement: string;
  campusTag: string;
  pickupSpot: string;
  handoffZoneDetail: string;
  urgencyBadge?: {
    text: string;
    variant: 'coral' | 'indigo';
  };
  viewingCount: number;
  images: string[];
  specLeft: {
    label: string;
    value: string;
    subtext: string;
  };
  specRight: {
    label: string;
    value: string;
    subtext: string;
  };
  seller: SellerInfo;
  postedAgo: string;
  createdAt?: string;
  isFlashDeal?: boolean;
  reserved?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'peer' | 'me' | 'protocol';
  senderName?: string;
  text: string;
  time: string;
  read?: boolean;
}

export interface MeetupState {
  safeSpot: string;
  safeSpotNote: string;
  timeWindow: string;
  timeWindowNote: string;
  acceptedCount: number;
  userAccepted: boolean;
}

export interface ReviewItem {
  id: string;
  rating: number;
  quote: string;
  author: string;
  department: string;
  timeAgo: string;
}

export interface CampusHub {
  id: string;
  name: string;
  shortName: string;
  safeZones: string[];
  activeListings: number;
}
