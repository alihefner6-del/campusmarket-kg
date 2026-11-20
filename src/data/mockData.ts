import {
  CampusHub,
  CategoryId,
  ChatMessage,
  ListingItem,
  MeetupState,
  ReviewItem,
  SellerInfo,
  SupabaseListingRow,
} from '../types';

export const IMAGES = {
  macroeconomics: '/src/assets/images/textbook_macroeconomics_1795162802968.jpg',
  lamp: '/src/assets/images/xiaomi_desk_lamp_1795162803959.jpg',
  calculator: '/src/assets/images/ti84_calculator_1795162806959.jpg',
  jacket: '/src/assets/images/winter_puffer_jacket_1795162806485.jpg',
  usbcHub: '/src/assets/images/macbook_usbc_hub_1795162806247.jpg',
  avatarAigul: '/src/assets/images/student_avatar_aigul_1795162806052.jpg',
  avatarPeer: '/src/assets/images/student_avatar_peer_1795162806710.jpg',
};

export const BISHKEK_CAMPUSES: CampusHub[] = [
  {
    id: 'all',
    name: 'AUCA Campus (+ Bishkek Hub)',
    shortName: 'AUCA + Bishkek',
    safeZones: ['AUCA Main Forum', 'AUCA Library Checkpoint', 'Manas Cafeteria'],
    activeListings: 340,
  },
  {
    id: 'auca',
    name: 'AUCA (American Univ. of Central Asia)',
    shortName: 'AUCA Campus',
    safeZones: ['AUCA Main Forum (Under Big Screen)', 'Library Checkpoint', 'Dorm 2 Lobby'],
    activeListings: 148,
  },
  {
    id: 'manas',
    name: 'Kyrgyz-Turkish Manas University',
    shortName: 'Manas Campus',
    safeZones: ['Manas Cafeteria Hub', 'Rectorate Atrium', 'Djal Dorm Gate'],
    activeListings: 84,
  },
  {
    id: 'krsu',
    name: 'KRSU (Kyrgyz-Russian Slavic Univ.)',
    shortName: 'KRSU Hub',
    safeZones: ['KRSU Main Building Desk', 'Chui Ave Courtyard'],
    activeListings: 52,
  },
  {
    id: 'kstu',
    name: 'KSTU (Polytechnic University)',
    shortName: 'KSTU Main Campus',
    safeZones: ['KSTU Main Hall Security', 'Tech Library Bench'],
    activeListings: 34,
  },
  {
    id: 'alatoo',
    name: 'Ala-Too International University',
    shortName: 'Ala-Too Block A',
    safeZones: ['Ala-Too Cafeteria (Block B)', 'Block A Reception'],
    activeListings: 22,
  },
];

