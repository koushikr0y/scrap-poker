/**
 * Procedural Web Audio API Sound Effects Engine
 * Pure mathematical audio synthesis (oscillators, white noise, biquad filters).
 * Zero external mp3/wav dependencies, zero latency, 100% offline-ready.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy AudioContext initialization on first user interaction
    if (typeof window !== "undefined") {
      const unlockAudio = () => {
        this.init();
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
      };
      window.addEventListener("pointerdown", unlockAudio, { once: true });
      window.addEventListener("keydown", unlockAudio, { once: true });
    }
  }

  private init(): boolean {
    if (this.ctx && this.ctx.state !== "closed") {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return true;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return false;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);

      // Dynamics compressor / limiter to avoid clipping on rapid concurrent SFX
      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
      compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      compressor.ratio.setValueAtTime(10, this.ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      compressor.release.setValueAtTime(0.15, this.ctx.currentTime);

      this.masterGain.connect(compressor);
      compressor.connect(this.ctx.destination);
      return true;
    } catch {
      return false;
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        muted ? 0 : 0.85,
        this.ctx.currentTime
      );
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private ensureContext(): AudioContext | null {
    if (!this.init() || !this.ctx || !this.masterGain) return null;
    if (this.isMuted) return null;
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Generates a brief white-noise buffer for tactile sliding sounds (card deal, fold sweep)
   */
  private createNoiseBuffer(durationSeconds: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = Math.floor(this.ctx.sampleRate * durationSeconds);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Sound 1: Card Deal / Slide
   * Soft bandpass-filtered noise swoosh simulating card sliding across casino felt
   */
  public playCardDeal(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const noise = this.createNoiseBuffer(0.14);
    if (!noise) return;

    const source = ctx.createBufferSource();
    source.buffer = noise;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.12);
    filter.Q.setValueAtTime(1.8, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.14);
  }

  /**
   * Sound 2: Single Chip Toss / Clink
   * Crisp resonant dual sine clink mimicking heavy clay chips hitting the felt
   */
  public playChipToss(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    // Primary ceramic tone & harmonic overtone
    const baseFreq = 2200 + Math.random() * 150;
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + 0.04);

    osc2.frequency.setValueAtTime(baseFreq * 1.62, now);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.03);

    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.05);
    osc2.stop(now + 0.05);
  }

  /**
   * Sound 3: Chip Stack / Pot Collection Sweep
   * Rapid cascade of 3 chip clinks for larger bets, raises, or scooping pots
   */
  public playChipStack(): void {
    this.playChipToss();
    setTimeout(() => this.playChipToss(), 35);
    setTimeout(() => this.playChipToss(), 75);
  }

  /**
   * Sound 4: Check Knock
   * Double-tap wooden/felt table knuckle knock
   */
  public playCheckKnock(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const playKnockTap = (delayMs: number, pitch: number, vol: number) => {
      setTimeout(() => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 0.07);
      }, delayMs);
    };

    playKnockTap(0, 110, 0.45);
    playKnockTap(75, 95, 0.35);
  }

  /**
   * Sound 5: Fold Discard Swoosh
   * Aerodynamic card muck sweep
   */
  public playFoldWhoosh(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const noise = this.createNoiseBuffer(0.18);
    if (!noise) return;

    const source = ctx.createBufferSource();
    source.buffer = noise;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.16);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.17);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.18);
  }

  /**
   * Sound 6: Hero Turn Alert Ding
   * Two-tone pleasant notification chime alerting the player that action is on them
   */
  public playHeroTurnAlert(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const playTone = (freq: number, startDelay: number) => {
      setTimeout(() => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 0.23);
      }, startDelay);
    };

    playTone(587.33, 0); // D5
    playTone(880.0, 90); // A5
  }

  /**
   * Sound 7: All-In Siren / Bass Drop
   * Deep 808 sub impact followed by dramatic rising arcade siren
   */
  public playAllIn(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;

    // Sub Bass Boom
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.35);

    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.4);

    // Dramatic Comic Siren
    const sirenOsc = ctx.createOscillator();
    const sirenGain = ctx.createGain();
    sirenOsc.type = "sawtooth";
    sirenOsc.frequency.setValueAtTime(320, now + 0.05);
    sirenOsc.frequency.linearRampToValueAtTime(850, now + 0.25);
    sirenOsc.frequency.linearRampToValueAtTime(520, now + 0.45);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    sirenGain.gain.setValueAtTime(0.01, now + 0.05);
    sirenGain.gain.linearRampToValueAtTime(0.25, now + 0.12);
    sirenGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    sirenOsc.connect(filter);
    filter.connect(sirenGain);
    sirenGain.connect(this.masterGain);

    sirenOsc.start(now + 0.05);
    sirenOsc.stop(now + 0.48);
  }

  /**
   * Sound 8: Win Fanfare Chime
   * 4-note ascending arcade major chord (C5 - E5 - G5 - C6) celebrating showdown victory
   */
  public playWinFanfare(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        const isLast = idx === notes.length - 1;
        const sustainTime = isLast ? 0.6 : 0.2;

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + sustainTime);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + sustainTime + 0.05);
      }, idx * 75);
    });
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
