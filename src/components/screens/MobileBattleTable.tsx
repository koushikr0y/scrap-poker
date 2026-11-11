import React, { useState } from "react";

export interface MobileTableCard {
  rank: string;
  suit: string;
  colorClass: string;
  rotateClass: string;
  rankSizeClass: string;
  centerSuitSizeClass: string;
}

export interface MobileBattleTableProps {
  tableLabel?: string;
  blindsLabel?: string;
  playerBankroll?: string;
  heroName?: string;
  heroStack?: string;
  heroCurrentBet?: string;
  potAmount?: string;
  streetLabel?: string;
  handSummary?: string;
  equityPercent?: string;
  minBet?: number;
  maxBet?: number;
  initialBet?: number;
  callAmount?: number;
  communityCards?: MobileTableCard[];
  heroCards?: MobileTableCard[];
  onExitTable?: () => void;
  onNavigateToRankings?: () => void;
  onAction?: (action: "fold" | "call" | "raise", amount?: number) => void;
}

const DEFAULT_COMMUNITY_CARDS: MobileTableCard[] = [
  {
    rank: "A",
    suit: "♠",
    colorClass: "text-on-surface",
    rotateClass: "-rotate-1",
    rankSizeClass: "text-[13px]",
    centerSuitSizeClass: "text-[13px]",
  },
  {
    rank: "K",
    suit: "♠",
    colorClass: "text-on-surface",
    rotateClass: "rotate-1",
    rankSizeClass: "text-[13px]",
    centerSuitSizeClass: "text-[13px]",
  },
  {
    rank: "Q",
    suit: "♠",
    colorClass: "text-on-surface",
    rotateClass: "-rotate-1",
    rankSizeClass: "text-[13px]",
    centerSuitSizeClass: "text-[13px]",
  },
  {
    rank: "10",
    suit: "♦",
    colorClass: "text-secondary-container",
    rotateClass: "rotate-0",
    rankSizeClass: "text-[12px]",
    centerSuitSizeClass: "text-[12px]",
  },
  {
    rank: "2",
    suit: "♣",
    colorClass: "text-on-secondary",
    rotateClass: "rotate-2",
    rankSizeClass: "text-[13px]",
    centerSuitSizeClass: "text-[13px]",
  },
];

const DEFAULT_HERO_CARDS: MobileTableCard[] = [
  {
    rank: "J",
    suit: "♠",
    colorClass: "text-on-surface",
    rotateClass: "-rotate-6",
    rankSizeClass: "text-[16px]",
    centerSuitSizeClass: "text-[16px]",
  },
  {
    rank: "A",
    suit: "♦",
    colorClass: "text-secondary-container",
    rotateClass: "rotate-6",
    rankSizeClass: "text-[16px]",
    centerSuitSizeClass: "text-[16px]",
  },
];

interface RaisePreset {
  label: string;
  value: number;
  className: string;
  textClassName: string;
}

const RAISE_PRESETS: RaisePreset[] = [
  {
    label: "½ POT",
    value: 14200,
    className: "bg-surface-container-high hover:bg-surface-container-highest",
    textClassName: "text-on-surface",
  },
  {
    label: "POT (28K)",
    value: 28400,
    className: "bg-surface-container-high hover:bg-surface-container-highest",
    textClassName: "text-primary",
  },
  {
    label: "2× POT",
    value: 42600,
    className: "bg-surface-container-high hover:bg-surface-container-highest",
    textClassName: "text-on-surface",
  },
  {
    label: "ALL-IN",
    value: 55400,
    className: "bg-error-container text-on-error-container -rotate-1",
    textClassName: "tracking-tight",
  },
];

