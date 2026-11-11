import React, { useState } from "react";

export interface MobileLoginProps {
  onLoginSuccess?: (scrapId?: string) => void;
  onGoogleLogin?: () => void;
  onGuestPlay?: () => void;
  onNavigateToRegister?: () => void;
}

export const MobileLogin: React.FC<MobileLoginProps> = ({
  onLoginSuccess,
  onGoogleLogin,
  onGuestPlay,
  onNavigateToRegister,
}) => {
  const [scrapId, setScrapId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess?.(scrapId || "ACE_HUNTER_99");
    }, 1200);
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
        <div className="flex flex-col w-full px-margin-mobile pb-space-xl overflow-x-hidden select-none">
          {/* Top Visual Scrap Emblem & Greeting */}
          <div className="relative w-full flex flex-col items-center pt-space-xs mb-space-md">
            {/* Action Burst Label Tape */}
            <div className="inline-flex items-center px-space-md py-0.5 bg-primary-container text-on-primary-container shadow-md -rotate-2 rounded">
              <span
                className="material-symbols-outlined text-[16px] mr-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="font-headline-sm text-headline-sm uppercase tracking-wider">
                UNDERGROUND FELT
              </span>
            </div>

            {/* Comic Card Fan Illustration */}
            <div className="relative w-36 h-28 my-space-xs flex items-center justify-center">
              {/* Ace of Spades (Tilted Left) */}
              <div className="absolute w-20 h-28 bg-[#f2eee4] text-[#101012] rounded-lg shadow-xl -rotate-12 -translate-x-4 flex flex-col justify-between p-1.5 transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between leading-none">
                  <span className="font-headline-md text-headline-md text-[#101012]">
                    A
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#101012]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[32px] text-[#101012]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
                <div className="flex items-center justify-between rotate-180 leading-none">
                  <span className="font-headline-md text-headline-md text-[#101012]">
                    A
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#101012]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
              </div>

              {/* King of Spades (Tilted Right) */}
              <div className="absolute w-20 h-28 bg-[#f2eee4] text-[#101012] rounded-lg shadow-xl rotate-6 translate-x-4 flex flex-col justify-between p-1.5 transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between leading-none">
                  <span className="font-headline-md text-headline-md text-[#101012]">
                    K
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#101012]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[26px] text-[#101012]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    sports_esports
                  </span>
                  <span className="font-label-sm text-label-sm text-[#101012]">
                    VIP
                  </span>
                </div>
                <div className="flex items-center justify-between rotate-180 leading-none">
                  <span className="font-headline-md text-headline-md text-[#101012]">
                    K
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#101012]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
              </div>

              {/* Comic Burst Badge ("NO LIMIT") */}
              <div className="absolute -bottom-2 bg-error-container text-on-error-container px-space-sm py-0.5 rounded shadow-md rotate-3 flex items-center gap-1">
                <span className="font-headline-sm text-headline-sm tracking-wider uppercase">
                  NO LIMIT
                </span>
              </div>
            </div>

            {/* Title Callout */}
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-wide uppercase mt-1 mb-0 drop-shadow">
              SCRAP POKER
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant uppercase tracking-widest -mt-1">
              WELCOME BACK, PLAYER!
            </p>
          </div>

          {/* Fast 1-Tap Authorization Stack */}
          <div className="flex flex-col gap-space-sm w-full">
            {/* Google 1-Tap Button */}
            <button
              className="w-full h-12 bg-tertiary text-on-tertiary-fixed rounded-lg shadow-md flex items-center justify-center px-gutter active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              onClick={() => (onGoogleLogin ?? onLoginSuccess)?.()}
              type="button"
            >
              <svg className="w-5 h-5 mr-space-sm shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                ></path>
              </svg>
              <span className="font-headline-sm text-headline-sm tracking-wide">
                CONTINUE WITH GOOGLE
              </span>
            </button>

            {/* Quick Guest Play Button (10K Seed) */}
            <button
              className="w-full h-12 bg-secondary-container text-on-secondary-container rounded-lg shadow-md flex items-center justify-between px-space-md active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              onClick={() => onGuestPlay?.()}
              type="button"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  casino
                </span>
                <span className="font-headline-sm text-headline-sm uppercase tracking-wide">
                  QUICK GUEST PLAY
                </span>
              </div>
              <span className="bg-surface-container-lowest text-secondary-fixed font-label-md text-label-md px-2 py-0.5 rounded shadow-sm">
                +10K SEED
              </span>
            </button>
          </div>

          {/* Distressed Tape Divider */}
          <div className="relative w-full my-space-md flex items-center justify-center">
            <div className="w-full h-0.5 bg-surface-variant"></div>
            <div className="absolute px-space-sm py-0.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded uppercase tracking-widest shadow-sm">
              OR SIGN IN WITH SCRAP ID
            </div>
          </div>

          {/* Traditional Form Block */}
          <form
            className="flex flex-col gap-space-sm w-full"
            id="scrapLoginForm"
            onSubmit={handleSubmit}
          >
            {/* Email / Scrap ID Input */}
            <div className="flex flex-col gap-0.5">
              <label
                className="font-label-md text-label-md text-primary-fixed uppercase tracking-wider flex items-center gap-1"
                htmlFor="scrapIdInput"
              >
                <span className="material-symbols-outlined text-[14px]">
                  badge
                </span>
                SCRAP ID / EMAIL
              </label>
              <div className="relative w-full">
                <input
                  autoComplete="username"
                  className="w-full h-12 px-space-md bg-surface-container-high text-on-surface placeholder:text-outline font-body-lg text-body-lg rounded-lg shadow-sm focus:outline-none focus:bg-surface-bright transition-colors"
                  id="scrapIdInput"
                  onChange={(e) => setScrapId(e.target.value)}
                  placeholder="ACE_HUNTER_99"
                  type="text"
                  value={scrapId}
                />
              </div>
            </div>

            {/* Password Input with Toggle */}
            <div className="flex flex-col gap-0.5">
              <label
                className="font-label-md text-label-md text-primary-fixed uppercase tracking-wider flex items-center gap-1"
                htmlFor="passwordInput"
              >
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                SECRET PIN / PASS
              </label>
              <div className="relative w-full flex items-center">
                <input
                  autoComplete="current-password"
                  className="w-full h-12 pl-space-md pr-12 bg-surface-container-high text-on-surface placeholder:text-outline font-body-lg text-body-lg rounded-lg shadow-sm focus:outline-none focus:bg-surface-bright transition-colors"
                  id="passwordInput"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  id="togglePasswordBtn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    id="pwdEyeIcon"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password Link */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  checked={rememberMe}
                  className="w-4 h-4 rounded bg-surface-container-highest accent-primary-container cursor-pointer"
                  id="rememberMe"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  type="checkbox"
                />
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wide">
                  REMEMBER ME
                </span>
              </label>
              <button
                className="font-label-md text-label-md text-secondary-fixed hover:text-primary transition-colors uppercase tracking-wider cursor-pointer"
                type="button"
              >
                FORGOT PASS?
              </button>
            </div>

            {/* Big Primary Action Button */}
            <button
              className={`mt-space-xs w-full min-h-[50px] bg-primary-container text-on-primary-container rounded-lg shadow-lg flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer ${
                isSubmitting ? "opacity-90" : ""
              }`}
              id="submitTableBtn"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[22px]">
                    sync
                  </span>
                  <span className="font-headline-md text-headline-md uppercase tracking-wider">
                    ENTERING ROOM...
                  </span>
                </>
              ) : (
                <>
                  <span className="font-headline-md text-headline-md tracking-wider uppercase">
                    SIGN IN TO TABLE
                  </span>
                  <span className="material-symbols-outlined text-[22px]">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Community Reroute & Disclaimer */}
          <div className="flex flex-col items-center mt-space-md gap-space-xs w-full text-center">
            <div className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
              <span>NEW TO THE UNDERGROUND?</span>
              <button
                className="font-headline-sm text-headline-sm text-primary uppercase tracking-wide hover:underline cursor-pointer"
                onClick={() => onNavigateToRegister?.()}
                type="button"
              >
                CREATE ID
              </button>
            </div>
            <div className="bg-surface-container-low text-outline font-label-sm text-label-sm px-space-md py-1 rounded max-w-xs mt-1">
              VIRTUAL CHIPS ONLY • FOR ENTERTAINMENT PURPOSES • 18+
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

