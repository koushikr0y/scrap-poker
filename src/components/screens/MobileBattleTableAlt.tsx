import React, { useState } from "react";
import type { MobileTableCard } from "./MobileBattleTable";

export interface MobileBattleTableAltProps {
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

const DEFAULT_ALT_COMMUNITY_CARDS: MobileTableCard[] = [
  {
    rank: "A",
    suit: "♠",
    colorClass: "text-[#101012]",
    rotateClass: "-rotate-2",
    rankSizeClass: "text-[16px] sm:text-[18px]",
    centerSuitSizeClass: "text-[16px] sm:text-[18px]",
  },
  {
    rank: "K",
    suit: "♠",
    colorClass: "text-[#101012]",
    rotateClass: "rotate-1",
    rankSizeClass: "text-[16px] sm:text-[18px]",
    centerSuitSizeClass: "text-[16px] sm:text-[18px]",
  },
  {
    rank: "Q",
    suit: "♠",
    colorClass: "text-[#101012]",
    rotateClass: "-rotate-1",
    rankSizeClass: "text-[16px] sm:text-[18px]",
    centerSuitSizeClass: "text-[16px] sm:text-[18px]",
  },
  {
    rank: "10",
    suit: "♦",
    colorClass: "text-[#009ccc]",
    rotateClass: "rotate-1",
    rankSizeClass: "text-[15px] sm:text-[17px]",
    centerSuitSizeClass: "text-[15px] sm:text-[17px]",
  },
  {
    rank: "2",
    suit: "♣",
    colorClass: "text-[#2e7d32]",
    rotateClass: "rotate-2",
    rankSizeClass: "text-[16px] sm:text-[18px]",
    centerSuitSizeClass: "text-[16px] sm:text-[18px]",
  },
];

const DEFAULT_ALT_HERO_CARDS: MobileTableCard[] = [
  {
    rank: "J",
    suit: "♠",
    colorClass: "text-[#101012]",
    rotateClass: "",
    rankSizeClass: "text-[20px]",
    centerSuitSizeClass: "text-[22px]",
  },
  {
    rank: "A",
    suit: "♦",
    colorClass: "text-[#009ccc]",
    rotateClass: "",
    rankSizeClass: "text-[20px]",
    centerSuitSizeClass: "text-[22px]",
  },
];

const ALT_RAISE_PRESETS = [
  {
    label: "½ POT",
    value: 14200,
    buttonClass:
      "bg-surface-container hover:bg-surface-container-highest text-on-surface",
  },
  {
    label: "POT (28K)",
    value: 28400,
    buttonClass:
      "bg-surface-container hover:bg-surface-container-highest text-primary-fixed",
  },
  {
    label: "2× POT",
    value: 42600,
    buttonClass:
      "bg-surface-container hover:bg-surface-container-highest text-on-surface",
  },
  {
    label: "ALL-IN",
    value: 55400,
    buttonClass: "bg-[#d9453a] text-white -rotate-1 tracking-tight",
  },
];

export const MobileBattleTableAlt: React.FC<MobileBattleTableAltProps> = ({
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
  communityCards = DEFAULT_ALT_COMMUNITY_CARDS,
  heroCards = DEFAULT_ALT_HERO_CARDS,
  onExitTable,
  onNavigateToRankings,
  onAction,
}) => {
  const [currentBet, setCurrentBet] = useState<number>(initialBet);
  const [isRaiseOpen, setIsRaiseOpen] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);

  const clampBet = (val: number) => Math.max(minBet, Math.min(maxBet, val));

  const adjustBet = (delta: number) => {
    setCurrentBet((prev) => clampBet(prev + delta));
  };

  const confirmRaise = () => {
    onAction?.("raise", currentBet);
    setIsRaiseOpen(false);
  };

