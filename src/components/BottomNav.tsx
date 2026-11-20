import React from 'react';
import { Compass, Home, MessageSquare, Plus, User } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavProps {
  activeScreen: ScreenId;
  unreadCount: number;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  unreadCount,
  onNavigate,
}) => {
  const isHome = activeScreen === 'home';
  const isExplore = activeScreen === 'explore';
  const isMessages = activeScreen === 'chat';
  const isProfile = activeScreen === 'profile';

  return (
    <nav
      aria-label="Primary Campus Navigation"
      className="relative shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 pt-1.5 pb-2.5 z-30"
    >
      <div className="grid grid-cols-5 items-end">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            isHome ? 'text-[#4B3CE8]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-current={isHome ? 'page' : undefined}
        >
          <Home className="w-[21px] h-[21px]" strokeWidth={isHome ? 2.3 : 1.9} />
          <span className="text-[11px] font-semibold mt-0.5 tracking-tight">Home</span>
          <span
            className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${
              isHome ? 'bg-[#4B3CE8] opacity-100' : 'opacity-0'
            }`}
          />
        </button>

        {/* 2. Explore */}
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            isExplore ? 'text-[#4B3CE8]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-current={isExplore ? 'page' : undefined}
        >
          <Compass className="w-[21px] h-[21px]" strokeWidth={isExplore ? 2.3 : 1.9} />
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">Explore</span>
          <span
            className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${
              isExplore ? 'bg-[#4B3CE8] opacity-100' : 'opacity-0'
            }`}
          />
        </button>

        {/* 3. Sell FAB */}
        <div className="flex flex-col items-center justify-end -mt-5">
          <button
            type="button"
            onClick={() => onNavigate('post')}
            aria-label="Sell item"
            className="w-[46px] h-[46px] rounded-full bg-[#FF5A36] hover:bg-[#EE4C28] active:scale-95 text-white shadow-[0_6px_16px_rgba(255,90,54,0.38)] flex items-center justify-center transition-all cursor-pointer ring-4 ring-white"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <span className="text-[11px] font-medium text-slate-600 mt-1 tracking-tight">
            Sell
          </span>
        </div>

        {/* 4. Messages */}
        <button
          type="button"
          onClick={() => onNavigate('chat')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            isMessages ? 'text-[#4B3CE8]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-current={isMessages ? 'page' : undefined}
        >
          <div className="relative">
            <MessageSquare
              className="w-[21px] h-[21px]"
              strokeWidth={isMessages ? 2.3 : 1.9}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#FF5A36] text-white text-[10px] font-bold flex items-center justify-center leading-none tabular-nums">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">Messages</span>
          <span
            className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${
              isMessages ? 'bg-[#4B3CE8] opacity-100' : 'opacity-0'
            }`}
          />
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            isProfile ? 'text-[#4B3CE8]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-current={isProfile ? 'page' : undefined}
        >
          <User className="w-[21px] h-[21px]" strokeWidth={isProfile ? 2.3 : 1.9} />
          <span className="text-[11px] font-medium mt-0.5 tracking-tight">Profile</span>
          <span
            className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${
              isProfile ? 'bg-[#4B3CE8] opacity-100' : 'opacity-0'
            }`}
          />
        </button>
      </div>
    </nav>
  );
};
