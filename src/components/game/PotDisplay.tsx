import React from 'react';
import { Pot } from '@/lib/mock/types';
import { ChipStack } from './ChipStack';
import { cn, formatCurrency } from '@/lib/utils';

export interface PotDisplayProps {
  pot: Pot;
  className?: string;
}

export const PotDisplay: React.FC<PotDisplayProps> = ({ pot, className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center select-none', className)}>
      {/* 3D Stack of visual chips in pot center */}
      <ChipStack amount={pot.total} showLabel={false} size="lg" className="mb-2" />

      {/* Pill-shaped glass container hovered above table center */}
      <div className="relative bg-[#121620]/90 border border-gold/40 rounded-full px-6 py-2 shadow-modal-deep backdrop-blur-md flex flex-col items-center">
        {/* Top Glint Bar */}
        <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-text-variant font-bold uppercase tracking-widest">
            Total Pot
          </span>
          <span className="font-editorial text-2xl font-bold text-gold-bright font-tabular">
            {formatCurrency(pot.total)}
          </span>
        </div>

        {/* Side Pots breakdown if any */}
        {pot.sidePots && pot.sidePots.length > 0 && (
          <div className="mt-0.5 flex items-center gap-3 text-[10px] text-gold-highlight/80 font-tabular font-semibold">
            <span>Main: {formatCurrency(pot.main)}</span>
            {pot.sidePots.map((side, idx) => (
              <span key={idx}>Side {idx + 1}: {formatCurrency(side.amount)}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

