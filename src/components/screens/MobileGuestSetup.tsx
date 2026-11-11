import React, { useState } from "react";

export interface GuestAvatarOption {
  id: string;
  shortLabel: string;
  roleName: string;
  mkLabel: string;
  mkColorClass: string;
  rotateDeg: number;
  imageUrl: string;
  imageAlt: string;
}

export const GUEST_AVATARS: GuestAvatarOption[] = [
  {
    id: "bolt",
    shortLabel: "BOLT",
    roleName: "BOLT RUNNER",
    mkLabel: "MK.1",
    mkColorClass: "text-primary-container",
    rotateDeg: -1,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDD1rD3IlfCQIpuQO1Ip14FvbdYLu2X1mZID7IUEYZ7-ViP5gLodZrSDu5rFAg0iovH8ibBRkoMWWcJ8YWpE-B7zbMG1E_5IB0LEqLn3scPaEYlknkVLp26LvWYhRLr1qnuqnkUoRQh110ECje9RFuM6e6LKBKxor8WoxpCzTcb1JIqC3gX_6CPHKOmfo5mkjKXC7c7Cf_5Qzh-N14fEvUPjU80U2FU0IWlrErGnQ",
    imageAlt:
      "Comic cel-shaded cyberpunk scavenger character wearing a cracked welding visor with neon yellow highlights and bolted metal scrap jaw in high contrast pop art ink aesthetic.",
  },
  {
    id: "viper",
    shortLabel: "VIPER",
    roleName: "CYBER VIPER",
    mkLabel: "MK.2",
    mkColorClass: "text-secondary",
    rotateDeg: 0.8,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJxoOqs58q6_Kgza48NVqi0KwR2857O4wLLdfSdVu_dcn86QCXnffgbidUvQQrWypzQsemU52MjTRMC-W7zp3Ccp2UadM3a4-9UgcIddg8sEUcwo8wykOCwUWNMHyw9xRS1h8lPFccBd6UX3ke0VW01tfY_539lsmECSzcE1sV3v8eSHrkmRv4TGXs0ZX0gHl61ZZl_YIyp46_yRT0HWAieNLms0nU4oLnIHuNew",
    imageAlt:
      "Underground punk cyber rogue sporting a serpentine mechanical eye patch, spike collar, and vibrant cyan cel-shaded ink highlights on charcoal textured comic paper.",
  },
  {
    id: "jack",
    shortLabel: "JACK",
    roleName: "RUST JACK",
    mkLabel: "MK.3",
    mkColorClass: "text-tertiary-fixed-dim",
    rotateDeg: -1.5,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSwFvSS_ZNXQcCqNA5IjawSDr-EnfQCAc7fmtP0NXVhTgz4sTfLmlw181jNnkeqHZt46H-8jBNT9GQZsHyd13hCchCz6mRtVA1QIgR2szYO-2BD2TaMKCadbi9usNBlUH3eH6DTdaEPIdExjuTgL4P-zh0FbyLZ8oEkOynSc6pVhPZKzSxtYh-omb1FcWe9giQ5rTrbLhBKeXM4D5VN41iHt6d7N7gazUds6yNEQ",
    imageAlt:
      "Grungy dieselpunk card hustler with an iron jaw plate, bowler cap, and distressed red halftone shading over a heavy ink line comic portrait.",
  },
  {
    id: "cogwheel",
    shortLabel: "COGWHEEL",
    roleName: "COGWHEEL",
    mkLabel: "MK.4",
    mkColorClass: "text-primary-fixed-dim",
    rotateDeg: 1.2,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAfNSYpMADAYAqrV0T1h5ZXAEC7gT9nRyGFIb0EX9nz3nwgrcvsOPjsnslJBeh1JoAga4Xs08JeJ45Gm0Fe83U1-zUQcLr4NUuf3SotgqgsRerWGOgYeAF0ptHAfkhtUnmHgoQ2JZW1W4aynmB4HpBbRoY3WZKqK3TIWA0fuAWD0kd-Y5HAvlWF435xzC02nfVEVIGq36e8dld8wgf5lHajSHkFjSrXVeTpRK_xg",
    imageAlt:
      "Tinkerer automaton mask with exposed brass gears, glowing amber ocular visor, and heavily inked pop-art linework on aged newsprint surface.",
  },
];

const CALLSIGN_PREFIXES = [
  "Scrap",
  "Rusty",
  "Neon",
  "Viper",
  "Bolt",
  "Junk",
  "Razor",
  "Chrome",
  "Rookie",
  "Hazard",
  "Anvil",
  "Blaster",
  "Deck",
  "Drifter",
  "Diesel",
];

const CALLSIGN_SUFFIXES = [
  "Runner",
  "Hustler",
  "Shark",
  "Grifter",
  "Jack",
  "Ace",
  "Dealer",
  "Rider",
  "Specter",
  "Bruiser",
  "Reaper",
  "Outlaw",
  "Wildcard",
  "Punk",
];

