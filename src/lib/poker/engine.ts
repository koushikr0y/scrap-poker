import { formatCardShort, createShuffledDeck } from "./deck";
import { analyzeHeroStrength, evaluateHand, type EvaluatedHand } from "./evaluator";
import { calculateSidePots, resolvePotPayouts } from "./pots";
import type {
  ActionFeedEntry,
  BotPersonality,
  EnginePlayer,
  PokerEngineState,
  PokerPlayerActionInput,
  PokerTableConfig,
  ShowdownWinnerSummary,
} from "./types";
import type { Card, TableStatus } from "../mock/types";

interface BotRosterSeed {
  id: string;
  name: string;
  icon: string;
  personality: BotPersonality;
  bbMultiplier: number;
}

const DEFAULT_BOT_ROSTER: BotRosterSeed[] = [
  {
    id: "bot-rust",
    name: "RUST_BKT",
    icon: "smart_toy",
    personality: "tight",
    bbMultiplier: 120,
  },
  {
    id: "bot-neon",
    name: "NEON_JACK",
    icon: "android",
    personality: "tag",
    bbMultiplier: 85,
  },
  {
    id: "bot-viper",
    name: "VIPER_X",
    icon: "skull",
    personality: "maniac",
    bbMultiplier: 55,
  },
  {
    id: "bot-ram",
    name: "MAD_RAM",
    icon: "hardware",
    personality: "station",
    bbMultiplier: 310,
  },
  {
    id: "bot-cog",
    name: "COGWHEEL",
    icon: "settings",
    personality: "grinder",
    bbMultiplier: 98,
  },
];

let logSeq = 1;
function makeLogEntry(
  sender: string,
  message: string,
  tone: ActionFeedEntry["tone"]
): ActionFeedEntry {
  return {
    id: `log-${Date.now()}-${logSeq++}`,
    sender,
    message,
    tone,
    timestamp: Date.now(),
  };
}

function nextActiveSeatClockwise(
  players: EnginePlayer[],
  fromSeat: number,
  predicate: (p: EnginePlayer) => boolean
): number {
  const n = players.length;
  for (let step = 1; step <= n; step++) {
    const idx = (fromSeat + step) % n;
    if (predicate(players[idx])) {
      return idx;
    }
  }
  return -1;
}

function updateHeroAnalysis(state: PokerEngineState): PokerEngineState {
  const hero = state.players[0];
  const activeOpponents = state.players.filter(
    (p) => p.seatIndex !== 0 && !p.isFolded
  ).length;
  const heroAnalysis = analyzeHeroStrength(
    hero.holeCards,
    state.communityCards,
    Math.max(1, activeOpponents)
  );
  return {
    ...state,
    heroAnalysis,
  };
}

function recalculatePots(players: EnginePlayer[]) {
  const hasAllInPlayer = players.some((p) => !p.isFolded && p.isAllIn);
  const slices = hasAllInPlayer
    ? calculateSidePots(
        players.map((p) => ({
          id: p.id,
          seatIndex: p.seatIndex,
          totalBet: p.totalBetThisHand,
          isFolded: p.isFolded,
        }))
      )
    : [];
  const potTotal = players.reduce((acc, p) => acc + p.totalBetThisHand, 0);
  return { potTotal, sidePots: slices };
}

