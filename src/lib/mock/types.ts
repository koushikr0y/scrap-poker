export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  faceDown?: boolean;
  isHighlight?: boolean;
}

export type PlayerPosition = 'BTN' | 'SB' | 'BB' | 'UTG' | 'MP' | 'CO';

export type PlayerActionType = 'fold' | 'check' | 'call' | 'raise' | 'all-in';

export interface PlayerAction {
  type: PlayerActionType;
  amount?: number;
  timestamp?: number;
}

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  vipTier?: 'Bronze' | 'Silver' | 'Gold' | 'Black Diamond';
  stack: number;
  currentBet: number;
  seatIndex: number;
  position?: PlayerPosition;
  isDealer?: boolean;
  isActive: boolean;
  isCurrentTurn: boolean;
  isFolded: boolean;
  isAllIn: boolean;
  cards?: [Card, Card];
  timeRemaining?: number; // In seconds
  totalTime?: number;     // e.g. 15s or 30s
  lastAction?: PlayerAction;
  isUser?: boolean;
  handRankDescription?: string; // e.g. "Two Pair, Kings & 10s"
}

export interface SidePot {
  amount: number;
  eligiblePlayerIds: string[];
}

export interface Pot {
  main: number;
  sidePots: SidePot[];
  total: number;
}

export type TableStatus = 'waiting' | 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface TableState {
  id: string;
  title: string;
  tableName: string;
  status: TableStatus;
  stakes: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
  pot: Pot;
  communityCards: Card[];
  players: Player[];
  userSeatIndex: number;
  currentTurnSeatIndex: number;
  callAmount: number;
  minRaiseAmount: number;
  maxRaiseAmount: number;
  handNumber: number;
  handRankSummary?: string;
}

export interface LobbyTableEntry {
  id: string;
  name: string;
  gameType: 'No-Limit Texas Hold\'em' | 'Pot-Limit Omaha';
  stakes: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
  playersSeated: number;
  maxSeats: number;
  averagePot: number;
  handsPerHour: number;
  waitlistCount: number;
  isVipTable?: boolean;
  isPrivate?: boolean;
}

