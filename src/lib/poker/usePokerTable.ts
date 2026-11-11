import { useEffect, useMemo, useRef, useState } from "react";
import { LocalBotTableClient } from "./transport";
import type {
  PokerEngineState,
  PokerPlayerActionInput,
  PokerTableConfig,
} from "./types";

export interface UsePokerTableResult {
  tableState: PokerEngineState;
  hero: PokerEngineState["players"][number];
  isHeroTurn: boolean;
  toCall: number;
  minRaiseTarget: number;
  maxBetTarget: number;
  canCheck: boolean;
  canRaise: boolean;
  fold: () => void;
  checkOrCall: () => void;
  raiseTo: (targetBet: number) => void;
  allIn: () => void;
  dealNextHand: () => void;
  sendChat: (msg: string) => void;
  rebuy: (amount: number) => void;
}

export function usePokerTable(
  config: PokerTableConfig,
  onRequestTopOff?: (neededChips: number) => number
): UsePokerTableResult {
  const topOffRef = useRef(onRequestTopOff);
  topOffRef.current = onRequestTopOff;

  const clientRef = useRef<LocalBotTableClient | null>(null);
  if (!clientRef.current) {
    clientRef.current = new LocalBotTableClient(config, {
      onRequestTopOff: (needed) => topOffRef.current?.(needed) ?? 0,
    });
  }

  const [tableState, setTableState] = useState<PokerEngineState>(() =>
    clientRef.current!.getState()
  );

  // Re-initialize client if tableId changes
  useEffect(() => {
    if (
      clientRef.current &&
      clientRef.current.getState().config.tableId !== config.tableId
    ) {
      clientRef.current.destroy();
      clientRef.current = new LocalBotTableClient(config, {
        onRequestTopOff: (needed) => topOffRef.current?.(needed) ?? 0,
      });
    }
    const client = clientRef.current!;
    const unsubscribe = client.subscribe(setTableState);
    return () => {
      unsubscribe();
    };
  }, [config.tableId]);

  useEffect(() => {
    return () => {
      clientRef.current?.destroy();
    };
  }, []);

  const hero = tableState.players[0];
  const isHeroTurn =
    tableState.currentTurnSeatIndex === 0 &&
    tableState.status !== "showdown" &&
    tableState.status !== "waiting";

  const toCall = Math.max(0, tableState.highestBet - hero.currentBet);
  const maxBetTarget = hero.currentBet + hero.stack;
  const minRaiseTarget = Math.min(
    maxBetTarget,
    tableState.highestBet + tableState.minRaiseIncrement
  );
  const canCheck = toCall === 0;
  const canRaise = isHeroTurn && hero.stack > toCall;

  const actions = useMemo(() => {
    const submit = (input: PokerPlayerActionInput) =>
      clientRef.current?.submitHeroAction(input);
    return {
      fold: () => submit({ type: "fold" }),
      checkOrCall: () => submit({ type: toCall === 0 ? "check" : "call" }),
      raiseTo: (targetBet: number) => submit({ type: "raise", targetBet }),
      allIn: () => submit({ type: "all-in", targetBet: maxBetTarget }),
      dealNextHand: () => clientRef.current?.dealNextHand(),
      sendChat: (msg: string) => clientRef.current?.sendChat(msg),
      rebuy: (amount: number) => clientRef.current?.rebuyHero(amount),
    };
  }, [toCall, maxBetTarget]);

  return {
    tableState,
    hero,
    isHeroTurn,
    toCall,
    minRaiseTarget,
    maxBetTarget,
    canCheck,
    canRaise,
    ...actions,
  };
}