function resolveShowdownState(state: PokerEngineState): PokerEngineState {
  const players = state.players.map((p) => ({ ...p }));
  let deck = [...state.deck];
  const communityCards = [...state.communityCards];

  const nonFolded = players.filter((p) => !p.isFolded);
  if (nonFolded.length === 1) {
    const winner = nonFolded[0];
    const totalWon = state.potTotal;
    winner.stack += totalWon;

    const revealedWinner: ShowdownWinnerSummary = {
      playerId: winner.id,
      playerName: winner.name,
      amount: totalWon,
      handDescription: "Opponents Folded",
      winningCardIds: [],
    };

    const nextLog = [
      ...state.actionLog,
      makeLogEntry(
        "DEALER_BOT",
        `${winner.name} wins ${totalWon.toLocaleString()} SCRAP (everyone else folded).`,
        "winner"
      ),
    ].slice(-30);

    return updateHeroAnalysis({
      ...state,
      players,
      status: "showdown",
      currentTurnSeatIndex: -1,
      winners: [revealedWinner],
      actionLog: nextLog,
      lastEventToast: `${winner.name} +${totalWon.toLocaleString()} SCRAP!`,
    });
  }

  // Deal any remaining community cards for all-in runouts
  while (communityCards.length < 5 && deck.length > 0) {
    communityCards.push({ ...deck.shift()!, faceDown: false });
  }

  // Reveal all contenders' hole cards at showdown
  const scoresById: Record<string, number[]> = {};
  const evalById: Record<string, EvaluatedHand> = {};
  const seatById: Record<string, number> = {};

  for (const p of nonFolded) {
    p.holeCards = p.holeCards.map((c) => ({ ...c, faceDown: false }));
    const ev = evaluateHand([...p.holeCards, ...communityCards]);
    scoresById[p.id] = ev.score;
    evalById[p.id] = ev;
    seatById[p.id] = p.seatIndex;
    p.handDescription = ev.description;
  }

  const { potTotal, sidePots } = recalculatePots(players);
  const showdownPots = calculateSidePots(
    players.map((p) => ({
      id: p.id,
      seatIndex: p.seatIndex,
      totalBet: p.totalBetThisHand,
      isFolded: p.isFolded,
    }))
  );
  const payouts = resolvePotPayouts(
    showdownPots,
    scoresById,
    seatById,
    state.dealerSeatIndex,
    players.length
  );

  const wonById = new Map<string, number>();
  for (const pay of payouts) {
    const target = players.find((p) => p.id === pay.playerId);
    if (target) {
      target.stack += pay.amount;
      wonById.set(pay.playerId, (wonById.get(pay.playerId) ?? 0) + pay.amount);
    }
  }

  const winners: ShowdownWinnerSummary[] = Array.from(wonById.entries()).map(
    ([pid, amt]) => {
      const playerObj = players.find((p) => p.id === pid)!;
      const ev = evalById[pid];
      return {
        playerId: pid,
        playerName: playerObj.name,
        amount: amt,
        handDescription: ev.description,
        winningCardIds: ev.bestFiveIds,
      };
    }
  );

  // Highlight winning community cards
  const primaryWinCards = new Set(winners[0]?.winningCardIds ?? []);
  const markedCommunity = communityCards.map((c) => ({
    ...c,
    isHighlight: primaryWinCards.has(c.id),
  }));

  const winnerFeedText = winners
    .map(
      (w) =>
        `${w.playerName} wins ${w.amount.toLocaleString()} with ${w.handDescription}`
    )
    .join(" | ");

  const boardText = markedCommunity.map((c) => formatCardShort(c)).join(" ");
  const nextLog = [
    ...state.actionLog,
    makeLogEntry("DEALER_BOT", `Showdown board: ${boardText}`, "system"),
    makeLogEntry("WINNER", winnerFeedText, "winner"),
  ].slice(-30);

  return updateHeroAnalysis({
    ...state,
    deck,
    communityCards: markedCommunity,
    players,
    potTotal,
    sidePots,
    status: "showdown",
    currentTurnSeatIndex: -1,
    winners,
    actionLog: nextLog,
    lastEventToast: winnerFeedText,
  });
}

