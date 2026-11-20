import React, { useState } from 'react';
import {
  AlertCircle,
  Banknote,
  BookOpen,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  Coffee,
  Image as ImageIcon,
  Laptop,
  Lightbulb,
  Loader2,
  Package,
  Rocket,
  Snowflake,
  Star,
  Store,
  TrendingUp,
  User,
  X,
} from 'lucide-react';
import { IMAGES, mapSupabaseRowToListingItem } from '../data/mockData';
import { supabase } from '../lib/supabaseClient';
import {
  CategoryId,
  ItemCondition,
  ListingItem,
  SupabaseListingRow,
} from '../types';
import { SafeImage } from './SafeImage';

interface PostItemScreenProps {
  onClose: () => void;
  onListingCreated: (createdItem: ListingItem | null) => Promise<void>;
}

const EXTRA_PHOTO_POOL = [
  IMAGES.macroeconomics,
  IMAGES.usbcHub,
  IMAGES.calculator,
  IMAGES.lamp,
  IMAGES.jacket,
];

const CATEGORY_LABELS: Record<Exclude<CategoryId, 'all'>, string> = {
  books: 'Textbooks',
  tech: 'Calculators & Tech',
  dorm: 'Dorm & Desk',
  winter: 'Winter Gear',
};

const CONDITION_HINTS: Record<ItemCondition, string> = {
  'Brand New': 'Sealed or unused with tags',
  'Like New': 'No torn pages or marks',
  Good: 'Minor wear, 100% functional',
  Fair: 'Visible notes, works great',
};

const URGENCY_BADGES = [
  'Just Listed',
  'Exam Approved',
  '4 watching',
  'Price Drop: -200',
];

const HANDOFF_ZONES = [
  {
    id: 'auca-forum',
    title: 'AUCA Forum',
    subtitle: 'Main Campus • Atrium benches',
    icon: 'campus' as const,
  },
  {
    id: 'alatoo-cafe',
    title: 'Ala-Too Cafeteria',
    subtitle: 'Block B • Central hall',
    icon: 'cafe' as const,
  },
  {
    id: 'dordoi-plaza',
    title: 'Dordoi Plaza (Centrum)',
    subtitle: 'Ground Floor • Near Coffee Bar',
    icon: 'store' as const,
  },
];