export const SELLERS: Record<string, SellerInfo> = {
  aigul: {
    id: 'aigul',
    name: 'Aigul Nurbekova',
    handle: 'Aigul N.',
    campus: 'AUCA',
    gradYear: "'25",
    major: "Software Eng, '25",
    avatar: IMAGES.avatarAigul,
    verifiedId: '#AUCA-8921',
    rating: 4.95,
    dealsCount: 52,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '99%',
    avgResponse: '< 15 min',
    activeSince: 'Sep 2023',
    rehomedCount: 28,
  },
  erzhan: {
    id: 'erzhan',
    name: 'Erzhan Kadyrov',
    handle: 'Erzhan K.',
    campus: 'AUCA',
    gradYear: "'25",
    major: 'Economics Senior',
    avatar: IMAGES.avatarPeer,
    verifiedId: '#AUCA-4410',
    rating: 4.9,
    dealsCount: 19,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '98%',
    avgResponse: '< 12 min',
    activeSince: 'Oct 2023',
    rehomedCount: 14,
  },
  aida: {
    id: 'aida',
    name: 'Aida Mambetova',
    handle: 'Aida M.',
    campus: 'KRSU',
    gradYear: "'25",
    major: 'Architecture Junior',
    avatar: IMAGES.avatarAigul,
    verifiedId: '#KRSU-3109',
    rating: 4.88,
    dealsCount: 15,
    onTimeRate: '97% on-time meetup',
    zeroGhostingRate: '97%',
    avgResponse: '< 20 min',
    activeSince: 'Feb 2024',
    rehomedCount: 11,
  },
  daniyar: {
    id: 'daniyar',
    name: 'Daniyar S.',
    handle: 'Daniyar S.',
    campus: 'AUCA',
    gradYear: "'25",
    major: 'AUCA Applied Math Senior',
    avatar: IMAGES.avatarPeer,
    verifiedId: '#AUCA-2401',
    rating: 4.9,
    dealsCount: 42,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '99%',
    avgResponse: '< 10 min',
    activeSince: 'Sep 2022',
    rehomedCount: 31,
  },
  tilek: {
    id: 'tilek',
    name: 'Tilek B.',
    handle: 'Tilek B.',
    campus: 'KSTU',
    gradYear: "'24",
    major: 'KSTU Civil Eng Senior',
    avatar: IMAGES.avatarPeer,
    verifiedId: '#KSTU-1982',
    rating: 4.92,
    dealsCount: 27,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '98%',
    avgResponse: '< 15 min',
    activeSince: 'Nov 2023',
    rehomedCount: 21,
  },
  diana: {
    id: 'diana',
    name: 'Diana T.',
    handle: 'Diana T.',
    campus: 'AIU',
    gradYear: "'25",
    major: 'International Relations',
    avatar: IMAGES.avatarAigul,
    verifiedId: '#AIU-7731',
    rating: 4.96,
    dealsCount: 23,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '100%',
    avgResponse: '< 8 min',
    activeSince: 'Jan 2024',
    rehomedCount: 18,
  },
  bakyt: {
    id: 'bakyt',
    name: 'Bakyt T.',
    handle: 'Bakyt T.',
    campus: 'AUCA',
    gradYear: "'25",
    major: 'AUCA Senior',
    avatar: IMAGES.avatarPeer,
    verifiedId: '#AUCA-5503',
    rating: 4.94,
    dealsCount: 34,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '99%',
    avgResponse: '< 9 min',
    activeSince: 'Sep 2023',
    rehomedCount: 24,
  },
};

