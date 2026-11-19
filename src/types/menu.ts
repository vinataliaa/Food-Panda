export type OrderMode = 'delivery' | 'pickup';

export type MenuCategoryId =
  | 'popular'
  | 'buns-pastries'
  | 'tea-cakes-muffins'
  | 'toasts-loaves'
  | 'beverages';

export type TasteIdentityId =
  | 'all'
  | 'commuter'
  | 'floss-purist'
  | 'sweet-tea'
  | 'office-sharing';

export interface OptionChoice {
  id: string;
  label: string;
  priceDelta: number;
}

export interface OptionGroup {
  id: string;
  title: string;
  required: boolean;
  choices: OptionChoice[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: MenuCategoryId;
  imageUrl: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  remainingBatch?: number;
  orderedToday?: number;
  positivePercent?: number;
  tasteTags?: TasteIdentityId[];
  sensoryNote?: string;
  optionGroups?: OptionGroup[];
}

export interface CartItem {
  cartKey: string;
  item: MenuItem;
  quantity: number;
  selectedOptions: Record<string, OptionChoice>;
  specialInstructions: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  minSpend: number;
  discountAmount: number;
  type: 'amount' | 'free_delivery';
}

export interface StoreReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  orderedItems: string[];
}

export interface ClosersPrinciple {
  pointNumber: number;
  letter: string;
  name: string;
  accentHex: string;
  bgHex: string;
  generalPrinciple: string;
  slideExample: string;
  originalGap: string;
  improvedChange: string;
  uiLocationLabel: string;
  liveHighlightId: string;
}
