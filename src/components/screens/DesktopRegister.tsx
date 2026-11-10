import React, { useState } from "react";

export interface DesktopRegisterProps {
  onRegisterSuccess?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToLobby?: () => void;
}

export const DesktopRegister: React.FC<DesktopRegisterProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  onNavigateToLobby,
}) => {
  const [callsign, setCallsign] = useState<string>("Cyber_Ace_88");
  const [password, setPassword] = useState<string>("highroller2026");
  const [confirmPassword, setConfirmPassword] = useState<string>("highroller2026");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSuccess?.();
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
<div className="fixed inset-0 pointer-events-none halftone-overlay opacity-80 z-0"></div><div className="fixed top-margin left-margin z-10 hidden sm:flex items-center gap-space-sm transform -rotate-1"><div className="bg-primary-container text-on-primary-container px-space-md py-space-xs shadow-[2px_2px_0px_#000000]"><span className="font-label-lg text-label-lg tracking-wider uppercase">STUDIO CUTOUT // LABS</span></div></div><div className="fixed bottom-margin right-margin z-10 hidden sm:flex items-center gap-space-sm transform rotate-1"><div className="bg-surface-container-high px-space-md py-space-xs text-on-surface-variant shadow-[2px_2px_0px_#000000]"><span className="font-label-sm text-label-sm uppercase">VER 1.0.4b // CEL-POP ENGINE</span></div></div><main className="relative z-10 w-full min-h-screen flex items-center justify-center p-gutter-mobile sm:p-gutter"><div className="flex flex-col w-full max-w-7xl mx-auto px-gutter-mobile sm:px-gutter py-space-lg relative">
{/* TOP DECORATIVE STRIP / BANNER OVERLAY */}
<div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg relative z-10">
<div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs shadow-[3px_3px_0px_#000000] -rotate-1">
<span className="material-symbols-outlined text-primary-container text-body-lg">verified_user</span>
<span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">SYN-ID // SECURE TERMINAL REGISTRY</span>
</div>
<div className="inline-flex items-center gap-space-sm bg-error-container text-on-error-container px-space-md py-space-xs shadow-[3px_3px_0px_#000000] rotate-1">
<span className="material-symbols-outlined text-body-md animate-pulse">crisis_alert</span>
<span className="font-headline-sm text-headline-sm tracking-wide uppercase">SEASON 04 LAUNCH: AIRDROP LIVE</span>
</div>
</div>
{/* MAIN 2-COLUMN COLLAGE GRID */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start relative z-10">
{/* LEFT COLUMN: REWARDS / COMIC ARTWORK / LORE VALUE PROPOSITION */}
<div className="lg:col-span-6 flex flex-col gap-space-lg relative">
{/* HERO BADGE / COMIC STAMP */}
<div className="relative w-fit -rotate-2">
<div className="bg-primary-container text-on-primary-container px-space-lg py-space-xs shadow-[4px_4px_0px_#000000]">
<span className="font-headline-md text-headline-md uppercase tracking-wider block">INSTANT SIGN-UP BONUS!</span>
</div>
{/* Jagged pop tag sticker */}
<div className="absolute -top-3 -right-6 bg-error text-on-error font-headline-sm text-headline-sm px-space-sm py-0 shadow-[2px_2px_0px_#000000] rotate-12 uppercase">
          BAM!
        </div>
</div>
{/* MAIN HEADLINE BLOCK */}
<div className="bg-surface-container-high p-space-lg shadow-[6px_6px_0px_#000000] relative overflow-hidden">
<div className="absolute -right-10 -bottom-8 pointer-events-none opacity-10">
<span className="material-symbols-outlined text-[200px] leading-none text-primary-fixed">style</span>
</div>
<p className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed-dim mb-space-xs">// UNDERGROUND SCRAP CIRCUIT</p>
<h1 className="font-display-xl text-display-xl uppercase leading-none tracking-tight text-on-surface drop-shadow-[2px_2px_0px_#000000]">
          CLAIM YOUR SEAT.<br/>
<span className="text-primary-container bg-surface-container-lowest px-space-xs inline-block transform -rotate-1 mt-space-xs">
            TAKE THE POT.
          </span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-xl">
          High-velocity Texas Hold'em fueled by raw scrap stakes and custom cel-shaded avatars. No bland green felt—only high-roller syndicate play.
        </p>
</div>
{/* ARTWORK ILLUSTRATION CARD */}
<div className="relative w-full rounded-none overflow-hidden shadow-[6px_6px_0px_#000000] bg-surface-container-low">
<div className="relative h-64 sm:h-72 w-full overflow-hidden">
<img className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300" data-alt="A gritty graphic novel comic illustration of cyberpunk card hustlers playing poker in an underground neon alleyway. High contrast ink outlines, screentone halftone dots, bold cel-shaded lighting in acid yellow, vibrant cyan, and deep charcoal black, featuring metallic playing cards and scrap mech chips." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB5Vz8DoDAFXkIs98Ud0hRANZMoe5VdE1aOefN4gjulW4lC_qvgr-QMTDR8WYalQE-8wAaG_o9Dm4p2ZOQWCZJMACWPDDSgQVV2ykplSgH7uER_-l9Cbl1rJ3APFtiwW2wfzr4RMxIOg0TuxXzoQscXSiwAKLweu2SFGS3fCe0pvnLwSbNWOJaqYpQOnm1OK_ncmjCjCkF4i_mDAIbNtLNmhRoz4RS6onfPfkQgA"/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
{/* Comic Burst Floating Decal */}
<div className="absolute top-space-md right-space-md bg-secondary-container text-on-secondary-container px-space-md py-space-xs rotate-3 shadow-[3px_3px_0px_#000000]">
<span className="font-headline-sm text-headline-sm uppercase tracking-wider block">FREE CHIPS</span>
</div>
{/* Bottom Card Detail Label */}
<div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between bg-surface-container/95 p-space-sm shadow-[2px_2px_0px_#000000] -rotate-1">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-headline-sm">token</span>
<span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface">STARTING BANKROLL DEPOSIT</span>
</div>
<span className="font-headline-sm text-headline-sm text-primary-container bg-surface-container-lowest px-space-sm py-space-xs">+50,000</span>
</div>
</div>
</div>
{/* VALUE PROPS / PERKS TICKER (Bento-style torn tags) */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
{/* Perk 1 */}
<div className="bg-surface-container-high p-space-md shadow-[4px_4px_0px_#000000] flex flex-col justify-between -rotate-1 hover:rotate-0 transition-transform">
<div className="flex items-center justify-between mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-headline-md">savings</span>
<span className="font-label-sm text-label-sm text-primary-fixed bg-surface-container-lowest px-space-xs">PERK 01</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm uppercase text-on-surface leading-tight">+50K SCRAP CHIPS</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">Credited instantly upon registration confirmation.</p>
</div>
</div>
{/* Perk 2 */}
<div className="bg-surface-container-high p-space-md shadow-[4px_4px_0px_#000000] flex flex-col justify-between rotate-1 hover:rotate-0 transition-transform">
<div className="flex items-center justify-between mb-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-md">badge</span>
<span className="font-label-sm text-label-sm text-secondary-fixed bg-surface-container-lowest px-space-xs">PERK 02</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm uppercase text-on-surface leading-tight">SCRAP RUNNER IDS</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">Unlock exclusive cel-pop deck banners and avatars.</p>
</div>
</div>
{/* Perk 3 */}
<div className="bg-surface-container-high p-space-md shadow-[4px_4px_0px_#000000] flex flex-col justify-between -rotate-1 hover:rotate-0 transition-transform">
<div className="flex items-center justify-between mb-space-sm">
<span className="material-symbols-outlined text-tertiary-fixed-dim text-headline-md">swords</span>
<span className="font-label-sm text-label-sm text-tertiary-fixed bg-surface-container-lowest px-space-xs">PERK 03</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm uppercase text-on-surface leading-tight">CLANS & BRACKETS</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">Entry pass to weekly high-roller scrap tournaments.</p>
</div>
</div>
</div>
{/* LIVE REGISTER COUNTER STRIP */}
<div className="flex items-center justify-between bg-surface-container-lowest p-space-md shadow-[3px_3px_0px_#000000] rotate-1">
<div className="flex items-center gap-space-sm">
<span className="w-3 h-3 bg-primary-container rounded-none inline-block shadow-[1px_1px_0px_#000000]"></span>
<span className="font-label-md text-label-md uppercase text-on-surface">ONLINE RUNNERS: 14,892 ACTIVE NOW</span>
</div>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">REGION // NA-WEST SYNDICATE</span>
</div>
</div>
{/* RIGHT COLUMN: THE REGISTRATION FORM CONTAINER (Torn Paper Charcoal Module) */}
<div className="lg:col-span-6 relative">
{/* Comic floating tape stamp top corner */}
<div className="absolute -top-4 -right-2 z-20 bg-primary-fixed text-on-primary-fixed px-space-md py-space-xs shadow-[3px_3px_0px_#000000] rotate-6">
<span className="font-headline-sm text-headline-sm uppercase">FREE REFILL DAILY</span>
</div>
<div className="bg-surface-container-low p-space-lg sm:p-space-xl shadow-[8px_8px_0px_#000000] relative">
{/* Form Heading Area */}
<div className="mb-space-lg pb-space-md bg-surface-container p-space-md shadow-[3px_3px_0px_#000000] -rotate-0.5">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container bg-surface-container-lowest px-space-xs py-0.5">
              NEW PROFILE PROTOCOL
            </span>
<span className="font-label-sm text-label-sm uppercase text-outline">STEP 1 OF 1</span>
</div>
<h2 className="font-display-lg text-display-lg uppercase tracking-tight text-on-surface mt-space-xs">
            CREATE SCRAP RUNNER ID
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
            Join the underground table syndicate. Lock in your handle and bank the chips.
          </p>
</div>
<form className="flex flex-col gap-space-md" id="scrap-register-form" onSubmit={handleSubmit}>
{/* INPUT 1: USERNAME / CALLSIGN */}
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<label className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface flex items-center gap-space-xs" htmlFor="callsign-input">
<span>USERNAME / CALLSIGN</span>
<span className="text-error">*</span>
</label>
<div className="inline-flex items-center gap-1 bg-surface-container px-space-xs py-0.5 text-secondary text-label-sm font-label-sm shadow-[1px_1px_0px_#000000]" id="username-status">
<span className="material-symbols-outlined text-sm">check_circle</span>
<span>AVAILABLE</span>
</div>
</div>
<div className="relative">
<input
  className="w-full bg-surface-container-highest text-on-surface font-body-lg text-body-lg px-space-md py-space-sm placeholder:text-outline focus:outline-none focus:bg-surface-bright shadow-[4px_4px_0px_#000000] transition-colors"
  id="callsign-input"
  placeholder="e.g. Cyber_Ace_88"
  required
  type="text"
  value={callsign}
  onChange={(e) => setCallsign(e.target.value)}
/>
<span className="absolute right-space-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-body-lg">
  sports_esports
</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Must be 4-16 alphanumeric characters. Visible at all tables.</span>
</div>
{/* INPUT 2: EMAIL ADDRESS */}
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<label className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface flex items-center gap-space-xs" htmlFor="email-input">
<span>EMAIL ADDRESS</span>
<span className="text-error">*</span>
</label>
<span className="font-label-sm text-label-sm text-outline">USED FOR RECOVERY ONLY</span>
</div>
<div className="relative">
<input className="w-full bg-surface-container-highest text-on-surface font-body-lg text-body-lg px-space-md py-space-sm placeholder:text-outline focus:outline-none focus:bg-surface-bright shadow-[4px_4px_0px_#000000] transition-colors" id="email-input" placeholder="ace@underground.io" required type="email"/>
<span className="absolute right-space-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-body-lg">
  alternate_email
</span>
</div>
</div>
{/* PASSWORDS DUAL ROW */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
{/* INPUT 3: PASSWORD */}
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<label className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface" htmlFor="pass-input">
  PASSWORD <span className="text-error">*</span>
</label>
</div>
<div className="relative">
<input
  className="w-full bg-surface-container-highest text-on-surface font-body-lg text-body-lg px-space-md py-space-sm placeholder:text-outline focus:outline-none focus:bg-surface-bright shadow-[4px_4px_0px_#000000] transition-colors"
  id="pass-input"
  placeholder="••••••••••••"
  required
  type={showPass ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
<button className="absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer" onClick={() => setShowPass(!showPass)} type="button">
<span className="material-symbols-outlined text-body-lg">visibility</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Min 8 chars, 1 number.</span>
</div>
{/* INPUT 4: CONFIRM PASSWORD */}
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<label className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface" htmlFor="confirm-pass-input">
  CONFIRM <span className="text-error">*</span>
</label>
<div className="inline-flex items-center gap-1 bg-surface-container px-space-xs py-0.5 text-primary text-label-sm font-label-sm shadow-[1px_1px_0px_#000000]" id="password-match-badge">
<span className="material-symbols-outlined text-sm">lock</span>
<span>MATCH CHECK</span>
</div>
</div>
<div className="relative">
<input
  className="w-full bg-surface-container-highest text-on-surface font-body-lg text-body-lg px-space-md py-space-sm placeholder:text-outline focus:outline-none focus:bg-surface-bright shadow-[4px_4px_0px_#000000] transition-colors"
  id="confirm-pass-input"
  placeholder="••••••••••••"
  required
  type={showConfirmPass ? "text" : "password"}
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
<button className="absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)} type="button">
<span className="material-symbols-outlined text-body-lg">visibility</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-outline">Repeat password to verify.</span>
</div>
</div>
{/* CHECKBOX CLAUSE */}
<div className="bg-surface-container p-space-md shadow-[3px_3px_0px_#000000] mt-space-xs">
<label className="flex items-start gap-space-md cursor-pointer group">
<div className="relative flex items-center pt-0.5">
<input
  className="sr-only peer"
  id="terms-check"
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
<div className="w-6 h-6 bg-surface-container-lowest peer-checked:bg-primary-container shadow-[2px_2px_0px_#000000] flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-on-primary-container font-bold text-headline-sm select-none opacity-0 peer-checked:opacity-100">
  check
</span>
</div>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
<span className="text-on-surface font-body-md text-body-md block mb-0.5">TERMS & SCRAP FAIR-PLAY PROTOCOLS</span>
  I agree to the <a className="text-secondary underline hover:text-secondary-fixed" href="#">Terms of Service</a>, <a className="text-secondary underline hover:text-secondary-fixed" href="#">Fair Play Rules</a>, and <a className="text-secondary underline hover:text-secondary-fixed" href="#">Privacy Policy</a>. I certify I am 18+ years old for social poker simulation.
</div>
</label>
</div>
{/* PRIMARY ACTION CTA BUTTON */}
<div className="mt-space-sm relative">
<button className="w-full bg-primary-container text-on-primary-container py-space-md px-space-lg shadow-[6px_6px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-[1px_1px_0px_#000000] transition-all flex items-center justify-center gap-space-sm group cursor-pointer -rotate-1 hover:rotate-0" id="register-btn" type="submit">
<span className="material-symbols-outlined text-headline-md text-on-primary-container group-hover:rotate-12 transition-transform">
  local_fire_department
</span>
<span className="font-headline-md text-headline-md uppercase tracking-wider text-on-primary-container">
  REGISTER & CLAIM 50,000 SCRAP!
</span>
</button>
</div>
{/* DIVIDER WITH POP-STYLE TEXT */}
<div className="relative flex py-space-sm items-center">
<div className="flex-grow bg-outline-variant h-0.5"></div>
<span className="flex-shrink mx-space-md font-label-md text-label-md uppercase tracking-widest text-outline bg-surface-container-low px-space-sm">
  OR CHOOSE ALTERNATIVE
</span>
<div className="flex-grow bg-outline-variant h-0.5"></div>
</div>
{/* ALTERNATE ACTIONS: SIGN IN / GUEST ACCESS */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
{/* ALREADY HAVE ID */}
<button
  className="bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-sm px-space-md shadow-[4px_4px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000000] transition-all flex items-center justify-center gap-space-xs rotate-0.5 hover:rotate-0 cursor-pointer"
  type="button"
  onClick={() => onNavigateToLogin?.()}
>
<span className="material-symbols-outlined text-headline-sm text-secondary">vpn_key</span>
<span className="font-headline-sm text-headline-sm uppercase tracking-wide">SIGN IN HERE</span>
</button>
{/* GUEST ACCESS */}
<button
  className="bg-surface-container-high hover:bg-surface-bright text-on-surface py-space-sm px-space-md shadow-[4px_4px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000000] transition-all flex items-center justify-center gap-space-xs -rotate-0.5 hover:rotate-0 cursor-pointer"
  type="button"
  onClick={() => onNavigateToLobby?.()}
>
<span className="material-symbols-outlined text-headline-sm text-on-surface-variant">person_outline</span>
<span className="font-headline-sm text-headline-sm uppercase tracking-wide">GUEST PASS</span>
</button>
</div>
{/* SECURITY BADGE FOOTER NOTE */}
<div className="mt-space-xs flex items-center justify-center gap-space-sm text-on-surface-variant">
<span className="material-symbols-outlined text-sm">shield</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider">
              256-BIT ENCRYPTED VAULT // NO REAL-MONEY CASINO GAMBLING
            </span>
</div>
</form>
</div>
</div>
</div>
{/* INTERACTIVITY SCRIPT (Client Micro-interactions) */}

</div></main>
    </div>
  );
};

export default DesktopRegister;