  return (
    <div
      className="mobile-alt-shell bg-surface text-on-surface h-[100dvh] flex flex-col justify-between overflow-hidden relative select-none"
      style={{
        backgroundColor: "#131315",
        backgroundImage: "radial-gradient(#353437 1.5px, transparent 1.5px)",
        backgroundSize: "10px 10px",
      }}
    >
      {/* TOP HEADER (SCRAP TITLE + BLINDS + BANKROLL) */}
      <header className="w-full z-30 pt-safe px-3 flex-shrink-0">
        <div className="h-12 bg-surface-container/95 comic-border rounded-lg comic-shadow px-2.5 flex items-center justify-between backdrop-blur-md">
          {/* Exit Button & Table Info */}
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center bg-surface-container-high comic-border rounded text-on-surface hover:bg-surface-container-highest active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
              onClick={() => onExitTable?.()}
              title="Exit Table"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="bg-primary-container text-[#101012] font-headline-sm text-[12px] uppercase px-1 -rotate-1 comic-border border-[2px]">
                  SCRAP
                </span>
                <span className="font-label-sm text-[11px] tracking-wider uppercase text-on-surface-variant font-bold">
                  {tableLabel}
                </span>
              </div>
              <span className="font-label-md text-[13px] text-primary-fixed font-bold tracking-wide mt-0.5">
                {blindsLabel}
              </span>
            </div>
          </div>

          {/* Bankroll & Quick Controls */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-surface-container-lowest comic-border px-2 py-0.5 rounded rotate-1">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                toll
              </span>
              <span className="font-headline-sm text-[15px] text-primary-container tracking-wide leading-none">
                {playerBankroll}
              </span>
            </div>
            <button
              className="w-7 h-7 flex items-center justify-center bg-surface-container-high text-on-surface-variant rounded comic-border cursor-pointer"
              onClick={() => setMuted((m) => !m)}
              title="Sound"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {muted ? "volume_off" : "volume_up"}
              </span>
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center bg-surface-container-high text-on-surface-variant rounded comic-border cursor-pointer"
              title="Settings"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
            <div className="w-7 h-7 rounded-full bg-primary-container comic-border flex items-center justify-center">
              <span className="material-symbols-outlined text-[#101012] text-[16px]">
                person
              </span>
            </div>
          </div>
        </div>

        {/* HUD DRAWER STRIP (RANKINGS, LOG, STATS, LIVE) */}
        <div className="flex items-center justify-between mt-1 px-0.5">
          <div className="flex items-center gap-1.5">
            <button
              className="bg-surface-container-high px-2 py-0.5 comic-border comic-shadow -rotate-1 active:translate-x-0.5 active:translate-y-0.5 transition-transform flex items-center gap-1 rounded cursor-pointer"
              onClick={() => onNavigateToRankings?.()}
              type="button"
            >
              <span className="material-symbols-outlined text-secondary text-[13px]">
                style
              </span>
              <span className="font-label-sm text-[11px] text-on-surface uppercase tracking-wider font-bold">
                RANKINGS ?
              </span>
            </button>
            <button
              className="bg-surface-container-high px-2 py-0.5 comic-border comic-shadow rotate-1 active:translate-x-0.5 active:translate-y-0.5 transition-transform flex items-center gap-1 rounded cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-primary-container text-[13px]">
                forum
              </span>
              <span className="font-label-sm text-[11px] text-on-surface uppercase tracking-wider font-bold">
                LOG (3)
              </span>
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="bg-surface-container-high px-2 py-0.5 comic-border comic-shadow active:translate-x-0.5 active:translate-y-0.5 transition-transform flex items-center gap-1 rounded cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[13px]">
                analytics
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                STATS
              </span>
            </button>
            <div className="bg-[#d9453a] text-white px-2 py-0.5 comic-border font-label-sm text-[11px] tracking-widest uppercase flex items-center gap-1 comic-shadow rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              LIVE
            </div>
          </div>
        </div>
      </header>

      {/* POKER TABLE SURFACE (EXPANDED TO OCCUPY VERTICAL VIEWPORT) */}
      <main className="flex-1 flex flex-col justify-between px-2.5 py-1 min-h-0 relative z-10">
        <div className="relative w-full h-full bg-surface-container-lowest comic-border-thick rounded-2xl comic-shadow-lg p-2.5 flex flex-col justify-between overflow-hidden">
          {/* Halftone Ambient Background Dot Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#ffe179 2px, transparent 2px)",
              backgroundSize: "12px 12px",
            }}
          ></div>

          {/* TOP SEATS ROW: Rust Bucket, Neon Jack, Viper X */}
          <div className="grid grid-cols-3 gap-1 relative z-10 pt-1">
            {/* SEAT 1: RUST BUCKET (FOLDED) */}
            <div className="flex flex-col items-center opacity-40 -rotate-2">
              <div className="relative w-12 h-12 bg-surface-container comic-border rounded-lg comic-shadow flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-on-surface-variant text-[26px]">
                  smart_toy
                </span>
                <div className="absolute inset-0 bg-surface-dim/80 flex items-center justify-center">
                  <span className="font-headline-sm text-[11px] text-[#ffb4ab] uppercase tracking-tight -rotate-12 bg-[#93000a] px-1 comic-border border-[2px]">
                    FOLD
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase truncate max-w-[75px] mt-0.5 font-bold">
                RUST_BKT
              </span>
              <span className="font-label-sm text-[11px] text-outline tracking-tight leading-none font-bold">
                120.4K
              </span>
            </div>

            {/* SEAT 2: NEON JACK (DEALER / ACTIVE BET) */}
            <div className="flex flex-col items-center relative rotate-0">
              <div className="relative w-14 h-14 bg-secondary-container comic-border rounded-xl comic-shadow flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[32px]">
                  android
                </span>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-[#101012] font-headline-sm text-[12px] flex items-center justify-center comic-border border-[2px] comic-shadow rotate-6">
                  D
                </div>
              </div>
              <span className="font-label-md text-[13px] text-secondary font-extrabold uppercase truncate max-w-[85px] mt-0.5">
                NEON_JACK
              </span>
              <span className="font-label-sm text-[12px] text-on-surface tracking-tight font-bold">
                84.2K
              </span>
              <div className="bg-surface-container-highest px-2 py-0.5 comic-border -rotate-1 mt-0.5 flex items-center gap-1 comic-shadow rounded">
                <span className="material-symbols-outlined text-secondary text-[11px]">
                  toll
                </span>
                <span className="font-headline-sm text-[13px] text-secondary leading-none">
                  2,000
                </span>
              </div>
            </div>

            {/* SEAT 3: CYBER VIPER (ALL-IN) */}
            <div className="flex flex-col items-center relative rotate-2">
              <div className="relative w-12 h-12 bg-surface-container-high comic-border rounded-lg comic-shadow flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[26px]">
                  skull
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface uppercase truncate max-w-[75px] mt-0.5 font-bold">
                VIPER_X
              </span>
              <div className="bg-[#d9453a] text-white px-1.5 py-0.5 font-headline-sm text-[10px] uppercase tracking-tighter -rotate-6 comic-border border-[2px] comic-shadow mt-0.5">
                ALL-IN 55K
              </div>
            </div>
          </div>

          {/* MID SECTION: OPPONENTS + COMMUNITY FELT WITH LARGE CARDS */}
          <div className="grid grid-cols-12 gap-1 items-center relative z-10 my-auto py-2">
            {/* SEAT 4: MAD RAM (Mid Left) */}
            <div className="col-span-3 flex flex-col items-center -rotate-1">
              <div className="relative bg-surface-container-high comic-border rounded-xl comic-shadow flex items-center justify-center p-2.5">
                <span className="material-symbols-outlined text-primary-container text-[28px]">
                  hardware
                </span>
              </div>
              <span className="font-label-sm text-[12px] text-on-surface uppercase font-extrabold truncate max-w-[70px] mt-0.5">
                MAD_RAM
              </span>
              <span className="font-label-sm text-[11px] text-outline font-bold">
                310.0K
              </span>
              <div className="bg-surface-container-highest px-1.5 py-0.5 comic-border mt-0.5 flex items-center gap-0.5 rounded">
                <span className="font-headline-sm text-[12px] text-primary-container">
                  4,200
                </span>
              </div>
            </div>

            {/* CENTER FELT: RIVER BANNER + LARGE POT + 5 EXPANDED COMMUNITY CARDS */}
            <div className="col-span-6 flex flex-col items-center justify-center px-0.5">
              <div className="bg-surface-container-high px-2.5 py-0.5 rounded-full comic-border -rotate-1 mb-1.5 comic-shadow">
                <span className="font-label-sm text-[10px] text-secondary tracking-widest font-extrabold uppercase">
                  {streetLabel}
                </span>
              </div>
              <div className="relative bg-primary-container text-[#101012] px-3.5 py-1 rounded-lg comic-border-thick comic-shadow rotate-1 mb-2.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] font-bold">
                  monetization_on
                </span>
                <span className="font-headline-md text-[20px] tracking-wide uppercase leading-none font-bold">
                  {potAmount}
                </span>
              </div>

              {/* 5 ENLARGED COMMUNITY CARDS */}
              <div className="flex items-center justify-center gap-1.5 w-full">
                {communityCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`w-[38px] h-[58px] sm:w-[44px] sm:h-[66px] bg-[#f2eee4] ${card.colorClass} comic-border rounded-md comic-card-shadow flex flex-col justify-between p-1 ${card.rotateClass} select-none`}
                  >
                    <div className="flex flex-col items-center leading-none">
                      <span
                        className={`font-headline-sm ${card.rankSizeClass} ${card.colorClass} font-black leading-none`}
                      >
                        {card.rank}
                      </span>
                      <span
                        className={`text-[12px] ${card.colorClass} leading-none -mt-0.5 font-bold`}
                      >
                        {card.suit}
                      </span>
                    </div>
                    <div className="self-center">
                      <span
                        className={`${card.centerSuitSizeClass} ${card.colorClass} font-bold`}
                      >
                        {card.suit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEAT 5: COGWHEEL (Mid Right - Thinking state) */}
            <div className="col-span-3 flex flex-col items-center rotate-1">
              <div className="relative bg-surface-container-high comic-border rounded-xl comic-shadow flex items-center justify-center p-2.5">
                <span
                  className="material-symbols-outlined text-secondary text-[28px] animate-spin"
                  style={{ animationDuration: "5s" }}
                >
                  settings
                </span>
              </div>
              <span className="font-label-sm text-[12px] text-on-surface uppercase font-extrabold truncate max-w-[70px] mt-0.5">
                COGWHEEL
              </span>
              <span className="font-label-sm text-[11px] text-outline font-bold">
                98.1K
              </span>
              <div className="w-14 bg-surface-container-highest h-2.5 rounded-full overflow-hidden mt-1 comic-border border-[2px]">
                <div className="bg-secondary h-full w-2/3 animate-pulse"></div>
              </div>
              <span className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-tight">
                THINKING...
              </span>
            </div>
          </div>

          {/* HERO SECTION */}
          <div className="relative z-20 pb-0.5">
            {/* Hand Strength & Equity Indicator */}
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <div className="bg-surface-container-highest px-2.5 py-1 rounded-md comic-border comic-shadow -rotate-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-[16px]">
                  auto_awesome
                </span>
                <span className="font-label-md text-[13px] text-primary-fixed font-black uppercase tracking-wider">
                  {handSummary}
                </span>
              </div>
              <div className="bg-[#009ccc] text-[#101012] font-headline-sm text-[12px] px-2 py-0.5 rounded comic-border comic-shadow rotate-1 font-bold">
                {equityPercent}
              </div>
            </div>

            {/* HERO IDENTITY PANEL + LARGE HOLE CARDS */}
            <div className="bg-surface-container-high comic-border-thick rounded-xl p-2.5 comic-shadow-lg flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary-container"></div>

              {/* Hero Persona */}
              <div className="flex items-center gap-2.5 pl-2">
                <div className="relative bg-primary-container comic-border rounded-xl comic-shadow flex items-center justify-center p-2">
                  <span className="material-symbols-outlined text-[#101012] text-[34px]">
                    bolt
                  </span>
                  <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest text-primary-container font-headline-sm text-[11px] px-1 rounded comic-border border-[2px]">
                    BB
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-headline-sm text-[18px] text-on-surface tracking-wide uppercase font-bold">
                    {heroName}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-primary-container text-[16px]">
                      toll
                    </span>
                    <span className="font-headline-sm text-[18px] text-primary-container tracking-wide leading-none">
                      {heroStack}
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">
                      SCRAP
                    </span>
                  </div>
                  <span className="font-label-sm text-[12px] text-secondary font-extrabold uppercase tracking-tight mt-1">
                    {heroCurrentBet}
                  </span>
                </div>
              </div>

              {/* HERO HOLE CARDS */}
              <div className="flex items-center -space-x-4 pr-1">
                {heroCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`w-[52px] h-[78px] bg-[#f2eee4] ${card.colorClass} comic-border-thick rounded-lg comic-shadow-lg flex flex-col justify-between p-1.5 ${card.rotateClass} select-none relative ${
                      idx === 0 ? "z-10" : "z-20"
                    } transition-transform active:-translate-y-2`}
                  >
                    <div className="flex flex-col items-center leading-none">
                      <span
                        className={`font-headline-sm ${card.rankSizeClass} ${card.colorClass} font-black leading-none`}
                      >
                        {card.rank}
                      </span>
                      <span
                        className={`text-[14px] ${card.colorClass} leading-none font-bold`}
                      >
                        {card.suit}
                      </span>
                    </div>
                    <div className="self-center pb-0.5">
                      <span
                        className={`${card.centerSuitSizeClass} ${card.colorClass} font-bold`}
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
      </main>

      {/* BOTTOM ACTION DOCK */}
      <footer className="w-full px-3 pb-safe pt-1 flex-shrink-0 relative z-30">
        <div className="grid grid-cols-3 gap-2">
          {/* ACTION 1: FOLD */}
          <button
            className="bg-[#d9453a] hover:bg-[#b8342a] text-white h-14 rounded-xl comic-border-thick comic-shadow-lg -rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
            onClick={() => onAction?.("fold")}
            type="button"
          >
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px] font-bold">
                close
              </span>
              <span className="font-headline-md text-[22px] uppercase tracking-wider leading-none">
                FOLD
              </span>
            </div>
            <span className="font-label-sm text-[11px] opacity-90 uppercase tracking-tighter mt-0.5 font-bold">
              FORFEIT HAND
            </span>
          </button>

          {/* ACTION 2: CALL */}
          <button
            className="bg-[#1aa3d4] hover:bg-[#158cb7] text-[#101012] h-14 rounded-xl comic-border-thick comic-shadow-lg rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
            onClick={() => onAction?.("call", callAmount)}
            type="button"
          >
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px] font-bold">
                check
              </span>
              <span className="font-headline-md text-[22px] uppercase tracking-wider leading-none">
                CALL
              </span>
            </div>
            <span className="font-label-sm text-[12px] font-extrabold uppercase tracking-tight text-[#101012] mt-0.5">
              {callAmount.toLocaleString()} SCRAP
            </span>
          </button>

          {/* ACTION 3: RAISE (OPENS MODAL DRAWER) */}
          <button
            className="relative bg-primary-container hover:bg-[#eac31f] text-[#101012] h-14 rounded-xl comic-border-thick comic-shadow-lg rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
            id="btnOpenRaise"
            onClick={() => setIsRaiseOpen(true)}
            type="button"
          >
            <span className="absolute -top-2.5 -right-1 bg-[#ff4d4d] text-white font-headline-sm text-[11px] px-1.5 py-0.5 rounded comic-border border-[2px] comic-shadow rotate-12 uppercase leading-none">
              HOT!
            </span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px] font-bold group-hover:-translate-y-0.5 transition-transform">
                arrow_upward
              </span>
              <span className="font-headline-md text-[22px] uppercase tracking-wider leading-none">
                RAISE
              </span>
            </div>
            <span className="font-label-sm text-[12px] font-extrabold uppercase tracking-tight text-[#101012] mt-0.5">
              TO {currentBet.toLocaleString()}+
            </span>
          </button>
        </div>
      </footer>

