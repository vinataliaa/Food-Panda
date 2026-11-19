import React, { useState } from 'react';
import {
  Check,
  HeartHandshake,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { MENU_ITEMS, STORE_INFO, VOUCHERS } from '../data/breadtalkMenu';
import { CartItem, MenuItem, OrderMode, Voucher } from '../types/menu';

interface CartSidebarProps {
  cart: CartItem[];
  orderMode: OrderMode;
  onSelectMode: (mode: OrderMode) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onClearCart: () => void;
  onQuickAddMenuItem: (item: MenuItem) => void;
  appliedVoucher: Voucher | null;
  onApplyVoucher: (voucher: Voucher | null) => void;
  onCheckout: () => void;
  stampCount: number;
  highlightedSectionId?: string | null;
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
}

export function getCartLineUnitPrice(ci: CartItem): number {
  const optionsExtra = Object.values(ci.selectedOptions).reduce(
    (sum, opt) => sum + opt.priceDelta,
    0
  );
  return ci.item.price + optionsExtra;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  orderMode,
  onSelectMode,
  onUpdateQuantity,
  onClearCart,
  onQuickAddMenuItem,
  appliedVoucher,
  onApplyVoucher,
  onCheckout,
  stampCount,
  highlightedSectionId,
  isDrawer = false,
  onCloseDrawer,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [noCutlery, setNoCutlery] = useState(true);

  const subtotal = cart.reduce(
    (sum, ci) => sum + getCartLineUnitPrice(ci) * ci.quantity,
    0
  );

  const rawDeliveryFee = orderMode === 'delivery' ? STORE_INFO.deliveryFee : 0;
  const platformFee = cart.length > 0 ? STORE_INFO.platformFee : 0;

  let discount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minSpend) {
    if (appliedVoucher.type === 'free_delivery') {
      discount = rawDeliveryFee;
    } else {
      discount = Math.min(appliedVoucher.discountAmount, subtotal);
    }
  }

  const total = Math.max(0, subtotal + rawDeliveryFee + platformFee - discount);
  const meetsMinOrder =
    orderMode === 'pickup' || subtotal >= STORE_INFO.minOrder;
  const remainingForMinOrder = Math.max(0, STORE_INFO.minOrder - subtotal);
  const minOrderProgress = Math.min(100, (subtotal / STORE_INFO.minOrder) * 100);

  // Popular upsells not currently in cart
  const cartItemIds = new Set(cart.map((c) => c.item.id));
  const upsells = MENU_ITEMS.filter(
    (m) =>
      !cartItemIds.has(m.id) &&
      (m.id === 'hokkaido-fresh-milk' ||
        m.id === 'shio-pan' ||
        m.id === 'flosss')
  ).slice(0, 2);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = promoCodeInput.trim().toUpperCase();
    if (!trimmed) return;
    const match = VOUCHERS.find((v) => v.code === trimmed);
    if (match) {
      onApplyVoucher(match);
      setPromoError('');
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid code. Try BREAD3OFF or MBLMFREE.');
    }
  };

  return (
    <div
      className={`bg-white flex flex-col ${
        isDrawer
          ? 'h-full'
          : 'rounded-2xl border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden'
      }`}
    >
      {/* Drawer Header when in mobile modal */}
      {isDrawer && (
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-neutral-900">
            Your cart
          </h2>
          <button
            type="button"
            onClick={onCloseDrawer}
            aria-label="Close cart"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Delivery / Pick-up Switcher inside Cart Header */}
      <div className="p-4 border-b border-neutral-100">
        <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-xl">
          <button
            type="button"
            onClick={() => onSelectMode('delivery')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              orderMode === 'delivery'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Delivery ({STORE_INFO.deliveryTime})
          </button>
          <button
            type="button"
            onClick={() => onSelectMode('pickup')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              orderMode === 'pickup'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Pick-up ({STORE_INFO.pickupTime})
          </button>
        </div>
      </div>

      {/* S (Stickiness) + E (Emotion): Bakery Stamp Streak & Expiry Protection */}
      <div
        id="closers-stickiness"
        className={`px-4 py-3.5 bg-[#FAFAFA] border-b border-neutral-100 ${
          highlightedSectionId === 'closers-stickiness' ||
          highlightedSectionId === 'closers-emotion'
            ? 'ring-2 ring-[#D70F64] ring-inset'
            : ''
        }`}
      >
        <div id="closers-emotion" className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-neutral-900 inline-flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-[#D70F64]" />
            Bakery Streak ({stampCount}/5)
          </span>
          <span
            className={`text-[11px] font-semibold ${
              cart.length > 0 ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {cart.length > 0
              ? 'Streak protected (+14 days)'
              : 'Expires Nov 20 (48h left)'}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((step) => {
            const filled = step <= stampCount;
            const nextPreview = step === stampCount + 1 && cart.length > 0;
            return (
              <div
                key={step}
                className={`h-6 rounded-md flex items-center justify-center text-[11px] font-bold ${
                  filled
                    ? 'bg-neutral-900 text-white'
                    : nextPreview
                    ? 'border-2 border-dashed border-[#D70F64] bg-[#FDF2F7] text-[#D70F64]'
                    : 'bg-white border border-neutral-200 text-neutral-400'
                }`}
              >
                {filled ? (
                  <Check className="w-3.5 h-3.5" />
                ) : step === 5 ? (
                  'Free'
                ) : (
                  step
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-neutral-600 mt-2 leading-snug">
          {stampCount >= 5 ? (
            'Free Signature Flosss reward unlocked!'
          ) : cart.length > 0 ? (
            <>
              <span className="font-semibold text-emerald-700">
                Nice save!
              </span>{' '}
              Completing this order protects your {stampCount} stamps and puts
              you {5 - stampCount - 1 === 0 ? 'at' : `${5 - stampCount - 1} away from`}{' '}
              a Free warm Flosss.
            </>
          ) : (
            <>
              Don&apos;t lose your {stampCount}-stamp streak — order before{' '}
              <span className="font-semibold text-amber-800">20 Nov</span> to
              keep it alive toward a Free Flosss.
            </>
          )}
        </p>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
          <div className="w-14 h-14 rounded-2xl bg-[#FDF2F7] text-[#D70F64] flex items-center justify-center mb-3.5">
            <ShoppingBag className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="font-display text-base font-bold text-neutral-900">
            Hungry?
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-[230px] leading-relaxed">
            Add buns from BreadTalk or use the 1-Tap Morning Combo to keep your
            bakery streak going.
          </p>
        </div>
      ) : (
        /* Active Cart State */
        <>
          <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-neutral-100">
            <span className="text-xs font-semibold text-neutral-500">
              Your items from {STORE_INFO.brandShort}
            </span>
            <button
              type="button"
              onClick={onClearCart}
              className="text-xs font-medium text-neutral-500 hover:text-[#D70F64] transition-colors cursor-pointer"
            >
              Clear cart
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 divide-y divide-neutral-100 max-h-[280px]">
            {cart.map((ci) => {
              const unitPrice = getCartLineUnitPrice(ci);
              const lineTotal = unitPrice * ci.quantity;
              const optionLabels = Object.values(ci.selectedOptions)
                .map((o) => o.label)
                .join(' · ');

              return (
                <div key={ci.cartKey} className="py-3 flex items-start gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-200 rounded-lg h-8 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(ci.cartKey, -1)}
                      aria-label={
                        ci.quantity === 1
                          ? `Remove ${ci.item.name}`
                          : `Decrease quantity of ${ci.item.name}`
                      }
                      className="w-7 h-full flex items-center justify-center text-neutral-600 hover:text-[#D70F64] transition-colors cursor-pointer"
                    >
                      {ci.quantity === 1 ? (
                        <Trash2 className="w-3.5 h-3.5" />
                      ) : (
                        <Minus className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-neutral-900 tabular-nums">
                      {ci.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(ci.cartKey, 1)}
                      aria-label={`Increase quantity of ${ci.item.name}`}
                      className="w-7 h-full flex items-center justify-center text-[#D70F64] hover:bg-[#FDF2F7] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Details */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-neutral-900 leading-snug">
                      {ci.item.name}
                    </div>
                    {optionLabels && (
                      <div className="text-xs text-neutral-500 mt-0.5 leading-snug">
                        {optionLabels}
                      </div>
                    )}
                    {ci.specialInstructions && (
                      <div className="text-xs text-neutral-500 italic mt-0.5">
                        Note: {ci.specialInstructions}
                      </div>
                    )}
                  </div>

                  {/* Line Total */}
                  <div className="text-sm font-semibold text-neutral-900 tabular-nums shrink-0">
                    S$ {lineTotal.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Popular Add-ons Upsell */}
          {upsells.length > 0 && (
            <div className="px-4 py-3 bg-[#FAFAFA] border-t border-neutral-100">
              <div className="text-xs font-semibold text-neutral-700 mb-2">
                Popular with your order
              </div>
              <div className="space-y-2">
                {upsells.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="text-neutral-800 truncate">{u.name}</span>
                    <button
                      type="button"
                      onClick={() => onQuickAddMenuItem(u)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-neutral-200 hover:border-[#D70F64] text-[#D70F64] font-semibold shrink-0 cursor-pointer tabular-nums"
                    >
                      <Plus className="w-3 h-3" />
                      <span>S$ {u.price.toFixed(2)}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C: Convenience — Smart Default No-Cutlery Toggle */}
          <label className="px-4 py-2.5 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs cursor-pointer">
            <span className="text-neutral-700 font-medium">
              Cutlery &amp; extra paper napkins (eco default)
            </span>
            <input
              type="checkbox"
              checked={!noCutlery}
              onChange={() => setNoCutlery((v) => !v)}
              className="accent-[#D70F64] w-4 h-4"
            />
          </label>

          {/* Voucher Input / Applied Status + Loss Avoidance threshold nudge */}
          <div className="px-4 py-3 border-t border-neutral-100">
            {appliedVoucher ? (
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FDF2F7] border border-[#D70F64]/20">
                <div className="flex items-center gap-2 min-w-0">
                  <Tag className="w-4 h-4 text-[#D70F64] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#D70F64] truncate">
                      {appliedVoucher.code} · {appliedVoucher.title}
                    </div>
                    {subtotal < appliedVoucher.minSpend && (
                      <div className="text-[11px] text-neutral-700 tabular-nums">
                        Add S$ {(appliedVoucher.minSpend - subtotal).toFixed(2)}{' '}
                        more or miss this saving
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onApplyVoucher(null)}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer shrink-0"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => {
                    setPromoCodeInput(e.target.value);
                    setPromoError('');
                  }}
                  placeholder="Voucher code (e.g. BREAD3OFF)"
                  aria-label="Apply voucher code"
                  className="flex-1 h-9 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-[#D70F64] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 h-9 rounded-lg text-xs font-semibold border border-neutral-200 text-neutral-800 hover:bg-neutral-50 cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && (
              <p className="text-[11px] text-[#D70F64] mt-1">{promoError}</p>
            )}
          </div>

          {/* Totals Breakdown */}
          <div className="p-4 border-t border-neutral-200 bg-white space-y-2">
            <div className="flex justify-between text-xs text-neutral-600">
              <span>Subtotal</span>
              <span className="tabular-nums">S$ {subtotal.toFixed(2)}</span>
            </div>

            {orderMode === 'delivery' && (
              <div className="flex justify-between text-xs text-neutral-600">
                <span>Standard delivery</span>
                <span className="tabular-nums">
                  S$ {rawDeliveryFee.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-xs text-neutral-600">
              <span>Platform fee</span>
              <span className="tabular-nums">S$ {platformFee.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-xs font-medium text-[#D70F64]">
                <span>Voucher discount</span>
                <span className="tabular-nums">-S$ {discount.toFixed(2)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
              <div>
                <span className="font-display text-base font-bold text-neutral-900">
                  Total
                </span>
                <span className="text-[11px] text-neutral-500 ml-1">
                  (incl. GST)
                </span>
              </div>
              <span className="font-display text-lg font-bold text-neutral-900 tabular-nums">
                S$ {total.toFixed(2)}
              </span>
            </div>

            {/* Minimum Order Progress Bar for Delivery */}
            {!meetsMinOrder && (
              <div className="pt-2">
                <div className="flex justify-between text-xs text-neutral-700 mb-1.5 tabular-nums">
                  <span>Min. order S$ {STORE_INFO.minOrder.toFixed(2)}</span>
                  <span className="font-semibold text-[#D70F64]">
                    Add S$ {remainingForMinOrder.toFixed(2)} more
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D70F64] transition-all duration-200"
                    style={{ width: `${minOrderProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={!meetsMinOrder}
              onClick={onCheckout}
              className={`w-full mt-3 py-3 px-4 rounded-xl font-display text-sm font-bold transition-colors ${
                meetsMinOrder
                  ? 'bg-[#D70F64] hover:bg-[#B90D56] text-white cursor-pointer'
                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            >
              Review payment and address
            </button>
          </div>
        </>
      )}
    </div>
  );
};
