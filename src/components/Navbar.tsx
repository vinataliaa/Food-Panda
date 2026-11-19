import React from 'react';
import { MapPin, ShoppingBag, User } from 'lucide-react';
import { OrderMode } from '../types/menu';

interface NavbarProps {
  deliveryAddress: string;
  orderMode: OrderMode;
  onSelectMode: (mode: OrderMode) => void;
  onOpenAddressModal: () => void;
  onScrollToSection: (id: string) => void;
  onOpenStoreInfo: () => void;
  onOpenLogin: () => void;
  onOpenMobileCart: () => void;
  loggedInUser: string | null;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  deliveryAddress,
  orderMode,
  onSelectMode,
  onOpenAddressModal,
  onScrollToSection,
  onOpenStoreInfo,
  onOpenLogin,
  onOpenMobileCart,
  loggedInUser,
  cartCount,
}) => {
  const shortAddress = deliveryAddress.split(',')[0];

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-neutral-200">
      <div className="max-w-[1360px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D70F64] rounded-md"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-lg bg-[#D70F64] flex items-center justify-center shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="3" fill="#FFFFFF" />
              <circle cx="17" cy="7" r="3" fill="#FFFFFF" />
              <ellipse cx="12" cy="13.5" rx="7.5" ry="6.5" fill="#FFFFFF" />
              <ellipse cx="9.2" cy="12.5" rx="1.6" ry="2" fill="#1D1D1D" />
              <ellipse cx="14.8" cy="12.5" rx="1.6" ry="2" fill="#1D1D1D" />
              <circle cx="9.4" cy="12.1" r="0.55" fill="#FFFFFF" />
              <circle cx="14.6" cy="12.1" r="0.55" fill="#FFFFFF" />
              <ellipse cx="12" cy="15.2" rx="1.4" ry="0.9" fill="#1D1D1D" />
            </svg>
          </span>
          <span className="font-display text-[21px] font-bold tracking-tight text-[#D70F64]">
            foodpanda
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700"
        >
          <button
            type="button"
            onClick={onOpenAddressModal}
            className="inline-flex items-center gap-1.5 text-neutral-900 hover:text-[#D70F64] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            <MapPin className="w-4 h-4 text-[#D70F64] shrink-0" aria-hidden="true" />
            <span className="truncate max-w-[200px]">{shortAddress}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('delivery')}
            className={`whitespace-nowrap shrink-0 cursor-pointer py-2 border-b-2 transition-colors ${
              orderMode === 'delivery'
                ? 'border-[#D70F64] text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Delivery
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('pickup')}
            className={`whitespace-nowrap shrink-0 cursor-pointer py-2 border-b-2 transition-colors ${
              orderMode === 'pickup'
                ? 'border-[#D70F64] text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Pick-up
          </button>

          <button
            type="button"
            onClick={() => onScrollToSection('vouchers-strip')}
            className="text-neutral-600 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            Deals
          </button>

          <button
            type="button"
            onClick={onOpenStoreInfo}
            className="text-neutral-600 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            Store info
          </button>
        </nav>

        {/* Zone 3: Single Primary Action (+ compact mobile bag trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileCart}
            aria-label={`Open cart with ${cartCount} items`}
            className="lg:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 text-neutral-800 hover:border-neutral-300 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D70F64] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-neutral-300 text-neutral-900 hover:bg-neutral-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <User className="w-4 h-4 text-neutral-600 shrink-0" aria-hidden="true" />
            <span>{loggedInUser ? loggedInUser : 'Log in'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
