import React, { useEffect, useState } from "react";
import {
  computePresetTarget,
  formatCompactChips,
  formatStreetBanner,
  getSuitVisualMeta,
  usePokerTable,
  type EnginePlayer,
  type PokerTableConfig,
} from "../../lib/poker";

export interface BattleTableProps {
  tableConfig?: PokerTableConfig;
  bankroll?: number;
  muted?: boolean;
  onToggleMute?: () => void;
  onExitTable?: (finalHeroStack: number) => void;
  onBackToLobby?: () => void;
  onRequestRebuy?: (requestedAmount: number) => number;
  onRequestTopOff?: (neededChips: number) => number;
  onNavigateToRankings?: () => void;
}

const DEFAULT_TABLE_CONFIG: PokerTableConfig = {
  tableId: "scrap-yard-07",
  tableName: "SCRAPYARD HIGH STAKES #07",
  tableCode: "TABLE #07",
  smallBlind: 500,
  bigBlind: 1000,
  minBuyIn: 10000,
  maxBuyIn: 50000,
  turnDurationSeconds: 18,
  heroName: "BOLT_RUNNER_99",
  heroBuyIn: 25000,
  autoTopOff: true,
};

export const BattleTable: React.FC<BattleTableProps> = ({
  tableConfig,
  bankroll,
  muted: controlledMuted,
  onToggleMute,
  onExitTable,
  onBackToLobby,
  onRequestRebuy,
  onRequestTopOff,
  onNavigateToRankings,
}) => {
  const effectiveConfig = tableConfig ?? DEFAULT_TABLE_CONFIG;
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
    allIn,
    dealNextHand,
    sendChat,
    rebuy,
  } = usePokerTable(effectiveConfig, onRequestTopOff);

  const [betTarget, setBetTarget] = useState<number>(minRaiseTarget);
  const [chatInput, setChatInput] = useState<string>("");
  const [showRankingsModal, setShowRankingsModal] = useState<boolean>(false);
  const [localMuted, setLocalMuted] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const isMuted = controlledMuted ?? localMuted;

  useEffect(() => {
    setBetTarget(minRaiseTarget);
  }, [isHeroTurn, minRaiseTarget, tableState.handNumber, tableState.status]);

  useEffect(() => {
    if (!tableState.lastEventToast) return;
    setToastMsg(tableState.lastEventToast);
    const t = window.setTimeout(() => setToastMsg(null), 2400);
    return () => window.clearTimeout(t);
  }, [tableState.lastEventToast, tableState.actionLog.length]);

  const handleExit = () => {
    if (onExitTable) {
      onExitTable(hero.stack);
    } else {
      onBackToLobby?.();
    }
  };

  const handleRebuyClick = () => {
    const requested = effectiveConfig.minBuyIn;
    const granted = onRequestRebuy ? onRequestRebuy(requested) : requested;
    if (granted > 0) {
      rebuy(granted);
      setToastMsg(`+ ${granted.toLocaleString()} SCRAP ADDED TO STACK!`);
    } else {
      setToastMsg("INSUFFICIENT WALLET SCRAP FOR REBUY!");
    }
  };

  const handleShoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChat(chatInput);
    setChatInput("");
  };

  const stepAmount = Math.max(effectiveConfig.smallBlind, 50);
  const clampedBet = Math.max(minRaiseTarget, Math.min(maxBetTarget, betTarget));
  const streetText = formatStreetBanner(tableState.status).desktop;
  const displayedWallet = bankroll !== undefined ? bankroll : hero.stack;

  // Clockwise opponents around Hero (players[0])
  const seatLeft = tableState.players[1];
  const seatTopLeft = tableState.players[2];
  const seatTopCenter = tableState.players[3];
  const seatTopRight = tableState.players[4];
  const seatRight = tableState.players[5];

  const isWinningCard = (cardId: string) =>
    tableState.winners.some((w) => w.winningCardIds.includes(cardId));

  const renderOpponentSeat = (
    player: EnginePlayer,
    variant: "top-left" | "top-center" | "top-right" | "side-left" | "side-right"
  ) => {
    const isTurn =
      tableState.currentTurnSeatIndex === player.seatIndex &&
      tableState.status !== "showdown";
    const isWinner = tableState.winners.some((w) => w.playerId === player.id);
    const tiltClass =
      variant === "top-left"
        ? "-rotate-2"
        : variant === "top-center"
        ? "rotate-1"
        : variant === "top-right"
        ? "-rotate-1"
        : variant === "side-left"
        ? "rotate-2"
        : "-rotate-2";
    const maxW = variant.startsWith("side") ? "max-w-[150px]" : "max-w-[180px]";
    const borderHighlight = player.isAllIn
      ? "border-error comic-shadow-md"
      : isWinner
      ? "border-primary-container comic-shadow-lg ring-2 ring-primary-container"
      : isTurn
      ? "border-secondary comic-shadow-md"
      : "border-surface-container-lowest comic-shadow-sm";

    return (
      <div
        className={`flex flex-col ${
          variant === "side-left"
            ? "items-start"
            : variant === "side-right"
            ? "items-end"
            : "items-center"
        } ${player.isFolded ? "opacity-55 transition-opacity hover:opacity-90" : ""}`}
      >
        <div
          className={`relative ${
            player.isFolded
              ? "bg-surface-container-low"
              : player.isAllIn
              ? "bg-surface-container-low"
              : "bg-surface-container"
          } p-space-xs border-[3px] ${borderHighlight} ${tiltClass} w-full ${maxW}`}
        >
          {player.isDealer && (
            <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-primary-container border-[2px] border-surface-container-lowest comic-shadow-sm flex items-center justify-center font-headline-sm text-headline-sm text-on-primary-container z-20">
              D
            </div>
          )}
          {player.isAllIn && !player.isFolded && (
            <div className="absolute -top-4 -left-3 bg-error text-on-error border-[2px] border-surface-container-lowest comic-shadow-sm px-1.5 py-0.5 -rotate-12 font-headline-sm text-headline-sm leading-none animate-pulse z-20">
              💥 ALL-IN!
            </div>
          )}
          <div className="flex items-center gap-space-xs">
            <div
              className={`w-9 h-9 border-[2px] border-surface-container-lowest flex items-center justify-center shrink-0 ${
                player.isAllIn
                  ? "bg-error-container text-on-error-container"
                  : isTurn
                  ? "bg-secondary-container text-on-secondary-container"
                  : player.isFolded
                  ? "bg-surface-variant text-outline"
                  : "bg-secondary-container text-on-secondary-container"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {player.icon}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-headline-sm text-headline-sm truncate ${
                  player.isAllIn
                    ? "text-error"
                    : isTurn
                    ? "text-secondary"
                    : player.isFolded
                    ? "text-on-surface-variant"
                    : "text-primary"
                }`}
              >
                {player.name}
              </span>
              <span className="font-label-sm text-label-sm text-secondary-fixed">
                {player.stack.toLocaleString()} SCRAP
              </span>
            </div>
          </div>

          {player.isFolded && (
            <div className="absolute -bottom-2.5 right-2 bg-surface-container-highest px-space-sm py-0.5 border-[2px] border-surface-container-lowest rotate-3 text-outline font-headline-sm text-headline-sm leading-none">
              FOLDED
            </div>
          )}

          {!player.isFolded && isTurn && (
            <>
              <div className="mt-1 bg-surface-container-lowest border-[1px] border-secondary p-0.5">
                <div className="h-2 bg-secondary animate-pulse w-3/4"></div>
              </div>
              <div className="mt-0.5 text-center font-label-sm text-label-sm text-secondary-fixed uppercase">
                THINKING...
              </div>
            </>
          )}

          {!player.isFolded && !isTurn && (player.currentBet > 0 || player.lastAction) && (
            <div
              className={`mt-1 border-[2px] px-space-xs py-0.5 flex justify-between items-center ${
                player.isAllIn
                  ? "bg-error-container border-surface-container-lowest text-on-error-container"
                  : "bg-surface-container-lowest border-outline-variant"
              }`}
            >
              <span className="font-label-sm text-label-sm uppercase">
                {player.lastAction?.type.toUpperCase() ?? "BET"}:
              </span>
              <span className="font-headline-sm text-headline-sm text-primary">
                {player.currentBet > 0
                  ? formatCompactChips(player.currentBet)
                  : player.lastAction?.type === "check"
                  ? "CHECK"
                  : "IN"}
              </span>
            </div>
          )}
        </div>

        {/* Opponent hole cards: revealed face-up at showdown if still in hand */}
        {tableState.status === "showdown" &&
        !player.isFolded &&
        player.holeCards.length === 2 ? (
          <div className="flex -space-x-2 mt-1">
            {player.holeCards.map((c, idx) => {
              const suitMeta = getSuitVisualMeta(c.suit);
              return (
                <div
                  key={c.id}
                  className={`w-8 h-11 bg-[#F2EEE4] ${suitMeta.desktopTextColor} p-0.5 border-[2px] ${
                    isWinningCard(c.id)
                      ? "border-primary-container ring-1 ring-primary-container"
                      : "border-surface-container-lowest"
                  } ${idx === 0 ? "-rotate-6" : "rotate-6"} flex flex-col justify-between leading-none font-bold`}
                >
                  <span className="text-[11px]">{c.rank}</span>
                  <span className="text-[12px] text-center">{suitMeta.symbol}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex -space-x-3 mt-1">
            <div
              className={`w-7 h-10 border-[2px] border-surface-container-lowest -rotate-6 flex items-center justify-center ${
                player.isFolded
                  ? "bg-surface-variant text-outline"
                  : player.isAllIn
                  ? "bg-error text-on-error font-headline-sm text-headline-sm"
                  : "bg-surface-container-highest text-primary-container"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {player.isFolded ? "block" : "bolt"}
              </span>
            </div>
            <div
              className={`w-7 h-10 border-[2px] border-surface-container-lowest rotate-6 flex items-center justify-center ${
                player.isFolded
                  ? "bg-surface-variant text-outline"
                  : player.isAllIn
                  ? "bg-error text-on-error font-headline-sm text-headline-sm"
                  : "bg-surface-container-highest text-primary-container"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {player.isFolded ? "block" : "bolt"}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface-container-lowest font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
<header className="fixed top-0 left-0 w-full z-50 bg-surface-container-low border-b-[3px] border-surface-container-lowest bg-halftone"><div className="h-20 w-full px-gutter flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-md"><div className="bg-surface-container-highest p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-1 flex items-center gap-space-xs"><img alt="Scrap Poker Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VtTXDP9Lx-Q-Rlu3H1KXwXgacp1_uBUv0vaEfDDPUD0bjPQQI1niNeo_NA9nWY2ioN-dCJvZBXA6igKlD5lE5M1_Ns1W0lHR13H1SOeeSB9xaQqtVq22Zux1PCiaPFpuVVhpkne9phGpkuAvIbOMLf-F741wQMGiOI31zjd2MRzfJjbh7N3ydARy7LpHFG7h2vVqkkBTpedxZiS84NWqnxqM9CfeNazE6ND-pnCQ"/><span className="font-headline-md text-headline-md tracking-wider text-primary uppercase pr-space-xs">SCRAP POKER</span></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container -rotate-1 comic-shadow-sm border-surface-container-lowest"><a aria-current="page" className="px-space-md py-space-xs font-label-lg uppercase tracking-wider transition-transform bg-primary-container text-on-primary-container -rotate-1 comic-shadow-sm border-surface-container-lowest" data-path="battle-table" href="#">Battle Table</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="lobby" href="#" onClick={(e) => { e.preventDefault(); handleExit(); }}>Lobby</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="hand-rankings" href="#" onClick={(e) => { e.preventDefault(); onNavigateToRankings?.(); }}>Hand Rankings</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="leaderboard" href="#" onClick={(e) => { e.preventDefault(); setShowRankingsModal(true); }}>Rules Sheet</a></nav></div><div className="hidden md:flex items-center gap-space-xs bg-surface-container-lowest border-[3px] border-outline-variant px-space-md py-space-xs comic-shadow-sm rotate-1"><span className="material-symbols-outlined text-secondary text-[18px]">casino</span><span className="font-headline-sm text-headline-sm tracking-wide text-primary uppercase">{effectiveConfig.tableName}</span><span className="text-outline font-headline-sm text-headline-sm">//</span><span className="font-label-md text-label-md text-on-surface-variant uppercase">BLINDS:</span><span className="font-label-lg text-label-lg text-secondary-fixed-dim">{effectiveConfig.smallBlind.toLocaleString()} / {effectiveConfig.bigBlind.toLocaleString()}</span></div><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-sm bg-surface-container p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="flex flex-col pr-space-xs"><span className="font-label-sm text-label-sm text-on-surface-variant leading-none">SCRAP RUNNER</span><span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-none">{hero.name}</span></div><div className="bg-surface-container-lowest px-space-sm py-space-xs border-[2px] border-outline-variant flex items-center gap-space-xs" title="Wallet Bankroll"><span className="material-symbols-outlined text-primary-container text-[16px]">token</span><span className="font-label-lg text-label-lg text-primary tracking-wide">{displayedWallet.toLocaleString()} SCRAP</span></div><button className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-x-[2px] active:translate-y-[2px] hover:rotate-0 transition-transform uppercase cursor-pointer" onClick={handleRebuyClick} type="button">REBUY</button></div><div className="flex items-center gap-space-xs bg-surface-container-low p-space-xs border-[3px] border-surface-container-lowest"><button aria-label="Toggle sound" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={() => (onToggleMute ? onToggleMute() : setLocalMuted((m) => !m))} type="button"><span className="material-symbols-outlined text-[20px]">{isMuted ? "volume_off" : "volume_up"}</span></button><button aria-label="Game settings" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={() => setShowRankingsModal(true)} type="button"><span className="material-symbols-outlined text-[20px]">settings</span></button><button aria-label="Leave table" className="w-8 h-8 flex items-center justify-center text-error hover:bg-error-container hover:text-on-error-container transition-colors cursor-pointer" onClick={handleExit} title="Leave table & cash out stack" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></div></header><main className="w-full pt-20 min-h-screen bg-surface-container-lowest bg-halftone flex flex-col"><div className="flex flex-col w-full relative select-none">
{/* Table Container Outer */}
<div className="w-full max-w-[1560px] mx-auto px-gutter-mobile md:px-gutter py-space-sm flex flex-col gap-space-sm">
{/* TOP STAKES BANNER STRIP */}
<div className="w-full flex items-center justify-between gap-space-sm bg-surface-container-high p-space-xs -rotate-0.5 comic-shadow-sm border-[3px] border-surface-container-lowest">
<div className="flex items-center gap-space-sm">
<span className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-sm py-0.5 border-[2px] border-surface-container-lowest rotate-1 inline-block">{effectiveConfig.tableCode}</span>
<span className="font-headline-sm text-headline-sm text-primary uppercase tracking-wide">NO LIMIT TEXAS HOLD'EM</span>
<span className="text-on-surface-variant font-label-md text-label-md hidden sm:inline-block">HAND #{tableState.handNumber}</span>
</div>
<div className="flex items-center gap-space-sm">
<div className="bg-surface-container-lowest px-space-sm py-0.5 border-[2px] border-outline-variant flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-[16px]">timer</span>
<span className="font-label-lg text-label-lg text-secondary">SHOT CLOCK: {tableState.turnTimeRemaining}s</span>
</div>
<button className="bg-primary hover:bg-primary-fixed text-surface-container-lowest font-headline-sm text-headline-sm px-space-md py-0.5 border-[2px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform uppercase flex items-center gap-1 cursor-pointer" id="toggle-rankings-btn" onClick={() => setShowRankingsModal(true)} type="button">
<span className="material-symbols-outlined text-[18px]">menu_book</span>
<span className="hidden md:inline">CHEAT SHEET</span>
</button>
</div>
</div>
{/* MAIN BATTLE ARENA (ANGULAR CEL-SHADED TABLE GRID) */}
<div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-space-sm items-start">
{/* LEFT SIDEBAR: COMIC LOG & SPEECH FEED */}
<div className="hidden xl:flex xl:col-span-2 flex-col gap-space-sm">
{/* Log Strip Header */}
<div className="bg-surface-container-high border-[3px] border-surface-container-lowest p-space-sm comic-shadow-sm -rotate-1">
<div className="flex items-center justify-between border-b-[2px] border-surface-container-lowest pb-space-xs mb-space-xs">
<span className="font-headline-sm text-headline-sm text-primary uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-[18px]">terminal</span> ACTION FEED
            </span>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest px-1">LIVE</span>
</div>
{/* Chat Bubbles Stack */}
<div className="flex flex-col gap-space-xs max-h-[380px] overflow-y-auto pr-1">
{tableState.actionLog.slice(-14).map((entry) => (
  <div
    key={entry.id}
    className={`p-space-xs border-[2px] text-left ${
      entry.tone === "winner"
        ? "bg-primary-container/20 border-primary-container comic-shadow-sm"
        : entry.tone === "alert"
        ? "bg-surface-container-lowest border-error comic-shadow-sm"
        : entry.tone === "chat"
        ? "bg-surface-container border-surface-container-lowest -rotate-1"
        : entry.tone === "action"
        ? "bg-surface-container-highest border-outline-variant"
        : "bg-surface-container-lowest border-outline-variant comic-shadow-sm"
    }`}
  >
    <span
      className={`font-label-sm text-label-sm block font-bold ${
        entry.tone === "winner"
          ? "text-primary"
          : entry.tone === "alert"
          ? "text-error"
          : entry.tone === "chat"
          ? "text-primary-container"
          : "text-secondary"
      }`}
    >
      {entry.sender}
    </span>
    <span className="font-body-sm text-body-sm text-on-surface">{entry.message}</span>
  </div>
))}
</div>
{/* Quick Speech Trigger */}
<form className="mt-space-sm pt-space-xs border-t-[2px] border-surface-container-lowest flex gap-1" onSubmit={handleShoutSubmit}>
<input className="w-full bg-surface-container-lowest px-2 py-1 border-[2px] border-outline-variant text-on-surface font-label-md text-label-md placeholder:text-outline focus:outline-none focus:border-primary" onChange={(e) => setChatInput(e.target.value)} placeholder="SHOUT COMIC QUOTE..." type="text" value={chatInput}/>
<button className="bg-primary-container px-2 border-[2px] border-surface-container-lowest text-on-primary-container font-headline-sm text-headline-sm uppercase hover:bg-primary cursor-pointer" type="submit">!</button>
</form>
</div>
{/* Scrap Deck Table Info */}
<div className="bg-surface-container-low border-[3px] border-surface-container-lowest p-space-sm comic-shadow-sm rotate-1">
<div className="font-headline-sm text-headline-sm text-primary mb-1 uppercase">SCRAP CASINO DECK</div>
<div className="space-y-1 font-label-sm text-label-sm text-on-surface-variant">
<div className="flex justify-between"><span>CUT-CARD COLOR:</span><span className="text-secondary font-bold">CYAN PUNK</span></div>
<div className="flex justify-between"><span>SHUFFLE ALGO:</span><span className="text-primary font-bold">CSPRNG DECK</span></div>
<div className="flex justify-between"><span>RAKE:</span><span className="text-outline font-bold">0% FREE ARENA</span></div>
</div>
</div>
</div>
{/* CENTER: THE CEL-SHADED TABLE ARENA */}
<div className="col-span-1 xl:col-span-8 flex flex-col gap-space-sm">
{/* POKER TABLE SURFACE (HEXAGONAL / ANGULAR CUT-PAPER FELT) */}
<div className="relative w-full bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-sm md:p-space-lg overflow-hidden min-h-[580px] flex flex-col justify-between" style={{ backgroundImage: "radial-gradient(#201f21 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }}>
{/* Angular Hazard Warning Tape Border Accent */}
<div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary-container via-surface-container-lowest to-primary-container opacity-80 pointer-events-none"></div>
<div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-primary-container via-surface-container-lowest to-primary-container opacity-80 pointer-events-none"></div>
{/* TOP ROW: SEATS 1, 2, 3 */}
<div className="grid grid-cols-3 gap-space-xs sm:gap-space-md z-10">
{renderOpponentSeat(seatTopLeft, "top-left")}
{renderOpponentSeat(seatTopCenter, "top-center")}
{renderOpponentSeat(seatTopRight, "top-right")}
</div>
{/* MIDDLE SECTION: SEATS 5 & 4 + CENTER POT & 5 COMMUNITY CARDS */}
<div className="grid grid-cols-12 items-center my-space-sm gap-space-xs">
{/* SEAT 5 (LEFT) */}
<div className="col-span-3 sm:col-span-2 flex flex-col items-start z-10">
{renderOpponentSeat(seatLeft, "side-left")}
</div>
{/* COMMUNITY CENTERFELT: POT & 5 CARDS */}
<div className="col-span-6 sm:col-span-8 flex flex-col items-center justify-center">
{/* STREET BANNER + POT STAMP */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-space-xs mb-space-sm">
{/* Street Marker */}
<div className="bg-surface-container-lowest px-space-md py-0.5 border-[3px] border-outline-variant -rotate-2 comic-shadow-sm flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-error inline-block animate-ping"></span>
<span className="font-headline-sm text-headline-sm text-primary uppercase tracking-widest">{streetText}</span>
</div>
{/* Main Pot Callout Comic Block */}
<div className="bg-primary-container px-space-md py-1 border-[3px] border-surface-container-lowest rotate-1 comic-shadow-md flex items-center gap-space-xs">
<span className="material-symbols-outlined text-on-primary-container text-[20px]">token</span>
<span className="font-label-lg text-label-lg text-on-primary-container uppercase tracking-wide">POT:</span>
<span className="font-display-lg text-display-lg text-on-primary-container leading-none">{tableState.potTotal.toLocaleString()}</span>
<span className="font-label-sm text-label-sm bg-surface-container-lowest text-primary px-1 border-[1px] border-surface-container-lowest">SCRAP</span>
</div>
</div>
{/* 5 CUT-PAPER COMMUNITY CARDS */}
<div className="flex items-center justify-center gap-1 sm:gap-space-xs flex-wrap">
{[0, 1, 2, 3, 4].map((slot) => {
  const card = tableState.communityCards[slot];
  const tilt =
    slot === 0 ? "-rotate-2" : slot === 1 ? "rotate-1" : slot === 2 ? "-rotate-1" : slot === 3 ? "rotate-2" : "-rotate-2";
  if (!card) {
    return (
      <div
        key={`empty-${slot}`}
        className={`w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-surface-container-lowest/70 border-[3px] border-dashed border-outline-variant ${tilt} flex items-center justify-center`}
      >
        <span className="material-symbols-outlined text-outline text-[22px] opacity-60">playing_cards</span>
      </div>
    );
  }
  const suitMeta = getSuitVisualMeta(card.suit);
  const won = isWinningCard(card.id);
  return (
    <div
      key={card.id}
      className={`w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-[#F2EEE4] ${suitMeta.desktopTextColor} p-1.5 border-[3px] ${
        won ? "border-primary-container ring-2 ring-primary-container" : "border-surface-container-lowest"
      } comic-shadow-md ${tilt} flex flex-col justify-between hover:-translate-y-1 transition-transform`}
    >
      <div className="flex justify-between items-start leading-none">
        <span className="font-headline-lg text-headline-lg leading-none font-bold">{card.rank}</span>
        <span className="text-[12px] font-bold">{suitMeta.symbol}</span>
      </div>
      <div className="text-center font-headline-lg text-headline-lg leading-none scale-125">
        {suitMeta.symbol}
      </div>
      <div className="flex justify-between items-end leading-none rotate-180">
        <span className="font-headline-lg text-headline-lg leading-none font-bold">{card.rank}</span>
        <span className="text-[12px] font-bold">{suitMeta.symbol}</span>
      </div>
    </div>
  );
})}
</div>
{/* SIDE POT / SHOWDOWN CALLOUT TAPE STRIP */}
<div className="mt-space-sm flex items-center justify-center gap-space-sm flex-wrap">
{tableState.status === "showdown" && tableState.winners.length > 0 ? (
  <div className="flex items-center gap-space-sm flex-wrap justify-center">
    <span className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-0.5 border-[2px] border-surface-container-lowest -rotate-1 comic-shadow-sm uppercase">
      🏆 WINNER: {tableState.winners.map((w) => `${w.playerName} (+${w.amount.toLocaleString()} · ${w.handDescription})`).join(" / ")}
    </span>
    <button
      className="bg-secondary text-on-secondary font-headline-sm text-headline-sm px-space-md py-0.5 border-[2px] border-surface-container-lowest rotate-1 comic-shadow-sm uppercase cursor-pointer hover:brightness-110"
      onClick={dealNextHand}
      type="button"
    >
      DEAL NEXT HAND ⚡
    </button>
  </div>
) : tableState.sidePots.length > 0 ? (
  tableState.sidePots.map((pot, idx) => (
    <span
      key={idx}
      className={`bg-surface-container-lowest ${idx === 0 ? "text-on-surface-variant rotate-1" : "text-secondary-fixed -rotate-1"} font-label-md text-label-md px-space-sm py-0.5 border-[2px] border-surface-container-lowest`}
    >
      {idx === 0 ? "MAIN POT" : `SIDE POT ${idx + 1}`}: {pot.amount.toLocaleString()} SCRAP
    </span>
  ))
) : (
  <span className="bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md px-space-sm py-0.5 border-[2px] border-surface-container-lowest rotate-1">
    HIGHEST BET: {tableState.highestBet.toLocaleString()} SCRAP · {toCall > 0 ? `TO CALL: ${toCall.toLocaleString()}` : "CHECK OR RAISE"}
  </span>
)}
</div>
</div>
{/* SEAT 4 (RIGHT) */}
<div className="col-span-3 sm:col-span-2 flex flex-col items-end z-10">
{renderOpponentSeat(seatRight, "side-right")}
</div>
</div>
{/* BOTTOM ROW: HERO (PLAYER 6) */}
<div className="flex flex-col items-center justify-center mt-2 relative z-20">
{/* Hand Strength Tag (Torn Paper Ribbon with Halftone Dot Vibe) */}
<div className="bg-primary px-space-md py-1 border-[3px] border-surface-container-lowest comic-shadow-md -rotate-1 mb-2 flex items-center gap-space-xs">
<span className="material-symbols-outlined text-surface-container-lowest text-[18px]">stars</span>
<span className="font-headline-sm text-headline-sm text-surface-container-lowest uppercase tracking-wider">{tableState.heroAnalysis.headline}</span>
<span className="text-surface-container-lowest font-headline-sm text-headline-sm">·</span>
<span className="font-label-lg text-label-lg text-surface-container-lowest">{tableState.heroAnalysis.equityLabel}</span>
</div>
{/* Hero Hand Cards & Identity Badge */}
<div className="flex items-end gap-space-md">
{/* HERO HOLE CARDS */}
<div className={`flex -space-x-4 items-center ${hero.isFolded ? "opacity-50" : ""}`}>
{hero.holeCards.map((card, idx) => {
  const suitMeta = getSuitVisualMeta(card.suit);
  const won = isWinningCard(card.id);
  return (
    <div
      key={card.id}
      className={`w-20 sm:w-24 md:w-28 h-30 sm:h-36 md:h-42 bg-[#F2EEE4] ${suitMeta.desktopTextColor} p-2 border-[4px] ${
        won ? "border-primary-container ring-2 ring-primary-container" : "border-surface-container-lowest"
      } comic-shadow-lg ${idx === 0 ? "-rotate-6" : "rotate-6"} hover:-translate-y-2 transition-transform cursor-pointer relative`}
    >
      {card.rank === "A" && (
        <div className="absolute -top-3 -right-2 bg-primary-container text-on-primary-container px-1 py-0.5 border-[2px] border-surface-container-lowest font-headline-sm text-headline-sm rotate-6">
          ACE!
        </div>
      )}
      <div className="flex justify-between items-start leading-none">
        <span className="font-display-lg text-display-lg leading-none font-bold">{card.rank}</span>
        <span className="text-[18px] font-bold">{suitMeta.symbol}</span>
      </div>
      <div className="text-center font-display-xl text-display-xl leading-none my-1">
        {suitMeta.symbol}
      </div>
      <div className="flex justify-between items-end leading-none rotate-180">
        <span className="font-display-lg text-display-lg leading-none font-bold">{card.rank}</span>
        <span className="text-[18px] font-bold">{suitMeta.symbol}</span>
      </div>
    </div>
  );
})}
</div>
{/* Hero Plate Info */}
<div className={`bg-surface-container-lowest p-space-xs sm:p-space-sm border-[3px] ${isHeroTurn ? "border-primary-container ring-2 ring-primary-container/50" : "border-outline-variant"} comic-shadow-md rotate-1 flex flex-col gap-0.5 relative`}>
{hero.isDealer && (
  <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-primary-container border-[2px] border-surface-container-lowest comic-shadow-sm flex items-center justify-center font-headline-sm text-headline-sm text-on-primary-container z-20">
    D
  </div>
)}
<div className="flex items-center gap-space-xs">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline-sm text-headline-sm">
                    YOU
                  </div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-tight">{hero.name}</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">POSITION: {hero.positionLabel ?? "SEAT #6"} {isHeroTurn ? "· YOUR TURN!" : ""}</span>
</div>
</div>
<div className="flex items-center justify-between gap-space-md border-t-[2px] border-outline-variant pt-1 mt-1">
<span className="font-label-md text-label-md text-on-surface-variant">TABLE STACK:</span>
<span className="font-headline-sm text-headline-sm text-secondary-fixed">{hero.stack.toLocaleString()} SCRAP</span>
</div>
<div className="flex items-center justify-between gap-space-md">
<span className="font-label-md text-label-md text-on-surface-variant">COMMITTED:</span>
<span className="font-headline-sm text-headline-sm text-primary-container">{hero.currentBet.toLocaleString()} SCRAP</span>
</div>
</div>
</div>
</div>
</div>
</div>
{/* RIGHT SIDEBAR: SCRAP HUD & HAND GUIDE MODAL TRIGGER */}
<div className="hidden xl:flex xl:col-span-2 flex-col gap-space-sm">
{/* Live HUD Card */}
<div className="bg-surface-container-high border-[3px] border-surface-container-lowest p-space-sm comic-shadow-sm rotate-1">
<div className="border-b-[2px] border-surface-container-lowest pb-space-xs mb-space-xs flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-secondary uppercase">RUNNER STATS</span>
<span className="font-label-sm text-label-sm bg-surface-container-lowest text-primary px-1">SESSION</span>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<div className="bg-surface-container-lowest p-1.5 border-[2px] border-outline-variant text-center">
<span className="font-label-sm text-label-sm text-on-surface-variant block">VPIP</span>
<span className="font-headline-md text-headline-md text-primary">26%</span>
</div>
<div className="bg-surface-container-lowest p-1.5 border-[2px] border-outline-variant text-center">
<span className="font-label-sm text-label-sm text-on-surface-variant block">PFR</span>
<span className="font-headline-md text-headline-md text-secondary">19%</span>
</div>
<div className="bg-surface-container-lowest p-1.5 border-[2px] border-outline-variant text-center">
<span className="font-label-sm text-label-sm text-on-surface-variant block">3-BET</span>
<span className="font-headline-md text-headline-md text-primary-container">8.5%</span>
</div>
<div className="bg-surface-container-lowest p-1.5 border-[2px] border-outline-variant text-center">
<span className="font-label-sm text-label-sm text-on-surface-variant block">AGG%</span>
<span className="font-headline-md text-headline-md text-error">42%</span>
</div>
</div>
{/* Win Streak Tracker */}
<div className="mt-space-xs bg-surface-container p-space-xs border-[2px] border-surface-container-lowest">
<div className="flex justify-between items-center text-label-sm font-label-sm">
<span className="text-on-surface-variant">HANDS PLAYED:</span>
<span className="text-primary font-bold">{tableState.handNumber}</span>
</div>
<div className="flex justify-between items-center text-label-sm font-label-sm mt-0.5">
<span className="text-on-surface-variant">TABLE STACK:</span>
<span className="text-secondary font-bold">{hero.stack.toLocaleString()}</span>
</div>
</div>
</div>
{/* EXPLOSIVE COMIC STICKER: POKER HANDS REFERENCE */}
<div className="relative bg-primary-container p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md -rotate-2 cursor-pointer hover:rotate-0 transition-transform" id="quick-rank-widget" onClick={() => setShowRankingsModal(true)}>
<div className="font-headline-lg text-headline-lg text-on-primary-container leading-tight uppercase">
            HAND RADAR
          </div>
<div className="bg-surface-container-lowest text-primary p-space-xs border-[2px] border-surface-container-lowest mt-1">
<div className="font-headline-sm text-headline-sm text-primary-fixed uppercase">{tableState.heroAnalysis.headline}</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">{tableState.heroAnalysis.equityLabel}</p>
</div>
<button className="w-full mt-2 bg-surface-container-lowest text-primary hover:bg-surface-bright font-headline-sm text-headline-sm py-1 border-[2px] border-surface-container-lowest uppercase comic-shadow-sm cursor-pointer" id="view-cheat-sheet-btn" onClick={(e) => { e.stopPropagation(); setShowRankingsModal(true); }} type="button">
            FULL RANKINGS GUIDE
          </button>
</div>
{/* Table Note Box */}
<div className="bg-surface-container-low border-[3px] border-surface-container-lowest p-space-sm comic-shadow-sm rotate-1">
<span className="font-label-sm text-label-sm text-error uppercase font-bold block mb-1">! TABLE READ</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            {tableState.status === "showdown" && tableState.winners.length > 0
              ? `${tableState.winners[0].playerName} scooped ${tableState.winners[0].amount.toLocaleString()} with ${tableState.winners[0].handDescription}.`
              : "VIPER_X loves aggressive shoves when suited connectors hit the felt. Watch bet sizing!"}
          </p>
</div>
</div>
</div>
{/* BOTTOM CONTROL DECK: ACTION PANEL (COMMAND CENTER) */}
<div className="w-full bg-surface-container border-[4px] border-surface-container-lowest comic-shadow-lg p-space-sm md:p-space-md -rotate-0.5 bg-halftone">
{/* TOP ROW OF DOCK: BET SIZING SLIDER & PRESET BUTTONS */}
<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm pb-space-sm border-b-[3px] border-surface-container-lowest">
{/* Quick Preset Cut-Paper Tags */}
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface-variant uppercase pr-1">PRESETS:</span>
{[
  { label: "⅓ POT", mult: 0.33, cls: "bg-surface-container-high hover:bg-surface-bright text-on-surface -rotate-1" },
  { label: "½ POT", mult: 0.5, cls: "bg-surface-container-high hover:bg-surface-bright text-on-surface rotate-1" },
  { label: "¾ POT", mult: 0.75, cls: "bg-surface-container-high hover:bg-surface-bright text-on-surface -rotate-1" },
  { label: `POT (${formatCompactChips(tableState.potTotal)})`, mult: 1.0, cls: "bg-primary text-surface-container-lowest rotate-2" },
  { label: "2× POT", mult: 2.0, cls: "bg-secondary text-on-secondary -rotate-2" },
].map((preset) => (
  <button
    key={preset.label}
    className={`preset-btn px-3 py-1 font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm active:translate-y-0.5 transition-transform uppercase cursor-pointer ${preset.cls} ${!canRaise ? "opacity-50 pointer-events-none" : ""}`}
    onClick={() =>
      setBetTarget(
        computePresetTarget(
          tableState.potTotal,
          tableState.highestBet,
          preset.mult,
          minRaiseTarget,
          maxBetTarget
        )
      )
    }
    type="button"
  >
    {preset.label}
  </button>
))}
<button
  className={`preset-btn px-3 py-1 bg-error text-on-error font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm rotate-1 active:translate-y-0.5 transition-transform uppercase cursor-pointer ${!canRaise ? "opacity-50 pointer-events-none" : ""}`}
  onClick={() => setBetTarget(maxBetTarget)}
  type="button"
>
            ALL-IN MAX
          </button>
</div>
{/* Raise Stepper & Range Bar */}
<div className="flex items-center gap-space-sm flex-1 max-w-xl">
<button className="w-10 h-10 bg-surface-container-lowest hover:bg-surface-container-high text-primary border-[3px] border-surface-container-lowest comic-shadow-sm font-headline-md text-headline-md flex items-center justify-center active:translate-y-0.5 cursor-pointer" id="step-down-btn" onClick={() => setBetTarget(Math.max(minRaiseTarget, clampedBet - stepAmount))} type="button">
            -
          </button>
{/* Stepped Slider Track */}
<div className="flex-1 flex flex-col gap-1">
<input className="w-full accent-primary-container h-3 bg-surface-container-lowest border-[2px] border-surface-container-lowest cursor-pointer" disabled={!canRaise} id="bet-slider" max={Math.max(minRaiseTarget, maxBetTarget)} min={minRaiseTarget} onChange={(e) => setBetTarget(Number(e.target.value))} step={stepAmount} type="range" value={clampedBet}/>
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant uppercase">
<span>MIN: {minRaiseTarget.toLocaleString()}</span>
<span className="text-primary-container font-bold" id="slider-val-tag">SLIDER: {clampedBet.toLocaleString()}</span>
<span>MAX: {maxBetTarget.toLocaleString()}</span>
</div>
</div>
<button className="w-10 h-10 bg-surface-container-lowest hover:bg-surface-container-high text-primary border-[3px] border-surface-container-lowest comic-shadow-sm font-headline-md text-headline-md flex items-center justify-center active:translate-y-0.5 cursor-pointer" id="step-up-btn" onClick={() => setBetTarget(Math.min(maxBetTarget, clampedBet + stepAmount))} type="button">
            +
          </button>
{/* Bet Sizing Value Readout */}
<div className="bg-surface-container-lowest px-space-md py-1 border-[3px] border-outline-variant comic-shadow-sm min-w-[130px] text-right">
<span className="font-label-sm text-label-sm text-on-surface-variant block uppercase leading-none">TARGET BET</span>
<span className="font-headline-md text-headline-md text-primary tracking-wide" id="numeric-bet-display">{clampedBet.toLocaleString()}</span>
</div>
</div>
</div>
{/* MAIN BOTTOM ACTION BUTTONS: FOLD / CALL / RAISE / ALL-IN */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-sm">
{/* ACTION 1: FOLD (RED/CHARCOAL CUT-PAPER) */}
<button className={`group relative bg-[#D9453A] hover:bg-[#b03027] text-[#F2EEE4] p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md -rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform flex flex-col justify-center items-center ${!isHeroTurn ? "opacity-50 pointer-events-none" : "cursor-pointer"}`} disabled={!isHeroTurn} id="btn-fold" onClick={fold} type="button">
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">FOLD</span>
<span className="font-label-sm text-label-sm opacity-90 uppercase tracking-widest mt-1">GIVE UP HAND</span>
</button>
{/* ACTION 2: CHECK / CALL OR NEXT HAND */}
{tableState.status === "showdown" ? (
  <button className="group relative bg-primary-container hover:bg-primary-fixed text-on-primary-container p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform flex flex-col justify-center items-center cursor-pointer" id="btn-call" onClick={dealNextHand} type="button">
    <span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">NEXT HAND ⚡</span>
    <span className="font-label-sm text-label-sm opacity-90 uppercase tracking-widest mt-1">DEAL ROUND #{tableState.handNumber + 1}</span>
  </button>
) : (
  <button className={`group relative bg-[#1AA3D4] hover:bg-[#1483aa] text-surface-container-lowest p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform flex flex-col justify-center items-center ${!isHeroTurn ? "opacity-50 pointer-events-none" : "cursor-pointer"}`} disabled={!isHeroTurn} id="btn-call" onClick={checkOrCall} type="button">
    <span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">{canCheck ? "CHECK" : `CALL ${Math.min(hero.stack, toCall).toLocaleString()}`}</span>
    <span className="font-label-sm text-label-sm text-surface-container-lowest opacity-90 uppercase tracking-widest mt-1">{canCheck ? "PASS ACTION FREE" : "MATCH CURRENT SCRAP"}</span>
  </button>
)}
{/* ACTION 3: RAISE TO X (PRIMARY HIGH-CONTRAST YELLOW HERO) */}
<button className={`group relative bg-primary-container hover:bg-primary-fixed text-on-primary-container p-space-sm border-[4px] border-surface-container-lowest comic-shadow-lg -rotate-1.5 hover:rotate-0 active:translate-x-[3px] active:translate-y-[3px] transition-transform flex flex-col justify-center items-center ${!canRaise ? "opacity-50 pointer-events-none" : "cursor-pointer"}`} disabled={!canRaise} id="btn-raise" onClick={() => raiseTo(clampedBet)} type="button">
{/* Spark Accent */}
<div className="absolute -top-3 -right-2 bg-surface-container-lowest text-primary px-1.5 py-0.5 border-[2px] border-surface-container-lowest font-headline-sm text-headline-sm rotate-6">
            HOT!
          </div>
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide" id="raise-btn-label">{tableState.highestBet === 0 ? `BET ${clampedBet.toLocaleString()}` : `RAISE TO ${clampedBet.toLocaleString()}`}</span>
<span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mt-1 font-bold">APPLY PRESSURE</span>
</button>
{/* ACTION 4: ALL-IN (EXPLOSIVE COMIC BURST BADGE) */}
<button className={`group relative bg-error text-on-error p-space-sm border-[4px] border-surface-container-lowest comic-shadow-lg rotate-1 active:translate-x-[3px] active:translate-y-[3px] transition-transform flex flex-col justify-center items-center overflow-hidden ${!isHeroTurn || hero.stack <= 0 ? "opacity-50 pointer-events-none" : "cursor-pointer"}`} disabled={!isHeroTurn || hero.stack <= 0} id="btn-allin" onClick={allIn} type="button">
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">💥 ALL-IN!</span>
<span className="font-label-sm text-label-sm text-on-error uppercase tracking-widest mt-1 font-bold">MAX {maxBetTarget.toLocaleString()} SCRAP</span>
</button>
</div>
</div>
</div>
{/* POPUP MODAL: HAND RANKINGS GUIDE (COMIC BOOK CUTOUT DIALOG) */}
<div className={`fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center p-gutter ${showRankingsModal ? "" : "hidden"}`} id="rankings-modal">
<div className="relative w-full max-w-2xl bg-surface-container border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-1">
{/* Close Button Stamp */}
<button className="absolute -top-4 -right-4 w-10 h-10 bg-error text-on-error font-headline-md text-headline-md border-[3px] border-surface-container-lowest comic-shadow-sm rotate-6 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" id="close-rankings-btn" onClick={() => setShowRankingsModal(false)} type="button">
        ✕
      </button>
{/* Modal Title Strip */}
<div className="bg-primary-container p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-1 mb-space-md flex items-center justify-between">
<span className="font-headline-lg text-headline-lg text-on-primary-container uppercase tracking-wide">POKER HAND HIERARCHY</span>
<span className="font-label-md text-label-md bg-surface-container-lowest text-primary px-2 py-0.5 border-[2px] border-surface-container-lowest uppercase">OFFICIAL SCRAP RULES</span>
</div>
{/* Hand Rankings Staggered Grid */}
<div className="space-y-space-xs max-h-[614px] overflow-y-auto pr-2">
{/* Rank 1 */}
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-primary-container flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-primary-container w-6">01</span>
<div>
<span className="font-headline-sm text-headline-sm text-primary uppercase block">ROYAL FLUSH</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">A, K, Q, J, 10 all of the same suit. The invincible scrap nuts.</span>
</div>
</div>
<div className="flex gap-1">
<span className="w-6 h-8 bg-[#F2EEE4] text-[#101012] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">A♠</span>
<span className="w-6 h-8 bg-[#F2EEE4] text-[#101012] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">K♠</span>
</div>
</div>
{/* Rank 2 */}
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-secondary w-6">02</span>
<div>
<span className="font-headline-sm text-headline-sm text-secondary uppercase block">STRAIGHT FLUSH</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Five cards in numerical sequence, all identical suit.</span>
</div>
</div>
<div className="flex gap-1">
<span className="w-6 h-8 bg-[#F2EEE4] text-[#D9453A] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">9♥</span>
<span className="w-6 h-8 bg-[#F2EEE4] text-[#D9453A] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">8♥</span>
</div>
</div>
{/* Rank 3 */}
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-on-surface-variant w-6">03</span>
<div>
<span className="font-headline-sm text-headline-sm text-primary uppercase block">FOUR OF A KIND</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">All four cards of the same numerical rank.</span>
</div>
</div>
<div className="flex gap-1">
<span className="w-6 h-8 bg-[#F2EEE4] text-[#101012] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">7♠</span>
<span className="w-6 h-8 bg-[#F2EEE4] text-[#D9453A] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">7♥</span>
</div>
</div>
{/* Rank 4 */}
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-on-surface-variant w-6">04</span>
<div>
<span className="font-headline-sm text-headline-sm text-primary uppercase block">FULL HOUSE</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Three of a kind combined with a pair.</span>
</div>
</div>
<div className="flex gap-1">
<span className="w-6 h-8 bg-[#F2EEE4] text-[#1AA3D4] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">Q♦</span>
<span className="w-6 h-8 bg-[#F2EEE4] text-[#7ED957] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">Q♣</span>
</div>
</div>
{/* Rank 5 */}
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-headline-sm text-headline-sm text-on-surface-variant w-6">05</span>
<div>
<span className="font-headline-sm text-headline-sm text-primary uppercase block">FLUSH</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Any five cards of the same suit, not in sequence.</span>
</div>
</div>
<div className="flex gap-1">
<span className="w-6 h-8 bg-[#F2EEE4] text-[#101012] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">♠</span>
<span className="w-6 h-8 bg-[#F2EEE4] text-[#101012] font-headline-sm text-headline-sm flex items-center justify-center border-[1px] border-surface-container-lowest">♠</span>
</div>
</div>
</div>
{/* Footer Note inside Modal */}
<div className="mt-space-md pt-space-xs border-t-[2px] border-surface-container-lowest flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">TIE-BREAKER: HIGHEST KICKER WINS POT.</span>
<button className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-1 border-[2px] border-surface-container-lowest comic-shadow-sm uppercase cursor-pointer" id="close-modal-bottom-btn" onClick={() => setShowRankingsModal(false)} type="button">GOT IT!</button>
</div>
</div>
</div>
{/* ACTION CONFIRMATION COMIC TOAST */}
<div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${toastMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} id="comic-toast">
<div className="bg-primary-container text-on-primary-container px-space-lg py-space-sm border-[4px] border-surface-container-lowest comic-shadow-lg -rotate-2 flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[28px] animate-spin">cyclone</span>
<span className="font-headline-lg text-headline-lg uppercase" id="toast-message">{toastMsg ?? "ACTION COMMITTED!"}</span>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-low border-t-[3px] border-surface-container-lowest py-space-sm px-gutter bg-halftone"><div className="w-full flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-md text-label-md tracking-wider text-on-surface-variant uppercase"><div className="flex items-center gap-space-md"><span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary text-[14px]">verified</span> PROVABLY FAIR RNG</span><span>///</span><span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-secondary text-[14px]">gavel</span> CERTIFIED COMIC RULES</span><span>///</span><span className="flex items-center gap-space-xs text-on-surface-variant"><span className="material-symbols-outlined text-outline text-[14px]">shield</span> SOCIAL CHIPS ONLY</span></div><div className="text-outline text-label-sm font-label-sm">SCRAP ENGINE V2.4 // DISTRESSED DESKTOP RUNNER</div></div></footer>
    </div>
  );
};

export default BattleTable;
