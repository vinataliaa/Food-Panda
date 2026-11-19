import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  HeartHandshake,
  Plus,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
} from 'lucide-react';
import {
  CLOSERS_PRINCIPLES,
  TASTE_IDENTITIES,
  VIBE_PROFILES,
} from '../data/closersData';
import { HERO_BANNER_URL, MENU_ITEMS, STORE_INFO } from '../data/breadtalkMenu';
import { TasteIdentityId } from '../types/menu';

interface ClosersComparisonViewProps {
  onJumpToLiveFeature: (highlightId: string) => void;
}

export const ClosersComparisonView: React.FC<ClosersComparisonViewProps> = ({
  onJumpToLiveFeature,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<number>(1);
  const [demoIdentity, setDemoIdentity] =
    useState<TasteIdentityId>('commuter');
  const [demoComboAdded, setDemoComboAdded] = useState(false);
  const [demoBatchReserved, setDemoBatchReserved] = useState(false);

  const activePrinciple =
    CLOSERS_PRINCIPLES.find((p) => p.pointNumber === selectedPoint) ||
    CLOSERS_PRINCIPLES[0];

  const flosssItem = MENU_ITEMS[0];
  const shioPanItem = MENU_ITEMS[2];

  const activeVibeProfile = VIBE_PROFILES[demoIdentity];
  const activeVibeMeta =
    TASTE_IDENTITIES.find((t) => t.id === demoIdentity) || TASTE_IDENTITIES[1];
  const vibePreviewItems = activeVibeProfile.previewItemIds
    .map((id) => MENU_ITEMS.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const renderCalloutPin = (num: number, colorHex: string) => {
    const isActive = selectedPoint === num;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPoint(num);
        }}
        aria-label={`Inspect point ${num}: ${CLOSERS_PRINCIPLES[num - 1].name}`}
        style={{
          backgroundColor: isActive ? colorHex : '#D70F64',
        }}
        className={`w-7 h-7 rounded-full text-white font-display text-xs font-bold flex items-center justify-center shadow-md cursor-pointer transition-transform shrink-0 ${
          isActive
            ? 'scale-115 ring-4 ring-white shadow-lg'
            : 'hover:scale-110 opacity-95'
        }`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      {/* Compact Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">
            Side-by-Side Comparison: Original vs. Improved Page
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Compare the original{' '}
            <span className="font-medium text-neutral-800">
              foodpanda.sg/restaurant/y1qz
            </span>{' '}
            storefront (left), the redesigned CLOSERS storefront (center), and
            the behavioral explanation (right).
          </p>
        </div>
        <div className="text-xs font-semibold text-[#D70F64] shrink-0">
          Click numbers 1–7 to inspect each change
        </div>
      </div>

      {/* 3-COLUMN LAYOUT: Original Page | New Improved Page (with 1-7 pins) | Side Explanation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)_370px] gap-6 items-start">
        {/* ================================================================ */}
        {/* COLUMN 1: ORIGINAL FOODPANDA.SG PAGE                             */}
        {/* ================================================================ */}
        <div className="space-y-2.5 min-w-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold tracking-wider uppercase text-neutral-500">
              1. Original Page
            </span>
            <span className="text-[11px] text-neutral-500">
              foodpanda.sg baseline
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            {/* Original Hero Banner */}
            <div className="relative h-28 bg-neutral-100">
              <img
                src={HERO_BANNER_URL}
                alt="Original BreadTalk storefront banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-4">
              {/* Original Store Header (Gaps #4 Status & #6 Recognition) */}
              <div
                onClick={() => setSelectedPoint(6)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPoint === 6 || selectedPoint === 4
                    ? 'border-neutral-400 bg-neutral-50 ring-2 ring-neutral-300'
                    : 'border-neutral-100 hover:border-neutral-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-lg border border-neutral-200 bg-white flex flex-col items-center justify-center shrink-0">
                    <span className="font-display text-[10px] font-extrabold text-[#D70F64]">
                      Bread
                    </span>
                    <span className="font-display text-[10px] font-extrabold text-neutral-900 -mt-0.5">
                      Talk
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-neutral-500">
                      Bakery · Cakes · Buns &amp; Pastries · $
                    </div>
                    <h3 className="font-display text-base font-bold text-neutral-900 leading-tight mt-0.5">
                      {STORE_INFO.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-neutral-900">
                        4.8/5
                      </span>
                      <span>(500+)</span>
                      <span>·</span>
                      <span className="text-[#D70F64] underline">
                        See reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
                  Delivery 15–30 min · S$ 1.99 delivery · Min. order S$ 10.00
                </div>
              </div>

              {/* Original Static Deals (Gap #2 Loss Avoidance) */}
              <div
                onClick={() => setSelectedPoint(2)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPoint === 2
                    ? 'border-neutral-400 bg-neutral-50 ring-2 ring-neutral-300'
                    : 'border-neutral-200 bg-[#FAFAFA]'
                }`}
              >
                <div className="text-xs font-bold text-neutral-800 mb-1.5">
                  Available deals
                </div>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white border border-neutral-200 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Tag className="w-3.5 h-3.5 text-[#D70F64] shrink-0" />
                    <div className="truncate">
                      <span className="font-semibold text-neutral-900">
                        S$ 3.00 off
                      </span>{' '}
                      <span className="text-neutral-500">· Min. S$ 18.00</span>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-600 shrink-0">
                    Apply
                  </span>
                </div>
              </div>

              {/* Original Plain Category Bar (Gap #3 Own Identity) */}
              <div
                onClick={() => setSelectedPoint(3)}
                className={`px-2 py-2 border-y border-neutral-200 flex items-center gap-4 text-xs overflow-hidden cursor-pointer ${
                  selectedPoint === 3 ? 'bg-neutral-50' : ''
                }`}
              >
                <span className="font-semibold text-[#D70F64] border-b-2 border-[#D70F64] pb-1 whitespace-nowrap">
                  Popular
                </span>
                <span className="text-neutral-500 whitespace-nowrap">
                  Buns &amp; Pastries
                </span>
                <span className="text-neutral-500 whitespace-nowrap">
                  Tea Cakes
                </span>
                <span className="text-neutral-500 whitespace-nowrap">
                  Toasts
                </span>
              </div>

              {/* Original Menu Cards (Gap #1 Convenience) */}
              <div
                onClick={() => setSelectedPoint(1)}
                className={`space-y-2.5 rounded-xl p-1 transition-all cursor-pointer ${
                  selectedPoint === 1 ? 'ring-2 ring-neutral-300 bg-neutral-50' : ''
                }`}
              >
                <div className="text-xs font-bold text-neutral-800 px-1">
                  Popular
                </div>

                {[flosssItem, shioPanItem].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-neutral-200 bg-white"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-semibold text-neutral-900">
                        {item.name}
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                      <div className="text-xs font-semibold text-neutral-900 mt-1.5 tabular-nums">
                        S$ {item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Original Plain Cart Footer (Gaps #5 Emotion & #7 Stickiness) */}
              <div
                onClick={() => setSelectedPoint(7)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedPoint === 7 || selectedPoint === 5
                    ? 'border-neutral-400 bg-neutral-50 ring-2 ring-neutral-300'
                    : 'border-neutral-200 bg-[#FAFAFA]'
                }`}
              >
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Subtotal (1 item)</span>
                  <span className="tabular-nums font-medium">S$ 2.70</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Add S$ 7.30 more to reach S$ 10.00 min. order · No streak or expiry protection
                </div>
                <div className="mt-2.5 py-2 rounded-lg bg-neutral-200 text-neutral-500 text-center text-xs font-semibold">
                  Review payment and address
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* COLUMN 2: NEW IMPROVED PAGE (FULL PAGE VISUAL + 1-7 CALLOUTS)    */}
        {/* ================================================================ */}
        <div className="space-y-2.5 min-w-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold tracking-wider uppercase text-[#D70F64]">
              2. New Improved Page · 7 Click Points
            </span>
            <span className="text-[11px] text-neutral-500">
              Redesigned BreadTalk storefront
            </span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#D70F64]/25 overflow-visible shadow-sm">
            {/* Improved Hero Banner with subtle Status Pill */}
            <div className="relative h-28 bg-neutral-100 rounded-t-[14px] overflow-hidden">
              <img
                src={HERO_BANNER_URL}
                alt="Improved BreadTalk storefront banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  Marina Bay Link Mall #B2-18
                </span>
                <span className="tabular-nums">Fresh batch baking now</span>
              </div>
            </div>

            <div className="p-4 space-y-3.5">
              {/* Improved Store Header: #4 Status + #6 Recognition */}
              <div className="space-y-2">
                {/* #4 STATUS */}
                <div
                  onClick={() => setSelectedPoint(4)}
                  className={`relative p-2.5 pr-9 rounded-xl border transition-all cursor-pointer ${
                    selectedPoint === 4
                      ? 'border-[#8E6D00] bg-[#FAF5E4]'
                      : 'border-amber-200/80 bg-amber-50/40 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8E6D00]">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Marina Bay Insider · Priority Thermal Dispatch Unlocked
                    </span>
                  </div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    {renderCalloutPin(4, CLOSERS_PRINCIPLES[3].accentHex)}
                  </div>
                </div>

                {/* Title + #6 RECOGNITION */}
                <div
                  onClick={() => setSelectedPoint(6)}
                  className={`relative p-3 pr-9 rounded-xl border transition-all cursor-pointer ${
                    selectedPoint === 6
                      ? 'border-[#18794E] bg-[#EAF6F0]'
                      : 'border-neutral-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg border border-neutral-200 bg-white flex flex-col items-center justify-center shrink-0">
                      <span className="font-display text-[10px] font-extrabold text-[#D70F64]">
                        Bread
                      </span>
                      <span className="font-display text-[10px] font-extrabold text-neutral-900 -mt-0.5">
                        Talk
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-neutral-900 leading-tight">
                        {STORE_INFO.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs mt-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-neutral-900">
                          4.8/5 (500+)
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="font-semibold text-[#18794E]">
                          214 Marina Bay orders today
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 italic mt-1">
                        &ldquo;Arrived still warm at MBFC Tower 2 in 16
                        mins.&rdquo; — Wei Ling T.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    {renderCalloutPin(6, CLOSERS_PRINCIPLES[5].accentHex)}
                  </div>
                </div>
              </div>

              {/* #2 LOSS AVOIDANCE: Warm Oven Batch Scarcity + Deal Window */}
              <div
                onClick={() => setSelectedPoint(2)}
                className={`relative p-3 pr-9 rounded-xl border transition-all cursor-pointer ${
                  selectedPoint === 2
                    ? 'border-[#B83344] bg-[#FBECEE]'
                    : 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#B83344] inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Warm Batch #4 closes in 18:42
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-800 tabular-nums">
                    {demoBatchReserved ? '2 Flosss left' : '3 Flosss left'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-[#B83344] transition-all"
                    style={{ width: demoBatchReserved ? '88%' : '80%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-700">
                  <span>Lock S$ 3.00 off above S$ 18 before batch leaves</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoint(2);
                      setDemoBatchReserved((v) => !v);
                    }}
                    className="font-semibold text-[#B83344] underline cursor-pointer shrink-0 ml-2"
                  >
                    {demoBatchReserved ? 'Reserved' : 'Reserve'}
                  </button>
                </div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  {renderCalloutPin(2, CLOSERS_PRINCIPLES[1].accentHex)}
                </div>
              </div>

              {/* #3 OWN IDENTITY: Your BreadTalk Vibe */}
              <div
                onClick={() => setSelectedPoint(3)}
                className={`relative p-3 pr-9 rounded-xl border transition-all cursor-pointer ${
                  selectedPoint === 3
                    ? 'border-[#6A479C] bg-[#F2EEF8]'
                    : 'border-purple-200/80 bg-purple-50/30 hover:bg-purple-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-[#6A479C] inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Your BreadTalk Vibe
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-600 inline-flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Share office list
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {TASTE_IDENTITIES.slice(1).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoint(3);
                        setDemoIdentity(t.id);
                      }}
                      className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                        demoIdentity === t.id
                          ? 'bg-[#6A479C] text-white'
                          : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  {renderCalloutPin(3, CLOSERS_PRINCIPLES[2].accentHex)}
                </div>
              </div>

              {/* #1 CONVENIENCE: 1-Tap Combo + Vibe-Curated Menu Cards */}
              <div
                onClick={() => setSelectedPoint(1)}
                className={`relative p-3 pr-9 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                  selectedPoint === 1
                    ? 'border-[#1F7A9B] bg-[#EBF5F8]'
                    : 'border-sky-200/80 bg-sky-50/30 hover:bg-sky-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-sky-200">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#1F7A9B]">
                      {activeVibeProfile.comboTitle}
                    </div>
                    <div className="text-[11px] text-neutral-600 truncate">
                      {activeVibeProfile.comboSummary} · Clears S$ 10 min
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPoint(1);
                      setDemoComboAdded((v) => !v);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold shrink-0 cursor-pointer tabular-nums ${
                      demoComboAdded
                        ? 'bg-[#1F7A9B] text-white'
                        : 'bg-[#D70F64] text-white'
                    }`}
                  >
                    {demoComboAdded
                      ? 'Added'
                      : `+ S$ ${activeVibeProfile.comboPrice.toFixed(2)}`}
                  </button>
                </div>

                <div className="flex items-center justify-between px-1 text-[11px] text-neutral-600">
                  <span>
                    Showing picks for{' '}
                    <strong className="text-[#6A479C]">
                      {activeVibeMeta.label}
                    </strong>
                  </span>
                  <span className="text-neutral-400">
                    {vibePreviewItems.length} featured
                  </span>
                </div>

                {/* Dynamically Swapped Upgraded Menu Cards matching selected Vibe */}
                <div className="space-y-2">
                  {vibePreviewItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-neutral-200 bg-white"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-sm font-semibold text-neutral-900">
                          {item.name}
                        </div>
                        <p className="text-[11px] text-amber-800 italic mt-0.5 line-clamp-1">
                          {item.sensoryNote || item.description}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[11px]">
                          <span className="font-bold text-neutral-900 tabular-nums">
                            S$ {item.price.toFixed(2)}
                          </span>
                          {item.positivePercent && item.orderedToday && (
                            <>
                              <span className="text-neutral-300">·</span>
                              <span className="text-emerald-700 font-medium">
                                {item.positivePercent}% liked ({item.orderedToday}{' '}
                                today)
                              </span>
                            </>
                          )}
                          {item.remainingBatch && (
                            <>
                              <span className="text-neutral-300">·</span>
                              <span className="text-[#D70F64] font-semibold">
                                Only {item.remainingBatch} left
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#D70F64] text-white flex items-center justify-center">
                          <Plus className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  {renderCalloutPin(1, CLOSERS_PRINCIPLES[0].accentHex)}
                </div>
              </div>

              {/* #5 EMOTION + #7 STICKINESS: Bakery Stamp Streak with Expiry Protection */}
              <div
                onClick={() => setSelectedPoint(7)}
                className={`relative p-3 pr-9 rounded-xl border transition-all cursor-pointer ${
                  selectedPoint === 7 || selectedPoint === 5
                    ? selectedPoint === 5
                      ? 'border-[#D07419] bg-[#FDF3E8]'
                      : 'border-[#1E3356] bg-[#ECF0F6]'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/70'
                }`}
              >
                {/* #5 Emotion: Stamp Expiry / Don't Lose Your Streak */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPoint(5);
                  }}
                  className="flex items-center justify-between text-xs mb-2 pb-1.5 border-b border-black/10"
                >
                  <span className="font-bold text-[#D07419] inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {demoComboAdded
                      ? 'Streak protected! (+14 days)'
                      : '3 stamps expire Nov 20 (48h left)'}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-700">
                    {demoComboAdded ? '4/5 saved' : "Don't lose streak"}
                  </span>
                </div>

                {/* #7 Stickiness: 5-Step Stamp Investment */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#1E3356] inline-flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#D70F64]" />
                    Bakery Stamp Streak (3/5 orders)
                  </span>
                  <span className="text-[11px] font-semibold text-[#D70F64]">
                    +1 stamp today
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        step <= 3
                          ? 'bg-[#1E3356] text-white'
                          : step === 4
                          ? 'border border-dashed border-[#D70F64] text-[#D70F64] bg-[#FDF2F7]'
                          : 'bg-white border border-neutral-200 text-neutral-400'
                      }`}
                    >
                      {step <= 3 ? (
                        <Check className="w-3 h-3" />
                      ) : step === 5 ? (
                        'Free'
                      ) : (
                        step
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-700 mb-2">
                  Order today to protect your 3-stamp streak &amp; unlock 1 step
                  closer to a Free warm Flosss.
                </p>
                <div className="py-2 rounded-lg bg-[#D70F64] text-white text-center text-xs font-bold tabular-nums">
                  {demoComboAdded
                    ? `Review payment and address · S$ ${activeVibeProfile.comboPrice.toFixed(
                        2
                      )}`
                    : 'Add items to reach S$ 10.00 min. order'}
                </div>

                {/* Dual Callout Pins (#5 Emotion on expiry row + #7 Stickiness on stamp streak) */}
                <div className="absolute -right-3 top-3 z-10">
                  {renderCalloutPin(5, CLOSERS_PRINCIPLES[4].accentHex)}
                </div>
                <div className="absolute -right-3 bottom-6 z-10">
                  {renderCalloutPin(7, CLOSERS_PRINCIPLES[6].accentHex)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* COLUMN 3: STICKY SIDE EXPLANATION PANEL (CLOSERS FRAMEWORK)      */}
        {/* ================================================================ */}
        <aside className="space-y-3 lg:sticky lg:top-20 min-w-0">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold tracking-wider uppercase text-neutral-700">
              3. CLOSERS Explanation
            </span>
            <span className="text-[11px] text-neutral-500 tabular-nums">
              Principle {activePrinciple.pointNumber} of 7
            </span>
          </div>

          <div
            className="bg-white rounded-2xl border-2 p-5 shadow-sm space-y-4 transition-colors"
            style={{ borderColor: activePrinciple.accentHex }}
          >
            {/* 7-Letter Selector Strip inside the Side Panel */}
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 mb-2">
                Select a trigger (#1–#7)
              </div>
              <div className="grid grid-cols-7 gap-1">
                {CLOSERS_PRINCIPLES.map((p) => {
                  const isActive = selectedPoint === p.pointNumber;
                  return (
                    <button
                      key={p.pointNumber}
                      type="button"
                      onClick={() => setSelectedPoint(p.pointNumber)}
                      title={`${p.pointNumber}. ${p.name}`}
                      style={{
                        backgroundColor: isActive ? p.accentHex : '#F5F5F5',
                        color: isActive ? '#FFFFFF' : '#404040',
                      }}
                      className={`py-2 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isActive ? 'shadow-sm font-bold' : 'hover:bg-neutral-200'
                      }`}
                    >
                      <span className="font-display text-xs font-extrabold leading-none">
                        {p.letter}
                      </span>
                      <span className="text-[10px] mt-0.5 opacity-85 tabular-nums">
                        #{p.pointNumber}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Principle Header */}
            <div className="pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-2.5">
                <span
                  style={{ backgroundColor: activePrinciple.accentHex }}
                  className="w-8 h-8 rounded-full text-white font-display text-sm font-bold flex items-center justify-center shrink-0 tabular-nums"
                >
                  {activePrinciple.pointNumber}
                </span>
                <div>
                  <div className="text-[11px] font-semibold text-neutral-500">
                    {activePrinciple.uiLocationLabel}
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-900 leading-tight">
                    {activePrinciple.letter} — {activePrinciple.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* What This Principle Is About (General Meaning) */}
            <div
              className="p-3.5 rounded-xl text-white"
              style={{ backgroundColor: activePrinciple.accentHex }}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1">
                What {activePrinciple.name} means
              </div>
              <p className="text-xs leading-relaxed text-white/95">
                {activePrinciple.generalPrinciple}
              </p>
              <div className="mt-2 pt-2 border-t border-white/20 text-[11px] italic text-white/85">
                &ldquo;{activePrinciple.slideExample}&rdquo;
              </div>
            </div>

            {/* Original Gap */}
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Original foodpanda.sg Gap
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {activePrinciple.originalGap}
              </p>
            </div>

            {/* Improved Change */}
            <div
              className="p-3.5 rounded-xl border"
              style={{
                backgroundColor: activePrinciple.bgHex,
                borderColor: `${activePrinciple.accentHex}33`,
              }}
            >
              <div
                className="text-[11px] font-bold uppercase tracking-wider mb-1"
                style={{ color: activePrinciple.accentHex }}
              >
                What Changed in New Page
              </div>
              <p className="text-xs text-neutral-900 leading-relaxed font-medium">
                {activePrinciple.improvedChange}
              </p>
            </div>

            {/* Jump to Live Storefront */}
            <button
              type="button"
              onClick={() =>
                onJumpToLiveFeature(activePrinciple.liveHighlightId)
              }
              className="w-full py-2.5 px-4 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Test #{activePrinciple.pointNumber} on Live Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compact All-7 Quick Index below */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-4">
            <div className="text-xs font-bold text-neutral-800 mb-2">
              The Seven CLOSERS Letters
            </div>
            <div className="space-y-1.5">
              {CLOSERS_PRINCIPLES.map((p) => {
                const isActive = selectedPoint === p.pointNumber;
                return (
                  <button
                    key={p.pointNumber}
                    type="button"
                    onClick={() => setSelectedPoint(p.pointNumber)}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-neutral-100 font-bold text-neutral-900'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span
                        className="font-display font-extrabold w-4 shrink-0"
                        style={{ color: p.accentHex }}
                      >
                        {p.letter}
                      </span>
                      <span className="truncate">{p.name}</span>
                    </span>
                    <span className="text-[11px] text-neutral-400 tabular-nums shrink-0">
                      #{p.pointNumber}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
