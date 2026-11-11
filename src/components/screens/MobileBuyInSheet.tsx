import React, { useState } from "react";

export type SheetTabState = "filters" | "buyin" | "alerts";

export type StakesFilterId = "all" | "micro" | "mid" | "high";
export type TableSizeFilterId = "hu" | "6max" | "9max";

export interface GhostLobbyRow {
  name: string;
  blinds: string;
  blindsBadgeClass: string;
  subtitle: string;
  rightTop: string;
  rightTopClass: string;
  rightBottom: string;
}

const DEFAULT_GHOST_ROWS: GhostLobbyRow[] = [
  {
    name: "Scrap Yard #07",
    blinds: "50/100",
    blindsBadgeClass: "bg-primary-container text-on-primary-container",
    subtitle: "Hold'em · 6-Max · Avg Pot: 1,420 SCRAP",
    rightTop: "5/6",
    rightTopClass: "text-secondary",
    rightBottom: "SEATS",
  },
  {
    name: "Rusty River #12",
    blinds: "100/200",
    blindsBadgeClass: "bg-surface-variant text-on-surface",
    subtitle: "Turbo · 9-Max · Avg Pot: 4,800 SCRAP",
    rightTop: "FULL",
    rightTopClass: "text-error",
    rightBottom: "WAIT: 2",
  },
  {
    name: "Neon Bunker #03",
    blinds: "25/50",
    blindsBadgeClass: "bg-primary-container text-on-primary-container",
    subtitle: "Casual · Heads-Up · Fast Fold",
    rightTop: "1/2",
    rightTopClass: "text-secondary",
    rightBottom: "SEATS",
  },
];

const STAKES_OPTIONS: {
  id: StakesFilterId;
  label: string;
  shortLabel: string;
  tiltClass: string;
}[] = [
  { id: "all", label: "All Stakes", shortLabel: "All Selected", tiltClass: "-rotate-0.5" },
  { id: "micro", label: "Micro (25/50)", shortLabel: "Micro Selected", tiltClass: "rotate-0.5" },
  {
    id: "mid",
    label: "Mid (50/100 - 100/200) ★",
    shortLabel: "Mid Selected",
    tiltClass: "-rotate-1",
  },
  { id: "high", label: "High (500/1000+)", shortLabel: "High Selected", tiltClass: "rotate-1" },
];

const TABLE_SIZE_OPTIONS: {
  id: TableSizeFilterId;
  label: string;
  tiltClass: string;
}[] = [
  { id: "hu", label: "2 Players (HU)", tiltClass: "-rotate-1" },
  { id: "6max", label: "6-Max [Active]", tiltClass: "rotate-0.5" },
  { id: "9max", label: "9-Max Full", tiltClass: "rotate-1" },
];

export interface MobileBuyInSheetProps {
  initialView?: SheetTabState;
  playerBalance?: string;
  playerBankrollFull?: string;
  tableName?: string;
  blindsText?: string;
  minBuyIn?: number;
  maxBuyIn?: number;
  initialBuyIn?: number;
  onBack?: () => void;
  onApplyFilters?: () => void;
  onConfirmJoin?: (buyInAmount: number, autoTopOff: boolean) => void;
}

