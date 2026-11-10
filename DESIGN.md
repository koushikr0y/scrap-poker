---
name: Monte Carlo Royale
project_id: 672511945144170203
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#9bd2b8'
  on-secondary: '#003827'
  secondary-container: '#19503c'
  on-secondary-container: '#8ac1a7'
  tertiary: '#ffbfb8'
  on-tertiary: '#680007'
  tertiary-container: '#ff968d'
  on-tertiary-container: '#90000e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#b6efd4'
  secondary-fixed-dim: '#9bd2b8'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#19503c'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ac'
  on-tertiary-fixed: '#410003'
  on-tertiary-fixed-variant: '#93000f'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-numeric-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: 0.02em
  label-numeric-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-caps-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  card: 0.375rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

# Monte Carlo Royale Design System

Extracted from Stitch Project: `672511945144170203` (Prestige Texas Hold'em Platform)

## Brand & Visual Philosophy
This design system establishes an ultra-exclusive, high-stakes digital salon inspired by the private gaming rooms of Monaco and Mayfair. The visual identity merges Old World European gaming heritage with bespoke contemporary luxury.

Key design principles:
- **Tactile Skeuomorphic Restraint:** Subtle felt micro-textures, polished metallic edge reflections, and realistic lighting models paired with flat, crisp tabular statistics.
- **Glassmorphic VIP Overlays:** Frosted dark crystal panels (`backdrop-blur: 16px-24px`) finished with delicate, sub-pixel gold leaf filigree borders (`rgba(212, 175, 55, 0.25)`).
- **Atmospheric Contrast:** Deep midnight spatial voids (`#0B0F17`) contrasting against focused overhead spotlight pools on velvet green felt (`#0D4734`).

## Color Palettes

### Primary Spectrum (Bullion Gold)
- **Primary Base (`#D4AF37`):** Pure bullion gold used for key action triggers, pot totals, leaderboards, and VIP insignias.
- **Gold Bright (`#F2CA50`):** Interactive highlights and prominent CTA text.
- **Gold Highlight (`#FDF0CD`):** Glint specular reflections and primary typography highlights.
- **Gold Burnished (`#9A7B1C`):** Inner bevels, tertiary borders, and inactive gold emblems.

### Environmental Spectrum (Casino Velvet Felt)
- **Table Felt Center (`#0D4734`):** Radial spotlight focus core.
- **Table Felt Perimeter (`#083324`):** Vignette edge drop-off.
- **Felt Rail Cushion (`#051D15`):** Padded boundary defining the betting surface.
- **Felt Accent Text (`#9BD2B8`):** Muted mint for table-related stats and secondary chips.

### Neutral Spectrum (Midnight & Charcoal)
- **Canvas / Void (`#0B0F17`):** Base environmental ground.
- **App Surface (`#0F131C`):** Root application and panel backdrop.
- **Surface Elevation 1 (`#121620`):** Player seats, action deck tray, chat surfaces.
- **Surface Elevation 2 (`#1B2232`):** Floating modals, setting panels, drawer overlays.

### Suit & Game Mechanics Tokens
- **Hearts & Diamonds (Ruby Royale):** `#E03131` with `#741212` shadow backing.
- **Spades & Clubs (Midnight Onyx):** `#1A1D24` foreground with crisp `#FFFFFF` pinstripe outlines on dark backgrounds.
- **Turn Timer Alert (Active Ring):** Glowing gradient running from `#F59E0B` to `#D4AF37` with an ambient glow of `rgba(212, 175, 55, 0.45)`.
- **Warning / All-In State:** Crimson glow (`#FF4D4D`).

## Typography Rules
- **Editorial Display (`Playfair Display`):** Reserved strictly for pot outcomes, tournament titles, hand rank announcements (e.g. *"Full House, Aces Full of Kings"*), and level banners.
- **Tactical Numerical & Interface Sans (`Plus Jakarta Sans`):** Applied across chip stacks, pot odds calculations, player timers, hand histories, and betting buttons.
- **Tabular Figures:** Always apply `tabular-nums` / `.font-tabular` for all numeric metrics and countdown intervals to prevent jitter.
- **Case Conventions:** Table actions (FOLD, CHECK, CALL, RAISE, ALL-IN) and position identifiers (BTN, SB, BB, UTG) must always render in uppercase with `label-caps-sm` styling.

## Elevation & Depth
1. **Level 0 (Canvas Void):** `#0B0F17` with fine ambient vignette darkening the outer edges.
2. **Level 1 (Felt Play Surface):** Radial light mask: `radial-gradient(ellipse at 50% 45%, #0D4734 0%, #083324 75%, #051D15 100%)`.
3. **Level 2 (Active Cards & Chips):** Floating elements with contact shadow: `0 4px 12px rgba(0, 0, 0, 0.65)`.
4. **Level 3 (Player Pods & Overlays):** Translucent charcoal backing `rgba(18, 22, 32, 0.85)` + `backdrop-filter: blur(20px)` + hairline border `1px solid rgba(212, 175, 55, 0.25)`.
5. **Level 4 (Modals, Consoles):** Deep ambient shadow: `0 24px 64px rgba(0, 0, 0, 0.85)`.

