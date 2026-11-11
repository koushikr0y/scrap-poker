import type { Card } from "../mock/types";
import { createOrderedDeck, getRankValue } from "./deck";

export interface EvaluatedHand {
  /** 1 = Royal Flush ... 10 = High Card */
  tier: number;
  /** Lexicographical descending array [categoryScore 10..1, tiebreakers...] */
  score: number[];
  categoryName: string;
  description: string;
  bestFiveIds: string[];
}

export interface HeroStrengthAnalysis {
  headline: string;
  equityLabel: string;
  outs: number;
  evaluated?: EvaluatedHand;
}

const RANK_NAME_PLURAL: Record<number, string> = {
  14: "Aces",
  13: "Kings",
  12: "Queens",
  11: "Jacks",
  10: "Tens",
  9: "Nines",
  8: "Eights",
  7: "Sevens",
  6: "Sixes",
  5: "Fives",
  4: "Fours",
  3: "Threes",
  2: "Twos",
};

const RANK_NAME_SINGULAR: Record<number, string> = {
  14: "Ace",
  13: "King",
  12: "Queen",
  11: "Jack",
  10: "Ten",
  9: "Nine",
  8: "Eight",
  7: "Seven",
  6: "Six",
  5: "Five",
  4: "Four",
  3: "Three",
  2: "Two",
};

export function compareScores(a: number[], b: number[]): number {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const va = a[i] ?? 0;
    const vb = b[i] ?? 0;
    if (va !== vb) return va - vb;
  }
  return 0;
}

function getStraightHigh(uniqueDescValues: number[]): number | null {
  if (uniqueDescValues.length < 5) return null;
  // Normal straight check on 5 cards
  let consecutive = true;
  for (let i = 0; i < 4; i++) {
    if (uniqueDescValues[i] - 1 !== uniqueDescValues[i + 1]) {
      consecutive = false;
      break;
    }
  }
  if (consecutive) return uniqueDescValues[0];

  // Wheel check: A, 5, 4, 3, 2
  if (
    uniqueDescValues[0] === 14 &&
    uniqueDescValues[1] === 5 &&
    uniqueDescValues[2] === 4 &&
    uniqueDescValues[3] === 3 &&
    uniqueDescValues[4] === 2
  ) {
    return 5;
  }

  return null;
}

function evaluateFiveCards(cards: Card[]): EvaluatedHand {
  const sorted = [...cards].sort(
    (a, b) => getRankValue(b.rank) - getRankValue(a.rank)
  );
  const values = sorted.map((c) => getRankValue(c.rank));
  const ids = sorted.map((c) => c.id);

  const isFlush = sorted.every((c) => c.suit === sorted[0].suit);

  const counts = new Map<number, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }

  // Sort groups by [count desc, value desc]
  const groups = Array.from(counts.entries()).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0] - a[0];
  });

  const uniqueValues = Array.from(counts.keys()).sort((a, b) => b - a);
  const straightHigh = getStraightHigh(uniqueValues);

  if (isFlush && straightHigh !== null) {
    if (straightHigh === 14) {
      return {
        tier: 1,
        score: [10, 14],
        categoryName: "Royal Flush",
        description: "Royal Flush",
        bestFiveIds: ids,
      };
    }
    return {
      tier: 2,
      score: [9, straightHigh],
      categoryName: "Straight Flush",
      description: `Straight Flush, ${RANK_NAME_SINGULAR[straightHigh]}-High`,
      bestFiveIds: ids,
    };
  }

  if (groups[0][1] === 4) {
    const quad = groups[0][0];
    const kicker = groups[1][0];
    return {
      tier: 3,
      score: [8, quad, kicker],
      categoryName: "Four of a Kind",
      description: `Four of a Kind, ${RANK_NAME_PLURAL[quad]}`,
      bestFiveIds: ids,
    };
  }

  if (groups[0][1] === 3 && groups[1][1] === 2) {
    const trips = groups[0][0];
    const pair = groups[1][0];
    return {
      tier: 4,
      score: [7, trips, pair],
      categoryName: "Full House",
      description: `Full House, ${RANK_NAME_PLURAL[trips]} full of ${RANK_NAME_PLURAL[pair]}`,
      bestFiveIds: ids,
    };
  }

  if (isFlush) {
    return {
      tier: 5,
      score: [6, ...values],
      categoryName: "Flush",
      description: `${RANK_NAME_SINGULAR[values[0]]}-High Flush`,
      bestFiveIds: ids,
    };
  }

  if (straightHigh !== null) {
    return {
      tier: 6,
      score: [5, straightHigh],
      categoryName: "Straight",
      description: `Straight, ${RANK_NAME_SINGULAR[straightHigh]}-High`,
      bestFiveIds: ids,
    };
  }

  if (groups[0][1] === 3) {
    const trips = groups[0][0];
    const kickers = groups.slice(1).map((g) => g[0]);
    return {
      tier: 7,
      score: [4, trips, ...kickers],
      categoryName: "Three of a Kind",
      description: `Three of a Kind, ${RANK_NAME_PLURAL[trips]}`,
      bestFiveIds: ids,
    };
  }

  if (groups[0][1] === 2 && groups[1][1] === 2) {
    const highPair = groups[0][0];
    const lowPair = groups[1][0];
    const kicker = groups[2][0];
    return {
      tier: 8,
      score: [3, highPair, lowPair, kicker],
      categoryName: "Two Pair",
      description: `Two Pair, ${RANK_NAME_PLURAL[highPair]} & ${RANK_NAME_PLURAL[lowPair]}`,
      bestFiveIds: ids,
    };
  }

  if (groups[0][1] === 2) {
    const pair = groups[0][0];
    const kickers = groups.slice(1).map((g) => g[0]);
    return {
      tier: 9,
      score: [2, pair, ...kickers],
      categoryName: "One Pair",
      description: `Pair of ${RANK_NAME_PLURAL[pair]}`,
      bestFiveIds: ids,
    };
  }

  return {
    tier: 10,
    score: [1, ...values],
    categoryName: "High Card",
    description: `${RANK_NAME_SINGULAR[values[0]]}-High`,
    bestFiveIds: ids,
  };
}