export function createInitialTableState(
  config: PokerTableConfig
): PokerEngineState {
  const players: EnginePlayer[] = [
    {
      id: "hero",
      name: config.heroName.toUpperCase(),
      icon: "bolt",
      isBot: false,
      seatIndex: 0,
      stack: config.heroBuyIn,
      currentBet: 0,
      totalBetThisHand: 0,
      isDealer: false,
      isFolded: false,
      isAllIn: false,
      hasActedThisRound: false,
      holeCards: [],
    },
    ...DEFAULT_BOT_ROSTER.map((bot, idx) => ({
      id: bot.id,
      name: bot.name,
      icon: bot.icon,
      isBot: true,
      personality: bot.personality,
      seatIndex: idx + 1,
      stack: bot.bbMultiplier * config.bigBlind,
      currentBet: 0,
      totalBetThisHand: 0,
      isDealer: idx + 1 === 2,
      isFolded: false,
      isAllIn: false,
      hasActedThisRound: false,
      holeCards: [],
    })),
  ];

  const baseState: PokerEngineState = {
    config,
    handNumber: 0,
    status: "waiting",
    deck: [],
    communityCards: [],
    players,
    dealerSeatIndex: 1,
    currentTurnSeatIndex: -1,
    highestBet: 0,
    minRaiseIncrement: config.bigBlind,
    potTotal: 0,
    sidePots: [],
    heroAnalysis: {
      headline: "READY TO DEAL",
      equityLabel: "--.-% EQ",
      outs: 0,
    },
    actionLog: [
      makeLogEntry(
        "DEALER_BOT",
        `Joined ${config.tableName} (${config.smallBlind}/${config.bigBlind}). Shuffling deck...`,
        "system"
      ),
    ],
    winners: [],
    turnTimeRemaining: config.turnDurationSeconds,
  };

  return startNextHand(baseState);
}

export function startNextHand(state: PokerEngineState): PokerEngineState {
  const { bigBlind, smallBlind, turnDurationSeconds } = state.config;
  const handNumber = state.handNumber + 1;
  const deck = createShuffledDeck();

  // Top off busted bots between hands so 6-max remains active
  const players: EnginePlayer[] = state.players.map((p, idx) => {
    let nextStack = p.stack;
    if (p.isBot && nextStack < bigBlind * 8) {
      const seed = DEFAULT_BOT_ROSTER[idx - 1];
      nextStack = (seed?.bbMultiplier ?? 100) * bigBlind;
    }
    return {
      ...p,
      stack: nextStack,
      currentBet: 0,
      totalBetThisHand: 0,
      isDealer: false,
      positionLabel: undefined,
      isFolded: nextStack <= 0,
      isAllIn: false,
      hasActedThisRound: false,
      holeCards: [],
      lastAction: undefined,
      handDescription: undefined,
    };
  });

  // Ensure hero has chips; if 0, seat waits (or hero can rebuy)
  const fundedSeats = players.filter((p) => p.stack > 0);
  if (fundedSeats.length < 2) {
    return {
      ...state,
      handNumber,
      players,
      status: "waiting",
      currentTurnSeatIndex: -1,
      lastEventToast: "REBUY CHIPS TO CONTINUE PLAYING",
    };
  }

  // Rotate Dealer clockwise among funded seats
  const nextDealerIdx = nextActiveSeatClockwise(
    players,
    state.dealerSeatIndex,
    (p) => p.stack > 0
  );
  const dealerSeatIndex = nextDealerIdx >= 0 ? nextDealerIdx : 0;
  players[dealerSeatIndex].isDealer = true;
  players[dealerSeatIndex].positionLabel = "BTN";

  const sbSeatIdx =
    fundedSeats.length === 2
      ? dealerSeatIndex
      : nextActiveSeatClockwise(players, dealerSeatIndex, (p) => p.stack > 0);
  const bbSeatIdx = nextActiveSeatClockwise(
    players,
    sbSeatIdx,
    (p) => p.stack > 0
  );

  players[sbSeatIdx].positionLabel =
    sbSeatIdx === dealerSeatIndex ? "BTN/SB" : "SB";
  players[bbSeatIdx].positionLabel = "BB";

  // Post Small Blind
  const sbAmount = Math.min(players[sbSeatIdx].stack, smallBlind);
  players[sbSeatIdx].stack -= sbAmount;
  players[sbSeatIdx].currentBet = sbAmount;
  players[sbSeatIdx].totalBetThisHand = sbAmount;
  if (players[sbSeatIdx].stack === 0) players[sbSeatIdx].isAllIn = true;

  // Post Big Blind
  const bbAmount = Math.min(players[bbSeatIdx].stack, bigBlind);
  players[bbSeatIdx].stack -= bbAmount;
  players[bbSeatIdx].currentBet = bbAmount;
  players[bbSeatIdx].totalBetThisHand = bbAmount;
  if (players[bbSeatIdx].stack === 0) players[bbSeatIdx].isAllIn = true;

  // Deal 2 hole cards to each funded player
  for (const p of players) {
    if (!p.isFolded) {
      const c1 = { ...deck.shift()!, faceDown: p.isBot };
      const c2 = { ...deck.shift()!, faceDown: p.isBot };
      p.holeCards = [c1, c2];
    }
  }

  // First actor preflop is UTG (clockwise after BB)
  const firstTurnSeatIndex = nextActiveSeatClockwise(
    players,
    bbSeatIdx,
    (p) => !p.isFolded && !p.isAllIn
  );

  const { potTotal, sidePots } = recalculatePots(players);

  const log = [
    ...state.actionLog,
    makeLogEntry(
      "DEALER_BOT",
      `Hand #${handNumber} dealt (${players[sbSeatIdx].name} SB ${sbAmount}, ${players[bbSeatIdx].name} BB ${bbAmount}).`,
      "system"
    ),
  ].slice(-30);

  const nextBaseState = updateHeroAnalysis({
    ...state,
    handNumber,
    status: "preflop",
    deck,
    communityCards: [],
    players,
    dealerSeatIndex,
    currentTurnSeatIndex: firstTurnSeatIndex,
    highestBet: Math.max(sbAmount, bbAmount),
    minRaiseIncrement: bigBlind,
    potTotal,
    sidePots,
    actionLog: log,
    winners: [],
    lastEventToast: undefined,
    turnTimeRemaining: turnDurationSeconds,
  });

  if (firstTurnSeatIndex === -1) {
    return resolveShowdownState(nextBaseState);
  }
  return nextBaseState;
}

