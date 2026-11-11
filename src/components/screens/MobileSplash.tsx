import React, { useState } from "react";

export interface MobileSplashProps {
  onEnter?: () => void;
}

export const MobileSplash: React.FC<MobileSplashProps> = ({ onEnter }) => {
  const [statusText, setStatusText] = useState<string>(
    "INITIALIZING CARD ENGINE..."
  );
  const [percentText, setPercentText] = useState<string>("100%");
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const handleShuffleIn = () => {
    if (isEntering) return;
    setIsEntering(true);
    setStatusText("SHUFFLING DECK...");
    setPercentText("DEALING...");

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate([30, 20, 30]);
    }

    window.setTimeout(() => {
      setStatusText("CARDS DRAWN - ENTERING ROOM");
      setPercentText("READY");
      window.setTimeout(() => {
        onEnter?.();
      }, 350);
    }, 600);
  };

  return (
    <div
      className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container"
      style={{
        backgroundColor: "#131315",
        backgroundImage:
          "radial-gradient(rgba(249, 209, 48, 0.08) 1.5px, transparent 1.5px)",
        backgroundSize: "12px 12px",
      }}
    >
      <main className="flex-1 flex flex-col w-full max-w-[430px] mx-auto pt-safe pb-safe bg-surface/90 relative">
        <div className="flex flex-col w-full px-margin-mobile pb-margin-mobile justify-between min-h-[580px] relative overflow-hidden select-none">
          {/* Top Utility Ribbon & Stickers */}
          <div className="flex items-start justify-between z-10 pt-2">
            {/* Version Scrap Tape */}
            <div className="bg-surface-container-highest text-on-surface px-2 py-1 shadow-md -rotate-2 flex items-center gap-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                VER 1.0.4 - SOCIAL CASINO ONLY
              </span>
            </div>

            {/* BAM! Action Starburst Badge */}
            <div className="relative rotate-6">
              <div className="bg-primary-container text-on-primary-container px-2.5 py-0.5 shadow-md flex items-center justify-center transform -skew-x-6">
                <span className="font-headline-sm text-headline-sm tracking-tighter uppercase italic leading-none">
                  BAM!
                </span>
              </div>
            </div>
          </div>

          {/* Background Decorative Ben-Day Comic Burst Rays */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
            <svg
              className="w-[480px] h-[480px] text-secondary"
              fill="currentColor"
              viewBox="0 0 200 200"
            >
              <path
                d="M100 0 L107 88 L145 20 L115 94 L180 50 L122 103 L200 100 L122 108 L185 145 L115 112 L145 185 L106 116 L100 200 L93 116 L55 185 L84 112 L15 148 L78 107 L0 100 L78 93 L20 52 L85 94 L55 18 Z"
                opacity="0.4"
              ></path>
            </svg>
          </div>

          {/* Center Hero Studio Identity */}
          <div className="flex flex-col items-center justify-center my-auto z-10 text-center relative py-6">
            {/* Studio Name with Distressed Cel Offset Layers */}
            <div className="relative inline-block cursor-default group">
              <span className="block absolute -top-0.5 -left-1 font-display-xl text-display-xl tracking-tight text-primary-container opacity-85 blur-[0.5px] select-none pointer-events-none transform -rotate-1">
                KOSIGAMES
              </span>
              <span className="block absolute top-1.5 left-1.5 font-display-xl text-display-xl tracking-tight text-secondary select-none pointer-events-none transform -rotate-1">
                KOSIGAMES
              </span>
              <h1 className="block relative font-display-xl text-display-xl tracking-tight text-primary uppercase select-none transform -rotate-1 drop-shadow-md">
                KOSIGAMES
              </h1>
            </div>

            {/* Subtitle Cut-Paper Badge */}
            <div className="mt-2 bg-surface-container-lowest text-on-surface px-3 py-1 shadow-md -rotate-1">
              <p className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed">
                ★ A KOSIGAMES PRODUCTION ★
              </p>
            </div>

            {/* Decorative Card Pips Strip */}
            <div className="flex items-center gap-3 mt-4 text-on-surface-variant opacity-80">
              <span className="text-tertiary-container font-headline-sm text-headline-sm">
                ♥
              </span>
              <span className="text-secondary font-headline-sm text-headline-sm">
                ♦
              </span>
              <span className="text-primary-container font-headline-sm text-headline-sm">
                ♣
              </span>
              <span className="text-on-surface font-headline-sm text-headline-sm">
                ♠
              </span>
            </div>
          </div>

          {/* Lower Section: Game Teaser, Loader & CTA */}
          <div className="flex flex-col w-full gap-3 z-10">
            {/* Scrap Poker Title & Mini Chips Tray */}
            <div className="bg-surface-container p-3 rounded-lg shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container shadow-sm rotate-2">
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    style
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    FEATURED TITLE
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface uppercase leading-none">
                    SCRAP POKER
                  </span>
                </div>
              </div>

              {/* Cel Badge: Live Stakes */}
              <div className="bg-surface-container-low px-2 py-1 rounded text-right">
                <span className="font-label-sm text-label-sm text-outline uppercase block">
                  STATUS
                </span>
                <span className="font-body-sm text-body-sm text-primary-fixed-dim uppercase leading-tight font-bold">
                  READY TO DEAL
                </span>
              </div>
            </div>

            {/* Progress Engine Bar Container */}
            <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col gap-1.5 shadow-sm">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  <span id="engine-status">{statusText}</span>
                </span>
                <span
                  className="font-label-sm text-label-sm text-primary font-bold"
                  id="engine-percent"
                >
                  {percentText}
                </span>
              </div>

              {/* Segmented Hazard / Halftone Track */}
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5 relative">
                <div
                  className="h-full bg-gradient-to-r from-primary-container via-secondary to-primary-container rounded-full w-full transition-all duration-300 relative"
                  id="progress-fill"
                >
                  <div className="absolute inset-0 opacity-40 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.8)_25%,rgba(0,0,0,0.8)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.8)_75%,rgba(0,0,0,0.8)_100%)] bg-[length:12px_12px] animate-[pulse_2s_infinite]"></div>
                </div>
              </div>
            </div>

            {/* Interactive Pulsing Action Trigger */}
            <button
              className="w-full bg-primary-container text-on-primary-container py-3.5 px-4 rounded-lg shadow-xl font-headline-md text-headline-md uppercase tracking-wider flex items-center justify-center gap-2 transform active:scale-95 transition-transform duration-100 hover:brightness-105 group relative overflow-hidden cursor-pointer"
              id="shuffle-btn"
              onClick={handleShuffleIn}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[24px] text-on-primary group-hover:rotate-180 transition-transform duration-500"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                casino
              </span>
              <span>TAP TO SHUFFLE IN</span>
              <span
                className="material-symbols-outlined text-[20px] text-on-primary"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                play_arrow
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
