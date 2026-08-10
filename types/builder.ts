export interface BeachBagItem {
  icon: string;
  label: string;
}

export type CardThemeId = 'classic_goa' | 'cyber_sunset' | 'emerald_hacker' | 'golden_palm';

export interface CardTheme {
  id: CardThemeId;
  name: string;
  bgColor: string;
  borderColor: string;
  headerTextColor: string;
  hindiTextColor: string;
  nameBgColor: string;
  nameTextColor: string;
  roleBgColor: string;
  roleTextColor: string;
  accentColor: string;
}

export interface BuilderProfile {
  name: string;
  role: string;
  stack: string;
  builderTitle: string;
  motto: string;
  photoUrl: string | null;
  photoScale: number; // 0.5 to 2.5
  photoOffsetX: number; // -100 to 100
  photoOffsetY: number; // -100 to 100
  ticketId: string;
  beachBag: BeachBagItem[];
  theme: CardThemeId;
  dateText: string;
  locationText: string;
  qrTargetUrl?: string;
  verifiedStatus?: boolean;
}

export const AVAILABLE_BEACH_BAG_ITEMS: BeachBagItem[] = [
  { icon: '🥥', label: 'COCONUT' },
  { icon: '💻', label: 'VS CODE' },
  { icon: '🎧', label: 'LO-FI BEATS' },
  { icon: '🕶️', label: 'SUNGLASSES' },
  { icon: '🩴', label: 'FLIP FLOPS' },
  { icon: '⚡', label: 'RED BULL' },
  { icon: '🍕', label: 'PIZZA CODE' },
  { icon: '🏄', label: 'SURFBOARD' },
];

export const DEFAULT_PROFILE: BuilderProfile = {
  name: 'MADHAVAN SINGH',
  role: 'FULL STACK DEVELOPER',
  stack: 'Next.js • React • Node.js',
  builderTitle: 'TERMINAL WIZARD',
  motto: 'BUILDING THE FUTURE',
  photoUrl: null,
  photoScale: 1.0,
  photoOffsetX: 0,
  photoOffsetY: 0,
  ticketId: 'HH-GOA-7757',
  beachBag: [
    { icon: '🥥', label: 'COCONUT' },
    { icon: '💻', label: 'VS CODE' },
    { icon: '🎧', label: 'LO-FI BEATS' }
  ],
  theme: 'classic_goa',
  dateText: '28 - 31 OCT 2026',
  locationText: 'GOA, INDIA',
  verifiedStatus: true,
};
