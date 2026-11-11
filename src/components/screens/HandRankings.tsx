import React, { useState } from "react";

export interface HandRankingsProps {
  onBackToLobby?: () => void;
  onNavigateToTable?: () => void;
}

export const HandRankings: React.FC<HandRankingsProps> = ({
  onBackToLobby,
  onNavigateToTable,
}) => {
  const [currentFilter, setCurrentFilter] = useState<"all" | "premium" | "standard" | "low" | "tie">("all");

  const handleFilterChange = (filter: "all" | "premium" | "standard" | "low" | "tie") => {
    setCurrentFilter(filter);
    if (filter === "tie") {
      document.getElementById("tieBreakerSection")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md select-none min-h-screen flex flex-col">
<header className="fixed top-0 left-0 w-full z-50 bg-surface-container-low border-b-[3px] border-surface-container-lowest bg-halftone"><div className="h-20 w-full px-gutter flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-md"><div className="bg-surface-container-highest p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-1 flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary-container text-[24px]">style</span><span className="font-headline-md text-headline-md tracking-wider text-primary uppercase pr-space-xs">SCRAP POKER</span></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container -rotate-1 comic-shadow-sm border-surface-container-lowest"><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="battle-table" href="#" onClick={(e) => { e.preventDefault(); onNavigateToTable?.(); }}>Battle Table</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="lobby" href="#" onClick={(e) => { e.preventDefault(); onBackToLobby?.(); }}>Lobby</a><a aria-current="page" className="px-space-md py-space-xs font-label-lg uppercase tracking-wider transition-transform bg-primary-container text-on-primary-container -rotate-1 comic-shadow-sm border-surface-container-lowest" data-path="hand-rankings" href="#">Hand Rankings</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="leaderboard" href="#">Leaderboard</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="daily-scrap-reward" href="#">Daily Scrap Reward</a></nav></div><div className="hidden md:flex items-center gap-space-xs bg-surface-container-lowest border-[3px] border-outline-variant px-space-md py-space-xs comic-shadow-sm rotate-1"><span className="material-symbols-outlined text-secondary text-[18px]">casino</span><span className="font-headline-sm text-headline-sm tracking-wide text-primary uppercase">SCRAPYARD HIGH STAKES #07</span><span className="text-outline font-headline-sm text-headline-sm">//</span><span className="font-label-md text-label-md text-on-surface-variant uppercase">BLINDS:</span><span className="font-label-lg text-label-lg text-secondary-fixed-dim">500 / 1,000</span></div><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-sm bg-surface-container p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="flex flex-col pr-space-xs"><span className="font-label-sm text-label-sm text-on-surface-variant leading-none">SCRAP RUNNER</span><span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-none">BOLT_RUNNER_99</span></div><div className="bg-surface-container-lowest px-space-sm py-space-xs border-[2px] border-outline-variant flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary-container text-[16px]">token</span><span className="font-label-lg text-label-lg text-primary tracking-wide">450,200 SCRAP</span></div><button className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-x-[2px] active:translate-y-[2px] hover:rotate-0 transition-transform uppercase" type="button">REBUY</button></div><div className="flex items-center gap-space-xs bg-surface-container-low p-space-xs border-[3px] border-surface-container-lowest"><button aria-label="Toggle sound" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">volume_up</span></button><button aria-label="Game settings" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">settings</span></button><button aria-label="Leave table" className="w-8 h-8 flex items-center justify-center text-error hover:bg-error-container hover:text-on-error-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></div></header><main className="w-full pt-20 min-h-screen bg-surface-container-lowest bg-halftone flex flex-col"><div className="flex flex-col w-full px-gutter-mobile md:px-gutter py-space-md max-w-7xl mx-auto space-y-space-lg text-on-surface">
{/* TOP HERO BANNER: DISTRESSED COMIC CUT-PAPER HEADER */}
<section className="relative w-full bg-surface-container-high border-[3px] border-surface-container-lowest comic-shadow-lg p-space-md sm:p-space-lg -rotate-[0.5deg] overflow-hidden bg-halftone">
{/* Action Burst & Tape Accents */}
<div className="absolute -top-3 -left-3 bg-secondary text-on-secondary-container font-headline-sm text-headline-sm uppercase px-space-md py-space-xs rotate-[-3deg] border-[3px] border-surface-container-lowest comic-shadow-sm flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px]">menu_book</span>
      FIELD INTEL #04
    </div>
<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pt-space-xs">
<div className="space-y-space-xs max-w-3xl">
<div className="inline-flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-[2px] border-[2px] border-outline-variant">
<span className="w-2.5 h-2.5 bg-primary-container rounded-none"></span>
<span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">TEXAS HOLD'EM FORMAL CODEX // STANDARD 52-CARD MATRIX</span>
</div>
<div className="flex flex-wrap items-baseline gap-x-space-md gap-y-1">
<h1 className="font-display-xl text-display-xl text-primary uppercase tracking-tight drop-shadow-[3px_3px_0px_#000000]">
            HAND HIERARCHY
          </h1>
<span className="font-headline-md text-headline-md text-secondary tracking-wider uppercase">
            [TEN COMBINATIONS // STRONGEST TO WEAKEST]
          </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Study the scrap manual before laying down chips in the yard. Hands are ranked strictly by absolute mathematical precedence. In Texas Hold'em, build the best 5-card weapon using any combination of your 2 hole cards and the 5 board cards.
        </p>
</div>
{/* Quick Action Deck */}
<div className="flex flex-row sm:flex-col items-center sm:items-end gap-space-sm w-full lg:w-auto shrink-0">
<button className="w-full sm:w-auto bg-primary-container hover:bg-surface-tint text-on-primary-container font-headline-sm text-headline-sm px-space-lg py-space-xs border-[2px] border-surface-container-lowest comic-shadow-sm uppercase flex items-center justify-center gap-space-xs cursor-pointer" onClick={() => onNavigateToTable?.()} type="button">
<span className="material-symbols-outlined text-[24px]">sports_esports</span>
          RETURN TO TABLE
        </button>
<div className="hidden sm:flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs border-[2px] border-outline-variant font-label-md text-label-md text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-[16px]">shuffle</span>
<span>CARD RANKS: A &gt; K &gt; Q &gt; J &gt; T &gt; 9 &gt; 8 &gt; 7 &gt; 6 &gt; 5 &gt; 4 &gt; 3 &gt; 2</span>
</div>
</div>
</div>
{/* Suit Legend Tape Ribbon */}
<div className="mt-space-md pt-space-sm border-t-[2px] border-surface-container-lowest flex flex-wrap items-center justify-between gap-space-sm font-label-md text-label-md">
<div className="flex items-center gap-space-md flex-wrap">
<span className="text-outline uppercase font-label-lg text-label-lg">SCRAP SUIT PALETTE:</span>
<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 border-[2px] border-surface-container-highest">
<span className="text-on-surface text-[18px] font-bold">♠</span>
<span className="text-on-surface uppercase">SPADES [INK]</span>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 border-[2px] border-surface-container-highest">
<span className="text-on-tertiary-container text-[18px] font-bold">♥</span>
<span className="text-on-tertiary-container uppercase">HEARTS [RED #D945]</span>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 border-[2px] border-surface-container-highest">
<span className="text-secondary text-[18px] font-bold">♦</span>
<span className="text-secondary uppercase">DIAMONDS [CYAN #1AA3]</span>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 border-[2px] border-surface-container-highest">
<span className="text-primary-fixed-dim text-[18px] font-bold">♣</span>
<span className="text-primary-fixed-dim uppercase">CLUBS [ACID #7ED9]</span>
</div>
</div>
<div className="text-outline text-label-sm font-label-sm italic">
        *ALL SUITS ARE EQUAL RANK. NO SUIT OUTRANKS ANOTHER.
      </div>
</div>
</section>
{/* FILTER CONTROLS & BREADCRUMB STRIP */}
<section className="flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex flex-wrap items-center gap-space-xs" id="rankFilterRack">
  <button
    className={"filter-btn font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[-1deg] transition-transform uppercase cursor-pointer " + (currentFilter === "all" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary")}
    onClick={() => handleFilterChange("all")}
    type="button"
  >
    ALL 10 TIERS
  </button>
  <button
    className={"filter-btn font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[0.5deg] transition-transform uppercase cursor-pointer " + (currentFilter === "premium" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary")}
    onClick={() => handleFilterChange("premium")}
    type="button"
  >
    PREMIUM (#1 - #4)
  </button>
  <button
    className={"filter-btn font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[-0.5deg] transition-transform uppercase cursor-pointer " + (currentFilter === "standard" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary")}
    onClick={() => handleFilterChange("standard")}
    type="button"
  >
    STANDARD (#5 - #7)
  </button>
  <button
    className={"filter-btn font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[1deg] transition-transform uppercase cursor-pointer " + (currentFilter === "low" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-primary")}
    onClick={() => handleFilterChange("low")}
    type="button"
  >
    PAIR & HIGH (#8 - #10)
  </button>
  <button
    className={"filter-btn font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[-1deg] transition-transform uppercase flex items-center gap-space-xs cursor-pointer " + (currentFilter === "tie" ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-secondary hover:text-primary-container")}
    onClick={() => handleFilterChange("tie")}
    type="button"
  >
    <span className="material-symbols-outlined text-[16px]">balance</span>
    TIE-BREAKER PROTOCOL
  </button>
</div>

{/* Quick Stats Metric */}
<div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs border-[2px] border-outline-variant font-label-md text-label-md text-outline">
<span className="text-primary font-bold">2,598,960</span> TOTAL 5-CARD COMBINATIONS
    </div>
</section>
{/* GRID OF 10 POKER HANDS */}
<main className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg" id="handRankingsGrid">
{/* #1 ROYAL FLUSH */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "premium") ? "block" : "hidden")} data-category="premium" data-rank="1">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-[0.8deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
{/* Floating Sticker Comic Burst */}
<div className="absolute -top-3.5 right-12 sm:right-16 bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-1 border-[3px] border-surface-container-lowest comic-shadow-md rotate-[4deg] uppercase tracking-wider z-20 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">star</span>
          SUPREME COMBINATION
        </div>
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-primary-container text-on-primary-container border-[3px] border-surface-container-lowest font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm -rotate-3">
                #1
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  ROYAL FLUSH
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  ABSOLUTE PINNACLE // ZERO DEFEATS
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                0.000154% [1 in 649,740]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Ace, King, Queen, Jack, and Ten, all of the exact same suit. The most lethal, impenetrable hand in poker rules. Splits pot only against another Royal Flush in community card variants.
          </p>
{/* The Five Cards Graphic: A♠ K♠ Q♠ J♠ 10♠ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* A♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>A</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>A</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* K♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>K</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>K</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* Q♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>Q</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>Q</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* J♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>J</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>J</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 10♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>10</span>
<span className="text-[14px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>10</span>
<span className="text-[14px]">♠</span>
</div>
</div>
</div>
</div>
{/* Scrap Footnote */}
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">SCRAP RULE:</span>
<span>4 POSSIBLE TOTAL SUIT CONFIGURATIONS</span>
</div>
</div>
</article>
{/* #2 STRAIGHT FLUSH */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "premium") ? "block" : "hidden")} data-category="premium" data-rank="2">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg rotate-[0.7deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div className="absolute -top-3 -right-2 bg-on-tertiary-container text-tertiary font-headline-sm text-headline-sm px-space-md py-0.5 border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[-2deg] uppercase tracking-wider z-20">
          HEAVY ARTILLERY
        </div>
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm rotate-2">
                #2
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  STRAIGHT FLUSH
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  NUMERIC SEQUENCE // SINGLE SUIT
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                0.00139% [1 in 72,193]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Five sequential cards of the exact same suit, non-Ace high. In ties, highest top ranking card claims the scrap heap. (e.g. 9-high Straight Flush crushes 7-high).
          </p>
{/* The Five Cards Graphic: 9♥ 8♥ 7♥ 6♥ 5♥ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* 9♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>9</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>9</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 8♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>8</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>8</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 7♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>7</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>7</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 6♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>6</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>6</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 5♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>5</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>5</span>
<span className="text-[16px]">♥</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">5-HIGH MINIMUM:</span>
<span>5-4-3-2-A IS STEEL WHEEL</span>
</div>
</div>
</article>
{/* #3 FOUR OF A KIND */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "premium") ? "block" : "hidden")} data-category="premium" data-rank="3">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-[0.6deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div className="absolute -top-3.5 -right-3 bg-secondary text-on-secondary font-headline-sm text-headline-sm px-space-md py-0.5 border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[3deg] uppercase tracking-wider z-20">
          QUADS!
        </div>
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm -rotate-2">
                #3
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  FOUR OF A KIND
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  QUAD IDENTICAL RANKS + KICKER
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                0.0240% [1 in 4,165]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Four cards of the identical numeric value across all suits, flanked by a fifth single side card (the kicker). Higher quad values beat lower quad values; kicker breaks rare board ties.
          </p>
{/* The Five Cards Graphic: Q♣ Q♦ Q♠ Q♥ 4♠ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* Q♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>Q</span>
<span className="text-[16px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>Q</span>
<span className="text-[16px]">♣</span>
</div>
</div>
{/* Q♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>Q</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>Q</span>
<span className="text-[16px]">♦</span>
</div>
</div>
{/* Q♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>Q</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>Q</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* Q♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>Q</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>Q</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 4♠ (Kicker) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>4</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICKER</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>4</span>
<span className="text-[16px]">♠</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">KICKER EFFECT:</span>
<span>5TH CARD BREAKS MUTUAL QUAD TIES</span>
</div>
</div>
</article>
{/* #4 FULL HOUSE */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "premium") ? "block" : "hidden")} data-category="premium" data-rank="4">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg rotate-[0.9deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div className="absolute -top-3.5 -right-2 bg-primary text-surface-container-lowest font-headline-sm text-headline-sm px-space-md py-0.5 border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[-2.5deg] uppercase tracking-wider z-20">
          THE "BOAT"
        </div>
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm rotate-1">
                #4
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  FULL HOUSE
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  THREE OF A KIND + MATCHING PAIR
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                0.1441% [1 in 694]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Three cards of one rank matched with two cards of a separate rank (e.g. "Jacks full of Eights"). The rank of the three cards decides the winner first; then the pair breaks ties.
          </p>
{/* The Five Cards Graphic: J♦ J♠ J♥ 8♣ 8♦ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* J♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>J</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>J</span>
<span className="text-[16px]">♦</span>
</div>
</div>
{/* J♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>J</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>J</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* J♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>J</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>J</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 8♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>8</span>
<span className="text-[16px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>8</span>
<span className="text-[16px]">♣</span>
</div>
</div>
{/* 8♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>8</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>8</span>
<span className="text-[16px]">♦</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">HIERARCHY NOTE:</span>
<span>J-J-J-2-2 CRUSHES 10-10-10-A-A</span>
</div>
</div>
</article>
{/* #5 FLUSH */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "standard") ? "block" : "hidden")} data-category="standard" data-rank="5">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-[0.5deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm -rotate-1">
                #5
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  FLUSH
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  SAME SUIT // NON-CONSECUTIVE
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                0.1965% [1 in 508]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Any five cards of the same uniform suit, not in numerical sequence. When two or more scrap fighters hold a flush, the player holding the single highest card wins.
          </p>
{/* The Five Cards Graphic: K♠ J♠ 8♠ 4♠ 3♠ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* K♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>K</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>K</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* J♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>J</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>J</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 8♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>8</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>8</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 4♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>4</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>4</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 3♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>3</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>3</span>
<span className="text-[16px]">♠</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">DECIDER:</span>
<span>COMPARE HIGHEST DOWNWARD: K &gt; J &gt; 8 &gt; 4 &gt; 3</span>
</div>
</div>
</article>
{/* #6 STRAIGHT */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "standard") ? "block" : "hidden")} data-category="standard" data-rank="6">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg rotate-[0.6deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm rotate-2">
                #6
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  STRAIGHT
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  5 CONSECUTIVE RANKS // MIXED SUITS
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                0.3925% [1 in 254]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Five sequential rank numbers in any combination of different suits. Ace may sit as either high (A-K-Q-J-T Broadway) or low (5-4-3-2-A Wheel), but cannot wrap around (e.g. 2-A-K-Q-J is invalid).
          </p>
{/* The Five Cards Graphic: 10♣ 9♦ 8♠ 7♥ 6♣ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* 10♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>10</span>
<span className="text-[14px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>10</span>
<span className="text-[14px]">♣</span>
</div>
</div>
{/* 9♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>9</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>9</span>
<span className="text-[16px]">♦</span>
</div>
</div>
{/* 8♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>8</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>8</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 7♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>7</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>7</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 6♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>6</span>
<span className="text-[16px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>6</span>
<span className="text-[16px]">♣</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">ACE FLEXIBILITY:</span>
<span>TOP OF BROADWAY / LOW OF THE WHEEL</span>
</div>
</div>
</article>
{/* #7 THREE OF A KIND */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "standard") ? "block" : "hidden")} data-category="standard" data-rank="7">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-[0.7deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div className="absolute -top-3 -right-2 bg-surface-variant text-primary font-headline-sm text-headline-sm px-space-md py-0.5 border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[-1deg] uppercase tracking-wider z-20">
          TRIPS // SET
        </div>
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm -rotate-2">
                #7
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  THREE OF A KIND
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  THREE IDENTICAL VALUES + 2 KICKERS
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                2.1128% [1 in 47.3]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Three cards of matching rank with two unrelated kickers. Often termed a "Set" when holding a pocket pair matching a board card, or "Trips" when holding one card matching a pair on board.
          </p>
{/* The Five Cards Graphic: 7♠ 7♦ 7♣ K♥ 2♠ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* 7♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>7</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>7</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 7♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>7</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>7</span>
<span className="text-[16px]">♦</span>
</div>
</div>
{/* 7♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>7</span>
<span className="text-[16px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>7</span>
<span className="text-[16px]">♣</span>
</div>
</div>
{/* K♥ (Kicker 1) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>K</span>
<span className="text-on-tertiary-container text-[16px]">♥</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICK #1</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>K</span>
<span className="text-on-tertiary-container text-[16px]">♥</span>
</div>
</div>
{/* 2♠ (Kicker 2) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>2</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICK #2</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>2</span>
<span className="text-[16px]">♠</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">KICKER CHAIN:</span>
<span>HIGHER KICKER CLAIMS SPLIT CASES</span>
</div>
</div>
</article>
{/* #8 TWO PAIR */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "low") ? "block" : "hidden")} data-category="low" data-rank="8">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg rotate-[0.8deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm rotate-1">
                #8
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  TWO PAIR
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  TWO COUPLES + SINGLE KICKER
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                4.7539% [1 in 21]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Two distinct pairs of identical numerical ranks plus one 5th card kicker. Higher top pair beats lower top pair (Aces and Threes defeats Kings and Queens).
          </p>
{/* The Five Cards Graphic: A♣ A♦ 9♠ 9♥ 5♦ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* A♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>A</span>
<span className="text-[16px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>A</span>
<span className="text-[16px]">♣</span>
</div>
</div>
{/* A♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>A</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>A</span>
<span className="text-[16px]">♦</span>
</div>
</div>
{/* 9♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>9</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>9</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* 9♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>9</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>9</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 5♦ (Kicker) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>5</span>
<span className="text-secondary text-[16px]">♦</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICKER</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>5</span>
<span className="text-secondary text-[16px]">♦</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">COMPARING:</span>
<span>TOP PAIR &gt; SECOND PAIR &gt; 5TH KICKER</span>
</div>
</div>
</article>
{/* #9 ONE PAIR */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "low") ? "block" : "hidden")} data-category="low" data-rank="9">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-[0.5deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-primary border-[3px] border-outline-variant font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm -rotate-1">
                #9
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  ONE PAIR
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  TWO MATCHING CARDS + 3 KICKERS
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                42.2569% [1 in 2.4]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            Two cards sharing the identical value, backed by three distinct kickers. Most common showdown confrontation; kickers frequently make or break entire chip stacks.
          </p>
{/* The Five Cards Graphic: 10♥ 10♦ A♠ K♣ 4♦ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* 10♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>10</span>
<span className="text-[14px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>10</span>
<span className="text-[14px]">♥</span>
</div>
</div>
{/* 10♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>10</span>
<span className="text-[14px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>10</span>
<span className="text-[14px]">♦</span>
</div>
</div>
{/* A♠ (Kicker 1) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>A</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICK #1</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>A</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* K♣ (Kicker 2) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>K</span>
<span className="text-primary-fixed-dim text-[16px]">♣</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICK #2</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>K</span>
<span className="text-primary-fixed-dim text-[16px]">♣</span>
</div>
</div>
{/* 4♦ (Kicker 3) */}
<div className="bg-surface-variant text-on-surface border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform opacity-90">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>4</span>
<span className="text-secondary text-[16px]">♦</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-outline">KICK #3</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>4</span>
<span className="text-secondary text-[16px]">♦</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-primary font-bold">MATCH:</span>
<span>IF PAIR TIED, COMPARE KICKERS HIGH-TO-LOW</span>
</div>
</div>
</article>
{/* #10 HIGH CARD */}
<article className={"hand-card " + ((currentFilter === "all" || currentFilter === "tie" || currentFilter === "low") ? "block" : "hidden")} data-category="low" data-rank="10">
<div className="relative bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg rotate-[0.7deg] hover:rotate-0 transition-transform bg-halftone flex flex-col justify-between h-full group">
<div className="absolute -top-3 -right-2 bg-surface-container-lowest text-error font-headline-sm text-headline-sm px-space-md py-0.5 border-[3px] border-surface-container-lowest comic-shadow-sm rotate-[2deg] uppercase tracking-wider z-20">
          BARE METAL
        </div>
<div>
{/* Header Bar */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 bg-surface-container-lowest text-error border-[3px] border-error-container font-headline-md text-headline-md flex items-center justify-center comic-shadow-sm rotate-2">
                #10
              </span>
<div>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase leading-tight tracking-wider">
                  HIGH CARD
                </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  NO COMBINATIONS // STRICT NUMERICAL RANK
                </span>
</div>
</div>
<div className="text-right">
<span className="inline-block bg-surface-container-lowest border-[2px] border-outline-variant px-space-sm py-0.5 font-label-sm text-label-sm text-secondary-fixed">
                50.1177% [1 in 2.0]
              </span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface mb-space-md">
            When no player has made any paired, straight, or flush combination. The winner is the player holding the single highest value card (Ace being maximum).
          </p>
{/* The Five Cards Graphic: A♠ Q♦ 9♣ 7♥ 3♠ */}
<div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-md">
{/* A♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform ring-2 ring-primary-container">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>A</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-label-sm text-label-sm uppercase leading-none my-auto font-bold text-on-primary-container bg-primary-container px-1 py-0.5">HIGH</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>A</span>
<span className="text-[16px]">♠</span>
</div>
</div>
{/* Q♦ */}
<div className="bg-primary text-secondary border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>Q</span>
<span className="text-[16px]">♦</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♦</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>Q</span>
<span className="text-[16px]">♦</span>
</div>
</div>
{/* 9♣ */}
<div className="bg-primary text-primary-fixed-dim border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-2 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>9</span>
<span className="text-[16px]">♣</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♣</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>9</span>
<span className="text-[16px]">♣</span>
</div>
</div>
{/* 7♥ */}
<div className="bg-primary text-on-tertiary-container border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>7</span>
<span className="text-[16px]">♥</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♥</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>7</span>
<span className="text-[16px]">♥</span>
</div>
</div>
{/* 3♠ */}
<div className="bg-primary text-surface-container-lowest border-[3px] border-surface-container-lowest comic-shadow-sm p-1.5 sm:p-2.5 flex flex-col justify-between aspect-[5/7] -rotate-1 group-hover:rotate-0 transition-transform">
<div className="flex justify-between items-start leading-none font-headline-sm text-headline-sm">
<span>3</span>
<span className="text-[16px]">♠</span>
</div>
<div className="text-center font-display-lg text-display-lg leading-none my-auto">♠</div>
<div className="flex justify-between items-end leading-none font-headline-sm text-headline-sm rotate-180">
<span>3</span>
<span className="text-[16px]">♠</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border-[2px] border-surface-container-highest p-space-xs font-label-md text-label-md flex items-center justify-between text-on-surface-variant">
<span className="uppercase text-error font-bold">LOWEST TIER:</span>
<span>DEFEATED BY ANY VALID PAIR</span>
</div>
</div>
</article>
</main>
{/* SPECIAL SECTION: COMIC INTEL DOSSIER (TIE-BREAKERS & SPLIT POT RULES) */}
<section className="relative w-full bg-surface-container-high border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md sm:p-space-lg rotate-[-0.3deg] bg-halftone mt-space-xl" id="tieBreakerSection">
<div className="absolute -top-3.5 left-6 bg-error-container text-tertiary-fixed font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-2 uppercase tracking-wider flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px]">gavel</span>
      OFFICIAL SCRAPYARD TIE-BREAKER PROTOCOL
    </div>
<div className="pt-space-sm space-y-space-md">
<div className="max-w-3xl">
<h3 className="font-headline-lg text-headline-lg text-primary uppercase tracking-wide">
          WHAT HAPPENS WHEN HANDS COLLIDE?
        </h3>
<p className="font-body-md text-body-md text-on-surface-variant">
          Standard Texas Hold'em resolves showdown ties through strict card-by-card comparison rules. Suits never break ties.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/* Rule #1: The 5-Card Mandate */}
<div className="bg-surface-container-lowest border-[3px] border-surface-container-highest p-space-md comic-shadow-sm -rotate-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-headline-sm text-headline-sm text-primary uppercase">1. THE 5-CARD RULE</span>
<span className="material-symbols-outlined text-secondary text-[20px]">style</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              Only your best five cards matter. Sixth or seventh cards in your hand or on the board are entirely discarded. If the 5 board cards form a Royal Flush, every active player chops the pot equally!
            </p>
</div>
<div className="mt-space-sm pt-space-xs border-t border-outline-variant font-label-sm text-label-sm text-outline uppercase">
            NO 6TH CARD TIE-BREAKERS
          </div>
</div>
{/* Rule #2: Kickers & Side Cards */}
<div className="bg-surface-container-lowest border-[3px] border-surface-container-highest p-space-md comic-shadow-sm rotate-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-headline-sm text-headline-sm text-primary uppercase">2. THE KICKER SYSTEM</span>
<span className="material-symbols-outlined text-primary-container text-[20px]">bolt</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              If two players have identical pairs (e.g. both have a Pair of Aces), the highest remaining non-paired card (kicker) decides the pot. If kickers tie, the 2nd and 3rd kickers are sequentially compared.
            </p>
</div>
<div className="mt-space-sm pt-space-xs border-t border-outline-variant font-label-sm text-label-sm text-outline uppercase">
            A-A-K-7-2 BEATS A-A-Q-J-10
          </div>
</div>
{/* Rule #3: Split Pots & Chops */}
<div className="bg-surface-container-lowest border-[3px] border-surface-container-highest p-space-md comic-shadow-sm -rotate-0.5 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-headline-sm text-headline-sm text-primary uppercase">3. CHOPPED POTS</span>
<span className="material-symbols-outlined text-on-tertiary-container text-[20px]">call_split</span>
</div>
<p className="font-body-md text-body-md text-on-surface">
              If all five active cards match identically in rank between two contenders, the scrap pot is divided evenly (a Chop). Odd chips go to the player positioned earliest left of the dealer button.
            </p>
</div>
<div className="mt-space-sm pt-space-xs border-t border-outline-variant font-label-sm text-label-sm text-outline uppercase">
            POSITION DECIDES ODD SCRAP
          </div>
</div>
</div>
{/* Quick Interactive Probability & Odds Table (Accordion / Drawer Strip) */}
<div className="bg-surface-container p-space-md border-[3px] border-surface-container-lowest comic-shadow-sm flex flex-col lg:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md border-[2px] border-surface-container-lowest comic-shadow-sm -rotate-3">
            %
          </div>
<div>
<span className="font-headline-sm text-headline-sm text-primary uppercase block">LOOKING FOR STARTING HAND CHARTS?</span>
<span className="font-body-md text-body-md text-on-surface-variant">Check pre-flop probabilities before jamming all-in with rag aces.</span>
</div>
</div>
<div className="flex items-center gap-space-sm w-full lg:w-auto">
<button className="w-full sm:w-auto bg-surface-container-lowest hover:bg-surface-variant text-primary font-headline-sm text-headline-sm px-space-md py-space-xs border-[2px] border-outline-variant comic-shadow-sm uppercase flex items-center justify-center gap-space-xs cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} type="button">
<span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            BACK TO TOP
          </button>
<button className="w-full sm:w-auto bg-primary-container hover:bg-surface-tint text-on-primary-container font-headline-sm text-headline-sm px-space-lg py-space-xs border-[2px] border-surface-container-lowest comic-shadow-sm uppercase flex items-center justify-center gap-space-xs cursor-pointer" onClick={() => onNavigateToTable?.()} type="button">
            PLAY NOW
          </button>
</div>
</div>
</div>
</section>
</div>
</main><footer className="w-full bg-surface-container-low border-t-[3px] border-surface-container-lowest py-space-sm px-gutter bg-halftone"><div className="w-full flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-md text-label-md tracking-wider text-on-surface-variant uppercase"><div className="flex items-center gap-space-md"><span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary text-[14px]">verified</span> PROVABLY FAIR RNG</span><span>///</span><span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-secondary text-[14px]">gavel</span> CERTIFIED COMIC RULES</span><span>///</span><span className="flex items-center gap-space-xs text-on-surface-variant"><span className="material-symbols-outlined text-outline text-[14px]">shield</span> SOCIAL CHIPS ONLY</span></div><div className="text-outline text-label-sm font-label-sm">SCRAP ENGINE V2.4 // DISTRESSED DESKTOP RUNNER</div></div></footer>
    </div>
  );
};

export default HandRankings;
