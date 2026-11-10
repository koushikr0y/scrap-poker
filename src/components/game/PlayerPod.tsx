import React from 'react';
import { Player } from '@/lib/mock/types';
import { PlayingCard } from './PlayingCard';
import { cn, formatCurrency } from '@/lib/utils';

export interface PlayerPodProps {
  player: Player;
  showHoleCards?: boolean;
  className?: string;
  onClick?: () => void;
}

export const PlayerPod: React.FC<PlayerPodProps> = ({
  player,
  showHoleCards = true,
  className,
  onClick,
}) => {
  const isUrgent = player.timeRemaining !== undefined && player.timeRemaining <= 5;
  const progressRatio = player.timeRemaining !== undefined && player.totalTime
    ? Math.max(0, Math.min(1, player.timeRemaining / player.totalTime))
    : 0;

  // SVG circular timer circumference: r = 38 => 2 * pi * 38 = 238.76
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center select-none transition-all duration-300',
        player.isFolded && 'opacity-40 grayscale pointer-events-none',
        className
      )}
    >
      {/* Dealer / Position Button Puck */}
      {player.position && (
        <div
          className={cn(
            'absolute -top-2 -right-1 z-20 w-6 h-6 rounded-full border border-white/60 shadow-md flex items-center justify-center font-bold text-[10px] tracking-tight',
            player.isDealer
              ? 'bg-gradient-to-b from-white to-gray-200 text-[#0b0f17] border-gold'
              : 'bg-[#181c24] text-gold-highlight border-gold/40'
          )}
        >
          {player.position}
        </div>
      )}

      {/* Main Avatar Pod with 360 SVG Timer Ring */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* SVG Timer Track & Indicator */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 88 88">
          {/* Base background track */}
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3.5"
          />
          {/* Depleting countdown ring */}
          {player.isCurrentTurn && (
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke={isUrgent ? '#ff4d4d' : '#d4af37'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                'transition-all duration-1000 ease-linear',
                isUrgent ? 'drop-shadow-[0_0_8px_#ff4d4d]' : 'drop-shadow-[0_0_8px_#d4af37]'
              )}
            />
          )}
        </svg>

        {/* Circular Avatar */}
        <div
          className={cn(
            'w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 relative shadow-card-float',
            player.isCurrentTurn
              ? isUrgent
                ? 'border-game-allIn shadow-glow-crimson'
                : 'border-gold shadow-glow-gold'
              : 'border-white/20'
          )}
        >
          <img
            src={player.avatarUrl}
            alt={player.name}
            className="w-full h-full object-cover"
          />
          {/* Timer readout overlay on avatar in urgent mode */}
          {player.isCurrentTurn && player.timeRemaining !== undefined && (
            <div
              className={cn(
                'absolute bottom-0 inset-x-0 text-center font-tabular text-[10px] font-extrabold py-0.5',
                isUrgent ? 'bg-game-allIn text-white animate-pulse' : 'bg-gold/90 text-[#0b0f17]'
              )}
            >
              {player.timeRemaining}s
            </div>
          )}
        </div>
      </div>

      {/* Player Identity & Chip Stack Glass HUD */}
      <div className="mt-1 flex flex-col items-center bg-[#121620]/90 border border-gold/30 rounded-DEFAULT px-3 py-1 shadow-card-float backdrop-blur-md min-w-[110px] text-center">
        {/* Name and VIP badge */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-white truncate max-w-[85px]">
            {player.name}
          </span>
          {player.vipTier && (
            <span
              title={`VIP Tier: ${player.vipTier}`}
              className="w-2 h-2 rounded-full bg-gold inline-block shrink-0 shadow-[0_0_5px_#d4af37]"
            />
          )}
        </div>

        {/* Stack Size */}
        <span className="font-tabular font-extrabold text-gold-bright text-xs">
          {formatCurrency(player.stack)}
        </span>

        {/* Action / Hand Rank Status Callout */}
        {player.lastAction && (
          <div className="mt-0.5 text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-white/10 text-gold-highlight tracking-wider">
            {player.lastAction.type} {player.lastAction.amount ? `$${player.lastAction.amount.toLocaleString()}` : ''}
          </div>
        )}
      </div>

      {/* Hole Cards Display (Folded / Active) */}
      {showHoleCards && player.cards && (
        <div className="mt-1 flex -space-x-3 items-center justify-center">
          <PlayingCard card={player.cards[0]} size="xs" />
          <PlayingCard card={player.cards[1]} size="xs" />
        </div>
      )}

      {/* Hand Rank Description Pill (for active user) */}
      {player.handRankDescription && (
        <div className="mt-1 bg-felt-secondaryContainer/90 border border-felt-secondary/40 text-felt-onSecondaryContainer text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-md whitespace-nowrap">
          {player.handRankDescription}
        </div>
      )}
    </div>
  );
};