export const INITIAL_LISTINGS: ListingItem[] = [
  {
    id: 'mankiw-macro',
    title: 'Macroeconomics Mankiw 9th Ed',
    shortTitle: 'Macroeconomics Mankiw 9th Ed',
    priceKgs: 850,
    retailKgs: 2200,
    discountBadge: 'SAVE 61%',
    category: 'books',
    categoryLabel: 'Course Books',
    condition: 'Like New',
    conditionNote: 'Like New • Clean margins',
    conditionSummary: 'Like New • Clean margins, zero highlighter',
    courseRequirement: 'Required for AUCA Econ 101 & Macro Theory',
    campusTag: 'AUCA Econ 101',
    pickupSpot: 'AUCA Main Forum',
    handoffZoneDetail: 'AUCA Main Forum or Library Checkpoint',
    urgencyBadge: {
      text: '4 watching',
      variant: 'coral',
    },
    viewingCount: 4,
    images: [IMAGES.macroeconomics, IMAGES.usbcHub, IMAGES.calculator, IMAGES.lamp],
    specLeft: {
      label: 'Page Condition',
      value: '99% Clean',
      subtext: 'Zero torn pages or ink',
    },
    specRight: {
      label: 'Edition Match',
      value: '9th Intl Ed.',
      subtext: 'Matches Fall syllabus',
    },
    seller: SELLERS.erzhan,
    postedAgo: '1h ago',
    isFlashDeal: true,
  },
  {
    id: 'xiaomi-lamp',
    title: 'Xiaomi Desk Lamp',
    shortTitle: 'Xiaomi Desk Lamp',
    priceKgs: 700,
    retailKgs: 1000,
    discountBadge: '-30%',
    category: 'dorm',
    categoryLabel: 'Dorm & Desk',
    condition: 'Good',
    conditionNote: 'Good • Box included',
    conditionSummary: 'Good Condition • Original box & EU adapter',
    courseRequirement: 'Flicker-free eye care for late-night finals prep',
    campusTag: 'Dorm 2 Hand-off',
    pickupSpot: 'Dorm 2 Lobby',
    handoffZoneDetail: 'Dorm 2 Lobby or KRSU Main Building Desk',
    urgencyBadge: {
      text: 'Price Drop: -300',
      variant: 'coral',
    },
    viewingCount: 5,
    images: [IMAGES.lamp, IMAGES.usbcHub, IMAGES.macroeconomics, IMAGES.jacket],
    specLeft: {
      label: 'Light Modes',
      value: 'Stepless Dim',
      subtext: '2700K–6500K warm/cool',
    },
    specRight: {
      label: 'Included Gear',
      value: 'Original Box',
      subtext: 'Type-C & KG plug adapter',
    },
    seller: SELLERS.aida,
    postedAgo: '3h ago',
    isFlashDeal: true,
  },
  {
    id: 'ti84-silver',
    title: 'TI-84 Plus CE Calculator (Math Dept Approved)',
    shortTitle: 'TI-84 Plus Silver Edition',
    priceKgs: 3200,
    retailKgs: 5500,
    discountBadge: 'SAVE 42%',
    category: 'tech',
    categoryLabel: 'Tech & Graphing',
    condition: 'Like New',
    conditionNote: 'Fresh AAA batteries',
    conditionSummary: 'Excellent Condition • Battery holds 2 weeks',
    courseRequirement: 'Required for AUCA Math 101 & Linear Algebra',
    campusTag: 'KSTU Main Campus',
    pickupSpot: 'Dorm 3 Pickup',
    handoffZoneDetail: 'AUCA Main Forum or Library Checkpoint',
    urgencyBadge: {
      text: 'Exam Approved',
      variant: 'indigo',
    },
    viewingCount: 6,
    images: [IMAGES.calculator, IMAGES.usbcHub, IMAGES.macroeconomics, IMAGES.lamp],
    specLeft: {
      label: 'Battery Health',
      value: '98% Nominal',
      subtext: 'Holds full exam week',
    },
    specRight: {
      label: 'Included Gear',
      value: 'Cable & Slide Cover',
      subtext: 'Original TI accessories',
    },
    seller: SELLERS.daniyar,
    postedAgo: '45m ago',
    isFlashDeal: true,
  },
  {
    id: 'winter-puffer',
    title: 'Winter Down Puffer Jacket',
    shortTitle: 'Winter Down Puffer Jacket',
    priceKgs: 2800,
    retailKgs: 5200,
    discountBadge: 'Size M',
    category: 'winter',
    categoryLabel: 'Winter Gear',
    condition: 'Like New',
    conditionNote: 'Dry Cleaned 10/10',
    conditionSummary: 'Dry Cleaned 10/10 • Windproof Bishkek winter fit',
    courseRequirement: 'Rated to -18°C for early morning marshrutka commutes',
    campusTag: 'Ala-Too Block A',
    pickupSpot: 'Ala-Too Block A',
    handoffZoneDetail: 'Ala-Too Cafeteria (Block B) or Dordoi Plaza',
    urgencyBadge: {
      text: 'Just Listed',
      variant: 'coral',
    },
    viewingCount: 3,
    images: [IMAGES.jacket, IMAGES.lamp, IMAGES.usbcHub, IMAGES.macroeconomics],
    specLeft: {
      label: 'Size & Fit',
      value: 'Size M (Unisex)',
      subtext: 'Clean zippers & hood',
    },
    specRight: {
      label: 'Care Status',
      value: 'Dry Cleaned',
      subtext: 'Ready to wear today',
    },
    seller: SELLERS.diana,
    postedAgo: '20m ago',
    isFlashDeal: false,
  },
  {
    id: 'ti84-ce-featured',
    title: 'TI-84 Plus CE Calculator (Math Dept Approved)',
    shortTitle: 'TI-84 Plus CE Cal',
    priceKgs: 4500,
    retailKgs: 11000,
    discountBadge: 'SAVE 59%',
    category: 'tech',
    categoryLabel: 'Tech & Graphing',
    condition: 'Like New',
    conditionNote: 'Battery holds 2 weeks',
    conditionSummary: 'Excellent Condition • Battery holds 2 weeks',
    courseRequirement: 'Required for AUCA Math 101 & Linear Algebra',
    campusTag: 'AUCA Math Dept',
    pickupSpot: 'Dorm 3 Pickup',
    handoffZoneDetail: 'AUCA Main Forum or Library Checkpoint',
    urgencyBadge: {
      text: 'Exam Approved',
      variant: 'indigo',
    },
    viewingCount: 6,
    images: [IMAGES.calculator, IMAGES.macroeconomics, IMAGES.usbcHub, IMAGES.lamp],
    specLeft: {
      label: 'Battery Health',
      value: '98% Nominal',
      subtext: 'Holds full exam week',
    },
    specRight: {
      label: 'Included Gear',
      value: 'Cable & Slide Cover',
      subtext: 'Original TI accessories',
    },
    seller: SELLERS.daniyar,
    postedAgo: '15m ago',
    isFlashDeal: true,
    reserved: true,
  },
  {
    id: 'macbook-usbc-hub',
    title: 'MacBook 7-in-1 USB-C Hub (4K HDMI + SD)',
    shortTitle: 'MacBook 7-in-1 USB-C Hub',
    priceKgs: 1100,
    retailKgs: 1900,
    discountBadge: 'SAVE 42%',
    category: 'tech',
    categoryLabel: 'Tech & Graphing',
    condition: 'Like New',
    conditionNote: 'Tested with M1/M2',
    conditionSummary: 'Like New • 100W PD Pass-through & HDMI',
    courseRequirement: 'Ideal for CS & Software Engineering classroom projectors',
    campusTag: 'AUCA Forum',
    pickupSpot: 'AUCA Forum meetup',
    handoffZoneDetail: 'AUCA Main Forum (Under Big Screen)',
    urgencyBadge: {
      text: 'Active',
      variant: 'indigo',
    },
    viewingCount: 2,
    images: [IMAGES.usbcHub, IMAGES.calculator, IMAGES.lamp, IMAGES.macroeconomics],
    specLeft: {
      label: 'Ports',
      value: '7-in-1 Aluminum',
      subtext: '4K HDMI, 2x USB-A, SD',
    },
    specRight: {
      label: 'Compatibility',
      value: 'macOS & Win',
      subtext: 'Plug-and-play tested',
    },
    seller: SELLERS.aigul,
    postedAgo: '2h ago',
    isFlashDeal: false,
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    rating: 5.0,
    quote:
      'Super reliable! Met right at AUCA Library, textbook was in pristine shape. Fast MBank payment.',
    author: 'Nurlan S.',
    department: 'Business Dept',
    timeAgo: '2 days ago',
  },
  {
    id: 'rev-2',
    rating: 5.0,
    quote:
      'Easy handoff at Ala-Too Cafeteria. Safe and honest seller, items exactly as pictured!',
    author: 'Bermet K.',
    department: 'Economics',
    timeAgo: '1 week ago',
  },
  {
    id: 'rev-3',
    rating: 5.0,
    quote:
      'Responded in 5 minutes and waited right by the security desk. Would definitely buy from Aigul again.',
    author: 'Timur A.',
    department: 'Computer Science',
    timeAgo: '3 weeks ago',
  },
];