export interface MobileGuestSetupProps {
  avatars?: GuestAvatarOption[];
  initialCallsign?: string;
  onBack?: () => void;
  onStartPlaying?: (callsign: string, avatarId: string) => void;
}

export const MobileGuestSetup: React.FC<MobileGuestSetupProps> = ({
  avatars = GUEST_AVATARS,
  initialCallsign = "Scrap_Rookie_402",
  onBack,
  onStartPlaying,
}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(
    avatars[0]?.id ?? "bolt"
  );
  const [callsign, setCallsign] = useState<string>(initialCallsign);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const selectedAvatar =
    avatars.find((a) => a.id === selectedAvatarId) ?? avatars[0];

  const handleRollCallsign = () => {
    setIsRolling(true);
    window.setTimeout(() => setIsRolling(false), 250);
    const p =
      CALLSIGN_PREFIXES[Math.floor(Math.random() * CALLSIGN_PREFIXES.length)];
    const s =
      CALLSIGN_SUFFIXES[Math.floor(Math.random() * CALLSIGN_SUFFIXES.length)];
    const n = Math.floor(100 + Math.random() * 900);
    setCallsign(`${p}_${s}_${n}`);
  };

  const handleStartPlaying = () => {
    if (isJoining) return;
    setIsJoining(true);
    const chosenName = callsign.trim() || "Scrap_Rookie_402";
    onStartPlaying?.(chosenName, selectedAvatarId);
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
        <div className="flex flex-col w-full px-gutter-mobile py-space-sm space-y-space-md select-none overflow-x-hidden">
          {/* Top Navigation & Title Bar */}
          <div className="flex items-center justify-between gap-space-xs">
            <button
              aria-label="Go Back"
              className="w-10 h-10 bg-surface-container hover:bg-surface-variant active:scale-95 transition-transform flex items-center justify-center text-on-surface rounded shadow-md cursor-pointer"
              onClick={() => onBack?.()}
              style={{ transform: "rotate(-1deg)" }}
              type="button"
            >
              <span className="material-symbols-outlined text-body-lg">
                arrow_back
              </span>
            </button>
            <div className="flex-1 flex flex-col items-center">
              <div
                className="inline-block bg-primary-container text-on-primary-container px-space-xs py-0.5 rounded font-label-sm text-label-sm uppercase tracking-widest shadow-sm"
                style={{ transform: "rotate(1deg)" }}
              >
                SCRAP POKER // UNDERGROUND
              </div>
              <h1 className="font-headline-sm text-headline-sm text-primary tracking-wide uppercase mt-0.5">
                GUEST RUNNER SETUP
              </h1>
            </div>
            <div
              className="w-10 h-10 bg-surface-container-high flex items-center justify-center rounded text-primary-fixed shadow-md"
              style={{ transform: "rotate(1.5deg)" }}
            >
              <span
                className="material-symbols-outlined text-body-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
            </div>
          </div>

          {/* Starting Chips Loot Pouch Alert */}
          <div
            className="relative bg-surface-container-high rounded p-space-sm shadow-md flex items-center justify-between overflow-hidden"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <div className="flex items-center space-x-space-sm z-10">
              <div
                className="w-10 h-10 rounded bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm shadow-sm"
                style={{ transform: "rotate(-2deg)" }}
              >
                <span className="material-symbols-outlined text-body-lg">
                  toll
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary-fixed tracking-wider uppercase">
                  STARTING SEED STASH
                </span>
                <span className="font-headline-md text-headline-md text-primary tracking-tight leading-none">
                  +10,000 FREE SCRAP CHIPS
                </span>
              </div>
            </div>
            <div className="z-10 bg-surface-container-lowest px-space-xs py-1 rounded text-secondary font-label-sm text-label-sm uppercase font-bold tracking-widest">
              CLAIMED
            </div>
          </div>

          {/* Avatar Selector Section */}
          <div className="flex flex-col space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-body-sm text-primary-container">
                  shield_person
                </span>
                CHOOSE YOUR SCRAPPER MASK
              </span>
              <span
                className="font-label-md text-label-md bg-surface-container px-space-xs py-0.5 rounded text-secondary uppercase tracking-widest font-bold"
                id="selected-role-name"
              >
                {selectedAvatar?.roleName ?? "BOLT RUNNER"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-space-xs" id="avatar-grid">
              {avatars.map((avatar) => {
                const isSelected = avatar.id === selectedAvatarId;
                return (
                  <button
                    key={avatar.id}
                    className={`avatar-option group relative aspect-square ${
                      isSelected
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-surface-container text-on-surface hover:bg-surface-variant"
                    } rounded flex flex-col items-center justify-between p-1 transition-transform shadow-md cursor-pointer`}
                    data-avatar-id={avatar.id}
                    data-avatar-name={avatar.roleName}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    style={{ transform: `rotate(${avatar.rotateDeg}deg)` }}
                    type="button"
                  >
                    <span
                      className={`absolute top-1 right-1 bg-surface-container-lowest ${avatar.mkColorClass} px-1 rounded font-label-sm text-label-sm uppercase leading-none font-bold`}
                    >
                      {avatar.mkLabel}
                    </span>
                    <div className="w-full flex-1 flex items-center justify-center pt-2">
                      <img
                        alt={avatar.roleName}
                        className="w-12 h-12 object-cover rounded bg-surface-container-lowest pointer-events-none overflow-hidden"
                        src={avatar.imageUrl}
                      />
                    </div>
                    <span
                      className={`font-label-sm text-label-sm uppercase font-bold tracking-tight text-center leading-tight mt-1 ${
                        isSelected
                          ? "text-on-primary-container"
                          : "text-on-surface"
                      }`}
                    >
                      {avatar.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Callsign Input Box & Roll Action */}
          <div className="flex flex-col space-y-space-xs">
            <div className="flex items-center justify-between">
              <label
                className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant flex items-center gap-1"
                htmlFor="callsign-input"
              >
                <span className="material-symbols-outlined text-body-sm text-primary-container">
                  badge
                </span>
                GUEST CALLSIGN
              </label>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                TAP DICE TO RE-ROLL
              </span>
            </div>

            <div className="flex items-stretch gap-space-xs">
              <div
                className="relative flex-1 bg-surface-container-high rounded flex items-center shadow-md focus-within:bg-surface-variant transition-colors"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                <span className="pl-space-sm text-primary-fixed-dim font-headline-sm text-headline-sm select-none">
                  #
                </span>
                <input
                  className="w-full bg-transparent px-space-xs py-space-sm text-primary font-headline-sm text-headline-sm uppercase tracking-wide focus:outline-none placeholder:text-outline"
                  id="callsign-input"
                  maxLength={16}
                  onChange={(e) => setCallsign(e.target.value)}
                  type="text"
                  value={callsign}
                />
              </div>
              <button
                className="px-space-md bg-secondary text-on-secondary rounded flex flex-col items-center justify-center active:scale-95 transition-transform shadow-md hover:bg-secondary-fixed cursor-pointer"
                id="roll-button"
                onClick={handleRollCallsign}
                style={{ transform: "rotate(1.5deg)" }}
                type="button"
              >
                <span
                  className={`material-symbols-outlined text-body-lg transition-transform ${
                    isRolling ? "rotate-180" : ""
                  }`}
                  id="roll-icon"
                >
                  casino
                </span>
                <span className="font-label-sm text-label-sm uppercase font-extrabold tracking-wider leading-none mt-0.5">
                  ROLL
                </span>
              </button>
            </div>
          </div>

          {/* Distressed Guest Warning Notice Strip */}
          <div
            className="relative bg-primary text-on-primary rounded p-space-sm shadow-md"
            style={{ transform: "rotate(-1deg)" }}
          >
            <div className="flex items-start space-x-space-sm">
              <div
                className="bg-on-primary text-primary w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                style={{ transform: "rotate(4deg)" }}
              >
                <span className="material-symbols-outlined text-body-sm font-bold">
                  warning
                </span>
              </div>
              <div className="flex-1 flex flex-col space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm tracking-wide leading-tight text-on-primary">
                    GUEST NOTICE
                  </span>
                  <span className="font-label-sm text-label-sm bg-on-primary text-primary px-1 rounded font-bold">
                    LOCAL ONLY
                  </span>
                </div>
                <p className="font-body-sm text-body-sm leading-tight text-on-primary opacity-90">
                  Guest bankrolls and hand stats remain strictly on this device.
                  Create a permanent Scrap ID anytime in Settings to sync and back
                  up your winnings.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Trigger Action Section */}
          <div className="pt-space-xs flex flex-col space-y-space-xs">
            <button
              className={`w-full py-space-md px-space-lg bg-primary-container text-on-primary-container rounded shadow-xl flex items-center justify-center space-x-space-xs active:translate-y-0.5 active:translate-x-0.5 transition-all cursor-pointer ${
                isJoining ? "opacity-90" : ""
              }`}
              disabled={isJoining}
              id="start-game-btn"
              onClick={handleStartPlaying}
              style={{ transform: "rotate(0.8deg)" }}
              type="button"
            >
              {isJoining ? (
                <span className="font-display-lg-mobile text-display-lg-mobile tracking-wider uppercase leading-none">
                  JOINING POKER FELT...
                </span>
              ) : (
                <>
                  <span className="font-display-lg-mobile text-display-lg-mobile tracking-wider uppercase leading-none">
                    START PLAYING NOW
                  </span>
                  <span className="material-symbols-outlined text-headline-md font-bold">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center space-x-space-xs text-outline py-space-xs">
              <span className="material-symbols-outlined text-label-md">
                lock
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-center">
                NO SIGNUP REQUIRED • DIRECT TABLE ACCESS
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

