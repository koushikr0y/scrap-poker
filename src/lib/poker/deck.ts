import type { Card, Rank, Suit } from "../mock/types";

export const SUITS: readonly Suit[] = ["spades", "hearts", "diamonds", "clubs"];

export const RANKS: readonly Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const RANK_VALUES: Record<Rank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export function getRankValue(rank: Rank): number {
  return RANK_VALUES[rank];
}

export function getSuitSymbol(suit: Suit): string {
  switch (suit) {
    case "spades":
      return "♠";
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
  }
}

export function formatCardShort(card: Pick<Card, "rank" | "suit">): string {
  return `${card.rank}${getSuitSymbol(card.suit)}`;
}

function getSecureRandomFloat(): number {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0] / 4294967296;
  }
  return Math.random();
}

export function createOrderedDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank}-${suit}`,
        rank,
        suit,
      });
    }
  }
  return deck;
}

/**
 * Creates a CSPRNG Fisher-Yates shuffled 52-card deck.
 */
export function createShuffledDeck(): Card[] {
  const deck = createOrderedDeck();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(getSecureRandomFloat() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

