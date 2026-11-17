import { compareScores } from "./evaluator";

export interface PotPlayerContribution {
  id: string;
  seatIndex: number;
  totalBet: number;
  isFolded: boolean;
}

export interface ComputedPotSlice {
  amount: number;
  eligiblePlayerIds: string[];
}

export interface PotPayout {
  playerId: string;
  amount: number;
  potIndex: number;
}

/**
 * Slices total player contributions into Main Pot + Side Pots.
 * Folded players' dead money enters pots, while only non-folded contributors can win each slice.
 */
export function calculateSidePots(
  players: PotPlayerContribution[]
): ComputedPotSlice[] {
  const nonZeroLevels = Array.from(
    new Set(players.filter((p) => p.totalBet > 0).map((p) => p.totalBet))
  ).sort((a, b) => a - b);

  const slices: ComputedPotSlice[] = [];
  let prevLevel = 0;

  for (const level of nonZeroLevels) {
    const delta = level - prevLevel;
    let sliceAmount = 0;
    const eligible: string[] = [];

    for (const p of players) {
      if (p.totalBet > prevLevel) {
        sliceAmount += Math.min(delta, p.totalBet - prevLevel);
        if (!p.isFolded && p.totalBet >= level) {
          eligible.push(p.id);
        }
      }
    }

    if (sliceAmount > 0 && eligible.length > 0) {
      // Merge consecutive slices with identical eligible sets
      const prev = slices[slices.length - 1];
      if (
        prev &&
        prev.eligiblePlayerIds.length === eligible.length &&
        prev.eligiblePlayerIds.every((id, idx) => id === eligible[idx])
      ) {
        prev.amount += sliceAmount;
      } else {
        slices.push({ amount: sliceAmount, eligiblePlayerIds: eligible });
      }
    } else if (sliceAmount > 0 && eligible.length === 0 && slices.length > 0) {
      // Dead uncontested excess returns to previous eligible slice if any
      slices[slices.length - 1].amount += sliceAmount;
    }

    prevLevel = level;
  }

  return slices;
}

/**
 * Distributes every pot slice to the winning eligible player(s), breaking odd chips clockwise after dealerSeatIndex.
 */
export function resolvePotPayouts(
  slices: ComputedPotSlice[],
  scoresByPlayerId: Record<string, number[]>,
  seatIndexByPlayerId: Record<string, number>,
  dealerSeatIndex: number,
  seatCount: number
): PotPayout[] {
  const payouts: PotPayout[] = [];

  slices.forEach((slice, potIndex) => {
    let bestScore: number[] | null = null;
    let winners: string[] = [];

    for (const pid of slice.eligiblePlayerIds) {
      const score = scoresByPlayerId[pid];
      if (!score) continue;
      if (!bestScore) {
        bestScore = score;
        winners = [pid];
      } else {
        const cmp = compareScores(score, bestScore);
        if (cmp > 0) {
          bestScore = score;
          winners = [pid];
        } else if (cmp === 0) {
          winners.push(pid);
        }
      }
    }

    if (winners.length === 0) return;

    // Sort winners clockwise from left of dealer for odd chip rule
    winners.sort((a, b) => {
      const distA =
        (seatIndexByPlayerId[a] - dealerSeatIndex - 1 + seatCount * 2) %
        seatCount;
      const distB =
        (seatIndexByPlayerId[b] - dealerSeatIndex - 1 + seatCount * 2) %
        seatCount;
      return distA - distB;
    });

    const share = Math.floor(slice.amount / winners.length);
    const remainder = slice.amount - share * winners.length;

    winners.forEach((pid, idx) => {
      const bonus = idx < remainder ? 1 : 0;
      const amount = share + bonus;
      if (amount > 0) {
        payouts.push({ playerId: pid, amount, potIndex });
      }
    });
  });

  return payouts;
}

