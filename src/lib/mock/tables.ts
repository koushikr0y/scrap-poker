import { TableState } from './types';
import { MOCK_PLAYERS } from './players';
import { SAMPLE_COMMUNITY_CARDS } from './cards';

export const MOCK_ACTIVE_TABLE: TableState = {
  id: 'tbl-high-roller-01',
  title: 'Monte Carlo Royale - High Roller Suite',
  tableName: 'Table #7 - Salon Privé',
  status: 'river',
  stakes: '$1,000 / $2,000 No-Limit',
  smallBlind: 1000,
  bigBlind: 2000,
  minBuyIn: 100000,
  maxBuyIn: 500000,
  pot: {
    main: 38000,
    sidePots: [
      { amount: 12000, eligiblePlayerIds: ['p-user', 'p-1', 'p-5'] }
    ],
    total: 50000,
  },
  communityCards: SAMPLE_COMMUNITY_CARDS,
  players: MOCK_PLAYERS,
  userSeatIndex: 0,
  currentTurnSeatIndex: 0, // User's turn
  callAmount: 4000,
  minRaiseAmount: 8000,
  maxRaiseAmount: 125000, // Max is user's stack
  handNumber: 4829,
  handRankSummary: 'Straight, Ace-High (to the King)',
};

