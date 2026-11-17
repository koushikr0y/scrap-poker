import React, { useState, useEffect } from "react";

export interface MobileSplashAltProps {
  onEnter?: () => void;
  onNavigateLogin?: () => void;
}

export const MobileSplashAlt: React.FC<MobileSplashAltProps> = ({
  onEnter,
  onNavigateLogin,
}) => {
  const [stage, setStage] = useState<"studio" | "poker">("studio");
  const [replayKey, setReplayKey] = useState<number>(0);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [customStatus, setCustomStatus] = useState<string | null>(null);

  // Auto transition sequence from Studio Intro to Scrap Poker Title Reveal after 2.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("poker");
    }, 2800);
    return () => clearTimeout(timer);
  }, [replayKey]);

  const toggleScreenPhase = () => {
    setStage((prev) => (prev === "studio" ? "poker" : "studio"));
  };

  const triggerReplay = () => {
    setStage("studio");
    setReplayKey((k) => k + 1);
    setCustomStatus(null);
    setIsEntering(false);
  };

  const handleEnterAction = () => {
    if (stage === "studio") {
      setStage("poker");
      if (typeof window !== "undefined" && window.navigator?.vibrate) {
        window.navigator.vibrate(30);
      }
    } else {
      if (isEntering) return;
      setIsEntering(true);
      setCustomStatus("ENTERING SALOON LOBBY...");

      if (typeof window !== "undefined" && window.navigator?.vibrate) {
        window.navigator.vibrate([40, 30, 50]);
      }

      setTimeout(() => {
        setCustomStatus("TABLE READY // CONNECTED");
        setTimeout(() => {
          if (onEnter) {
            onEnter();
          } else if (onNavigateLogin) {
            onNavigateLogin();
          }
        }, 300);
      }, 700);
    }
  };

  const engineStatus =
    customStatus ??
    (stage === "studio"
      ? "INITIALIZING CELL-ENGINE..."
      : "SHUFFLING UNDERGROUND DECK...");

  const ctaLabel = isEntering
    ? "DEALING CARDS..."
    : stage === "studio"
    ? "SHUFFLE TO TITLE ▷"
    : "TAP TO ENTER SALOON ▷";

  return (
    <div
      className="bg-[#101012] text-on-surface font-body-md h-screen w-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        backgroundColor: "#101012",
        backgroundImage:
          "radial-gradient(rgba(249, 209, 48, 0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "10px 10px",
      }}
    >
      <main className="flex-1 flex flex-col w-full max-w-[430px] mx-auto h-full max-h-[884px] pt-safe pb-safe relative px-3 justify-between">
        {/* TOP BAR: Quick Interactive Ribbon & Mode Toggles */}
        <header className="w-full flex items-center justify-between z-30 pt-1 shrink-0">
          {/* Version Scrap Tape */}
          <div className="bg-surface-container-highest/90 text-on-surface px-2.5 py-1 shadow-[2px_2px_0px_#000] -rotate-2 flex items-center gap-1.5 border-l-2 border-primary-container">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-tech text-[11px] font-bold uppercase tracking-wider text-primary">
              VER 1.0.4B // CEL-POP
            </span>
          </div>

          {/* Replay / Stage Action Chip */}
          <div className="flex items-center gap-1.5">
            <button
              className="bg-surface-container-high hover:bg-surface-bright active:scale-95 text-secondary px-2.5 py-1 text-[11px] font-tech font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] rotate-1 transition-all flex items-center gap-1 cursor-pointer"
              id="btn-replay"
              onClick={triggerReplay}
            >
              <span className="material-symbols-outlined text-[13px]">replay</span>
              <span>REPLAY INTRO</span>
            </button>

            {/* BAM! / SKIP Sticker */}
            <button
              className="bg-primary-container hover:bg-[#ffe179] text-on-primary-container px-2 py-0.5 shadow-[3px_3px_0px_#000] -rotate-3 transition-transform active:scale-95 font-headline-sm text-sm uppercase italic tracking-tighter cursor-pointer"
              id="btn-stage-toggle"
              onClick={toggleScreenPhase}
            >
              <span>{stage === "studio" ? "BAM!" : "POW!"}</span>
            </button>
          </div>
        </header>

        {/* AMBIENT EXPLOSIVE BURST RAYS & INK SPLATTERS (Background Decorative Comic FX) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-25">
          <div className="w-[620px] h-[620px] anim-spin-rays flex items-center justify-center">
            <svg
              className="w-full h-full text-primary-container"
              fill="currentColor"
              viewBox="0 0 1000 1000"
            >
              <path d="M500,500 L440,0 L560,0 Z"></path>
              <path d="M500,500 L850,150 L950,250 Z"></path>
              <path d="M500,500 L1000,450 L1000,550 Z"></path>
              <path d="M500,500 L950,750 L850,850 Z"></path>
              <path d="M500,500 L550,1000 L450,1000 Z"></path>
              <path d="M500,500 L150,850 L50,750 Z"></path>
              <path d="M500,500 L0,550 L0,450 Z"></path>
              <path d="M500,500 L50,250 L150,150 Z"></path>
            </svg>
          </div>

          {/* Comic Ink Splatters */}
          <div className="absolute inset-0 select-none opacity-40">
            <svg
              className="w-full h-full text-secondary"
              fill="currentColor"
              viewBox="0 0 430 844"
            >
              <circle cx="65" cy="180" r="10"></circle>
              <circle cx="85" cy="195" r="5"></circle>
              <circle cx="50" cy="170" r="4"></circle>
              <path d="M65,180 Q90,205 110,230 Q100,238 80,215 Z"></path>
              <circle cx="365" cy="460" r="14"></circle>
              <circle cx="385" cy="480" r="7"></circle>
              <circle cx="350" cy="475" r="5"></circle>
              <path d="M365,460 Q330,500 295,530 Q305,540 345,495 Z"></path>
            </svg>
          </div>
        </div>

        {/* CENTER HERO SPLASH AREA */}
        <div
          className="flex-1 flex flex-col items-center justify-center my-auto z-10 w-full relative py-2"
          key={replayKey}
        >
          {stage === "studio" ? (
            /* STAGE 1: KOSIGAMES STUDIO IDENTITY */
            <div
              className="flex flex-col items-center justify-center text-center transition-all duration-300 w-full anim-logo-slam"
              id="view-studio"
            >
              {/* Emblem Badge with Offset Hard Shadows */}
              <div className="relative mb-3 flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-primary-container transform rotate-6 translate-x-1 translate-y-1 shadow-[3px_3px_0px_#000]"></div>
                <div className="absolute w-16 h-16 bg-secondary transform -rotate-3 -translate-x-0.5 -translate-y-0.5 shadow-[2px_2px_0px_#000]"></div>

                {/* Core Ink Emblem Badge */}
                <div className="relative w-16 h-16 bg-[#0a0a0c] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48">
                    <path
                      d="M10 16C6 16 4 20 4 27C4 35 8 38 12 37L16 32H32L36 37C40 38 44 35 44 27C44 20 42 16 38 16H10Z"
                      fill="#F9D130"
                      stroke="#000"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                    <path d="M12 21H16V25H12Z" fill="#101012"></path>
                    <path
                      d="M14 19V27"
                      stroke="#101012"
                      strokeLinecap="round"
                      strokeWidth="2"
                    ></path>
                    <circle cx="32" cy="21" fill="#E53935" r="1.8"></circle>
                    <circle cx="35.5" cy="24.5" fill="#1AA3D4" r="1.8"></circle>
                    <circle cx="28.5" cy="24.5" fill="#fff" r="1.8"></circle>
                    <path
                      d="M22 20L22 28M26 20L22 24L26 28"
                      stroke="#101012"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* KOSIGAMES CUSTOM WORDMARK */}
              <div className="relative inline-block cursor-default select-none my-1">
                <span className="block absolute -top-1 -left-1 font-display-xl text-display-xl tracking-tight text-secondary uppercase pointer-events-none select-none opacity-90 transform -rotate-1">
                  KOSIGAMES
                </span>
                <span className="block absolute top-1.5 left-1.5 font-display-xl text-display-xl tracking-tight text-primary-container uppercase pointer-events-none select-none transform -rotate-1">
                  KOSIGAMES
                </span>
                <h1 className="block relative font-display-xl text-display-xl tracking-tight text-[#F2EEE4] comic-text-stroke uppercase select-none transform -rotate-1 drop-shadow-[0_4px_0_#000]">
                  KOSIGAMES
                </h1>
              </div>

              {/* ARCADE ARCHITECTURE // CEL-POP CRAFT Ribbon */}
              <div className="mt-1 bg-surface-container-highest px-2.5 py-0.5 shadow-[2px_2px_0px_#000] rotate-1 border-b-2 border-secondary flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-primary-container text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  bolt
                </span>
                <span className="font-tech text-[12px] font-bold tracking-widest uppercase text-primary">
                  ARCADE ARCHITECTURE // CEL-POP CRAFT
                </span>
                <span
                  className="material-symbols-outlined text-secondary text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  token
                </span>
              </div>

              {/* CAPTION BADGE */}
              <div className="mt-3 bg-[#0e0e10] text-on-surface px-3 py-1 shadow-[3px_3px_0px_#000] -rotate-1 border border-primary-container/40">
                <p className="font-headline-sm text-sm uppercase tracking-widest text-primary-container">
                  ★ A KOSIGAMES PRODUCTION ★
                </p>
              </div>

              {/* CARD SUITS ACCENTS STRIP */}
              <div className="flex items-center gap-3 mt-3 text-on-surface-variant">
                <span className="text-[#E53935] font-headline-sm text-lg drop-shadow-[1px_1px_0_#000]">
                  ♥
                </span>
                <span className="text-secondary font-headline-sm text-lg drop-shadow-[1px_1px_0_#000]">
                  ♦
                </span>
                <span className="text-primary-container font-headline-sm text-lg drop-shadow-[1px_1px_0_#000]">
                  ♣
                </span>
                <span className="text-on-surface font-headline-sm text-lg drop-shadow-[1px_1px_0_#000]">
                  ♠
                </span>
              </div>
            </div>
          ) : (
            /* STAGE 2: TITLE REVEAL (SCRAP POKER & CEL-SHADED CARDS) */
            <div
              className="flex flex-col items-center justify-center text-center transition-all duration-300 w-full relative"
              id="view-poker"
            >
              {/* Collaged Cel-Shaded Poker Card Silhouettes peeking behind title */}
              <div className="relative w-full max-w-xs flex flex-col items-center mb-1">
                {/* Left Ace of Spades */}
                <div className="absolute -top-12 left-4 z-0 pointer-events-none anim-card-left">
                  <div className="w-14 h-20 bg-[#F2EEE4] text-[#101012] p-1.5 shadow-[4px_4px_0px_#000] border-2 border-black flex flex-col justify-between rounded-sm">
                    <span className="font-headline-sm text-xs leading-none text-left">
                      A♠
                    </span>
                    <span
                      className="material-symbols-outlined text-[20px] self-center text-[#101012]"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      playing_cards
                    </span>
                    <span className="font-headline-sm text-xs leading-none self-end rotate-180">
                      A♠
                    </span>
                  </div>
                </div>

                {/* Right King of Hearts */}
                <div className="absolute -top-10 right-4 z-0 pointer-events-none anim-card-right">
                  <div className="w-14 h-20 bg-[#F2EEE4] text-[#E53935] p-1.5 shadow-[4px_4px_0px_#000] border-2 border-black flex flex-col justify-between rounded-sm">
                    <span className="font-headline-sm text-xs leading-none text-left">
                      K♥
                    </span>
                    <span
                      className="material-symbols-outlined text-[20px] self-center text-[#E53935]"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    <span className="font-headline-sm text-xs leading-none self-end rotate-180">
                      K♥
                    </span>
                  </div>
                </div>

                {/* Scrap Poker Impact Badge */}
                <div className="relative z-10 bg-primary-container text-on-primary-container px-5 py-2 shadow-[5px_5px_0px_#000] -rotate-1 border-2 border-black w-full">
                  <span className="font-tech text-[12px] font-bold tracking-widest uppercase block text-[#231b00] leading-none mb-0.5">
                    THE UNDERGROUND HOLD'EM
                  </span>
                  <h2 className="font-display-xl text-[44px] tracking-tight uppercase text-[#101012] comic-text-stroke leading-none">
                    SCRAP POKER
                  </h2>
                </div>

                {/* Sub Saloon Cel Strip */}
                <div className="relative z-10 -mt-1 bg-surface-container-lowest text-secondary px-4 py-1 shadow-[3px_3px_0px_#000] rotate-2 border border-secondary">
                  <span className="font-headline-sm text-xs uppercase tracking-wider text-secondary">
                    TEXAS TACTICS // NO-LIMIT SALOON
                  </span>
                </div>
              </div>

              {/* Quick 3-Pill Specs Rack */}
              <div className="grid grid-cols-3 gap-1.5 w-full max-w-xs mt-3">
                <div className="bg-surface-container p-1.5 shadow-[2px_2px_0px_#000] -rotate-1 border-t-2 border-primary-container text-center">
                  <span className="font-tech text-[10px] text-primary-container block uppercase font-bold">
                    CHIPS
                  </span>
                  <span className="font-headline-sm text-xs text-primary leading-tight">
                    $50K FREE
                  </span>
                </div>
                <div className="bg-surface-container p-1.5 shadow-[2px_2px_0px_#000] rotate-1 border-t-2 border-secondary text-center">
                  <span className="font-tech text-[10px] text-secondary block uppercase font-bold">
                    FORMAT
                  </span>
                  <span className="font-headline-sm text-xs text-primary leading-tight">
                    6-MAX FAST
                  </span>
                </div>
                <div className="bg-surface-container p-1.5 shadow-[2px_2px_0px_#000] -rotate-1 border-t-2 border-error text-center">
                  <span className="font-tech text-[10px] text-error block uppercase font-bold">
                    SHUFFLE
                  </span>
                  <span className="font-headline-sm text-xs text-primary leading-tight">
                    PROVABLY FAIR
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LOWER SECTION: Hazard Progress, Tactile Action Button & Legal Disclaimer */}
        <footer className="w-full flex flex-col gap-2.5 z-20 shrink-0 pb-1">
          {/* SLEEK HAZARD / HALFTONE PROGRESS ENGINE BAR */}
          <div className="bg-surface-container-low p-2 rounded-lg flex flex-col gap-1.5 shadow-[3px_3px_0px_#000] border border-white/5">
            <div className="flex items-center justify-between text-on-surface px-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span
                  className="font-tech text-xs uppercase tracking-wider text-primary font-bold"
                  id="engine-status"
                >
                  {engineStatus}
                </span>
              </div>
              <span
                className="font-tech text-xs text-primary-container font-extrabold tracking-wider"
                id="engine-percent"
              >
                [100%]
              </span>
            </div>

            {/* Segmented Hazard Animated Progress Track */}
            <div className="h-3 w-full bg-surface-container-lowest rounded-sm overflow-hidden p-0.5 border border-black relative">
              <div
                className="h-full bg-primary-container transition-all duration-300 relative w-full overflow-hidden"
                id="progress-fill"
              >
                <div className="absolute inset-0 opacity-40 hazard-stripe-animated"></div>
              </div>
            </div>
          </div>

          {/* TACTILE THUMB CTA BUTTON */}
          <button
            className={`w-full ${
              isEntering ? "bg-secondary text-white" : "bg-primary-container text-[#101012]"
            } hover:bg-[#ffe179] py-3.5 px-4 rounded-md shadow-[4px_4px_0px_#000] font-headline-md text-xl uppercase tracking-wider flex items-center justify-center gap-2 transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all border-2 border-black cursor-pointer`}
            id="cta-enter"
            onClick={handleEnterAction}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              casino
            </span>
            <span id="cta-label">{ctaLabel}</span>
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              play_arrow
            </span>
          </button>

          {/* SUBTLE LEGAL / DISCLAIMER PILL */}
          <div className="text-center py-0.5">
            <span className="font-tech text-[10px] text-on-surface-variant uppercase tracking-wider block">
              VER 1.0.4B • CEL-POP ENGINE • SOCIAL ENTERTAINMENT ONLY
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};