export const PostItemScreen: React.FC<PostItemScreenProps> = ({
  onClose,
  onListingCreated,
}) => {
  const [photos, setPhotos] = useState<string[]>([
    IMAGES.macroeconomics,
    IMAGES.usbcHub,
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [title, setTitle] = useState('Principles of Microeconomics 4th Ed - Krugman');
  const [category, setCategory] = useState<Exclude<CategoryId, 'all'>>('books');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [priceStr, setPriceStr] = useState('1200');
  const [sellerName, setSellerName] = useState('Aigul Nurbekova');
  const [urgencyBadge, setUrgencyBadge] = useState('Just Listed');
  const [selectedZones, setSelectedZones] = useState<string[]>([
    'auca-forum',
    'alatoo-cafe',
    'dordoi-plaza',
  ]);
  const [draftSaved, setDraftSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parsedPrice = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  const numericPrice = Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 0;
  const isInFastCorridor = numericPrice >= 1000 && numericPrice <= 1500;

  const handleAddPhoto = () => {
    if (photos.length >= 5) return;
    const nextPhoto = EXTRA_PHOTO_POOL[photos.length % EXTRA_PHOTO_POOL.length];
    setPhotos((prev) => [...prev, nextPhoto]);
  };

  const handleRemovePhoto = (idx: number) => {
    if (photos.length <= 1) return;
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleZone = (id: string) => {
    setSelectedZones((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((z) => z !== id)
          : prev
        : [...prev, id]
    );
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setSubmitError('Please enter an item title.');
      return;
    }
    if (numericPrice <= 0) {
      setSubmitError('Please enter a valid integer price in KGS.');
      return;
    }

    setSubmitError(null);
    setPublishSuccess(false);
    setIsSubmitting(true);

    const primaryZone =
      HANDOFF_ZONES.find((z) => z.id === selectedZones[0])?.title || 'AUCA Forum';
    const resolvedImageUrl =
      customImageUrl.trim() || photos[0] || IMAGES.macroeconomics;

    const insertRow = {
      title: cleanTitle,
      price_kgs: numericPrice,
      category: CATEGORY_LABELS[category],
      seller_name: sellerName.trim() || 'Aigul Nurbekova',
      campus_zone: primaryZone,
      urgency_badge: urgencyBadge,
      image_url: resolvedImageUrl,
    };

    try {
      const { data, error } = await supabase
        .from('listings')
        .insert([insertRow])
        .select();

      if (error) {
        console.warn('[CampusMarket] Supabase insert error:', error.code, error.message);
        setSubmitError(
          `${error.message}${error.hint ? ` (${error.hint})` : ''}`
        );
        setIsSubmitting(false);
        return;
      }

      const insertedRow = (data && data[0]) as SupabaseListingRow | undefined;
      let createdItem: ListingItem | null = null;
      if (insertedRow) {
        createdItem = mapSupabaseRowToListingItem(insertedRow);
        createdItem.condition = condition;
        createdItem.handoffZoneDetail = selectedZones
          .map((id) => HANDOFF_ZONES.find((z) => z.id === id)?.title)
          .filter(Boolean)
          .join(' or ');
        if (photos.length > 0 && !customImageUrl.trim()) {
          createdItem.images = photos;
        }
      }

      setPublishSuccess(true);
      await onListingCreated(createdItem);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('[CampusMarket] Supabase insert exception:', msg);
      setSubmitError(`Failed to publish listing: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#F7F8FC]">
      {/* Top Bar */}
      <header className="shrink-0 bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close post item screen"
          className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="font-display text-[15px] font-bold text-slate-900">
          Post New Item
        </h1>

        <button
          type="button"
          onClick={handleSaveDraft}
          className="text-[12.5px] font-bold text-[#4F46E5] hover:text-[#3A2CD4] cursor-pointer whitespace-nowrap"
        >
          {draftSaved ? 'Saved!' : 'Save Draft'}
        </button>
      </header>

      {/* Form Body */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto no-scrollbar px-3.5 pt-3 pb-6 space-y-3.5"
      >
        {submitError && (
          <div className="rounded-2xl bg-[#FFE9E4] border border-[#FF5A36]/35 text-[#9A2E10] px-3.5 py-2.5 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#D94322]" />
            <div className="min-w-0">
              <p className="font-bold">Could not publish listing</p>
              <p className="mt-0.5 text-[11px] break-words">{submitError}</p>
            </div>
          </div>
        )}

        {publishSuccess && (
          <div className="rounded-2xl bg-[#D1FAE5] text-[#065F46] px-3.5 py-2.5 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Listing published to CampusMarket!</span>
          </div>
        )}

        {/* Behavioral Nudge Banner */}
        <div className="rounded-2xl bg-[#EEF0FF] p-3.5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white text-[#0E8A56] flex items-center justify-center shrink-0 shadow-2xs">
            <Banknote className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[13px] font-bold text-[#4F46E5]">
              Turn Finished Courses into Som! ✨
            </p>
            <p className="text-[11.5px] text-slate-600 leading-snug mt-0.5">
              Textbooks & tech listed by AUCA & Manas peers sell in an average of{' '}
              <span className="font-bold text-[#4F46E5]">42 hours</span>. Dismantle dorm clutter and earn fast KGS!
            </p>
          </div>
        </div>

        {/* Photos Upload Row */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12.5px] font-bold text-slate-900 tabular-nums">
              Photos <span className="font-normal text-slate-500">({photos.length}/5 uploaded)</span>
            </span>
            <span className="text-[11px] font-semibold text-[#4F46E5]">
              Clear lighting sells 3x faster
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, idx) => (
              <div
                key={`${photo}-${idx}`}
                className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-200"
              >
                <SafeImage
                  src={photo}
                  alt={`Listing photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-[#0E8A56] text-white text-[9.5px] font-bold flex items-center gap-0.5 shadow-xs">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    Cover
                  </span>
                )}
                {photos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    aria-label="Remove photo"
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-slate-900/70 text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {photos.length < 5 && (
              <button
                type="button"
                onClick={handleAddPhoto}
                className="aspect-square rounded-2xl bg-white border-2 border-dashed border-[#4F46E5]/35 hover:border-[#4F46E5] hover:bg-[#F5F6FF] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-[11.5px] font-bold text-slate-800">Add Photo</span>
                <span className="text-[10px] text-slate-400">Max 5</span>
              </button>
            )}
          </div>

          {/* Optional Custom Image URL */}
          <div className="mt-2 bg-white border border-slate-200/80 rounded-xl px-3 py-2 flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Optional custom image URL (uses cover photo if empty)"
              className="flex-1 min-w-0 bg-transparent text-[11.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Item Title */}
        <div>
          <label
            htmlFor="post-item-title"
            className="block text-[12.5px] font-bold text-slate-900 mb-1.5"
          >
            Item Title
          </label>
          <input
            id="post-item-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Principles of Microeconomics 4th Ed"
            className="w-full bg-white border border-slate-200/80 rounded-2xl px-3.5 py-3 text-[13px] font-medium text-slate-800 focus:outline-none focus:border-[#4F46E5] shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div>
          <span className="block text-[12.5px] font-bold text-slate-900 mb-1.5">
            Category
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {(
              [
                { id: 'books', label: 'Textbooks', Icon: BookOpen },
                { id: 'tech', label: 'Calculators & Tech', Icon: Laptop },
                { id: 'dorm', label: 'Dorm & Desk', Icon: Package },
                { id: 'winter', label: 'Winter Gear', Icon: Snowflake },
              ] as const
            ).map(({ id, label, Icon }) => {
              const active = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#4F46E5] text-white shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Condition Segmented Control */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12.5px] font-bold text-slate-900">Condition</span>
            <span className="text-[11px] text-slate-500">
              {CONDITION_HINTS[condition]}
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-1 grid grid-cols-4 gap-1 shadow-2xs">
            {(['Brand New', 'Like New', 'Good', 'Fair'] as const).map((cond) => {
              const active = condition === cond;
              return (
                <button
                  key={cond}
                  type="button"
                  onClick={() => setCondition(cond)}
                  className={`py-2 rounded-xl text-[11.5px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#4F46E5] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cond}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price + Smart Pricing Corridor */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="post-item-price"
              className="text-[12.5px] font-bold text-slate-900"
            >
              Price
            </label>
            <span
              className={`text-[11px] font-bold flex items-center gap-1 ${
                isInFastCorridor ? 'text-[#0E8A56]' : 'text-[#4F46E5]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {isInFastCorridor ? 'Fast-sale corridor' : 'Custom peer price'}
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl px-3.5 py-2.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <Banknote className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                id="post-item-price"
                type="text"
                inputMode="numeric"
                required
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
                className="w-full bg-transparent font-display text-[15px] font-bold text-slate-900 focus:outline-none tabular-nums"
              />
            </div>
            <span className="text-[13px] font-bold text-[#4F46E5] pl-2 shrink-0">
              KGS
            </span>
          </div>

          <div className="mt-2 rounded-2xl bg-[#EEF0FF]/90 px-3 py-2.5 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-slate-700 leading-snug">
              <span className="font-bold text-[#4F46E5]">CampusMarket Suggestion:</span>{' '}
              <span className="font-semibold text-slate-900 tabular-nums">1,000 – 1,300 KGS</span>{' '}
              based on 14 recent peer transactions across Bishkek campuses.
            </p>
          </div>
        </div>

        {/* Verified Seller & Psychology Urgency Badge */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="post-seller-name"
              className="block text-[11.5px] font-bold text-slate-900 mb-1"
            >
              Verified Seller
            </label>
            <div className="bg-white border border-slate-200/80 rounded-xl px-2.5 py-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
              <input
                id="post-seller-name"
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full min-w-0 bg-transparent text-[12px] font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="post-urgency-badge"
              className="block text-[11.5px] font-bold text-slate-900 mb-1"
            >
              Urgency Badge
            </label>
            <select
              id="post-urgency-badge"
              value={urgencyBadge}
              onChange={(e) => setUrgencyBadge(e.target.value)}
              className="w-full bg-white border border-slate-200/80 rounded-xl px-2.5 py-2 text-[12px] font-semibold text-[#FF5A36] focus:outline-none cursor-pointer"
            >
              {URGENCY_BADGES.map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campus Handoff Preference */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12.5px] font-bold text-slate-900">
              Campus Handoff Preference
            </span>
            <span className="text-[11px] text-slate-500">Multiple allowed</span>
          </div>
          <p className="text-[11.5px] text-slate-500 mb-2">
            Meet verified peers at secure on-campus exchange zones.
          </p>

          <div className="space-y-2">
            {HANDOFF_ZONES.map((zone) => {
              const checked = selectedZones.includes(zone.id);
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => toggleZone(zone.id)}
                  className="w-full bg-white border border-slate-200/70 rounded-2xl px-3 py-2.5 flex items-center justify-between gap-2.5 text-left shadow-2xs cursor-pointer hover:border-[#4F46E5]/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                      {zone.icon === 'campus' && <Building2 className="w-4 h-4" />}
                      {zone.icon === 'cafe' && <Coffee className="w-4 h-4" />}
                      {zone.icon === 'store' && <Store className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-slate-900 truncate">
                        {zone.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {zone.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-[#4F46E5] text-white'
                        : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Publish Coral CTA */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[50px] rounded-2xl bg-[#FF5A36] hover:bg-[#EE4C28] disabled:opacity-75 active:scale-[0.99] text-white font-display font-semibold text-[14px] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,90,54,0.3)] transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span>Publish Listing to 12,400+ Students</span>
                <Rocket className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E8A56] fill-[#0E8A56] stroke-white shrink-0" />
            <span>Free to list • Instant notification to matching wishlist alerts</span>
          </div>
        </div>
      </form>
    </div>
  );
};
