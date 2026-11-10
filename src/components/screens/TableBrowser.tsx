import React, { useState } from "react";

export interface TableBrowserProps {
  onNavigateToTable?: (tableId?: string) => void;
  onNavigateToLobby?: () => void;
}

export const TableBrowser: React.FC<TableBrowserProps> = ({
  onNavigateToTable,
  onNavigateToLobby,
}) => {
  const [buyIn, setBuyIn] = useState<number>(8000);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
<header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low border-b-[3px] border-surface-container-lowest shadow-[0_4px_0_#000000]"><div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-md"><a className="inline-flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-variant text-on-surface px-space-md py-space-xs border-[2px] border-surface-container-lowest shadow-[2px_2px_0px_#000000] -rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all font-headline-sm text-headline-sm uppercase tracking-wider" data-path="main-lobby" href="#" onClick={(e) => { e.preventDefault(); onNavigateToLobby?.(); }}><span className="material-symbols-outlined text-[18px]">arrow_back</span><span>LOBBY</span></a><div className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-lowest border-[2px] border-surface-container-highest shadow-[2px_2px_0px_#000000] rotate-1"><div className="w-7 h-7 bg-primary-container border-[2px] border-surface-container-lowest flex items-center justify-center font-headline-md text-headline-md text-on-primary-container leading-none select-none">S</div><div className="flex flex-col"><span className="font-headline-md text-headline-md uppercase text-primary leading-none tracking-wider">SCRAP POKER</span><span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim leading-none">UNDERGROUND DECK</span></div></div><div className="hidden lg:inline-block bg-primary-container text-on-primary-container font-headline-sm text-headline-sm px-space-md py-0.5 border-[2px] border-surface-container-lowest shadow-[2px_2px_0px_#000000] -rotate-2 select-none uppercase">CASH TABLES</div></div><nav className="hidden md:flex items-center gap-space-sm" data-active-classes="bg-primary-container text-on-primary-container border-surface-container-lowest shadow-[2px_2px_0px_#000000] -rotate-1 font-label-lg"><a aria-current="page" className="uppercase tracking-wider px-space-md py-space-xs transition-all bg-primary-container text-on-primary-container border-surface-container-lowest shadow-[2px_2px_0px_#000000] -rotate-1 font-label-lg" data-path="cash-game-browser" href="#">Cash Tables</a><a className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface px-space-md py-space-xs border-[2px] border-transparent transition-all" data-path="sit-and-go-lobby" href="#">Sit & Go</a><a className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface px-space-md py-space-xs border-[2px] border-transparent transition-all" data-path="tournaments" href="#">Tournaments</a><a className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface px-space-md py-space-xs border-[2px] border-transparent transition-all" data-path="hand-replayer" href="#">Replayer</a></nav><div className="flex items-center gap-space-md"><div className="flex items-center bg-surface-container-lowest border-[2px] border-surface-container-highest px-space-md py-space-xs shadow-[2px_2px_0px_#000000] rotate-1"><div className="w-5 h-5 rounded-full bg-secondary-container border-[1.5px] border-surface-container-lowest flex items-center justify-center mr-space-xs"><span className="font-headline-sm text-headline-sm text-on-secondary-container leading-none">$</span></div><div className="flex flex-col"><span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider leading-none">STACK</span><span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-tight">450,200 <span className="font-label-md text-label-md text-primary-fixed-dim">SCRAP</span></span></div><button aria-label="Deposit Chips" className="ml-space-sm bg-primary-container hover:bg-primary-fixed text-on-primary-container w-6 h-6 border-[1.5px] border-surface-container-lowest flex items-center justify-center shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5" type="button"><span className="material-symbols-outlined text-[16px]">add</span></button></div><a aria-label="Game Settings" className="w-10 h-10 bg-surface-container-high hover:bg-surface-variant text-on-surface border-[2px] border-surface-container-lowest shadow-[2px_2px_0px_#000000] flex items-center justify-center -rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all" data-path="table-settings" href="#"><span className="material-symbols-outlined text-[22px]">settings</span></a><div className="relative group"><div className="w-10 h-10 bg-primary-container border-[2px] border-surface-container-lowest shadow-[2px_2px_0px_#000000] flex items-center justify-center rotate-1"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></div></div></header><main className="w-full pt-20 bg-background min-h-screen"><div className="flex flex-col w-full">
<div className="relative w-full max-w-7xl mx-auto px-margin pb-space-xl overflow-hidden">
{/* SUB-NAV / LOBBY BANNER STRIP */}
<div className="mt-space-md mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md flex-wrap">
<a className="inline-flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-variant text-on-surface px-space-md py-space-xs shadow-[4px_4px_0px_#000000] -rotate-1 hover:rotate-0 transition-transform font-headline-sm text-headline-sm uppercase tracking-wider" data-path="main-lobby" href="#" onClick={(e) => { e.preventDefault(); onNavigateToLobby?.(); }}>
<span className="material-symbols-outlined text-[20px]">arrow_back</span>
<span>&lt; BACK TO LOBBY</span>
</a>
<div className="relative inline-block bg-surface-container-lowest px-space-lg py-space-xs shadow-[4px_4px_0px_#000000] rotate-1">
<div className="flex items-center gap-space-sm">
<span className="w-3 h-3 bg-primary-container inline-block animate-ping"></span>
<span className="font-headline-md text-headline-md text-primary tracking-wide uppercase">CASH TABLES // UNDERGROUND SYNDICATE FELT</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm self-start md:self-auto">
<div className="bg-surface-container px-space-md py-space-xs shadow-[3px_3px_0px_#000000] -rotate-1 flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[18px]">table_bar</span>
<span className="font-label-md text-label-md text-on-surface-variant uppercase">18 ACTIVE TABLES</span>
</div>
<div className="bg-surface-container-lowest px-space-md py-space-xs shadow-[3px_3px_0px_#000000] rotate-1 flex items-center gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
<span className="font-label-md text-label-md text-primary uppercase">112 RUNNERS ONLINE</span>
</div>
</div>
</div>
{/* TORN FILTERS BARRIERS / ACTION PANEL */}
<section aria-label="Filters" className="mb-space-lg bg-surface-container-low p-space-md shadow-[6px_6px_0px_#000000] relative">
<div className="absolute -top-3 left-6 bg-primary-container px-space-sm py-0.5 shadow-[2px_2px_0px_#000000] -rotate-2">
<span className="font-headline-sm text-headline-sm text-on-primary-container tracking-wider uppercase">DECK FILTER RACK</span>
</div>
<div className="flex flex-col gap-space-md pt-space-xs">
{/* ROW 1: GAME TYPE, STAKES, SEARCH */}
<div className="flex flex-wrap items-center justify-between gap-space-md">
{/* Game Format Pill */}
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">FORMAT:</span>
<button className="bg-secondary-container text-on-secondary-container px-space-md py-space-xs shadow-[3px_3px_0px_#000000] font-headline-sm text-headline-sm uppercase tracking-wide -rotate-1 hover:rotate-0 transition-transform flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-[18px]">playing_cards</span>
<span>TEXAS HOLD'EM (NO-LIMIT)</span>
</button>
<button className="bg-surface-container hover:bg-surface-variant text-on-surface-variant px-space-sm py-space-xs shadow-[2px_2px_0px_#000000] font-headline-sm text-headline-sm uppercase tracking-wide" type="button">
              PLO 4-CARD
            </button>
</div>
{/* Search Input with comic look */}
<div className="flex-1 min-w-[260px] max-w-md relative">
<div className="relative flex items-center bg-surface-container-lowest shadow-[3px_3px_0px_#000000]">
<span className="material-symbols-outlined text-outline ml-space-sm text-[20px]">search</span>
<input className="w-full bg-transparent px-space-sm py-space-xs text-on-surface placeholder:text-outline font-label-lg text-label-lg tracking-wider focus:outline-none uppercase" placeholder="SEARCH TABLE NAME OR ID..." type="text"/>
<span className="bg-surface-variant text-on-surface-variant px-space-xs py-0.5 text-label-sm font-label-sm mr-1 uppercase">ESC</span>
</div>
</div>
{/* Checkbox: Open Seats Only */}
<label className="flex items-center gap-space-xs cursor-pointer select-none bg-surface-container px-space-md py-space-xs shadow-[2px_2px_0px_#000000] rotate-1 hover:bg-surface-variant">
<input defaultChecked className="w-4 h-4 accent-primary-container cursor-pointer" type="checkbox"/>
<span className="font-label-lg text-label-lg text-primary uppercase tracking-wider">[✓] OPEN SEATS ONLY</span>
</label>
</div>
{/* ROW 2: STAKES, TABLE SIZE, SPEED, SORT */}
<div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs border-t-2 border-surface-container-highest">
{/* Stakes Tabs */}
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mr-1">STAKES:</span>
<button className="bg-surface-container hover:bg-surface-variant text-on-surface px-space-sm py-0.5 font-label-lg text-label-lg uppercase shadow-[2px_2px_0px_#000000]" type="button">ALL</button>
<button className="bg-surface-container hover:bg-surface-variant text-on-surface px-space-sm py-0.5 font-label-lg text-label-lg uppercase shadow-[2px_2px_0px_#000000]" type="button">MICRO (25/50)</button>
<button className="bg-primary-container text-on-primary-container px-space-md py-0.5 font-headline-sm text-headline-sm uppercase shadow-[3px_3px_0px_#000000] -rotate-1" type="button">MID (50/100 - 100/200)</button>
<button className="bg-surface-container hover:bg-surface-variant text-on-surface px-space-sm py-0.5 font-label-lg text-label-lg uppercase shadow-[2px_2px_0px_#000000]" type="button">HIGH ROLLER (200/400+)</button>
</div>
{/* Table Size Selector */}
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mr-1">SIZE:</span>
<div className="inline-flex bg-surface-container-lowest p-0.5 shadow-[2px_2px_0px_#000000]">
<button className="px-space-xs py-0.5 text-on-surface-variant font-label-md text-label-md uppercase hover:text-on-surface" type="button">ALL</button>
<button className="px-space-xs py-0.5 text-on-surface-variant font-label-md text-label-md uppercase hover:text-on-surface" type="button">2-HU</button>
<button className="bg-surface-variant text-primary px-space-sm py-0.5 font-label-lg text-label-lg uppercase shadow-[1px_1px_0px_#000000]" type="button">6-MAX</button>
<button className="px-space-xs py-0.5 text-on-surface-variant font-label-md text-label-md uppercase hover:text-on-surface" type="button">9-RING</button>
</div>
</div>
{/* Speed & Sort */}
<div className="flex items-center gap-space-md flex-wrap">
{/* Speed toggle */}
<div className="flex items-center gap-1 bg-surface-container-lowest px-space-xs py-0.5 shadow-[2px_2px_0px_#000000]">
<button className="px-space-xs py-0.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase" type="button">NORMAL</button>
<button className="bg-primary-container text-on-primary-container px-space-xs py-0.5 font-label-lg text-label-lg uppercase shadow-[1px_1px_0px_#000000]" type="button">TURBO ⚡</button>
</div>
{/* Sort By dropdown pill */}
<div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-0.5 shadow-[2px_2px_0px_#000000]">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">SORT:</span>
<select className="bg-transparent text-primary font-label-lg text-label-lg uppercase tracking-wide focus:outline-none cursor-pointer">
<option className="bg-surface-container-lowest text-on-surface" value="stakes-desc">STAKES (HIGH TO LOW)</option>
<option className="bg-surface-container-lowest text-on-surface" value="avg-pot">AVERAGE POT</option>
<option className="bg-surface-container-lowest text-on-surface" value="players">PLAYERS ONLINE</option>
</select>
</div>
</div>
</div>
</div>
</section>
{/* 2-COLUMN MAIN CONTENT SPLIT (TABLE LIST 68% + DETAILS INSPECTOR 32%) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
{/* LEFT COLUMN: TABLE LIST (approx 68% on lg -> 8 columns of 12) */}
<section aria-label="Available Tables" className="lg:col-span-8 flex flex-col gap-space-md">
{/* Table Column Headers */}
<div className="hidden sm:grid sm:grid-cols-12 gap-space-sm px-space-md py-space-xs bg-surface-container-lowest shadow-[2px_2px_0px_#000000] text-outline font-label-md text-label-md uppercase tracking-wider">
<div className="col-span-4">TABLE / SYNDICATE</div>
<div className="col-span-2 text-right">BLINDS</div>
<div className="col-span-2 text-right">BUY-IN RANGE</div>
<div className="col-span-2 text-center">SEATS</div>
<div className="col-span-2 text-right">ACTION</div>
</div>
{/* ROW 1: SCRAP YARD #07 (SELECTED TABLE) */}
<article className="relative bg-surface-container p-space-md shadow-[4px_4px_0px_#000000] -rotate-[0.5deg] hover:rotate-0 transition-transform">
<div className="absolute -top-2.5 right-4 bg-primary-container px-space-xs py-0.5 shadow-[2px_2px_0px_#000000] rotate-2">
<span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider">INSPECTOR ACTIVE</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
{/* Col: Name & badges */}
<div className="sm:col-span-4 flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-primary tracking-wide uppercase">SCRAP YARD #07</span>
<span className="bg-error-container text-on-error-container px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-[1px_1px_0px_#000000]">ALMOST FULL</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase mt-0.5">
<span className="text-secondary font-bold">⚡ TURBO</span>
<span>•</span>
<span>AVG POT: <span className="text-primary font-bold">14,200</span></span>
</div>
</div>
{/* Col: Blinds */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BLINDS:</span>
<div className="flex flex-col sm:items-end">
<span className="font-headline-sm text-headline-sm text-primary tracking-wider">50 / 100</span>
<span className="font-label-sm text-label-sm text-outline uppercase">SCRAP</span>
</div>
</div>
{/* Col: Buy-in */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BUY-IN:</span>
<div className="flex flex-col sm:items-end">
<span className="font-label-lg text-label-lg text-on-surface uppercase">2K - 10K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">20-100 BB</span>
</div>
</div>
{/* Col: Seats */}
<div className="sm:col-span-2 text-center flex sm:flex-col justify-between items-center">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">SEATS:</span>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-primary-fixed-dim">5 / 6</span>
<div className="flex gap-1 mt-0.5">
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
</div>
</div>
</div>
{/* Col: CTA */}
<div className="sm:col-span-2 sm:text-right mt-space-xs sm:mt-0">
<button className="w-full sm:w-auto bg-primary-container hover:bg-primary-fixed text-on-primary-container px-space-md py-space-xs font-headline-sm text-headline-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] -rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                JOIN TABLE
              </button>
</div>
</div>
</article>
{/* ROW 2: BOLT RUNNER #12 */}
<article className="bg-surface-container-low hover:bg-surface-container p-space-md shadow-[4px_4px_0px_#000000] transition-colors">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
{/* Name & badge */}
<div className="sm:col-span-4 flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-on-surface tracking-wide uppercase">BOLT RUNNER #12</span>
<span className="bg-secondary-container text-on-secondary-container px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-[1px_1px_0px_#000000]">OPEN SEATS</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase mt-0.5">
<span>NORMAL PACE</span>
<span>•</span>
<span>AVG POT: <span className="text-primary font-bold">28,600</span></span>
</div>
</div>
{/* Blinds */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BLINDS:</span>
<div className="flex flex-col sm:items-end">
<span className="font-headline-sm text-headline-sm text-on-surface tracking-wider">100 / 200</span>
<span className="font-label-sm text-label-sm text-outline uppercase">SCRAP</span>
</div>
</div>
{/* Buy-in */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BUY-IN:</span>
<div className="flex flex-col sm:items-end">
<span className="font-label-lg text-label-lg text-on-surface uppercase">5K - 20K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">25-100 BB</span>
</div>
</div>
{/* Seats */}
<div className="sm:col-span-2 text-center flex sm:flex-col justify-between items-center">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">SEATS:</span>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">4 / 6</span>
<div className="flex gap-1 mt-0.5">
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
</div>
</div>
</div>
{/* CTA */}
<div className="sm:col-span-2 sm:text-right mt-space-xs sm:mt-0">
<button className="w-full sm:w-auto bg-primary-container hover:bg-primary-fixed text-on-primary-container px-space-md py-space-xs font-headline-sm text-headline-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                JOIN TABLE
              </button>
</div>
</div>
</article>
{/* ROW 3: NEON ALLEY #03 */}
<article className="bg-surface-container-low hover:bg-surface-container p-space-md shadow-[4px_4px_0px_#000000] transition-colors">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
{/* Name & badge */}
<div className="sm:col-span-4 flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-on-surface tracking-wide uppercase">NEON ALLEY #03</span>
<span className="bg-secondary-container text-on-secondary-container px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-[1px_1px_0px_#000000]">OPEN SEATS</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase mt-0.5">
<span>NORMAL PACE</span>
<span>•</span>
<span>AVG POT: <span className="text-primary font-bold">6,400</span></span>
</div>
</div>
{/* Blinds */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BLINDS:</span>
<div className="flex flex-col sm:items-end">
<span className="font-headline-sm text-headline-sm text-on-surface tracking-wider">25 / 50</span>
<span className="font-label-sm text-label-sm text-outline uppercase">SCRAP</span>
</div>
</div>
{/* Buy-in */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BUY-IN:</span>
<div className="flex flex-col sm:items-end">
<span className="font-label-lg text-label-lg text-on-surface uppercase">1K - 5K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">20-100 BB</span>
</div>
</div>
{/* Seats */}
<div className="sm:col-span-2 text-center flex sm:flex-col justify-between items-center">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">SEATS:</span>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">3 / 6</span>
<div className="flex gap-1 mt-0.5">
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
</div>
</div>
</div>
{/* CTA */}
<div className="sm:col-span-2 sm:text-right mt-space-xs sm:mt-0">
<button className="w-full sm:w-auto bg-primary-container hover:bg-primary-fixed text-on-primary-container px-space-md py-space-xs font-headline-sm text-headline-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] -rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                JOIN TABLE
              </button>
</div>
</div>
</article>
{/* ROW 4: RUST BUCKET #09 (TABLE FULL) */}
<article className="bg-surface-container-lowest p-space-md shadow-[4px_4px_0px_#000000] opacity-90">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
{/* Name & badge */}
<div className="sm:col-span-4 flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-outline tracking-wide uppercase">RUST BUCKET #09</span>
<span className="bg-surface-variant text-on-surface-variant px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-[1px_1px_0px_#000000]">TABLE FULL</span>
</div>
<div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase mt-0.5">
<span>⚡ TURBO</span>
<span>•</span>
<span>AVG POT: 52,100</span>
</div>
</div>
{/* Blinds */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BLINDS:</span>
<div className="flex flex-col sm:items-end">
<span className="font-headline-sm text-headline-sm text-on-surface-variant tracking-wider">200 / 400</span>
<span className="font-label-sm text-label-sm text-outline uppercase">SCRAP</span>
</div>
</div>
{/* Buy-in */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BUY-IN:</span>
<div className="flex flex-col sm:items-end">
<span className="font-label-lg text-label-lg text-outline uppercase">10K - 40K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">25-100 BB</span>
</div>
</div>
{/* Seats */}
<div className="sm:col-span-2 text-center flex sm:flex-col justify-between items-center">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">SEATS:</span>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-error">6 / 6</span>
<div className="flex gap-1 mt-0.5">
<span className="w-2 h-2 bg-error-container inline-block"></span>
<span className="w-2 h-2 bg-error-container inline-block"></span>
<span className="w-2 h-2 bg-error-container inline-block"></span>
<span className="w-2 h-2 bg-error-container inline-block"></span>
<span className="w-2 h-2 bg-error-container inline-block"></span>
<span className="w-2 h-2 bg-error-container inline-block"></span>
</div>
</div>
</div>
{/* CTA */}
<div className="sm:col-span-2 sm:text-right mt-space-xs sm:mt-0">
<button className="w-full sm:w-auto bg-surface-variant hover:bg-surface-bright text-on-surface-variant px-space-md py-space-xs font-headline-sm text-headline-sm uppercase tracking-wider shadow-[2px_2px_0px_#000000] rotate-1 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                WAITLIST (2)
              </button>
</div>
</div>
</article>
{/* ROW 5: CYBER DEN #15 (WHALES / HIGH STAKES) */}
<article className="bg-surface-container-low hover:bg-surface-container p-space-md shadow-[4px_4px_0px_#000000] transition-colors relative">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
{/* Name & badge */}
<div className="sm:col-span-4 flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-primary-fixed-dim tracking-wide uppercase">CYBER DEN #15</span>
<span className="bg-tertiary-container text-on-tertiary-container px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-[1px_1px_0px_#000000] font-bold">VIP WHALES</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase mt-0.5">
<span className="text-secondary font-bold">⚡ FAST</span>
<span>•</span>
<span>AVG POT: <span className="text-primary font-bold">135,000</span></span>
</div>
</div>
{/* Blinds */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BLINDS:</span>
<div className="flex flex-col sm:items-end">
<span className="font-headline-sm text-headline-sm text-primary tracking-wider">500 / 1K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">SCRAP</span>
</div>
</div>
{/* Buy-in */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BUY-IN:</span>
<div className="flex flex-col sm:items-end">
<span className="font-label-lg text-label-lg text-primary-fixed uppercase">40K - 200K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">40-200 BB</span>
</div>
</div>
{/* Seats */}
<div className="sm:col-span-2 text-center flex sm:flex-col justify-between items-center">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">SEATS:</span>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-primary">5 / 6</span>
<div className="flex gap-1 mt-0.5">
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
</div>
</div>
</div>
{/* CTA */}
<div className="sm:col-span-2 sm:text-right mt-space-xs sm:mt-0">
<button className="w-full sm:w-auto bg-primary-container hover:bg-primary-fixed text-on-primary-container px-space-md py-space-xs font-headline-sm text-headline-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] -rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                JOIN TABLE
              </button>
</div>
</div>
</article>
{/* ROW 6: UNDERGROUND SHED #02 (PRIVATE PIN) */}
<article className="bg-surface-container-low hover:bg-surface-container p-space-md shadow-[4px_4px_0px_#000000] transition-colors">
<div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm items-center">
{/* Name & badge */}
<div className="sm:col-span-4 flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-md text-headline-md text-on-surface tracking-wide uppercase">UNDERGROUND SHED #02</span>
<span className="bg-surface-highest text-on-surface px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider shadow-[1px_1px_0px_#000000] flex items-center gap-0.5">
<span className="material-symbols-outlined text-[13px]">lock</span>
<span>PRIVATE</span>
</span>
</div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase mt-0.5">
<span>NORMAL PACE</span>
<span>•</span>
<span>AVG POT: <span className="text-primary font-bold">18,900</span></span>
</div>
</div>
{/* Blinds */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BLINDS:</span>
<div className="flex flex-col sm:items-end">
<span className="font-headline-sm text-headline-sm text-on-surface tracking-wider">50 / 100</span>
<span className="font-label-sm text-label-sm text-outline uppercase">SCRAP</span>
</div>
</div>
{/* Buy-in */}
<div className="sm:col-span-2 sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">BUY-IN:</span>
<div className="flex flex-col sm:items-end">
<span className="font-label-lg text-label-lg text-on-surface uppercase">2K - 10K</span>
<span className="font-label-sm text-label-sm text-outline uppercase">20-100 BB</span>
</div>
</div>
{/* Seats */}
<div className="sm:col-span-2 text-center flex sm:flex-col justify-between items-center">
<span className="sm:hidden font-label-sm text-label-sm text-outline uppercase">SEATS:</span>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">4 / 6</span>
<div className="flex gap-1 mt-0.5">
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-secondary-container inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
<span className="w-2 h-2 bg-surface-variant inline-block"></span>
</div>
</div>
</div>
{/* CTA */}
<div className="sm:col-span-2 sm:text-right mt-space-xs sm:mt-0">
<button className="w-full sm:w-auto bg-secondary-container hover:bg-secondary text-on-secondary-container px-space-md py-space-xs font-headline-sm text-headline-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                ENTER PIN
              </button>
</div>
</div>
</article>
</section>
{/* RIGHT COLUMN: SELECTED TABLE DETAILS INSPECTOR & MODAL DOCK (approx 32% -> 4 cols of 12) */}
<aside aria-label="Table Inspector" className="lg:col-span-4 flex flex-col gap-space-lg">
{/* MAIN INSPECTOR CARD */}
<div className="bg-surface-container p-space-lg shadow-[6px_6px_0px_#000000] relative rotate-[0.5deg]">
{/* Torn tape banner at top */}
<div className="absolute -top-3 left-4 bg-primary-container px-space-md py-0.5 shadow-[2px_2px_0px_#000000] -rotate-2 flex items-center gap-space-xs">
<span className="w-2 h-2 bg-error-container inline-block animate-pulse"></span>
<span className="font-headline-sm text-headline-sm text-on-primary-container uppercase tracking-wide">LIVE TABLE FEED</span>
</div>
{/* Table Title */}
<div className="mt-space-xs pb-space-sm border-b-2 border-surface-container-highest">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">CURRENT FOCUS</span>
<h2 className="font-headline-lg text-headline-lg text-primary uppercase tracking-wide">SCRAP YARD #07</h2>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md uppercase">
<span className="text-secondary font-bold">⚡ TURBO PACED</span>
<span>•</span>
<span>6-MAX NO-LIMIT HOLD'EM</span>
</div>
</div>
{/* Stats Grid */}
<div className="grid grid-cols-3 gap-space-xs py-space-md border-b-2 border-surface-container-highest text-center">
<div className="bg-surface-container-lowest p-space-xs shadow-[2px_2px_0px_#000000]">
<span className="font-label-sm text-label-sm text-outline uppercase block">BLINDS</span>
<span className="font-headline-sm text-headline-sm text-primary">50 / 100</span>
</div>
<div className="bg-surface-container-lowest p-space-xs shadow-[2px_2px_0px_#000000]">
<span className="font-label-sm text-label-sm text-outline uppercase block">AVG POT</span>
<span className="font-headline-sm text-headline-sm text-secondary-fixed">14.2K</span>
</div>
<div className="bg-surface-container-lowest p-space-xs shadow-[2px_2px_0px_#000000]">
<span className="font-label-sm text-label-sm text-outline uppercase block">PACE</span>
<span className="font-headline-sm text-headline-sm text-primary-fixed-dim">84 H/HR</span>
</div>
</div>
{/* SEATED RUNNERS LIST (5/6 Players) */}
<div className="py-space-md border-b-2 border-surface-container-highest">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md text-primary uppercase tracking-wider">SEATED SCRAPPERS (5/6)</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">SEAT #6 OPEN</span>
</div>
<div className="flex flex-col gap-1.5">
{/* Player 1 */}
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1 shadow-[1px_1px_0px_#000000]">
<div className="flex items-center gap-space-xs">
<div className="w-5 h-5 bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm leading-none">1</div>
<span className="font-label-lg text-label-lg text-on-surface uppercase">Neon_Jack</span>
</div>
<span className="font-headline-sm text-headline-sm text-primary tracking-wide">18,450 <span className="font-label-sm text-outline">SCRAP</span></span>
</div>
{/* Player 2 */}
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1 shadow-[1px_1px_0px_#000000]">
<div className="flex items-center gap-space-xs">
<div className="w-5 h-5 bg-surface-variant text-on-surface flex items-center justify-center font-headline-sm text-headline-sm leading-none">2</div>
<span className="font-label-lg text-label-lg text-on-surface uppercase">Bolt_99</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface tracking-wide">9,200 <span className="font-label-sm text-outline">SCRAP</span></span>
</div>
{/* Player 3 */}
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1 shadow-[1px_1px_0px_#000000]">
<div className="flex items-center gap-space-xs">
<div className="w-5 h-5 bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-headline-sm leading-none">3</div>
<span className="font-label-lg text-label-lg text-on-surface uppercase">Viper_X</span>
</div>
<span className="font-headline-sm text-headline-sm text-secondary tracking-wide">24,800 <span className="font-label-sm text-outline">SCRAP</span></span>
</div>
{/* Player 4 */}
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1 shadow-[1px_1px_0px_#000000]">
<div className="flex items-center gap-space-xs">
<div className="w-5 h-5 bg-surface-variant text-on-surface flex items-center justify-center font-headline-sm text-headline-sm leading-none">4</div>
<span className="font-label-lg text-label-lg text-on-surface uppercase">Cogwheel</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface tracking-wide">6,100 <span className="font-label-sm text-outline">SCRAP</span></span>
</div>
{/* Player 5 */}
<div className="flex items-center justify-between bg-surface-container-lowest px-space-sm py-1 shadow-[1px_1px_0px_#000000]">
<div className="flex items-center gap-space-xs">
<div className="w-5 h-5 bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-headline-sm text-headline-sm leading-none">5</div>
<span className="font-label-lg text-label-lg text-on-surface uppercase">Mad_Ram</span>
</div>
<span className="font-headline-sm text-headline-sm text-primary tracking-wide">12,500 <span className="font-label-sm text-outline">SCRAP</span></span>
</div>
{/* Seat 6 Empty CTA */}
<div className="flex items-center justify-between bg-surface-container-high px-space-sm py-1 border-2 border-dashed border-outline shadow-[1px_1px_0px_#000000]">
<div className="flex items-center gap-space-xs">
<div className="w-5 h-5 bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm leading-none">6</div>
<span className="font-label-lg text-label-lg text-primary uppercase font-bold">SEAT #6 VACANT</span>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">[RESERVE NOW]</span>
</div>
</div>
</div>
{/* BUY-IN CONFIRMATION CONTROLS (INSPECTOR ACTION) */}
<div className="pt-space-md flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface uppercase">CONFIRM BUY-IN FOR SEAT #6</span>
<span className="font-label-sm text-label-sm text-outline uppercase">STACK: 450.2K</span>
</div>
{/* Amount display & Slider */}
<div className="bg-surface-container-lowest p-space-sm shadow-[3px_3px_0px_#000000]">
<div className="flex items-center justify-between mb-1">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">TARGET BUY-IN</span>
<div className="text-right">
<span className="font-headline-lg text-headline-lg text-primary tracking-wider" id="buyin-value-display">{buyIn.toLocaleString()}</span>
<span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase ml-1">SCRAP (80 BB)</span>
</div>
</div>
{/* Stepped Slider */}
<input className="w-full accent-primary-container cursor-pointer h-2 bg-surface-variant" id="buyin-slider" max="10000" min="2000" step="500" type="range" value={buyIn} onChange={(e) => setBuyIn(Number(e.target.value))}/>
{/* Presets */}
<div className="flex items-center justify-between gap-space-xs mt-space-xs">
<button className="flex-1 bg-surface-container hover:bg-surface-variant text-on-surface-variant hover:text-on-surface py-0.5 font-label-md text-label-md uppercase shadow-[1px_1px_0px_#000000]" onClick={() => setBuyIn(2000)} type="button">
                  MIN (2K)
                </button>
<button className="flex-1 bg-surface-container hover:bg-surface-variant text-on-surface-variant hover:text-on-surface py-0.5 font-label-md text-label-md uppercase shadow-[1px_1px_0px_#000000]" onClick={() => setBuyIn(5000)} type="button">
                  MED (5K)
                </button>
<button className="flex-1 bg-surface-container hover:bg-surface-variant text-on-surface-variant hover:text-on-surface py-0.5 font-label-md text-label-md uppercase shadow-[1px_1px_0px_#000000]" onClick={() => setBuyIn(10000)} type="button">
                  MAX (10K)
                </button>
</div>
</div>
{/* Primary Join CTA */}
<div className="flex flex-col gap-space-xs">
<button className="w-full bg-primary-container hover:bg-primary-fixed text-on-primary-container py-space-sm shadow-[4px_4px_0px_#000000] -rotate-1 hover:rotate-0 active:translate-x-0.5 active:translate-y-0.5 transition-all font-headline-md text-headline-md uppercase tracking-wider flex items-center justify-center gap-space-xs" type="button" onClick={() => onNavigateToTable?.()}>
<span>CONFIRM & SIT DOWN</span>
<span className="material-symbols-outlined text-[24px]">login</span>
</button>
<button className="w-full bg-surface-container-high hover:bg-surface-variant text-on-surface-variant hover:text-on-surface py-1 font-label-lg text-label-lg uppercase tracking-wider shadow-[2px_2px_0px_#000000]" type="button">
                CANCEL / CLOSE INSPECTOR
              </button>
</div>
</div>
</div>
{/* SECONDARY STATE PREVIEWS (Comic Alerts Stack) */}
<div className="flex flex-col gap-space-md">
{/* STATE PREVIEW 1: INSUFFICIENT CHIPS WARNING */}
<div className="bg-surface-container-low p-space-md shadow-[4px_4px_0px_#000000] -rotate-1 relative">
<div className="flex items-start gap-space-sm">
<div className="w-7 h-7 bg-error-container text-on-error-container flex items-center justify-center font-headline-sm text-headline-sm shadow-[2px_2px_0px_#000000] shrink-0">!</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-error uppercase">STATE: INSUFFICIENT CHIPS</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  ON TABLE <span className="text-primary font-bold">#04 HIGH ROLLER (1M BUY-IN)</span>: YOU NEED <span className="text-error font-bold">549,800 MORE SCRAP</span>. COMPLETE UNDERGROUND BOUNTIES OR JOIN MICRO STAKES.
                </p>
<div className="mt-space-xs flex gap-space-xs">
<button className="bg-surface-container-highest hover:bg-surface-bright text-primary px-space-sm py-0.5 font-label-sm text-label-sm uppercase shadow-[1px_1px_0px_#000000]" type="button">
                    DAILY REWARD (+50K)
                  </button>
</div>
</div>
</div>
</div>
{/* STATE PREVIEW 2: TABLE FULL / WAITLIST NOTICE */}
<div className="bg-surface-container-low p-space-md shadow-[4px_4px_0px_#000000] rotate-1 relative">
<div className="flex items-start gap-space-sm">
<div className="w-7 h-7 bg-surface-variant text-on-surface flex items-center justify-center font-headline-sm text-headline-sm shadow-[2px_2px_0px_#000000] shrink-0">#</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface uppercase">STATE: RUST BUCKET FULL</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  YOU ARE CURRENTLY IN <span className="text-primary font-bold">WAITLIST POSITION #3</span>. ESTIMATED SEAT CLEARANCE: ~4 MINUTES.
                </p>
<div className="mt-space-xs flex gap-space-xs">
<button className="bg-surface-container hover:bg-surface-variant text-secondary px-space-sm py-0.5 font-label-sm text-label-sm uppercase shadow-[1px_1px_0px_#000000]" type="button">
                    EXPLORE SIMILAR 6-MAX TABLES ➔
                  </button>
</div>
</div>
</div>
</div>
{/* STATE PREVIEW 3: JOINING DECK ANIMATED FEEDBACK */}
<div className="bg-primary-container p-space-md shadow-[4px_4px_0px_#000000] -rotate-1 relative">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-on-primary-container text-[28px] animate-spin">cyclone</span>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-primary-container uppercase tracking-wide">CONNECTING TO TABLE...</span>
<span className="font-label-sm text-label-sm text-on-primary-container/80 uppercase font-bold tracking-wider">ENTERING THE SCRAP YARD... SHUFFLING DECK</span>
</div>
</div>
</div>
</div>
</aside>
</div>
</div>
</div>
</main><footer className="w-full bg-surface-container-lowest border-t-[3px] border-surface-container-high py-space-lg"><div className="max-w-7xl mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider">SCRAP POKER CLUB</span><span className="font-body-sm text-body-sm text-on-surface-variant">EST. 2024 • UNDERGROUND HIGH-STAKES ENGINE</span></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant uppercase"><span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span><span>SERVER: LATENCY 18MS • TABLES SYNCED</span></div><span className="font-body-sm text-body-sm text-on-surface-variant">© SCRAP COLLECTIVE. CERTIFIED RNG.</span></div></div></footer>
    </div>
  );
};

export default TableBrowser;
