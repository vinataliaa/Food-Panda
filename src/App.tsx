import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Columns2, Flame, ShoppingBag, Store } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  SAVED_ADDRESSES,
  STORE_INFO,
} from './data/breadtalkMenu';
import { TASTE_IDENTITIES, VIBE_PROFILES } from './data/closersData';
import {
  CartItem,
  MenuCategoryId,
  MenuItem,
  OptionChoice,
  OrderMode,
  TasteIdentityId,
  Voucher,
} from './types/menu';
import { Navbar } from './components/Navbar';
import { RestaurantHero } from './components/RestaurantHero';
import { CategoryBar } from './components/CategoryBar';
import { MenuItemCard } from './components/MenuItemCard';
import { CartSidebar, getCartLineUnitPrice } from './components/CartSidebar';
import { ClosersComparisonView } from './components/ClosersComparisonView';
import {
  AddressModal,
  CheckoutModal,
  ItemDetailModal,
  LoginModal,
  ReviewsModal,
  StoreInfoModal,
} from './components/Modals';

function buildCartKey(
  itemId: string,
  selectedOptions: Record<string, OptionChoice>,
  specialInstructions: string
): string {
  const optionKey = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([gid, choice]) => `${gid}:${choice.id}`)
    .join('|');
  return `${itemId}__${optionKey}__${specialInstructions.trim()}`;
}

