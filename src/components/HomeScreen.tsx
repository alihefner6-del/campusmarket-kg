import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  BadgeCheck,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Flame,
  Laptop,
  MapPin,
  Package,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Zap,
} from 'lucide-react';
import { BISHKEK_CAMPUSES, CAMPUS_NOTIFICATIONS, IMAGES } from '../data/mockData';
import { CategoryId, ListingItem, ScreenId } from '../types';
import { BrandMark } from './BrandMark';
import { SafeImage } from './SafeImage';

interface HomeScreenProps {
  listings: ListingItem[];
  isExploreMode?: boolean;
  isLoadingListings?: boolean;
  listingsError?: string | null;
  onRetryFetch?: () => void;
  selectedCampusId: string;
  onSelectCampus: (campusId: string) => void;
  onSelectItem: (item: ListingItem) => void;
  onNavigate: (screen: ScreenId) => void;
}

const TICKER_EVENTS = [
  { actor: 'Begimai from Manas', action: 'just bought Stewart Calculus', time: '2m ago' },
  { actor: 'Nurlan from AUCA', action: 'reserved TI-84 Plus CE', time: '5m ago' },
  { actor: 'Aibek from KRSU', action: 'picked up Desk Lamp at Dorm 2', time: '11m ago' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  listings,
  isExploreMode = false,
  isLoadingListings = false,
  listingsError = null,
  onRetryFetch,
  selectedCampusId,
  onSelectCampus,
  onSelectItem,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [flashOnly, setFlashOnly] = useState(false);
  const [showAllItems, setShowAllItems] = useState(true);
  const [showCampusMenu, setShowCampusMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [showQrModal, setShowQrModal] = useState(false);

  const currentCampus =
    BISHKEK_CAMPUSES.find((c) => c.id === selectedCampusId) || BISHKEK_CAMPUSES[0];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (flashOnly && !item.isFlashDeal) {
        return false;
      }
      if (selectedCampusId !== 'all') {
        const campusKey = selectedCampusId.toLowerCase();
        const itemCampus = `${item.campusTag} ${item.seller.campus} ${item.pickupSpot}`.toLowerCase();
        if (campusKey === 'alatoo') {
          if (!itemCampus.includes('ala-too') && !itemCampus.includes('aiu')) return false;
        } else if (!itemCampus.includes(campusKey)) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${item.title} ${item.shortTitle} ${item.categoryLabel} ${item.campusTag} ${item.seller.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [listings, activeCategory, flashOnly, selectedCampusId, searchQuery]);

  const displayedListings = showAllItems
    ? filteredListings
    : filteredListings.slice(0, 4);

  const ticker = TICKER_EVENTS[tickerIdx];

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#F7F8FC] relative">
      {/* Top App Header */}
      <header className="shrink-0 bg-white px-4 pt-3 pb-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <BrandMark size="sm" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#4F46E5] leading-none">
              Bishkek Campuses
            </p>
            <h1 className="font-display text-[15px] font-bold text-slate-900 leading-tight truncate">
              {isExploreMode ? 'Explore Safe Zones' : 'Home'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowNotifications((v) => !v)}
            aria-label="Campus notifications"
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
          >
            <Bell className="w-[18px] h-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            aria-label="Open student profile"
            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#4F46E5]/20 cursor-pointer"
          >
            <SafeImage
              src={IMAGES.avatarAigul}
              alt="Aigul Nurbekova"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-[56px] right-3 left-3 z-40 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-900">Campus Alerts (3)</span>
            <button
              type="button"
              onClick={() => setShowNotifications(false)}
              className="text-[11px] font-semibold text-[#4F46E5] cursor-pointer"
            >
              Close
            </button>
          </div>
          {CAMPUS_NOTIFICATIONS.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                setShowNotifications(false);
                onNavigate('chat');
              }}
              className="w-full text-left p-2 rounded-xl hover:bg-[#F7F8FC] transition-colors cursor-pointer"
            >
              <p className="text-[12px] font-semibold text-slate-800">{n.title}</p>
              <p className="text-[11px] text-slate-500">{n.sub}</p>
            </button>
          ))}
        </div>
      )}

      {/* QR Safe Check-in Modal */}
      {showQrModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="bg-white rounded-3xl p-5 w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h2 className="font-display text-base font-bold text-slate-900">
              Safe-Zone QR & MBank Verify
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Scan a peer&apos;s CampusMarket QR badge at AUCA Forum or Library Checkpoint to confirm student identity before handing over cash or scanning MBank QR.
            </p>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full h-10 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 pt-2.5 pb-6 space-y-2.5">
        {/* Campus Selector + Filter + Bell Row */}
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCampusMenu((v) => !v)}
            className="flex-1 min-w-0 bg-white border border-slate-200/70 rounded-full px-3 py-2 flex items-center justify-between gap-2 shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-[#FF5A36] shrink-0" />
              <span className="text-[12.5px] font-semibold text-slate-900 truncate">
                {currentCampus.name}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setFlashOnly((v) => !v)}
            aria-label="Toggle flash deal filter"
            className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              flashOnly
                ? 'bg-[#4F46E5] border-[#4F46E5] text-white'
                : 'bg-white border-slate-200/70 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowNotifications((v) => !v)}
            aria-label="3 unread alerts"
            className="relative w-9 h-9 rounded-full bg-white border border-slate-200/70 flex items-center justify-center text-slate-700 shrink-0 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF5A36] text-white text-[9.5px] font-bold flex items-center justify-center tabular-nums">
              3
            </span>
          </button>

          {/* Campus Dropdown Menu */}
          {showCampusMenu && (
            <div className="absolute top-11 left-0 right-12 z-30 bg-white rounded-2xl border border-slate-200 shadow-lg p-1.5">
              {BISHKEK_CAMPUSES.map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => {
                    onSelectCampus(hub.id);
                    setShowCampusMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                    selectedCampusId === hub.id
                      ? 'bg-[#EEF0FF] text-[#4F46E5] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{hub.name}</span>
                  <span className="text-[10.5px] text-slate-400 tabular-nums shrink-0 ml-2">
                    {hub.activeListings}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Explore Mode Campus Hubs Strip */}
        {isExploreMode && (
          <div className="bg-white rounded-2xl border border-slate-100 p-3 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Bishkek Campus Safe-Zone Hubs</span>
              <span className="text-[11px] font-semibold text-[#0E8A56]">5 Active Zones</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {BISHKEK_CAMPUSES.map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => onSelectCampus(hub.id)}
                  className={`shrink-0 px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedCampusId === hub.id
                      ? 'bg-[#EEF0FF] border-[#4F46E5] text-[#4F46E5]'
                      : 'bg-[#F7F8FC] border-slate-200/70 text-slate-700'
                  }`}
                >
                  <p className="text-[11.5px] font-bold whitespace-nowrap">{hub.shortName}</p>
                  <p className="text-[10px] opacity-80 tabular-nums">{hub.activeListings} listings</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white border border-slate-200/70 rounded-full px-3.5 py-2 flex items-center gap-2 shadow-2xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculus books, monitors, winter..."
            className="flex-1 min-w-0 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            aria-label="Scan Campus QR"
            className="text-slate-500 hover:text-[#4F46E5] cursor-pointer shrink-0"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* Live Peer Social Proof Strip */}
        <button
          type="button"
          onClick={() => setTickerIdx((prev) => (prev + 1) % TICKER_EVENTS.length)}
          className="w-full bg-white rounded-xl border border-slate-100 px-3 py-2 flex items-center justify-between gap-2 text-left shadow-2xs cursor-pointer hover:border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#0E8A56] shrink-0" />
            <p className="text-[12px] text-slate-800 truncate">
              <span className="font-bold text-[#4F46E5]">{ticker.actor}</span>{' '}
              {ticker.action}
            </p>
          </div>
          <span className="text-[11px] text-slate-400 shrink-0 tabular-nums">{ticker.time}</span>
        </button>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setActiveCategory(activeCategory === 'books' ? 'all' : 'books')}
            className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'books' || activeCategory === 'all'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-slate-800 border border-slate-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Course Books</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${
                activeCategory === 'books' || activeCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              142
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory(activeCategory === 'tech' ? 'all' : 'tech')}
            className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'tech'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-slate-800 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Tech & Graphing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory(activeCategory === 'dorm' ? 'all' : 'dorm')}
            className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'dorm'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-slate-800 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Dorm & Desk</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory(activeCategory === 'winter' ? 'all' : 'winter')}
            className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeCategory === 'winter'
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-white text-slate-800 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>Winter Gear</span>
          </button>
        </div>

        {/* High Velocity Flash Deals Banner */}
        <button
          type="button"
          onClick={() => setFlashOnly((v) => !v)}
          className="w-full rounded-2xl bg-gradient-to-r from-[#FF7A2F] to-[#FF5A36] p-3 text-white flex items-center justify-between gap-2 shadow-[0_6px_16px_rgba(255,90,54,0.24)] cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold tracking-wider uppercase text-white/90">
                High Velocity Deals
              </p>
              <p className="font-display text-[13.5px] font-bold leading-tight truncate">
                Finals Prep Flash Deals: {flashOnly ? 'Showing Flash Only' : 'High-...'}
              </p>
            </div>
          </div>

          <span className="shrink-0 px-2.5 py-1.5 rounded-full bg-white text-[#E04320] text-[11px] font-bold flex items-center gap-1 whitespace-nowrap shadow-xs tabular-nums">
            <Clock className="w-3 h-3" />
            Ends 18:00
          </span>
        </button>

        {/* Section Header */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-[14.5px] font-bold text-slate-900">
              Trending on Campus
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#EEF0FF] text-[#4F46E5] text-[10.5px] font-semibold">
              Bishkek
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setFlashOnly(false);
              setShowAllItems((v) => !v);
            }}
            className="text-[12px] font-bold text-[#4F46E5] flex items-center gap-0.5 cursor-pointer"
          >
            <span>{showAllItems ? 'Top 4' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Supabase Fetch Error State */}
        {listingsError && (
          <div className="bg-[#FFE9E4] border border-[#FF5A36]/35 rounded-2xl p-3.5 space-y-2.5 text-[#9A2E10]">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#D94322]" />
              <div className="min-w-0 text-xs">
                <p className="font-bold">Could not load listings from Supabase</p>
                <p className="mt-0.5 text-[11px] break-words">{listingsError}</p>
              </div>
            </div>

            {onRetryFetch && (
              <button
                type="button"
                onClick={onRetryFetch}
                className="py-2 px-3 rounded-xl bg-white text-[#D94322] text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}

        {/* 2-Column Listing Grid */}
        {isLoadingListings && listings.length === 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 h-56 animate-pulse"
              />
            ))}
          </div>
        ) : !listingsError && listings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-[#4F46E5] mx-auto" />
            <p className="text-sm font-bold text-slate-900">
              No listings yet
            </p>
            <p className="text-xs text-slate-500">
              Post the first item to populate the Bishkek campus marketplace.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('post')}
              className="mt-1 px-4 py-2 rounded-xl bg-[#FF5A36] text-white text-xs font-semibold cursor-pointer"
            >
              Post New Item
            </button>
          </div>
        ) : displayedListings.length === 0 && listings.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-[#4F46E5] mx-auto" />
            <p className="text-sm font-bold text-slate-900">No matching campus items</p>
            <p className="text-xs text-slate-500">
              Try clearing your search or switching back to all Bishkek campuses.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setFlashOnly(false);
                onSelectCampus('all');
              }}
              className="mt-1 px-4 py-2 rounded-xl bg-[#EEF0FF] text-[#4F46E5] text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {displayedListings.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-[#4F46E5]/30 transition-all text-left flex flex-col cursor-pointer group"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                  />

                  {/* Top-Right Behavioral Psychology Urgency Badge */}
                  {item.urgencyBadge && (
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm flex items-center gap-0.5 max-w-[85%] truncate ${
                        item.urgencyBadge.variant === 'coral'
                          ? 'bg-[#FF5A36]'
                          : 'bg-[#4F46E5]'
                      }`}
                    >
                      {item.urgencyBadge.variant === 'coral' && (
                        <Flame className="w-2.5 h-2.5 fill-white shrink-0" />
                      )}
                      <span className="truncate">{item.urgencyBadge.text}</span>
                    </span>
                  )}

                  {/* Bottom-Left Campus Zone Pill */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-semibold truncate max-w-[85%]">
                    {item.campusTag}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-2.5 flex-1 flex flex-col justify-between gap-1.5">
                  <div>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-display text-[14.5px] font-extrabold text-slate-900 tabular-nums">
                        {item.priceKgs.toLocaleString()} KGS
                      </span>
                      {item.retailKgs && (
                        <span className="text-[10px] text-slate-400 line-through tabular-nums">
                          {item.retailKgs.toLocaleString()} KGS
                        </span>
                      )}
                    </div>

                    <h3 className="text-[12.5px] font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                      {item.title}
                    </h3>

                    <p className="text-[10.5px] font-semibold mt-1 flex items-center gap-1 leading-tight text-[#0E8A56]">
                      <BadgeCheck className="w-3 h-3 shrink-0" />
                      <span className="truncate">
                        {item.categoryLabel} · {item.postedAgo}
                      </span>
                    </p>
                  </div>

                  {/* Seller Footer */}
                  <div className="pt-1.5 mt-0.5 border-t border-slate-100 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <SafeImage
                        src={item.seller.avatar}
                        alt={item.seller.name}
                        className="w-4 h-4 rounded-full object-cover shrink-0"
                      />
                      <span className="text-[10.5px] font-medium text-slate-600 truncate">
                        {item.seller.name}
                      </span>
                    </div>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 100% Student Verified Meetups Footer Card */}
        <div className="rounded-2xl bg-[#EEF0FF]/80 p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E1E5FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold text-slate-900 flex items-center gap-1">
              <span>100% Student Verified Meetups</span>
            </p>
            <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
              Meet in safe campus zones: AUCA Forum, Manas Cafeteria, or KRSU Hub. No strangers allowed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
