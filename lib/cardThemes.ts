import { CardTheme, CardThemeId } from '@/types/builder';

export const CARD_THEMES: Record<CardThemeId, CardTheme> = {
  classic_goa: {
    id: 'classic_goa',
    name: '🌴 Classic Goa',
    bgColor: '#F5F2E9',
    borderColor: '#16382C',
    headerTextColor: '#16382C',
    hindiTextColor: '#E84A7F',
    nameBgColor: '#12362A',
    nameTextColor: '#FFFFFF',
    roleBgColor: '#FFB800',
    roleTextColor: '#D0104C',
    accentColor: '#E84A7F'
  },
  cyber_sunset: {
    id: 'cyber_sunset',
    name: '🌇 Cyber Sunset',
    bgColor: '#FFF5F0',
    borderColor: '#80003A',
    headerTextColor: '#80003A',
    hindiTextColor: '#FF5E00',
    nameBgColor: '#4A0021',
    nameTextColor: '#FFFFFF',
    roleBgColor: '#FF5E00',
    roleTextColor: '#FFFFFF',
    accentColor: '#FF007A'
  },
  emerald_hacker: {
    id: 'emerald_hacker',
    name: '🐸 Emerald Hacker',
    bgColor: '#F2FAF6',
    borderColor: '#064E3B',
    headerTextColor: '#064E3B',
    hindiTextColor: '#059669',
    nameBgColor: '#064E3B',
    nameTextColor: '#ECFDF5',
    roleBgColor: '#10B981',
    roleTextColor: '#064E3B',
    accentColor: '#059669'
  },
  golden_palm: {
    id: 'golden_palm',
    name: '👑 Golden Palm',
    bgColor: '#FFFDF0',
    borderColor: '#78350F',
    headerTextColor: '#78350F',
    hindiTextColor: '#D97706',
    nameBgColor: '#78350F',
    nameTextColor: '#FEF3C7',
    roleBgColor: '#F59E0B',
    roleTextColor: '#78350F',
    accentColor: '#D97706'
  },
  tropical_vibes: {
    id: 'tropical_vibes',
    name: '🌅 Tropical Vibes',
    bgColor: '#1A0533',           // deep purple base
    borderColor: '#7C3AED',       // violet border
    headerTextColor: '#FFFFFF',   // white text on dark bg
    hindiTextColor: '#F97316',    // sunset orange for accents
    nameBgColor: '#7C3AED',       // purple name plate
    nameTextColor: '#FFFFFF',
    roleBgColor: '#F97316',       // orange role pill
    roleTextColor: '#1A0533',     // dark text on orange
    accentColor: '#06B6D4',       // teal/cyan accent
  }
};