export default function App() {
  const [activeView, setActiveView] = useState<'storefront' | 'comparison'>(
    'storefront'
  );
  const [highlightedSectionId, setHighlightedSectionId] = useState<
    string | null
  >(null);

  const [orderMode, setOrderMode] = useState<OrderMode>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState(SAVED_ADDRESSES[0]);
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryId>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaste, setSelectedTaste] = useState<TasteIdentityId>('all');
  const [isFavorite, setIsFavorite] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [stampCount, setStampCount] = useState<number>(3);

  const [cart, setCart] = useState<CartItem[]>([]);

  // Modal & Drawer states
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const totalCartCount = useMemo(
    () => cart.reduce((sum, ci) => sum + ci.quantity, 0),
    [cart]
  );
  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (sum, ci) => sum + getCartLineUnitPrice(ci) * ci.quantity,
        0
      ),
    [cart]
  );

  const itemQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach((ci) => {
      map[ci.item.id] = (map[ci.item.id] || 0) + ci.quantity;
    });
    return map;
  }, [cart]);

  // Grouped menu sections filtered & prioritized by search query AND Taste Identity
  const categorizedSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matches = (m: MenuItem) => {
      const searchMatch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      const tasteMatch =
        selectedTaste === 'all' ||
        (m.tasteTags && m.tasteTags.includes(selectedTaste));
      return searchMatch && tasteMatch;
    };

    const order = VIBE_PROFILES[selectedTaste].sectionOrder;
    const orderedCategories = [...MENU_CATEGORIES].sort(
      (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
    );

    return orderedCategories
      .map((cat) => {
        const items =
          cat.id === 'popular'
            ? MENU_ITEMS.filter((m) => m.isPopular && matches(m))
            : MENU_ITEMS.filter((m) => m.categoryId === cat.id && matches(m));
        return {
          ...cat,
          items,
        };
      })
      .filter((sec) => sec.items.length > 0);
  }, [searchQuery, selectedTaste]);

  // Scroll spy for category anchor tabs
  useEffect(() => {
    if (activeView !== 'storefront') return;
    const handleScroll = () => {
      const offset = 160;
      let current: MenuCategoryId = 'popular';
      for (const cat of MENU_CATEGORIES) {
        const el = sectionRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = cat.id;
          }
        }
      }
      setActiveCategory(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const handleSelectCategory = (id: MenuCategoryId) => {
    setActiveCategory(id);
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 136;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (id: string) => {
    if (activeView !== 'storefront') {
      setActiveView('storefront');
    }
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleJumpToLiveFeature = (highlightId: string) => {
    setActiveView('storefront');
    setHighlightedSectionId(highlightId);
    window.setTimeout(() => {
      const el = document.getElementById(highlightId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);
    window.setTimeout(() => {
      setHighlightedSectionId(null);
    }, 3200);
  };

  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedOptions: Record<string, OptionChoice>,
    instructions: string
  ) => {
    const cartKey = buildCartKey(item.id, selectedOptions, instructions);
    setCart((prev) => {
      const existing = prev.find((ci) => ci.cartKey === cartKey);
      if (existing) {
        return prev.map((ci) =>
          ci.cartKey === cartKey
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartKey,
          item,
          quantity,
          selectedOptions,
          specialInstructions: instructions.trim(),
        },
      ];
    });
  };

  const handleQuickAdd = (item: MenuItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const defaults: Record<string, OptionChoice> = {};
    item.optionGroups?.forEach((g) => {
      if (g.choices[0]) defaults[g.id] = g.choices[0];
    });
    handleAddToCart(item, 1, defaults, '');
  };

  const handleAddMorningCombo = () => {
    const comboIds = VIBE_PROFILES[selectedTaste].comboItemIds;
    comboIds.forEach((id) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (item) handleQuickAdd(item);
    });
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) =>
          ci.cartKey === cartKey
            ? { ...ci, quantity: ci.quantity + delta }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const handleToggleVoucher = (voucher: Voucher) => {
    setAppliedVoucher((prev) => (prev?.id === voucher.id ? null : voucher));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <Navbar
        deliveryAddress={deliveryAddress}
        orderMode={orderMode}
        onSelectMode={(mode) => {
          setOrderMode(mode);
          setActiveView('storefront');
        }}
        onOpenAddressModal={() => setIsAddressOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenMobileCart={() => setIsMobileCartOpen(true)}
        loggedInUser={loggedInUser}
        cartCount={totalCartCount}
      />

      {/* Workspace View Switcher Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveView('storefront')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'storefront'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Store className="w-4 h-4 text-[#D70F64]" aria-hidden="true" />
              <span>Improved Storefront (CLOSERS)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('comparison')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'comparison'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Columns2
                className="w-4 h-4 text-[#D70F64]"
                aria-hidden="true"
              />
              <span>Side-by-Side Comparison (Original vs. Improved)</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500 hidden md:block">
            {activeView === 'storefront'
              ? 'Enhanced with all 7 CLOSERS conversion triggers · Click Side-by-Side Comparison to inspect changes'
              : 'Interactive 7-point audit comparing foodpanda.sg/restaurant/y1qz against the CLOSERS upgrade'}
          </div>
        </div>
      </div>

      {activeView === 'comparison' ? (
        <main className="flex-1">
          <ClosersComparisonView
            onJumpToLiveFeature={handleJumpToLiveFeature}
          />
        </main>
      ) : (
        <>
          <RestaurantHero
            orderMode={orderMode}
            onSelectMode={setOrderMode}
            deliveryAddress={deliveryAddress}
            onOpenAddressModal={() => setIsAddressOpen(true)}
            onOpenReviewsModal={() => setIsReviewsOpen(true)}
            onOpenStoreInfoModal={() => setIsStoreInfoOpen(true)}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite((f) => !f)}
            appliedVoucher={appliedVoucher}
            onToggleVoucher={handleToggleVoucher}
            selectedTaste={selectedTaste}
            onSelectTaste={setSelectedTaste}
            onAddMorningCombo={handleAddMorningCombo}
            highlightedSectionId={highlightedSectionId}
          />

          <CategoryBar
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Main Two-Column Master-Detail Layout */}
          <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-12">
            <div className="flex items-start gap-8">
              {/* Left/Center Menu Sections */}
              <div className="flex-1 min-w-0 space-y-10">
                {selectedTaste !== 'all' && (
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-neutral-200">
                    <div className="text-sm">
                      <span className="font-bold text-neutral-900">
                        Curated for{' '}
                        {
                          TASTE_IDENTITIES.find((t) => t.id === selectedTaste)
                            ?.label
                        }
                      </span>
                      <span className="text-neutral-300 mx-2">·</span>
                      <span className="text-neutral-600">
                        {
                          TASTE_IDENTITIES.find((t) => t.id === selectedTaste)
                            ?.tagline
                        }
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTaste('all')}
                      className="text-xs font-semibold text-[#D70F64] hover:underline cursor-pointer"
                    >
                      Show all bakes
                    </button>
                  </div>
                )}

                {categorizedSections.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-10 text-center">
                    <h2 className="font-display text-lg font-bold text-neutral-900">
                      No matching items found
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Try clearing your search or switching back to &ldquo;All
                      Bakes&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTaste('all');
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#D70F64] text-white text-sm font-semibold cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  categorizedSections.map((section) => (
                    <section
                      key={section.id}
                      id={`cat-${section.id}`}
                      ref={(el) => {
                        sectionRefs.current[section.id] = el;
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        {section.id === 'popular' && (
                          <Flame
                            className="w-5 h-5 text-[#D70F64]"
                            aria-hidden="true"
                          />
                        )}
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">
                          {section.label}
                        </h2>
                        <span className="text-sm text-neutral-500 tabular-nums">
                          ({section.items.length})
                        </span>
                      </div>

                      {section.id === 'popular' && (
                        <p className="text-sm text-neutral-500 -mt-2 mb-4">
                          Most ordered right now at Marina Bay Link Mall
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item) => (
                          <MenuItemCard
                            key={`${section.id}-${item.id}`}
                            item={item}
                            cartQuantity={itemQuantityMap[item.id] || 0}
                            onOpenDetail={setSelectedItem}
                            onQuickAdd={handleQuickAdd}
                          />
                        ))}
                      </div>
                    </section>
                  ))
                )}
              </div>

              {/* Right Persistent Sticky Cart Sidebar (Desktop) */}
              <aside
                aria-label="Order cart"
                className="hidden lg:block w-[360px] shrink-0 sticky top-36"
              >
                <CartSidebar
                  cart={cart}
                  orderMode={orderMode}
                  onSelectMode={setOrderMode}
                  onUpdateQuantity={handleUpdateQuantity}
                  onClearCart={() => setCart([])}
                  onQuickAddMenuItem={(item) => handleQuickAdd(item)}
                  appliedVoucher={appliedVoucher}
                  onApplyVoucher={setAppliedVoucher}
                  onCheckout={() => setIsCheckoutOpen(true)}
                  stampCount={stampCount}
                  highlightedSectionId={highlightedSectionId}
                />
              </aside>
            </div>
          </main>
        </>
      )}

      {/* Clean Minimal Footer */}
      <footer className="bg-white border-t border-neutral-200 py-6 px-4 sm:px-6 text-xs text-neutral-500">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-neutral-800">
              {STORE_INFO.name}
            </span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{STORE_INFO.address}</span>
          </div>
          <div>Prices include GST where applicable.</div>
        </div>
      </footer>

      {/* Mobile Compact Bottom Cart Bar (<= 64px height, <15% viewport) */}
      {activeView === 'storefront' && totalCartCount > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => setIsMobileCartOpen(true)}
            className="w-full h-11 px-4 rounded-xl bg-[#D70F64] hover:bg-[#B90D56] text-white flex items-center justify-between font-display text-sm font-bold cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 tabular-nums">
              <ShoppingBag className="w-4 h-4" />
              <span>
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'}
              </span>
            </span>
            <span>View your cart</span>
            <span className="tabular-nums">S$ {cartSubtotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Mobile Cart Slide-over Drawer */}
      {isMobileCartOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile cart"
          onClick={() => setIsMobileCartOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <CartSidebar
              cart={cart}
              orderMode={orderMode}
              onSelectMode={setOrderMode}
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={() => setCart([])}
              onQuickAddMenuItem={(item) => handleQuickAdd(item)}
              appliedVoucher={appliedVoucher}
              onApplyVoucher={setAppliedVoucher}
              onCheckout={() => {
                setIsMobileCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              stampCount={stampCount}
              highlightedSectionId={highlightedSectionId}
              isDrawer
              onCloseDrawer={() => setIsMobileCartOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      <AddressModal
        isOpen={isAddressOpen}
        currentAddress={deliveryAddress}
        onSelectAddress={setDeliveryAddress}
        onClose={() => setIsAddressOpen(false)}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <StoreInfoModal
        isOpen={isStoreInfoOpen}
        onClose={() => setIsStoreInfoOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        loggedInUser={loggedInUser}
        onLogin={setLoggedInUser}
        onLogout={() => setLoggedInUser(null)}
        onClose={() => setIsLoginOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        cart={cart}
        orderMode={orderMode}
        deliveryAddress={deliveryAddress}
        appliedVoucher={appliedVoucher}
        onOrderConfirmed={() => {
          setCart([]);
          setAppliedVoucher(null);
          setStampCount((s) => (s >= 5 ? 1 : s + 1));
        }}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
