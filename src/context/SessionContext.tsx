import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { PokerTableConfig } from "@/lib/poker";

export type AvatarMaskId = "bolt" | "viper" | "jack" | "cogwheel";

export interface UserSession {
  isAuthenticated: boolean;
  accountType: "registered" | "guest";
  callsign: string;
  email?: string;
  avatarId: AvatarMaskId;
  level: number;
  rankLabel: string;
  bankroll: number;
  dailyBonusClaimed: boolean;
  muted: boolean;
}

export interface TableEntrySpec {
  tableId: string;
  tableName: string;
  tableCode: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
  buyInAmount: number;
  autoTopOff?: boolean;
}

const STORAGE_KEY = "scrap_poker_session_v1";

const DEFAULT_UNAUTH_SESSION: UserSession = {
  isAuthenticated: false,
  accountType: "guest",
  callsign: "BOLT_RUNNER_99",
  avatarId: "bolt",
  level: 24,
  rankLabel: "GOLD II",
  bankroll: 450200,
  dailyBonusClaimed: false,
  muted: false,
};

const DEFAULT_TABLE_SPEC: TableEntrySpec = {
  tableId: "scrap-yard-07",
  tableName: "SCRAPYARD HIGH STAKES #07",
  tableCode: "#07 HIGH STAKES",
  smallBlind: 500,
  bigBlind: 1000,
  minBuyIn: 20000,
  maxBuyIn: 100000,
  buyInAmount: 45000,
  autoTopOff: true,
};

function loadInitialSession(): UserSession {
  if (typeof window === "undefined") return DEFAULT_UNAUTH_SESSION;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_UNAUTH_SESSION;
    const parsed = JSON.parse(raw) as Partial<UserSession>;
    return {
      ...DEFAULT_UNAUTH_SESSION,
      ...parsed,
    };
  } catch {
    return DEFAULT_UNAUTH_SESSION;
  }
}

