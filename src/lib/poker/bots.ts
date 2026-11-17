import { getRankValue } from "./deck";
import { evaluateHand } from "./evaluator";
import type {
  BotPersonality,
  EnginePlayer,
  PokerEngineState,
  PokerPlayerActionInput,
} from "./types";

function scorePreflop(player: EnginePlayer): number {
  if (player.holeCards.length < 2) return 0.2;
  const v1 = getRankValue(player.holeCards[0].rank);
  const v2 = getRankValue(player.holeCards[1].rank);
  const hi = Math.max(v1, v2);
  const lo = Math.min(v1, v2);
  const suited = player.holeCards[0].suit === player.holeCards[1].suit;
  const gap = hi - lo;

  if (hi === lo) {
    return Math.min(0.96, 0.56 + (hi / 14) * 0.4);
  }
  let s = ((hi * 1.4 + lo) / 34) * 0.65 + 0.12;
  if (suited) s += 0.08;
  if (gap <= 2) s += 0.05;
  if (hi >= 12 && lo >= 10) s += 0.1;
  return Math.max(0.15, Math.min(0.88, s));
}

function scorePostflop(state: PokerEngineState, player: EnginePlayer): number {
  const cards = [...player.holeCards, ...state.communityCards];
  if (cards.length < 5) return scorePreflop(player);

  const evalRes = evaluateHand(cards);
  const baseByTier: Record<number, number> = {
    1: 1.0,
    2: 0.99,
    3: 0.97,
    4: 0.94,
    5: 0.87,
    6: 0.82,
    7: 0.76,
    8: 0.68,
    9: 0.48,
    10: 0.22,
  };
  let score = baseByTier[evalRes.tier] ?? 0.25;

  // High card / pair kicker bump
  if (evalRes.tier >= 9 && evalRes.score[1]) {
    score += ((evalRes.score[1] - 7) / 14) * 0.12;
  }

  // Draw potential on flop/turn
  if (state.communityCards.length < 5 && evalRes.tier > 5) {
    const suitCounts = new Map<string, number>();
    for (const c of cards) {
      suitCounts.set(c.suit, (suitCounts.get(c.suit) ?? 0) + 1);
    }
    if (Array.from(suitCounts.values()).some((cnt) => cnt >= 4)) {
      score += 0.18;
    }
  }

  return Math.max(0.1, Math.min(1.0, score));
}

function clampToStep(val: number, step: number): number {
  if (step <= 0) return Math.round(val);
  return Math.round(val / step) * step;
}

export function decideBotAction(
  state: PokerEngineState,
  seatIndex: number
): { action: PokerPlayerActionInput; speech?: string } {
  const player = state.players[seatIndex];
  const personality: BotPersonality = player.personality ?? "tag";

  const toCall = Math.max(0, state.highestBet - player.currentBet);
  const maxTarget = player.currentBet + player.stack;
  const minRaiseTarget = Math.min(
    maxTarget,
    state.highestBet + state.minRaiseIncrement
  );
  const potAfterCall = state.potTotal + toCall;
  const potOdds = potAfterCall > 0 ? toCall / potAfterCall : 0;

  const strength =
    state.communityCards.length >= 3
      ? scorePostflop(state, player)
      : scorePreflop(player);

  const noise = (Math.random() - 0.5) * 0.16;
  const roll = Math.random();

  const aggressionMap: Record<BotPersonality, number> = {
    tight: -0.08,
    grinder: 0.0,
    tag: 0.06,
    station: -0.02,
    maniac: 0.18,
  };
  const callLooseness: Record<BotPersonality, number> = {
    tight: -0.1,
    grinder: 0.0,
    tag: 0.04,
    station: 0.18,
    maniac: 0.14,
  };

  const effectiveStrength = strength + aggressionMap[personality] + noise;
  const canRaise = player.stack > toCall && maxTarget >= minRaiseTarget;

  // Facing zero bet: check or bet
  if (toCall === 0) {
    if (canRaise && effectiveStrength > 0.64 && roll < 0.72) {
      const sizingMult = personality === "maniac" && roll < 0.25 ? 0.9 : 0.55;
      const desired = Math.max(
        minRaiseTarget,
        clampToStep(
          state.highestBet + Math.max(state.config.bigBlind, state.potTotal * sizingMult),
          Math.max(10, Math.floor(state.config.smallBlind / 2))
        )
      );
      const targetBet = Math.min(maxTarget, desired);
      if (targetBet >= maxTarget || (personality === "maniac" && effectiveStrength > 0.85 && roll < 0.35)) {
        return {
          action: { type: "all-in", targetBet: maxTarget },
          speech:
            personality === "maniac"
              ? '"No brakes on this rust heap—ALL-IN!"'
              : undefined,
        };
      }
      return {
        action: { type: "raise", targetBet },
      };
    }
    return { action: { type: "check" } };
  }

  // Facing a bet or raise
  const adjustedCallThreshold =
    potOdds + 0.22 - callLooseness[personality] + noise * 0.5;

  // Monster / high aggression re-raise or shove
  if (
    canRaise &&
    effectiveStrength > 0.8 &&
    roll < (personality === "maniac" ? 0.65 : 0.42)
  ) {
    if (
      (personality === "maniac" && roll < 0.45) ||
      minRaiseTarget >= maxTarget * 0.7
    ) {
      return {
        action: { type: "all-in", targetBet: maxTarget },
        speech:
          personality === "maniac"
            ? '"Smells like nuts or nothing. Shoving!"'
            : undefined,
      };
    }

    const raiseDesired = Math.max(
      minRaiseTarget,
      clampToStep(
        state.highestBet + Math.max(state.minRaiseIncrement, potAfterCall * 0.65),
        Math.max(10, Math.floor(state.config.smallBlind / 2))
      )
    );
    return {
      action: {
        type: raiseDesired >= maxTarget ? "all-in" : "raise",
        targetBet: Math.min(maxTarget, raiseDesired),
      },
    };
  }

  // Call if pot odds + hand strength justify
  if (strength >= adjustedCallThreshold || toCall <= state.config.bigBlind * 0.5) {
    if (toCall >= player.stack) {
      return { action: { type: "all-in", targetBet: maxTarget } };
    }
    return { action: { type: "call" } };
  }

  // Heroic bluff raise rarely from maniac
  if (canRaise && personality === "maniac" && roll < 0.08 && player.stack > state.config.bigBlind * 6) {
    return {
      action: { type: "raise", targetBet: minRaiseTarget },
      speech: '"Testing the steel!"',
    };
  }

  return { action: { type: "fold" } };
}

