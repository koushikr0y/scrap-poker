import React, { useMemo, useRef, useState } from "react";

export type OccupancyPipColor = "yellow" | "cyan" | "outline" | "empty" | "ping";

export interface TableBadgeSpec {
  label: string;
  icon?: string;
  className: string;
}

export interface MobileCashTableEntry {
  id: string;
  name: string;
  icon: string;
  iconColorClass: string;
  stakesSortValue: number;
  blindsText: string;
  blindsBoxClass: string;
  blindsLabelClass: string;
  blindsValueClass: string;
  buyInText: string;
  avgPotText: string;
  avgPotColorClass: string;
  ribbon?: {
    label: string;
    className: string;
  };
  badges: TableBadgeSpec[];
  pips: OccupancyPipColor[];
  isWaitlist?: boolean;
  ctaLabel: string;
  cardOpacityClass?: string;
  titleColorClass?: string;
}

export const DEFAULT_MOBILE_TABLES: MobileCashTableEntry[] = [
  {
    id: "scrap-yard-07",
    name: "SCRAP YARD #07",
    icon: "hardware",
    iconColorClass: "text-secondary",
    stakesSortValue: 100,
    blindsText: "50 / 100",
    blindsBoxClass: "bg-primary-container text-on-primary-container rotate-1",
    blindsLabelClass: "opacity-80",
    blindsValueClass: "",
    buyInText: "2,000 – 10,000",
    avgPotText: "14,200 SCRAP",
    avgPotColorClass: "text-primary-fixed-dim",
    ribbon: {
      label: "RECOMMENDED ★",
      className:
        "bg-primary-container text-on-primary-container rotate-2",
    },
    badges: [
      {
        label: "TURBO",
        icon: "bolt",
        className:
          "bg-error-container text-on-error-container -rotate-1 flex items-center gap-0.5",
      },
      {
        label: "5/6 SEATS (1 SEAT LEFT!)",
        className:
          "bg-secondary-container text-on-secondary-container rotate-1",
      },
    ],
    pips: ["yellow", "yellow", "cyan", "yellow", "cyan", "ping"],
    ctaLabel: "JOIN TABLE",
  },
  {
    id: "bolt-runner-12",
    name: "BOLT RUNNER #12",
    icon: "electric_bolt",
    iconColorClass: "text-primary-container",
    stakesSortValue: 200,
    blindsText: "100 / 200",
    blindsBoxClass: "bg-surface-container-high text-on-surface",
    blindsLabelClass: "opacity-70",
    blindsValueClass: "text-primary",
    buyInText: "5,000 – 20,000",
    avgPotText: "28,600 SCRAP",
    avgPotColorClass: "text-secondary",
    badges: [
      {
        label: "OPEN SEATS",
        className: "bg-surface-container-high text-secondary",
      },
      {
        label: "4/6 SEATS",
        className: "bg-surface-container-highest text-on-surface",
      },
    ],
    pips: ["yellow", "cyan", "yellow", "cyan", "empty", "empty"],
    ctaLabel: "JOIN TABLE",
  },
  {
    id: "neon-alley-03",
    name: "NEON ALLEY #03",
    icon: "nightlife",
    iconColorClass: "text-secondary",
    stakesSortValue: 50,
    blindsText: "25 / 50",
    blindsBoxClass: "bg-surface-container-high text-on-surface",
    blindsLabelClass: "opacity-70",
    blindsValueClass: "text-secondary",
    buyInText: "1,000 – 5,000",
    avgPotText: "6,400 SCRAP",
    avgPotColorClass: "text-on-surface-variant",
    badges: [
      {
        label: "MICRO STAKES",
        className: "bg-secondary text-on-secondary rotate-1",
      },
      {
        label: "CASUAL · 3/6 SEATS",
        className: "bg-surface-container-highest text-on-surface-variant",
      },
    ],
    pips: ["cyan", "cyan", "cyan", "empty", "empty", "empty"],
    ctaLabel: "JOIN TABLE",
  },
  {
    id: "rust-bucket-09",
    name: "RUST BUCKET #09",
    icon: "token",
    iconColorClass: "text-outline",
    stakesSortValue: 400,
    blindsText: "200 / 400",
    blindsBoxClass: "bg-surface-container-high text-on-surface",
    blindsLabelClass: "opacity-70",
    blindsValueClass: "text-on-surface",
    buyInText: "10,000 – 40,000",
    avgPotText: "52,100 SCRAP",
    avgPotColorClass: "text-on-surface",
    badges: [
      {
        label: "TABLE FULL (6/6)",
        className: "bg-error-container text-on-error-container -rotate-1",
      },
    ],
    pips: ["outline", "outline", "outline", "outline", "outline", "outline"],
    isWaitlist: true,
    ctaLabel: "JOIN WAITLIST (POS #2)",
    cardOpacityClass: "opacity-95",
    titleColorClass: "text-on-surface",
  },
  {
    id: "cyber-den-15",
    name: "CYBER DEN #15",
    icon: "diamond",
    iconColorClass: "text-primary-container",
    stakesSortValue: 1000,
    blindsText: "500 / 1K",
    blindsBoxClass: "bg-surface-container-high text-on-surface",
    blindsLabelClass: "opacity-70",
    blindsValueClass: "text-primary-container",
    buyInText: "40K – 200,000",
    avgPotText: "184,000 SCRAP",
    avgPotColorClass: "text-primary-container",
    ribbon: {
      label: "VIP HIGH ROLLER",
      className:
        "bg-secondary-container text-on-secondary-container -rotate-1",
    },
    badges: [
      {
        label: "VIP ROOM",
        className: "bg-primary-container text-on-primary-container",
      },
      {
        label: "5/6 SEATS",
        className: "bg-surface-container-highest text-on-surface",
      },
    ],
    pips: ["yellow", "yellow", "yellow", "yellow", "yellow", "empty"],
    ctaLabel: "JOIN TABLE",
  },
];

