import React, { useState } from "react";

export interface DesktopLoginProps {
  onLoginSuccess?: () => void;
  onNavigateToRegister?: () => void;
  onNavigateToLobby?: () => void;
}

export const DesktopLogin: React.FC<DesktopLoginProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToLobby,
}) => {
  const [username, setUsername] = useState<string>("runner@scrappoker.io");
  const [password, setPassword] = useState<string>("highrollersyndicate2025");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleLoginSubmit = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onLoginSuccess?.();
    }, 800);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
<div className="fixed inset-0 pointer-events-none halftone-overlay opacity-80 z-0"></div><div className="fixed top-margin left-margin z-10 hidden sm:flex items-center gap-space-sm transform -rotate-1"><div className="bg-primary-container text-on-primary-container px-space-md py-space-xs shadow-[2px_2px_0px_#000000]"><span className="font-label-lg text-label-lg tracking-wider uppercase">STUDIO CUTOUT // LABS</span></div></div><div className="fixed bottom-margin right-margin z-10 hidden sm:flex items-center gap-space-sm transform rotate-1"><div className="bg-surface-container-high px-space-md py-space-xs text-on-surface-variant shadow-[2px_2px_0px_#000000]"><span className="font-label-sm text-label-sm uppercase">VER 1.0.4b // CEL-POP ENGINE</span></div></div><main className="relative z-10 w-full min-h-screen flex items-center justify-center p-gutter-mobile sm:p-gutter"><div className="flex flex-col w-full">
<div className="w-full max-w-7xl mx-auto py-space-sm sm:py-space-md">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
{/* Left Column: Stylized Cel-Pop Card Comic Fan Art */}
<div className="lg:col-span-7 flex flex-col items-center justify-center relative p-space-md sm:p-space-lg select-none">
{/* Comic Burst Background Backdrop */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-90">
<svg className="w-[140%] h-[140%] animate-pulse" fill="none" style={{ animationDuration: "8s" }} viewBox="0 0 500 500">
{/* Comic Halftone Action Burst Rays */}
<path d="M250 250 L210 0 L250 20 L290 0 Z" fill="#f9d130" opacity="0.12"></path>
<path d="M250 250 L420 50 L400 90 L490 120 Z" fill="#73d1ff" opacity="0.08"></path>
<path d="M250 250 L500 210 L480 250 L500 290 Z" fill="#f9d130" opacity="0.12"></path>
<path d="M250 250 L460 400 L420 420 L440 480 Z" fill="#ffb4aa" opacity="0.10"></path>
<path d="M250 250 L270 500 L250 480 L230 500 Z" fill="#f9d130" opacity="0.12"></path>
<path d="M250 250 L80 460 L110 430 L50 400 Z" fill="#73d1ff" opacity="0.08"></path>
<path d="M250 250 L0 280 L20 250 L0 220 Z" fill="#f9d130" opacity="0.12"></path>
<path d="M250 250 L50 90 L80 110 L40 40 Z" fill="#ffb4aa" opacity="0.10"></path>
</svg>
</div>
{/* Overline Torn Tape Badge */}
<div className="relative z-20 mb-space-md transform -rotate-2">
<div className="bg-primary-container text-on-primary-container px-space-md py-space-xs shadow-[3px_3px_0px_#000000] border-2 border-black flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px]">verified</span>
<span className="font-label-lg text-label-lg uppercase tracking-wider">SEASON 04 // ROYAL SYNDICATE OPEN</span>
</div>
</div>
{/* Scrap Playing Cards Fan Container */}
<div className="relative z-10 w-full max-w-lg h-72 sm:h-80 flex items-center justify-center my-space-sm">
{/* Card 1: 10 of Spades */}
<div className="absolute w-36 h-56 sm:w-44 sm:h-64 bg-primary text-on-surface rounded-none border-[3px] border-black shadow-[4px_4px_0px_#000000] p-space-sm flex flex-col justify-between transform -rotate-12 -translate-x-32 sm:-translate-x-44 translate-y-6 hover:translate-y-2 transition-transform duration-150">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md text-surface-container-lowest leading-none">10</span>
<span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
</div>
<div className="flex flex-col items-center justify-center opacity-85">
<span className="material-symbols-outlined text-4xl sm:text-5xl text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
<span className="font-label-sm text-label-sm text-surface-container-highest tracking-widest mt-1">X·OF·SPADES</span>
</div>
<div className="flex items-center justify-between rotate-180">
<span className="font-headline-md text-headline-md text-surface-container-lowest leading-none">10</span>
<span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
</div>
</div>
{/* Card 2: Jack of Spades (Diamond Accent Suit Color) */}
<div className="absolute w-36 h-56 sm:w-44 sm:h-64 bg-primary text-on-surface rounded-none border-[3px] border-black shadow-[4px_4px_0px_#000000] p-space-sm flex flex-col justify-between transform -rotate-6 -translate-x-16 sm:-translate-x-20 translate-y-3 hover:translate-y-0 transition-transform duration-150">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md text-secondary-container leading-none">J</span>
<span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
</div>
<div className="flex flex-col items-center justify-center">
<div className="w-16 h-20 bg-surface-container-high border-2 border-black flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 halftone-overlay opacity-40"></div>
<span className="font-display-lg text-headline-lg text-secondary-fixed">JACK</span>
</div>
</div>
<div className="flex items-center justify-between rotate-180">
<span className="font-headline-md text-headline-md text-secondary-container leading-none">J</span>
<span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
</div>
</div>
{/* Card 3: Queen of Hearts */}
<div className="absolute w-36 h-56 sm:w-44 sm:h-64 bg-primary text-on-surface rounded-none border-[3px] border-black shadow-[5px_5px_0px_#000000] p-space-sm flex flex-col justify-between transform rotate-0 z-10 translate-y-0 hover:-translate-y-3 transition-transform duration-150">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md text-on-tertiary-container leading-none">Q</span>
<span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
</div>
<div className="flex flex-col items-center justify-center">
<div className="w-20 h-24 bg-tertiary-container border-2 border-black p-1 flex flex-col items-center justify-center relative">
<span className="material-symbols-outlined text-3xl text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
<span className="font-label-md text-label-md text-on-tertiary-container uppercase mt-1">QUEEN</span>
</div>
</div>
<div className="flex items-center justify-between rotate-180">
<span className="font-headline-md text-headline-md text-on-tertiary-container leading-none">Q</span>
<span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
</div>
</div>
{/* Card 4: King of Clubs */}
<div className="absolute w-36 h-56 sm:w-44 sm:h-64 bg-primary text-on-surface rounded-none border-[3px] border-black shadow-[4px_4px_0px_#000000] p-space-sm flex flex-col justify-between transform rotate-6 translate-x-16 sm:translate-x-20 translate-y-3 hover:translate-y-0 transition-transform duration-150">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md text-surface-container-lowest leading-none">K</span>
<span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>filter_vintage</span>
</div>
<div className="flex flex-col items-center justify-center">
<div className="w-16 h-20 bg-surface-variant border-2 border-black flex items-center justify-center relative">
<span className="font-display-lg text-headline-lg text-primary">KING</span>
</div>
</div>
<div className="flex items-center justify-between rotate-180">
<span className="font-headline-md text-headline-md text-surface-container-lowest leading-none">K</span>
<span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>filter_vintage</span>
</div>
</div>
{/* Card 5: Ace of Spades (Master Ace) */}
<div className="absolute w-36 h-56 sm:w-44 sm:h-64 bg-primary text-on-surface rounded-none border-[3px] border-black shadow-[4px_4px_0px_#000000] p-space-sm flex flex-col justify-between transform rotate-12 translate-x-32 sm:translate-x-44 translate-y-6 hover:translate-y-2 transition-transform duration-150">
<div className="flex items-center justify-between">
<span className="font-headline-md text-headline-md text-surface-container-lowest leading-none">A</span>
<span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
</div>
<div className="flex flex-col items-center justify-center">
<span className="material-symbols-outlined text-5xl sm:text-6xl text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
<span className="font-label-sm text-label-sm text-surface-container-highest tracking-widest mt-1">SCRAP·ROYAL</span>
</div>
<div className="flex items-center justify-between rotate-180">
<span className="font-headline-md text-headline-md text-surface-container-lowest leading-none">A</span>
<span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
</div>
</div>
</div>
{/* Cel-Shaded Action Burst Callout */}
<div className="relative z-20 mt-space-md flex flex-col items-center">
<div className="bg-surface-container-high border-2 border-black px-space-lg py-space-sm shadow-[4px_4px_0px_#000000] transform rotate-1 text-center max-w-md">
<div className="flex items-center justify-center gap-space-xs text-secondary-fixed-dim">
<span className="material-symbols-outlined text-[20px]">local_fire_department</span>
<span className="font-display-lg text-headline-sm uppercase text-on-surface">READY TO SHUFFLE?</span>
<span className="material-symbols-outlined text-[20px]">local_fire_department</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              100% Free Social Card Battles · Zero Real-Money Risk
            </p>
</div>
{/* Bottom Micro Tag */}
<div className="mt-space-sm inline-flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
<span className="w-2 h-2 bg-primary-container inline-block"></span>
<span>SECURE RNG CERTIFIED CEL ENGINE // DESK-VER</span>
</div>
</div>
</div>
{/* Right Column: Authentication Panel */}
<div className="lg:col-span-5 flex flex-col justify-center">
{/* Main Card Container: High-Contrast Cel-Drop Bordered Box */}
<div className="w-full bg-surface-container-high border-[3px] border-black shadow-[6px_6px_0px_#000000] p-space-md sm:p-space-lg relative">
{/* Top Corner Graphic Stamp */}
<div className="absolute -top-3 -right-3 bg-primary-container text-on-primary-container px-space-xs py-0.5 border-2 border-black font-label-sm text-label-sm tracking-widest shadow-[2px_2px_0px_#000000] uppercase transform rotate-3">
            VERIFIED SECURE
          </div>
{/* Scrap Poker Brand Wordmark */}
<div className="flex items-center justify-between pb-space-xs">
<div className="flex items-center gap-space-xs">
<div className="w-8 h-8 bg-primary-container border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] transform -rotate-3">
<span className="font-display-lg text-headline-sm text-on-primary-container leading-none">S</span>
</div>
<span className="font-display-lg text-headline-md tracking-wider text-primary">SCRAP POKER</span>
</div>
<div className="bg-surface-container-low px-space-sm py-0.5 border border-black text-on-surface-variant font-label-sm text-label-sm uppercase">
              DECK V1.0
            </div>
</div>
{/* Header & Subtitle */}
<div className="mt-space-sm">
<h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-wide">WELCOME BACK, PLAYER!</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Enter the syndicate card yard and claim your hourly chips.</p>
</div>
{/* Quick OAuth Action Buttons */}
<div className="mt-space-md flex flex-col gap-space-sm">
{/* Google Button */}
<button className="w-full bg-primary text-surface-container-lowest border-[3px] border-black p-space-sm flex items-center justify-center gap-space-sm shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all duration-75" type="button">
<svg className="w-5 h-5" viewBox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
</svg>
<span className="font-label-lg text-label-lg tracking-wider uppercase">CONTINUE WITH GOOGLE</span>
</button>
{/* Guest Fast Play Button */}
<button
  className="w-full bg-secondary text-on-secondary-container border-[3px] border-black p-space-sm flex items-center justify-center gap-space-sm shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all duration-75"
  type="button"
  onClick={() => onNavigateToLobby?.()}
>
<span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>casino</span>
<span className="font-label-lg text-label-lg tracking-wider uppercase">CONTINUE AS GUEST (10K SEED)</span>
</button>
</div>
{/* Comic Distressed Divider */}
<div className="relative my-space-md flex items-center justify-center">
<div className="w-full border-b-2 border-black border-dashed"></div>
<span className="absolute bg-surface-container-high px-space-sm font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">
              OR ENTER WITH SCRAP ID / EMAIL
            </span>
</div>
{/* Email Login Form */}
<form className="flex flex-col gap-space-md" id="scrapLoginForm" onSubmit={(e) => { e.preventDefault(); handleLoginSubmit(); }}>
{/* Email Field */}
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center justify-between" htmlFor="scrapEmailInput">
<span>SCRAP ID OR EMAIL</span>
<span className="text-outline font-label-sm text-label-sm">REQUIRED</span>
</label>
<div className="relative">
<input
  className="w-full bg-surface-container-low text-on-surface border-[3px] border-black p-space-sm pl-9 font-body-lg text-body-lg placeholder:text-outline-variant focus:outline-none focus:bg-surface-bright focus:border-primary-container shadow-[2px_2px_0px_#000000] transition-colors"
  id="scrapEmailInput"
  placeholder="runner@scrappoker.io"
  required
  type="email"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
<span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">badge</span>
</div>
</div>
{/* Password Field */}
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center justify-between" htmlFor="scrapPasswordInput">
<span>SECURITY KEY / PASSCODE</span>
<span className="text-primary-container font-label-sm text-label-sm uppercase" id="passStrengthIndicator">STRONG</span>
</label>
<div className="relative">
<input
  className="w-full bg-surface-container-low text-on-surface border-[3px] border-black p-space-sm pl-9 pr-16 font-body-lg text-body-lg placeholder:text-outline-variant focus:outline-none focus:bg-surface-bright focus:border-primary-container shadow-[2px_2px_0px_#000000] transition-colors"
  id="scrapPasswordInput"
  placeholder="••••••••••••"
  required
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
<span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">lock</span>
{/* Show / Hide Button */}
<button
  className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-container-highest text-on-surface border border-black px-space-xs py-0.5 font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-bright transition-colors select-none"
  id="togglePasswordBtn"
  onClick={() => setShowPassword(!showPassword)}
  type="button"
>
  {showPassword ? "HIDE" : "SHOW"}
</button>
</div>
</div>
{/* Checkbox & Forgot Password Row */}
<div className="flex items-center justify-between text-on-surface">
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input defaultChecked className="w-4 h-4 rounded-none bg-surface-container-low border-2 border-black accent-primary-container cursor-pointer" type="checkbox"/>
<span className="font-label-md text-label-md uppercase tracking-wide">REMEMBER ME</span>
</label>
<a className="font-label-md text-label-md uppercase tracking-wide text-primary-container hover:underline underline-offset-2" href="#">
  FORGOT PASSCODE?
</a>
</div>
{/* Primary Action Button: SIGN IN TO TABLE */}
<div className="pt-space-xs">
<button
  className="w-full bg-primary-container text-on-primary-container border-[3px] border-black p-space-sm sm:p-space-md font-headline-md text-headline-md tracking-wider uppercase shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all duration-75 flex items-center justify-center gap-space-sm transform -rotate-1 hover:rotate-0"
  id="submitLoginBtn"
  type="submit"
>
  {isConnecting ? (
    <>
      <span>CONNECTING...</span>
      <span className="material-symbols-outlined animate-spin text-[24px]">autorenew</span>
    </>
  ) : (
    <>
      <span>SIGN IN TO TABLE</span>
      <span className="material-symbols-outlined text-[24px]">login</span>
    </>
  )}
</button>
</div>
</form>
{/* Card Footer Meta Actions */}
<div className="mt-space-md pt-space-sm border-t border-black flex flex-col gap-space-xs text-center">
<div className="font-body-md text-body-md text-on-surface">
<span>NEW TO THE SCRAP YARD? </span>
<button
  className="font-label-lg text-label-lg text-secondary-fixed-dim hover:text-secondary hover:underline underline-offset-4 ml-1 bg-transparent border-none p-0 cursor-pointer"
  onClick={(e) => {
    e.preventDefault();
    onNavigateToRegister?.();
  }}
>
  CREATE FREE ACCOUNT →
</button>
</div>
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
  BY ENTERING, YOU AGREE TO OUR TERMS & PRIVACY POLICY. PLAY MONEY ONLY.
</p>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
);
};

export default DesktopLogin;
