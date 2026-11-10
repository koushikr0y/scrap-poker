import React from 'react';
import { Button } from '../ui/Button';
import { cn, formatCurrency } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

export interface BettingSliderProps {
  currentBet: number;
  minBet: number;
  maxBet: number;
  potSize: number;
  onBetChange: (newBet: number) => void;
  className?: string;
}

export const BettingSlider: React.FC<BettingSliderProps> = ({
  currentBet,
  minBet,
  maxBet,
  potSize,
  onBetChange,
  className,
}) => {
  const step = Math.max(100, Math.round(minBet / 2));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBetChange(Number(e.target.value));
  };

  const handleIncrement = (amount: number) => {
    const next = Math.max(minBet, Math.min(maxBet, currentBet + amount));
    onBetChange(next);
  };

  const setPreset = (type: 'min' | '33' | '50' | 'pot' | 'max') => {
    switch (type) {
      case 'min':
        onBetChange(minBet);
        break;
      case '33':
        onBetChange(Math.max(minBet, Math.min(maxBet, Math.round(potSize * 0.33))));
        break;
      case '50':
        onBetChange(Math.max(minBet, Math.min(maxBet, Math.round(potSize * 0.5))));
        break;
      case 'pot':
        onBetChange(Math.max(minBet, Math.min(maxBet, potSize)));
        break;
      case 'max':
        onBetChange(maxBet);
        break;
    }
  };

  return (
    <div className={cn('flex flex-col gap-3 p-4 bg-[#121620]/95 border border-gold/30 rounded-md shadow-card-float backdrop-blur-md', className)}>
      {/* Top Presets Row (Tactile Pills) */}
      <div className="flex items-center justify-between gap-1.5">
        <Button variant="pill" label="MIN" size="sm" onClick={() => setPreset('min')} />
        <Button variant="pill" label="33% POT" size="sm" onClick={() => setPreset('33')} />
        <Button variant="pill" label="50% POT" size="sm" onClick={() => setPreset('50')} />
        <Button variant="pill" label="POT" size="sm" onClick={() => setPreset('pot')} />
        <Button variant="pill" label="MAX (ALL-IN)" size="sm" onClick={() => setPreset('max')} className="text-game-allIn border-game-allIn/40 hover:border-game-allIn" />
      </div>

      {/* Numerical Bet Display & Steppers */}
      <div className="flex items-center justify-between gap-3 bg-[#0a0e16]/80 border border-white/10 rounded-DEFAULT px-3 py-2">
        <button
          type="button"
          onClick={() => handleIncrement(-step)}
          disabled={currentBet <= minBet}
          className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] text-text-variant uppercase tracking-wider font-semibold">
            Raise Amount
          </span>
          <span className="font-tabular text-xl font-extrabold text-gold-bright tracking-tight">
            {formatCurrency(currentBet)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleIncrement(step)}
          disabled={currentBet >= maxBet}
          className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tactile Slider Track */}
      <div className="relative flex items-center py-1">
        <input
          type="range"
          min={minBet}
          max={maxBet}
          step={step}
          value={currentBet}
          onChange={handleSliderChange}
          className="w-full h-2 bg-[#1c2028] rounded-full appearance-none cursor-pointer accent-gold border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      {/* Min & Max Labels */}
      <div className="flex justify-between items-center text-[10px] text-text-variant font-tabular font-medium">
        <span>Min: {formatCurrency(minBet)}</span>
        <span>Max: {formatCurrency(maxBet)}</span>
      </div>
    </div>
  );
};

