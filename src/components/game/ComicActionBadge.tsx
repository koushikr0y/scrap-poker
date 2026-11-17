import React from "react";
import { formatCompactChips } from "@/lib/poker";

export interface ComicActionBadgeProps {
  type: "check" | "call" | "raise" | "bet" | "fold" | "allIn" | "thinking";
  amount?: number;
  className?: string;
  size?: "sm" | "md";
}

export const ComicActionBadge: React.FC<ComicActionBadgeProps> = ({
  type,
  amount,
  className = "",
  size = "md",
}) => {
  const isSm = size === "sm";

  switch (type) {
    case "allIn":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-[#b3261e] text-white font-headline-sm uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] -rotate-3 select-none ${
            isSm ? "text-[10px]" : "text-xs"
          } ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping"></span>
          <span>⚡ ALL-IN</span>
          {amount !== undefined && amount > 0 && (
            <span className="font-bold text-yellow-300">
              {formatCompactChips(amount)}
            </span>
          )}
        </div>
      );

    case "raise":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-primary-container text-[#101012] font-headline-sm uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] rotate-2 select-none ${
            isSm ? "text-[10px]" : "text-xs"
          } ${className}`}
        >
          <span>RAISE</span>
          {amount !== undefined && amount > 0 && (
            <span className="font-bold underline decoration-black decoration-2">
              {formatCompactChips(amount)}
            </span>
          )}
        </div>
      );

    case "bet":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-primary-container text-[#101012] font-headline-sm uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] -rotate-1 select-none ${
            isSm ? "text-[10px]" : "text-xs"
          } ${className}`}
        >
          <span>BET</span>
          {amount !== undefined && amount > 0 && (
            <span className="font-bold">{formatCompactChips(amount)}</span>
          )}
        </div>
      );

    case "call":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-secondary text-white font-headline-sm uppercase tracking-wider px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] rotate-1 select-none ${
            isSm ? "text-[10px]" : "text-xs"
          } ${className}`}
        >
          <span>CALL</span>
          {amount !== undefined && amount > 0 && (
            <span className="font-bold">{formatCompactChips(amount)}</span>
          )}
        </div>
      );

    case "check":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-[#1a1a1e] text-[#ffe179] font-headline-sm uppercase tracking-wider px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1 select-none ${
            isSm ? "text-[10px]" : "text-xs"
          } ${className}`}
        >
          <span className="text-secondary font-bold">✓</span>
          <span>CHECK</span>
        </div>
      );

    case "fold":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-[#2a2a2e] text-[#a0a0a8] font-headline-sm uppercase tracking-wider px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] -rotate-6 select-none opacity-85 ${
            isSm ? "text-[10px]" : "text-xs"
          } ${className}`}
        >
          <span className="text-[#ffb4ab]">✕</span>
          <span>FOLD</span>
        </div>
      );

    case "thinking":
      return (
        <div
          className={`anim-bubble-pop z-30 inline-flex items-center gap-1 bg-surface-container-high text-secondary font-tech uppercase tracking-wider px-2 py-0.5 border border-secondary shadow-[2px_2px_0px_#000] rotate-1 select-none ${
            isSm ? "text-[9px]" : "text-[10px]"
          } ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          <span>THINKING...</span>
        </div>
      );
  }
};