export const MobileBattleTable: React.FC<MobileBattleTableProps> = ({
  tableLabel = "#07 HIGH STAKES",
  blindsLabel = "BLINDS: 500 / 1,000",
  playerBankroll = "$124.5K",
  heroName = "Bolt_Runner_99",
  heroStack = "450,200",
  heroCurrentBet = "CURRENT BET: 4,200",
  potAmount = "POT: 28,400",
  streetLabel = "★ RIVER · 5TH STREET ★",
  handSummary = "ROYAL FLUSH DRAW · 9 OUTS",
  equityPercent = "34.8% EQ",
  minBet = 4200,
  maxBet = 55400,
  initialBet = 8400,
  callAmount = 4200,
  communityCards = DEFAULT_COMMUNITY_CARDS,
  heroCards = DEFAULT_HERO_CARDS,
  onExitTable,
  onNavigateToRankings,
  onAction,
}) => {
  const [currentBet, setCurrentBet] = useState<number>(initialBet);
  const [showRaiseDrawer, setShowRaiseDrawer] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(false);

  const clampBet = (val: number) => Math.max(minBet, Math.min(maxBet, val));

  const handleAdjustBet = (delta: number) => {
    setCurrentBet((prev) => clampBet(prev + delta));
  };

  return (
    <div
      className="bg-surface text-on-surface flex flex-col min-h-screen"
      style={{
        backgroundColor: "#131315",
        backgroundImage: "radial-gradient(#353437 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      }}
    >
      {/* Top Sticky Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <div className="h-16 px-margin-mobile flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <button
              className="w-11 h-11 flex items-center justify-center bg-surface-container hover:bg-surface-container-high rounded text-on-surface transition-transform active:scale-95 cursor-pointer"
              onClick={() => onExitTable?.()}
              title="Exit Table"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex flex-col ml-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase px-space-xs -rotate-1 leading-none">
                  SCRAP
                </span>
                <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-bold">
                  {tableLabel}
                </span>
              </div>
              <span className="font-label-md text-label-md text-primary font-bold tracking-wide">
                {blindsLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-xs">
            <div className="flex items-center gap-space-xs bg-surface-container-highest px-space-sm py-1 rounded shadow-[2px_2px_0px_#000000] rotate-1">
              <span className="material-symbols-outlined text-primary-container text-[18px]">
                toll
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none">
                {playerBankroll}
              </span>
            </div>
            <button
              className="w-11 h-11 flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-on-surface rounded cursor-pointer"
              onClick={() => setMuted((m) => !m)}
              title="Sound"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {muted ? "volume_off" : "volume_up"}
              </span>
            </button>
            <button
              className="w-11 h-11 flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-on-surface rounded cursor-pointer"
              title="Settings"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[1px_1px_0px_#000000]">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full relative select-none pb-2">
          {/* TOP UTILITY / QUICK HUD DRAWER STRIP */}
          <div className="flex items-center justify-between px-margin-mobile py-space-xs gap-space-xs z-20">
            <div className="flex items-center gap-space-xs">
              <button
                className="bg-surface-container-high hover:bg-surface-container-highest px-space-sm py-1 shadow-[2px_2px_0px_#000000] -rotate-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform flex items-center gap-1 cursor-pointer"
                id="btnRankings"
                onClick={() => onNavigateToRankings?.()}
                type="button"
              >
                <span className="material-symbols-outlined text-secondary text-[15px]">
                  style
                </span>
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                  RANKINGS ?
                </span>
              </button>
              <button
                className="bg-surface-container-high hover:bg-surface-container-highest px-space-sm py-1 shadow-[2px_2px_0px_#000000] rotate-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-primary-container text-[15px]">
                  forum
                </span>
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                  LOG (3)
                </span>
              </button>
            </div>
            <div className="flex items-center gap-space-xs">
              <button
                className="bg-surface-container-high hover:bg-surface-container-highest px-space-sm py-1 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[15px]">
                  analytics
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  STATS
                </span>
              </button>
              <div className="bg-error-container text-on-error-container px-2 py-0.5 font-label-sm text-label-sm tracking-widest uppercase flex items-center gap-1 shadow-[1px_1px_0px_#000000]">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                LIVE
              </div>
            </div>
          </div>

          {/* TABLE FELT CANVAS */}
          <div className="relative w-full px-1.5 mt-0.5 mb-2">
            {/* Outer Comic Felt Panel */}
            <div className="relative w-full bg-surface-container-lowest rounded-xl shadow-[4px_4px_0px_#000000] overflow-hidden pt-2 pb-3 px-2">
              {/* Halftone Ambient Background Grid Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#ffe179 1.5px, transparent 1.5px)",
                  backgroundSize: "10px 10px",
                }}
              ></div>

              {/* Top Seat Ring (Seats 1, 2, 3) */}
              <div className="grid grid-cols-3 gap-1 relative z-10 mb-2">
                {/* SEAT 1: RUST BUCKET (FOLDED) */}
                <div className="flex flex-col items-center opacity-40 transform -rotate-1">
                  <div className="relative w-11 h-11 bg-surface-container rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-on-surface-variant text-[24px]">
                      smart_toy
                    </span>
                    <div className="absolute inset-0 bg-surface-dim/80 flex items-center justify-center">
                      <span className="font-headline-sm text-[10px] text-error uppercase tracking-tighter -rotate-12 bg-surface-container-lowest px-1 shadow-[1px_1px_0px_#000]">
                        FOLD
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase truncate max-w-[70px] mt-0.5">
                    Rust_Bkt
                  </span>
                  <span className="font-label-sm text-[10px] text-outline tracking-tight leading-none">
                    120.4K
                  </span>
                </div>

                {/* SEAT 2: NEON JACK (DEALER / ACTIVE BET) */}
                <div className="flex flex-col items-center relative transform rotate-0">
                  <div className="relative w-12 h-12 bg-secondary-container rounded-lg shadow-[3px_3px_0px_#000000] flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container text-[28px]">
                      android
                    </span>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-[11px] flex items-center justify-center shadow-[1px_1px_0px_#000000] rotate-6">
                      D
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase truncate max-w-[80px] mt-0.5">
                    Neon_Jack
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface tracking-tight">
                    84.2K
                  </span>
                  <div className="bg-surface-container-highest px-1.5 shadow-[1px_1px_0px_#000000] -rotate-1 mt-0.5 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-secondary text-[10px]">
                      toll
                    </span>
                    <span className="font-headline-sm text-[11px] text-secondary">
                      2,000
                    </span>
                  </div>
                </div>

                {/* SEAT 3: CYBER VIPER (ALL-IN!) */}
                <div className="flex flex-col items-center relative transform rotate-1">
                  <div className="relative w-11 h-11 bg-surface-container-high rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">
                      skull
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface uppercase truncate max-w-[70px] mt-0.5">
                    Viper_X
                  </span>
                  <div className="bg-error-container text-on-error-container px-1 py-0.5 font-headline-sm text-[9px] uppercase tracking-tighter -rotate-6 shadow-[2px_2px_0px_#000000] mt-0.5">
                    ALL-IN 55K
                  </div>
                </div>
              </div>

              {/* Mid Seat Ring + Center Felt Street */}
              <div className="grid grid-cols-12 gap-1 items-center relative z-10 my-1">
                {/* SEAT 4: MAD RAM (Mid Left) */}
                <div className="col-span-3 flex flex-col items-start transform -rotate-1 pl-1">
                  <div className="relative w-11 h-11 bg-surface-container-high rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container text-[24px]">
                      hardware
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface uppercase font-bold truncate max-w-[65px] mt-0.5">
                    Mad_Ram
                  </span>
                  <span className="font-label-sm text-[10px] text-outline">
                    310.0K
                  </span>
                  <div className="bg-surface-container-highest px-1 shadow-[1px_1px_0px_#000000] mt-0.5 flex items-center gap-0.5">
                    <span className="font-headline-sm text-[11px] text-primary">
                      4,200
                    </span>
                  </div>
                </div>

                {/* CENTER FELT: STREET & POT & RIVER COMMUNITY CARDS */}
                <div className="col-span-6 flex flex-col items-center justify-center">
                  <div className="bg-surface-container-high px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#000000] -rotate-1 mb-1">
                    <span className="font-label-sm text-[9px] text-secondary tracking-widest font-extrabold uppercase">
                      {streetLabel}
                    </span>
                  </div>
                  <div className="relative bg-primary-container text-on-primary-container px-3 py-1 rounded shadow-[3px_3px_0px_#000000] rotate-1 mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      monetization_on
                    </span>
                    <span className="font-headline-sm text-headline-sm uppercase tracking-wide leading-none">
                      {potAmount}
                    </span>
                  </div>

                  {/* FIVE COMMUNITY CARDS */}
                  <div className="flex items-center justify-center gap-1 w-full">
                    {communityCards.map((card, idx) => (
                      <div
                        key={idx}
                        className={`w-[30px] h-[46px] bg-primary rounded shadow-[2px_2px_0px_#000000] flex flex-col justify-between p-0.5 ${card.rotateClass} select-none`}
                      >
                        <div className="flex flex-col items-center leading-none">
                          <span
                            className={`font-headline-sm ${card.rankSizeClass} ${card.colorClass} leading-none font-bold`}
                          >
                            {card.rank}
                          </span>
                          <span
                            className={`font-body-sm text-[10px] ${card.colorClass} leading-none -mt-0.5`}
                          >
                            {card.suit}
                          </span>
                        </div>
                        <div className="self-center">
                          <span
                            className={`font-body-sm ${card.centerSuitSizeClass} ${card.colorClass}`}
                          >
                            {card.suit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEAT 5: COGWHEEL (Mid Right - THINKING...) */}
                <div className="col-span-3 flex flex-col items-end transform rotate-1 pr-1">
                  <div className="relative w-11 h-11 bg-surface-container-high rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center overflow-hidden">
                    <span
                      className="material-symbols-outlined text-secondary text-[24px] animate-spin"
                      style={{ animationDuration: "6s" }}
                    >
                      settings
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface uppercase font-bold truncate max-w-[65px] mt-0.5">
                    Cogwheel
                  </span>
                  <span className="font-label-sm text-[10px] text-outline">
                    98.1K
                  </span>
                  <div className="w-14 bg-surface-container-highest h-2 rounded-full overflow-hidden mt-1 shadow-[1px_1px_0px_#000000]">
                    <div className="bg-secondary h-full w-2/3 animate-pulse"></div>
                  </div>
                  <span className="font-label-sm text-[9px] text-secondary uppercase font-bold tracking-tighter">
                    THINKING...
                  </span>
                </div>
              </div>

              {/* HERO / PLAYER ZONE (BOTTOM OF FELT) */}
              <div className="relative z-20 mt-3 pt-2">
                {/* Equity & Hand Strength Ribbon */}
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <div className="bg-surface-container px-2 py-0.5 rounded shadow-[2px_2px_0px_#000000] -rotate-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">
                      auto_awesome
                    </span>
                    <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                      {handSummary}
                    </span>
                  </div>
                  <div className="bg-secondary-container text-on-secondary-container font-headline-sm text-[11px] px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000000] rotate-1">
                    {equityPercent}
                  </div>
                </div>

                {/* Hero Hole Cards + Player Persona Block */}
                <div className="bg-surface-container-high rounded-lg p-2 shadow-[4px_4px_0px_#000000] flex items-center justify-between relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>

                  {/* Hero Identity Stats */}
                  <div className="flex items-center gap-2 pl-2">
                    <div className="relative w-12 h-12 bg-primary-container rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary-container text-[30px]">
                        bolt
                      </span>
                      <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest text-primary font-headline-sm text-[10px] px-1 rounded shadow-[1px_1px_0px_#000]">
                        BB
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide uppercase leading-tight">
                          {heroName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary-container text-[14px]">
                          toll
                        </span>
                        <span className="font-headline-sm text-[16px] text-primary-container leading-none">
                          {heroStack}
                        </span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                          SCRAP
                        </span>
                      </div>
                      <span className="font-label-sm text-[11px] text-secondary font-bold uppercase tracking-tight mt-0.5">
                        {heroCurrentBet}
                      </span>
                    </div>
                  </div>

                  {/* Hero Hole Cards Display */}
                  <div className="flex items-center -space-x-3 pr-1">
                    {heroCards.map((card, idx) => (
                      <div
                        key={idx}
                        className={`w-11 h-16 bg-primary rounded ${
                          idx === 0
                            ? "shadow-[3px_3px_0px_#000000] z-10"
                            : "shadow-[4px_4px_0px_#000000] z-20"
                        } flex flex-col justify-between p-1 ${
                          card.rotateClass
                        } select-none relative transition-transform hover:-translate-y-1`}
                      >
                        <div className="flex flex-col items-center leading-none">
                          <span
                            className={`font-headline-sm ${card.rankSizeClass} ${card.colorClass} leading-none font-bold`}
                          >
                            {card.rank}
                          </span>
                          <span
                            className={`font-body-sm text-[12px] ${card.colorClass} leading-none`}
                          >
                            {card.suit}
                          </span>
                        </div>
                        <div className="self-center pb-0.5">
                          <span
                            className={`font-body-sm ${card.centerSuitSizeClass} ${card.colorClass}`}
                          >
                            {card.suit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE BETTING / RAISE SLIDER PANEL (CUT-PAPER COMIC POP-DRAWER) */}
          {showRaiseDrawer && (
            <div className="px-margin-mobile mb-2" id="raiseDrawer">
              <div className="bg-surface-container rounded-xl p-2.5 shadow-[4px_4px_0px_#000000] relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-primary-container text-on-primary-container font-headline-sm text-[12px] px-1.5 py-0.5 -rotate-1 leading-none uppercase">
                      RAISE SIZER
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                      TARGET BET:
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest px-2 py-0.5 rounded shadow-[2px_2px_0px_#000000] rotate-1">
                    <span
                      className="font-headline-md text-headline-md text-primary-container leading-none"
                      id="betDisplay"
                    >
                      {currentBet.toLocaleString()}
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant ml-0.5 uppercase">
                      SCRAP
                    </span>
                  </div>
                </div>

                {/* Thumb Presets */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {RAISE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      className={`${preset.className} py-1 text-center shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform cursor-pointer`}
                      onClick={() => setCurrentBet(clampBet(preset.value))}
                      type="button"
                    >
                      <span
                        className={`font-label-sm text-label-sm uppercase font-bold ${preset.textClassName}`}
                      >
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Step Stepper & Continuous Slider */}
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 bg-surface-container-highest rounded flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                    onClick={() => handleAdjustBet(-1000)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      remove
                    </span>
                  </button>
                  <div className="flex-1 flex flex-col justify-center px-1">
                    <input
                      className="w-full accent-primary-container cursor-pointer h-2 bg-surface-container-lowest rounded-lg"
                      id="raiseSlider"
                      max={maxBet}
                      min={minBet}
                      onChange={(e) =>
                        setCurrentBet(clampBet(parseInt(e.target.value, 10)))
                      }
                      step={500}
                      type="range"
                      value={currentBet}
                    />
                    <div className="flex justify-between items-center mt-1 text-on-surface-variant font-label-sm text-[10px] uppercase font-bold">
                      <span>MIN: {minBet.toLocaleString()}</span>
                      <span>MAX: {maxBet.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 bg-surface-container-highest rounded flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                    onClick={() => handleAdjustBet(1000)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      add
                    </span>
                  </button>
                </div>

                {/* Action Confirmation Row inside drawer */}
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    className="flex-1 bg-primary-container text-on-primary-container py-2 shadow-[3px_3px_0px_#000000] -rotate-0.5 hover:rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
                    id="btnConfirmRaise"
                    onClick={() => onAction?.("raise", currentBet)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                    <span className="font-headline-sm text-headline-sm uppercase tracking-wide leading-none">
                      CONFIRM RAISE
                    </span>
                  </button>
                  <button
                    className="bg-surface-container-high text-on-surface px-3 py-2 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform flex items-center justify-center cursor-pointer"
                    onClick={() => setShowRaiseDrawer(false)}
                    type="button"
                  >
                    <span className="font-label-md text-label-md uppercase font-bold">
                      CANCEL
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRIMARY ACTION DOCK */}
          <div className="px-margin-mobile z-30">
            <div className="grid grid-cols-3 gap-2">
              {/* ACTION 1: FOLD */}
              <button
                className="bg-error-container text-on-error-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] -rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
                onClick={() => onAction?.("fold")}
                type="button"
              >
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                    close
                  </span>
                  <span className="font-headline-md text-headline-md uppercase tracking-wider leading-none">
                    FOLD
                  </span>
                </div>
                <span className="font-label-sm text-[10px] opacity-80 uppercase tracking-tighter mt-0.5 font-bold">
                  FORFEIT HAND
                </span>
              </button>

              {/* ACTION 2: CALL */}
              <button
                className="bg-secondary-container text-on-secondary-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
                onClick={() => onAction?.("call", callAmount)}
                type="button"
              >
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">
                    check
                  </span>
                  <span className="font-headline-md text-headline-md uppercase tracking-wider leading-none">
                    CALL
                  </span>
                </div>
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-tight text-on-secondary-container mt-0.5">
                  {callAmount.toLocaleString()} SCRAP
                </span>
              </button>

              {/* ACTION 3: RAISE / BET */}
              <button
                className="relative bg-primary-container text-on-primary-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
                onClick={() => setShowRaiseDrawer((prev) => !prev)}
                type="button"
              >
                <span className="absolute -top-2.5 -right-1 bg-tertiary-container text-on-tertiary-container font-headline-sm text-[10px] px-1.5 py-[1px] rounded shadow-[2px_2px_0px_#000000] rotate-12 uppercase leading-none">
                  HOT!
                </span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] group-hover:-translate-y-0.5 transition-transform">
                    arrow_upward
                  </span>
                  <span className="font-headline-md text-headline-md uppercase tracking-wider leading-none">
                    RAISE
                  </span>
                </div>
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-tight text-on-primary-container mt-0.5">
                  TO {currentBet.toLocaleString()}+
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
