import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  CheckCircle2,
  ChevronLeft,
  Flame,
  GraduationCap,
  Heart,
  Lock,
  MessageSquare,
  MoreVertical,
  Share2,
  ShieldCheck,
  Star,
  Usb,
  Wallet,
  Zap,
} from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { ListingItem, SellerInfo } from '../types';
import { BrandMark } from './BrandMark';
import { SafeImage } from './SafeImage';

interface ItemDetailScreenProps {
  item: ListingItem;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onBack: () => void;
  onOpenSellerProfile: (seller: SellerInfo) => void;
  onOpenChat: (item: ListingItem, reserveFirst: boolean) => void;
  onOpenMyProfile: () => void;
}

export const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({
  item,
  isWishlisted,
  onToggleWishlist,
  onBack,
  onOpenSellerProfile,
  onOpenChat,
  onOpenMyProfile,
}) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);

  const totalSlides = item.images.length || 1;
  const activeImg = item.images[slideIdx % totalSlides];
  const discountPct =
    item.retailKgs && item.retailKgs > item.priceKgs
      ? Math.round(((item.retailKgs - item.priceKgs) / item.retailKgs) * 100)
      : null;

  const handleNextSlide = () => {
    setSlideIdx((prev) => (prev + 1) % totalSlides);
  };

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1800);
  };

  const sellerFirstName = item.seller.name.split(' ')[0];

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC] relative">
      {/* Top App Bar */}
      <header className="shrink-0 bg-white px-3.5 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Home"
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <BrandMark size="sm" />
          <h1 className="font-display text-[14px] font-bold text-slate-900 truncate">
            Item Details
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            aria-label="More options"
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onOpenMyProfile}
            aria-label="My Profile"
            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#4B3CE8]/20 cursor-pointer"
          >
            <SafeImage
              src={IMAGES.avatarAigul}
              alt="Aigul Nurbekova"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        {/* Hero Image Carousel */}
        <div className="relative h-[225px] w-full bg-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next item photo"
            className="w-full h-full block cursor-pointer"
          >
            <SafeImage
              src={activeImg}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </button>

          {/* Floating Back Button */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Floating Share & Wishlist Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share listing"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleWishlist(item.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'text-[#FF5A36] fill-[#FF5A36]' : 'text-[#FF5A36]'
                }`}
              />
            </button>
          </div>

          {shareCopied && (
            <div className="absolute top-14 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-medium shadow-md">
              Campus link copied
            </div>
          )}

          {/* Bottom-Left Social Proof Bar + Slide Counter */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs shadow-sm flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#FF5A36] shrink-0" />
              <Flame className="w-3 h-3 text-[#FF5A36] shrink-0" />
              <span className="text-[11px] font-semibold text-slate-800 truncate">
                <span className="text-[#C84323] font-bold tabular-nums">
                  {item.viewingCount} students
                </span>{' '}
                from AUCA & KSTU looking now
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextSlide}
              className="pointer-events-auto px-2.5 py-1 rounded-full bg-slate-900/75 text-white text-[11px] font-bold tabular-nums shrink-0 cursor-pointer"
            >
              {slideIdx + 1}/{totalSlides}
            </button>
          </div>
        </div>

        <div className="px-3.5 pt-3 space-y-3">
          {/* Primary Title, Price & Behavioral Trust Banners */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-[16px] font-bold text-slate-900 leading-snug">
                  {item.title}
                </h2>
                <div className="mt-1.5 flex items-baseline gap-2.5 flex-wrap">
                  <span className="font-display text-[22px] font-extrabold text-[#4B3CE8] leading-none tabular-nums">
                    {item.priceKgs.toLocaleString()} KGS
                  </span>
                  {item.retailKgs && (
                    <span className="text-[12px] text-slate-400 line-through tabular-nums">
                      Retail: {item.retailKgs.toLocaleString()} KGS in Bishkek
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFE9E4] text-[#D94322] text-[10.5px] font-extrabold tracking-wide uppercase tabular-nums">
                  {discountPct ? `SAVE ${discountPct}%` : item.discountBadge || 'VERIFIED'}
                </span>
                <p className="text-[11px] font-medium text-slate-500 mt-1">
                  {item.pickupSpot}
                </p>
              </div>
            </div>

            {/* Course Requirement Banner */}
            <div className="rounded-xl bg-[#EEF0FF] px-3 py-2.5 flex items-center gap-2.5 text-[#4B3CE8]">
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span className="text-[12px] font-semibold leading-snug">
                {item.courseRequirement}
              </span>
            </div>

            {/* Condition Banner */}
            <div className="rounded-xl bg-[#6EF0AE]/65 px-3 py-2.5 flex items-center gap-2.5 text-[#065F46]">
              <CheckCircle2 className="w-4 h-4 shrink-0 fill-[#065F46] text-white" />
              <span className="text-[12px] font-semibold leading-snug">
                {item.conditionSummary}
              </span>
            </div>
          </div>

          {/* Campus Safe-Zone Handoff Card */}
          <div className="bg-white rounded-2xl border border-slate-100 border-l-4 border-l-[#4B3CE8] p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4B3CE8] shrink-0" />
              <h3 className="font-display text-[13.5px] font-bold text-slate-900">
                Campus Safe-Zone Handoff
              </h3>
            </div>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              Inspect the item fully before releasing funds. Hand-offs happen inside security-monitored university hubs ({item.handoffZoneDetail}).
            </p>
            <div className="rounded-xl bg-[#EEF0FF] px-3 py-2.5 flex items-center gap-2.5 text-[#4B3CE8]">
              <Wallet className="w-4 h-4 shrink-0" />
              <span className="text-[12px] font-semibold leading-snug">
                Pay {sellerFirstName} via MBank QR or Cash strictly AFTER your hands-on check.
              </span>
            </div>
          </div>

          {/* Seller Verification Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.03)] flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <SafeImage
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <BadgeCheck className="w-4 h-4 text-[#4B3CE8] fill-[#4B3CE8] stroke-white absolute -bottom-0.5 -right-0.5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13.5px] font-bold text-slate-900 truncate">
                    {item.seller.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#EEF0FF] text-[#4B3CE8] text-[9px] font-extrabold tracking-wider uppercase shrink-0">
                    Verified
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-500 truncate">
                  {item.seller.major}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold">
                  <span className="flex items-center gap-0.5 text-slate-800 tabular-nums">
                    <Star className="w-3 h-3 text-[#FF5A36] fill-[#FF5A36]" />
                    {item.seller.rating} ({item.seller.dealsCount} deals)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#0E8A56] flex items-center gap-0.5 truncate">
                    <Zap className="w-3 h-3 shrink-0" />
                    {item.seller.onTimeRate}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenSellerProfile(item.seller)}
              className="px-3 py-1.5 rounded-xl bg-[#EEF0FF] hover:bg-[#E1E5FF] text-[#4B3CE8] text-[12px] font-bold shrink-0 transition-colors cursor-pointer"
            >
              Profile
            </button>
          </div>

          {/* 2-Column Spec Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <BatteryCharging className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.specLeft.label}</span>
              </div>
              <p className="font-display text-[13.5px] font-bold text-slate-900 mt-1">
                {item.specLeft.value}
              </p>
              <p className="text-[11px] font-medium text-[#0E8A56] mt-0.5">
                {item.specLeft.subtext}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <Usb className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.specRight.label}</span>
              </div>
              <p className="font-display text-[13.5px] font-bold text-slate-900 mt-1">
                {item.specRight.value}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {item.specRight.subtext}
              </p>
            </div>
          </div>

          {/* Zero-Risk 24-Hour Hold Card */}
          <div className="rounded-2xl bg-[#EEF0FF]/90 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4B3CE8] text-white flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] font-bold text-slate-900">
                Zero-Risk 24-Hour Hold
              </p>
              <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                Reserving locks the price and pauses other buyers while you confirm meetup time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout CTA */}
      <div className="shrink-0 bg-white border-t border-slate-200/80 px-3.5 pt-2.5 pb-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChat(item, false)}
            aria-label="Message seller"
            className="w-12 h-11 rounded-xl bg-[#EEF0FF] hover:bg-[#E1E5FF] text-[#4B3CE8] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => onOpenChat(item, true)}
            className="flex-1 h-11 rounded-xl bg-[#4B3CE8] hover:bg-[#3F31D2] active:scale-[0.99] text-white font-display font-semibold text-[13.5px] flex items-center justify-center gap-1.5 shadow-[0_6px_16px_rgba(75,60,232,0.28)] transition-all cursor-pointer"
          >
            <span>{item.reserved ? 'View Reserved Meetup' : 'Lock Deal & Pick Meetup'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>No upfront payment required • Free reservation for 24h</span>
        </div>
      </div>
    </div>
  );
};
