import React, { useState } from 'react';
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
  MessageSquare,
  RefreshCw,
  Settings,
  Share2,
  ShieldCheck,
  Star,
  ThumbsUp,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { IMAGES, INITIAL_REVIEWS } from '../data/mockData';
import { ListingItem, SellerInfo } from '../types';
import { BrandMark } from './BrandMark';
import { SafeImage } from './SafeImage';

interface ProfileScreenProps {
  profileUser: SellerInfo;
  listings: ListingItem[];
  onSelectItem: (item: ListingItem) => void;
  onMessageUser: (user: SellerInfo) => void;
  onOpenOnboarding: () => void;
}

const PAST_TRADES = [
  {
    id: 'pt-1',
    title: 'Linear Algebra & Applications 5th Ed',
    price: '900 KGS',
    meta: 'Completed • AUCA Forum · 2 weeks ago',
    image: IMAGES.macroeconomics,
  },
  {
    id: 'pt-2',
    title: 'Logitech Pebble Wireless Mouse',
    price: '1,350 KGS',
    meta: 'Completed • Manas Cafeteria · 1 month ago',
    image: IMAGES.usbcHub,
  },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profileUser,
  listings,
  onSelectItem,
  onMessageUser,
  onOpenOnboarding,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [vouched, setVouched] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const userActiveListings = listings.filter(
    (l) => l.seller.id === profileUser.id
  );
  // Ensure Aigul always displays at least her 2 signature listings
  const displayedActiveListings =
    userActiveListings.length > 0
      ? userActiveListings
      : [
          listings.find((l) => l.id === 'macbook-usbc-hub') || listings[0],
          listings.find((l) => l.id === 'mankiw-macro') || listings[1],
        ].filter(Boolean);

  const firstName = profileUser.name.split(' ')[0];
  const ratingsTotal = profileUser.dealsCount + (vouched ? 1 : 0);
  const reviewsToShow = showAllReviews
    ? INITIAL_REVIEWS
    : INITIAL_REVIEWS.slice(0, 2);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#F7F8FC] relative">
      {/* Top Bar */}
      <header className="shrink-0 bg-white px-4 pt-3 pb-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <BrandMark size="sm" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#4B3CE8] leading-none">
              Bishkek Campuses
            </p>
            <h1 className="font-display text-[14.5px] font-bold text-slate-900 leading-tight truncate">
              Student Profile & Trust
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowSettingsMenu((v) => !v)}
            aria-label="Profile settings"
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#4B3CE8]/20">
            <SafeImage
              src={profileUser.avatar}
              alt={profileUser.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {showSettingsMenu && (
        <div className="absolute top-[56px] right-3 z-40 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-1">
          <button
            type="button"
            onClick={() => {
              setShowSettingsMenu(false);
              onOpenOnboarding();
            }}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#EEF0FF] text-xs font-semibold text-slate-800 hover:text-[#4B3CE8] cursor-pointer"
          >
            Re-verify Student ID (Screen 1)
          </button>
          <button
            type="button"
            onClick={() => setShowSettingsMenu(false)}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-xs text-slate-500 cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      {/* Scrollable Profile Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 pt-2.5 pb-5 space-y-3">
        {/* Portal Verification Sync Banner */}
        <div className="rounded-2xl bg-[#EEF0FF] px-3.5 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-[#0E8A56] fill-[#0E8A56] stroke-white shrink-0" />
            <span className="text-[11.5px] font-semibold text-slate-800 leading-tight">
              Reputation verified via {profileUser.campus} Student Portal
            </span>
          </div>
          <span className="text-[11.5px] font-bold text-[#4B3CE8] shrink-0">
            Synced
          </span>
        </div>

        {/* Main Student Identity Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <SafeImage
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#4B3CE8]/20"
                />
                <BadgeCheck className="w-5 h-5 text-[#4B3CE8] fill-[#4B3CE8] stroke-white absolute bottom-0 right-0" />
              </div>

              <div className="min-w-0">
                <h2 className="font-display text-[16px] font-bold text-slate-900 truncate">
                  {profileUser.name}
                </h2>
                <p className="text-[12px] text-slate-600 flex items-center gap-1 mt-0.5 truncate">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>
                    {profileUser.campus} • {profileUser.major}
                  </span>
                </p>

                <span className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B3CE8] text-white text-[11px] font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Student ID {profileUser.verifiedId}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVouched(true)}
              aria-label="Share profile"
              className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-xl bg-[#F7F8FC] px-3 py-2.5 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-[11.5px] text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-[#4B3CE8] shrink-0" />
              <span>Active since {profileUser.activeSince}</span>
            </div>
            <div className="flex items-center gap-2 text-[11.5px] text-slate-700 font-semibold">
              <RefreshCw className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
              <span className="tabular-nums">{profileUser.rehomedCount} items rehomed</span>
            </div>
          </div>
        </div>

        {/* 3-Column Trust Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-2xl border border-slate-100 p-3 text-center shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-[#FFE9E4] text-[#FF5A36] flex items-center justify-center mx-auto mb-1.5">
              <Star className="w-3.5 h-3.5 fill-[#FF5A36]" />
            </div>
            <p className="font-display text-[13.5px] font-extrabold text-slate-900 tabular-nums">
              {profileUser.rating}
              <span className="text-slate-400 font-normal text-[11px]">/5.0</span>
            </p>
            <p className="text-[11px] text-slate-500 tabular-nums">{ratingsTotal} ratings</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-3 text-center shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-[#EEF0FF] text-[#4B3CE8] flex items-center justify-center mx-auto mb-1.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <p className="font-display text-[13.5px] font-extrabold text-[#4B3CE8] tabular-nums">
              {profileUser.zeroGhostingRate}
            </p>
            <p className="text-[11px] font-semibold text-[#0E8A56] leading-tight">
              Zero ghosting
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-3 text-center shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-[#FFE9E4] text-[#FF5A36] flex items-center justify-center mx-auto mb-1.5">
              <Zap className="w-3.5 h-3.5 fill-[#FF5A36]" />
            </div>
            <p className="font-display text-[13.5px] font-extrabold text-[#D94322] tabular-nums">
              {profileUser.avgResponse}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">Avg response</p>
          </div>
        </div>

        {/* Top 5% Trusted Seller Banner */}
        <div className="rounded-2xl bg-[#EEF0FF] px-3.5 py-3 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#6EF0AE] text-[#065F46] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[13px] font-bold text-slate-900">
                Top 5% Trusted Seller
              </p>
              <p className="text-[11px] text-slate-600 leading-snug">
                Recommended for safe in-person handoffs
              </p>
            </div>
          </div>
          <TrendingUp className="w-5 h-5 text-[#0E8A56] shrink-0" />
        </div>

        {/* Verified Classmate Reviews */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[13.5px] font-bold text-slate-900">
              Verified Classmate Reviews
            </h3>
            <button
              type="button"
              onClick={() => setShowAllReviews((v) => !v)}
              className="text-[12px] font-bold text-[#4B3CE8] flex items-center gap-0.5 cursor-pointer tabular-nums"
            >
              <span>{showAllReviews ? 'Show Less' : `See All (${ratingsTotal})`}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {reviewsToShow.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 text-[#FF5A36]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#FF5A36]" />
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-slate-900 tabular-nums">
                    {rev.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-[12px] italic text-slate-700 leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] pt-0.5">
                  <span className="font-bold text-slate-800">
                    — {rev.author}, {rev.department}
                  </span>
                  <span className="text-slate-400">{rev.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Listings / Past Trades Tabs */}
        <div>
          <div className="flex items-center gap-5 border-b border-slate-200 mb-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('active')}
              className={`pb-2 text-[12.5px] font-bold border-b-2 transition-colors cursor-pointer tabular-nums ${
                activeTab === 'active'
                  ? 'border-[#4B3CE8] text-[#4B3CE8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Active Listings ({displayedActiveListings.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`pb-2 text-[12.5px] font-bold border-b-2 transition-colors cursor-pointer tabular-nums ${
                activeTab === 'past'
                  ? 'border-[#4B3CE8] text-[#4B3CE8]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Past Trades ({profileUser.rehomedCount - displayedActiveListings.length})
            </button>
          </div>

          {activeTab === 'active' ? (
            <div className="space-y-2">
              {displayedActiveListings.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="w-full bg-white rounded-2xl border border-slate-100 p-2.5 flex items-center justify-between gap-2.5 text-left hover:border-[#4B3CE8]/40 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <SafeImage
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-bold text-slate-900 truncate">
                        {item.shortTitle}
                      </p>
                      <p className="text-[12px] font-bold text-[#4B3CE8] tabular-nums">
                        {item.priceKgs.toLocaleString()} KGS
                      </p>
                      <p className="text-[10.5px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          Posted {item.postedAgo} • {item.pickupSpot}
                        </span>
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#6EF0AE]/70 text-[#065F46] text-[10.5px] font-bold">
                    Active
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {PAST_TRADES.map((trade) => (
                <div
                  key={trade.id}
                  className="bg-white rounded-2xl border border-slate-100 p-2.5 flex items-center justify-between gap-2.5 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <SafeImage
                      src={trade.image}
                      alt={trade.title}
                      className="w-14 h-12 rounded-xl object-cover shrink-0 opacity-85"
                    />
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-bold text-slate-800 truncate">
                        {trade.title}
                      </p>
                      <p className="text-[12px] font-bold text-slate-600 tabular-nums">
                        {trade.price}
                      </p>
                      <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                        {trade.meta}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10.5px] font-bold">
                    Sold
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message + Vouch Action Row */}
        <div className="pt-1 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onMessageUser(profileUser)}
            className="flex-1 h-11 rounded-2xl bg-[#4B3CE8] hover:bg-[#3F31D2] text-white font-display font-semibold text-[13.5px] flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(75,60,232,0.26)] transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message {firstName}</span>
          </button>

          <button
            type="button"
            onClick={() => setVouched((v) => !v)}
            aria-label="Vouch for student"
            className={`w-12 h-11 rounded-2xl border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              vouched
                ? 'bg-[#FFE9E4] border-[#FF5A36] text-[#FF5A36]'
                : 'bg-white border-slate-200 text-[#FF5A36] hover:bg-[#FFF5F2]'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${vouched ? 'fill-[#FF5A36]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
