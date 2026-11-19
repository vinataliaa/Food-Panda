import { ClosersPrinciple, MenuCategoryId, TasteIdentityId } from '../types/menu';

export const TASTE_IDENTITIES: {
  id: TasteIdentityId;
  label: string;
  tagline: string;
}[] = [
  {
    id: 'all',
    label: 'All Bakes',
    tagline: 'Full Marina Bay Link Mall daily menu',
  },
  {
    id: 'commuter',
    label: 'CBD Morning Commuter',
    tagline: 'Grab-and-go savory rolls & iced milk for desk mornings',
  },
  {
    id: 'floss-purist',
    label: 'Floss Purist',
    tagline: 'Signature egg-cream & golden pork floss classics',
  },
  {
    id: 'sweet-tea',
    label: 'Tea-Time Sweet',
    tagline: 'Cotton-soft Japanese steam cakes & honey sponges',
  },
  {
    id: 'office-sharing',
    label: 'Office Pantry Sharing',
    tagline: '4-piece bun boxes & sliced loaves for the team',
  },
];

export const VIBE_PROFILES: Record<
  TasteIdentityId,
  {
    comboTitle: string;
    comboSummary: string;
    comboItemIds: string[];
    comboPrice: number;
    sectionOrder: MenuCategoryId[];
    previewItemIds: [string, string];
  }
> = {
  all: {
    comboTitle: '1-Tap CBD Morning Combo',
    comboSummary: 'Flosss + Fire Flosss + Shio Pan + Hokkaido Milk',
    comboItemIds: ['flosss', 'fire-flosss', 'shio-pan', 'hokkaido-fresh-milk'],
    comboPrice: 11.3,
    sectionOrder: [
      'popular',
      'buns-pastries',
      'tea-cakes-muffins',
      'toasts-loaves',
      'beverages',
    ],
    previewItemIds: ['flosss', 'shio-pan'],
  },
  commuter: {
    comboTitle: '1-Tap CBD Morning Combo',
    comboSummary: 'Shio Pan + Cheese Sausage + Flosss + Milk Tea',
    comboItemIds: ['shio-pan', 'cheese-sausage', 'flosss', 'milk-tea-300'],
    comboPrice: 11.9,
    sectionOrder: [
      'popular',
      'buns-pastries',
      'beverages',
      'toasts-loaves',
      'tea-cakes-muffins',
    ],
    previewItemIds: ['shio-pan', 'cheese-sausage'],
  },
  'floss-purist': {
    comboTitle: '1-Tap Floss Purist Pack',
    comboSummary: '2x Flosss + 2x Fire Flosss + Hokkaido Milk',
    comboItemIds: [
      'flosss',
      'flosss',
      'fire-flosss',
      'fire-flosss',
      'hokkaido-fresh-milk',
    ],
    comboPrice: 14.4,
    sectionOrder: [
      'popular',
      'buns-pastries',
      'beverages',
      'tea-cakes-muffins',
      'toasts-loaves',
    ],
    previewItemIds: ['flosss', 'fire-flosss'],
  },
  'sweet-tea': {
    comboTitle: '1-Tap Tea-Time Sweet Set',
    comboSummary: 'Cheese Steam Cake + Momoji + Honey Marble + Strawberry Milk',
    comboItemIds: [
      'original-cheese-steam-cake',
      'momoji',
      'honey-marble',
      'hokkaido-milk-strawberry',
    ],
    comboPrice: 12.4,
    sectionOrder: [
      'tea-cakes-muffins',
      'popular',
      'buns-pastries',
      'toasts-loaves',
      'beverages',
    ],
    previewItemIds: ['original-cheese-steam-cake', 'momoji'],
  },
  'office-sharing': {
    comboTitle: '1-Tap Office Pantry Bundle',
    comboSummary: 'White Toast (8 Pcs) + Kaya Marble + Flosss + Fire Flosss',
    comboItemIds: ['white-toast-8', 'kaya-marble-5', 'flosss', 'fire-flosss'],
    comboPrice: 13.5,
    sectionOrder: [
      'toasts-loaves',
      'popular',
      'buns-pastries',
      'tea-cakes-muffins',
      'beverages',
    ],
    previewItemIds: ['white-toast-8', 'kaya-marble-5'],
  },
};

