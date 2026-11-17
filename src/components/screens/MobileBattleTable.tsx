import React, { useEffect, useState } from "react";
import {
  computePresetTarget,
  formatCompactChips,
  formatStreetBanner,
  getSuitVisualMeta,
  usePokerTable,
  type PokerTableConfig,
} from "../../lib/poker";
import { useSoundEffects } from "../../lib/sound";

export interface MobileTableCard {
  rank: string;
  suit: string;
  colorClass: string;
  rotateClass: string;
  rankSizeClass: string;
  centerSuitSizeClass: string;
}

export interface MobileBattleTableProps {
  tableConfig?: PokerTableConfig;
  bankroll?: number;
  muted?: boolean;
  onToggleMute?: () => void;
  tableLabel?: string;
  blindsLabel?: string;
  playerBankroll?: string;
  heroName?: string;
  onExitTable?: (finalHeroStack?: number) => void;
  onNavigateToRankings?: () => void;
  onRequestTopOff?: (neededChips: number) => number;
  onAction?: (action: "fold" | "call" | "raise", amount?: number) => void;
}

const DEFAULT_MOBILE_CONFIG: PokerTableConfig = {
  tableId: "scrap-yard-07",
  tableName: "#07 HIGH STAKES",
  tableCode: "TABLE #07",
  smallBlind: 500,
  bigBlind: 1000,
  minBuyIn: 10000,
  maxBuyIn: 50000,
  turnDurationSeconds: 18,
  heroName: "Bolt_Runner_99",
  heroBuyIn: 25000,
  autoTopOff: true,
};