export function applyPlayerAction(
  state: PokerEngineState,
  seatIndex: number,
  input: PokerPlayerActionInput,
  speechQuote?: string
): PokerEngineState {
  if (
    state.status === "showdown" ||
    state.status === "waiting" ||
    seatIndex !== state.currentTurnSeatIndex
  ) {
    return state;
  }

  const players: EnginePlayer[] = state.players.map((p) => ({
    ...p,
    holeCards: [...p.holeCards],
  }));
  const actor = players[seatIndex];
  if (!actor || actor.isFolded || actor.isAllIn) {
    return state;
  }

  const toCall = Math.max(0, state.highestBet - actor.currentBet);
  let nextHighestBet = state.highestBet;
  let nextMinRaiseIncrement = state.minRaiseIncrement;
  let logText = "";
  let toastText = "";
  let tone: ActionFeedEntry["tone"] = "action";

  if (input.type === "fold" && toCall === 0) {
    // Prefer check if free to check unless explicit fold requested from UI
    actor.isFolded = true;
    actor.hasActedThisRound = true;
    actor.lastAction = { type: "fold" };
    logText = `${actor.name} folds.`;
    toastText = `${actor.name} FOLDS`;
  } else if (input.type === "fold") {
    actor.isFolded = true;
    actor.hasActedThisRound = true;
    actor.lastAction = { type: "fold" };
    logText = `${actor.name} folds.`;
    toastText = `${actor.name} FOLDS`;
  } else if (input.type === "check") {
    if (toCall > 0) {
      // Fallback safely to call if check requested facing bet
      const paid = Math.min(actor.stack, toCall);
      actor.stack -= paid;
      actor.currentBet += paid;
      actor.totalBetThisHand += paid;
      actor.hasActedThisRound = true;
      actor.isAllIn = actor.stack === 0;
      actor.lastAction = { type: actor.isAllIn ? "all-in" : "call", amount: paid };
      logText = `${actor.name} calls ${paid.toLocaleString()}.`;
      toastText = `${actor.name} CALLS ${paid.toLocaleString()}`;
    } else {
      actor.hasActedThisRound = true;
      actor.lastAction = { type: "check" };
      logText = `${actor.name} checks.`;
      toastText = `${actor.name} CHECKS`;
    }
  } else if (input.type === "call") {
    const paid = Math.min(actor.stack, toCall);
    actor.stack -= paid;
    actor.currentBet += paid;
    actor.totalBetThisHand += paid;
    actor.hasActedThisRound = true;
    if (actor.stack === 0) {
      actor.isAllIn = true;
      actor.lastAction = { type: "all-in", amount: actor.currentBet };
      logText = `${actor.name} calls ALL-IN (${actor.currentBet.toLocaleString()})!`;
      toastText = `💥 ${actor.name} ALL-IN!`;
      tone = "alert";
    } else {
      actor.lastAction = { type: "call", amount: paid };
      logText =
        paid === 0
          ? `${actor.name} checks.`
          : `${actor.name} calls ${paid.toLocaleString()}.`;
      toastText =
        paid === 0
          ? `${actor.name} CHECKS`
          : `${actor.name} CALLS ${paid.toLocaleString()}`;
    }
  } else {
    // Raise or All-In
    const maxTarget = actor.currentBet + actor.stack;
    const minRaiseTarget = Math.min(
      maxTarget,
      state.highestBet + state.minRaiseIncrement
    );
    const requested =
      input.type === "all-in"
        ? maxTarget
        : Math.max(minRaiseTarget, input.targetBet ?? minRaiseTarget);
    const clampedTarget = Math.min(maxTarget, requested);
    const added = Math.max(0, clampedTarget - actor.currentBet);

    actor.stack -= added;
    actor.currentBet += added;
    actor.totalBetThisHand += added;
    actor.hasActedThisRound = true;

    const raiseDelta = actor.currentBet - nextHighestBet;
    if (actor.currentBet > nextHighestBet) {
      // Full raise re-opens action for all other non-folded, non-all-in players
      if (raiseDelta >= nextMinRaiseIncrement || input.type !== "all-in") {
        nextMinRaiseIncrement = Math.max(state.config.bigBlind, raiseDelta);
      }
      nextHighestBet = actor.currentBet;
      for (const other of players) {
        if (other.seatIndex !== actor.seatIndex && !other.isFolded && !other.isAllIn) {
          other.hasActedThisRound = false;
        }
      }
    }

    if (actor.stack === 0) {
      actor.isAllIn = true;
      actor.lastAction = { type: "all-in", amount: actor.currentBet };
      logText = `${actor.name} SHOVES ALL-IN ${actor.currentBet.toLocaleString()}!`;
      toastText = `💥 ${actor.name} ALL-IN!`;
      tone = "alert";
    } else {
      actor.lastAction = { type: "raise", amount: actor.currentBet };
      logText = `${actor.name} raises to ${actor.currentBet.toLocaleString()}.`;
      toastText = `${actor.name} RAISES TO ${actor.currentBet.toLocaleString()}`;
    }
  }

  let actionLog = [
    ...state.actionLog,
    makeLogEntry(actor.seatIndex === 0 ? "YOU" : actor.name, logText, tone),
  ];
  if (speechQuote) {
    actionLog.push(makeLogEntry(actor.name, speechQuote, "chat"));
  }
  actionLog = actionLog.slice(-30);

  const { potTotal, sidePots } = recalculatePots(players);

  const intermediateState: PokerEngineState = {
    ...state,
    players,
    highestBet: nextHighestBet,
    minRaiseIncrement: nextMinRaiseIncrement,
    potTotal,
    sidePots,
    actionLog,
    lastEventToast: toastText,
  };

  // Check if everyone else folded -> instant pot win
  const nonFolded = players.filter((p) => !p.isFolded);
  if (nonFolded.length === 1) {
    return resolveShowdownState(intermediateState);
  }

  // Check if current betting street is settled
  const activeCanAct = players.filter((p) => !p.isFolded && !p.isAllIn);
  const roundSettled = activeCanAct.every(
    (p) => p.hasActedThisRound && p.currentBet === nextHighestBet
  );

  if (!roundSettled) {
    const nextSeat = nextActiveSeatClockwise(
      players,
      seatIndex,
      (p) => !p.isFolded && !p.isAllIn
    );
    return updateHeroAnalysis({
      ...intermediateState,
      currentTurnSeatIndex: nextSeat,
      turnTimeRemaining: state.config.turnDurationSeconds,
    });
  }

  // Betting street settled! Check if showdown or next street
  if (state.status === "river" || activeCanAct.length <= 1) {
    return resolveShowdownState(intermediateState);
  }

  // Deal next community cards
  const deck = [...state.deck];
  const communityCards: Card[] = [...state.communityCards];
  let nextStatus: TableStatus = state.status;
  let dealNotice = "";

  if (state.status === "preflop") {
    nextStatus = "flop";
    const c1 = { ...deck.shift()!, faceDown: false };
    const c2 = { ...deck.shift()!, faceDown: false };
    const c3 = { ...deck.shift()!, faceDown: false };
    communityCards.push(c1, c2, c3);
    dealNotice = `Flop dealt: ${formatCardShort(c1)} ${formatCardShort(
      c2
    )} ${formatCardShort(c3)}. Pot is ${potTotal.toLocaleString()} SCRAP.`;
  } else if (state.status === "flop") {
    nextStatus = "turn";
    const c4 = { ...deck.shift()!, faceDown: false };
    communityCards.push(c4);
    dealNotice = `Turn dealt: ${formatCardShort(c4)}. Pot at ${potTotal.toLocaleString()}.`;
  } else if (state.status === "turn") {
    nextStatus = "river";
    const c5 = { ...deck.shift()!, faceDown: false };
    communityCards.push(c5);
    dealNotice = `River dealt: ${formatCardShort(c5)}. Pot at ${potTotal.toLocaleString()}.`;
  }

  const resetPlayers = players.map((p) => ({
    ...p,
    currentBet: 0,
    hasActedThisRound: false,
  }));

  const firstPostflopTurn = nextActiveSeatClockwise(
    resetPlayers,
    state.dealerSeatIndex,
    (p) => !p.isFolded && !p.isAllIn
  );

  return updateHeroAnalysis({
    ...intermediateState,
    deck,
    communityCards,
    status: nextStatus,
    players: resetPlayers,
    highestBet: 0,
    minRaiseIncrement: state.config.bigBlind,
    currentTurnSeatIndex: firstPostflopTurn,
    turnTimeRemaining: state.config.turnDurationSeconds,
    actionLog: [
      ...actionLog,
      makeLogEntry("DEALER_BOT", dealNotice, "system"),
    ].slice(-30),
  });
}

export function addChatMessage(
  state: PokerEngineState,
  sender: string,
  message: string
): PokerEngineState {
  const clean = message.trim();
  if (!clean) return state;
  return {
    ...state,
    actionLog: [
      ...state.actionLog,
      makeLogEntry(sender, clean, "chat"),
    ].slice(-30),
  };
}

export function applyHeroRebuy(
  state: PokerEngineState,
  addedChips: number
): PokerEngineState {
  if (addedChips <= 0) return state;
  const players = state.players.map((p) =>
    p.seatIndex === 0 ? { ...p, stack: p.stack + addedChips } : p
  );
  return {
    ...state,
    players,
    actionLog: [
      ...state.actionLog,
      makeLogEntry(
        "DEALER_BOT",
        `${players[0].name} adds ${addedChips.toLocaleString()} SCRAP to stack.`,
        "system"
      ),
    ].slice(-30),
    lastEventToast: `+${addedChips.toLocaleString()} CHIPS ADDED`,
  };
}
