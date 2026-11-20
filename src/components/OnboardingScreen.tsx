import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  Flame,
  GraduationCap,
  HelpCircle,
  Lock,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { IMAGES } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface OnboardingScreenProps {
  onEnterMarketplace: (university: string, email: string) => void;
}

const UNIVERSITIES = [
  'AUCA (American Univ. of Central Asia)',
  'Kyrgyz-Turkish Manas University',
  'KRSU (Kyrgyz-Russian Slavic Univ.)',
  'KSTU (Polytechnic University)',
  'Ala-Too International University',
];

const SAMPLE_IDS = [
  { file: 'auca_id_toktorov.jpg', label: 'Validated • AUCA ID #24018', valid: 'Valid through June 2026' },
  { file: 'auca_id_nurbekova.jpg', label: 'Validated • AUCA ID #8921', valid: 'Valid through June 2026' },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onEnterMarketplace,
}) => {
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [email, setEmail] = useState('a_toktorov24@auca.kg');
  const [idIndex, setIdIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const isEmailValid = email.includes('@') && email.trim().length > 5;
  const currentId = SAMPLE_IDS[idIndex];

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIdIndex((prev) => (prev + 1) % SAMPLE_IDS.length);
      setIsScanning(false);
    }, 350);
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC] overflow-y-auto no-scrollbar px-4 pt-3 pb-6">
      {/* Top Bar with Quick Skip for instant testing */}
      <header className="flex items-center justify-between mb-4 shrink-0">
        <button
          type="button"
          onClick={() => onEnterMarketplace(university, email)}
          aria-label="Go back or skip to marketplace"
          className="w-9 h-9 rounded-full bg-[#EEF0F7] hover:bg-[#E2E6F2] text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="px-3 py-1 rounded-full bg-[#EEF0FF] text-[#4B3CE8] text-[12px] font-semibold flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4B3CE8]" aria-hidden="true" />
          <span>Step 2 of 3 • Safety Check</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEnterMarketplace(university, email)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#4B3CE8] text-[11px] font-semibold text-[#4B3CE8] transition-colors cursor-pointer whitespace-nowrap"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={() => setShowHelp((v) => !v)}
            aria-label="Verification info"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {showHelp && (
        <div className="mb-3 rounded-2xl bg-white border border-[#4B3CE8]/20 p-3 text-xs text-slate-600 shadow-sm">
          CampusMarket KG verifies your <span className="font-semibold text-slate-800">.edu.kg / @auca.kg</span> email and student ID so every buyer and seller is a real Bishkek classmate.
        </div>
      )}

      {/* Center Shield Emblem */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-[#EEF0FF] flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-[#4B3CE8]" fill="#4B3CE8" stroke="white" strokeWidth={1.8} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF5A36] text-white flex items-center justify-center shadow-sm ring-2 ring-[#F7F8FC]">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
        </div>

        <h1 className="font-display text-[22px] leading-[1.2] font-extrabold text-[#111827] tracking-tight">
          Your Campus. Your Peers.
          <span className="block text-[#4B3CE8]">100% Verified.</span>
        </h1>
        <p className="mt-1.5 text-[12.5px] leading-[1.45] text-slate-500 max-w-[295px]">
          Trade safely without Lalafo scammers or sketch off-campus meetups.
        </p>
      </div>

      {/* Did you know behavioral nudge */}
      <div className="rounded-2xl bg-[#F0F2FF] px-3.5 py-3 mb-4 flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-full bg-white text-[#4B3CE8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <p className="text-[11.5px] leading-[1.45] text-slate-700">
          <span className="font-semibold text-[#4B3CE8]">Did you know?</span> 78% of AUCA, Manas, and KRSU students trade textbooks and dorm essentials peer-to-peer every term.
        </p>
      </div>

      {/* Verification Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_14px_rgba(15,23,42,0.04)] p-4 mb-3.5 space-y-3.5">
        {/* Select University */}
        <div>
          <label
            htmlFor="university-select"
            className="block text-[10.5px] font-bold tracking-wider uppercase text-slate-500 mb-1.5"
          >
            Select University
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-[#4B3CE8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="university-select"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full appearance-none bg-[#F7F8FC] border border-slate-200/80 rounded-xl pl-9 pr-8 py-2.5 text-[13px] font-medium text-slate-800 focus:outline-none focus:border-[#4B3CE8] transition-colors cursor-pointer truncate"
            >
              {UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Official Campus Email */}
        <div>
          <label
            htmlFor="campus-email"
            className="block text-[10.5px] font-bold tracking-wider uppercase text-slate-500 mb-1.5"
          >
            Official Campus Email
          </label>
          <div className="relative flex items-center">
            <AtSign className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="campus-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@auca.kg"
              className="w-full bg-[#F7F8FC] border border-slate-200/80 rounded-xl pl-9 pr-10 py-2.5 text-[13px] font-medium text-slate-800 focus:outline-none focus:border-[#4B3CE8] transition-colors"
            />
            {isEmailValid && (
              <span className="absolute right-2.5 w-5 h-5 rounded-full bg-[#0E8A56] text-white flex items-center justify-center">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
            )}
          </div>
        </div>

        {/* Student ID / Зачетка */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10.5px] font-bold tracking-wider uppercase text-slate-500">
              Student ID / Зачетка
            </span>
            <span className="text-[11px] font-semibold text-[#0E8A56] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A56]" />
              {isScanning ? 'Analyzing...' : 'Auto-Analyzed'}
            </span>
          </div>

          <div className="rounded-2xl bg-[#F3F4FC] p-3">
            <div className="bg-white rounded-xl p-2.5 flex items-center justify-between gap-2.5 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <SafeImage
                    src={IMAGES.avatarPeer}
                    alt="Student ID Card"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#4B3CE8]/20 flex items-center justify-center">
                    <div className="w-5 h-4 rounded-xs border border-[#4B3CE8] bg-white/80 flex items-center justify-center">
                      <span className="w-2.5 h-0.5 bg-[#4B3CE8] rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold text-slate-900 truncate">
                    {currentId.file}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-tight tabular-nums">
                    {currentId.label}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRescan}
                aria-label="Re-scan student ID"
                className="w-8 h-8 rounded-full bg-[#EEF0FF] hover:bg-[#E1E5FF] text-[#4B3CE8] flex items-center justify-center shrink-0 transition-transform cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="mt-2.5 flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#4B3CE8] text-[11px] font-semibold shadow-2xs">
                <BadgeCheck className="w-3.5 h-3.5" />
                {currentId.valid}
              </span>
            </div>
          </div>
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-500">
          <Lock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>Used solely to issue your student badge. Never shared publicly.</span>
        </div>
      </div>

      {/* Active Listings Social Proof Pill */}
      <div className="bg-white rounded-2xl border border-slate-100 px-3.5 py-2.5 mb-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            <SafeImage
              src={IMAGES.avatarAigul}
              alt="AUCA Student"
              className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
            />
            <SafeImage
              src={IMAGES.avatarPeer}
              alt="Manas Student"
              className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
            />
            <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#4B3CE8] text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              +9
            </div>
          </div>
          <p className="text-[12px] text-slate-700">
            <span className="font-bold text-slate-900 tabular-nums">340+ active listings</span> in AUCA today
          </p>
        </div>
        <Flame className="w-4 h-4 text-[#FF5A36] shrink-0" />
      </div>

      {/* Enter Marketplace Primary CTA */}
      <button
        type="button"
        onClick={() => onEnterMarketplace(university, email)}
        className="w-full h-[50px] rounded-2xl bg-[#4B3CE8] hover:bg-[#3F31D2] active:scale-[0.99] text-white font-display font-semibold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(75,60,232,0.28)] transition-all cursor-pointer shrink-0"
      >
        <span>Verify & Enter CampusMarket</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Bottom Trust Assurance */}
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500">
        <Shield className="w-3.5 h-3.5 text-[#0E8A56]" />
        <span>Secured and vetted for 12,400+ Bishkek students</span>
      </div>
    </div>
  );
};
