import React from "react";

export interface BattleTableProps {
  onBackToLobby?: () => void;
}

export const BattleTable: React.FC<BattleTableProps> = ({ onBackToLobby }) => {
  return (
    <div className="bg-surface-container-lowest font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
<header className="fixed top-0 left-0 w-full z-50 bg-surface-container-low border-b-[3px] border-surface-container-lowest bg-halftone"><div className="h-20 w-full px-gutter flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-md"><div className="bg-surface-container-highest p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-1 flex items-center gap-space-xs"><img alt="Scrap Poker Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1VtTXDP9Lx-Q-Rlu3H1KXwXgacp1_uBUv0vaEfDDPUD0bjPQQI1niNeo_NA9nWY2ioN-dCJvZBXA6igKlD5lE5M1_Ns1W0lHR13H1SOeeSB9xaQqtVq22Zux1PCiaPFpuVVhpkne9phGpkuAvIbOMLf-F741wQMGiOI31zjd2MRzfJjbh7N3ydARy7LpHFG7h2vVqkkBTpedxZiS84NWqnxqM9CfeNazE6ND-pnCQ"/><span className="font-headline-md text-headline-md tracking-wider text-primary uppercase pr-space-xs">SCRAP POKER</span></div><nav className="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container -rotate-1 comic-shadow-sm border-surface-container-lowest"><a aria-current="page" className="px-space-md py-space-xs font-label-lg uppercase tracking-wider transition-transform bg-primary-container text-on-primary-container -rotate-1 comic-shadow-sm border-surface-container-lowest" data-path="battle-table" href="#">Battle Table</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="lobby" href="#" onClick={(e) => { e.preventDefault(); onBackToLobby?.(); }}>Lobby</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="hand-rankings" href="#">Hand Rankings</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="leaderboard" href="#">Leaderboard</a><a className="px-space-md py-space-xs border-[3px] border-transparent font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-transform" data-path="daily-scrap-reward" href="#">Daily Scrap Reward</a></nav></div><div className="hidden md:flex items-center gap-space-xs bg-surface-container-lowest border-[3px] border-outline-variant px-space-md py-space-xs comic-shadow-sm rotate-1"><span className="material-symbols-outlined text-secondary text-[18px]">casino</span><span className="font-headline-sm text-headline-sm tracking-wide text-primary uppercase">SCRAPYARD HIGH STAKES #07</span><span className="text-outline font-headline-sm text-headline-sm">//</span><span className="font-label-md text-label-md text-on-surface-variant uppercase">BLINDS:</span><span className="font-label-lg text-label-lg text-secondary-fixed-dim">500 / 1,000</span></div><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-sm bg-surface-container p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="flex flex-col pr-space-xs"><span className="font-label-sm text-label-sm text-on-surface-variant leading-none">SCRAP RUNNER</span><span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-none">BOLT_RUNNER_99</span></div><div className="bg-surface-container-lowest px-space-sm py-space-xs border-[2px] border-outline-variant flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary-container text-[16px]">token</span><span className="font-label-lg text-label-lg text-primary tracking-wide">450,200 SCRAP</span></div><button className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-x-[2px] active:translate-y-[2px] hover:rotate-0 transition-transform uppercase" type="button">REBUY</button></div><div className="flex items-center gap-space-xs bg-surface-container-low p-space-xs border-[3px] border-surface-container-lowest"><button aria-label="Toggle sound" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">volume_up</span></button><button aria-label="Game settings" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">settings</span></button><button aria-label="Leave table" className="w-8 h-8 flex items-center justify-center text-error hover:bg-error-container hover:text-on-error-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">logout</span></button></div></div></div></header><main className="w-full pt-20 min-h-screen bg-surface-container-lowest bg-halftone flex flex-col"><div className="flex flex-col w-full relative select-none">
{/* Table Container Outer */}
<div className="w-full max-w-[1560px] mx-auto px-gutter-mobile md:px-gutter py-space-sm flex flex-col gap-space-sm">
{/* TOP STAKES BANNER STRIP */}
<div className="w-full flex items-center justify-between gap-space-sm bg-surface-container-high p-space-xs -rotate-0.5 comic-shadow-sm border-[3px] border-surface-container-lowest">
<div className="flex items-center gap-space-sm">
<span className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-sm py-0.5 border-[2px] border-surface-container-lowest rotate-1 inline-block">TABLE #07</span>
<span className="font-headline-sm text-headline-sm text-primary uppercase tracking-wide">NO LIMIT TEXAS HOLD'EM</span>
<span className="text-on-surface-variant font-label-md text-label-md hidden sm:inline-block">HAND #849,203-BK</span>
</div>
<div className="flex items-center gap-space-sm">
<div className="bg-surface-container-lowest px-space-sm py-0.5 border-[2px] border-outline-variant flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-[16px]">timer</span>
<span className="font-label-lg text-label-lg text-secondary">BLINDS: 15m (08:24)</span>
</div>
<button className="bg-primary hover:bg-primary-fixed text-surface-container-lowest font-headline-sm text-headline-sm px-space-md py-0.5 border-[2px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform uppercase flex items-center gap-1" id="toggle-rankings-btn">
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
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-outline-variant comic-shadow-sm text-left">
<span className="font-label-sm text-label-sm text-secondary block font-bold">DEALER_BOT</span>
<span className="font-body-sm text-body-sm text-on-surface">Flop dealt: A♠ K♠ Q♠. Pot is 14,000 SCRAP.</span>
</div>
<div className="bg-surface-container p-space-xs border-[2px] border-surface-container-lowest -rotate-1">
<span className="font-label-sm text-label-sm text-primary-container block font-bold">CYBER_VIPER</span>
<span className="font-body-sm text-body-sm text-on-surface">"Smells like nuts or nothing. Let's go!"</span>
</div>
<div className="bg-surface-container-lowest p-space-xs border-[2px] border-error comic-shadow-sm">
<span className="font-label-sm text-label-sm text-error block font-bold">ACTION: CYBER_VIPER</span>
<span className="font-headline-sm text-headline-sm text-error tracking-wide">SHOVES ALL-IN 55.4K</span>
</div>
<div className="bg-surface-container p-space-xs border-[2px] border-surface-container-lowest rotate-1">
<span className="font-label-sm text-label-sm text-secondary-fixed block font-bold">COGWHEEL</span>
<span className="font-body-sm text-body-sm text-on-surface">"You're crazy Viper, I need time..."</span>
</div>
<div className="bg-surface-container-highest p-space-xs border-[2px] border-outline-variant">
<span className="font-label-sm text-label-sm text-outline block font-bold">SYSTEM</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Turn dealt: 10♦. Pot at 28.4K.</span>
</div>
<div className="bg-primary-container/20 p-space-xs border-[2px] border-primary-container">
<span className="font-label-sm text-label-sm text-primary block font-bold">ACTION: YOU</span>
<span className="font-body-sm text-body-sm text-primary">Your turn to act. Call 4,200 or Raise.</span>
</div>
</div>
{/* Quick Speech Trigger */}
<div className="mt-space-sm pt-space-xs border-t-[2px] border-surface-container-lowest flex gap-1">
<input className="w-full bg-surface-container-lowest px-2 py-1 border-[2px] border-outline-variant text-on-surface font-label-md text-label-md placeholder:text-outline focus:outline-none focus:border-primary" placeholder="SHOUT COMIC QUOTE..." type="text"/>
<button className="bg-primary-container px-2 border-[2px] border-surface-container-lowest text-on-primary-container font-headline-sm text-headline-sm uppercase hover:bg-primary">!</button>
</div>
</div>
{/* Scrap Deck Table Info */}
<div className="bg-surface-container-low border-[3px] border-surface-container-lowest p-space-sm comic-shadow-sm rotate-1">
<div className="font-headline-sm text-headline-sm text-primary mb-1 uppercase">SCRAP CASINO DECK</div>
<div className="space-y-1 font-label-sm text-label-sm text-on-surface-variant">
<div className="flex justify-between"><span>CUT-CARD COLOR:</span><span className="text-secondary font-bold">CYAN PUNK</span></div>
<div className="flex justify-between"><span>SHUFFLE ALGO:</span><span className="text-primary font-bold">SHA-256 SEED</span></div>
<div className="flex justify-between"><span>RAKE:</span><span className="text-outline font-bold">2.5% CAPPED 300</span></div>
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
{/* SEAT 1: RUST_BUCKET (FOLDED) */}
<div className="flex flex-col items-center opacity-60 transition-opacity hover:opacity-90">
<div className="relative bg-surface-container-low p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm -rotate-2 w-full max-w-[170px]">
<div className="flex items-center gap-space-xs">
<div className="w-10 h-10 bg-surface-variant border-[2px] border-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm text-outline relative overflow-hidden">
<span className="material-symbols-outlined text-[24px]">smart_toy</span>
<div className="absolute inset-0 bg-halftone opacity-40"></div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-on-surface-variant truncate">RUST_BUCKET</span>
<span className="font-label-sm text-label-sm text-outline">120,400 SCRAP</span>
</div>
</div>
{/* Fold Ribbon Banner */}
<div className="absolute -bottom-2.5 right-2 bg-surface-container-highest px-space-sm py-0.5 border-[2px] border-surface-container-lowest rotate-3 text-outline font-headline-sm text-headline-sm leading-none">
                  FOLDED
                </div>
</div>
{/* Folded Mucked Cards */}
<div className="flex -space-x-4 mt-2">
<div className="w-7 h-10 bg-surface-variant border-[2px] border-surface-container-lowest -rotate-12 flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-[14px]">block</span>
</div>
<div className="w-7 h-10 bg-surface-variant border-[2px] border-surface-container-lowest rotate-6 flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-[14px]">block</span>
</div>
</div>
</div>
{/* SEAT 2: NEON_JACK (DEALER & ACTIVE) */}
<div className="flex flex-col items-center">
<div className="relative bg-surface-container p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-1 w-full max-w-[180px]">
{/* Dealer 'D' Chip Badge */}
<div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-primary-container border-[2px] border-surface-container-lowest comic-shadow-sm flex items-center justify-center font-headline-sm text-headline-sm text-on-primary-container z-20">
                  D
                </div>
<div className="flex items-center gap-space-xs">
<div className="w-10 h-10 bg-secondary-container border-[2px] border-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm text-on-secondary-container relative">
<span className="material-symbols-outlined text-[26px]">robot_2</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-primary truncate">NEON_JACK</span>
<span className="font-label-sm text-label-sm text-secondary-fixed">84,200 SCRAP</span>
</div>
</div>
{/* Active Bet Tag */}
<div className="mt-1 bg-surface-container-lowest border-[2px] border-outline-variant px-space-xs py-0.5 flex justify-between items-center">
<span className="font-label-sm text-label-sm text-on-surface-variant">CALL:</span>
<span className="font-label-lg text-label-lg text-primary">2,000</span>
</div>
</div>
{/* Card Backs In Play */}
<div className="flex -space-x-3 mt-1">
<div className="w-7 h-10 bg-surface-container-highest border-[2px] border-surface-container-lowest -rotate-6 flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[14px]">bolt</span>
</div>
<div className="w-7 h-10 bg-surface-container-highest border-[2px] border-surface-container-lowest rotate-6 flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[14px]">bolt</span>
</div>
</div>
</div>
{/* SEAT 3: CYBER_VIPER (ALL-IN SHOVER) */}
<div className="flex flex-col items-center">
<div className="relative bg-surface-container-low p-space-xs border-[3px] border-error comic-shadow-md -rotate-1 w-full max-w-[180px]">
{/* POPPING COMIC ALL-IN BURST STICKER */}
<div className="absolute -top-4 -left-3 bg-error text-on-error border-[2px] border-surface-container-lowest comic-shadow-sm px-1.5 py-0.5 -rotate-12 font-headline-sm text-headline-sm leading-none animate-pulse">
                  💥 ALL-IN!
                </div>
<div className="flex items-center gap-space-xs">
<div className="w-10 h-10 bg-error-container border-[2px] border-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm text-on-error-container">
<span className="material-symbols-outlined text-[24px]">skull</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-headline-sm text-headline-sm text-error truncate">CYBER_VIPER</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">REM: 0</span>
</div>
</div>
{/* Shove Amount Ribbon */}
<div className="mt-1 bg-error-container border-[2px] border-surface-container-lowest px-space-xs py-0.5 flex justify-between items-center text-on-error-container">
<span className="font-label-sm text-label-sm uppercase font-bold">ALL-IN:</span>
<span className="font-headline-sm text-headline-sm">55,400</span>
</div>
</div>
{/* Card Backs Exposed or Ready */}
<div className="flex -space-x-3 mt-1">
<div className="w-7 h-10 bg-error border-[2px] border-surface-container-lowest -rotate-8 flex items-center justify-center text-on-error font-headline-sm text-headline-sm">?</div>
<div className="w-7 h-10 bg-error border-[2px] border-surface-container-lowest rotate-8 flex items-center justify-center text-on-error font-headline-sm text-headline-sm">?</div>
</div>
</div>
</div>
{/* MIDDLE SECTION: SEATS 5 & 4 + CENTER POT & 5 COMMUNITY CARDS */}
<div className="grid grid-cols-12 items-center my-space-sm gap-space-xs">
{/* SEAT 5 (LEFT): MAD_RATCHET */}
<div className="col-span-3 sm:col-span-2 flex flex-col items-start z-10">
<div className="bg-surface-container p-space-xs border-[3px] border-surface-container-lowest comic-shadow-sm rotate-2 w-full max-w-[150px]">
<div className="flex items-center gap-1">
<div className="w-8 h-8 bg-surface-bright border-[2px] border-surface-container-lowest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">build</span>
</div>
<div className="min-w-0 flex flex-col">
<span className="font-headline-sm text-headline-sm text-primary truncate">MAD_RATCHET</span>
<span className="font-label-sm text-label-sm text-outline">310,000</span>
</div>
</div>
<div className="mt-1 bg-surface-container-lowest px-1 py-0.5 border-[1px] border-outline-variant text-center font-label-md text-label-md text-secondary">
                  BET: 4,200
                </div>
</div>
{/* Chips Bet Stack Icon visual */}
<div className="mt-1 ml-2 flex items-center gap-1 bg-surface-container-lowest border-[2px] border-surface-container-lowest px-1.5 py-0.5 -rotate-3">
<span className="material-symbols-outlined text-primary-container text-[14px]">toll</span>
<span className="font-headline-sm text-headline-sm text-primary text-[14px]">4.2K</span>
</div>
</div>
{/* COMMUNITY CENTERFELT: POT & 5 CARDS */}
<div className="col-span-6 sm:col-span-8 flex flex-col items-center justify-center">
{/* STREET BANNER + POT STAMP */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-space-xs mb-space-sm">
{/* Street Marker */}
<div className="bg-surface-container-lowest px-space-md py-0.5 border-[3px] border-outline-variant -rotate-2 comic-shadow-sm flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-error inline-block animate-ping"></span>
<span className="font-headline-sm text-headline-sm text-primary uppercase tracking-widest">RIVER · 5TH STREET</span>
</div>
{/* Main Pot Callout Comic Block */}
<div className="bg-primary-container px-space-md py-1 border-[3px] border-surface-container-lowest rotate-1 comic-shadow-md flex items-center gap-space-xs">
<span className="material-symbols-outlined text-on-primary-container text-[20px]">token</span>
<span className="font-label-lg text-label-lg text-on-primary-container uppercase tracking-wide">POT:</span>
<span className="font-display-lg text-display-lg text-on-primary-container leading-none">28,400</span>
<span className="font-label-sm text-label-sm bg-surface-container-lowest text-primary px-1 border-[1px] border-surface-container-lowest">SCRAP</span>
</div>
</div>
{/* 5 CUT-PAPER COMMUNITY CARDS: [A♠, K♠, Q♠, 10♦, 2♣] */}
<div className="flex items-center justify-center gap-1 sm:gap-space-xs flex-wrap">
{/* CARD 1: ACE OF SPADES (PAPER CUTOUT) */}
<div className="w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-[#F2EEE4] text-[#101012] p-1.5 border-[3px] border-surface-container-lowest comic-shadow-md -rotate-2 flex flex-col justify-between hover:-translate-y-1 transition-transform">
<div className="flex justify-between items-start leading-none">
<span className="font-headline-lg text-headline-lg leading-none font-bold">A</span>
<span className="material-symbols-outlined text-[18px]">token</span>
</div>
<div className="text-center font-headline-lg text-headline-lg leading-none scale-125">
                    ♠
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-headline-lg text-headline-lg leading-none font-bold">A</span>
<span className="text-[12px] font-bold">♠</span>
</div>
</div>
{/* CARD 2: KING OF SPADES */}
<div className="w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-[#F2EEE4] text-[#101012] p-1.5 border-[3px] border-surface-container-lowest comic-shadow-md rotate-1 flex flex-col justify-between hover:-translate-y-1 transition-transform">
<div className="flex justify-between items-start leading-none">
<span className="font-headline-lg text-headline-lg leading-none font-bold">K</span>
<span className="text-[12px] font-bold">♠</span>
</div>
<div className="text-center font-headline-lg text-headline-lg leading-none scale-125">
                    ♠
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-headline-lg text-headline-lg leading-none font-bold">K</span>
<span className="text-[12px] font-bold">♠</span>
</div>
</div>
{/* CARD 3: QUEEN OF SPADES */}
<div className="w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-[#F2EEE4] text-[#101012] p-1.5 border-[3px] border-surface-container-lowest comic-shadow-md -rotate-1 flex flex-col justify-between hover:-translate-y-1 transition-transform">
<div className="flex justify-between items-start leading-none">
<span className="font-headline-lg text-headline-lg leading-none font-bold">Q</span>
<span className="text-[12px] font-bold">♠</span>
</div>
<div className="text-center font-headline-lg text-headline-lg leading-none scale-125">
                    ♠
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-headline-lg text-headline-lg leading-none font-bold">Q</span>
<span className="text-[12px] font-bold">♠</span>
</div>
</div>
{/* CARD 4: 10 OF DIAMONDS (CYAN SUIT) */}
<div className="w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-[#F2EEE4] text-[#1AA3D4] p-1.5 border-[3px] border-surface-container-lowest comic-shadow-md rotate-2 flex flex-col justify-between hover:-translate-y-1 transition-transform">
<div className="flex justify-between items-start leading-none">
<span className="font-headline-lg text-headline-lg leading-none font-bold">10</span>
<span className="text-[14px] font-bold">♦</span>
</div>
<div className="text-center font-headline-lg text-headline-lg leading-none scale-125">
                    ♦
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-headline-lg text-headline-lg leading-none font-bold">10</span>
<span className="text-[14px] font-bold">♦</span>
</div>
</div>
{/* CARD 5: 2 OF CLUBS (GREEN SUIT) */}
<div className="w-14 sm:w-20 md:w-24 h-20 sm:h-28 md:h-34 bg-[#F2EEE4] text-[#7ED957] p-1.5 border-[3px] border-surface-container-lowest comic-shadow-md -rotate-2 flex flex-col justify-between hover:-translate-y-1 transition-transform">
<div className="flex justify-between items-start leading-none">
<span className="font-headline-lg text-headline-lg leading-none font-bold">2</span>
<span className="text-[14px] font-bold">♣</span>
</div>
<div className="text-center font-headline-lg text-headline-lg leading-none scale-125">
                    ♣
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-headline-lg text-headline-lg leading-none font-bold">2</span>
<span className="text-[14px] font-bold">♣</span>
</div>
</div>
</div>
{/* SIDE POT CALLOUT TAPE STRIP */}
<div className="mt-space-sm flex items-center gap-space-sm">
<span className="bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md px-space-sm py-0.5 border-[2px] border-surface-container-lowest rotate-1">
                  MAIN POT 1: 18,400 SCRAP
                </span>
<span className="bg-surface-container-lowest text-secondary-fixed font-label-md text-label-md px-space-sm py-0.5 border-[2px] border-surface-container-lowest -rotate-1">
                  SIDE POT 2: 10,000 SCRAP (VIPER ALL-IN)
                </span>
</div>
</div>
{/* SEAT 4 (RIGHT): COGWHEEL (THINKING / COUNTDOWN) */}
<div className="col-span-3 sm:col-span-2 flex flex-col items-end z-10">
<div className="bg-surface-container-low p-space-xs border-[3px] border-secondary comic-shadow-sm -rotate-2 w-full max-w-[150px]">
<div className="flex items-center gap-1 justify-end">
<div className="min-w-0 flex flex-col text-right">
<span className="font-headline-sm text-headline-sm text-secondary truncate">COGWHEEL</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">98,100</span>
</div>
<div className="w-8 h-8 bg-secondary-container border-[2px] border-surface-container-lowest flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[18px]">settings</span>
</div>
</div>
{/* Animated Countdown Timer Strip */}
<div className="mt-1 bg-surface-container-lowest border-[1px] border-secondary p-0.5">
<div className="h-2 bg-secondary animate-pulse w-3/4"></div>
</div>
<div className="mt-0.5 text-center font-label-sm text-label-sm text-secondary-fixed uppercase">
                  THINKING...
                </div>
</div>
</div>
</div>
{/* BOTTOM ROW: HERO (PLAYER 6: BOLT_RUNNER_99) */}
<div className="flex flex-col items-center justify-center mt-2 relative z-20">
{/* Hand Strength Tag (Torn Paper Ribbon with Halftone Dot Vibe) */}
<div className="bg-primary px-space-md py-1 border-[3px] border-surface-container-lowest comic-shadow-md -rotate-1 mb-2 flex items-center gap-space-xs">
<span className="material-symbols-outlined text-surface-container-lowest text-[18px]">stars</span>
<span className="font-headline-sm text-headline-sm text-surface-container-lowest uppercase tracking-wider">ROYAL FLUSH DRAW</span>
<span className="text-surface-container-lowest font-headline-sm text-headline-sm">·</span>
<span className="font-label-lg text-label-lg text-surface-container-lowest">9 OUTS (34.8% COMIC EQUITY)</span>
</div>
{/* Hero Hand Cards (Large prominent J♠ and A♦) & Identity Badge */}
<div className="flex items-end gap-space-md">
{/* HERO HOLE CARDS */}
<div className="flex -space-x-4 items-center">
{/* Card 1: J♠ (Black Suit) */}
<div className="w-20 sm:w-24 md:w-28 h-30 sm:h-36 md:h-42 bg-[#F2EEE4] text-[#101012] p-2 border-[4px] border-surface-container-lowest comic-shadow-lg -rotate-6 hover:-translate-y-2 transition-transform cursor-pointer relative">
<div className="flex justify-between items-start leading-none">
<span className="font-display-lg text-display-lg leading-none font-bold">J</span>
<span className="text-[18px] font-bold">♠</span>
</div>
<div className="text-center font-display-xl text-display-xl leading-none my-1">
                    ♠
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-display-lg text-display-lg leading-none font-bold">J</span>
<span className="text-[18px] font-bold">♠</span>
</div>
</div>
{/* Card 2: A♦ (Cyan Suit) */}
<div className="w-20 sm:w-24 md:w-28 h-30 sm:h-36 md:h-42 bg-[#F2EEE4] text-[#1AA3D4] p-2 border-[4px] border-surface-container-lowest comic-shadow-lg rotate-6 hover:-translate-y-2 transition-transform cursor-pointer relative">
{/* Highlight Glow Banner */}
<div className="absolute -top-3 -right-2 bg-primary-container text-on-primary-container px-1 py-0.5 border-[2px] border-surface-container-lowest font-headline-sm text-headline-sm rotate-6">
                    ACE!
                  </div>
<div className="flex justify-between items-start leading-none">
<span className="font-display-lg text-display-lg leading-none font-bold">A</span>
<span className="text-[18px] font-bold">♦</span>
</div>
<div className="text-center font-display-xl text-display-xl leading-none my-1">
                    ♦
                  </div>
<div className="flex justify-between items-end leading-none rotate-180">
<span className="font-display-lg text-display-lg leading-none font-bold">A</span>
<span className="text-[18px] font-bold">♦</span>
</div>
</div>
</div>
{/* Hero Plate Info */}
<div className="bg-surface-container-lowest p-space-xs sm:p-space-sm border-[3px] border-primary-container comic-shadow-md rotate-1 flex flex-col gap-0.5">
<div className="flex items-center gap-space-xs">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline-sm text-headline-sm">
                    YOU
                  </div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-tight">BOLT_RUNNER_99</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">POSITION: BIG BLIND (BB)</span>
</div>
</div>
<div className="flex items-center justify-between gap-space-md border-t-[2px] border-outline-variant pt-1 mt-1">
<span className="font-label-md text-label-md text-on-surface-variant">STACK:</span>
<span className="font-headline-sm text-headline-sm text-secondary-fixed">450,200 SCRAP</span>
</div>
<div className="flex items-center justify-between gap-space-md">
<span className="font-label-md text-label-md text-on-surface-variant">CURRENT COMMITTED:</span>
<span className="font-headline-sm text-headline-sm text-primary-container">4,200 SCRAP</span>
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
<span className="text-primary font-bold">142</span>
</div>
<div className="flex justify-between items-center text-label-sm font-label-sm mt-0.5">
<span className="text-on-surface-variant">NET SCRAP TODAY:</span>
<span className="text-secondary font-bold">+64,200</span>
</div>
</div>
</div>
{/* EXPLOSIVE COMIC STICKER: POKER HANDS REFERENCE */}
<div className="relative bg-primary-container p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md -rotate-2 cursor-pointer hover:rotate-0 transition-transform" id="quick-rank-widget">
<div className="font-headline-lg text-headline-lg text-on-primary-container leading-tight uppercase">
            TARGET HAND
          </div>
<div className="bg-surface-container-lowest text-primary p-space-xs border-[2px] border-surface-container-lowest mt-1">
<div className="font-headline-sm text-headline-sm text-primary-fixed uppercase">ROYAL FLUSH!</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Need: 10♠ on River or Broadway straight runner.</p>
</div>
<button className="w-full mt-2 bg-surface-container-lowest text-primary hover:bg-surface-bright font-headline-sm text-headline-sm py-1 border-[2px] border-surface-container-lowest uppercase comic-shadow-sm" id="view-cheat-sheet-btn">
            FULL RANKINGS GUIDE
          </button>
</div>
{/* Table Note Box */}
<div className="bg-surface-container-low border-[3px] border-surface-container-lowest p-space-sm comic-shadow-sm rotate-1">
<span className="font-label-sm text-label-sm text-error uppercase font-bold block mb-1">! WARNING</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            CYBER_VIPER has jammed 3 of the last 4 rivers when flush draws hit. Watch for the bluff!
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
<button className="preset-btn px- space-md px-3 py-1 bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-y-0.5 transition-transform uppercase" data-mult="0.33">
            ⅓ POT
          </button>
<button className="preset-btn px-3 py-1 bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm rotate-1 active:translate-y-0.5 transition-transform uppercase" data-mult="0.5">
            ½ POT
          </button>
<button className="preset-btn px-3 py-1 bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm -rotate-1 active:translate-y-0.5 transition-transform uppercase" data-mult="0.75">
            ¾ POT
          </button>
<button className="preset-btn px-3 py-1 bg-primary text-surface-container-lowest font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm rotate-2 active:translate-y-0.5 transition-transform uppercase" data-mult="1.0">
            POT (28.4K)
          </button>
<button className="preset-btn px-3 py-1 bg-secondary text-on-secondary font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm -rotate-2 active:translate-y-0.5 transition-transform uppercase" data-mult="2.0">
            2× POT
          </button>
<button className="preset-btn px-3 py-1 bg-error text-on-error font-headline-sm text-headline-sm border-[2px] border-surface-container-lowest comic-shadow-sm rotate-1 active:translate-y-0.5 transition-transform uppercase" data-mult="max">
            ALL-IN MAX
          </button>
</div>
{/* Raise Stepper & Range Bar */}
<div className="flex items-center gap-space-sm flex-1 max-w-xl">
<button className="w-10 h-10 bg-surface-container-lowest hover:bg-surface-container-high text-primary border-[3px] border-surface-container-lowest comic-shadow-sm font-headline-md text-headline-md flex items-center justify-center active:translate-y-0.5" id="step-down-btn">
            -
          </button>
{/* Stepped Slider Track */}
<div className="flex-1 flex flex-col gap-1">
<input className="w-full accent-primary-container h-3 bg-surface-container-lowest border-[2px] border-surface-container-lowest cursor-pointer" id="bet-slider" max="55400" min="4200" step="1000" type="range" value="8400"/>
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant uppercase">
<span>MIN: 4,200</span>
<span className="text-primary-container font-bold" id="slider-val-tag">SLIDER: 8,400</span>
<span>MAX: 55,400</span>
</div>
</div>
<button className="w-10 h-10 bg-surface-container-lowest hover:bg-surface-container-high text-primary border-[3px] border-surface-container-lowest comic-shadow-sm font-headline-md text-headline-md flex items-center justify-center active:translate-y-0.5" id="step-up-btn">
            +
          </button>
{/* Bet Sizing Value Readout */}
<div className="bg-surface-container-lowest px-space-md py-1 border-[3px] border-outline-variant comic-shadow-sm min-w-[130px] text-right">
<span className="font-label-sm text-label-sm text-on-surface-variant block uppercase leading-none">TARGET BET</span>
<span className="font-headline-md text-headline-md text-primary tracking-wide" id="numeric-bet-display">8,400</span>
</div>
</div>
</div>
{/* MAIN BOTTOM ACTION BUTTONS: FOLD / CALL / RAISE / ALL-IN */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-sm">
{/* ACTION 1: FOLD (RED/CHARCOAL CUT-PAPER) */}
<button className="group relative bg-[#D9453A] hover:bg-[#b03027] text-[#F2EEE4] p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md -rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform flex flex-col justify-center items-center" id="btn-fold">
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">FOLD</span>
<span className="font-label-sm text-label-sm opacity-90 uppercase tracking-widest mt-1">GIVE UP HAND</span>
</button>
{/* ACTION 2: CHECK / CALL (CYAN PUNK CEL-SHADED) */}
<button className="group relative bg-[#1AA3D4] hover:bg-[#1483aa] text-surface-container-lowest p-space-sm border-[4px] border-surface-container-lowest comic-shadow-md rotate-1 active:translate-x-[2px] active:translate-y-[2px] transition-transform flex flex-col justify-center items-center" id="btn-call">
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">CALL 4,200</span>
<span className="font-label-sm text-label-sm text-surface-container-lowest opacity-90 uppercase tracking-widest mt-1">MATCH CURRENT SCRAP</span>
</button>
{/* ACTION 3: RAISE TO 8,400 (PRIMARY HIGH-CONTRAST YELLOW HERO) */}
<button className="group relative bg-primary-container hover:bg-primary-fixed text-on-primary-container p-space-sm border-[4px] border-surface-container-lowest comic-shadow-lg -rotate-1.5 hover:rotate-0 active:translate-x-[3px] active:translate-y-[3px] transition-transform flex flex-col justify-center items-center" id="btn-raise">
{/* Spark Accent */}
<div className="absolute -top-3 -right-2 bg-surface-container-lowest text-primary px-1.5 py-0.5 border-[2px] border-surface-container-lowest font-headline-sm text-headline-sm rotate-6">
            HOT!
          </div>
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide" id="raise-btn-label">RAISE TO 8,400</span>
<span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mt-1 font-bold">APPLY PRESSURE</span>
</button>
{/* ACTION 4: ALL-IN (EXPLOSIVE COMIC BURST BADGE) */}
<button className="group relative bg-error text-on-error p-space-sm border-[4px] border-surface-container-lowest comic-shadow-lg rotate-1 active:translate-x-[3px] active:translate-y-[3px] transition-transform flex flex-col justify-center items-center overflow-hidden" id="btn-allin">
<span className="font-display-lg text-display-lg leading-none uppercase tracking-wide">💥 ALL-IN!</span>
<span className="font-label-sm text-label-sm text-on-error uppercase tracking-widest mt-1 font-bold">MAX 55,400 SCRAP</span>
</button>
</div>
</div>
</div>
{/* POPUP MODAL: HAND RANKINGS GUIDE (COMIC BOOK CUTOUT DIALOG) */}
<div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center p-gutter hidden" id="rankings-modal">
<div className="relative w-full max-w-2xl bg-surface-container border-[4px] border-surface-container-lowest comic-shadow-lg p-space-md md:p-space-lg -rotate-1">
{/* Close Button Stamp */}
<button className="absolute -top-4 -right-4 w-10 h-10 bg-error text-on-error font-headline-md text-headline-md border-[3px] border-surface-container-lowest comic-shadow-sm rotate-6 flex items-center justify-center hover:scale-110 transition-transform" id="close-rankings-btn">
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
<button className="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-1 border-[2px] border-surface-container-lowest comic-shadow-sm uppercase" id="close-modal-bottom-btn">GOT IT!</button>
</div>
</div>
</div>
{/* ACTION CONFIRMATION COMIC TOAST (HIDDEN BY DEFAULT) */}
<div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 opacity-0 -translate-y-4" id="comic-toast">
<div className="bg-primary-container text-on-primary-container px-space-lg py-space-sm border-[4px] border-surface-container-lowest comic-shadow-lg -rotate-2 flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[28px] animate-spin">cyclone</span>
<span className="font-headline-lg text-headline-lg uppercase" id="toast-message">ACTION COMMITTED!</span>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-low border-t-[3px] border-surface-container-lowest py-space-sm px-gutter bg-halftone"><div className="w-full flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-md text-label-md tracking-wider text-on-surface-variant uppercase"><div className="flex items-center gap-space-md"><span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary text-[14px]">verified</span> PROVABLY FAIR RNG</span><span>///</span><span className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-secondary text-[14px]">gavel</span> CERTIFIED COMIC RULES</span><span>///</span><span className="flex items-center gap-space-xs text-on-surface-variant"><span className="material-symbols-outlined text-outline text-[14px]">shield</span> SOCIAL CHIPS ONLY</span></div><div className="text-outline text-label-sm font-label-sm">SCRAP ENGINE V2.4 // DISTRESSED DESKTOP RUNNER</div></div></footer>
    </div>
  );
};

export default BattleTable;