export interface MobileTableBrowserProps {
  tables?: MobileCashTableEntry[];
  playerBalance?: string;
  activeFilterCount?: number;
  onBackToLobby?: () => void;
  onJoinTable?: (tableId: string) => void;
  onOpenFilters?: () => void;
}

const PIP_COLOR_CLASSES: Record<Exclude<OccupancyPipColor, "ping">, string> = {
  yellow: "bg-primary-container",
  cyan: "bg-secondary",
  outline: "bg-outline",
  empty: "bg-surface-container-highest",
};

export const MobileTableBrowser: React.FC<MobileTableBrowserProps> = ({
  tables = DEFAULT_MOBILE_TABLES,
  playerBalance = "$4,850",
  activeFilterCount = 2,
  onBackToLobby,
  onJoinTable,
  onOpenFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"default" | "asc" | "desc">("default");
  const [showJoinToast, setShowJoinToast] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const triggerJoinToast = (tableId: string) => {
    setShowJoinToast(true);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setShowJoinToast(false);
    }, 1600);
    if (onJoinTable) {
      onJoinTable(tableId);
    }
  };

  const handleToggleSort = () => {
    // Matches initial label "SORT: STAKES ↓" in Stitch draft: first click sorts ascending, then toggles
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const displayedTables = useMemo(() => {
    const query = searchQuery.trim().toUpperCase();
    const filtered = query
      ? tables.filter((t) => t.name.toUpperCase().includes(query))
      : tables;

    if (sortDirection === "default") {
      return filtered;
    }

    return [...filtered].sort((a, b) =>
      sortDirection === "desc"
        ? b.stakesSortValue - a.stakesSortValue
        : a.stakesSortValue - b.stakesSortValue
    );
  }, [tables, searchQuery, sortDirection]);

  const sortLabel = sortDirection === "asc" ? "SORT: STAKES ↑" : "SORT: STAKES ↓";

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased">
      {/* Top Sticky Mobile Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-14 px-margin-mobile flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs min-w-0">
            <button
              aria-label="Back"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-on-surface hover:text-primary-container transition-colors shrink-0 cursor-pointer"
              onClick={() => onBackToLobby?.()}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                arrow_back
              </span>
            </button>
            <h1 className="font-headline-sm text-headline-sm uppercase tracking-wide text-primary truncate">
              Cash Tables
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full pt-14 bg-surface">
        <div className="flex flex-col w-full px-margin-mobile pb-safe space-y-space-md">
          {/* Interactive Halftone Top Ticker / Meta Bar */}
          <div className="relative w-full bg-surface-container-high rounded p-space-sm shadow-[4px_4px_0px_#000000] -rotate-1 transform mt-space-xs">
            <div className="flex items-center justify-between gap-space-xs">
              <div className="flex items-center gap-space-xs min-w-0">
                <span className="w-3 h-3 rounded-full bg-primary-container inline-block shadow-[1px_1px_0px_#000000] animate-pulse shrink-0"></span>
                <span className="font-headline-sm text-headline-sm uppercase text-primary truncate tracking-wider">
                  CASH ROTATION
                </span>
              </div>
              <div className="bg-error-container text-tertiary px-space-xs py-0.5 rounded shadow-[2px_2px_0px_#000000] shrink-0 rotate-1">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-error-container">
                  HOT ACTION
                </span>
              </div>
            </div>
          </div>

          {/* Comic Filter & Search Deck */}
          <div className="w-full flex flex-col space-y-space-xs">
            {/* Search Bar with Paper/Ink Aesthetic */}
            <div className="relative w-full shadow-[4px_4px_0px_#000000]">
              <input
                ref={searchInputRef}
                className="w-full bg-surface-container-highest text-on-surface placeholder:text-outline font-label-lg text-label-lg uppercase px-space-md py-0.5 rounded pl-10 focus:outline-none focus:bg-surface-bright transition-colors"
                id="tableSearchInput"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH TABLE..."
                type="text"
                value={searchQuery}
              />
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-primary-container text-[20px] pointer-events-none">
                search
              </span>
              {searchQuery.trim().length > 0 && (
                <button
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary min-w-[28px] min-h-[28px] flex items-center justify-center font-headline-sm text-headline-sm cursor-pointer"
                  id="clearSearchBtn"
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  type="button"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filter & Sort Pill Strip */}
            <div className="flex items-center justify-between gap-space-xs pt-space-xs">
              {/* Active Filters Pill with Badge */}
              <button
                className="flex-1 bg-surface-container-high hover:bg-surface-bright active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000] text-on-surface px-space-sm py-2 rounded shadow-[3px_3px_0px_#000000] flex items-center justify-between gap-1 transition-transform cursor-pointer"
                id="filterTriggerBtn"
                onClick={() => onOpenFilters?.()}
                type="button"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    tune
                  </span>
                  <span className="font-label-md text-label-md uppercase tracking-wider truncate">
                    FILTERS
                  </span>
                </div>
                <span className="bg-primary-container text-on-primary-container px-1.5 py-0.5 rounded-full font-label-sm text-label-sm shadow-[1px_1px_0px_#000000] leading-none">
                  {activeFilterCount} ACTIVE
                </span>
              </button>

              {/* Sort Pill */}
              <button
                className="flex-1 bg-surface-container-high hover:bg-surface-bright active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000] text-on-surface px-space-sm py-2 rounded shadow-[3px_3px_0px_#000000] flex items-center justify-center gap-1 transition-transform cursor-pointer"
                id="sortOrderBtn"
                onClick={handleToggleSort}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-primary-container">
                  swap_vert
                </span>
                <span
                  className="font-label-md text-label-md uppercase tracking-wider truncate"
                  id="sortLabelText"
                >
                  {sortLabel}
                </span>
              </button>
            </div>
          </div>

          {/* Table Cards Vertical Feed */}
          <div className="flex flex-col space-y-space-md w-full" id="tableListContainer">
            {displayedTables.map((table) => (
              <div
                key={table.id}
                className={`table-card relative w-full bg-surface-container rounded p-space-md shadow-[4px_4px_0px_#000000] transform hover:-translate-y-0.5 transition-transform ${
                  table.cardOpacityClass ?? ""
                }`}
                data-stakes={table.stakesSortValue}
                data-table-name={table.name}
              >
                {/* Optional Comic Corner Ribbon */}
                {table.ribbon && (
                  <div
                    className={`absolute -top-2.5 right-3 font-headline-sm text-headline-sm leading-none uppercase px-space-sm py-1 shadow-[2px_2px_0px_#000000] z-10 ${table.ribbon.className}`}
                  >
                    {table.ribbon.label}
                  </div>
                )}

                {/* Header row: Title & Blinds Badge */}
                <div
                  className={`flex items-start justify-between gap-space-xs ${
                    table.ribbon ? "pt-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`material-symbols-outlined ${table.iconColorClass} text-[20px]`}
                      >
                        {table.icon}
                      </span>
                      <h2
                        className={`font-headline-md text-headline-md ${
                          table.titleColorClass ?? "text-primary"
                        } uppercase tracking-wide`}
                      >
                        {table.name}
                      </h2>
                    </div>

                    {/* Badges Strip */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {table.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`font-label-sm text-label-sm uppercase px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000000] ${badge.className}`}
                        >
                          {badge.icon && (
                            <span className="material-symbols-outlined text-[13px]">
                              {badge.icon}
                            </span>
                          )}
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`px-space-sm py-1 rounded shadow-[2px_2px_0px_#000000] shrink-0 text-right ${table.blindsBoxClass}`}
                  >
                    <span
                      className={`font-label-sm text-label-sm block uppercase leading-none ${table.blindsLabelClass}`}
                    >
                      BLINDS
                    </span>
                    <span
                      className={`font-headline-sm text-headline-sm uppercase leading-none ${table.blindsValueClass}`}
                    >
                      {table.blindsText}
                    </span>
                  </div>
                </div>

                {/* Middle Info Grid */}
                <div className="bg-surface-container-low rounded p-space-sm my-space-sm shadow-[2px_2px_0px_#000000] grid grid-cols-2 gap-space-xs">
                  <div>
                    <span className="font-label-sm text-label-sm text-outline uppercase block">
                      BUY-IN
                    </span>
                    <span className="font-body-lg text-body-lg text-on-surface">
                      {table.buyInText}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-label-sm text-outline uppercase block">
                      AVG POT
                    </span>
                    <span
                      className={`font-body-lg text-body-lg ${table.avgPotColorClass}`}
                    >
                      {table.avgPotText}
                    </span>
                  </div>
                </div>

                {/* Player Pips Indicator */}
                <div className="flex items-center justify-between mb-space-sm px-0.5">
                  <span className="font-label-sm text-label-sm text-outline uppercase">
                    FELT OCCUPANCY
                  </span>
                  <div className="flex items-center gap-1.5">
                    {table.pips.map((pip, idx) =>
                      pip === "ping" ? (
                        <div
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full bg-surface-container-highest shadow-[1px_1px_0px_#000000] flex items-center justify-center"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-ping"></span>
                        </div>
                      ) : (
                        <div
                          key={idx}
                          className={`w-3.5 h-3.5 rounded-full ${PIP_COLOR_CLASSES[pip]} shadow-[1px_1px_0px_#000000]`}
                        ></div>
                      )
                    )}
                  </div>
                </div>

                {/* Primary Action CTA */}
                {table.isWaitlist ? (
                  <button
                    className="join-btn w-full h-[50px] bg-surface-container-highest hover:bg-surface-bright active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000] text-primary font-headline-sm text-headline-sm uppercase tracking-wider rounded shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-space-xs transition-transform cursor-pointer"
                    onClick={() => triggerJoinToast(table.id)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary-container">
                      hourglass_top
                    </span>
                    <span>{table.ctaLabel}</span>
                  </button>
                ) : (
                  <button
                    className="join-btn w-full h-[50px] bg-primary-container hover:bg-surface-tint active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_#000000] text-on-primary-container font-headline-md text-headline-md uppercase tracking-wider rounded shadow-[4px_4px_0px_#000000] -rotate-0.5 flex items-center justify-center gap-space-xs transition-transform cursor-pointer"
                    onClick={() => triggerJoinToast(table.id)}
                    type="button"
                  >
                    <span>{table.ctaLabel}</span>
                    <span className="material-symbols-outlined text-[24px]">
                      arrow_forward
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Floating Ticker Quick Bar (Thumb safe) */}
          <div className="sticky bottom-2 z-30 w-full mt-space-sm">
            <div className="bg-surface-container-highest/95 backdrop-blur-md rounded px-space-md py-2.5 shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-space-xs rotate-0.5">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                <span className="font-label-md text-label-md text-primary uppercase tracking-wide truncate">
                  14 TABLES ACTIVE · 88 PLAYERS ON FELT
                </span>
              </div>
              <button
                className="bg-secondary-container hover:bg-secondary text-on-secondary-container px-space-sm py-1 rounded shadow-[2px_2px_0px_#000000] font-headline-sm text-headline-sm uppercase tracking-wider shrink-0 active:translate-y-0.5 cursor-pointer"
                id="quickSitBtn"
                onClick={() => triggerJoinToast("scrap-yard-07")}
                type="button"
              >
                FAST SIT ⚡
              </button>
            </div>
          </div>

          {/* Micro-Toast Alert for Seat Joining */}
          <div
            className={`fixed bottom-16 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-space-md py-space-xs rounded shadow-[4px_4px_0px_#000000] -rotate-1 font-headline-sm text-headline-sm uppercase z-50 pointer-events-none transition-opacity duration-200 ${
              showJoinToast ? "opacity-100" : "opacity-0"
            }`}
            id="joinToast"
          >
            CONNECTING TO FELT...
          </div>
        </div>
      </main>
    </div>
  );
};
