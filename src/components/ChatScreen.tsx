import React, { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  CheckCheck,
  ChevronLeft,
  Clock,
  Lock,
  MapPin,
  MoreVertical,
  Plus,
  QrCode,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ChatMessage, ListingItem, MeetupState, SellerInfo } from '../types';
import { BrandMark } from './BrandMark';
import { SafeImage } from './SafeImage';

interface ChatScreenProps {
  peer: SellerInfo;
  activeItem: ListingItem;
  messages: ChatMessage[];
  meetup: MeetupState;
  onBack: () => void;
  onSendMessage: (text: string) => void;
  onAcceptMeetup: () => void;
  onUpdateMeetup: (spot: string, timeWindow: string) => void;
}

const QUICK_REPLIES = [
  { label: 'Is battery charged?', icon: 'battery' },
  { label: 'MBank QR Ready', icon: 'qr' },
  { label: 'Wearing blue jacket', icon: 'info' },
  { label: 'At Forum Desk now', icon: 'pin' },
];

const SAFE_SPOTS = [
  'AUCA Main Forum (Under Big Screen)',
  'AUCA Library Checkpoint (2nd Floor)',
  'Manas Cafeteria Central Hub',
  'Ala-Too Block B Lobby',
];

const TIME_SLOTS = [
  'Tomorrow (Wed) • 12:15 - 12:45 PM',
  'Today • 16:30 - 17:00 PM',
  'Thu • 13:00 - 13:30 PM (Lunch)',
];