export interface SessionContextValue {
  session: UserSession;
  selectedTable: TableEntrySpec;
  activeTableConfig: PokerTableConfig;
  loginWithCredentials: (identifier?: string) => void;
  loginWithGoogle: () => void;
  registerAccount: (callsign: string, email?: string) => void;
  startGuestSession: (callsign: string, avatarId: AvatarMaskId) => void;
  logout: () => void;
  toggleMute: () => void;
  claimDailyBonus: (amount?: number) => boolean;
  selectTableForBuyIn: (spec: Partial<TableEntrySpec>) => void;
  seatAtTable: (spec?: Partial<TableEntrySpec>) => PokerTableConfig;
  leaveTableSession: (returnedStack: number) => void;
  requestBankrollRebuy: (requestedAmount: number) => number;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<UserSession>(loadInitialSession);
  const [selectedTable, setSelectedTable] =
    useState<TableEntrySpec>(DEFAULT_TABLE_SPEC);
  const [activeTableConfig, setActiveTableConfig] = useState<PokerTableConfig>({
    tableId: DEFAULT_TABLE_SPEC.tableId,
    tableName: DEFAULT_TABLE_SPEC.tableName,
    tableCode: DEFAULT_TABLE_SPEC.tableCode,
    smallBlind: DEFAULT_TABLE_SPEC.smallBlind,
    bigBlind: DEFAULT_TABLE_SPEC.bigBlind,
    minBuyIn: DEFAULT_TABLE_SPEC.minBuyIn,
    maxBuyIn: DEFAULT_TABLE_SPEC.maxBuyIn,
    turnDurationSeconds: 15,
    heroName: session.callsign || "BOLT_RUNNER_99",
    heroBuyIn: DEFAULT_TABLE_SPEC.buyInAmount,
    autoTopOff: true,
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [session]);

  const loginWithCredentials = useCallback((identifier?: string) => {
    const cleanName =
      identifier?.trim().split("@")[0]?.toUpperCase() || "BOLT_RUNNER_99";
    setSession((prev) => ({
      ...prev,
      isAuthenticated: true,
      accountType: "registered",
      callsign: cleanName,
      email: identifier?.includes("@") ? identifier.trim() : prev.email,
      bankroll: prev.isAuthenticated ? prev.bankroll : 450200,
    }));
  }, []);

  const loginWithGoogle = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isAuthenticated: true,
      accountType: "registered",
      callsign: "BOLT_RUNNER_99",
      email: "bolt.runner@scrappoker.io",
      bankroll: prev.isAuthenticated ? prev.bankroll : 450200,
    }));
  }, []);

  const registerAccount = useCallback((callsign: string, email?: string) => {
    const clean = callsign.trim().toUpperCase() || "CYBER_ACE_88";
    setSession({
      isAuthenticated: true,
      accountType: "registered",
      callsign: clean,
      email,
      avatarId: "bolt",
      level: 1,
      rankLabel: "BRONZE I",
      bankroll: 50000,
      dailyBonusClaimed: false,
      muted: false,
    });
  }, []);

  const startGuestSession = useCallback(
    (callsign: string, avatarId: AvatarMaskId) => {
      const clean = callsign.trim().toUpperCase() || "SCRAP_ROOKIE_402";
      setSession({
        isAuthenticated: true,
        accountType: "guest",
        callsign: clean,
        avatarId,
        level: 1,
        rankLabel: "ROOKIE",
        bankroll: 10000,
        dailyBonusClaimed: false,
        muted: false,
      });
    },
    []
  );

  const logout = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setSession((prev) => ({ ...prev, muted: !prev.muted }));
  }, []);

  const claimDailyBonus = useCallback(
    (amount = 15000): boolean => {
      if (session.dailyBonusClaimed) return false;
      setSession((prev) =>
        prev.dailyBonusClaimed
          ? prev
          : {
              ...prev,
              dailyBonusClaimed: true,
              bankroll: prev.bankroll + amount,
            }
      );
      return true;
    },
    [session.dailyBonusClaimed]
  );

  const selectTableForBuyIn = useCallback((spec: Partial<TableEntrySpec>) => {
    setSelectedTable((prev) => ({
      ...prev,
      ...spec,
    }));
  }, []);

  const seatAtTable = useCallback(
    (spec?: Partial<TableEntrySpec>): PokerTableConfig => {
      const merged: TableEntrySpec = {
        ...selectedTable,
        ...spec,
      };
      // Ensure buy-in does not exceed player's live bankroll
      const safeBuyIn = Math.max(
        Math.min(merged.minBuyIn, session.bankroll),
        Math.min(merged.buyInAmount, session.bankroll || merged.buyInAmount)
      );

      if (session.bankroll >= safeBuyIn && safeBuyIn > 0) {
        setSession((prev) => ({
          ...prev,
          bankroll: Math.max(0, prev.bankroll - safeBuyIn),
        }));
      }

      const nextConfig: PokerTableConfig = {
        tableId: `${merged.tableId}-${Date.now()}`,
        tableName: merged.tableName,
        tableCode: merged.tableCode,
        smallBlind: merged.smallBlind,
        bigBlind: merged.bigBlind,
        minBuyIn: merged.minBuyIn,
        maxBuyIn: merged.maxBuyIn,
        turnDurationSeconds: 15,
        heroName: session.callsign || "BOLT_RUNNER_99",
        heroBuyIn: safeBuyIn > 0 ? safeBuyIn : merged.buyInAmount,
        autoTopOff: merged.autoTopOff ?? true,
      };

      setSelectedTable(merged);
      setActiveTableConfig(nextConfig);
      return nextConfig;
    },
    [selectedTable, session.bankroll, session.callsign]
  );

  const leaveTableSession = useCallback((returnedStack: number) => {
    if (returnedStack > 0) {
      setSession((prev) => ({
        ...prev,
        bankroll: prev.bankroll + returnedStack,
      }));
    }
  }, []);

  const requestBankrollRebuy = useCallback(
    (requestedAmount: number): number => {
      const granted = Math.max(0, Math.min(requestedAmount, session.bankroll));
      if (granted <= 0) return 0;
      setSession((prev) => ({
        ...prev,
        bankroll: Math.max(0, prev.bankroll - granted),
      }));
      return granted;
    },
    [session.bankroll]
  );

  return (
    <SessionContext.Provider
      value={{
        session,
        selectedTable,
        activeTableConfig,
        loginWithCredentials,
        loginWithGoogle,
        registerAccount,
        startGuestSession,
        logout,
        toggleMute,
        claimDailyBonus,
        selectTableForBuyIn,
        seatAtTable,
        leaveTableSession,
        requestBankrollRebuy,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return ctx;
}
