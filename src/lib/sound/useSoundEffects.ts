import { useEffect, useRef } from "react";
import soundEngine from "./audioEngine";
import type { PokerEngineState, ShowdownWinnerSummary } from "../poker/types";

export interface UseSoundEffectsOptions {
  muted?: boolean;
  state?: PokerEngineState | null;
  heroPlayerId?: string;
}

export function useSoundEffects({
  muted = false,
  state,
  heroPlayerId = "hero",
}: UseSoundEffectsOptions) {
  const prevStatusRef = useRef<string | null>(null);
  const prevHandRef = useRef<number | null>(null);
  const prevTurnRef = useRef<number | null>(null);
  const prevActionLogLengthRef = useRef<number>(0);
  const prevWinnersRef = useRef<string | null>(null);

  // Sync mute state
  useEffect(() => {
    soundEngine.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    if (!state || muted) return;

    // 1. Hand deal trigger: new hand starts
    if (prevHandRef.current !== null && state.handNumber !== prevHandRef.current) {
      soundEngine.playCardDeal();
    }
    prevHandRef.current = state.handNumber;

    // 2. Status change trigger (flop / turn / river)
    if (prevStatusRef.current !== null && state.status !== prevStatusRef.current) {
      if (
        state.status === "flop" ||
        state.status === "turn" ||
        state.status === "river"
      ) {
        soundEngine.playCardDeal();
      }
    }
    prevStatusRef.current = state.status;

    // 3. Hero turn alert: currentTurnSeatIndex matches hero (hero is seatIndex 0)
    const isHeroTurn =
      state.currentTurnSeatIndex === 0 &&
      state.status !== "showdown" &&
      state.status !== "waiting";

    if (isHeroTurn && prevTurnRef.current !== 0) {
      soundEngine.playHeroTurnAlert();
    }
    prevTurnRef.current = state.currentTurnSeatIndex;

    // 4. Action log triggers: player actions (check, bet/raise, fold, all-in)
    if (state.actionLog.length > prevActionLogLengthRef.current) {
      const latestAction = state.actionLog[state.actionLog.length - 1];
      if (latestAction) {
        const text = latestAction.message.toLowerCase();
        if (text.includes("all-in") || text.includes("shoves")) {
          soundEngine.playAllIn();
        } else if (text.includes("checks")) {
          soundEngine.playCheckKnock();
        } else if (text.includes("folds")) {
          soundEngine.playFoldWhoosh();
        } else if (
          text.includes("bets") ||
          text.includes("raises") ||
          text.includes("calls")
        ) {
          soundEngine.playChipToss();
        }
      }
    }
    prevActionLogLengthRef.current = state.actionLog.length;

    // 5. Showdown & Win Fanfare trigger
    const winnersKey = state.winners
      ? state.winners.map((w: ShowdownWinnerSummary) => w.playerId).join(",")
      : "";
    if (winnersKey && winnersKey !== prevWinnersRef.current && state.status === "showdown") {
      const heroWon = state.winners?.some(
        (w: ShowdownWinnerSummary) =>
          w.playerId === heroPlayerId || w.playerId === "hero"
      );
      if (heroWon) {
        soundEngine.playWinFanfare();
      } else {
        soundEngine.playChipStack();
      }
    }
    prevWinnersRef.current = winnersKey;
  }, [state, muted, heroPlayerId]);

  return {
    playCardDeal: () => soundEngine.playCardDeal(),
    playChipToss: () => soundEngine.playChipToss(),
    playChipStack: () => soundEngine.playChipStack(),
    playCheckKnock: () => soundEngine.playCheckKnock(),
    playFoldWhoosh: () => soundEngine.playFoldWhoosh(),
    playHeroTurnAlert: () => soundEngine.playHeroTurnAlert(),
    playAllIn: () => soundEngine.playAllIn(),
    playWinFanfare: () => soundEngine.playWinFanfare(),
    setMuted: (m: boolean) => soundEngine.setMuted(m),
  };
}
