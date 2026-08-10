export const BUILDER_TITLES_BY_CATEGORY: Record<string, string[]> = {
  developer: [
    'TERMINAL WIZARD',
    'CODE SHIPPER',
    'BUG HUNTER',
    'STACK ARCHITECT',
    'ASYNC ALCHEMIST',
    'DEBUG MASTER',
    'GIT REBASE NINJA',
    'PROD DEPLOYER'
  ],
  ai: [
    'NEURAL NAVIGATOR',
    'MODEL BUILDER',
    'PROMPT PILOT',
    'WEIGHTS WHISPERER',
    'LATENT SURFER',
    'GPU MELTER',
    'AGENT OVERLORD'
  ],
  designer: [
    'PIXEL ALCHEMIST',
    'INTERFACE ARCHITECT',
    'VECTOR VIBRATION',
    'DESIGN WIZARD',
    'UI MONK',
    'KERNING KING'
  ],
  founder: [
    'CHAOS ORGANIZER',
    'STARTUP SHIPPER',
    'VISION CRAFTER',
    'PITCH CAPTAIN',
    'MVP MACHINE',
    'CHURN DESTROYER'
  ],
  goa_special: [
    'COCONUT CODER',
    'SHACK HACKER',
    'SUNSET SHIPPER',
    'BEACH BOUND BUILDER',
    'WAVE RIDER',
    'PALM TREE PROGRAMMER'
  ]
};

export const ALL_BUILDER_TITLES = Object.values(BUILDER_TITLES_BY_CATEGORY).flat();

export const MOTTOS = [
  'BUILDING THE FUTURE',
  'BUILD • SHIP • REPEAT',
  'CODE FROM PARADISE',
  '100% SHIPPED NO CAP',
  'EAT SLEEP HACK REPEAT',
  'SHIPPING AT LIGHTSPEED',
  'TURN CAFFEINE TO CODE',
  'GOA STATE OF MIND'
];

export function generateRandomTitle(currentRole?: string): string {
  const roleLower = (currentRole || '').toLowerCase();
  let categoryPool = ALL_BUILDER_TITLES;

  if (roleLower.includes('ai') || roleLower.includes('ml') || roleLower.includes('model') || roleLower.includes('prompt')) {
    categoryPool = BUILDER_TITLES_BY_CATEGORY.ai;
  } else if (roleLower.includes('design') || roleLower.includes('ui') || roleLower.includes('ux') || roleLower.includes('front')) {
    categoryPool = BUILDER_TITLES_BY_CATEGORY.designer;
  } else if (roleLower.includes('founder') || roleLower.includes('ceo') || roleLower.includes('lead') || roleLower.includes('product')) {
    categoryPool = BUILDER_TITLES_BY_CATEGORY.founder;
  } else if (roleLower.includes('dev') || roleLower.includes('stack') || roleLower.includes('backend') || roleLower.includes('software')) {
    categoryPool = BUILDER_TITLES_BY_CATEGORY.developer;
  }

  const randomIndex = Math.floor(Math.random() * categoryPool.length);
  return categoryPool[randomIndex];
}

export function generateRandomMotto(): string {
  return MOTTOS[Math.floor(Math.random() * MOTTOS.length)];
}

export function generateTicketId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `HH-GOA-${randomNum}`;
}