export const MobileBattleTable: React.FC<MobileBattleTableProps> = ({
  tableConfig,
  bankroll,
  muted: controlledMuted,
  onToggleMute,
  tableLabel,
  blindsLabel,
  playerBankroll,
  heroName,
  onExitTable,
  onNavigateToRankings,
  onRequestTopOff,
  onAction,
}) => {
  const effectiveConfig: PokerTableConfig = tableConfig ?? {
    ...DEFAULT_MOBILE_CONFIG,
    tableName: tableLabel ?? DEFAULT_MOBILE_CONFIG.tableName,
    heroName: heroName ?? DEFAULT_MOBILE_CONFIG.heroName,
  };

  const {
    tableState,
    hero,
    isHeroTurn,
    toCall,
    minRaiseTarget,
    maxBetTarget,
    canCheck,
    canRaise,
    fold,
    checkOrCall,
    raiseTo,
    dealNextHand,
  } = usePokerTable(effectiveConfig, onRequestTopOff);

  const [currentBet, setCurrentBet] = useState<number>(minRaiseTarget);
  const [showRaiseDrawer, setShowRaiseDrawer] = useState<boolean>(true);
  const [showLogDrawer, setShowLogDrawer] = useState<boolean>(false);
  const [localMuted, setLocalMuted] = useState<boolean>(false);

  const isMuted = controlledMuted ?? localMuted;

  useSoundEffects({
    muted: isMuted,
    state: tableState,
    heroPlayerId: hero.id,
  });

  useEffect(() => {
    setCurrentBet(minRaiseTarget);
  }, [isHeroTurn, minRaiseTarget, tableState.handNumber, tableState.status]);

  const clampBet = (val: number) =>
    Math.max(minRaiseTarget, Math.min(Math.max(minRaiseTarget, maxBetTarget), val));

  const stepSize = Math.max(effectiveConfig.smallBlind, 100);
  const handleAdjustBet = (delta: number) => {
    setCurrentBet((prev) => clampBet(prev + delta));
  };

  const displayTableLabel = tableLabel ?? effectiveConfig.tableName;
  const displayBlindsLabel =
    blindsLabel ??
    `BLINDS: ${effectiveConfig.smallBlind.toLocaleString()} / ${effectiveConfig.bigBlind.toLocaleString()}`;
  const displayBankroll =
    playerBankroll ??
    (bankroll !== undefined
      ? formatCompactChips(bankroll)
      : formatCompactChips(hero.stack));

  const seatLeft = tableState.players[1];
  const seatTopLeft = tableState.players[2];
  const seatTopCenter = tableState.players[3];
  const seatTopRight = tableState.players[4];
  const seatRight = tableState.players[5];

  const isWinningCard = (cardId: string) =>
    tableState.winners.some((w) => w.winningCardIds.includes(cardId));

  const streetText = formatStreetBanner(tableState.status).mobile;
  const winnerBanner =
    tableState.status === "showdown" && tableState.winners.length > 0
      ? `🏆 ${tableState.winners[0].playerName} +${formatCompactChips(tableState.winners[0].amount)}`
      : null;

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
              onClick={() => onExitTable?.(hero.stack)}
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
                <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-bold truncate max-w-[120px]">
                  {displayTableLabel}
                </span>
              </div>
              <span className="font-label-md text-label-md text-primary font-bold tracking-wide">
                {displayBlindsLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-xs">
            <div className="flex items-center gap-space-xs bg-surface-container-highest px-space-sm py-1 rounded shadow-[2px_2px_0px_#000000] rotate-1">
              <span className="material-symbols-outlined text-primary-container text-[18px]">
                toll
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none">
                {displayBankroll}
              </span>
            </div>
            <button
              className="w-11 h-11 flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-on-surface rounded cursor-pointer"
              onClick={() => (onToggleMute ? onToggleMute() : setLocalMuted((m) => !m))}
              title="Sound"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMuted ? "volume_off" : "volume_up"}
              </span>
            </button>
            <button
              className="w-11 h-11 flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-on-surface rounded cursor-pointer"
              onClick={() => onNavigateToRankings?.()}
              title="Hand Rankings"
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
                onClick={() => setShowLogDrawer((v) => !v)}
                type="button"
              >
                <span className="material-symbols-outlined text-primary-container text-[15px]">
                  forum
                </span>
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                  LOG ({tableState.actionLog.length})
                </span>
              </button>
            </div>
            <div className="flex items-center gap-space-xs">
              <button
                className="bg-surface-container-high hover:bg-surface-container-highest px-space-sm py-1 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform flex items-center gap-1 cursor-pointer"
                onClick={() => setShowLogDrawer((v) => !v)}
                type="button"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[15px]">
                  analytics
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  HAND #{tableState.handNumber}
                </span>
              </button>
              <div className="bg-error-container text-on-error-container px-2 py-0.5 font-label-sm text-label-sm tracking-widest uppercase flex items-center gap-1 shadow-[1px_1px_0px_#000000]">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                LIVE
              </div>
            </div>
          </div>

          {showLogDrawer && (
            <div className="px-margin-mobile mb-2 z-30">
              <div className="bg-surface-container-highest p-2 rounded-lg shadow-[3px_3px_0px_#000000] border border-outline-variant max-h-32 overflow-y-auto space-y-1">
                {tableState.actionLog.slice(-6).map((entry) => (
                  <div key={entry.id} className="text-[11px] font-body-sm leading-tight">
                    <span className="font-bold text-primary mr-1">{entry.sender}:</span>
                    <span className="text-on-surface">{entry.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                {[seatTopLeft, seatTopCenter, seatTopRight].map((seat, idx) => {
                  const isTurn =
                    tableState.currentTurnSeatIndex === seat.seatIndex &&
                    tableState.status !== "showdown";
                  const tilt =
                    idx === 0 ? "-rotate-1" : idx === 1 ? "rotate-0" : "rotate-1";
                  return (
                    <div
                      key={seat.id}
                      className={`flex flex-col items-center relative transform ${tilt} ${
                        seat.isFolded ? "opacity-40" : ""
                      }`}
                    >
                      <div
                        className={`relative ${
                          idx === 1 ? "w-12 h-12" : "w-11 h-11"
                        } ${
                          seat.isDealer
                            ? "bg-secondary-container"
                            : "bg-surface-container-high"
                        } rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center overflow-hidden ${
                          isTurn ? "ring-2 ring-secondary" : ""
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[24px] ${
                            seat.isDealer
                              ? "text-on-secondary-container"
                              : idx === 2
                              ? "text-tertiary-fixed-dim"
                              : "text-on-surface-variant"
                          }`}
                        >
                          {seat.icon}
                        </span>
                        {seat.isFolded && (
                          <div className="absolute inset-0 bg-surface-dim/80 flex items-center justify-center">
                            <span className="font-headline-sm text-[10px] text-error uppercase tracking-tighter -rotate-12 bg-surface-container-lowest px-1 shadow-[1px_1px_0px_#000]">
                              FOLD
                            </span>
                          </div>
                        )}
                        {seat.isDealer && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-[11px] flex items-center justify-center shadow-[1px_1px_0px_#000000] rotate-6">
                            D
                          </div>
                        )}
                      </div>
                      <span
                        className={`font-label-sm text-[10px] uppercase truncate max-w-[75px] mt-0.5 ${
                          seat.isDealer ? "text-secondary font-bold" : "text-on-surface"
                        }`}
                      >
                        {seat.name}
                      </span>
                      <span className="font-label-sm text-[10px] text-outline tracking-tight leading-none">
                        {formatCompactChips(seat.stack)}
                      </span>
                      {seat.isAllIn && !seat.isFolded && (
                        <div className="bg-error-container text-on-error-container px-1 py-0.5 font-headline-sm text-[9px] uppercase tracking-tighter -rotate-6 shadow-[2px_2px_0px_#000000] mt-0.5">
                          ALL-IN {formatCompactChips(seat.currentBet)}
                        </div>
                      )}
                      {!seat.isAllIn && !seat.isFolded && seat.currentBet > 0 && (
                        <div className="bg-surface-container-highest px-1.5 shadow-[1px_1px_0px_#000000] -rotate-1 mt-0.5 flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-secondary text-[10px]">
                            toll
                          </span>
                          <span className="font-headline-sm text-[11px] text-secondary">
                            {seat.currentBet.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {isTurn && (
                        <span className="font-label-sm text-[9px] text-secondary uppercase font-bold">
                          THINKING...
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mid Seat Ring + Center Felt Street */}
              <div className="grid grid-cols-12 gap-1 items-center relative z-10 my-1">
                {/* SEAT 4: Mid Left */}
                {[seatLeft].map((seat) => {
                  const isTurn =
                    tableState.currentTurnSeatIndex === seat.seatIndex &&
                    tableState.status !== "showdown";
                  return (
                    <div
                      key={seat.id}
                      className={`col-span-3 flex flex-col items-start transform -rotate-1 pl-1 ${
                        seat.isFolded ? "opacity-40" : ""
                      }`}
                    >
                      <div
                        className={`relative w-11 h-11 bg-surface-container-high rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center ${
                          isTurn ? "ring-2 ring-secondary" : ""
                        }`}
                      >
                        <span className="material-symbols-outlined text-primary-container text-[24px]">
                          {seat.icon}
                        </span>
                        {seat.isDealer && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-[10px] flex items-center justify-center">
                            D
                          </div>
                        )}
                      </div>
                      <span className="font-label-sm text-[11px] text-on-surface uppercase font-bold truncate max-w-[65px] mt-0.5">
                        {seat.name}
                      </span>
                      <span className="font-label-sm text-[10px] text-outline">
                        {formatCompactChips(seat.stack)}
                      </span>
                      {seat.currentBet > 0 && !seat.isFolded && (
                        <div className="bg-surface-container-highest px-1 shadow-[1px_1px_0px_#000000] mt-0.5 flex items-center gap-0.5">
                          <span className="font-headline-sm text-[11px] text-primary">
                            {seat.currentBet.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {isTurn && (
                        <span className="font-label-sm text-[9px] text-secondary uppercase font-bold">
                          ACTING...
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* CENTER FELT: STREET & POT & COMMUNITY CARDS */}
                <div className="col-span-6 flex flex-col items-center justify-center">
                  <div className="bg-surface-container-high px-2 py-0.5 rounded-full shadow-[1px_1px_0px_#000000] -rotate-1 mb-1">
                    <span className="font-label-sm text-[9px] text-secondary tracking-widest font-extrabold uppercase">
                      {streetText}
                    </span>
                  </div>
                  <div className="relative bg-primary-container text-on-primary-container px-3 py-1 rounded shadow-[3px_3px_0px_#000000] rotate-1 mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      monetization_on
                    </span>
                    <span className="font-headline-sm text-headline-sm uppercase tracking-wide leading-none">
                      POT: {tableState.potTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* FIVE COMMUNITY CARDS */}
                  <div className="flex items-center justify-center gap-1 w-full">
                    {[0, 1, 2, 3, 4].map((idx) => {
                      const card = tableState.communityCards[idx];
                      const rot =
                        idx % 2 === 0 ? "-rotate-1" : idx === 3 ? "rotate-0" : "rotate-1";
                      if (!card) {
                        return (
                          <div
                            key={`slot-${idx}`}
                            className={`w-[30px] h-[46px] bg-surface-container border border-dashed border-outline-variant rounded flex items-center justify-center ${rot}`}
                          >
                            <span className="material-symbols-outlined text-[12px] text-outline">
                              playing_cards
                            </span>
                          </div>
                        );
                      }
                      const suitMeta = getSuitVisualMeta(card.suit);
                      return (
                        <div
                          key={card.id}
                          className={`w-[30px] h-[46px] bg-primary rounded shadow-[2px_2px_0px_#000000] flex flex-col justify-between p-0.5 ${rot} ${
                            isWinningCard(card.id) ? "ring-2 ring-primary-container" : ""
                          } select-none`}
                        >
                          <div className="flex flex-col items-center leading-none">
                            <span
                              className={`font-headline-sm ${
                                card.rank === "10" ? "text-[12px]" : "text-[13px]"
                              } ${suitMeta.mobilePrimaryCardColor} leading-none font-bold`}
                            >
                              {card.rank}
                            </span>
                            <span
                              className={`font-body-sm text-[10px] ${suitMeta.mobilePrimaryCardColor} leading-none -mt-0.5`}
                            >
                              {suitMeta.symbol}
                            </span>
                          </div>
                          <div className="self-center">
                            <span
                              className={`font-body-sm text-[13px] ${suitMeta.mobilePrimaryCardColor}`}
                            >
                              {suitMeta.symbol}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SEAT 5: Mid Right */}
                {[seatRight].map((seat) => {
                  const isTurn =
                    tableState.currentTurnSeatIndex === seat.seatIndex &&
                    tableState.status !== "showdown";
                  return (
                    <div
                      key={seat.id}
                      className={`col-span-3 flex flex-col items-end transform rotate-1 pr-1 ${
                        seat.isFolded ? "opacity-40" : ""
                      }`}
                    >
                      <div className="relative w-11 h-11 bg-surface-container-high rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center overflow-hidden">
                        <span
                          className={`material-symbols-outlined text-secondary text-[24px] ${
                            isTurn ? "animate-spin" : ""
                          }`}
                          style={isTurn ? { animationDuration: "6s" } : undefined}
                        >
                          {seat.icon}
                        </span>
                        {seat.isDealer && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-[10px] flex items-center justify-center">
                            D
                          </div>
                        )}
                      </div>
                      <span className="font-label-sm text-[11px] text-on-surface uppercase font-bold truncate max-w-[65px] mt-0.5">
                        {seat.name}
                      </span>
                      <span className="font-label-sm text-[10px] text-outline">
                        {formatCompactChips(seat.stack)}
                      </span>
                      {isTurn && (
                        <>
                          <div className="w-14 bg-surface-container-highest h-2 rounded-full overflow-hidden mt-1 shadow-[1px_1px_0px_#000000]">
                            <div className="bg-secondary h-full w-2/3 animate-pulse"></div>
                          </div>
                          <span className="font-label-sm text-[9px] text-secondary uppercase font-bold tracking-tighter">
                            THINKING...
                          </span>
                        </>
                      )}
                      {!isTurn && seat.currentBet > 0 && !seat.isFolded && (
                        <div className="bg-surface-container-highest px-1 shadow-[1px_1px_0px_#000000] mt-0.5">
                          <span className="font-headline-sm text-[11px] text-primary">
                            {seat.currentBet.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* HERO / PLAYER ZONE (BOTTOM OF FELT) */}
              <div className="relative z-20 mt-3 pt-2">
                {/* Equity & Hand Strength Ribbon */}
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <div className="bg-surface-container px-2 py-0.5 rounded shadow-[2px_2px_0px_#000000] -rotate-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary-container text-[14px]">
                      auto_awesome
                    </span>
                    <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider truncate max-w-[210px]">
                      {winnerBanner ?? tableState.heroAnalysis.headline}
                    </span>
                  </div>
                  <div className="bg-secondary-container text-on-secondary-container font-headline-sm text-[11px] px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000000] rotate-1">
                    {tableState.heroAnalysis.equityLabel}
                  </div>
                </div>

                {/* Hero Hole Cards + Player Persona Block */}
                <div className={`bg-surface-container-high rounded-lg p-2 shadow-[4px_4px_0px_#000000] flex items-center justify-between relative overflow-hidden ${isHeroTurn ? "ring-2 ring-primary-container" : ""}`}>
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>

                  {/* Hero Identity Stats */}
                  <div className="flex items-center gap-2 pl-2">
                    <div className="relative w-12 h-12 bg-primary-container rounded-lg shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary-container text-[30px]">
                        bolt
                      </span>
                      <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest text-primary font-headline-sm text-[10px] px-1 rounded shadow-[1px_1px_0px_#000]">
                        {hero.positionLabel ?? "BTN"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide uppercase leading-tight">
                          {hero.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary-container text-[14px]">
                          toll
                        </span>
                        <span className="font-headline-sm text-[16px] text-primary-container leading-none">
                          {hero.stack.toLocaleString()}
                        </span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                          SCRAP
                        </span>
                      </div>
                      <span className="font-label-sm text-[11px] text-secondary font-bold uppercase tracking-tight mt-0.5">
                        CURRENT BET: {hero.currentBet.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Hero Hole Cards Display */}
                  <div className={`flex items-center -space-x-3 pr-1 ${hero.isFolded ? "opacity-45" : ""}`}>
                    {hero.holeCards.map((card, idx) => {
                      const suitMeta = getSuitVisualMeta(card.suit);
                      return (
                        <div
                          key={card.id}
                          className={`w-11 h-16 bg-primary rounded ${
                            idx === 0
                              ? "shadow-[3px_3px_0px_#000000] z-10 -rotate-6"
                              : "shadow-[4px_4px_0px_#000000] z-20 rotate-6"
                          } ${
                            isWinningCard(card.id) ? "ring-2 ring-primary-container" : ""
                          } flex flex-col justify-between p-1 select-none relative transition-transform hover:-translate-y-1`}
                        >
                          <div className="flex flex-col items-center leading-none">
                            <span
                              className={`font-headline-sm text-[16px] ${suitMeta.mobilePrimaryCardColor} leading-none font-bold`}
                            >
                              {card.rank}
                            </span>
                            <span
                              className={`font-body-sm text-[12px] ${suitMeta.mobilePrimaryCardColor} leading-none`}
                            >
                              {suitMeta.symbol}
                            </span>
                          </div>
                          <div className="self-center pb-0.5">
                            <span
                              className={`font-body-sm text-[16px] ${suitMeta.mobilePrimaryCardColor}`}
                            >
                              {suitMeta.symbol}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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
                  {[
                    { label: "½ POT", val: computePresetTarget(tableState.potTotal, tableState.highestBet, 0.5, minRaiseTarget, maxBetTarget), cls: "bg-surface-container-high hover:bg-surface-container-highest", textCls: "text-on-surface" },
                    { label: `POT (${formatCompactChips(tableState.potTotal)})`, val: computePresetTarget(tableState.potTotal, tableState.highestBet, 1.0, minRaiseTarget, maxBetTarget), cls: "bg-surface-container-high hover:bg-surface-container-highest", textCls: "text-primary" },
                    { label: "2× POT", val: computePresetTarget(tableState.potTotal, tableState.highestBet, 2.0, minRaiseTarget, maxBetTarget), cls: "bg-surface-container-high hover:bg-surface-container-highest", textCls: "text-on-surface" },
                    { label: "ALL-IN", val: maxBetTarget, cls: "bg-error-container text-on-error-container -rotate-1", textCls: "tracking-tight" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      className={`${preset.cls} py-1 text-center shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform cursor-pointer`}
                      disabled={!canRaise}
                      onClick={() => setCurrentBet(clampBet(preset.val))}
                      type="button"
                    >
                      <span
                        className={`font-label-sm text-label-sm uppercase font-bold ${preset.textCls}`}
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
                    onClick={() => handleAdjustBet(-stepSize)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      remove
                    </span>
                  </button>
                  <div className="flex-1 flex flex-col justify-center px-1">
                    <input
                      className="w-full accent-primary-container cursor-pointer h-2 bg-surface-container-lowest rounded-lg"
                      disabled={!canRaise}
                      id="raiseSlider"
                      max={Math.max(minRaiseTarget, maxBetTarget)}
                      min={minRaiseTarget}
                      onChange={(e) =>
                        setCurrentBet(clampBet(parseInt(e.target.value, 10)))
                      }
                      step={stepSize}
                      type="range"
                      value={currentBet}
                    />
                    <div className="flex justify-between items-center mt-1 text-on-surface-variant font-label-sm text-[10px] uppercase font-bold">
                      <span>MIN: {minRaiseTarget.toLocaleString()}</span>
                      <span>MAX: {maxBetTarget.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 bg-surface-container-highest rounded flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                    onClick={() => handleAdjustBet(stepSize)}
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
                    className={`flex-1 bg-primary-container text-on-primary-container py-2 shadow-[3px_3px_0px_#000000] -rotate-0.5 hover:rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex items-center justify-center gap-1.5 ${canRaise ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
                    disabled={!canRaise}
                    id="btnConfirmRaise"
                    onClick={() => {
                      raiseTo(currentBet);
                      onAction?.("raise", currentBet);
                    }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                    <span className="font-headline-sm text-headline-sm uppercase tracking-wide leading-none">
                      {tableState.highestBet === 0 ? "CONFIRM BET" : "CONFIRM RAISE"}
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
                className={`bg-error-container text-on-error-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] -rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group ${isHeroTurn ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
                disabled={!isHeroTurn}
                onClick={() => {
                  fold();
                  onAction?.("fold");
                }}
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

              {/* ACTION 2: CHECK / CALL / NEXT HAND */}
              {tableState.status === "showdown" ? (
                <button
                  className="bg-primary-container text-on-primary-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
                  onClick={dealNextHand}
                  type="button"
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">
                      bolt
                    </span>
                    <span className="font-headline-md text-headline-md uppercase tracking-wider leading-none">
                      DEAL
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-tight mt-0.5">
                    NEXT HAND
                  </span>
                </button>
              ) : (
                <button
                  className={`bg-secondary-container text-on-secondary-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group ${isHeroTurn ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
                  disabled={!isHeroTurn}
                  onClick={() => {
                    checkOrCall();
                    onAction?.("call", toCall);
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">
                      check
                    </span>
                    <span className="font-headline-md text-headline-md uppercase tracking-wider leading-none">
                      {canCheck ? "CHECK" : "CALL"}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-tight text-on-secondary-container mt-0.5">
                    {canCheck ? "PASS FREE" : `${Math.min(hero.stack, toCall).toLocaleString()} SCRAP`}
                  </span>
                </button>
              )}

              {/* ACTION 3: RAISE / BET */}
              <button
                className={`relative bg-primary-container text-on-primary-container h-14 rounded-lg shadow-[4px_4px_0px_#000000] rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group ${canRaise ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
                disabled={!canRaise}
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
                    {tableState.highestBet === 0 ? "BET" : "RAISE"}
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
