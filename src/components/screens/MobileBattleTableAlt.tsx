import React, { useEffect, useState } from "react";
import type { MobileTableCard } from "./MobileBattleTable";
import {
  computePresetTarget,
  formatCompactChips,
  formatStreetBanner,
  getSuitVisualMeta,
  usePokerTable,
  type PokerTableConfig,
} from "../../lib/poker";
import { useSoundEffects } from "../../lib/sound";
import { ComicActionBadge } from "../game/ComicActionBadge";

export interface MobileBattleTableAltProps {
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

const DEFAULT_MOBILE_ALT_CONFIG: PokerTableConfig = {
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

export type { MobileTableCard };

export const MobileBattleTableAlt: React.FC<MobileBattleTableAltProps> = ({
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
    ...DEFAULT_MOBILE_ALT_CONFIG,
    tableName: tableLabel ?? DEFAULT_MOBILE_ALT_CONFIG.tableName,
    heroName: heroName ?? DEFAULT_MOBILE_ALT_CONFIG.heroName,
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
  const [isRaiseOpen, setIsRaiseOpen] = useState<boolean>(false);
  const [showLogOverlay, setShowLogOverlay] = useState<boolean>(false);
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
  const adjustBet = (delta: number) => {
    setCurrentBet((prev) => clampBet(prev + delta));
  };

  const confirmRaise = () => {
    raiseTo(currentBet);
    onAction?.("raise", currentBet);
    setIsRaiseOpen(false);
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
              onClick={() => onExitTable?.(hero.stack)}
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
                <span className="font-label-sm text-[11px] tracking-wider uppercase text-on-surface-variant font-bold truncate max-w-[120px]">
                  {displayTableLabel}
                </span>
              </div>
              <span className="font-label-md text-[13px] text-primary-fixed font-bold tracking-wide mt-0.5">
                {displayBlindsLabel}
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
                {displayBankroll}
              </span>
            </div>
            <button
              className="w-7 h-7 flex items-center justify-center bg-surface-container-high text-on-surface-variant rounded comic-border cursor-pointer"
              onClick={() => (onToggleMute ? onToggleMute() : setLocalMuted((m) => !m))}
              title="Sound"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isMuted ? "volume_off" : "volume_up"}
              </span>
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center bg-surface-container-high text-on-surface-variant rounded comic-border cursor-pointer"
              onClick={() => onNavigateToRankings?.()}
              title="Hand Rankings"
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
              onClick={() => setShowLogOverlay((v) => !v)}
              type="button"
            >
              <span className="material-symbols-outlined text-primary-container text-[13px]">
                forum
              </span>
              <span className="font-label-sm text-[11px] text-on-surface uppercase tracking-wider font-bold">
                LOG ({tableState.actionLog.length})
              </span>
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="bg-surface-container-high px-2 py-0.5 comic-border comic-shadow active:translate-x-0.5 active:translate-y-0.5 transition-transform flex items-center gap-1 rounded cursor-pointer"
              onClick={() => setShowLogOverlay((v) => !v)}
              type="button"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[13px]">
                analytics
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                HAND #{tableState.handNumber}
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
          {showLogOverlay && (
            <div className="absolute inset-x-2 top-2 z-40 bg-surface-container-high/95 comic-border rounded-xl p-2 max-h-36 overflow-y-auto shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between border-b border-outline-variant pb-1 mb-1">
                <span className="font-headline-sm text-[12px] text-primary">ACTION LOG</span>
                <button
                  className="text-[11px] font-bold text-on-surface-variant"
                  onClick={() => setShowLogOverlay(false)}
                  type="button"
                >
                  CLOSE
                </button>
              </div>
              {tableState.actionLog.slice(-6).map((entry) => (
                <div key={entry.id} className="text-[11px] font-body-sm leading-tight py-0.5">
                  <span className="font-bold text-primary-container mr-1">{entry.sender}:</span>
                  <span>{entry.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* Halftone Ambient Background Dot Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#ffe179 2px, transparent 2px)",
              backgroundSize: "12px 12px",
            }}
          ></div>

          {/* TOP SEATS ROW */}
          <div className="grid grid-cols-3 gap-1 relative z-10 pt-1">
            {[seatTopLeft, seatTopCenter, seatTopRight].map((seat, idx) => {
              const isTurn =
                tableState.currentTurnSeatIndex === seat.seatIndex &&
                tableState.status !== "showdown";
              const tilt =
                idx === 0 ? "-rotate-2" : idx === 1 ? "rotate-0" : "rotate-2";
              return (
                <div
                  key={seat.id}
                  className={`flex flex-col items-center relative ${tilt} ${
                    seat.isFolded ? "opacity-40" : ""
                  }`}
                >
                  {/* Floating Comic Action Badge */}
                  {seat.isAllIn && !seat.isFolded ? (
                    <ComicActionBadge
                      type="allIn"
                      amount={seat.currentBet}
                      size="sm"
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                    />
                  ) : isTurn && !seat.isFolded ? (
                    <ComicActionBadge
                      type="thinking"
                      size="sm"
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                    />
                  ) : seat.isFolded ? (
                    <ComicActionBadge
                      type="fold"
                      size="sm"
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                    />
                  ) : seat.lastAction ? (
                    <ComicActionBadge
                      type={
                        seat.lastAction.type === "raise"
                          ? "raise"
                          : seat.lastAction.type === "call"
                          ? "call"
                          : seat.lastAction.type === "check"
                          ? "check"
                          : "bet"
                      }
                      amount={seat.currentBet}
                      size="sm"
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                    />
                  ) : null}

                  <div
                    className={`relative ${
                      idx === 1 ? "w-14 h-14 rounded-xl" : "w-12 h-12 rounded-lg"
                    } ${
                      seat.isDealer
                        ? "bg-secondary-container"
                        : "bg-surface-container-high"
                    } comic-border comic-shadow flex items-center justify-center overflow-hidden ${
                      isTurn ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        idx === 1 ? "text-[32px] text-white" : "text-[26px]"
                      } ${
                        !seat.isDealer && idx === 2
                          ? "text-tertiary-fixed-dim"
                          : !seat.isDealer
                          ? "text-on-surface-variant"
                          : ""
                      }`}
                    >
                      {seat.icon}
                    </span>
                    {seat.isFolded && (
                      <div className="absolute inset-0 bg-surface-dim/80 flex items-center justify-center">
                        <span className="font-headline-sm text-[11px] text-[#ffb4ab] uppercase tracking-tight -rotate-12 bg-[#93000a] px-1 comic-border border-[2px]">
                          FOLD
                        </span>
                      </div>
                    )}
                    {seat.isDealer && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-[#101012] font-headline-sm text-[12px] flex items-center justify-center comic-border border-[2px] comic-shadow rotate-6">
                        D
                      </div>
                    )}
                  </div>
                  <span
                    className={`font-label-sm ${
                      idx === 1
                        ? "text-[13px] text-secondary font-extrabold"
                        : "text-[11px] text-on-surface font-bold"
                    } uppercase truncate max-w-[80px] mt-0.5`}
                  >
                    {seat.name}
                  </span>
                  <span className="font-label-sm text-[11px] text-outline tracking-tight leading-none font-bold">
                    {formatCompactChips(seat.stack)}
                  </span>
                  {seat.isAllIn && !seat.isFolded && (
                    <div className="bg-[#d9453a] text-white px-1.5 py-0.5 font-headline-sm text-[10px] uppercase tracking-tighter -rotate-6 comic-border border-[2px] comic-shadow mt-0.5">
                      ALL-IN {formatCompactChips(seat.currentBet)}
                    </div>
                  )}
                  {!seat.isAllIn && !seat.isFolded && seat.currentBet > 0 && (
                    <div className="bg-surface-container-highest px-2 py-0.5 comic-border -rotate-1 mt-0.5 flex items-center gap-1 comic-shadow rounded">
                      <span className="material-symbols-outlined text-secondary text-[11px]">
                        toll
                      </span>
                      <span className="font-headline-sm text-[13px] text-secondary leading-none">
                        {seat.currentBet.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {isTurn && (
                    <span className="font-label-sm text-[10px] text-secondary uppercase font-bold mt-0.5">
                      THINKING...
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* MID SECTION: OPPONENTS + COMMUNITY FELT WITH LARGE CARDS */}
          <div className="grid grid-cols-12 gap-1 items-center relative z-10 my-auto py-2">
            {/* SEAT 4: Mid Left */}
            {[seatLeft].map((seat) => {
              const isTurn =
                tableState.currentTurnSeatIndex === seat.seatIndex &&
                tableState.status !== "showdown";
              return (
                <div
                  key={seat.id}
                  className={`col-span-3 flex flex-col items-center -rotate-1 ${
                    seat.isFolded ? "opacity-40" : ""
                  }`}
                >
                  <div
                    className={`relative bg-surface-container-high comic-border rounded-xl comic-shadow flex items-center justify-center p-2.5 ${
                      isTurn ? "ring-2 ring-secondary" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary-container text-[28px]">
                      {seat.icon}
                    </span>
                    {seat.isDealer && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-[#101012] font-headline-sm text-[11px] flex items-center justify-center comic-border border-[2px]">
                        D
                      </div>
                    )}
                  </div>
                  <span className="font-label-sm text-[12px] text-on-surface uppercase font-extrabold truncate max-w-[70px] mt-0.5">
                    {seat.name}
                  </span>
                  <span className="font-label-sm text-[11px] text-outline font-bold">
                    {formatCompactChips(seat.stack)}
                  </span>
                  {seat.currentBet > 0 && !seat.isFolded && (
                    <div className="bg-surface-container-highest px-1.5 py-0.5 comic-border mt-0.5 flex items-center gap-0.5 rounded">
                      <span className="font-headline-sm text-[12px] text-primary-container">
                        {seat.currentBet.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {isTurn && (
                    <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                      ACTING...
                    </span>
                  )}
                </div>
              );
            })}

            {/* CENTER FELT: STREET BANNER + LARGE POT + 5 EXPANDED COMMUNITY CARDS */}
            <div className="col-span-6 flex flex-col items-center justify-center px-0.5">
              <div className="bg-surface-container-high px-2.5 py-0.5 rounded-full comic-border -rotate-1 mb-1.5 comic-shadow">
                <span className="font-label-sm text-[10px] text-secondary tracking-widest font-extrabold uppercase">
                  {streetText}
                </span>
              </div>
              <div className="relative bg-primary-container text-[#101012] px-3.5 py-1 rounded-lg comic-border-thick comic-shadow rotate-1 mb-2.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] font-bold">
                  monetization_on
                </span>
                <span className="font-headline-md text-[20px] tracking-wide uppercase leading-none font-bold">
                  POT: {tableState.potTotal.toLocaleString()}
                </span>
              </div>

              {/* 5 ENLARGED COMMUNITY CARDS */}
              <div className="flex items-center justify-center gap-1.5 w-full">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const card = tableState.communityCards[idx];
                  const rot =
                    idx === 0
                      ? "-rotate-2"
                      : idx === 1
                      ? "rotate-1"
                      : idx === 2
                      ? "-rotate-1"
                      : idx === 3
                      ? "rotate-1"
                      : "rotate-2";
                  if (!card) {
                    return (
                      <div
                        key={`slot-${idx}`}
                        className={`w-[38px] h-[58px] sm:w-[44px] sm:h-[66px] bg-surface-container border-2 border-dashed border-outline-variant rounded-md flex items-center justify-center ${rot}`}
                      >
                        <span className="material-symbols-outlined text-[16px] text-outline">
                          playing_cards
                        </span>
                      </div>
                    );
                  }
                  const suitMeta = getSuitVisualMeta(card.suit);
                  return (
                    <div
                      key={card.id}
                      style={{ animationDelay: `${idx < 3 ? idx * 120 : (idx - 3) * 120}ms` }}
                      className={`w-[38px] h-[58px] sm:w-[44px] sm:h-[66px] bg-[#f2eee4] ${suitMeta.mobileAltCardColor} comic-border rounded-md comic-card-shadow anim-card-flip flex flex-col justify-between p-1 ${rot} ${
                        isWinningCard(card.id) ? "ring-2 ring-primary-container anim-pot-glow" : ""
                      } select-none`}
                    >
                      <div className="flex flex-col items-center leading-none">
                        <span
                          className={`font-headline-sm ${
                            card.rank === "10"
                              ? "text-[15px] sm:text-[17px]"
                              : "text-[16px] sm:text-[18px]"
                          } ${suitMeta.mobileAltCardColor} font-black leading-none`}
                        >
                          {card.rank}
                        </span>
                        <span
                          className={`text-[12px] ${suitMeta.mobileAltCardColor} leading-none -mt-0.5 font-bold`}
                        >
                          {suitMeta.symbol}
                        </span>
                      </div>
                      <div className="self-center">
                        <span
                          className={`text-[16px] sm:text-[18px] ${suitMeta.mobileAltCardColor} font-bold`}
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
                  className={`col-span-3 flex flex-col items-center rotate-1 ${
                    seat.isFolded ? "opacity-40" : ""
                  }`}
                >
                  <div className="relative bg-surface-container-high comic-border rounded-xl comic-shadow flex items-center justify-center p-2.5">
                    <span
                      className={`material-symbols-outlined text-secondary text-[28px] ${
                        isTurn ? "animate-spin" : ""
                      }`}
                      style={isTurn ? { animationDuration: "5s" } : undefined}
                    >
                      {seat.icon}
                    </span>
                    {seat.isDealer && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-[#101012] font-headline-sm text-[11px] flex items-center justify-center comic-border border-[2px]">
                        D
                      </div>
                    )}
                  </div>
                  <span className="font-label-sm text-[12px] text-on-surface uppercase font-extrabold truncate max-w-[70px] mt-0.5">
                    {seat.name}
                  </span>
                  <span className="font-label-sm text-[11px] text-outline font-bold">
                    {formatCompactChips(seat.stack)}
                  </span>
                  {isTurn && (
                    <>
                      <div className="w-14 bg-surface-container-highest h-2.5 rounded-full overflow-hidden mt-1 comic-border border-[2px]">
                        <div className="bg-secondary h-full w-2/3 animate-pulse"></div>
                      </div>
                      <span className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-tight">
                        THINKING...
                      </span>
                    </>
                  )}
                  {!isTurn && seat.currentBet > 0 && !seat.isFolded && (
                    <div className="bg-surface-container-highest px-1.5 py-0.5 comic-border mt-0.5 rounded">
                      <span className="font-headline-sm text-[12px] text-primary-container">
                        {seat.currentBet.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* HERO SECTION */}
          <div className="relative z-20 pb-0.5">
            {/* Hand Strength & Equity Indicator */}
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <div className="bg-surface-container-highest px-2.5 py-1 rounded-md comic-border comic-shadow -rotate-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-[16px]">
                  auto_awesome
                </span>
                <span className="font-label-md text-[13px] text-primary-fixed font-black uppercase tracking-wider truncate max-w-[205px]">
                  {winnerBanner ?? tableState.heroAnalysis.headline}
                </span>
              </div>
              <div className="bg-[#009ccc] text-[#101012] font-headline-sm text-[12px] px-2 py-0.5 rounded comic-border comic-shadow rotate-1 font-bold">
                {tableState.heroAnalysis.equityLabel}
              </div>
            </div>

            {/* HERO IDENTITY PANEL + LARGE HOLE CARDS */}
            <div className={`bg-surface-container-high comic-border-thick rounded-xl p-2.5 comic-shadow-lg flex items-center justify-between relative overflow-hidden ${isHeroTurn ? "ring-2 ring-primary-container" : ""}`}>
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary-container"></div>

              {/* Hero Persona */}
              <div className="flex items-center gap-2.5 pl-2">
                <div className="relative bg-primary-container comic-border rounded-xl comic-shadow flex items-center justify-center p-2">
                  <span className="material-symbols-outlined text-[#101012] text-[34px]">
                    bolt
                  </span>
                  <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest text-primary-container font-headline-sm text-[11px] px-1 rounded comic-border border-[2px]">
                    {hero.positionLabel ?? "BTN"}
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-headline-sm text-[18px] text-on-surface tracking-wide uppercase font-bold">
                    {hero.name}
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-primary-container text-[16px]">
                      toll
                    </span>
                    <span className="font-headline-sm text-[18px] text-primary-container tracking-wide leading-none">
                      {hero.stack.toLocaleString()}
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">
                      SCRAP
                    </span>
                  </div>
                  <span className="font-label-sm text-[12px] text-secondary font-extrabold uppercase tracking-tight mt-1">
                    CURRENT BET: {hero.currentBet.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* HERO HOLE CARDS */}
              <div className={`flex items-center -space-x-4 pr-1 card-peel-container ${hero.isFolded ? "opacity-45" : ""}`}>
                {hero.holeCards.map((card, idx) => {
                  const suitMeta = getSuitVisualMeta(card.suit);
                  return (
                    <div
                      key={card.id}
                      style={{ animationDelay: `${idx * 140}ms` }}
                      className={`w-[52px] h-[78px] bg-[#f2eee4] ${suitMeta.mobileAltCardColor} comic-border-thick rounded-lg comic-shadow-lg flex flex-col justify-between p-1.5 select-none relative anim-deal-slide card-peel-interactive ${
                        idx === 0 ? "z-10" : "z-20"
                      } ${
                        isWinningCard(card.id) ? "ring-2 ring-primary-container anim-pot-glow" : ""
                      } transition-transform cursor-pointer`}
                    >
                      <div className="flex flex-col items-center leading-none">
                        <span
                          className={`font-headline-sm text-[20px] ${suitMeta.mobileAltCardColor} font-black leading-none`}
                        >
                          {card.rank}
                        </span>
                        <span
                          className={`text-[14px] ${suitMeta.mobileAltCardColor} leading-none font-bold`}
                        >
                          {suitMeta.symbol}
                        </span>
                      </div>
                      <div className="self-center pb-0.5">
                        <span
                          className={`text-[22px] ${suitMeta.mobileAltCardColor} font-bold`}
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
      </main>

      {/* BOTTOM ACTION DOCK */}
      <footer className="w-full px-3 pb-safe pt-1 flex-shrink-0 relative z-30">
        <div className="grid grid-cols-3 gap-2">
          {/* ACTION 1: FOLD */}
          <button
            className={`bg-[#d9453a] hover:bg-[#b8342a] text-white h-14 rounded-xl comic-border-thick comic-shadow-lg -rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group ${isHeroTurn ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
            disabled={!isHeroTurn}
            onClick={() => {
              fold();
              onAction?.("fold");
            }}
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

          {/* ACTION 2: CHECK / CALL / NEXT HAND */}
          {tableState.status === "showdown" ? (
            <button
              className="bg-primary-container hover:bg-[#eac31f] text-[#101012] h-14 rounded-xl comic-border-thick comic-shadow-lg rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group cursor-pointer"
              onClick={dealNextHand}
              type="button"
            >
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[20px] font-bold">
                  bolt
                </span>
                <span className="font-headline-md text-[22px] uppercase tracking-wider leading-none">
                  DEAL
                </span>
              </div>
              <span className="font-label-sm text-[12px] font-extrabold uppercase tracking-tight text-[#101012] mt-0.5">
                NEXT HAND
              </span>
            </button>
          ) : (
            <button
              className={`bg-[#1aa3d4] hover:bg-[#158cb7] text-[#101012] h-14 rounded-xl comic-border-thick comic-shadow-lg rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group ${isHeroTurn ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
              disabled={!isHeroTurn}
              onClick={() => {
                checkOrCall();
                onAction?.("call", toCall);
              }}
              type="button"
            >
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[20px] font-bold">
                  check
                </span>
                <span className="font-headline-md text-[22px] uppercase tracking-wider leading-none">
                  {canCheck ? "CHECK" : "CALL"}
                </span>
              </div>
              <span className="font-label-sm text-[12px] font-extrabold uppercase tracking-tight text-[#101012] mt-0.5">
                {canCheck ? "PASS FREE" : `${Math.min(hero.stack, toCall).toLocaleString()} SCRAP`}
              </span>
            </button>
          )}

          {/* ACTION 3: RAISE (OPENS MODAL DRAWER) */}
          <button
            className={`relative bg-primary-container hover:bg-[#eac31f] text-[#101012] h-14 rounded-xl comic-border-thick comic-shadow-lg rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform flex flex-col items-center justify-center p-1 group ${canRaise ? "cursor-pointer" : "opacity-50 pointer-events-none"}`}
            disabled={!canRaise}
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
                {tableState.highestBet === 0 ? "BET" : "RAISE"}
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
            {[
              { label: "½ POT", val: computePresetTarget(tableState.potTotal, tableState.highestBet, 0.5, minRaiseTarget, maxBetTarget), buttonClass: "bg-surface-container hover:bg-surface-container-highest text-on-surface" },
              { label: `POT (${formatCompactChips(tableState.potTotal)})`, val: computePresetTarget(tableState.potTotal, tableState.highestBet, 1.0, minRaiseTarget, maxBetTarget), buttonClass: "bg-surface-container hover:bg-surface-container-highest text-primary-fixed" },
              { label: "2× POT", val: computePresetTarget(tableState.potTotal, tableState.highestBet, 2.0, minRaiseTarget, maxBetTarget), buttonClass: "bg-surface-container hover:bg-surface-container-highest text-on-surface" },
              { label: "ALL-IN", val: maxBetTarget, buttonClass: "bg-[#d9453a] text-white -rotate-1 tracking-tight" },
            ].map((preset) => (
              <button
                key={preset.label}
                className={`py-1.5 text-center comic-border comic-shadow active:translate-x-0.5 active:translate-y-0.5 transition-transform rounded cursor-pointer ${preset.buttonClass}`}
                disabled={!canRaise}
                onClick={() => setCurrentBet(clampBet(preset.val))}
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
              onClick={() => adjustBet(-stepSize)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">
                remove
              </span>
            </button>
            <div className="flex-1 flex flex-col justify-center px-1">
              <input
                className="w-full accent-primary-container cursor-pointer h-2 bg-surface-container rounded-lg"
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
              <div className="flex justify-between items-center mt-1 text-on-surface-variant font-label-sm text-[11px] uppercase font-extrabold">
                <span>MIN: {minRaiseTarget.toLocaleString()}</span>
                <span>MAX: {maxBetTarget.toLocaleString()}</span>
              </div>
            </div>
            <button
              className="w-9 h-9 bg-surface-container-high rounded-lg comic-border flex items-center justify-center text-on-surface comic-shadow active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              onClick={() => adjustBet(stepSize)}
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

