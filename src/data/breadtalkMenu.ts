import { MenuCategoryId, MenuItem, OptionGroup, StoreReview, Voucher } from '../types/menu';

export const HERO_BANNER_URL = '/src/assets/images/breadtalk_hero_bakery_1795070586687.jpg';

const IMG_FLOSS = '/src/assets/images/breadtalk_floss_bun_1795070586288.jpg';
const IMG_SAVORY = '/src/assets/images/breadtalk_savory_buns_1795070585780.jpg';
const IMG_CAKE = '/src/assets/images/breadtalk_steam_cake_1795070586028.jpg';
const IMG_TOAST = '/src/assets/images/breadtalk_toast_milk_1795070585809.jpg';

const BUN_OPTION_GROUPS: OptionGroup[] = [
  {
    id: 'pack-size',
    title: 'Pack Size',
    required: true,
    choices: [
      { id: 'single', label: 'Single Piece (1 pc)', priceDelta: 0 },
      { id: 'box-4', label: 'Sharing Pack (4 pcs)', priceDelta: 7.4 },
    ],
  },
  {
    id: 'preparation',
    title: 'Preparation Preference',
    required: true,
    choices: [
      { id: 'warmed', label: 'Lightly Warmed in Oven (Recommended)', priceDelta: 0 },
      { id: 'room-temp', label: 'Fresh at Room Temperature', priceDelta: 0 },
    ],
  },
];

const LOAF_OPTION_GROUPS: OptionGroup[] = [
  {
    id: 'slicing',
    title: 'Slicing Preference',
    required: true,
    choices: [
      { id: 'sliced-8', label: 'Standard Sliced (8 pcs)', priceDelta: 0 },
      { id: 'thick-5', label: 'Thick Toast Cut (5 pcs)', priceDelta: 0 },
      { id: 'unsliced', label: 'Whole Loaf (Unsliced)', priceDelta: 0 },
    ],
  },
];

const BEVERAGE_OPTION_GROUPS: OptionGroup[] = [
  {
    id: 'serving',
    title: 'Serving Temperature',
    required: true,
    choices: [
      { id: 'chilled', label: 'Chilled from Cooler', priceDelta: 0 },
      { id: 'ambient', label: 'Less Cold', priceDelta: 0 },
    ],
  },
];

export const STORE_INFO = {
  name: 'BreadTalk (Marina Bay Link Mall)',
  brandShort: 'BreadTalk',
  cuisines: ['Bakery', 'Cakes', 'Buns & Pastries'],
  priceTier: '$',
  rating: 4.8,
  reviewCountLabel: '500+',
  deliveryTime: '15–30 min',
  pickupTime: '10 min',
  deliveryFee: 1.99,
  platformFee: 0.4,
  minOrder: 10.0,
  address: '8A Marina Boulevard, #B2-18 Marina Bay Link Mall, Singapore 018984',
  openingHours: [
    { day: 'Monday – Friday', hours: '07:30 – 21:30' },
    { day: 'Saturday – Sunday', hours: '08:30 – 21:00' },
    { day: 'Public Holidays', hours: '09:00 – 20:30' },
  ],
  notes:
    'Freshly baked in-store throughout the day at Marina Bay Link Mall. Contains wheat, dairy, and egg allergens unless specified.',
};

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'popular', label: 'Popular' },
  { id: 'buns-pastries', label: 'Buns & Pastries' },
  { id: 'tea-cakes-muffins', label: 'Tea Cakes & Muffins' },
  { id: 'toasts-loaves', label: 'Toasts & Loaves' },
  { id: 'beverages', label: 'Beverages' },
];