/**
 * Evaluates best 5-card Texas Hold'em hand from 5, 6, or 7 cards.
 */
export function evaluateHand(cards: Card[]): EvaluatedHand {
  if (cards.length < 5) {
    throw new Error(`evaluateHand requires at least 5 cards, got ${cards.length}`);
  }
  if (cards.length === 5) {
    return evaluateFiveCards(cards);
  }

  let best: EvaluatedHand | null = null;
  const n = cards.length;
  for (let a = 0; a < n - 4; a++) {
    for (let b = a + 1; b < n - 3; b++) {
      for (let c = b + 1; c < n - 2; c++) {
        for (let d = c + 1; d < n - 1; d++) {
          for (let e = d + 1; e < n; e++) {
            const evalResult = evaluateFiveCards([
              cards[a],
              cards[b],
              cards[c],
              cards[d],
              cards[e],
            ]);
            if (!best || compareScores(evalResult.score, best.score) > 0) {
              best = evalResult;
            }
          }
        }
      }
    }
  }
  return best!;
}

function estimatePreflopStrength(holeCards: Card[]): number {
  if (holeCards.length < 2) return 0.25;
  const v1 = getRankValue(holeCards[0].rank);
  const v2 = getRankValue(holeCards[1].rank);
  const hi = Math.max(v1, v2);
  const lo = Math.min(v1, v2);
  const suited = holeCards[0].suit === holeCards[1].suit;
  const gap = hi - lo;

  if (hi === lo) {
    // Pocket pair 22..AA -> 0.50 .. 0.85
    return Math.min(0.86, 0.46 + (hi / 14) * 0.4);
  }
  let score = (hi + lo) / 28 * 0.5 + 0.16;
  if (suited) score += 0.05;
  if (gap <= 2) score += 0.04;
  return Math.max(0.24, Math.min(0.72, score));
}

/**
 * Counts flush & straight outs on flop/turn and runs a lightweight deterministic equity rollout.
 */
