import { Card } from './types';

export const SAMPLE_COMMUNITY_CARDS: Card[] = [
  { id: 'c1', rank: 'A', suit: 'spades', isHighlight: true },
  { id: 'c2', rank: 'K', suit: 'spades', isHighlight: true },
  { id: 'c3', rank: 'Q', suit: 'spades', isHighlight: true },
  { id: 'c4', rank: 'J', suit: 'spades', isHighlight: true },
  { id: 'c5', rank: '10', suit: 'hearts' },
];

export const SAMPLE_USER_HOLE_CARDS: [Card, Card] = [
  { id: 'h1', rank: '10', suit: 'spades', isHighlight: true },
  { id: 'h2', rank: 'A', suit: 'hearts' },
];

export const SAMPLE_OPPONENT_CARDS: [Card, Card] = [
  { id: 'op1', rank: 'K', suit: 'hearts', faceDown: true },
  { id: 'op2', rank: 'K', suit: 'diamonds', faceDown: true },
];

export const SAMPLE_REVEALED_POCKET_ACES: [Card, Card] = [
  { id: 'pa1', rank: 'A', suit: 'diamonds' },
  { id: 'pa2', rank: 'A', suit: 'clubs' },
];