export const CLOSERS_PRINCIPLES: ClosersPrinciple[] = [
  {
    pointNumber: 1,
    letter: 'C',
    name: 'Convenience',
    accentHex: '#1F7A9B',
    bgHex: '#EBF5F8',
    generalPrinciple:
      'Make continuing or buying the effortless default. Remove decision friction, extra clicks, and manual form typing so the natural path leads straight to checkout.',
    slideExample:
      'Watching on is the default, and the natural moment to stop disappears.',
    originalGap:
      'On foodpanda.sg, users must click into each bun modal, pick options, and manually build a S$10.00 minimum order item by item—plus there is no 1-click commuter preset.',
    improvedChange:
      'Added a 1-tap "CBD Morning Combo (S$ 10.60)" quick-add bar that instantly clears the S$10 min order, smart default preparation selections, and 1-tap cart add-ons.',
    uiLocationLabel: 'One-Tap Morning Combo & Smart Defaults',
    liveHighlightId: 'closers-convenience',
  },
  {
    pointNumber: 2,
    letter: 'L',
    name: 'Loss avoidance',
    accentHex: '#B83344',
    bgHex: '#FBECEE',
    generalPrinciple:
      'People feel the pain of losing an advantage twice as strongly as gaining a new one. Highlighting expiring deals, limited oven batches, or rewards about to slip away motivates immediate action.',
    slideExample:
      'The account is something to lose, which gives a reason to earn miles now and then.',
    originalGap:
      'Static menu cards and silent voucher strips show no stock urgency or batch timing, so hungry commuters postpone ordering until later.',
    improvedChange:
      'Live "Warm Oven Batch #4" countdown timer, low-batch stock indicators ("3 left in current warm batch") on popular buns, and a dynamic cart nudge showing exact savings you lose if you skip the threshold.',
    uiLocationLabel: 'Oven Batch Scarcity & Expiring Deal Window',
    liveHighlightId: 'closers-loss-avoidance',
  },
  {
    pointNumber: 3,
    letter: 'O',
    name: 'Own identity',
    accentHex: '#6A479C',
    bgHex: '#F2EEF8',
    generalPrinciple:
      'Connect the product to who the user sees themselves as—their tastes, daily routine, or group role—and make that identity easy to express or share.',
    slideExample:
      'Each story says who the listener is, and sharing it says so to friends.',
    originalGap:
      'The original BreadTalk page treats every visitor identically with a flat alphabetical/category wall, giving no reflection of personal taste or office role.',
    improvedChange:
      'Introduced a "Pick Your BreadTalk Vibe" identity filter (CBD Morning Commuter, Floss Purist, Tea-Time Sweet, Office Sharing) plus a 1-click "Share Pantry List" action for team orders.',
    uiLocationLabel: 'Personal Taste Identity & Shareable Pantry Pick',
    liveHighlightId: 'closers-own-identity',
  },
  {
    pointNumber: 4,
    letter: 'S',
    name: 'Status',
    accentHex: '#8E6D00',
    bgHex: '#FAF5E4',
    generalPrinciple:
      'Recognize loyal or early buyers as part of an inner circle with priority access, member-only perks, or elevated treatment unavailable to casual guests.',
    slideExample:
      'Being let in early marks a user as part of an inner circle.',
    originalGap:
      'All customers see the exact same generic delivery terms without recognizing Marina Bay regulars or offering priority oven-fresh packaging.',
    improvedChange:
      'Added "Marina Bay Insider · Priority Warm-Bag Dispatch" member tier notice with unlocked S$ 0 priority thermal packaging and early access to fresh afternoon batches.',
    uiLocationLabel: 'Insider Priority Tier & Thermal Packaging Perk',
    liveHighlightId: 'closers-status',
  },
  {
    pointNumber: 5,
    letter: 'E',
    name: 'Emotion',
    accentHex: '#D07419',
    bgHex: '#FDF3E8',
    generalPrinciple:
      'Tap into human emotion—fear of losing hard-earned progress, excitement of nearing a reward, or warmth of a treat—rather than cold transactional numbers. (Often pairs with Stickiness or Loss Avoidance.)',
    slideExample:
      'Watching the car come closer turns an uncertain wait into visible progress.',
    originalGap:
      'foodpanda.sg shows a cold checkout box with zero emotional attachment—nothing feels at stake if the user closes the tab, and no reward feels close.',
    improvedChange:
      'Integrated directly into the Bakery Stamp Streak: a visible "3 stamps expire Nov 20 (48h left)" streak-protection alert paired with warm anticipation ("Protect your streak & reach 80% toward a Free Flosss").',
    uiLocationLabel: 'Stamp Expiry Alert & Reward Anticipation (inside Stamp Card)',
    liveHighlightId: 'closers-emotion',
  },
  {
    pointNumber: 6,
    letter: 'R',
    name: 'Recognition',
    accentHex: '#18794E',
    bgHex: '#EAF6F0',
    generalPrinciple:
      'Use specific, relatable peer proof—real neighborhood reviews and live local order counts—so trusted peers vouch for the product quality before the user decides.',
    slideExample:
      'Other customers’ ratings vouch for the cheaper, slower option.',
    originalGap:
      'Shows only an aggregate "4.8 (500+)" score tucked behind a modal link, forcing users to hunt for validation while browsing the menu.',
    improvedChange:
      'Surfaced verified Marina Bay neighbor quotes inline ("Arrived still warm at MBFC Tower 2 in 16 mins — Wei Ling T.") and live item-level proof ("98% liked · 48 ordered nearby today").',
    uiLocationLabel: 'Inline Marina Bay Peer Proof & Local Velocity',
    liveHighlightId: 'closers-recognition',
  },
  {
    pointNumber: 7,
    letter: 'S',
    name: 'Stickiness',
    accentHex: '#1E3356',
    bgHex: '#ECF0F6',
    generalPrinciple:
      'Reward continuity by turning every order into visible progress toward a milestone or streak that the customer has already invested in.',
    slideExample:
      'A long streak is an investment, and nearly 8 million of them had no streak running when the offer began.',
    originalGap:
      'Each BreadTalk order on foodpanda.sg starts from zero—no stamp card, order streak, or visible reward earned by ordering again today.',
    improvedChange:
      'Added the "BreadTalk Bakery Stamp Streak" (3/5 stamps collected · Free Flosss on order #5) directly above the checkout CTA, showing "+1 stamp unlocked with this order."',
    uiLocationLabel: '5-Order Bakery Stamp Streak in Cart & Header',
    liveHighlightId: 'closers-stickiness',
  },
];
