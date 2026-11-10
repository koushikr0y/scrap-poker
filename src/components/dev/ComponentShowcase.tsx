import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { GlassPanel } from '../ui/GlassPanel';
import { PlayingCard } from '../game/PlayingCard';
import { ChipStack } from '../game/ChipStack';
import { PlayerPod } from '../game/PlayerPod';
import { BettingSlider } from '../game/BettingSlider';
import { PotDisplay } from '../game/PotDisplay';
import { Card, Player, Pot } from '@/lib/mock/types';
import { Crown, Sparkles, Layers, Sliders, ShieldCheck, RefreshCw } from 'lucide-react';

export const ComponentShowcase: React.FC = () => {
  // Local state for interactive testbeds
  const [sliderBet, setSliderBet] = useState<number>(12000);
  const [demoTimer, setDemoTimer] = useState<number>(4); // urgent state demo
  const [activeTab, setActiveTab] = useState<'all' | 'cards' | 'chips' | 'pods' | 'controls' | 'panels'>('all');

  // Sample cards
  const sampleCards: Card[] = [
    { id: '1', rank: 'A', suit: 'spades' },
    { id: '2', rank: 'K', suit: 'hearts' },
    { id: '3', rank: 'Q', suit: 'diamonds' },
    { id: '4', rank: 'J', suit: 'clubs' },
    { id: '5', rank: '10', suit: 'spades', isHighlight: true },
    { id: '6', rank: '9', suit: 'hearts', faceDown: true },
  ];

  // Community board demo
  const boardCards: Card[] = [
    { id: 'b1', rank: 'A', suit: 'spades', isHighlight: true },
    { id: 'b2', rank: 'K', suit: 'spades', isHighlight: true },
    { id: 'b3', rank: 'Q', suit: 'spades', isHighlight: true },
    { id: 'b4', rank: 'J', suit: 'spades', isHighlight: true },
    { id: 'b5', rank: '2', suit: 'diamonds' },
  ];

  // Demo players
  const demoActivePlayer: Player = {
    id: 'd-1',
    name: 'Countess Vesper',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    vipTier: 'Black Diamond',
    stack: 185000,
    currentBet: 6000,
    seatIndex: 1,
    position: 'BTN',
    isDealer: true,
    isActive: true,
    isCurrentTurn: true,
    isFolded: false,
    isAllIn: false,
    timeRemaining: 12,
    totalTime: 15,
    cards: [
      { id: 'dc1', rank: 'A', suit: 'hearts' },
      { id: 'dc2', rank: 'A', suit: 'diamonds' },
    ],
    handRankDescription: 'Pocket Aces (Pre-Flop Leader)',
  };

  const demoUrgentPlayer: Player = {
    id: 'd-2',
    name: 'Viktor Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    vipTier: 'Gold',
    stack: 94000,
    currentBet: 12000,
    seatIndex: 2,
    position: 'SB',
    isDealer: false,
    isActive: true,
    isCurrentTurn: true,
    isFolded: false,
    isAllIn: false,
    timeRemaining: demoTimer,
    totalTime: 15,
    lastAction: { type: 'raise', amount: 12000 },
  };

  const demoFoldedPlayer: Player = {
    id: 'd-3',
    name: 'Alexei Petrov',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    vipTier: 'Silver',
    stack: 42000,
    currentBet: 0,
    seatIndex: 3,
    position: 'UTG',
    isDealer: false,
    isActive: false,
    isCurrentTurn: false,
    isFolded: true,
    isAllIn: false,
    lastAction: { type: 'fold' },
  };

  const demoPot: Pot = {
    main: 45000,
    sidePots: [{ amount: 15000, eligiblePlayerIds: ['d-1', 'd-2'] }],
    total: 60000,
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-text-main p-6 lg:p-12 selection:bg-gold/30">
      {/* Header Banner */}
      <header className="max-w-7xl mx-auto mb-10 pb-6 border-b border-gold/25 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-gold" />
            <span className="text-xs uppercase tracking-widest text-gold-bright font-bold">
              Monte Carlo Royale Design System
            </span>
            <span className="bg-gold/15 text-gold-highlight text-[10px] px-2 py-0.5 rounded-full border border-gold/30">
              Stitch #672511945144170203
            </span>
          </div>
          <h1 className="font-editorial text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Shared Component Showcase
          </h1>
          <p className="text-sm text-text-variant mt-1">
            Isolated visual testbed for poker components, design tokens, and tactile interactions.
          </p>
        </div>

        {/* View Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#121620] p-1 rounded-DEFAULT border border-white/10">
          {(['all', 'cards', 'chips', 'pods', 'controls', 'panels'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-gold-bullion text-[#0b0f17] shadow-sm'
                  : 'text-text-variant hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* ==========================================================================
            SECTION 1: COLOR PALETTE & TOKENS
            ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'panels') && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <h2 className="font-editorial text-xl font-bold text-white">1. Core Design Tokens & Palette</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="bg-[#d4af37] p-3 rounded-DEFAULT text-[#0b0f17] font-bold text-xs shadow-md">
                <div className="text-[10px] uppercase opacity-75 font-sans">Primary Bullion</div>
                <div className="font-tabular font-extrabold text-sm mt-1">#D4AF37</div>
              </div>
              <div className="bg-[#0d4734] p-3 rounded-DEFAULT text-[#9bd2b8] font-bold text-xs shadow-md border border-white/10">
                <div className="text-[10px] uppercase opacity-75 font-sans">Velvet Felt Core</div>
                <div className="font-tabular font-extrabold text-sm mt-1">#0D4734</div>
              </div>
              <div className="bg-[#0b0f17] p-3 rounded-DEFAULT text-gold-highlight font-bold text-xs border border-gold/40 shadow-md">
                <div className="text-[10px] uppercase opacity-75 font-sans">Midnight Void</div>
                <div className="font-tabular font-extrabold text-sm mt-1">#0B0F17</div>
              </div>
              <div className="bg-[#121620] p-3 rounded-DEFAULT text-white font-bold text-xs border border-white/10 shadow-md">
                <div className="text-[10px] uppercase opacity-75 font-sans">Surface Pod</div>
                <div className="font-tabular font-extrabold text-sm mt-1">#121620</div>
              </div>
              <div className="bg-[#e03131] p-3 rounded-DEFAULT text-white font-bold text-xs shadow-md">
                <div className="text-[10px] uppercase opacity-75 font-sans">Ruby Suits</div>
                <div className="font-tabular font-extrabold text-sm mt-1">#E03131</div>
              </div>
              <div className="bg-[#ff4d4d] p-3 rounded-DEFAULT text-white font-bold text-xs shadow-md">
                <div className="text-[10px] uppercase opacity-75 font-sans">All-In Crimson</div>
                <div className="font-tabular font-extrabold text-sm mt-1">#FF4D4D</div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================================================
            SECTION 2: PLAYING CARDS
            ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'cards') && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold" />
              <h2 className="font-editorial text-xl font-bold text-white">2. Playing Cards (`PlayingCard`)</h2>
            </div>

            <GlassPanel className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-3">
                    Suit Renderings & Linen Texture (Aspect 1:1.4, 6px Radii)
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    {sampleCards.map((c) => (
                      <PlayingCard key={c.id} card={c} size="md" />
                    ))}
                  </div>
                </div>

                {/* Community Board Preview */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-3">
                    Community Board with Winning Highlight State (`isHighlight=true`)
                  </h3>
                  <div className="felt-spotlight p-6 rounded-DEFAULT border border-gold/30 shadow-inner flex flex-wrap items-center justify-center gap-3">
                    {boardCards.map((c) => (
                      <PlayingCard key={c.id} card={c} size="lg" />
                    ))}
                  </div>
                </div>

                {/* Card Sizes */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-3">
                    Card Scale Variations (`xs`, `sm`, `md`, `lg`, `xl`)
                  </h3>
                  <div className="flex items-end gap-3">
                    <PlayingCard card={{ id: 's1', rank: 'A', suit: 'spades' }} size="xs" />
                    <PlayingCard card={{ id: 's2', rank: 'A', suit: 'hearts' }} size="sm" />
                    <PlayingCard card={{ id: 's3', rank: 'A', suit: 'diamonds' }} size="md" />
                    <PlayingCard card={{ id: 's4', rank: 'A', suit: 'clubs' }} size="lg" />
                    <PlayingCard card={{ id: 's5', rank: 'A', suit: 'spades', isHighlight: true }} size="xl" />
                  </div>
                </div>
              </div>
            </GlassPanel>
          </section>
        )}

        {/* ==========================================================================
            SECTION 3: 3D CHIP STACKS
            ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'chips') && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <h2 className="font-editorial text-xl font-bold text-white">3. Casino Chip Stacks (`ChipStack`)</h2>
            </div>

            <GlassPanel className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-3">
                    Denomination Stacks with Colored Edge Stripes & Isometric Drop Shadows
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-end bg-[#083324]/40 p-6 rounded-DEFAULT border border-gold/20">
                    <div className="flex flex-col items-center">
                      <ChipStack amount={25} size="md" />
                      <span className="text-[10px] text-text-variant mt-2">$25 Forest</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ChipStack amount={100} size="md" />
                      <span className="text-[10px] text-text-variant mt-2">$100 Onyx</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ChipStack amount={500} size="md" />
                      <span className="text-[10px] text-text-variant mt-2">$500 Purple</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ChipStack amount={1000} size="md" />
                      <span className="text-[10px] text-text-variant mt-2">$1,000 Bullion</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ChipStack amount={5000} size="md" />
                      <span className="text-[10px] text-text-variant mt-2">$5,000 Crimson</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ChipStack amount={25000} size="md" />
                      <span className="text-[10px] text-text-variant mt-2">$25,000 Obsidian</span>
                    </div>
                  </div>
                </div>

                {/* High Roller Pot Aggregations */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-end gap-10">
                  <div>
                    <span className="text-xs text-text-variant block mb-2 font-bold uppercase">Small Bet ($350)</span>
                    <ChipStack amount={350} size="sm" />
                  </div>
                  <div>
                    <span className="text-xs text-text-variant block mb-2 font-bold uppercase">Medium Pot ($8,400)</span>
                    <ChipStack amount={8400} size="md" />
                  </div>
                  <div>
                    <span className="text-xs text-text-variant block mb-2 font-bold uppercase">High-Roller Pot ($85,000)</span>
                    <ChipStack amount={85000} size="lg" />
                  </div>
                  <div>
                    <span className="text-xs text-text-variant block mb-2 font-bold uppercase">All-In Stack ($250,000)</span>
                    <ChipStack amount={250000} size="lg" />
                  </div>
                </div>
              </div>
            </GlassPanel>
          </section>
        )}

        {/* ==========================================================================
            SECTION 4: PLAYER POD WITH TIMER RING
            ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'pods') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-gold" />
                <h2 className="font-editorial text-xl font-bold text-white">4. Player Seat Pods (`PlayerPod`)</h2>
              </div>
              <Button
                variant="pill"
                size="sm"
                label="Toggle Urgent Countdown"
                icon={<RefreshCw className="w-3 h-3" />}
                onClick={() => setDemoTimer((prev) => (prev <= 2 ? 14 : prev - 3))}
              />
            </div>

            <GlassPanel className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Pod 1: Active Turn with Healthy Timer */}
                <div className="flex flex-col items-center p-4 bg-[#0a0e16]/60 rounded-DEFAULT border border-white/5">
                  <span className="text-xs text-gold uppercase font-bold mb-3 tracking-widest">
                    Active Turn (Healthy Timer)
                  </span>
                  <PlayerPod player={demoActivePlayer} />
                </div>

                {/* Pod 2: Urgent Countdown (Final 5s Ruby Transition) */}
                <div className="flex flex-col items-center p-4 bg-[#0a0e16]/60 rounded-DEFAULT border border-game-allIn/30">
                  <span className="text-xs text-game-allIn uppercase font-bold mb-3 tracking-widest animate-pulse">
                    Urgent State (&le; 5s Warning)
                  </span>
                  <PlayerPod player={demoUrgentPlayer} />
                </div>

                {/* Pod 3: Folded Player State */}
                <div className="flex flex-col items-center p-4 bg-[#0a0e16]/60 rounded-DEFAULT border border-white/5">
                  <span className="text-xs text-text-variant uppercase font-bold mb-3 tracking-widest">
                    Folded Player (Grayscale Dimmed)
                  </span>
                  <PlayerPod player={demoFoldedPlayer} />
                </div>
              </div>
            </GlassPanel>
          </section>
        )}

        {/* ==========================================================================
            SECTION 5: ACTION CONTROLS & TACTILE BETTING SLIDER
            ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'controls') && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-gold" />
              <h2 className="font-editorial text-xl font-bold text-white">5. Action Buttons & Betting Slider</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Poker Action Buttons */}
              <GlassPanel className="p-6 space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-3">
                  Tactile Betting Action Deck
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Button variant="fold" label="Fold" sublabel="Surrender hand" />
                  <Button variant="checkCall" label="Check" sublabel="No bet to call" />
                  <Button variant="checkCall" label="Call" amount={4000} />
                  <Button variant="raise" label="Raise" amount={12000} />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-2">
                    Hero Action (All-In Crimson Flare)
                  </h3>
                  <Button
                    variant="allIn"
                    size="xl"
                    label="All-In"
                    amount={125000}
                    className="w-full"
                  />
                </div>
              </GlassPanel>

              {/* Interactive Betting Slider */}
              <GlassPanel className="p-6">
                <h3 className="text-xs uppercase tracking-wider text-text-variant font-bold mb-3">
                  Tactile Betting Slider (`BettingSlider`)
                </h3>
                <BettingSlider
                  currentBet={sliderBet}
                  minBet={4000}
                  maxBet={125000}
                  potSize={60000}
                  onBetChange={(newVal) => setSliderBet(newVal)}
                />
              </GlassPanel>
            </div>
          </section>
        )}

        {/* ==========================================================================
            SECTION 6: POT DISPLAY COMPONENT
            ========================================================================== */}
        {(activeTab === 'all' || activeTab === 'panels') && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-gold" />
              <h2 className="font-editorial text-xl font-bold text-white">6. Centered Pot Display (`PotDisplay`)</h2>
            </div>

            <GlassPanel className="p-8 felt-spotlight flex items-center justify-center">
              <PotDisplay pot={demoPot} />
            </GlassPanel>
          </section>
        )}
      </main>
    </div>
  );
};
