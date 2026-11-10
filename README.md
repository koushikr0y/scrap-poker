# ♠ Scrap Poker — Underground Deck

A gritty, cel-pop graphic novel-inspired Texas Hold'em poker web application built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

Featuring high-contrast ink outlines, halftone dot textures, brutalist card containers, and dynamic social poker lobbies modeled after underground syndicate card rooms.

---

## 📸 Implemented Screens

| Screen | Route | Description |
| :--- | :--- | :--- |
| **Battle Table** | `#/table` | Full-felt 6-max Hold'em poker table with animated chip stacks, dealer button, community cards, player pods, and action controls. |
| **Table Browser** | `#/tables` | Gritty cash game table browser with interactive buy-in filter slider, blind categories, and live table status indicators. |
| **Battle Lobby** | `#/lobby` | Underground command terminal featuring quick play matching, live high-roller pots, daily bonuses, and verified syndicate tables. |
| **Login & Auth** | `#/login` | Retro comic book auth terminal with stylized card fan visuals, Google sign-in, guest access, and security passcode toggle. |
| **Create Account** | `#/register` | Cyberpunk syndicate recruitment page with bonus chip airdrops, avatar customization preview, and 256-bit encryption badges. |
| **Component Showcase** | `#/showcase` | Interactive dev playground displaying design tokens, playing cards, chip stacks, betting sliders, and UI components. |

---

## 🎨 Design System

- **Aesthetic**: Cel-Pop / Underground Graphic Novel / Brutalist Comic
- **Typography**:
  - Headlines & Displays: [`Anton`](https://fonts.google.com/specimen/Anton)
  - Body & Labels: [`Barlow Condensed`](https://fonts.google.com/specimen/Barlow+Condensed)
  - Icons: [`Material Symbols Outlined`](https://fonts.google.com/icons)
- **Visual Style**:
  - Hard ink borders: `border-[3px] border-[#101012]`
  - Solid drop shadows: `shadow-[4px_4px_0px_#000000]`
  - Halftone dot screentone overlays
  - Tilted sticker tags and comic burst angles

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom design tokens
- **Icons**: Google Material Symbols Outlined & Lucide React
- **Architecture**: Pure presentational components with typed mock fixtures (`src/lib/mock/`) for seamless future backend/WebSocket integration.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/koushikr0y/scrap-poker.git

# Navigate to project directory
cd scrap-poker

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Available Scripts

- `npm run dev`: Starts the Vite development server on port 3000.
- `npm run build`: Compiles TypeScript and builds the production bundle in `dist/`.
- `npm run preview`: Locally previews the production build.

---

## 📁 Project Structure

```
├── reference/                  # Stitch designs (HTML & reference screenshots)
├── src/
│   ├── components/
│   │   ├── dev/                # Dev component showcase & token playground
│   │   ├── game/               # Poker game components (Table, Pods, Cards, Chips)
│   │   ├── screens/            # Full-page screen views (Table, Lobby, Login, Register)
│   │   └── ui/                 # Reusable buttons, badges, and glass panels
│   ├── lib/
│   │   ├── mock/               # Typed mock fixtures (players, tables, lobby, hands)
│   │   └── utils.ts            # Helper utilities & class mergers
│   ├── App.tsx                 # Hash-based screen router & switcher bar
│   ├── index.css               # Global theme & utility classes
│   └── main.tsx                # Application root
├── tailwind.config.js          # Extracted brutalist cel-pop design tokens
├── SCREENS.md                  # Manifest tracking implementation progress
└── DESIGN.md                   # Full design system specification
```

---

## 📄 License

MIT
