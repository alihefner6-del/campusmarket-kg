import React, { useCallback, useEffect, useState } from 'react';
import { Wifi, BatteryFull, Signal } from 'lucide-react';
import { supabase } from './lib/supabaseClient';
import {
  INITIAL_CHAT_MESSAGES,
  INITIAL_LISTINGS,
  INITIAL_MEETUP,
  SELLERS,
  mapSupabaseRowToListingItem,
} from './data/mockData';
import {
  ChatMessage,
  ListingItem,
  MeetupState,
  ScreenId,
  SellerInfo,
  SupabaseListingRow,
} from './types';
import { BottomNav } from './components/BottomNav';
import { ChatScreen } from './components/ChatScreen';
import { HomeScreen } from './components/HomeScreen';
import { ItemDetailScreen } from './components/ItemDetailScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { PostItemScreen } from './components/PostItemScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('onboarding');
  const [previousScreen, setPreviousScreen] = useState<ScreenId>('home');
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState<boolean>(true);
  const [listingsError, setListingsError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [selectedCampusId, setSelectedCampusId] = useState<string>('all');
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
  const [profileUser, setProfileUser] = useState<SellerInfo>(SELLERS.aigul);

  // Chat & Meetup state (initialized with Screen 5 Bakyt T. + TI-84 Plus CE data)
  const [chatPeer, setChatPeer] = useState<SellerInfo>(SELLERS.bakyt);
  const [chatItem, setChatItem] = useState<ListingItem>(
    INITIAL_LISTINGS.find((i) => i.id === 'ti84-ce-featured') || INITIAL_LISTINGS[2]
  );
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [meetup, setMeetup] = useState<MeetupState>(INITIAL_MEETUP);
  const [unreadCount, setUnreadCount] = useState<number>(3);

  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  const fetchListings = useCallback(async () => {
    setIsLoadingListings(true);
    setListingsError(null);
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[CampusMarket] Supabase fetch listings error:', error.code, error.message);
        setListingsError(
          `${error.message}${error.hint ? ` (${error.hint})` : ''}`
        );
        setListings([]);
        return;
      }

      const mapped = ((data || []) as SupabaseListingRow[]).map(
        mapSupabaseRowToListingItem
      );
      setListings(mapped);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('[CampusMarket] Supabase fetch error:', msg);
      setListingsError(msg);
      setListings([]);
    } finally {
      setIsLoadingListings(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();

    const channel = supabase
      .channel('public:listings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'listings' },
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            const mapped = mapSupabaseRowToListingItem(
              payload.new as SupabaseListingRow
            );
            setListings((prev) => {
              const deduped = prev.filter((item) => item.id !== mapped.id);
              return [mapped, ...deduped];
            });
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            const mapped = mapSupabaseRowToListingItem(
              payload.new as SupabaseListingRow
            );
            setListings((prev) =>
              prev.map((item) => (item.id === mapped.id ? mapped : item))
            );
          } else if (payload.eventType === 'DELETE' && payload.old) {
            const oldId = String(
              (payload.old as { id?: string | number }).id ?? ''
            );
            setListings((prev) => prev.filter((item) => item.id !== oldId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchListings]);

  const selectedItem =
    listings.find((item) => item.id === selectedItemId) ||
    listings[0] ||
    INITIAL_LISTINGS[0];

  const handleEnterMarketplace = () => {
    setScreen('home');
    showToast('Verified AUCA Student Badge active');
  };

  const handleSelectItem = (item: ListingItem) => {
    setPreviousScreen(screen === 'detail' ? 'home' : screen);
    setSelectedItemId(item.id);
    setScreen('detail');
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistedIds((prev) => {
      const exists = prev.includes(id);
      showToast(exists ? 'Removed from saved items' : 'Saved to wishlist alerts');
      return exists ? prev.filter((item) => item !== id) : [...prev, id];
    });
  };

  const handleOpenSellerProfile = (seller: SellerInfo) => {
    setProfileUser(seller);
    setScreen('profile');
  };

  const handleNavigateTab = (target: ScreenId) => {
    if (target === 'profile') {
      setProfileUser(SELLERS.aigul);
    }
    if (target === 'chat') {
      setUnreadCount(0);
    }
    setScreen(target);
  };

  const handleOpenChatFromItem = (item: ListingItem, reserveFirst: boolean) => {
    setChatPeer(item.seller);
    setChatItem({ ...item, reserved: reserveFirst ? true : item.reserved });

    if (reserveFirst) {
      setListings((prev) =>
        prev.map((l) => (l.id === item.id ? { ...l, reserved: true } : l))
      );
      setMeetup({
        safeSpot:
          item.handoffZoneDetail.split(' or ')[0] ||
          'AUCA Main Forum (Under Big Screen)',
        safeSpotNote: '24/7 Monitored Campus Guard Zone',
        timeWindow: 'Tomorrow (Wed) • 12:15 - 12:45 PM',
        timeWindowNote: 'During Common Lunch Break • Zero Class Conflict',
        acceptedCount: 1,
        userAccepted: false,
      });
      showToast(`24h Zero-Risk Hold locked for ${item.shortTitle}`);
    }

    setUnreadCount(0);
    setScreen('chat');
  };

  const handleListingCreated = async (createdItem: ListingItem | null) => {
    if (createdItem) {
      setListings((prev) => {
        const deduped = prev.filter((item) => item.id !== createdItem.id);
        return [createdItem, ...deduped];
      });
    }
    await fetchListings();
    setSelectedCampusId('all');
    setScreen('home');
    showToast('Listing published to CampusMarket!');
  };

  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: `me-${Date.now()}`,
      sender: 'me',
      text,
      time: timeLabel,
      read: true,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `peer-${Date.now()}`,
        sender: 'peer',
        senderName: chatPeer.handle,
        text: `Got it! See you at ${meetup.safeSpot.split('(')[0].trim()} — I'll bring my student ID too.`,
        time: timeLabel,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 650);
  };

  const handleAcceptMeetup = () => {
    setMeetup((prev) => {
      const nextAccepted = !prev.userAccepted;
      showToast(
        nextAccepted
          ? 'Safe-Zone Meetup confirmed by both peers'
          : 'Meetup confirmation paused'
      );
      return {
        ...prev,
        userAccepted: nextAccepted,
        acceptedCount: nextAccepted ? 2 : 1,
      };
    });
  };

  const handleUpdateMeetup = (spot: string, timeWindow: string) => {
    setMeetup((prev) => ({
      ...prev,
      safeSpot: spot,
      timeWindow,
      userAccepted: true,
      acceptedCount: 2,
    }));
    showToast('Updated Safe-Zone meetup proposal');
  };

  const showBottomNav =
    screen === 'home' ||
    screen === 'explore' ||
    screen === 'chat' ||
    screen === 'profile';

  return (
    <div className="min-h-screen w-full bg-[#E6E9F2] flex items-center justify-center sm:py-4 sm:px-4">
      {/* Sleek 390px Mobile Phone Frame */}
      <div className="relative w-full sm:w-[390px] h-dvh sm:h-[844px] sm:max-h-[94vh] bg-[#F7F8FC] sm:rounded-[44px] sm:border-[8px] sm:border-[#1B1F30] sm:shadow-[0_28px_72px_rgba(15,23,42,0.24)] flex flex-col overflow-hidden">
        {/* Simulated Mobile Status Bar (desktop frame polish) */}
        <div className="hidden sm:flex shrink-0 h-8 bg-white px-6 items-center justify-between text-[11.5px] font-bold text-slate-900 select-none">
          <span className="tabular-nums">9:41</span>
          <div className="w-24 h-4 rounded-full bg-[#1B1F30]" aria-hidden="true" />
          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryFull className="w-4 h-4" />
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 px-3.5 py-2 rounded-full bg-slate-900/92 text-white text-[11.5px] font-semibold shadow-lg whitespace-nowrap pointer-events-none">
            {toast}
          </div>
        )}

        {/* Active Screen Viewport */}
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {screen === 'onboarding' && (
            <OnboardingScreen onEnterMarketplace={handleEnterMarketplace} />
          )}

          {(screen === 'home' || screen === 'explore') && (
            <HomeScreen
              listings={listings}
              isExploreMode={screen === 'explore'}
              isLoadingListings={isLoadingListings}
              listingsError={listingsError}
              onRetryFetch={fetchListings}
              selectedCampusId={selectedCampusId}
              onSelectCampus={setSelectedCampusId}
              onSelectItem={handleSelectItem}
              onNavigate={handleNavigateTab}
            />
          )}

          {screen === 'detail' && (
            <ItemDetailScreen
              item={selectedItem}
              isWishlisted={wishlistedIds.includes(selectedItem.id)}
              onToggleWishlist={handleToggleWishlist}
              onBack={() =>
                setScreen(
                  previousScreen === 'profile' ? 'profile' : 'home'
                )
              }
              onOpenSellerProfile={handleOpenSellerProfile}
              onOpenChat={handleOpenChatFromItem}
              onOpenMyProfile={() => {
                setProfileUser(SELLERS.aigul);
                setScreen('profile');
              }}
            />
          )}

          {screen === 'post' && (
            <PostItemScreen
              onClose={() => setScreen('home')}
              onListingCreated={handleListingCreated}
            />
          )}

          {screen === 'chat' && (
            <ChatScreen
              peer={chatPeer}
              activeItem={chatItem}
              messages={messages}
              meetup={meetup}
              onBack={() => setScreen('home')}
              onSendMessage={handleSendMessage}
              onAcceptMeetup={handleAcceptMeetup}
              onUpdateMeetup={handleUpdateMeetup}
            />
          )}

          {screen === 'profile' && (
            <ProfileScreen
              profileUser={profileUser}
              listings={listings}
              onSelectItem={handleSelectItem}
              onMessageUser={(user) => {
                const userListing =
                  listings.find((l) => l.seller.id === user.id) || chatItem;
                handleOpenChatFromItem(userListing, false);
              }}
              onOpenOnboarding={() => setScreen('onboarding')}
            />
          )}
        </main>

        {/* 5-Tab Bottom Navigation Bar */}
        {showBottomNav && (
          <BottomNav
            activeScreen={screen}
            unreadCount={unreadCount}
            onNavigate={handleNavigateTab}
          />
        )}

        {/* Home Indicator Bar */}
        <div className="hidden sm:flex shrink-0 h-4 bg-white items-center justify-center">
          <div className="w-28 h-1 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