export const INITIAL_MEETUP: MeetupState = {
  safeSpot: 'AUCA Main Forum (Under Big Screen)',
  safeSpotNote: '24/7 Monitored Campus Guard Zone',
  timeWindow: 'Tomorrow (Wed) • 12:15 - 12:45 PM',
  timeWindowNote: 'During Common Lunch Break • Zero Class Conflict',
  acceptedCount: 1,
  userAccepted: false,
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'peer',
    senderName: 'Bakyt T.',
    text: 'Salam! Yes, the calculator is in mint condition. Original cable and case included. Does 12:15 lunch break at AUCA Forum work?',
    time: '12:15 PM',
  },
  {
    id: 'm2',
    sender: 'protocol',
    text: 'Always inspect and power on the device before sending Som via MBank or Demir. Cashless transfer is finalized right at the forum desk.',
    time: '12:15 PM',
  },
  {
    id: 'm3',
    sender: 'me',
    text: 'Sounds perfect! I have class in Room 204 until 12:10, will meet you right by the security desk. 4,500 KGS ready on MBank.',
    time: '12:18 PM',
    read: true,
  },
  {
    id: 'm4',
    sender: 'peer',
    senderName: 'Bakyt T.',
    text: 'Great, see you then! Just confirmed the meetup widget above. See you at lunch! 🙌',
    time: '12:19 PM',
  },
];

export const CAMPUS_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Price drop on Xiaomi Desk Lamp (-300 KGS)',
    sub: 'Aida M. • KRSU Campus · 14m ago',
  },
  {
    id: 'n2',
    title: 'Bakyt T. confirmed AUCA Main Forum meetup',
    sub: 'Tomorrow 12:15 - 12:45 PM · 1h ago',
  },
  {
    id: 'n3',
    title: '6 students viewing TI-84 Plus CE Calculator',
    sub: 'Finals Prep Flash Deal ends 18:00 · 2h ago',
  },
];

function normalizeCategory(raw: string): Exclude<CategoryId, 'all'> {
  const lower = (raw || '').toLowerCase();
  if (lower.includes('tech') || lower.includes('calc') || lower.includes('laptop')) {
    return 'tech';
  }
  if (lower.includes('dorm') || lower.includes('lamp') || lower.includes('desk')) {
    return 'dorm';
  }
  if (lower.includes('winter') || lower.includes('coat') || lower.includes('jacket')) {
    return 'winter';
  }
  return 'books';
}

