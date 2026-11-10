import React from 'react';
import { cn, formatCompactNumber } from '@/lib/utils';

export interface ChipStackProps {
  amount: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ChipDenom {
  value: number;
  bgGradient: string;
  borderColor: string;
  stripeColor: string;
  textColor: string;
}

const DENOMINATIONS: ChipDenom[] = [
  { value: 25000, bgGradient: 'from-[#0b0f17] to-[#1e2638]', borderColor: '#d4af37', stripeColor: '#f2ca50', textColor: '#fdf0cd' }, // $25K Obsidian Gold
  { value: 5000, bgGradient: 'from-[#690005] to-[#93000a]', borderColor: '#ffdad6', stripeColor: '#ffb4ab', textColor: '#ffffff' },   // $5K Crimson
  { value: 1000, bgGradient: 'from-[#554300] to-[#d4af37]', borderColor: '#ffe088', stripeColor: '#3c2f00', textColor: '#241a00' },   // $1K Bullion Gold
  { value: 500, bgGradient: 'from-[#4a154b] to-[#7b1fa2]', borderColor: '#e1bee7', stripeColor: '#ffffff', textColor: '#ffffff' },    // $500 Purple
  { value: 100, bgGradient: 'from-[#121212] to-[#2b2b2b]', borderColor: '#ffffff', stripeColor: '#d4af37', textColor: '#ffffff' },    // $100 Black
  { value: 25, bgGradient: 'from-[#004d40] to-[#00796b]', borderColor: '#80cbc4', stripeColor: '#ffffff', textColor: '#ffffff' },     // $25 Forest
];

function getChipDistribution(amount: number): ChipDenom[] {
  let remaining = amount;
  const chips: ChipDenom[] = [];

  for (const denom of DENOMINATIONS) {
    const count = Math.floor(remaining / denom.value);
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        chips.push(denom);
      }
      remaining %= denom.value;
    }
  }

  // Fallback at least 1 chip
  if (chips.length === 0) {
    chips.push(DENOMINATIONS[DENOMINATIONS.length - 1]);
  }

  return chips.slice(0, 5); // Limit visual stack to 5 chips
}

export const ChipStack: React.FC<ChipStackProps> = ({
  amount,
  showLabel = true,
  size = 'md',
  className,
}) => {
  const chips = getChipDistribution(amount);

  const sizeConfig = {
    sm: { diameter: 'w-6 h-6', stackHeight: 'h-8', offset: 3, labelSize: 'text-[10px]' },
    md: { diameter: 'w-8 h-8', stackHeight: 'h-11', offset: 4, labelSize: 'text-xs' },
    lg: { diameter: 'w-10 h-10', stackHeight: 'h-14', offset: 5, labelSize: 'text-sm' },
  }[size];

  return (
    <div className={cn('inline-flex flex-col items-center justify-end select-none', className)}>
      {/* 3D Stacked Isometric Chips */}
      <div className={cn('relative flex items-center justify-center', sizeConfig.stackHeight, sizeConfig.diameter)}>
        {chips.map((chip, index) => {
          const bottomOffset = index * sizeConfig.offset;
          return (
            <div
              key={index}
              style={{ bottom: `${bottomOffset}px` }}
              className={cn(
                'absolute rounded-full border-2 shadow-[0_2px_4px_rgba(0,0,0,0.7)] flex items-center justify-center bg-gradient-to-br',
                sizeConfig.diameter,
                chip.bgGradient
              )}
            >
              {/* Notched outer casino edge stripes */}
              <div
                className="absolute inset-0 rounded-full border border-dashed opacity-70 pointer-events-none"
                style={{ borderColor: chip.stripeColor }}
              />
              {/* Inner ring */}
              <div
                className="w-1/2 h-1/2 rounded-full border flex items-center justify-center opacity-85"
                style={{ borderColor: chip.borderColor }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Aggregate Amount Pill */}
      {showLabel && (
        <div className="mt-1 bg-[#0b0f17]/90 border border-gold/40 px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-0.5">
          <span className="text-gold-bright text-[10px] font-bold">$</span>
          <span className={cn('font-tabular font-bold text-white', sizeConfig.labelSize)}>
            {amount >= 10000 ? formatCompactNumber(amount) : amount.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

