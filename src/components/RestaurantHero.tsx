import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronRight,
  Clock,
  Heart,
  Info,
  MapPin,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Tag,
} from 'lucide-react';
import { HERO_BANNER_URL, STORE_INFO, VOUCHERS } from '../data/breadtalkMenu';
import { TASTE_IDENTITIES, VIBE_PROFILES } from '../data/closersData';
import { OrderMode, TasteIdentityId, Voucher } from '../types/menu';

interface RestaurantHeroProps {
  orderMode: OrderMode;
  onSelectMode: (mode: OrderMode) => void;
  deliveryAddress: string;
  onOpenAddressModal: () => void;
  onOpenReviewsModal: () => void;
  onOpenStoreInfoModal: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  appliedVoucher: Voucher | null;
  onToggleVoucher: (voucher: Voucher) => void;
  selectedTaste: TasteIdentityId;
  onSelectTaste: (taste: TasteIdentityId) => void;
  onAddMorningCombo: () => void;
  highlightedSectionId: string | null;
}

export const RestaurantHero: React.FC<RestaurantHeroProps> = ({
  orderMode,
  onSelectMode,
  deliveryAddress,
  onOpenAddressModal,
  onOpenReviewsModal,
  onOpenStoreInfoModal,
  isFavorite,
  onToggleFavorite,
  appliedVoucher,
  onToggleVoucher,
  selectedTaste,
  onSelectTaste,
  onAddMorningCombo,
  highlightedSectionId,
}) => {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(18 * 60 + 42);
  const [sharedCopied, setSharedCopied] = useState(false);
  const [comboFeedback, setComboFeedback] = useState(false);

  // Live oven batch countdown (Loss Avoidance)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => (s > 1 ? s - 1 : 18 * 60 + 42));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const countdownStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(
    2,
    '0'
  )}`;

  const handleSharePantry = () => {
    setSharedCopied(true);
    window.setTimeout(() => setSharedCopied(false), 2200);
  };

  const handleComboClick = () => {
    onAddMorningCombo();
    setComboFeedback(true);
    window.setTimeout(() => setComboFeedback(false), 1800);
  };

  const ringClass = (id: string) =>
    highlightedSectionId === id
      ? 'ring-2 ring-[#D70F64] ring-offset-2 transition-all'
      : '';

  return (
    <section id="top" className="bg-white border-b border-neutral-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-4 pb-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4 overflow-x-auto no-scrollbar"
        >
          <span className="hover:text-neutral-900 whitespace-nowrap">
            Singapore
          </span>
          <ChevronRight
            className="w-3.5 h-3.5 text-neutral-400 shrink-0"
            aria-hidden="true"
          />
          <span className="hover:text-neutral-900 whitespace-nowrap">
            Marina Bay
          </span>
          <ChevronRight
            className="w-3.5 h-3.5 text-neutral-400 shrink-0"
            aria-hidden="true"
          />
          <span className="text-neutral-900 font-medium whitespace-nowrap">
            {STORE_INFO.name}
          </span>
        </nav>

        {/* Wide Bakery Hero Image */}
        <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-neutral-100 mb-6">
          {!heroImgFailed ? (
            <img
              src={HERO_BANNER_URL}
              alt="BreadTalk Marina Bay Link Mall freshly baked counter display"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-50 via-stone-100 to-rose-50 flex flex-col items-center justify-center text-stone-700 p-6">
              <span className="font-display text-2xl font-bold">
                {STORE_INFO.name}
              </span>
              <span className="text-sm text-stone-500 mt-1">
                Freshly baked buns, steam cakes & loaves daily
              </span>
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
          />

          {/* Mobile Delivery Address Bar anchored cleanly inside lower-left hero scrim */}
          <button
            type="button"
            onClick={onOpenAddressModal}
            className="md:hidden absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <MapPin
                className="w-4 h-4 text-[#D70F64] shrink-0"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-neutral-900 truncate">
                {deliveryAddress}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#D70F64] shrink-0 ml-2">
              Change
            </span>
          </button>
        </div>

        {/* Store Header Row: Brand Emblem + Details + Actions */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* BreadTalk Square Brand Emblem */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-200 bg-white flex flex-col items-center justify-center shrink-0 p-2">
              <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-[#D70F64]">
                Bread
              </span>
              <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-neutral-900 -mt-1">
                Talk
              </span>
            </div>

            <div className="min-w-0">
              {/* Unboxed Cuisines & Price Metadata + Status Marker (S) */}
              <div
                id="closers-status"
                className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-neutral-500 mb-1 rounded-md ${ringClass(
                  'closers-status'
                )}`}
              >
                <span>{STORE_INFO.cuisines.join(' · ')}</span>
                <span aria-hidden="true">·</span>
                <span>{STORE_INFO.priceTier}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Marina Bay Insider · Priority Thermal Dispatch
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 text-balance">
                {STORE_INFO.name}
              </h1>

              {/* Rating & Inline Recognition Proof (R) */}
              <div
                id="closers-recognition"
                className={`mt-2.5 rounded-lg ${ringClass('closers-recognition')}`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-700">
                  <button
                    type="button"
                    onClick={onOpenReviewsModal}
                    className="inline-flex items-center gap-1.5 hover:text-[#D70F64] transition-colors cursor-pointer"
                  >
                    <Star
                      className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-neutral-900 tabular-nums">
                      {STORE_INFO.rating.toFixed(1)}/5
                    </span>
                    <span className="text-neutral-500 tabular-nums">
                      ({STORE_INFO.reviewCountLabel})
                    </span>
                    <span className="text-[#D70F64] font-semibold ml-0.5 underline underline-offset-2">
                      See reviews
                    </span>
                  </button>

                  <span className="text-neutral-300" aria-hidden="true">
                    ·
                  </span>

                  <span className="text-emerald-700 font-semibold text-xs sm:text-sm tabular-nums">
                    214 Marina Bay orders today
                  </span>

                  <span className="text-neutral-300" aria-hidden="true">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={onOpenStoreInfoModal}
                    className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium cursor-pointer"
                  >
                    <Info
                      className="w-4 h-4 text-neutral-500 shrink-0"
                      aria-hidden="true"
                    />
                    <span>More info</span>
                  </button>
                </div>

                {/* Inline Verified Neighbor Quote */}
                <p className="text-xs text-neutral-600 mt-1.5 italic">
                  &ldquo;Flosss & Shio Pan arrived still slightly warm at MBFC
                  Tower 2 in 16 mins.&rdquo; —{' '}
                  <span className="not-italic font-medium text-neutral-800">
                    Wei Ling T., Marina Bay verified order
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Controls: Delivery / Pick-up Segmented Control + Save Heart */}
          <div className="flex items-center gap-3 shrink-0 self-start">
            <div
              role="group"
              aria-label="Fulfillment method"
              className="inline-flex items-center p-1 bg-neutral-100 rounded-xl"
            >
              <button
                type="button"
                onClick={() => onSelectMode('delivery')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  orderMode === 'delivery'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => onSelectMode('pickup')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  orderMode === 'pickup'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Pick-up
              </button>
            </div>

            <button
              type="button"
              onClick={onToggleFavorite}
              aria-label={
                isFavorite ? 'Remove from favourites' : 'Save to favourites'
              }
              aria-pressed={isFavorite}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                isFavorite
                  ? 'border-[#D70F64] bg-[#FDF2F7] text-[#D70F64]'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-[#D70F64]' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* CLOSERS Upgrade Strip: Loss Avoidance (Batch Countdown) + Convenience (1-Tap Combo) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* L: Loss Avoidance — Warm Oven Batch Countdown */}
          <div
            id="closers-loss-avoidance"
            className={`rounded-xl border border-rose-200 bg-[#FDF2F7]/70 p-4 ${ringClass(
              'closers-loss-avoidance'
            )}`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-[#D70F64] mb-1.5">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                Warm Oven Batch #4 closes in
              </span>
              <span className="font-display text-sm tabular-nums">
                {countdownStr}
              </span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Order before batch dispatch to lock in warm Flosss &amp; Shio Pan
              plus S$ 3.00 off orders above S$ 18.00.
            </p>
          </div>

          {/* C: Convenience — 1-Tap Vibe-Tailored Combo */}
          <div
            id="closers-convenience"
            className={`rounded-xl border border-neutral-200 bg-white p-4 flex items-center justify-between gap-3 ${ringClass(
              'closers-convenience'
            )}`}
          >
            <div className="min-w-0">
              <div className="text-xs font-bold text-neutral-900">
                {VIBE_PROFILES[selectedTaste].comboTitle}
              </div>
              <div className="text-xs text-neutral-600 mt-0.5 truncate">
                {VIBE_PROFILES[selectedTaste].comboSummary}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                Instantly clears S$ 10.00 min. order
              </div>
            </div>
            <button
              type="button"
              onClick={handleComboClick}
              className="px-3.5 py-2 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white text-xs font-bold shrink-0 cursor-pointer transition-colors inline-flex items-center gap-1 tabular-nums"
            >
              {comboFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>
                    S$ {VIBE_PROFILES[selectedTaste].comboPrice.toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* O: Own Identity — Taste Identity Selector & Share Pantry List */}
        <div
          id="closers-own-identity"
          className={`mt-5 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl ${ringClass(
            'closers-own-identity'
          )}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-700 mr-1">
              Your BreadTalk vibe:
            </span>
            {TASTE_IDENTITIES.map((taste) => {
              const active = selectedTaste === taste.id;
              return (
                <button
                  key={taste.id}
                  type="button"
                  onClick={() => onSelectTaste(taste.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {taste.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleSharePantry}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D70F64] hover:text-[#B90D56] cursor-pointer self-start sm:self-auto shrink-0"
          >
            {sharedCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Office pantry link copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share office pantry list</span>
              </>
            )}
          </button>
        </div>

        {/* Available Deals / Vouchers Strip */}
        <div id="vouchers-strip" className="mt-5 pt-5 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm font-bold text-neutral-900">
              Available deals
            </h2>
            <span className="text-xs text-neutral-500">
              Click a deal to apply it to your cart
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {VOUCHERS.map((voucher) => {
              const isApplied = appliedVoucher?.id === voucher.id;
              return (
                <button
                  key={voucher.id}
                  type="button"
                  onClick={() => onToggleVoucher(voucher)}
                  className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isApplied
                      ? 'border-[#D70F64] bg-[#FDF2F7]'
                      : 'border-neutral-200 bg-[#FAFAFA] hover:border-neutral-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isApplied
                          ? 'bg-[#D70F64] text-white'
                          : 'bg-[#FDF2F7] text-[#D70F64]'
                      }`}
                    >
                      {isApplied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Tag className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-neutral-900">
                        {voucher.title}
                      </div>
                      <div className="text-xs text-neutral-600 truncate">
                        {voucher.subtitle}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold shrink-0 ${
                      isApplied ? 'text-[#D70F64]' : 'text-neutral-700'
                    }`}
                  >
                    {isApplied ? 'Applied' : 'Apply'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