function defaultImageForCategory(cat: Exclude<CategoryId, 'all'>): string {
  switch (cat) {
    case 'tech':
      return IMAGES.calculator;
    case 'dorm':
      return IMAGES.lamp;
    case 'winter':
      return IMAGES.jacket;
    case 'books':
    default:
      return IMAGES.macroeconomics;
  }
}

function formatRelativeTime(isoDate?: string): string {
  if (!isoDate) return 'Just now';
  const parsed = Date.parse(isoDate);
  if (Number.isNaN(parsed)) return 'Just now';
  const diffMins = Math.max(0, Math.floor((Date.now() - parsed) / 60000));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

function resolveSellerFromName(sellerName: string, campusZone: string): SellerInfo {
  const cleanName = (sellerName || 'Aigul Nurbekova').trim();
  const matched = Object.values(SELLERS).find(
    (s) =>
      s.name.toLowerCase() === cleanName.toLowerCase() ||
      s.handle.toLowerCase() === cleanName.toLowerCase()
  );
  if (matched) return matched;

  const zoneUpper = (campusZone || 'AUCA').toUpperCase();
  const campus = zoneUpper.includes('MANAS')
    ? 'Manas'
    : zoneUpper.includes('KRSU')
    ? 'KRSU'
    : zoneUpper.includes('KSTU')
    ? 'KSTU'
    : zoneUpper.includes('ALA-TOO') || zoneUpper.includes('AIU')
    ? 'AIU'
    : 'AUCA';

  const parts = cleanName.split(/\s+/);
  const handle =
    parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : cleanName;

  return {
    id: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'peer',
    name: cleanName,
    handle,
    campus,
    gradYear: "'25",
    major: `${campus} Verified Student`,
    avatar: IMAGES.avatarAigul,
    verifiedId: `#${campus}-2026`,
    rating: 4.9,
    dealsCount: 12,
    onTimeRate: '100% on-time meetup',
    zeroGhostingRate: '99%',
    avgResponse: '< 15 min',
    activeSince: 'Sep 2024',
    rehomedCount: 12,
  };
}

export function mapSupabaseRowToListingItem(row: SupabaseListingRow): ListingItem {
  const cat = normalizeCategory(row.category);
  const imgUrl = row.image_url?.trim() || defaultImageForCategory(cat);
  const badgeText = row.urgency_badge?.trim() || 'Just Listed';
  const isIndigoBadge =
    badgeText.toLowerCase().includes('exam') ||
    badgeText.toLowerCase().includes('verified') ||
    badgeText.toLowerCase().includes('active');
  const price = Math.max(0, Math.round(Number(row.price_kgs) || 0));
  const seller = resolveSellerFromName(row.seller_name, row.campus_zone);
  const campusZone = row.campus_zone?.trim() || 'AUCA Forum';

  return {
    id: String(row.id),
    title: row.title,
    shortTitle: row.title,
    priceKgs: price,
    retailKgs: price > 0 ? Math.round(price * 1.85) : undefined,
    discountBadge: badgeText,
    category: cat,
    categoryLabel: row.category || 'Course Books',
    condition: 'Like New',
    conditionNote: `${row.category || 'Verified'} • Safe-zone ready`,
    conditionSummary: 'Verified Campus Listing • Safe-zone handoff ready',
    courseRequirement: `Available for verified ${seller.campus} & Bishkek student pickup`,
    campusTag: campusZone,
    pickupSpot: campusZone,
    handoffZoneDetail: campusZone,
    urgencyBadge: {
      text: badgeText,
      variant: isIndigoBadge ? 'indigo' : 'coral',
    },
    viewingCount: 4,
    images: [imgUrl, IMAGES.usbcHub, IMAGES.macroeconomics],
    specLeft: {
      label: 'Category',
      value: row.category || 'Student Gear',
      subtext: 'Verified listing',
    },
    specRight: {
      label: 'Campus Zone',
      value: campusZone,
      subtext: 'MBank QR or Cash on check',
    },
    seller,
    postedAgo: formatRelativeTime(row.created_at),
    createdAt: row.created_at,
    isFlashDeal: badgeText.toLowerCase().includes('drop') || badgeText.toLowerCase().includes('flash'),
  };
}
