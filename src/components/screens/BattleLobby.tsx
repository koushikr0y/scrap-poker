import React, { useState } from "react";

export interface BattleLobbyProps {
  onNavigateToTable?: () => void;
  onNavigateToCashBrowser?: () => void;
}

export const BattleLobby: React.FC<BattleLobbyProps> = ({
  onNavigateToTable,
  onNavigateToCashBrowser,
}) => {
  const [speedMode, setSpeedMode] = useState<"std" | "fast">("std");
  const [bonusClaimed, setBonusClaimed] = useState<boolean>(false);
  const [showMatchmaking, setShowMatchmaking] = useState<boolean>(false);
  const [showRankings, setShowRankings] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleCopyGang = () => {
    navigator.clipboard?.writeText?.("#SCRAP-8849-GANG");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
<header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low ink-border-3 border-t-0 border-x-0 cel-shadow-sm select-none"> <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md"> <div className="flex items-center gap-space-lg"> <a className="flex items-center gap-space-sm transform -rotate-1 hover:rotate-0 transition-transform" href="#"> <div className="bg-primary-container ink-border-3 px-space-md py-space-xs cel-shadow-sm flex items-center gap-space-xs"> <span className="material-symbols-outlined text-on-primary-container text-[24px]">style</span> <span className="font-headline-md text-headline-md tracking-wider uppercase text-on-primary-container leading-none">SCRAP POKER</span></div> <div className="hidden sm:inline-block bg-error-container ink-border-3 px-space-xs py-0 transform rotate-3"> <span className="font-label-sm text-label-sm uppercase text-on-error-container">ZINE #07</span></div></a> <nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm ink-border-3 cel-shadow-sm transform -rotate-1"> <a className="px-space-md py-space-xs font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" data-path="battle-table" href="#" onClick={(e) => { e.preventDefault(); onNavigateToTable?.(); }}>Battle Table</a> <a aria-current="page" className="px-space-md py-space-xs uppercase tracking-wider transition-all bg-primary-container text-on-primary-container font-headline-sm text-headline-sm ink-border-3 cel-shadow-sm transform -rotate-1" data-path="lobby" href="#">Lobby</a> <a className="px-space-md py-space-xs font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" data-path="hand-rankings" href="#">Hand Rankings</a> <a className="px-space-md py-space-xs font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" data-path="leaderboard" href="#">Leaderboard</a> <a className="px-space-md py-space-xs font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" data-path="daily-reward" href="#">Daily Reward</a></nav></div> <div className="flex items-center gap-space-md"> <div className="hidden md:flex items-center bg-surface-container ink-border-3 p-space-xs cel-shadow-sm transform rotate-1"> <div className="w-9 h-9 bg-secondary ink-border-3 flex items-center justify-center"> <span className="material-symbols-outlined text-on-secondary text-[20px]">electric_bolt</span></div> <div className="px-space-sm flex flex-col justify-center"> <span className="font-label-sm text-label-sm uppercase text-on-surface-variant leading-none">Bolt_Runner_99</span> <span className="font-headline-sm text-headline-sm text-primary leading-tight">450,200 <span className="font-label-sm text-label-sm text-primary-fixed-dim">SCRAP</span></span></div></div> <button className="hidden sm:flex items-center gap-space-xs bg-error-container ink-border-3 px-space-md py-space-xs cel-shadow text-on-error-container hover:bg-error hover:text-on-error active:translate-x-[2px] active:translate-y-[2px] active:cel-shadow-sm transition-all transform -rotate-1"> <span className="material-symbols-outlined text-[18px]">replay</span> <span className="font-headline-sm text-headline-sm uppercase leading-none">REBUY</span></button> <div className="flex items-center gap-space-xs"> <button aria-label="Toggle sound" className="w-10 h-10 bg-surface-container ink-border-3 flex items-center justify-center text-on-surface cel-shadow-sm hover:bg-surface-bright active:translate-x-[1px] active:translate-y-[1px]"> <span className="material-symbols-outlined text-[20px]">volume_up</span></button> <button aria-label="Settings" className="w-10 h-10 bg-surface-container ink-border-3 flex items-center justify-center text-on-surface cel-shadow-sm hover:bg-surface-bright active:translate-x-[1px] active:translate-y-[1px]"> <span className="material-symbols-outlined text-[20px]">tune</span></button> <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ink-border-3"> <span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div></header> <main className="w-full pt-20 bg-background flex-1 halftone-bg"> <div className="flex flex-col w-full">
{/* Dynamic Matchmaking Overlay (Toggled via JS) */}
<div id="matchmaking-overlay" className={`fixed inset-0 z-50 bg-background/90 backdrop-blur-sm ${showMatchmaking ? "flex" : "hidden"} items-center justify-center p-space-lg select-none`}> <div className="relative w-full max-w-lg bg-surface-container ink-border-4 p-space-xl cel-shadow-lg transform -rotate-1"> <div className="absolute -top-6 -right-6 bg-error-container ink-border-3 px-space-md py-space-xs cel-shadow transform rotate-6"> <span className="font-headline-sm text-headline-sm uppercase text-on-error-container tracking-wider">LIVE QUEUE</span>
</div> <div className="flex items-center gap-space-sm mb-space-md"> <span className="material-symbols-outlined text-primary-container text-headline-lg animate-spin">cyclone</span> <h3 className="font-display-lg text-display-lg text-primary uppercase leading-none">AUTO-SEAT ACTIVATED</h3>
</div> <p className="font-body-lg text-body-lg text-on-surface mb-space-lg">SEARCHING SCRAPYARDS FOR OPTIMAL 500/1,000 TABLE STACK...</p> <div className="bg-surface-container-lowest p-space-md ink-border-3 mb-space-lg"> <div className="flex justify-between items-center mb-space-xs font-label-md text-label-md text-on-surface-variant uppercase"> <span>CONNECTING TO SYNDICATE DECK</span> <span className="text-secondary font-headline-sm">00:04</span>
</div> <div className="w-full h-4 bg-surface-variant ink-border-3 p-0.5 overflow-hidden"> <div className="h-full bg-primary-container w-2/3 animate-pulse"></div>
</div> <div className="mt-space-sm flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant"> <span className="flex items-center gap-space-xs"> <span className="material-symbols-outlined text-[16px] text-secondary">casino</span> SHUFFLING HARD PLASTIC DECK</span> <span className="text-error font-bold tracking-wider uppercase">PING: 24ms</span>
</div>
</div> <div className="flex gap-space-sm justify-end"> <button className="bg-surface-variant ink-border-3 px-space-lg py-space-xs font-headline-sm text-headline-sm text-on-surface hover:bg-surface-bright active:translate-x-0.5 active:translate-y-0.5 cel-shadow uppercase" onClick={() => setShowMatchmaking(false)}>
          ABORT QUEUE
        </button>
</div>
</div>
</div>
{/* Hand Rankings Slide-Over Modal */}
<div id="rankings-modal" className={`fixed inset-0 z-50 bg-background/85 backdrop-blur-sm ${showRankings ? "flex" : "hidden"} items-center justify-center p-space-md select-none`}> <div className="relative w-full max-w-2xl max-h-[921px] overflow-y-auto bg-surface-container ink-border-4 p-space-xl cel-shadow-lg transform rotate-0.5"> <div className="flex items-center justify-between pb-space-md mb-space-md border-b-4 border-surface-container-lowest"> <div className="flex items-center gap-space-sm"> <div className="w-10 h-10 bg-primary-container ink-border-3 flex items-center justify-center text-on-primary-container"> <span className="material-symbols-outlined">military_tech</span>
</div> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">RULE SHEET CHEAT SHEET</span> <h2 className="font-display-lg text-display-lg text-primary uppercase leading-none">10 TIERS HAND RANKINGS</h2>
</div>
</div> <button className="w-10 h-10 bg-error-container ink-border-3 text-on-error-container flex items-center justify-center cel-shadow hover:bg-error transition-all" onClick={() => setShowRankings(false)}> <span className="material-symbols-outlined">close</span>
</button>
</div> <div className="space-y-space-sm font-body-md text-body-md"> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#1</span> <span className="font-headline-sm text-headline-sm text-on-surface">ROYAL FLUSH</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-primary-fixed-dim ink-border-3">A♠ K♠ Q♠ J♠ 10♠</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#2</span> <span className="font-headline-sm text-headline-sm text-on-surface">STRAIGHT FLUSH</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface ink-border-3">9♥ 8♥ 7♥ 6♥ 5♥</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#3</span> <span className="font-headline-sm text-headline-sm text-on-surface">FOUR OF A KIND (QUADS)</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-secondary-fixed ink-border-3">K♦ K♠ K♣ K♥ + 2♣</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#4</span> <span className="font-headline-sm text-headline-sm text-on-surface">FULL HOUSE (BOAT)</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface ink-border-3">J♥ J♦ J♠ 4♣ 4♠</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#5</span> <span className="font-headline-sm text-headline-sm text-on-surface">FLUSH</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-error ink-border-3">A♦ 10♦ 7♦ 6♦ 2♦</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#6</span> <span className="font-headline-sm text-headline-sm text-on-surface">STRAIGHT</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface ink-border-3">Q♣ J♠ 10♦ 9♥ 8♠</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#7</span> <span className="font-headline-sm text-headline-sm text-on-surface">THREE OF A KIND (TRIPS/SET)</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface ink-border-3">8♣ 8♦ 8♠ A♥ 4♦</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#8</span> <span className="font-headline-sm text-headline-sm text-on-surface">TWO PAIR</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface ink-border-3">A♣ A♥ 9♠ 9♦ 3♣</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#9</span> <span className="font-headline-sm text-headline-sm text-on-surface">ONE PAIR</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface ink-border-3">10♠ 10♥ K♦ 7♣ 2♥</div>
</div> <div className="flex items-center justify-between p-space-sm bg-surface-container-high ink-border-3"> <div className="flex items-center gap-space-md"> <span className="font-headline-sm text-headline-sm text-primary-container">#10</span> <span className="font-headline-sm text-headline-sm text-on-surface">HIGH CARD</span>
</div> <div className="font-label-lg text-label-lg bg-surface-container-lowest px-space-sm py-1 text-on-surface-variant ink-border-3">A♠ J♥ 8♦ 5♣ 2♠</div>
</div>
</div>
</div>
</div> <div className="w-full max-w-7xl mx-auto px-gutter py-space-lg flex flex-col gap-space-xl">
{/* SECTION 1: HERO / COMMAND STRIP */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
{/* HERO LEFT: QUICK PLAY COMMAND PANEL */}
<div className="lg:col-span-5 bg-surface-container ink-border-4 p-space-lg cel-shadow-lg flex flex-col justify-between relative overflow-hidden transform -rotate-0.5">
{/* Visual Accent Corner Stamp */}
<div className="absolute -top-3 -left-3 bg-error ink-border-3 px-space-sm py-0.5 transform -rotate-6 z-10"> <span className="font-headline-sm text-headline-sm text-on-error uppercase tracking-wider">HOT ACTION!</span>
</div> <div className="pt-space-xs"> <div className="flex items-center justify-between mb-space-xs"> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">// COMMAND TERMINAL</span> <span className="bg-surface-variant px-space-xs font-label-sm text-label-sm text-primary">TIER 1 QUEUE</span>
</div> <h1 className="font-display-xl text-display-xl uppercase text-primary leading-none tracking-tight mb-space-sm">
            SCRAP SLINGER
          </h1> <p className="font-body-lg text-body-lg text-on-surface-variant uppercase mb-space-lg leading-tight">
            NO TIME TO SCOUT? DROP DIRECTLY INTO THE HOTTEST 6-MAX HIGHWAY TABLE WITH INSTANT AUTO-BUYIN.
          </p>
{/* FORMAT QUICK SELECTOR */}
<div className="bg-surface-container-lowest ink-border-3 p-space-xs flex items-center justify-between mb-space-lg"> <button className={`flex-1 py-space-xs font-label-lg text-label-lg uppercase transition-all text-center ${speedMode === "std" ? "bg-primary-container text-on-primary-container ink-border-3 cel-shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`} id="toggle-std" onClick={() => setSpeedMode("std")}>
              STANDARD 6-MAX
            </button> <button className={`flex-1 py-space-xs font-label-lg text-label-lg uppercase transition-all text-center ${speedMode === "fast" ? "bg-primary-container text-on-primary-container ink-border-3 cel-shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`} id="toggle-fast" onClick={() => setSpeedMode("fast")}>
              FAST-FOLD TURBO
            </button>
</div>
</div> <div>
{/* QUICK PLAY BUTTON */}
<button className="w-full bg-primary-container hover:bg-primary-fixed text-on-primary-container ink-border-4 p-space-md cel-shadow-lg transform -rotate-1 hover:rotate-0 active:translate-x-1 active:translate-y-1 active:cel-shadow transition-all group flex items-center justify-between" onClick={() => setShowMatchmaking(true)}> <div className="flex flex-col text-left"> <span className="font-label-sm text-label-sm tracking-widest text-on-primary-container/80 uppercase">INSTANT AUTO-SEAT</span> <span className="font-display-lg text-display-lg uppercase leading-none group-hover:tracking-wider transition-all">QUICK PLAY NOW</span>
</div> <div className="w-12 h-12 bg-on-primary-container text-primary-container ink-border-3 flex items-center justify-center transform rotate-3 group-hover:rotate-12 transition-transform"> <span className="material-symbols-outlined text-[30px]">play_arrow</span>
</div>
</button> <div className="mt-space-xs flex justify-between font-label-sm text-label-sm text-on-surface-variant"> <span>STAKES: 500 / 1,000 NLHE</span> <span>EST. WAIT: &lt; 2 SEC</span>
</div>
</div>
</div>
{/* HERO CENTER: FEATURED LIVE TABLE TEASER */}
<div className="lg:col-span-4 bg-surface-container-high ink-border-4 p-space-lg cel-shadow-lg flex flex-col justify-between relative transform rotate-0.5"> <div className="flex items-center justify-between mb-space-sm"> <div className="flex items-center gap-space-xs"> <span className="w-3 h-3 rounded-full bg-error animate-ping"></span> <span className="font-label-lg text-label-lg text-error uppercase tracking-wider">LIVE POT IN PLAY</span>
</div> <div className="bg-surface-container-lowest px-space-sm py-0.5 ink-border-3 font-label-sm text-label-sm text-secondary">
            ROOM #07
          </div>
</div>
{/* POT HERO VISUAL */}
<div className="bg-surface-container ink-border-3 p-space-md relative overflow-hidden mb-space-md"> <div className="absolute right-0 bottom-0 opacity-10 font-display-xl text-[90px] leading-none pointer-events-none text-primary">
            $$$
          </div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">CURRENT MAIN POT</span> <div className="flex items-baseline gap-space-xs"> <span className="font-display-xl text-display-xl text-primary leading-none">28,400</span> <span className="font-headline-sm text-headline-sm text-primary-fixed-dim uppercase">SCRAP</span>
</div> <div className="mt-space-sm flex items-center gap-space-sm"> <div className="flex -space-x-2"> <div className="w-7 h-7 rounded-full bg-secondary ink-border-3 flex items-center justify-center text-[10px] font-bold text-on-secondary">CR</div> <div className="w-7 h-7 rounded-full bg-primary-container ink-border-3 flex items-center justify-center text-[10px] font-bold text-on-primary-container">VK</div> <div className="w-7 h-7 rounded-full bg-error-container ink-border-3 flex items-center justify-center text-[10px] font-bold text-on-error-container">09</div>
</div> <span className="font-body-sm text-body-sm text-on-surface">ALL-IN CLASH ON THE TURN!</span>
</div>
</div> <div className="space-y-space-xs font-body-md text-body-md text-on-surface-variant mb-space-md"> <div className="flex justify-between"> <span>ARENA NAME:</span> <span className="text-on-surface font-headline-sm">SCRAPYARD HIGH STAKES</span>
</div> <div className="flex justify-between"> <span>SEATS FILLED:</span> <span className="text-secondary font-headline-sm">5 / 6 PLAYERS</span>
</div> <div className="flex justify-between"> <span>BLINDS RATIO:</span> <span className="text-on-surface font-headline-sm">500 / 1,000 NLHE</span>
</div>
</div> <div className="grid grid-cols-2 gap-space-sm"> <button className="bg-secondary hover:bg-secondary-fixed text-on-secondary ink-border-3 py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow transition-all text-center" onClick={() => setShowMatchmaking(true)}>
            TAKE SEAT #6
          </button> <button className="bg-surface-variant hover:bg-surface-bright text-on-surface ink-border-3 py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow transition-all flex items-center justify-center gap-space-xs"> <span className="material-symbols-outlined text-[18px]">visibility</span> SPECTATE
          </button>
</div>
</div>
{/* HERO RIGHT: DAILY REWARD PUNCH-CARD */}
<div className="lg:col-span-3 bg-primary-container ink-border-4 p-space-lg cel-shadow-lg text-on-primary-container flex flex-col justify-between transform -rotate-1 relative"> <div className="absolute -bottom-3 -right-3 bg-surface-container-lowest text-primary px-space-sm py-0.5 ink-border-3 transform rotate-3"> <span className="font-label-sm text-label-sm uppercase">ROLL RESET: 04:12:09</span>
</div> <div> <div className="flex items-center justify-between mb-space-xs"> <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">// DAILY STREAK CARD</span> <span className="bg-surface-container-lowest text-primary px-space-xs text-label-sm font-label-sm ink-border-3">DAY 5 / 7</span>
</div> <h2 className="font-display-lg text-display-lg uppercase leading-none tracking-tight mb-space-xs">
            SCRAP BONUS!
          </h2> <div className="bg-surface-container-lowest text-on-surface p-space-sm ink-border-3 mb-space-md"> <span className="font-label-sm text-label-sm text-primary-fixed-dim block uppercase">READY TO MINT:</span> <div className="font-headline-lg text-headline-lg text-primary leading-none">+15,000 <span className="text-body-sm text-on-surface-variant font-label-lg">SCRAP</span></div>
</div>
{/* Punch holes graphic */}
<div className="grid grid-cols-5 gap-1 mb-space-md"> <div className="h-8 bg-surface-container-lowest ink-border-3 flex items-center justify-center text-primary"> <span className="material-symbols-outlined text-[16px]">check</span></div> <div className="h-8 bg-surface-container-lowest ink-border-3 flex items-center justify-center text-primary"> <span className="material-symbols-outlined text-[16px]">check</span></div> <div className="h-8 bg-surface-container-lowest ink-border-3 flex items-center justify-center text-primary"> <span className="material-symbols-outlined text-[16px]">check</span></div> <div className="h-8 bg-surface-container-lowest ink-border-3 flex items-center justify-center text-primary"> <span className="material-symbols-outlined text-[16px]">check</span></div> <div className="h-8 bg-error-container text-on-error-container ink-border-3 flex items-center justify-center animate-pulse"> <span className="material-symbols-outlined text-[16px]">star</span></div>
</div>
</div> {bonusClaimed ? (
    <button id="claim-btn" className="w-full py-space-md ink-border-4 cel-shadow transform transition-transform text-center select-none bg-surface-variant text-on-surface opacity-60 pointer-events-none" disabled type="button">
      <span className="font-headline-md text-headline-md uppercase tracking-wider block">CLAIMED! +15,000 SCRAP</span>
    </button>
  ) : (
    <button className="w-full bg-error-container hover:bg-error text-on-error-container hover:text-on-error ink-border-3 p-space-sm cel-shadow transform rotate-1 active:translate-x-0.5 active:translate-y-0.5 transition-all text-center" id="claim-btn" onClick={() => setBonusClaimed(true)}> <span className="font-headline-md text-headline-md uppercase tracking-wider block">CLAIM +15,000 NOW</span>
</button>
  )}
</div>
</div>
{/* SECTION 2: CATEGORY FILTER TABS */}
<div className="flex flex-wrap items-center justify-between gap-space-md border-b-4 border-surface-container-lowest pb-space-sm"> <div className="flex items-center gap-space-sm flex-wrap"> <button onClick={() => onNavigateToCashBrowser?.()} className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-lg py-space-xs ink-border-3 cel-shadow transform -rotate-1 active:translate-x-0.5 active:translate-y-0.5">
          CASH GAMES (14 ACTIVE)
        </button> <button className="bg-surface-container text-on-surface hover:text-primary font-headline-sm text-headline-sm px-space-lg py-space-xs ink-border-3 cel-shadow transform hover:rotate-1 transition-transform">
          TOURNAMENTS (3 LIVE)
        </button> <button className="bg-surface-container text-on-surface hover:text-primary font-headline-sm text-headline-sm px-space-lg py-space-xs ink-border-3 cel-shadow transform hover:-rotate-1 transition-transform">
          PRIVATE ROOMS
        </button> <button className="bg-surface-container text-on-surface hover:text-primary font-headline-sm text-headline-sm px-space-lg py-space-xs ink-border-3 cel-shadow transform hover:rotate-1 transition-transform">
          RECENT REPLAYS
        </button>
</div> <div className="flex items-center gap-space-xs"> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">FILTER STAKES:</span> <button className="px-space-sm py-0.5 bg-surface-container text-on-surface ink-border-3 font-label-sm text-label-sm hover:bg-surface-bright">MICRO</button> <button className="px-space-sm py-0.5 bg-primary-container text-on-primary-container ink-border-3 font-label-sm text-label-sm">MID</button> <button className="px-space-sm py-0.5 bg-surface-container text-on-surface ink-border-3 font-label-sm text-label-sm hover:bg-surface-bright">HIGH ROLLER</button>
</div>
</div>
{/* SECTION 3: CASH GAME TABLES GRID */}
<div> <div className="flex items-center justify-between mb-space-md"> <div className="flex items-center gap-space-sm"> <div className="w-4 h-4 bg-secondary ink-border-3"></div> <h2 className="font-headline-lg text-headline-lg uppercase text-primary tracking-wide">VERIFIED SYNDICATE TABLES</h2>
</div> <span className="font-label-md text-label-md text-on-surface-variant uppercase">REFRESHING FEED REALTIME</span>
</div> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
{/* CARD 1: RUST BUCKET INN */}
<div className="bg-surface-container ink-border-4 p-space-lg cel-shadow-lg flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform relative group"> <div className="flex items-start justify-between mb-space-sm"> <div> <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">TABLE #01</span> <h3 className="font-headline-lg text-headline-lg text-on-surface uppercase group-hover:text-primary transition-colors">
                RUST BUCKET INN
              </h3>
</div> <div className="bg-surface-variant ink-border-3 px-space-xs py-0.5 text-on-surface font-label-sm text-label-sm uppercase">
              CASUAL GRIND
            </div>
</div> <div className="bg-surface-container-lowest p-space-md ink-border-3 my-space-md space-y-space-xs font-body-md text-body-md"> <div className="flex justify-between text-on-surface-variant"> <span>FORMAT:</span> <span className="text-on-surface font-label-lg">NO LIMIT HOLD'EM (6-MAX)</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>BLINDS:</span> <span className="text-primary-container font-headline-sm">50 / 100 SCRAP</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>BUY-IN RANGE:</span> <span className="text-on-surface font-headline-sm">2,000 - 10,000</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>OCCUPANCY:</span> <span className="text-error font-headline-sm">6 / 6 FULL (1 IN QUEUE)</span>
</div>
</div> <div className="pt-space-xs flex items-center gap-space-sm"> <button className="flex-1 bg-secondary text-on-secondary hover:bg-secondary-fixed ink-border-3 py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow active:translate-x-0.5 active:translate-y-0.5 transition-all text-center">
              JOIN QUEUE (WAIT 1)
            </button> <button aria-label="Table info" className="w-10 h-10 bg-surface-variant text-on-surface ink-border-3 flex items-center justify-center hover:bg-surface-bright"> <span className="material-symbols-outlined text-[20px]">info</span>
</button>
</div>
</div>
{/* CARD 2: SCRAPYARD HIGH STAKES (FEATURED / ACTIVE) */}
<div className="bg-surface-container-high ink-border-4 p-space-lg cel-shadow-lg flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform relative ring-4 ring-primary-container/20">
{/* Featured Tag Banner */}
<div className="absolute -top-3.5 right-6 bg-primary-container text-on-primary-container ink-border-3 px-space-sm py-0.5 font-headline-sm text-headline-sm uppercase transform rotate-2 cel-shadow">
            HOT RECS
          </div> <div className="flex items-start justify-between mb-space-sm"> <div> <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider block">TABLE #07 // FEATURED</span> <h3 className="font-headline-lg text-headline-lg text-primary uppercase">
                SCRAPYARD HIGH STAKES
              </h3>
</div>
</div> <div className="bg-surface-container-lowest p-space-md ink-border-3 my-space-md space-y-space-xs font-body-md text-body-md"> <div className="flex justify-between text-on-surface-variant"> <span>FORMAT:</span> <span className="text-on-surface font-label-lg">NO LIMIT HOLD'EM (6-MAX)</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>BLINDS:</span> <span className="text-primary-container font-headline-sm">500 / 1,000 SCRAP</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>BUY-IN RANGE:</span> <span className="text-on-surface font-headline-sm">40,000 - 100,000</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>OCCUPANCY:</span> <span className="text-secondary font-headline-sm">5 / 6 (1 SEAT LEFT!)</span>
</div>
</div> <div className="pt-space-xs flex items-center gap-space-sm"> <button className="flex-1 bg-primary-container text-on-primary-container hover:bg-primary-fixed ink-border-3 py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow active:translate-x-0.5 active:translate-y-0.5 transition-all text-center" onClick={() => setShowMatchmaking(true)}>
              JOIN TABLE NOW
            </button> <button aria-label="Table info" className="w-10 h-10 bg-surface-variant text-on-surface ink-border-3 flex items-center justify-center hover:bg-surface-bright"> <span className="material-symbols-outlined text-[20px]">info</span>
</button>
</div>
</div>
{/* CARD 3: CYBER CRUSHER */}
<div className="bg-surface-container ink-border-4 p-space-lg cel-shadow-lg flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform relative group"> <div className="flex items-start justify-between mb-space-sm"> <div> <span className="font-label-sm text-label-sm text-error uppercase tracking-wider block">TABLE #12 // TURBO</span> <h3 className="font-headline-lg text-headline-lg text-on-surface uppercase group-hover:text-primary transition-colors">
                CYBER CRUSHER
              </h3>
</div> <div className="bg-error-container ink-border-3 px-space-xs py-0.5 text-on-error-container font-label-sm text-label-sm uppercase transform rotate-2">
              VIP WHALES
            </div>
</div> <div className="bg-surface-container-lowest p-space-md ink-border-3 my-space-md space-y-space-xs font-body-md text-body-md"> <div className="flex justify-between text-on-surface-variant"> <span>FORMAT:</span> <span className="text-on-surface font-label-lg">DEEP STACK TURBO (6-MAX)</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>BLINDS:</span> <span className="text-primary-container font-headline-sm">2,500 / 5,000 SCRAP</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>BUY-IN RANGE:</span> <span className="text-on-surface font-headline-sm">200,000 - 500,000</span>
</div> <div className="flex justify-between text-on-surface-variant"> <span>OCCUPANCY:</span> <span className="text-on-surface font-headline-sm">3 / 6 (3 AVAILABLE)</span>
</div>
</div> <div className="pt-space-xs flex items-center gap-space-sm"> <button className="flex-1 bg-primary-container text-on-primary-container hover:bg-primary-fixed ink-border-3 py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow active:translate-x-0.5 active:translate-y-0.5 transition-all text-center" onClick={() => setShowMatchmaking(true)}>
              JOIN TABLE
            </button> <button aria-label="Table info" className="w-10 h-10 bg-surface-variant text-on-surface ink-border-3 flex items-center justify-center hover:bg-surface-bright"> <span className="material-symbols-outlined text-[20px]">info</span>
</button>
</div>
</div>
</div>
</div>
{/* SECTION 4: TOURNAMENTS & PRIVATE ROOMS SPLIT */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
{/* TOURNAMENT BANNER */}
<div className="lg:col-span-7 bg-surface-container ink-border-4 p-space-lg cel-shadow-lg relative overflow-hidden flex flex-col justify-between transform -rotate-0.5"> <div className="flex items-center justify-between mb-space-md"> <div className="flex items-center gap-space-xs"> <span className="material-symbols-outlined text-secondary text-headline-sm">emoji_events</span> <span className="font-label-lg text-label-lg uppercase text-secondary">SCHEDULED TOURNEY #44</span>
</div> <div className="bg-error-container ink-border-3 px-space-sm py-0.5 font-headline-sm text-headline-sm text-on-error-container uppercase">
            STARTS IN 18m
          </div>
</div> <div className="mb-space-md"> <h3 className="font-display-lg text-display-lg text-primary uppercase leading-tight mb-space-xs">
            SCRAP ARENA HIGH-ROLLER CUP
          </h3> <p className="font-body-md text-body-md text-on-surface-variant uppercase">
            1,000,000 GUARANTEED SCRAP POOL. UNLIMITED RE-ENTRY UNTIL LEVEL 6.
          </p>
</div> <div className="grid grid-cols-3 gap-space-sm bg-surface-container-lowest p-space-sm ink-border-3 mb-space-md text-center"> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">BUY-IN</span> <span className="font-headline-md text-headline-md text-primary leading-none">25,000</span>
</div> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">REGISTERED</span> <span className="font-headline-md text-headline-md text-secondary leading-none">48 SLINGERS</span>
</div> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">BLIND INTERVAL</span> <span className="font-headline-md text-headline-md text-on-surface leading-none">6 MINS</span>
</div>
</div> <div className="flex items-center gap-space-md"> <button className="bg-primary-container text-on-primary-container hover:bg-primary-fixed ink-border-3 px-space-lg py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow active:translate-x-0.5 active:translate-y-0.5 transition-all">
            REGISTER ENTRY (25,000)
          </button> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">LATE REGISTRATION ENDS AT 19:30</span>
</div>
</div>
{/* PRIVATE ROOM BANNER */}
<div className="lg:col-span-5 bg-surface-container-high ink-border-4 p-space-lg cel-shadow-lg flex flex-col justify-between transform rotate-0.5"> <div> <div className="flex items-center justify-between mb-space-xs"> <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">// PRIVATE SHED</span> <span className="bg-secondary-container text-on-secondary-container px-space-xs font-label-sm text-label-sm uppercase ink-border-3">CUSTOM RULES</span>
</div> <h3 className="font-headline-lg text-headline-lg text-on-surface uppercase mb-space-xs">
            HOST A PRIVATE YARD
          </h3> <p className="font-body-md text-body-md text-on-surface-variant uppercase mb-space-md leading-tight">
            PLAY ONLY WITH INVITED HOMIES. ZERO RAKE PROTOCOL, CUSTOM BLINDS, DEEP STACKS &amp; STRADDLES.
          </p>
</div> <div className="bg-surface-container-lowest p-space-sm ink-border-3 mb-space-md flex items-center justify-between"> <div className="flex flex-col"> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">SHAREABLE PASSCODE</span> <span className="font-headline-sm text-headline-sm text-secondary tracking-widest">{copiedCode ? "COPIED!" : "#SCRAP-8849-GANG"}</span>
</div> <button className="bg-surface-variant hover:bg-surface-bright text-on-surface px-space-sm py-1 ink-border-3 font-label-sm text-label-sm uppercase cel-shadow-sm flex items-center gap-1" onClick={handleCopyGang}> <span className="material-symbols-outlined text-[14px]">content_copy</span> COPY
          </button>
</div> <button className="w-full bg-secondary text-on-secondary hover:bg-secondary-fixed ink-border-3 py-space-xs font-headline-sm text-headline-sm uppercase cel-shadow active:translate-x-0.5 active:translate-y-0.5 transition-all text-center">
          CREATE ROOM WIZARD
        </button>
</div>
</div>
{/* SECTION 5: SIDE UTILITIES & SHORTCUTS (TELEMETRY & CHEAT SHEET BAR) */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center bg-surface-container-low ink-border-4 p-space-lg cel-shadow-lg mb-space-xl">
{/* CHEAT SHEET PROMO */}
<div className="md:col-span-4 flex items-center gap-space-md border-b md:border-b-0 md:border-r-4 border-surface-container pb-space-sm md:pb-0 md:pr-space-md"> <div className="w-14 h-14 bg-primary-container text-on-primary-container ink-border-3 flex items-center justify-center flex-shrink-0 transform -rotate-3"> <span className="material-symbols-outlined text-[32px]">menu_book</span>
</div> <div> <span className="font-label-sm text-label-sm text-primary uppercase block">TACTICAL FIELD GUIDE</span> <h4 className="font-headline-md text-headline-md uppercase text-on-surface leading-none mb-space-xs">POKER HAND RANKINGS</h4> <button className="text-secondary hover:text-secondary-fixed font-headline-sm text-headline-sm uppercase inline-flex items-center gap-1" onClick={() => setShowRankings(true)}>
            VIEW ALL 10 TIERS <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
{/* PLAYER SESSION TELEMETRY */}
<div className="md:col-span-5 grid grid-cols-3 gap-space-sm text-center border-b md:border-b-0 md:border-r-4 border-surface-container pb-space-sm md:pb-0 md:pr-space-md"> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">WIN RATE</span> <span className="font-headline-md text-headline-md text-secondary">58.4%</span>
</div> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">BIGGEST POT</span> <span className="font-headline-md text-headline-md text-primary">184,200</span>
</div> <div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase block">LUCKY HOLE</span> <div className="flex items-center justify-center gap-0.5"> <span className="font-headline-sm text-headline-sm text-on-surface">J♠</span> <span className="font-headline-sm text-headline-sm text-error">A♦</span>
</div>
</div>
</div>
{/* RECENT GAME LOG MINI STRIP */}
<div className="md:col-span-3 flex flex-col justify-center"> <div className="flex justify-between items-center mb-1"> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">LAST HAND VERDICT</span> <span className="bg-primary-container px-1 font-label-sm text-label-sm text-on-primary-container ink-border-3">+4,500</span>
</div> <p className="font-body-sm text-body-sm text-on-surface truncate">
          Table #07: Won with Two Pair (A's &amp; 9's) vs Slinger_Max
        </p>
</div>
</div>
</div>

</div></main> <footer className="w-full bg-surface-container-low ink-border-3 border-b-0 border-x-0 py-space-md select-none"> <div className="w-full px-gutter flex flex-col md:flex-row items-center justify-between gap-space-sm"> <div className="flex items-center gap-space-sm flex-wrap justify-center"> <div className="bg-surface-container ink-border-3 px-space-sm py-0.5 transform -rotate-1 cel-shadow-sm flex items-center gap-space-xs"> <span className="material-symbols-outlined text-secondary text-[16px]">verified</span> <span className="font-label-sm text-label-sm uppercase text-on-surface">PROVABLY FAIR RNG PROTOCOL CERTIFIED</span></div> <span className="font-body-sm text-body-sm text-on-surface-variant font-bold">SHA-256 SEED LOCK ACTIVE</span></div> <div className="flex items-center gap-space-md"> <div className="bg-surface-variant px-space-xs py-0.5 ink-border-3 transform rotate-1"> <span className="font-label-sm text-label-sm uppercase text-on-surface">PATCH V.0.9.4-BETA</span></div> <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">© 2025 SCRAP UNDERGROUND SYNDICATE</span></div></div></footer>
    </div>
  );
};

export default BattleLobby;
