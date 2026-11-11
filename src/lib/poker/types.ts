import type { Card, PlayerActionType, TableStatus } from "../mock/types";
import type { HeroStrengthAnalysis } from "./evaluator";

export type BotPersonality = "tight" | "tag" | "maniac" | "station" | "grinder";

export interface EnginePlayer {
  id: string;
  name: string;
  icon: string;
  isBot: boolean;
  personality?: BotPersonality;
  seatIndex: number;
  stack: number;
  currentBet: number;
  totalBetThisHand: number;
  isDealer: boolean;
  positionLabel?: string;
  isFolded: boolean;
  isAllIn: boolean;
  hasActedThisRound: boolean;
  holeCards: Card[];
  lastAction?: {
    type: PlayerActionType;
    amount?: number;
  };
  handDescription?: string;
}

export interface ActionFeedEntry {
  id: string;
  sender: string;
  message: string;
  tone: "system" | "action" | "alert" | "chat" | "winner";
  timestamp: number;
}

export interface ShowdownWinnerSummary {
  playerId: string;
  playerName: string;
  amount: number;
  handDescription: string;
  winningCardIds: string[];
}

export interface PokerTableConfig {
  tableId: string;
  tableName: string;
  tableCode: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
  turnDurationSeconds: number;
  heroName: string;
  heroBuyIn: number;
  autoTopOff: boolean;
}

export interface PokerEngineState {
  config: PokerTableConfig;
  handNumber: number;
  status: TableStatus;
  deck: Card[];
  communityCards: Card[];
  players: EnginePlayer[];
  dealerSeatIndex: number;
  currentTurnSeatIndex: number;
  highestBet: number;
  minRaiseIncrement: number;
  potTotal: number;
  sidePots: { amount: number; eligiblePlayerIds: string[] }[];
  heroAnalysis: HeroStrengthAnalysis;
  actionLog: ActionFeedEntry[];
  winners: ShowdownWinnerSummary[];
  lastEventToast?: string;
  turnTimeRemaining: number;
}

export interface PokerPlayerActionInput {
  type: PlayerActionType;
  /** Target total bet on this street for raise/all-in */
  targetBet?: number;
}