export const MobileBuyInSheet: React.FC<MobileBuyInSheetProps> = ({
  initialView = "filters",
  playerBalance = "$4,850",
  playerBankrollFull = "450,200 SCRAP",
  tableName = "Scrap Yard #07",
  blindsText = "50 / 100",
  minBuyIn = 2000,
  maxBuyIn = 10000,
  initialBuyIn = 8000,
  onBack,
  onApplyFilters,
  onConfirmJoin,
}) => {
  const [activeView, setActiveView] = useState<SheetTabState>(initialView);
  const [selectedStakes, setSelectedStakes] = useState<StakesFilterId>("mid");
  const [selectedSize, setSelectedSize] = useState<TableSizeFilterId>("6max");
  const [turboOnly, setTurboOnly] = useState<boolean>(true);
  const [openSeatsOnly, setOpenSeatsOnly] = useState<boolean>(true);

  const [buyInAmount, setBuyInAmount] = useState<number>(initialBuyIn);
  const [autoTopOff, setAutoTopOff] = useState<boolean>(true);

  const activeStakesMeta =
    STAKES_OPTIONS.find((s) => s.id === selectedStakes) ?? STAKES_OPTIONS[2];

  const handleResetFilters = () => {
    setSelectedStakes("all");
    setSelectedSize("6max");
    setTurboOnly(false);
    setOpenSeatsOnly(false);
  };

  const handleConfirmJoin = () => {
    setActiveView("alerts");
    onConfirmJoin?.(buyInAmount, autoTopOff);
  };

  const tabBtnClass = (tab: SheetTabState) =>
    activeView === tab
      ? "px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-bold shadow-[2px_2px_0px_#000000] transition-transform active:translate-y-0.5 cursor-pointer"
      : "px-2.5 py-1 rounded bg-surface-variant text-on-surface font-label-sm text-label-sm uppercase font-bold shadow-[2px_2px_0px_#000000] transition-transform active:translate-y-0.5 cursor-pointer";

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-14 px-margin-mobile flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs min-w-0">
            <button
              aria-label="Back"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shrink-0 cursor-pointer"
              onClick={() => onBack?.()}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                arrow_back
              </span>
            </button>
            <h1 className="font-headline-sm text-headline-sm uppercase tracking-wide text-primary truncate">
              Buy In Confirmation
            </h1>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-full shadow-[2px_2px_0px_#000000]">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                token
              </span>
              <span className="font-label-md text-label-md text-primary">
                {playerBalance}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full pt-14 bg-surface">
        <div className="flex flex-col w-full relative pb-safe">
          {/* Demo Mode Switcher Bar (Toggles active drawer states) */}
          <div className="w-full bg-surface-container-high px-margin-mobile py-space-sm flex items-center justify-between gap-space-xs z-30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary-container text-[18px]">
                layers
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Sheet State:
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                className={tabBtnClass("filters")}
                id="btn-tab-filters"
                onClick={() => setActiveView("filters")}
                type="button"
              >
                Filters
              </button>
              <button
                className={tabBtnClass("buyin")}
                id="btn-tab-buyin"
                onClick={() => setActiveView("buyin")}
                type="button"
              >
                Buy-In
              </button>
              <button
                className={tabBtnClass("alerts")}
                id="btn-tab-alerts"
                onClick={() => setActiveView("alerts")}
                type="button"
              >
                Alerts
              </button>
            </div>
          </div>

          {/* Background Backdrop: Under-the-hood Poker Lobby View */}
          <div className="w-full px-margin-mobile pt-space-md space-y-space-md opacity-25 filter blur-[2px] pointer-events-none select-none">
            {DEFAULT_GHOST_ROWS.map((row) => (
              <div
                key={row.name}
                className="p-space-md bg-surface-container rounded-xl flex items-center justify-between shadow-[4px_4px_0px_#000000]"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-primary uppercase">
                      {row.name}
                    </span>
                    <span
                      className={`${row.blindsBadgeClass} px-1.5 py-0.5 rounded font-label-sm text-label-sm`}
                    >
                      {row.blinds}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {row.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`font-headline-sm text-headline-sm ${row.rightTopClass}`}
                  >
                    {row.rightTop}
                  </span>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">
                    {row.rightBottom}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cel-Shaded Halftone Stencil Background Texture Overlay */}
          <div className="fixed inset-0 bg-surface-container-lowest/80 pointer-events-none z-10 flex flex-col justify-end">
            <div className="w-full h-full opacity-10 bg-[radial-gradient(#e5e1e4_1.5px,transparent_1.5px)] [background-size:12px_12px]"></div>
          </div>

          {/* ========================================================================= */}
          {/* 1. FILTER BOTTOM SHEET SECTION */}
          {/* ========================================================================= */}
          {activeView === "filters" && (
            <section className="relative z-20 w-full flex flex-col mt-4" id="view-filters">
              <div className="w-full bg-surface-container-low rounded-t-xl px-margin-mobile pt-space-sm pb-space-lg shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
                {/* Comic Yellow Grabber Bar */}
                <div className="flex justify-center mb-space-sm">
                  <div className="w-14 h-2 bg-primary-container rounded-full shadow-[2px_2px_0px_#000000]"></div>
                </div>

                {/* Sheet Header */}
                <div className="flex items-center justify-between pb-space-md">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-3 h-6 bg-primary-container -rotate-6 shadow-[2px_2px_0px_#000000]"></div>
                    <h2 className="font-headline-md text-headline-md uppercase tracking-wider text-primary">
                      Table Filters
                    </h2>
                  </div>
                  <div className="flex items-center gap-space-md">
                    <button
                      className="font-label-md text-label-md uppercase tracking-wider text-outline hover:text-primary transition-colors underline decoration-2 underline-offset-4 cursor-pointer"
                      onClick={handleResetFilters}
                      type="button"
                    >
                      Reset All
                    </button>
                    <button
                      aria-label="Close sheet"
                      className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                      onClick={() => setActiveView("buyin")}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        close
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-space-lg">
                  {/* Section 1: Stakes Filter */}
                  <div className="space-y-space-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        Stakes Level
                      </label>
                      <span className="font-label-sm text-label-sm text-primary uppercase">
                        {activeStakesMeta.shortLabel}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-space-xs">
                      {STAKES_OPTIONS.map((opt) => {
                        const isActive = selectedStakes === opt.id;
                        return (
                          <button
                            key={opt.id}
                            className={`filter-pill p-2 rounded font-label-md text-label-md uppercase text-center active:translate-y-0.5 transition-all cursor-pointer ${
                              isActive
                                ? `active-pill bg-primary-container text-on-primary-container font-bold shadow-[3px_3px_0px_#000000] ${opt.tiltClass}`
                                : `bg-surface-container text-on-surface-variant shadow-[2px_2px_0px_#000000] ${opt.tiltClass}`
                            }`}
                            onClick={() => setSelectedStakes(opt.id)}
                            type="button"
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Buy-In Range Dual Range Slider */}
                  <div className="space-y-space-xs bg-surface-container p-space-md rounded-xl shadow-[3px_3px_0px_#000000]">
                    <div className="flex items-center justify-between">
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
                        Buy-In Range
                      </label>
                      <span className="bg-surface-container-highest px-2 py-0.5 rounded font-label-md text-label-md text-primary-container tracking-wide shadow-[1px_1px_0px_#000000]">
                        2,000 - 20,000 SCRAP
                      </span>
                    </div>
                    <div className="pt-3 pb-2 px-1 relative flex items-center">
                      <div className="w-full h-3 bg-surface-container-lowest rounded-full relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                        <div className="absolute left-[15%] right-[25%] h-full bg-primary-container"></div>
                      </div>
                      <div className="absolute left-[15%] -translate-x-1/2 w-6 h-6 bg-primary rounded shadow-[2px_2px_0px_#000000] -rotate-12 flex items-center justify-center cursor-pointer">
                        <div className="w-2 h-2 bg-on-primary rounded-full"></div>
                      </div>
                      <div className="absolute right-[25%] translate-x-1/2 w-6 h-6 bg-primary-container rounded shadow-[2px_2px_0px_#000000] rotate-12 flex items-center justify-center cursor-pointer">
                        <div className="w-2 h-2 bg-on-primary-container rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between font-label-sm text-label-sm text-outline uppercase pt-1">
                      <span>Min: 1,000</span>
                      <span>Max: 200,000</span>
                    </div>
                  </div>

                  {/* Section 3: Table Size */}
                  <div className="space-y-space-xs">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                      Table Max Size
                    </label>
                    <div className="grid grid-cols-3 gap-space-xs">
                      {TABLE_SIZE_OPTIONS.map((opt) => {
                        const isActive = selectedSize === opt.id;
                        return (
                          <button
                            key={opt.id}
                            className={`p-2 rounded font-label-md text-label-md uppercase text-center cursor-pointer ${
                              isActive
                                ? `bg-secondary-container text-on-secondary-container font-bold shadow-[3px_3px_0px_#000000] ${opt.tiltClass}`
                                : `bg-surface-container text-on-surface-variant shadow-[2px_2px_0px_#000000] ${opt.tiltClass}`
                            }`}
                            onClick={() => setSelectedSize(opt.id)}
                            type="button"
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Speed & Rules Toggles */}
                  <div className="space-y-2 pt-1">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                      Speed & Availability
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg cursor-pointer shadow-[2px_2px_0px_#000000]">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[20px]">
                            bolt
                          </span>
                          <span className="font-label-md text-label-md text-on-surface uppercase">
                            Turbo Tables Only (12s Action)
                          </span>
                        </span>
                        <input
                          checked={turboOnly}
                          className="w-5 h-5 accent-primary-container rounded cursor-pointer"
                          onChange={(e) => setTurboOnly(e.target.checked)}
                          type="checkbox"
                        />
                      </label>

                      <label className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg cursor-pointer shadow-[2px_2px_0px_#000000]">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary-container text-[20px]">
                            event_seat
                          </span>
                          <span className="font-label-md text-label-md text-on-surface uppercase">
                            Open Seats Only (Hide Full)
                          </span>
                        </span>
                        <input
                          checked={openSeatsOnly}
                          className="w-5 h-5 accent-primary-container rounded cursor-pointer"
                          onChange={(e) => setOpenSeatsOnly(e.target.checked)}
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Action Bar: Apply Filters */}
                  <div className="pt-2">
                    <button
                      className="w-full h-[52px] bg-primary-container text-on-primary-container rounded-xl font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 -rotate-0.5 hover:rotate-0 transition-transform cursor-pointer"
                      onClick={() => {
                        setActiveView("buyin");
                        onApplyFilters?.();
                      }}
                      type="button"
                    >
                      <span>Apply Filters (8 Tables)</span>
                      <span className="material-symbols-outlined text-[24px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 2. JOIN TABLE & BUY-IN CONFIRMATION MODAL PREVIEW */}
          {/* ========================================================================= */}
          {activeView === "buyin" && (
            <section className="relative z-20 w-full flex flex-col mt-4" id="view-buyin">
              <div className="w-full bg-surface-container-high rounded-t-xl px-margin-mobile pt-space-sm pb-space-lg shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
                {/* Comic Grabber */}
                <div className="flex justify-center mb-space-sm">
                  <div className="w-14 h-2 bg-secondary rounded-full shadow-[2px_2px_0px_#000000]"></div>
                </div>

                {/* Header & Table Info Strip */}
                <div className="flex items-center justify-between pb-space-sm">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                      Joining Cash Game
                    </span>
                    <h2 className="font-headline-md text-headline-md uppercase text-primary">
                      {tableName}
                    </h2>
                  </div>
                  <div className="bg-surface-container px-space-sm py-1 rounded text-right shadow-[2px_2px_0px_#000000]">
                    <span className="font-label-sm text-label-sm text-outline block uppercase">
                      Blinds
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary-container">
                      {blindsText}
                    </span>
                  </div>
                </div>

                {/* Bankroll Card */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl flex items-center justify-between my-space-sm shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-[2px_2px_0px_#000000] -rotate-6">
                      <span className="material-symbols-outlined text-on-primary-container text-[22px]">
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block">
                        Player Bankroll
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary">
                        {playerBankrollFull}
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-variant px-2 py-1 rounded font-label-sm text-label-sm text-secondary uppercase font-bold">
                    Safe Balance
                  </div>
                </div>

                {/* Buy-in Stepper & Amount Gauge */}
                <div className="bg-surface-container p-space-md rounded-xl space-y-space-md shadow-[4px_4px_0px_#000000] -rotate-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                      Selected Buy-In
                    </span>
                    <div className="text-right">
                      <span
                        className="font-headline-md text-headline-md text-primary-container"
                        id="buyin-label"
                      >
                        {buyInAmount.toLocaleString()} SCRAP
                      </span>
                      <span
                        className="block font-label-sm text-label-sm text-outline uppercase font-semibold"
                        id="bb-label"
                      >
                        {Math.floor(buyInAmount / 100)} Big Blinds
                      </span>
                    </div>
                  </div>

                  {/* Slider Bar Visual */}
                  <div className="space-y-1">
                    <input
                      className="w-full accent-primary-container h-3 bg-surface-container-lowest rounded-full cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                      id="buyin-range"
                      max={maxBuyIn}
                      min={minBuyIn}
                      onChange={(e) => setBuyInAmount(Number(e.target.value))}
                      step={500}
                      type="range"
                      value={buyInAmount}
                    />
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant uppercase">
                      <span>Min: 2,000 (20 BB)</span>
                      <span>Max: 10,000 (100 BB)</span>
                    </div>
                  </div>

                  {/* Preset Stepper Buttons */}
                  <div className="grid grid-cols-3 gap-space-xs pt-1">
                    {[
                      { label: "Min 2K", value: 2000 },
                      { label: "Med 5K", value: 5000 },
                      { label: "Max 10K", value: 10000 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        className="py-1.5 rounded bg-surface-variant text-on-surface font-label-md text-label-md uppercase text-center shadow-[2px_2px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                        onClick={() => setBuyInAmount(preset.value)}
                        type="button"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-Rebuy Checkbox */}
                <div className="py-space-md">
                  <label className="flex items-center gap-space-sm p-space-sm bg-surface-container rounded-lg cursor-pointer">
                    <input
                      checked={autoTopOff}
                      className="w-5 h-5 accent-secondary rounded cursor-pointer"
                      onChange={(e) => setAutoTopOff(e.target.checked)}
                      type="checkbox"
                    />
                    <span className="font-label-md text-label-md uppercase text-on-surface">
                      Auto Top-Off when stack falls below 50 BB
                    </span>
                  </label>
                </div>

                {/* Action Confirmation CTA */}
                <div className="space-y-space-xs">
                  <button
                    className="w-full h-[52px] bg-primary-container text-on-primary-container rounded-xl font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 rotate-0.5 hover:rotate-0 transition-transform cursor-pointer"
                    onClick={handleConfirmJoin}
                    type="button"
                  >
                    <span>Confirm & Join Table #07</span>
                    <span className="material-symbols-outlined text-[24px]">
                      sports_esports
                    </span>
                  </button>
                  <button
                    className="w-full py-2 text-center font-label-md text-label-md uppercase text-outline hover:text-on-surface transition-colors cursor-pointer"
                    onClick={() => setActiveView("filters")}
                    type="button"
                  >
                    Cancel & Return to List
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 3. STATE CALLOUTS SECTION */}
          {/* ========================================================================= */}
          {activeView === "alerts" && (
            <section
              className="relative z-20 w-full flex flex-col mt-4 space-y-space-md px-margin-mobile pb-space-lg"
              id="view-alerts"
            >
              {/* Sub-header */}
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-error text-[24px]">
                  notification_important
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary uppercase">
                  Edge Case Callouts
                </h3>
              </div>

              {/* Alert 1: Insufficient Chips Warning */}
              <div className="bg-surface-container-high rounded-xl p-space-md shadow-[4px_4px_0px_#000000] -rotate-1 relative overflow-hidden">
                <div className="flex items-center gap-space-xs mb-2">
                  <div className="px-2 py-0.5 bg-error text-on-error rounded font-label-md text-label-md uppercase font-bold shadow-[2px_2px_0px_#000000]">
                    Insufficient Scrap!
                  </div>
                  <span className="font-label-sm text-label-sm text-error uppercase font-semibold">
                    Min Buy-In: 50,000
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mb-space-md">
                  You need 50,000 SCRAP to seat here. Your current balance is{" "}
                  <strong className="text-primary">12,400 SCRAP</strong>. Free game
                  balance — claim your daily allowance or filter for micro stakes!
                </p>
                <div className="grid grid-cols-2 gap-space-xs">
                  <button
                    className="py-2 px-3 rounded bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold shadow-[2px_2px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                    type="button"
                  >
                    Claim Bonus (+25K)
                  </button>
                  <button
                    className="py-2 px-3 rounded bg-surface-variant text-on-surface font-label-md text-label-md uppercase font-bold shadow-[2px_2px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                    onClick={() => setActiveView("filters")}
                    type="button"
                  >
                    Play Micro Tables
                  </button>
                </div>
              </div>

              {/* Alert 2: Table Full State */}
              <div className="bg-surface-container rounded-xl p-space-md shadow-[4px_4px_0px_#000000] rotate-0.5 relative">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase text-outline">
                      Table Status
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-primary uppercase">
                      Rusty River #09 (6/6)
                    </h4>
                  </div>
                  <div className="bg-error text-on-error px-2 py-0.5 rounded font-label-md text-label-md uppercase font-bold shadow-[2px_2px_0px_#000000] -rotate-3">
                    Table Full
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between mb-space-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Queue: 2 Players Waiting ahead
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                    ~1.5 min wait
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <button
                    className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary font-headline-sm text-headline-sm uppercase shadow-[3px_3px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                    type="button"
                  >
                    Join Waitlist (#3 in line)
                  </button>
                  <button
                    className="w-full py-2 rounded-lg bg-surface-variant text-on-surface font-label-md text-label-md uppercase shadow-[2px_2px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                    type="button"
                  >
                    Auto-Seat Next Open Table
                  </button>
                </div>
              </div>

              {/* Alert 3: Comic Connecting / Card Shuffle Modal */}
              <div
                className="bg-primary-container text-on-primary-container rounded-xl p-space-md shadow-[5px_5px_0px_#000000] -rotate-1 relative"
                id="connecting-card"
              >
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 bg-surface-container-lowest rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#000000] rotate-6 shrink-0 relative overflow-hidden">
                    <span className="material-symbols-outlined text-primary-container text-[32px] animate-spin">
                      cyclone
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container font-black">
                      Live Transition
                    </span>
                    <h4 className="font-headline-sm text-headline-sm uppercase tracking-wide">
                      Entering The Scrap Yard...
                    </h4>
                    <p className="font-body-sm text-body-sm font-bold opacity-90">
                      Dealing you in at Seat #4! Get ready!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

