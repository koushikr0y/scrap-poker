import React, { useState, useEffect } from "react";

export interface DesktopSplashProps {
  onEnterLobby?: () => void;
  onEnterLogin?: () => void;
}

export const DesktopSplash: React.FC<DesktopSplashProps> = ({
  onEnterLobby,
  onEnterLogin,
}) => {
  const [screenMode, setScreenMode] = useState<"studio" | "poker">("studio");
  const [progress, setProgress] = useState<number>(100);
  const [enterButtonText, setEnterButtonText] = useState<string>(
    "PRESS ANY KEY OR CLICK TO ENTER"
  );
  const [isEntering, setIsEntering] = useState<boolean>(false);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 400);
      return () => clearTimeout(timer);
    } else if (progress === 100 && screenMode === "studio") {
      const autoTimer = setTimeout(() => {
        setScreenMode("poker");
      }, 1200);
      return () => clearTimeout(autoTimer);
    }
  }, [progress, screenMode]);

  const handleEnterGame = () => {
    if (isEntering) return;
    setIsEntering(true);
    setEnterButtonText("INITIALIZING TABLE ENGINE...");
    setTimeout(() => {
      setEnterButtonText("SALOON READY // ENTERING LOBBY");
      setTimeout(() => {
        onEnterLobby ? onEnterLobby() : onEnterLogin?.();
      }, 700);
    }, 600);
  };

  useEffect(() => {
    const handleKeyDown = () => {
      if (screenMode === "studio") {
        setScreenMode("poker");
      } else {
        handleEnterGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screenMode, isEntering]);

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen relative overflow-x-hidden select-none font-body-md">
      <div className="fixed inset-0 pointer-events-none halftone-overlay opacity-80 z-0"></div>
      <div className="fixed top-margin left-margin z-10 hidden sm:flex items-center gap-space-sm transform -rotate-1">
        <div className="bg-primary-container text-on-primary-container px-space-md py-space-xs shadow-[2px_2px_0px_#000000]">
          <span className="font-label-lg text-label-lg tracking-wider uppercase">
            STUDIO CUTOUT // LABS
          </span>
        </div>
      </div>
      <div className="fixed bottom-margin right-margin z-10 hidden sm:flex items-center gap-space-sm transform rotate-1">
        <div className="bg-surface-container-high px-space-md py-space-xs text-on-surface-variant shadow-[2px_2px_0px_#000000]">
          <span className="font-label-sm text-label-sm uppercase">
            VER 1.0.4b // CEL-POP ENGINE
          </span>
        </div>
      </div>

      <main className="relative z-10 w-full min-h-screen flex items-center justify-center p-gutter-mobile sm:p-gutter">
        <div className="flex flex-col w-full max-w-6xl mx-auto px-gutter-mobile sm:px-gutter py-space-md sm:py-space-xl relative">
          {/* TOP STATUS TAPE / META BAR */}
          <div className="w-full flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
            <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs shadow-[2px_2px_0px_#000000] -rotate-1">
              <span className="inline-block w-2.5 h-2.5 bg-primary-container animate-ping"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                STATUS: ENGINE_INITIALIZED
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                // SYNDICATE NET
              </span>
            </div>

            {/* STAGE SWITCHER CONTROLS */}
            <div className="flex items-center gap-space-xs bg-surface-container-high p-space-xs shadow-[3px_3px_0px_#000000]">
              <button
                className={`px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer ${
                  screenMode === "studio"
                    ? "bg-primary-container text-on-primary-container shadow-[2px_2px_0px_#000000] -rotate-1"
                    : "bg-surface text-on-surface hover:text-primary-container"
                }`}
                onClick={() => setScreenMode("studio")}
                type="button"
              >
                STUDIO INTRO (KosiGames)
              </button>
              <button
                className={`px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer ${
                  screenMode === "poker"
                    ? "bg-primary-container text-on-primary-container shadow-[2px_2px_0px_#000000] rotate-1"
                    : "bg-surface text-on-surface hover:text-primary-container"
                }`}
                onClick={() => setScreenMode("poker")}
                type="button"
              >
                TITLE REVEAL (SCRAP POKER)
              </button>
            </div>

            <div className="hidden sm:flex items-center bg-surface px-space-md py-space-xs shadow-[2px_2px_0px_#000000] rotate-1">
              <span className="font-label-sm text-label-sm text-primary-container tracking-widest uppercase">
                BUILD 1.0.4 - SOCIAL PLAY MONEY ONLY
              </span>
            </div>
          </div>

          {/* MAIN CINEMATIC CUTOUT FRAME */}
          <div className="relative w-full bg-surface-container-lowest shadow-[8px_8px_0px_#000000] overflow-hidden min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-space-lg sm:p-space-xl">
            {/* COMIC SOUND POP STICKERS (ANGLED CALLOUTS) */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none transform -rotate-12 transition-transform duration-300 hover:scale-110">
              <div className="bg-error-container text-tertiary px-space-md py-space-xs shadow-[4px_4px_0px_#000000] flex items-center gap-1">
                <span className="font-headline-sm text-headline-sm tracking-wider text-primary-container">
                  POW!
                </span>
                <span className="font-label-sm text-label-sm tracking-tighter text-on-surface-variant">
                  VOLT.99
                </span>
              </div>
            </div>
            <div className="absolute top-8 right-8 z-20 pointer-events-none transform rotate-12 transition-transform duration-300 hover:scale-110">
              <div className="bg-secondary-container text-on-secondary-container px-space-md py-space-xs shadow-[4px_4px_0px_#000000] flex items-center gap-1">
                <span className="font-headline-sm text-headline-sm tracking-wider text-primary">
                  SHUFFLE!
                </span>
                <span className="font-label-sm text-label-sm text-surface-container-lowest">
                  52-DECK
                </span>
              </div>
            </div>

            {/* AMBIENT CEL EXPLOSION RAYS (SVG BACKGROUND) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
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

            {/* INK SPLATTER GRAPHICS LAYER */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-30">
              <svg
                className="w-full h-full text-secondary"
                fill="currentColor"
                viewBox="0 0 1200 800"
              >
                <circle cx="210" cy="180" r="16"></circle>
                <circle cx="230" cy="195" r="9"></circle>
                <circle cx="190" cy="170" r="7"></circle>
                <path d="M210,180 Q250,220 280,260 Q270,270 240,240 Z"></path>
                <circle cx="980" cy="620" r="22"></circle>
                <circle cx="1020" cy="640" r="11"></circle>
                <circle cx="950" cy="635" r="8"></circle>
                <path d="M980,620 Q920,680 870,720 Q880,740 940,670 Z"></path>
              </svg>
            </div>

            {/* STAGE A: KOSIGAMES STUDIO EMBLEM VIEW */}
            {screenMode === "studio" && (
              <div
                className="relative z-10 my-auto flex flex-col items-center justify-center text-center transition-all duration-500 transform translate-y-0 opacity-100 py-space-lg"
                id="stage-studio"
              >
                {/* STUDIO LOGO BADGE CONTAINER */}
                <div className="relative inline-block mb-space-lg">
                  {/* Distressed paper backdrop / drop shadow layers */}
                  <div className="absolute -inset-4 bg-primary-container transform rotate-2 shadow-[6px_6px_0px_#000000]"></div>
                  <div className="absolute -inset-2 bg-secondary transform -rotate-1 shadow-[4px_4px_0px_#000000]"></div>
                  {/* Inner Core Plaque */}
                  <div className="relative bg-surface-container-lowest px-space-xl py-space-lg shadow-[4px_4px_0px_#000000] flex flex-col items-center">
                    <div className="flex items-center gap-space-xs mb-space-xs">
                      <span className="font-label-sm text-label-sm tracking-widest text-secondary uppercase">
                        // INDEPENDENT GAME LAB //
                      </span>
                    </div>
                    {/* KOSIGAMES WORDMARK */}
                    <div className="relative select-none py-space-xs">
                      {/* Shadow Layer */}
                      <h1 className="font-display-xl text-display-xl tracking-tight text-primary-container absolute top-1.5 left-1.5 sm:top-2 sm:left-2 uppercase pointer-events-none select-none">
                        KosiGames
                      </h1>
                      {/* Accent Layer */}
                      <h1 className="font-display-xl text-display-xl tracking-tight text-secondary absolute -top-1 -left-1 uppercase pointer-events-none select-none opacity-80">
                        KosiGames
                      </h1>
                      {/* Foreground Master Lettering */}
                      <h1 className="relative font-display-xl text-display-xl tracking-tight text-primary uppercase drop-shadow-[0_2px_0_#000]">
                        KosiGames
                      </h1>
                    </div>
                    {/* STUDIO SUB-INSIGNIA & TAPE STRIP */}
                    <div className="mt-space-sm bg-surface-bright text-on-surface px-space-md py-space-xs transform rotate-1 shadow-[2px_2px_0px_#000000] flex items-center gap-space-sm">
                      <span
                        className="material-symbols-outlined text-primary-container text-body-md"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        bolt
                      </span>
                      <span className="font-label-md text-label-md tracking-wider uppercase text-primary">
                        ARCADE ARCHITECTURE // CEL-POP CRAFT
                      </span>
                      <span
                        className="material-symbols-outlined text-secondary text-body-md"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        token
                      </span>
                    </div>
                  </div>
                </div>

                {/* KOSIGAMES PRODUCTION BANNER */}
                <div className="inline-flex items-center gap-space-sm bg-surface-container px-space-lg py-space-xs shadow-[3px_3px_0px_#000000] -rotate-1 mb-space-lg">
                  <span className="font-label-lg text-label-lg tracking-widest text-primary uppercase">
                    A KOSIGAMES PRODUCTION
                  </span>
                </div>

                {/* TACTILE COMIC PROGRESS BAR */}
                <div className="w-full max-w-md bg-surface-container-high p-space-xs shadow-[4px_4px_0px_#000000]">
                  <div className="flex justify-between items-center px-space-xs mb-space-xs">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                      LOADING SYNDICATE ASSETS...
                    </span>
                    <span
                      className="font-label-sm text-label-sm text-primary-container tracking-wider font-bold"
                      id="loading-pct"
                    >
                      [{progress}%]
                    </span>
                  </div>
                  <div className="w-full h-5 bg-surface-container-lowest p-0.5 relative overflow-hidden flex">
                    <div
                      className="h-full bg-primary-container transition-all duration-300 ease-out shadow-[2px_0px_0px_#000000]"
                      id="progress-fill"
                      style={{ width: `${progress}%` }}
                    >
                      {/* Patterned bar lines */}
                      <div className="w-full h-full opacity-25 bg-[repeating-linear-gradient(45deg,#000,#000_6px,transparent_6px,transparent_12px)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE B: TITLE REVEAL (SCRAP POKER) VIEW */}
            {screenMode === "poker" && (
              <div
                className="relative z-10 my-auto flex flex-col items-center justify-center text-center transition-all duration-500 py-space-lg"
                id="stage-poker"
              >
                {/* HERO TITLE STACK WITH COLLAGED PLAYING CARDS */}
                <div className="relative w-full max-w-2xl flex flex-col items-center mb-space-lg">
                  {/* CARD SCRAPS PEEKING BEHIND TITLE */}
                  <div className="absolute -top-12 -left-4 sm:left-12 transform -rotate-12 z-0 pointer-events-none">
                    <div className="w-16 h-24 sm:w-20 sm:h-28 bg-primary text-on-primary-container p-space-xs shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                      <span className="font-headline-sm text-headline-sm leading-none text-tertiary-container">
                        A♠
                      </span>
                      <div className="self-center">
                        <span
                          className="material-symbols-outlined text-headline-md text-surface-container-lowest"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          favorite
                        </span>
                      </div>
                      <span className="font-headline-sm text-headline-sm leading-none self-end rotate-180 text-tertiary-container">
                        A♠
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-10 -right-2 sm:right-12 transform rotate-12 z-0 pointer-events-none">
                    <div className="w-16 h-24 sm:w-20 sm:h-28 bg-primary text-on-error p-space-xs shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                      <span className="font-headline-sm text-headline-sm leading-none text-error">
                        K♥
                      </span>
                      <div className="self-center">
                        <span
                          className="material-symbols-outlined text-headline-md text-error"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          playing_cards
                        </span>
                      </div>
                      <span className="font-headline-sm text-headline-sm leading-none self-end rotate-180 text-error">
                        K♥
                      </span>
                    </div>
                  </div>
                  {/* MAIN TITLE CUTOUT PILL */}
                  <div className="relative z-10 bg-primary-container text-on-primary-container px-space-xl py-space-sm shadow-[6px_6px_0px_#000000] transform -rotate-1 mb-space-xs">
                    <span className="font-label-sm text-label-sm tracking-widest uppercase block text-on-primary">
                      THE UNDERGROUND CEL-SHADED HOLD'EM
                    </span>
                    <h2 className="font-display-xl text-display-xl tracking-tight uppercase text-on-primary leading-none">
                      SCRAP POKER
                    </h2>
                  </div>
                  {/* SECONDARY STRIP */}
                  <div className="relative z-10 bg-surface text-secondary px-space-lg py-space-xs shadow-[4px_4px_0px_#000000] transform rotate-2">
                    <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-secondary">
                      TEXAS TACTICS // NO-LIMIT SALOON
                    </span>
                  </div>
                </div>

                {/* FEATURES / RULES PILL RACK */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm max-w-xl w-full mb-space-xl">
                  <div className="bg-surface-container p-space-sm shadow-[3px_3px_0px_#000000] -rotate-1">
                    <span className="font-label-sm text-label-sm text-primary-container block uppercase">
                      CHIP SYSTEM
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary">
                      $50,000 FREE BANK
                    </span>
                  </div>
                  <div className="bg-surface-container p-space-sm shadow-[3px_3px_0px_#000000] rotate-1">
                    <span className="font-label-sm text-label-sm text-secondary block uppercase">
                      TABLE FORMAT
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary">
                      6-MAX FAST Cel-POP
                    </span>
                  </div>
                  <div className="bg-surface-container p-space-sm shadow-[3px_3px_0px_#000000] -rotate-1">
                    <span className="font-label-sm text-label-sm text-error block uppercase">
                      SECURITY SEAL
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary">
                      PROVABLY RANDOM
                    </span>
                  </div>
                </div>

                {/* CALL TO ACTION / LOGIN BUTTON */}
                <div className="flex flex-col items-center gap-space-sm w-full max-w-md">
                  <button
                    className={`w-full ${
                      isEntering
                        ? "bg-secondary text-on-secondary-container"
                        : "bg-primary-container text-on-primary-container"
                    } font-headline-md text-headline-md tracking-wider uppercase py-space-md px-space-lg shadow-[6px_6px_0px_#000000] transform -rotate-1 hover:rotate-0 hover:bg-primary transition-all active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-space-sm cursor-pointer`}
                    id="btn-enter-saloon"
                    onClick={handleEnterGame}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-headline-md">
                      play_arrow
                    </span>
                    <span>{enterButtonText}</span>
                  </button>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    CONNECTED TO REGIONAL CLUSTER // LATENCY: 24ms
                  </span>
                </div>
              </div>
            )}

            {/* BOTTOM FOOTER / NOTICE TAPE */}
            <div className="relative z-10 w-full pt-space-lg flex flex-wrap items-end justify-between gap-space-md">
              {/* DISCLAIMER STRIP */}
              <div className="max-w-md bg-surface-container-high p-space-sm shadow-[3px_3px_0px_#000000] transform -rotate-0.5">
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-primary-container text-headline-sm">
                    warning
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    <strong className="text-primary font-bold">
                      COMMUNITY PLAY NOTICE:
                    </strong>{" "}
                    Scrap Poker is an entertainment title engineered by KosiGames.
                    Features simulated tournament play money only. No cash deposit,
                    wagering, or real prizes.
                  </p>
                </div>
              </div>
              {/* DEV STAMP & CREDITS */}
              <div className="flex items-center gap-space-sm self-end">
                <div className="bg-surface px-space-md py-space-xs shadow-[2px_2px_0px_#000000]">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    AUDIO: SYNTH-WASH 16-BIT
                  </span>
                </div>
                <div className="bg-primary-container text-on-primary-container px-space-md py-space-xs shadow-[2px_2px_0px_#000000] transform rotate-1">
                  <span className="font-label-lg text-label-lg uppercase">
                    KosiGames © 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesktopSplash;
