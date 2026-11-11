import { decideBotAction } from "./bots";
import {
  addChatMessage,
  applyHeroRebuy,
  applyPlayerAction,
  createInitialTableState,
  startNextHand,
} from "./engine";
import type {
  PokerEngineState,
  PokerPlayerActionInput,
  PokerTableConfig,
} from "./types";

export type TableStateListener = (state: PokerEngineState) => void;

export interface PokerTableClient {
  getState: () => PokerEngineState;
  subscribe: (listener: TableStateListener) => () => void;
  submitHeroAction: (action: PokerPlayerActionInput) => void;
  dealNextHand: () => void;
  sendChat: (message: string) => void;
  rebuyHero: (amount: number) => void;
  destroy: () => void;
}

export interface LocalBotTableClientOptions {
  /** Called between hands if autoTopOff is true and hero needs chips */
  onRequestTopOff?: (neededChips: number) => number;
}

/**
 * Local synchronous-rule + async-timer poker client simulating 5 AI opponents.
 * Replaceable with a WebSocketTableClient without changing UI consumers.
 */
export class LocalBotTableClient implements PokerTableClient {
  private state: PokerEngineState;
  private listeners = new Set<TableStateListener>();
  private botTimerId: number | null = null;
  private showdownTimerId: number | null = null;
  private tickIntervalId: number | null = null;
  private options?: LocalBotTableClientOptions;

  constructor(config: PokerTableConfig, options?: LocalBotTableClientOptions) {
    this.options = options;
    this.state = createInitialTableState(config);
    this.startTurnClock();
    this.scheduleNextTurnIfNeeded();
  }

  getState(): PokerEngineState {
    return this.state;
  }

  subscribe(listener: TableStateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  submitHeroAction(action: PokerPlayerActionInput): void {
    if (this.state.currentTurnSeatIndex !== 0) return;
    this.clearBotTimer();
    this.setState(applyPlayerAction(this.state, 0, action));
    this.scheduleNextTurnIfNeeded();
  }

  dealNextHand(): void {
    this.clearTimers();
    let nextState = this.state;

    // Optional Auto Top-Off below 50 BB
    if (nextState.config.autoTopOff && this.options?.onRequestTopOff) {
      const hero = nextState.players[0];
      const threshold = nextState.config.bigBlind * 50;
      if (hero.stack < threshold) {
        const target = Math.min(nextState.config.maxBuyIn, threshold);
        const needed = Math.max(0, target - hero.stack);
        if (needed > 0) {
          const granted = this.options.onRequestTopOff(needed);
          if (granted > 0) {
            nextState = applyHeroRebuy(nextState, granted);
          }
        }
      }
    }

    this.setState(startNextHand(nextState));
    this.scheduleNextTurnIfNeeded();
  }

  sendChat(message: string): void {
    this.setState(addChatMessage(this.state, this.state.config.heroName, message));
  }

  rebuyHero(amount: number): void {
    if (amount <= 0) return;
    const wasWaiting = this.state.status === "waiting";
    let nextState = applyHeroRebuy(this.state, amount);
    if (wasWaiting) {
      nextState = startNextHand(nextState);
    }
    this.setState(nextState);
    this.scheduleNextTurnIfNeeded();
  }

  destroy(): void {
    this.clearTimers();
    if (this.tickIntervalId !== null && typeof window !== "undefined") {
      window.clearInterval(this.tickIntervalId);
      this.tickIntervalId = null;
    }
    this.listeners.clear();
  }

  private setState(next: PokerEngineState): void {
    this.state = next;
    this.listeners.forEach((cb) => cb(this.state));
  }

  private clearBotTimer(): void {
    if (this.botTimerId !== null && typeof window !== "undefined") {
      window.clearTimeout(this.botTimerId);
      this.botTimerId = null;
    }
  }

  private clearTimers(): void {
    this.clearBotTimer();
    if (this.showdownTimerId !== null && typeof window !== "undefined") {
      window.clearTimeout(this.showdownTimerId);
      this.showdownTimerId = null;
    }
  }

  private startTurnClock(): void {
    if (typeof window === "undefined") return;
    this.tickIntervalId = window.setInterval(() => {
      if (
        this.state.status === "showdown" ||
        this.state.status === "waiting" ||
        this.state.currentTurnSeatIndex < 0
      ) {
        return;
      }

      if (this.state.turnTimeRemaining > 1) {
        this.setState({
          ...this.state,
          turnTimeRemaining: this.state.turnTimeRemaining - 1,
        });
      } else if (this.state.currentTurnSeatIndex === 0) {
        // Hero timeout: auto-check if free, else fold
        const hero = this.state.players[0];
        const toCall = Math.max(0, this.state.highestBet - hero.currentBet);
        this.submitHeroAction({ type: toCall === 0 ? "check" : "fold" });
      }
    }, 1000);
  }

  private scheduleNextTurnIfNeeded(): void {
    if (typeof window === "undefined") return;
    this.clearTimers();

    if (this.state.status === "showdown") {
      this.showdownTimerId = window.setTimeout(() => {
        this.dealNextHand();
      }, 4500);
      return;
    }

    const turnSeat = this.state.currentTurnSeatIndex;
    if (turnSeat > 0 && this.state.players[turnSeat]?.isBot) {
      const delayMs = 700 + Math.floor(Math.random() * 800);
      this.botTimerId = window.setTimeout(() => {
        if (this.state.currentTurnSeatIndex !== turnSeat) return;
        const { action, speech } = decideBotAction(this.state, turnSeat);
        this.setState(applyPlayerAction(this.state, turnSeat, action, speech));
        this.scheduleNextTurnIfNeeded();
      }, delayMs);
    }
  }
}
