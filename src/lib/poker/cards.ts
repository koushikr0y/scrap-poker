import type { Card, TableStatus } from "../mock/types";

export interface SuitVisualMeta {
  symbol: string;
  desktopTextColor: string;
  mobilePrimaryCardColor: string;
  mobileAltCardColor: string;
}

const SUIT_VISUAL_MAP: Record<Card["suit"], SuitVisualMeta> = {
  spades: {
    symbol: "♠",
    desktopTextColor: "text-[#101012]",
    mobilePrimaryCardColor: "text-on-surface",
    mobileAltCardColor: "text-[#101012]",
  },
  hearts: {
    symbol: "♥",
    desktopTextColor: "text-[#D9453A]",
    mobilePrimaryCardColor: "text-error",
    mobileAltCardColor: "text-[#d9453a]",
  },
  diamonds: {
    symbol: "♦",
    desktopTextColor: "text-[#1AA3D4]",
    mobilePrimaryCardColor: "text-secondary-container",
    mobileAltCardColor: "text-[#009ccc]",
  },
  clubs: {
    symbol: "♣",
    desktopTextColor: "text-[#7ED957]",
    mobilePrimaryCardColor: "text-on-secondary",
    mobileAltCardColor: "text-[#2e7d32]",
  },
};

export function getSuitVisualMeta(suit: Card["suit"]): SuitVisualMeta {
  return SUIT_VISUAL_MAP[suit];
}

export function formatCompactChips(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
  }
  return amount.toLocaleString();
}

export function formatStreetBanner(status: TableStatus): {
  desktop: string;
  mobile: string;
} {
  switch (status) {
    case "preflop":
      return { desktop: "PREFLOP · 1ST STREET", mobile: "★ PREFLOP · 1ST STREET ★" };
    case "flop":
      return { desktop: "FLOP · 3RD STREET", mobile: "★ FLOP · 3RD STREET ★" };
    case "turn":
      return { desktop: "TURN · 4TH STREET", mobile: "★ TURN · 4TH STREET ★" };
    case "river":
      return { desktop: "RIVER · 5TH STREET", mobile: "★ RIVER · 5TH STREET ★" };
    case "showdown":
      return { desktop: "SHOWDOWN · PAYOUT", mobile: "★ SHOWDOWN · PAYOUT ★" };
    default:
      return { desktop: "WAITING FOR DEAL", mobile: "★ WAITING FOR DEAL ★" };
  }
}

export function computePresetTarget(
  potTotal: number,
  highestBet: number,
  multiplier: number,
  minTarget: number,
  maxTarget: number
): number {
  const desired = Math.round((highestBet + potTotal * multiplier) / 50) * 50;
  return Math.max(minTarget, Math.min(maxTarget, desired));
}
