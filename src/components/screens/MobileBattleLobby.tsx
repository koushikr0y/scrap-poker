import React, { useState } from "react";

export interface MobileBattleLobbyProps {
  onNavigateToTable?: () => void;
  onNavigateToCashBrowser?: () => void;
  onNavigateToRankings?: () => void;
  onNavigateToProfile?: () => void;
}

export const MobileBattleLobby: React.FC<MobileBattleLobbyProps> = ({
  onNavigateToTable,
  onNavigateToCashBrowser,
  onNavigateToRankings,
}) => {
  const [rewardClaimed, setRewardClaimed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"home" | "play" | "hands" | "profile">("home");

  const handleClaimReward = () => {
    setRewardClaimed(true);
  };

  return (
    <div className="bg-background font-body-md text-on-surface flex flex-col min-h-screen select-none">
      {/* Mobile Sticky Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
        <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <div className="flex flex-col -rotate-1">
              <span className="font-display-lg-mobile text-[17px] leading-none text-primary-container tracking-wider uppercase drop-shadow-[1px_1px_0px_#000]">
                SCRAP
              </span>
              <span className="font-headline-sm text-[12px] leading-none text-on-surface tracking-widest uppercase">
                POKER
              </span>
            </div>
            <div className="flex items-center justify-center bg-surface-container-high px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000000]">
              <span className="font-label-sm text-label-sm text-primary-fixed uppercase">
                LVL 24
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1 rounded shadow-[2px_2px_0px_#000000]">
            <span className="material-symbols-outlined text-primary-container text-[18px]">
              toll
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-headline-sm text-headline-sm text-primary-container leading-none tracking-tight">
                450,200
              </span>
              <span className="font-label-sm text-[9px] text-on-surface-variant uppercase tracking-wider">
                SCRAP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Sound Settings"
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary-container active:translate-y-0.5 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                volume_up
              </span>
            </button>
            <button
              aria-label="Settings Menu"
              className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary-container active:translate-y-0.5 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                settings
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[1px_1px_0px_#000000]">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full px-gutter-mobile gap-space-md select-none pb-4">
          {/* TOP PLAYER STATUS BANNER */}
          <section className="flex flex-col bg-surface-container p-space-sm rounded shadow-[4px_4px_0px_#000000] relative overflow-hidden -rotate-[0.5deg]">
            <div
              className="absolute -right-6 -bottom-6 w-24 h-24 bg-surface-container-highest/40 rounded-full pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#4d4633 1.5px, transparent 1.5px)",
                backgroundSize: "6px 6px",
              }}
            ></div>
            <div className="flex items-center justify-between gap-space-sm relative z-10">
              {/* Avatar & Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-container rounded flex items-center justify-center shadow-[2px_2px_0px_#000000] rotate-[-2deg]">
                    <span
                      className="material-symbols-outlined text-on-primary-container text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest text-primary-fixed font-label-sm text-label-sm px-1 py-0.2 rounded shadow-[1px_1px_0px_#000000]">
                    24
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide truncate">
                      BOLT_RUNNER_99
                    </span>
                    <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_#73d1ff] flex-shrink-0"></span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest truncate">
                    LVL 24 SCRAP RUNNER
                  </span>
                </div>
              </div>
              {/* Quick Rebuy Action */}
              <button
                className="flex-shrink-0 flex items-center justify-center gap-1 bg-secondary-container text-on-secondary px-2.5 h-10 rounded shadow-[3px_3px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000] transition-all rotate-[1deg] cursor-pointer"
                id="rebuyBtn"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add_circle
                </span>
                <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-white">
                  REBUY
                </span>
              </button>
            </div>
            {/* Live Session Mini-Strip */}
            <div className="mt-2 pt-2 flex items-center justify-between bg-surface-container-lowest/80 px-2.5 py-1.5 rounded shadow-[inset_1px_1px_0px_#000000]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-[16px]">
                  toll
                </span>
                <span className="font-headline-sm text-headline-sm text-primary-container tracking-tight">
                  450,200
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">
                  SCRAP CHIPS
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-high px-1.5 py-0.5 rounded text-[11px] font-label-sm text-secondary">
                <span className="material-symbols-outlined text-[13px]">
                  military_tech
                </span>
                <span>RANK: GOLD II</span>
              </div>
            </div>
          </section>

          {/* HERO "PLAY NOW" COMIC CTA */}
          <section className="relative bg-primary-container text-on-primary rounded p-4 shadow-[5px_5px_0px_#000000] overflow-hidden rotate-[-1deg]">
            <div
              className="absolute -right-4 -top-8 w-44 h-44 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(#000000 2px, transparent 2px)",
                backgroundSize: "8px 8px",
              }}
            ></div>
            <div className="inline-flex items-center gap-1 bg-on-tertiary-container text-tertiary font-headline-sm text-headline-sm px-2.5 py-0.5 rounded shadow-[2px_2px_0px_#000000] -rotate-2 uppercase mb-2">
              <span className="material-symbols-outlined text-[16px]">
                local_fire_department
              </span>
              <span>BAM! FAST SEATING</span>
            </div>
            <div className="flex flex-col relative z-10 mb-3">
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-primary leading-none uppercase tracking-tight drop-shadow-[2px_2px_0px_#fff0c6]">
                QUICK PLAY NOW!
              </h2>
              <p className="font-body-md text-body-md text-on-primary font-bold tracking-wide mt-1 uppercase">
                INSTANT SEAT: HIGH STAKES 500 / 1,000 NLHE
              </p>
            </div>
            {/* Quick Play Tap Button */}
            <button
              className="w-full h-14 bg-surface-container-lowest text-primary-container rounded flex items-center justify-between px-4 shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
              id="quickPlayBtn"
              onClick={() => onNavigateToTable?.()}
              type="button"
            >
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[28px] text-primary-container animate-pulse"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                <span className="font-display-lg-mobile text-[22px] tracking-wide text-primary-fixed uppercase">
                  DROP INTO TABLE #07
                </span>
              </div>
              <span className="material-symbols-outlined text-primary-container text-[24px]">
                arrow_forward
              </span>
            </button>
          </section>

          {/* VERTICAL GAME MODES */}
          <section className="flex flex-col gap-space-sm">
            {/* Card 1: CASH GAMES */}
            <div className="flex flex-col bg-surface-container-low rounded p-3 shadow-[4px_4px_0px_#000000] relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center shadow-[2px_2px_0px_#000000] -rotate-3">
                    <span className="material-symbols-outlined text-[18px]">
                      payments
                    </span>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface uppercase tracking-wide">
                    CASH GAMES
                  </span>
                </div>
                <div className="bg-surface-container-highest px-2 py-0.5 rounded shadow-[1px_1px_0px_#000000]">
                  <span className="font-label-sm text-label-sm text-secondary uppercase">
                    14 TABLES · 88 SCRAPPERS
                  </span>
                </div>
              </div>

              {/* Quick Sub-table Pickers */}
              <div className="flex flex-col gap-2 my-1">
                {/* Table 1 */}
                <div className="flex items-center justify-between bg-surface-container p-2 rounded shadow-[2px_2px_0px_#000000] hover:bg-surface-container-high transition-colors">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                        #07 SCRAPYARD
                      </span>
                      <span className="font-label-sm text-[10px] bg-secondary-container/30 text-secondary px-1 rounded">
                        5/6 SEATS
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                      STAKES: 500 / 1,000 BLINDS
                    </span>
                  </div>
                  <button
                    className="bg-primary-container text-on-primary px-3 h-9 rounded font-headline-sm text-headline-sm uppercase tracking-wide shadow-[2px_2px_0px_#000000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] flex-shrink-0 cursor-pointer"
                    onClick={() => onNavigateToTable?.()}
                    type="button"
                  >
                    JOIN (40K+)
                  </button>
                </div>
                {/* Table 2 (Full) */}
                <div className="flex items-center justify-between bg-surface-container/60 p-2 rounded shadow-[2px_2px_0px_#000000] opacity-80">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-on-surface-variant uppercase">
                        #01 RUST BUCKET
                      </span>
                      <span className="font-label-sm text-[10px] bg-error-container text-error px-1 rounded">
                        6/6 FULL
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline font-semibold">
                      STAKES: 50 / 100 BLINDS
                    </span>
                  </div>
                  <button
                    className="bg-surface-container-high text-on-surface-variant px-3 h-9 rounded font-headline-sm text-headline-sm uppercase tracking-wide shadow-[1px_1px_0px_#000000] cursor-not-allowed"
                    disabled
                    type="button"
                  >
                    WAITLIST
                  </button>
                </div>
              </div>

              <button
                className="w-full mt-2 py-2 bg-surface-container-high text-on-surface rounded font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000000] active:translate-y-0.5 transition-all cursor-pointer"
                onClick={() => onNavigateToCashBrowser?.()}
                type="button"
              >
                <span>VIEW ALL 14 CASH TABLES</span>
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Card 2: TOURNAMENTS */}
            <div className="flex items-center justify-between bg-surface-container-low rounded p-3 shadow-[4px_4px_0px_#000000] relative overflow-hidden">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded bg-tertiary text-on-tertiary flex items-center justify-center shadow-[2px_2px_0px_#000000] rotate-1 flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    emoji_events
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-md text-headline-md text-on-surface uppercase tracking-wide truncate">
                      TOURNAMENTS
                    </span>
                    <span className="bg-error-container text-tertiary font-label-sm text-[10px] px-1 rounded flex-shrink-0">
                      STARTS 18M
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-bold truncate">
                    SCRAP ARENA 1M GTD POOL
                  </span>
                </div>
              </div>
              <button
                className="bg-secondary-container text-white px-3 h-10 rounded font-headline-sm text-headline-sm uppercase tracking-wide shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] flex-shrink-0 cursor-pointer"
                type="button"
              >
                REGISTER 25K
              </button>
            </div>

            {/* Card 3: PRIVATE TABLES */}
            <div className="flex items-center justify-between bg-surface-container-low rounded p-3 shadow-[4px_4px_0px_#000000] relative">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded bg-surface-container-highest text-primary-fixed flex items-center justify-center shadow-[2px_2px_0px_#000000] -rotate-2 flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    key
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-headline-md text-on-surface uppercase tracking-wide truncate">
                    PRIVATE TABLES
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-bold truncate">
                    HOST OR ENTER 6-DIGIT CODE
                  </span>
                </div>
              </div>
              <button
                className="bg-surface-container text-primary-fixed-dim px-3 h-10 rounded font-headline-sm text-headline-sm uppercase tracking-wide shadow-[3px_3px_0px_#000000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] flex-shrink-0 cursor-pointer"
                type="button"
              >
                CREATE / JOIN
              </button>
            </div>
          </section>

          {/* DAILY REWARD STRIP */}
          <section className="bg-primary text-on-primary rounded p-3 shadow-[4px_4px_0px_#000000] relative overflow-hidden rotate-[0.5deg]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded bg-on-primary text-primary-container flex items-center justify-center shadow-[2px_2px_0px_#000000] -rotate-3 flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    card_giftcard
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-headline-sm text-headline-sm text-on-primary uppercase leading-tight truncate">
                      DAILY SCRAP BONUS
                    </span>
                    <span className="bg-on-primary text-primary font-label-sm text-[10px] px-1 py-0.2 rounded font-bold">
                      READY
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-primary-fixed-variant font-bold truncate">
                    STREAK DAY 5: +15,000 SCRAP
                  </span>
                </div>
              </div>
              <button
                className={`${
                  rewardClaimed
                    ? "bg-surface-container-high text-on-surface-variant cursor-default"
                    : "bg-primary-container text-on-primary-container cursor-pointer"
                } px-3 h-11 rounded font-headline-sm text-headline-sm uppercase tracking-wider shadow-[3px_3px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000] flex-shrink-0 flex items-center gap-1 transition-all`}
                id="claimRewardBtn"
                onClick={handleClaimReward}
                disabled={rewardClaimed}
                type="button"
              >
                {rewardClaimed ? (
                  <>
                    <span>CLAIMED!</span>
                    <span className="material-symbols-outlined text-[16px]">
                      check
                    </span>
                  </>
                ) : (
                  <>
                    <span>CLAIM!</span>
                    <span className="material-symbols-outlined text-[16px]">
                      stars
                    </span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* SHORTCUTS & RECENT STATS */}
          <section className="flex flex-col gap-2">
            {/* Hand Rankings Cheat Sheet Action Bar */}
            <button
              className="w-full bg-surface-container p-2.5 rounded shadow-[3px_3px_0px_#000000] flex items-center justify-between active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-transform text-left cursor-pointer"
              onClick={() => onNavigateToRankings?.()}
              type="button"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-surface-container-high text-secondary flex items-center justify-center shadow-[1px_1px_0px_#000000]">
                  <span className="material-symbols-outlined text-[20px]">
                    help_center
                  </span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                    HAND RANKINGS CHEAT SHEET
                  </span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                    ALL 10 TIERS (ROYAL FLUSH TO HIGH CARD)
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary-container text-[22px]">
                open_in_new
              </span>
            </button>

            {/* Recent Session Result Pill */}
            <div className="w-full bg-surface-container-lowest p-2 rounded shadow-[2px_2px_0px_#000000] flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-primary-container flex-shrink-0"></span>
                <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase truncate">
                  LAST HAND:
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed-dim font-bold truncate">
                  WON +42,800 WITH ACE-HIGH FLUSH
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-outline flex-shrink-0 uppercase">
                2M AGO
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Fixed Bottom Nav */}
      <nav
        className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-around h-20 px-gutter-mobile gap-1">
          <button
            aria-current={activeTab === "home" ? "page" : undefined}
            className={`flex flex-col items-center justify-center min-w-[68px] h-14 rounded px-2 transition-transform cursor-pointer ${
              activeTab === "home"
                ? "bg-primary-container text-on-primary shadow-[2px_2px_0px_#000000] -rotate-1 scale-105"
                : "text-on-surface-variant hover:text-on-surface active:scale-95"
            }`}
            onClick={() => setActiveTab("home")}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">casino</span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider mt-0.5">
              HOME
            </span>
          </button>
          <button
            className={`flex flex-col items-center justify-center min-w-[68px] h-14 rounded px-2 transition-transform cursor-pointer ${
              activeTab === "play"
                ? "bg-primary-container text-on-primary shadow-[2px_2px_0px_#000000] -rotate-1 scale-105"
                : "text-on-surface-variant hover:text-on-surface active:scale-95"
            }`}
            onClick={() => {
              setActiveTab("play");
              onNavigateToTable?.();
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              play_circle
            </span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider mt-0.5">
              PLAY
            </span>
          </button>
          <button
            className={`flex flex-col items-center justify-center min-w-[68px] h-14 rounded px-2 transition-transform cursor-pointer ${
              activeTab === "hands"
                ? "bg-primary-container text-on-primary shadow-[2px_2px_0px_#000000] -rotate-1 scale-105"
                : "text-on-surface-variant hover:text-on-surface active:scale-95"
            }`}
            onClick={() => {
              setActiveTab("hands");
              onNavigateToRankings?.();
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">style</span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider mt-0.5">
              HANDS
            </span>
          </button>
          <button
            className={`flex flex-col items-center justify-center min-w-[68px] h-14 rounded px-2 transition-transform cursor-pointer ${
              activeTab === "profile"
                ? "bg-primary-container text-on-primary shadow-[2px_2px_0px_#000000] -rotate-1 scale-105"
                : "text-on-surface-variant hover:text-on-surface active:scale-95"
            }`}
            onClick={() => setActiveTab("profile")}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              account_box
            </span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider mt-0.5">
              PROFILE
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileBattleLobby;