      {/* INTERACTIVE BETTING BOTTOM SHEET */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-200 ${
          isRaiseOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        id="raiseModalOverlay"
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsRaiseOpen(false)}
        ></div>
        <div
          className={`relative w-full bg-surface-container-high comic-border-thick rounded-t-2xl comic-shadow-lg p-3 pb-safe max-w-md mx-auto transform transition-transform duration-200 ease-out z-10 ${
            isRaiseOpen ? "translate-y-0" : "translate-y-full"
          }`}
          id="raiseDrawerPanel"
        >
          <div className="w-12 h-1 bg-on-surface-variant/40 rounded-full mx-auto mb-2"></div>
          <div className="flex items-center justify-between border-b-2 border-[#101012] pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="bg-primary-container text-[#101012] font-headline-sm text-[13px] px-1.5 py-0.5 -rotate-1 comic-border border-[2px] leading-none uppercase">
                RAISE SIZER
              </span>
              <span className="font-label-md text-[14px] text-on-surface font-extrabold uppercase tracking-wider">
                TARGET BET:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-surface-container-lowest px-2.5 py-0.5 rounded comic-border rotate-1 comic-shadow flex items-center">
                <span
                  className="font-headline-md text-[20px] text-primary-container leading-none font-bold"
                  id="betDisplay"
                >
                  {currentBet.toLocaleString()}
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant ml-1 uppercase font-bold">
                  SCRAP
                </span>
              </div>
              <button
                className="w-7 h-7 bg-surface-container-highest hover:bg-surface-bright rounded comic-border flex items-center justify-center text-on-surface active:scale-95 transition-transform cursor-pointer"
                onClick={() => setIsRaiseOpen(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
          </div>

          {/* Quick Pot Presets */}
          <div className="grid grid-cols-4 gap-1.5 mb-2.5">
            {ALT_RAISE_PRESETS.map((preset) => (
              <button
                key={preset.label}
                className={`py-1.5 text-center comic-border comic-shadow active:translate-x-0.5 active:translate-y-0.5 transition-transform rounded cursor-pointer ${preset.buttonClass}`}
                onClick={() => setCurrentBet(clampBet(preset.value))}
                type="button"
              >
                <span className="font-label-sm text-[13px] uppercase font-black">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>

          {/* Slider + Stepper Row */}
          <div className="flex items-center gap-2 mb-3 bg-surface-container-lowest p-2 rounded-xl comic-border">
            <button
              className="w-9 h-9 bg-surface-container-high rounded-lg comic-border flex items-center justify-center text-on-surface comic-shadow active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              onClick={() => adjustBet(-1000)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">
                remove
              </span>
            </button>
            <div className="flex-1 flex flex-col justify-center px-1">
              <input
                className="w-full accent-primary-container cursor-pointer h-2 bg-surface-container rounded-lg"
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
              <div className="flex justify-between items-center mt-1 text-on-surface-variant font-label-sm text-[11px] uppercase font-extrabold">
                <span>MIN: {minBet.toLocaleString()}</span>
                <span>MAX: {maxBet.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="w-9 h-9 bg-surface-container-high rounded-lg comic-border flex items-center justify-center text-on-surface comic-shadow active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              onClick={() => adjustBet(1000)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">
                add
              </span>
            </button>
          </div>

          {/* Dual Confirmation Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              className="col-span-2 bg-primary-container hover:bg-[#eac31f] text-[#101012] py-2.5 rounded-xl comic-border-thick comic-shadow-lg active:translate-x-1 active:translate-y-1 transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
              onClick={confirmRaise}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] font-bold">
                check_circle
              </span>
              <span className="font-headline-sm text-[20px] uppercase tracking-wide leading-none font-bold">
                CONFIRM RAISE
              </span>
            </button>
            <button
              className="col-span-1 bg-surface-container text-on-surface py-2.5 rounded-xl comic-border comic-shadow active:translate-x-0.5 active:translate-y-0.5 transition-transform flex items-center justify-center cursor-pointer"
              onClick={() => setIsRaiseOpen(false)}
              type="button"
            >
              <span className="font-headline-sm text-[18px] uppercase tracking-wider text-on-surface-variant">
                CANCEL
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