export const VOUCHERS: Voucher[] = [
  {
    id: 'v-bt3',
    code: 'BREAD3OFF',
    title: 'S$ 3.00 off',
    subtitle: 'Min. spend S$ 18.00 · All day bakery deal',
    minSpend: 18.0,
    discountAmount: 3.0,
    type: 'amount',
  },
  {
    id: 'v-freedel',
    code: 'MBLMFREE',
    title: 'Free delivery',
    subtitle: 'Min. spend S$ 12.00 · Marina Bay & CBD',
    minSpend: 12.0,
    discountAmount: 1.99,
    type: 'free_delivery',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'flosss',
    name: 'Flosss',
    description:
      "BreadTalk's signature pillowy bun glazed with sweet egg cream and generously topped with fluffy savory golden pork floss.",
    price: 2.7,
    categoryId: 'buns-pastries',
    imageUrl: IMG_FLOSS,
    isPopular: true,
    remainingBatch: 3,
    orderedToday: 64,
    positivePercent: 99,
    tasteTags: ['floss-purist', 'commuter', 'office-sharing'],
    sensoryNote: 'Warm brioche aroma with melt-in-mouth egg cream',
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'fire-flosss',
    name: 'Fire Flosss',
    description:
      'Spicy golden pork floss coated over signature egg cream on a soft, freshly baked milk bun for a bold savory kick.',
    price: 2.7,
    categoryId: 'buns-pastries',
    imageUrl: IMG_FLOSS,
    isPopular: true,
    isSpicy: true,
    remainingBatch: 4,
    orderedToday: 52,
    positivePercent: 98,
    tasteTags: ['floss-purist', 'commuter', 'office-sharing'],
    sensoryNote: 'Savory chili warmth balanced by creamy golden glaze',
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'shio-pan',
    name: 'Shio Pan',
    description:
      'Japanese-inspired salted butter croissant roll with a crisp golden crust, buttery hollow center, and Pink Himalayan rock salt.',
    price: 2.3,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    isPopular: true,
    remainingBatch: 2,
    orderedToday: 71,
    positivePercent: 99,
    tasteTags: ['commuter', 'office-sharing'],
    sensoryNote: 'Crisp salted-butter bottom crust, airy center',
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'cheese-sausage',
    name: 'Cheese Sausage',
    description:
      'Juicy premium chicken sausage nestled inside tender sweet dough and finished with melted cheddar and parmesan crust.',
    price: 2.9,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    isPopular: true,
    orderedToday: 41,
    positivePercent: 96,
    tasteTags: ['commuter', 'office-sharing'],
    sensoryNote: 'Savory blistered cheddar top with juicy snap',
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'sausage-standard',
    name: 'Sausage Standard',
    description:
      'Classic golden-baked chicken sausage roll wrapped in fluffy BreadTalk signature dough with mild tomato glaze.',
    price: 2.7,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    orderedToday: 29,
    positivePercent: 95,
    tasteTags: ['commuter'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'ham-cheese',
    name: 'Ham & Cheese',
    description:
      'Soft savory bun folded with smoky turkey ham and creamy mozzarella-cheddar blend baked until golden.',
    price: 2.8,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    orderedToday: 26,
    positivePercent: 95,
    tasteTags: ['commuter', 'office-sharing'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'double-dog',
    name: 'Double Dog',
    description:
      'Twin chicken sausages baked in soft brioche dough with rich gouda cheese, mayonnaise, and tangy chili drizzle.',
    price: 3.2,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    isSpicy: true,
    orderedToday: 22,
    positivePercent: 94,
    tasteTags: ['commuter'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'get-cheesy',
    name: 'Get Cheesy',
    description:
      'Four-cheese baked specialty bun brimming with warm cream cheese filling and blistered parmesan crust.',
    price: 2.6,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    orderedToday: 33,
    positivePercent: 97,
    tasteTags: ['commuter', 'sweet-tea'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'curry-chicken-bun',
    name: 'Curry Chicken Bun',
    description:
      'Golden crusted bun filled with aromatic Singapore-style spiced curry chicken chunks and diced potato.',
    price: 2.8,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    isSpicy: true,
    orderedToday: 38,
    positivePercent: 97,
    tasteTags: ['commuter', 'office-sharing'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'cranberry-cream-cheese',
    name: 'Cranberry Cream Cheese',
    description:
      'Artisanal soft roll studded with tart dried cranberries and whipped sweet cream cheese center.',
    price: 2.6,
    categoryId: 'buns-pastries',
    imageUrl: IMG_FLOSS,
    orderedToday: 24,
    positivePercent: 96,
    tasteTags: ['sweet-tea'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'red-bean-shio-pan',
    name: 'Red Bean Shio Pan',
    description:
      'Signature salted butter Shio Pan filled with smooth Hokkaido red bean paste and finished with flaky sea salt.',
    price: 3.3,
    categoryId: 'buns-pastries',
    imageUrl: IMG_SAVORY,
    remainingBatch: 5,
    orderedToday: 19,
    positivePercent: 97,
    tasteTags: ['sweet-tea'],
    optionGroups: BUN_OPTION_GROUPS,
  },
  {
    id: 'sugar-donut',
    name: 'Sugar Donut',
    description:
      'Light, airy yeast-raised ring donut dusted in fine snowy caster sugar immediately after frying.',
    price: 2.3,
    categoryId: 'buns-pastries',
    imageUrl: IMG_FLOSS,
    orderedToday: 21,
    positivePercent: 95,
    tasteTags: ['sweet-tea', 'office-sharing'],
    optionGroups: BUN_OPTION_GROUPS,
  },

  // Tea Cakes & Muffins
  {
    id: 'original-cheese-steam-cake',
    name: 'Original Cheese Steam Cake',
    description:
      'Cotton-soft Japanese steamed cheesecake with delicate creamy cheddar notes and melt-in-the-mouth texture.',
    price: 2.8,
    categoryId: 'tea-cakes-muffins',
    imageUrl: IMG_CAKE,
    isPopular: true,
    remainingBatch: 4,
    orderedToday: 45,
    positivePercent: 98,
    tasteTags: ['sweet-tea', 'office-sharing'],
    sensoryNote: 'Featherlight soufflé bounce with subtle savory cheese',
  },
  {
    id: 'honey-marble',
    name: 'Honey Marble',
    description:
      'Fragrant wildflower honey and cocoa swirled sponge cake baked to a moist, springy tea-time crumb.',
    price: 2.3,
    categoryId: 'tea-cakes-muffins',
    imageUrl: IMG_CAKE,
    orderedToday: 18,
    positivePercent: 94,
    tasteTags: ['sweet-tea'],
  },
  {
    id: 'marble-steam-cake',
    name: 'Marble Steam Cake',
    description:
      'Steamed chocolate and vanilla chiffon ribbon cake that stays remarkably light and tender.',
    price: 2.3,
    categoryId: 'tea-cakes-muffins',
    imageUrl: IMG_CAKE,
    orderedToday: 15,
    positivePercent: 93,
    tasteTags: ['sweet-tea'],
  },
  {
    id: 'strawberry-steam-cake',
    name: 'Strawberry Steam Cake',
    description:
      'Velvety steamed sponge infused with sweet strawberry aroma for an afternoon pick-me-up.',
    price: 2.3,
    categoryId: 'tea-cakes-muffins',
    imageUrl: IMG_CAKE,
    orderedToday: 14,
    positivePercent: 94,
    tasteTags: ['sweet-tea'],
  },
  {
    id: 'momoji',
    name: 'Momoji',
    description:
      'Thick golden castella-style butter sponge square rich with farm-fresh egg yolk and caramelized top.',
    price: 3.7,
    categoryId: 'tea-cakes-muffins',
    imageUrl: IMG_CAKE,
    orderedToday: 27,
    positivePercent: 97,
    tasteTags: ['sweet-tea', 'office-sharing'],
  },
  {
    id: 'banana-cake-pc',
    name: 'BreadTalk Banana Cake (1 Pc)',
    description:
      'Classic moist banana tea cake slice made with ripe Cavendish bananas and subtle caramel sweetness.',
    price: 2.4,
    categoryId: 'tea-cakes-muffins',
    imageUrl: IMG_CAKE,
    orderedToday: 20,
    positivePercent: 96,
    tasteTags: ['sweet-tea'],
  },

  // Toasts & Loaves
  {
    id: 'white-toast-8',
    name: 'White Toast (8 Pcs)',
    description:
      'Daily baked snow-white milk bread loaf, ultra-soft and evenly sliced for breakfast toast or sandwiches.',
    price: 3.5,
    categoryId: 'toasts-loaves',
    imageUrl: IMG_TOAST,
    isPopular: true,
    orderedToday: 34,
    positivePercent: 98,
    tasteTags: ['office-sharing'],
    sensoryNote: 'Pillowy snow-white crumb ready for kaya or butter',
    optionGroups: LOAF_OPTION_GROUPS,
  },
  {
    id: 'wholemeal-toast-8',
    name: 'Wholemeal Toast (8 Pcs)',
    description:
      'Wholesome stone-ground wholemeal bread loaf baked soft and nutty for everyday balanced meals.',
    price: 4.0,
    categoryId: 'toasts-loaves',
    imageUrl: IMG_TOAST,
    orderedToday: 23,
    positivePercent: 96,
    tasteTags: ['office-sharing'],
    optionGroups: LOAF_OPTION_GROUPS,
  },
  {
    id: 'milky-way',
    name: 'Milky Way',
    description:
      'Rich Hokkaido milk-enriched pull-apart loaf with silky feathered crumb and natural dairy sweetness.',
    price: 4.2,
    categoryId: 'toasts-loaves',
    imageUrl: IMG_TOAST,
    orderedToday: 28,
    positivePercent: 97,
    tasteTags: ['sweet-tea', 'office-sharing'],
    optionGroups: LOAF_OPTION_GROUPS,
  },
  {
    id: 'kaya-marble-5',
    name: 'Kaya Marble (5 Pcs)',
    description:
      'Thick slices of pillowy pandan-kaya swirled toast loaf celebrating beloved local Singapore flavours.',
    price: 4.6,
    categoryId: 'toasts-loaves',
    imageUrl: IMG_TOAST,
    orderedToday: 19,
    positivePercent: 96,
    tasteTags: ['sweet-tea', 'office-sharing'],
  },
  {
    id: 'marble-chocolate-5',
    name: 'Marble Chocolate (5 Pcs)',
    description:
      'Five thick cuts of tender brioche marbled with dark cocoa dough and rich chocolate swirls.',
    price: 4.6,
    categoryId: 'toasts-loaves',
    imageUrl: IMG_TOAST,
    orderedToday: 16,
    positivePercent: 95,
    tasteTags: ['sweet-tea'],
  },
  {
    id: 'california-toast-8',
    name: 'California Toast (8 Pcs)',
    description:
      'Sweet buttery toast loaf generously studded with sun-dried California raisins in every slice.',
    price: 5.2,
    categoryId: 'toasts-loaves',
    imageUrl: IMG_TOAST,
    orderedToday: 12,
    positivePercent: 94,
    tasteTags: ['office-sharing'],
  },

  // Beverages
  {
    id: 'hokkaido-fresh-milk',
    name: 'Hokkaido Fresh Milk (200ml)',
    description:
      'Creamy imported Hokkaido 3.7% pasteurized fresh milk — pairs naturally with warm Flosss or Shio Pan.',
    price: 3.6,
    categoryId: 'beverages',
    imageUrl: IMG_TOAST,
    orderedToday: 44,
    positivePercent: 99,
    tasteTags: ['commuter', 'floss-purist', 'sweet-tea'],
    optionGroups: BEVERAGE_OPTION_GROUPS,
  },
  {
    id: 'hokkaido-milk-strawberry',
    name: 'Hokkaido Milk Strawberry (200ml)',
    description:
      'Silky chilled Hokkaido dairy blended with fragrant sweet strawberry puree.',
    price: 3.6,
    categoryId: 'beverages',
    imageUrl: IMG_TOAST,
    orderedToday: 22,
    positivePercent: 96,
    tasteTags: ['sweet-tea'],
    optionGroups: BEVERAGE_OPTION_GROUPS,
  },
  {
    id: 'soy-milk-300',
    name: 'Soy Milk (300ml)',
    description:
      'Freshly brewed lightly sweetened soy bean milk bottled daily for a smooth plant-based pairing.',
    price: 4.0,
    categoryId: 'beverages',
    imageUrl: IMG_TOAST,
    orderedToday: 17,
    positivePercent: 95,
    tasteTags: ['commuter'],
    optionGroups: BEVERAGE_OPTION_GROUPS,
  },
  {
    id: 'milk-tea-300',
    name: 'Milk Tea (300ml)',
    description:
      'Chilled Singapore-style brewed black tea balanced with creamy condensed and evaporated milk.',
    price: 4.0,
    categoryId: 'beverages',
    imageUrl: IMG_TOAST,
    orderedToday: 31,
    positivePercent: 97,
    tasteTags: ['commuter', 'floss-purist'],
    optionGroups: BEVERAGE_OPTION_GROUPS,
  },
];

export const STORE_REVIEWS: StoreReview[] = [
  {
    id: 'rev-1',
    author: 'Wei Ling T.',
    rating: 5,
    date: '2 days ago',
    comment:
      'Flosss and Shio Pan arrived still slightly warm at Marina Bay Financial Centre! Packaging was super neat and nothing got squashed.',
    orderedItems: ['Flosss', 'Shio Pan', 'Hokkaido Fresh Milk (200ml)'],
  },
  {
    id: 'rev-2',
    author: 'Marcus K.',
    rating: 5,
    date: '5 days ago',
    comment:
      'My go-to morning breakfast order before 9am standups. Fire Flosss + Cheese Sausage never misses.',
    orderedItems: ['Fire Flosss', 'Cheese Sausage'],
  },
  {
    id: 'rev-3',
    author: 'Priya N.',
    rating: 4,
    date: '1 week ago',
    comment:
      'Original Cheese Steam Cake is so light and fluffy. Fast pick-up ready within 10 mins at #B2-18.',
    orderedItems: ['Original Cheese Steam Cake', 'White Toast (8 Pcs)'],
  },
];

export const SAVED_ADDRESSES = [
  '8A Marina Boulevard, Marina Bay Financial Centre Tower 1, Singapore 018984',
  '12 Marina Boulevard, MBFC Tower 3, Singapore 018982',
  '1 Raffles Quay, North Tower, Singapore 048583',
  '2 Bayfront Avenue, The Shoppes at Marina Bay Sands, Singapore 018972',
];