export const ChatScreen: React.FC<ChatScreenProps> = ({
  peer,
  activeItem,
  messages,
  meetup,
  onBack,
  onSendMessage,
  onAcceptMeetup,
  onUpdateMeetup,
}) => {
  const [draft, setDraft] = useState('');
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(meetup.safeSpot);
  const [selectedSlot, setSelectedSlot] = useState(meetup.timeWindow);
  const [showTrustBanner, setShowTrustBanner] = useState(false);

  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onSendMessage(text);
    setDraft('');
  };

  const handleProposeSubmit = () => {
    onUpdateMeetup(selectedSpot, selectedSlot);
    setShowProposeModal(false);
  };

  const peerFirst = peer.name.split(' ')[0];

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#F7F8FC] relative">
      {/* Top Peer Header */}
      <header className="shrink-0 bg-white px-3 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative shrink-0">
            <SafeImage
              src={peer.avatar}
              alt={peer.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#0E8A56] ring-2 ring-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h1 className="font-display text-[14px] font-bold text-slate-900 truncate">
                {peer.handle}
              </h1>
              <BadgeCheck className="w-3.5 h-3.5 text-[#4B3CE8] shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              {peer.campus} Senior • Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setShowTrustBanner((v) => !v)}
            aria-label="Campus safety check"
            className="w-8 h-8 rounded-full hover:bg-[#EEF0FF] text-[#4B3CE8] flex items-center justify-center cursor-pointer"
          >
            <Shield className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowProposeModal(true)}
            aria-label="Meetup options"
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mini Product & Propose Meetup Bar */}
      <div className="shrink-0 bg-white px-3.5 py-2 border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <BrandMark size="sm" />
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold text-slate-900 truncate">
              {activeItem.shortTitle}
            </p>
            <p className="text-[11.5px] font-bold text-[#D94322] tabular-nums">
              {activeItem.priceKgs.toLocaleString()} KGS
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowProposeModal(true)}
          className="shrink-0 px-3 py-1.5 rounded-full bg-[#4B3CE8] hover:bg-[#3F31D2] text-white text-[11.5px] font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Propose Meetup</span>
        </button>
      </div>

      {showTrustBanner && (
        <div className="mx-3.5 mt-2 rounded-xl bg-[#EEF0FF] px-3 py-2 text-[11px] text-[#4B3CE8] font-medium flex items-center justify-between gap-2">
          <span>Escrow-free peer safety: inspect item inside campus guard view before MBank transfer.</span>
          <button
            type="button"
            onClick={() => setShowTrustBanner(false)}
            className="font-bold underline shrink-0 cursor-pointer"
          >
            OK
          </button>
        </div>
      )}

      {/* Propose Meetup Modal Sheet */}
      {showProposeModal && (
        <div className="absolute inset-0 z-40 bg-slate-900/45 backdrop-blur-xs flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-4 space-y-3 shadow-2xl">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto" />
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[15px] font-bold text-slate-900">
                Schedule Safe-Zone Meetup
              </h2>
              <button
                type="button"
                onClick={() => setShowProposeModal(false)}
                className="text-xs font-semibold text-slate-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Campus Safe Zone
              </span>
              <div className="space-y-1.5">
                {SAFE_SPOTS.map((spot) => (
                  <button
                    key={spot}
                    type="button"
                    onClick={() => setSelectedSpot(spot)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      selectedSpot === spot
                        ? 'bg-[#EEF0FF] border-[#4B3CE8] text-[#4B3CE8]'
                        : 'bg-[#F7F8FC] border-slate-200/70 text-slate-700'
                    }`}
                  >
                    {spot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Lunch / Break Window
              </span>
              <div className="space-y-1.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      selectedSlot === slot
                        ? 'bg-[#EEF0FF] border-[#4B3CE8] text-[#4B3CE8]'
                        : 'bg-[#F7F8FC] border-slate-200/70 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleProposeSubmit}
              className="w-full h-11 rounded-2xl bg-[#4B3CE8] text-white font-display font-semibold text-sm cursor-pointer"
            >
              Send Meetup Proposal
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Chat & Safe-Zone Widget */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3.5 pt-2.5 pb-3 space-y-2.5">
        {/* Reserved Item Summary Pill */}
        <div className="bg-white rounded-2xl border border-slate-100 p-2.5 flex items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <SafeImage
              src={activeItem.images[0]}
              alt={activeItem.title}
              className="w-11 h-11 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-bold text-slate-900 truncate">
                {activeItem.shortTitle} •{' '}
                <span className="text-[#D94322] tabular-nums">
                  {activeItem.priceKgs.toLocaleString()} KGS
                </span>
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {activeItem.conditionSummary}
              </p>
            </div>
          </div>

          <span className="shrink-0 px-2 py-1 rounded-lg bg-[#D1FAE5] text-[#065F46] text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Reserved
          </span>
        </div>

        {/* Confirmed Safe-Zone Meetup Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[#4B3CE8]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="font-display text-[12.5px] font-bold leading-tight">
                Confirmed Safe-Zone Meetup
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#EEF0FF] text-[#4B3CE8] text-[9.5px] font-extrabold tracking-wide uppercase shrink-0">
              Campus Protected
            </span>
          </div>

          {/* Designated Safe Spot */}
          <div className="rounded-xl bg-[#F7F8FC] px-3 py-2.5 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#EEF0FF] text-[#4B3CE8] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                Designated Safe Spot
              </p>
              <p className="text-[12.5px] font-bold text-slate-900 truncate">
                {meetup.safeSpot}
              </p>
              <p className="text-[10.5px] font-semibold text-[#0E8A56] flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A56]" />
                {meetup.safeSpotNote}
              </p>
            </div>
          </div>

          {/* Agreed Time Window */}
          <div className="rounded-xl bg-[#F7F8FC] px-3 py-2.5 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#FFE9E4] text-[#D94322] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                Agreed Time Window
              </p>
              <p className="text-[12.5px] font-bold text-slate-900">
                {meetup.timeWindow}
              </p>
              <p className="text-[10.5px] text-slate-500 mt-0.5">
                {meetup.timeWindowNote}
              </p>
            </div>
          </div>

          {/* Acceptance Status Row */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  meetup.userAccepted ? 'bg-[#0E8A56]' : 'bg-[#FF5A36]'
                }`}
              />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-slate-900 tabular-nums">
                  {meetup.userAccepted ? '2 of 2 Accepted' : '1 of 2 Accepted'}
                </p>
                <p className="text-[10.5px] text-slate-500 truncate">
                  {meetup.userAccepted ? 'Both peers locked in' : `${peerFirst} accepted`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onAcceptMeetup}
              className={`px-3 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer whitespace-nowrap ${
                meetup.userAccepted
                  ? 'bg-[#0E8A56] text-white shadow-xs'
                  : 'bg-[#4B3CE8] hover:bg-[#3F31D2] text-white shadow-sm'
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{meetup.userAccepted ? 'Meetup Confirmed' : 'Accept Meetup Time'}</span>
            </button>
          </div>

          <p className="text-[10.5px] italic text-slate-400 leading-snug pt-0.5 border-t border-slate-100">
            Never agree to meet in isolated off-campus alleys. Keep handovers in clear public view.
          </p>
        </div>

        {/* Timestamp Divider */}
        <div className="flex justify-center py-1">
          <span className="px-3 py-0.5 rounded-full bg-slate-200/70 text-[10.5px] font-medium text-slate-500">
            Today, 12:15 PM
          </span>
        </div>

        {/* Messages Thread */}
        <div className="space-y-2.5">
          {messages.map((msg) => {
            if (msg.sender === 'protocol') {
              return (
                <div
                  key={msg.id}
                  className="rounded-2xl bg-[#FDECE7] border border-[#FF5A36]/15 p-3 flex items-start gap-2.5"
                >
                  <ShieldAlert className="w-4 h-4 text-[#B93815] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#9A2E10]">
                      Campus Trust Protocol
                    </p>
                    <p className="text-[11.5px] text-[#7A2710] leading-snug mt-0.5">
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            }

            if (msg.sender === 'me') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[84%] rounded-2xl rounded-br-md bg-[#4B3CE8] text-white px-3.5 py-2.5 shadow-sm">
                    <p className="text-[12.5px] leading-relaxed">{msg.text}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/75 tabular-nums">
                      <span>{msg.time}</span>
                      <CheckCheck className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-slate-100 px-3.5 py-2.5 shadow-2xs">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11.5px] font-bold text-[#4B3CE8]">
                      {msg.senderName || peer.handle}
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-800 leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={threadEndRef} />
        </div>
      </div>

      {/* Quick Reply Chips + Message Composer */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-3 pt-2 pb-2.5 space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {QUICK_REPLIES.map((qr) => (
            <button
              key={qr.label}
              type="button"
              onClick={() => onSendMessage(qr.label)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#F7F8FC] hover:bg-[#EEF0FF] border border-slate-200/80 text-[11px] font-semibold text-slate-700 hover:text-[#4B3CE8] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
            >
              {qr.icon === 'qr' && <QrCode className="w-3 h-3 text-[#FF5A36]" />}
              {qr.icon === 'pin' && <MapPin className="w-3 h-3 text-[#4B3CE8]" />}
              {qr.icon === 'battery' && <Sparkles className="w-3 h-3 text-[#4B3CE8]" />}
              <span>{qr.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowProposeModal(true)}
            aria-label="Add meetup time"
            className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>

          <div className="flex-1 min-w-0 bg-[#F3F4F8] rounded-full px-3.5 py-2 flex items-center gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${peerFirst}...`}
              className="flex-1 min-w-0 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onSendMessage(`Shared Safe-Zone Pin: ${meetup.safeSpot}`)}
              aria-label="Share safe zone pin"
              className="text-slate-400 hover:text-[#4B3CE8] shrink-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>

          <button
            type="submit"
            aria-label="Send message"
            className="w-9 h-9 rounded-full bg-[#4B3CE8] hover:bg-[#3F31D2] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
