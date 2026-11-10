import React from 'react';
import { Card, Suit } from '@/lib/mock/types';
import { cn } from '@/lib/utils';

export interface PlayingCardProps {
  card: Card;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isHighlight?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SuitIcon: React.FC<{ suit: Suit; className?: string }> = ({ suit, className }) => {
  switch (suit) {
    case 'hearts':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case 'diamonds':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2L3.5 12 12 22l8.5-10L12 2z" />
        </svg>
      );
    case 'spades':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2C9.5 5 4 10 4 14c0 3 2.5 5 5 5 1.5 0 2.5-.5 3-1.5.5 1 1.5 1.5 3 1.5 2.5 0 5-2 5-5 0-4-5.5-9-8-12zm-1 18v2h2v-2h-2z" />
        </svg>
      );
    case 'clubs':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 2a4 4 0 00-4 4c0 .8.2 1.6.7 2.2A4 4 0 005 12a4 4 0 004 4c.7 0 1.4-.2 2-.5V19H9v2h6v-2h-2v-3.5c.6.3 1.3.5 2 .5a4 4 0 004-4 4 4 0 00-3.7-3.8c.5-.6.7-1.4.7-2.2a4 4 0 00-4-4z" />
        </svg>
      );
  }
};

export const PlayingCard: React.FC<PlayingCardProps> = ({
  card,
  size = 'md',
  isHighlight: customHighlight,
  className,
  onClick,
}) => {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const isHighlight = customHighlight ?? card.isHighlight;

  const sizeClasses = {
    xs: 'w-8 h-11 text-[10px] rounded-[3px]',
    sm: 'w-12 h-[68px] text-xs rounded-[4px]',
    md: 'w-16 h-[90px] text-sm rounded-[6px]',
    lg: 'w-20 h-[112px] text-base rounded-[7px]',
    xl: 'w-28 h-[156px] text-xl rounded-[8px]',
  }[size];

  if (card.faceDown) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'relative aspect-card select-none cursor-pointer overflow-hidden transition-all duration-200 shadow-card-float border-2 border-white/90',
          sizeClasses,
          className
        )}
      >
        {/* Intricate European casino card back filigree */}
        <div className="w-full h-full bg-[#0a1628] flex items-center justify-center p-1">
          <div className="w-full h-full border border-gold/40 rounded-[2px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0b1c36] via-[#09152a] to-[#040a14]">
            {/* Symmetrical diamond lattice pattern */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:6px_6px]" />
            <div className="w-6 h-6 rounded-full border border-gold/60 flex items-center justify-center">
              <span className="text-gold font-serif text-[10px] font-bold">MK</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative aspect-card select-none cursor-pointer overflow-hidden transition-all duration-200 shadow-card-float flex flex-col justify-between p-1.5',
        'bg-[#fdfbf7] text-[#1a1d24]', // Ivory linen background
        isHighlight && 'ring-2 ring-gold shadow-glow-gold -translate-y-1',
        sizeClasses,
        className
      )}
    >
      {/* Top Left Rank & Suit */}
      <div className={cn('flex flex-col items-center leading-none font-bold', isRed ? 'text-suit-ruby' : 'text-suit-onyx')}>
        <span className="font-sans tracking-tight">{card.rank}</span>
        <SuitIcon suit={card.suit} className="w-3.5 h-3.5 mt-0.5" />
      </div>

      {/* Center Suit Watermark */}
      <div className={cn('absolute inset-0 flex items-center justify-center pointer-events-none opacity-85', isRed ? 'text-suit-ruby' : 'text-suit-onyx')}>
        <SuitIcon suit={card.suit} className="w-1/2 h-1/2" />
      </div>

      {/* Bottom Right Mirrored Rank & Suit */}
      <div className={cn('flex flex-col items-center leading-none font-bold rotate-180', isRed ? 'text-suit-ruby' : 'text-suit-onyx')}>
        <span className="font-sans tracking-tight">{card.rank}</span>
        <SuitIcon suit={card.suit} className="w-3.5 h-3.5 mt-0.5" />
      </div>

      {/* Linen micro-texture sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

