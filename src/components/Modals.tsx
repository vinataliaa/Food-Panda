import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  Star,
  X,
} from 'lucide-react';
import {
  SAVED_ADDRESSES,
  STORE_INFO,
  STORE_REVIEWS,
} from '../data/breadtalkMenu';
import {
  CartItem,
  MenuItem,
  OptionChoice,
  OrderMode,
  Voucher,
} from '../types/menu';
import { getCartLineUnitPrice } from './CartSidebar';

/* -------------------------------------------------------------------------- */
/* 1. Item Customization Modal                                                */
/* -------------------------------------------------------------------------- */
interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: Record<string, OptionChoice>,
    instructions: string
  ) => void;
}

export const ItemDetailModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, OptionChoice>
  >({});
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (!item) return;
    setQuantity(1);
    setInstructions('');
    const defaults: Record<string, OptionChoice> = {};
    item.optionGroups?.forEach((group) => {
      if (group.choices[0]) {
        defaults[group.id] = group.choices[0];
      }
    });
    setSelectedOptions(defaults);
  }, [item]);

  if (!item) return null;

  const optionsExtra = Object.values(selectedOptions).reduce(
    (sum, opt) => sum + opt.priceDelta,
    0
  );
  const unitPrice = item.price + optionsExtra;
  const total = unitPrice * quantity;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Product Image */}
        <div className="relative h-52 sm:h-60 bg-neutral-100 shrink-0">
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close item details"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-neutral-800 flex items-center justify-center shadow-sm hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2
                id="item-modal-title"
                className="font-display text-xl font-bold text-neutral-900"
              >
                {item.name}
              </h2>
              <span className="font-display text-lg font-bold text-neutral-900 tabular-nums shrink-0">
                S$ {item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>

          {item.optionGroups?.map((group) => (
            <div key={group.id} className="pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-display text-sm font-bold text-neutral-900">
                  {group.title}
                </h3>
                <span className="text-xs font-medium text-neutral-500">
                  {group.required ? 'Required' : 'Optional'}
                </span>
              </div>
              <div className="space-y-2">
                {group.choices.map((choice) => {
                  const checked = selectedOptions[group.id]?.id === choice.id;
                  return (
                    <label
                      key={choice.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        checked
                          ? 'border-[#D70F64] bg-[#FDF2F7]'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={group.id}
                          checked={checked}
                          onChange={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [group.id]: choice,
                            }))
                          }
                          className="accent-[#D70F64] w-4 h-4"
                        />
                        <span className="text-sm font-medium text-neutral-900">
                          {choice.label}
                        </span>
                      </div>
                      {choice.priceDelta > 0 && (
                        <span className="text-xs font-semibold text-neutral-700 tabular-nums">
                          + S$ {choice.priceDelta.toFixed(2)}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special Instructions */}
          <div className="pt-4 border-t border-neutral-100">
            <label
              htmlFor="special-instructions"
              className="block font-display text-sm font-bold text-neutral-900 mb-2"
            >
              Special instructions
            </label>
            <textarea
              id="special-instructions"
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Separate bag for warm buns, no cutlery needed"
              className="w-full p-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#D70F64] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="p-4 border-t border-neutral-200 bg-white flex items-center gap-4 shrink-0">
          <div className="flex items-center border border-neutral-300 rounded-xl h-11">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-10 h-full flex items-center justify-center text-neutral-700 hover:text-[#D70F64] cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-neutral-900 tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-10 h-full flex items-center justify-center text-[#D70F64] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart(item, quantity, selectedOptions, instructions);
              onClose();
            }}
            className="flex-1 h-11 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white font-display text-sm font-bold flex items-center justify-between px-4 transition-colors cursor-pointer"
          >
            <span>Add to cart</span>
            <span className="tabular-nums">S$ {total.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Delivery Address Modal                                                  */
/* -------------------------------------------------------------------------- */
interface AddressModalProps {
  isOpen: boolean;
  currentAddress: string;
  onSelectAddress: (addr: string) => void;
  onClose: () => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  currentAddress,
  onSelectAddress,
  onClose,
}) => {
  const [customAddr, setCustomAddr] = useState('');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="address-modal-title"
            className="font-display text-lg font-bold text-neutral-900"
          >
            Delivery address
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close address modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (customAddr.trim()) {
              onSelectAddress(customAddr.trim());
              setCustomAddr('');
              onClose();
            }
          }}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            value={customAddr}
            onChange={(e) => setCustomAddr(e.target.value)}
            placeholder="Enter Singapore street or postal code"
            className="flex-1 h-10 px-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:border-[#D70F64] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 h-10 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white text-sm font-semibold cursor-pointer"
          >
            Save
          </button>
        </form>

        <div className="text-xs font-semibold text-neutral-500 mb-2">
          Nearby Marina Bay & CBD locations
        </div>
        <div className="space-y-2">
          {SAVED_ADDRESSES.map((addr) => {
            const active = addr === currentAddress;
            return (
              <button
                key={addr}
                type="button"
                onClick={() => {
                  onSelectAddress(addr);
                  onClose();
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                  active
                    ? 'border-[#D70F64] bg-[#FDF2F7]'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <MapPin
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    active ? 'text-[#D70F64]' : 'text-neutral-400'
                  }`}
                />
                <span className="text-sm text-neutral-800">{addr}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Reviews Modal                                                           */
/* -------------------------------------------------------------------------- */
export const ReviewsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviews-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="reviews-modal-title"
            className="font-display text-lg font-bold text-neutral-900"
          >
            Reviews for {STORE_INFO.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reviews"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAFAFA] border border-neutral-200 mb-5">
          <div>
            <div className="font-display text-3xl font-bold text-neutral-900 tabular-nums">
              {STORE_INFO.rating.toFixed(1)}
            </div>
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 text-amber-500 fill-amber-500"
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-neutral-600">
            <div className="font-semibold text-neutral-900">
              All ratings ({STORE_INFO.reviewCountLabel})
            </div>
            <div>Verified Marina Bay Link Mall delivery & pick-up orders</div>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-neutral-100">
          {STORE_REVIEWS.map((rev) => (
            <div key={rev.id} className="pt-4 first:pt-0">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-900">
                  {rev.author}
                </span>
                <span className="text-xs text-neutral-500">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: rev.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                {rev.comment}
              </p>
              <div className="text-xs text-neutral-500 mt-2">
                Ordered: {rev.orderedItems.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Store Info Modal                                                        */
/* -------------------------------------------------------------------------- */
export const StoreInfoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="info-modal-title"
            className="font-display text-lg font-bold text-neutral-900"
          >
            {STORE_INFO.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close store info"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#D70F64] mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-neutral-900">Address</div>
              <div className="text-neutral-600 mt-0.5">
                {STORE_INFO.address}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-3 border-t border-neutral-100">
            <Clock className="w-4 h-4 text-[#D70F64] mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-neutral-900 mb-1.5">
                Opening hours
              </div>
              <div className="space-y-1 text-neutral-600">
                {STORE_INFO.openingHours.map((oh) => (
                  <div key={oh.day} className="flex justify-between gap-4">
                    <span>{oh.day}</span>
                    <span className="tabular-nums font-medium text-neutral-900">
                      {oh.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-500 leading-relaxed">
            {STORE_INFO.notes}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Login Modal                                                             */
/* -------------------------------------------------------------------------- */
export const LoginModal: React.FC<{
  isOpen: boolean;
  loggedInUser: string | null;
  onLogin: (name: string) => void;
  onLogout: () => void;
  onClose: () => void;
}> = ({ isOpen, loggedInUser, onLogin, onLogout, onClose }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="login-modal-title"
            className="font-display text-lg font-bold text-neutral-900"
          >
            {loggedInUser ? 'Your account' : 'Welcome!'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loggedInUser ? (
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              Signed in as{' '}
              <span className="font-semibold text-neutral-900">
                {loggedInUser}
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 cursor-pointer"
            >
              Log out
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const label = email.trim()
                ? email.trim().split('@')[0]
                : 'Guest';
              onLogin(label);
              setEmail('');
              onClose();
            }}
            className="space-y-4"
          >
            <p className="text-sm text-neutral-600">
              Sign in to save favourite items and speed up checkout.
            </p>
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-neutral-700 mb-1"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-sm focus:border-[#D70F64] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white font-display text-sm font-bold cursor-pointer"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Checkout & Order Confirmation Modal                                     */
/* -------------------------------------------------------------------------- */
interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  orderMode: OrderMode;
  deliveryAddress: string;
  appliedVoucher: Voucher | null;
  onOrderConfirmed: () => void;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cart,
  orderMode,
  deliveryAddress,
  appliedVoucher,
  onOrderConfirmed,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState('Vinny Tan');
  const [phone, setPhone] = useState('+65 9123 4567');
  const [paymentMethod, setPaymentMethod] = useState<'paynow' | 'card' | 'cod'>(
    'paynow'
  );
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, ci) => sum + getCartLineUnitPrice(ci) * ci.quantity,
    0
  );
  const deliveryFee = orderMode === 'delivery' ? STORE_INFO.deliveryFee : 0;
  const platformFee = STORE_INFO.platformFee;
  let discount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minSpend) {
    discount =
      appliedVoucher.type === 'free_delivery'
        ? deliveryFee
        : Math.min(appliedVoucher.discountAmount, subtotal);
  }
  const total = Math.max(0, subtotal + deliveryFee + platformFee - discount);

  const handleClose = () => {
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {confirmedOrderId ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2
                id="checkout-modal-title"
                className="font-display text-xl font-bold text-neutral-900"
              >
                Order {confirmedOrderId} Confirmed
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                BreadTalk (Marina Bay Link Mall) is packing your freshly baked
                items.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-neutral-200 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-600">Mode</span>
                <span className="font-semibold text-neutral-900 capitalize">
                  {orderMode} ({orderMode === 'delivery' ? STORE_INFO.deliveryTime : STORE_INFO.pickupTime})
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600 shrink-0">
                  {orderMode === 'delivery' ? 'Deliver to' : 'Pick-up at'}
                </span>
                <span className="font-medium text-neutral-900 text-right">
                  {orderMode === 'delivery'
                    ? deliveryAddress
                    : STORE_INFO.address}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200">
                <span className="font-bold text-neutral-900">Amount paid</span>
                <span className="font-bold text-[#D70F64] tabular-nums">
                  S$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white font-display text-sm font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setConfirmedOrderId('#FP-4821');
              onOrderConfirmed();
            }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2
                id="checkout-modal-title"
                className="font-display text-xl font-bold text-neutral-900"
              >
                Review and place order
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close checkout"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-neutral-200 text-sm">
              <div className="font-semibold text-neutral-900">
                {orderMode === 'delivery'
                  ? 'Delivery address'
                  : 'Self pick-up outlet'}
              </div>
              <div className="text-neutral-600 mt-0.5">
                {orderMode === 'delivery'
                  ? deliveryAddress
                  : STORE_INFO.address}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-neutral-700 mb-1"
                >
                  Full name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-sm focus:border-[#D70F64] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-neutral-700 mb-1"
                >
                  Mobile number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-sm focus:border-[#D70F64] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-neutral-700 mb-2">
                Payment method
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'paynow', label: 'PayNow' },
                  { id: 'card', label: 'Card' },
                  { id: 'cod', label: 'Cash on Delivery' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() =>
                      setPaymentMethod(pm.id as 'paynow' | 'card' | 'cod')
                    }
                    className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                      paymentMethod === pm.id
                        ? 'border-[#D70F64] bg-[#FDF2F7] text-[#D70F64]'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700">
                Total payable
              </span>
              <span className="font-display text-lg font-bold text-neutral-900 tabular-nums">
                S$ {total.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white font-display text-sm font-bold transition-colors cursor-pointer"
            >
              Place order · S$ {total.toFixed(2)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