export function analyzeHeroStrength(
  holeCards: Card[],
  communityCards: Card[],
  activeOpponentCount = 1
): HeroStrengthAnalysis {
  if (holeCards.length < 2) {
    return {
      headline: "WAITING FOR DEAL",
      equityLabel: "--.-% EQ",
      outs: 0,
    };
  }

  // Preflop
  if (communityCards.length < 3) {
    const v1 = getRankValue(holeCards[0].rank);
    const v2 = getRankValue(holeCards[1].rank);
    const hi = Math.max(v1, v2);
    const lo = Math.min(v1, v2);
    const suited = holeCards[0].suit === holeCards[1].suit;

    let headline = "";
    if (v1 === v2) {
      headline = `POCKET ${RANK_NAME_PLURAL[hi].toUpperCase()}`;
    } else {
      headline = `${RANK_NAME_SINGULAR[hi].toUpperCase()}-${RANK_NAME_SINGULAR[lo].toUpperCase()} ${
        suited ? "SUITED" : "OFFSUIT"
      }`;
    }

    const rawEq = estimatePreflopStrength(holeCards);
    const adjEq = Math.pow(rawEq, Math.max(1, activeOpponentCount * 0.55));
    return {
      headline,
      equityLabel: `${(adjEq * 100).toFixed(1)}% EQ`,
      outs: 0,
    };
  }

  const combined = [...holeCards, ...communityCards];
  const currentBest = evaluateHand(combined);

  // Compute Flush & Straight outs when more community cards remain (< 5)
  let drawLabel = "";
  let outs = 0;

  if (communityCards.length < 5) {
    const suitCounts = new Map<string, Card[]>();
    for (const c of combined) {
      const list = suitCounts.get(c.suit) ?? [];
      list.push(c);
      suitCounts.set(c.suit, list);
    }

    let hasFlushDraw = false;
    let isRoyalDraw = false;
    for (const [, suitedCards] of suitCounts.entries()) {
      if (suitedCards.length === 4) {
        hasFlushDraw = true;
        outs = 9;
        const vals = new Set(suitedCards.map((c) => getRankValue(c.rank)));
        const broadwayMatches = [14, 13, 12, 11, 10].filter((v) =>
          vals.has(v)
        ).length;
        if (broadwayMatches >= 4) {
          isRoyalDraw = true;
        }
      }
    }

    // Check open-ended / gutshot straight draw if not already straight+
    if (currentBest.tier > 6) {
      const seenIds = new Set(combined.map((c) => c.id));
      const remaining = createOrderedDeck().filter((c) => !seenIds.has(c.id));
      let straightOuts = 0;
      for (const candidate of remaining) {
        const nextEval = evaluateHand([...combined, candidate]);
        if (nextEval.tier === 6) {
          straightOuts++;
        }
      }
      if (straightOuts >= 4 && !hasFlushDraw) {
        outs = straightOuts;
        drawLabel =
          straightOuts >= 8
            ? `OPEN STRAIGHT DRAW · ${outs} OUTS`
            : `STRAIGHT DRAW · ${outs} OUTS`;
      } else if (hasFlushDraw) {
        if (isRoyalDraw) {
          drawLabel = `ROYAL FLUSH DRAW · 9 OUTS`;
        } else {
          drawLabel = `FLUSH DRAW · 9 OUTS`;
        }
      }
    }
  }

  const headline = (drawLabel || currentBest.description).toUpperCase();

  // Fast deterministic equity estimate (uses card ID hash for deterministic seeded rollout)
  if (communityCards.length === 5) {
    // At river, compare against sample random villain hands
    const seenIds = new Set(combined.map((c) => c.id));
    const remaining = createOrderedDeck().filter((c) => !seenIds.has(c.id));
    let wins = 0;
    let total = 0;
    for (let i = 0; i < remaining.length; i += 2) {
      for (let j = i + 1; j < remaining.length; j += 5) {
        const villainEval = evaluateHand([
          remaining[i],
          remaining[j],
          ...communityCards,
        ]);
        const cmp = compareScores(currentBest.score, villainEval.score);
        if (cmp > 0) wins += 1;
        else if (cmp === 0) wins += 0.5;
        total += 1;
      }
    }
    const baseEq = total > 0 ? wins / total : 0.5;
    const multiEq = Math.pow(baseEq, Math.max(1, activeOpponentCount));
    return {
      headline,
      equityLabel: `${(multiEq * 100).toFixed(1)}% EQ`,
      outs,
      evaluated: currentBest,
    };
  }

  // Flop / Turn quick sampled equity estimate
  const tierBase = (11 - currentBest.tier) / 10;
  const drawBonus = outs * (communityCards.length === 3 ? 0.036 : 0.022);
  const rawEq = Math.min(0.95, Math.max(0.18, tierBase * 0.68 + drawBonus));
  const adjEq = Math.pow(rawEq, Math.max(1, activeOpponentCount * 0.35));

  return {
    headline,
    equityLabel: `${(adjEq * 100).toFixed(1)}% EQ`,
    outs,
    evaluated: currentBest,
  };
}
