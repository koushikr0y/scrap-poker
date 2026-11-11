import React, { useState, useEffect } from 'react';
import { TableBrowser, type TableSelectionSpec } from './components/screens/TableBrowser';
import { BattleTable } from './components/screens/BattleTable';
import { BattleLobby } from './components/screens/BattleLobby';
import { DesktopLogin } from './components/screens/DesktopLogin';
import { DesktopRegister } from './components/screens/DesktopRegister';
import { HandRankings } from './components/screens/HandRankings';
import { DesktopSplash } from './components/screens/DesktopSplash';
import { MobileSplash } from './components/screens/MobileSplash';
import { MobileBattleLobby } from './components/screens/MobileBattleLobby';
import {
  MobileTableBrowser,
  type MobileCashTableEntry,
} from './components/screens/MobileTableBrowser';
import { MobileBattleTable } from './components/screens/MobileBattleTable';
import { MobileBattleTableAlt } from './components/screens/MobileBattleTableAlt';
import { MobileBuyInSheet, type SheetTabState } from './components/screens/MobileBuyInSheet';
import { MobileLogin } from './components/screens/MobileLogin';
import { MobileGuestSetup } from './components/screens/MobileGuestSetup';
import { ComponentShowcase } from './components/dev/ComponentShowcase';
import {
  SessionProvider,
  useSession,
  type AvatarMaskId,
  type TableEntrySpec,
} from './context/SessionContext';
import { formatCompactChips } from './lib/poker';

export type ScreenRoute =
  | 'lobby'
  | 'tables'
  | 'table'
  | 'login'
  | 'register'
  | 'hand-rankings'
  | 'splash'
  | 'm-splash'
  | 'm-lobby'
  | 'm-tables'
  | 'm-buyin'
  | 'm-table'
  | 'm-table-alt'
  | 'm-login'
  | 'm-guest-setup'
  | 'showcase';

function parseChipToken(raw: string, fallback: number): number {
  const clean = raw.replace(/[^0-9kKmM.]/g, '').toUpperCase();
  if (!clean) return fallback;
  const num = parseFloat(clean);
  if (Number.isNaN(num)) return fallback;
  if (clean.endsWith('M')) return Math.round(num * 1000000);
  if (clean.endsWith('K')) return Math.round(num * 1000);
  return Math.round(num);
}

function parseMobileTableEntry(entry: MobileCashTableEntry): Partial<TableEntrySpec> {
  const blindParts = entry.blindsText.split('/');
  const sb = parseChipToken(blindParts[0] ?? '50', 50);
  const bb = parseChipToken(blindParts[1] ?? '100', 100);
  const buyParts = entry.buyInText.split(/[–-]/);
  const minBuyIn = parseChipToken(buyParts[0] ?? '2000', 2000);
  const maxBuyIn = parseChipToken(buyParts[1] ?? '10000', 10000);
  return {
    tableId: entry.id,
    tableName: entry.name,
    tableCode: `#${entry.name.split('#')[1] ?? '07'}`,
    smallBlind: sb,
    bigBlind: bb,
    minBuyIn,
    maxBuyIn,
    buyInAmount: Math.round((minBuyIn + maxBuyIn) / 2),
  };
}

function getScreenFromHash(): ScreenRoute {
  const rawHash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  if (!rawHash || rawHash === '/') {
    return typeof window !== 'undefined' && window.innerWidth < 768
      ? 'm-splash'
      : 'splash';
  }
  if (rawHash === 'lobby') return 'lobby';
  if (rawHash === 'table') return 'table';
  if (rawHash === 'tables' || rawHash === 'browser') return 'tables';
  if (rawHash === 'login') return 'login';
  if (rawHash === 'register') return 'register';
  if (rawHash === 'hand-rankings' || rawHash === 'rankings') return 'hand-rankings';
  if (rawHash === 'splash') return 'splash';
  if (rawHash === 'm/splash' || rawHash === 'm-splash') return 'm-splash';
  if (rawHash === 'm/lobby' || rawHash === 'm-lobby') return 'm-lobby';
  if (rawHash === 'm/tables' || rawHash === 'm-tables') return 'm-tables';
  if (rawHash === 'm/tables/buy-in' || rawHash === 'm-buyin') return 'm-buyin';
  if (rawHash === 'm/table' || rawHash === 'm-table') return 'm-table';
  if (rawHash.startsWith('m/table/') || rawHash === 'm-table-alt') return 'm-table-alt';
  if (rawHash === 'm/login' || rawHash === 'm-login') return 'm-login';
  if (rawHash === 'm/guest-setup' || rawHash === 'm-guest-setup') return 'm-guest-setup';
  if (rawHash === 'showcase' || rawHash === 'dev') return 'showcase';
  return typeof window !== 'undefined' && window.innerWidth < 768
    ? 'm-splash'
    : 'splash';
}

const AppContent: React.FC = () => {
  const {
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
  } = useSession();

  const [currentScreen, setCurrentScreen] = useState<ScreenRoute>(getScreenFromHash);
  const [buyInSheetView, setBuyInSheetView] = useState<SheetTabState>('buyin');
  const [rankingsReturnScreen, setRankingsReturnScreen] = useState<ScreenRoute>('lobby');
  const [switcherOpen, setSwitcherOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentScreen(getScreenFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (screen: ScreenRoute) => {
    const routeMap: Partial<Record<ScreenRoute, string>> = {
      'm-splash': 'm/splash',
      'm-lobby': 'm/lobby',
      'm-tables': 'm/tables',
      'm-buyin': 'm/tables/buy-in',
      'm-table': 'm/table',
      'm-table-alt': 'm/table/alt',
      'm-login': 'm/login',
      'm-guest-setup': 'm/guest-setup',
    };
    const route = routeMap[screen] ?? screen;
    window.location.hash = `#/${route}`;
    setCurrentScreen(screen);
  };

  const openRankingsFrom = (origin: ScreenRoute) => {
    setRankingsReturnScreen(origin);
    navigateTo('hand-rankings');
  };

  const handleDesktopSelectTable = (spec?: TableSelectionSpec) => {
    if (spec) {
      seatAtTable({
        tableId: spec.tableId,
        tableName: spec.tableName,
        tableCode: `#${spec.tableName.split('#')[1] ?? '07'}`,
        smallBlind: spec.blinds[0],
        bigBlind: spec.blinds[1],
        minBuyIn: spec.minBuyIn,
        maxBuyIn: spec.maxBuyIn,
        buyInAmount: spec.buyIn,
        autoTopOff: true,
      });
    } else {
      seatAtTable();
    }
    navigateTo('table');
  };

  const isMobileViewport = () =>
    typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative min-h-screen">
      {/* Floating Screen Switcher Bar */}
      <div className="fixed bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 z-50 flex items-center gap-1 bg-surface-container-lowest border-[2px] border-surface-container-highest p-1 shadow-[4px_4px_0px_#000000] opacity-70 hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setSwitcherOpen(!switcherOpen)}
          className="px-1.5 sm:px-2 py-0.5 bg-surface-container font-label-sm uppercase text-label-sm text-on-surface flex items-center gap-1 cursor-pointer"
          title="Toggle Screen Switcher"
        >
          <span className="material-symbols-outlined text-[14px]">tune</span>
          <span className={switcherOpen ? 'font-bold' : 'hidden sm:inline font-bold'}>
            {currentScreen.toUpperCase()}
          </span>
        </button>

        {switcherOpen && (
          <div className="flex flex-wrap items-center gap-1 pl-1 border-l border-surface-container-highest max-w-sm sm:max-w-none">
            {(
              [
                { id: 'splash', label: 'Splash', badge: 'DT' },
                { id: 'login', label: 'Login', badge: 'DT' },
                { id: 'register', label: 'Register', badge: 'DT' },
                { id: 'lobby', label: 'Lobby', badge: 'DT' },
                { id: 'tables', label: 'Tables', badge: 'DT' },
                { id: 'table', label: 'Battle', badge: 'DT' },
                { id: 'hand-rankings', label: 'Rankings', badge: 'DT' },
                { id: 'm-splash', label: 'M-Splash', badge: 'MO' },
                { id: 'm-login', label: 'M-Login', badge: 'MO' },
                { id: 'm-guest-setup', label: 'M-Guest', badge: 'MO' },
                { id: 'm-lobby', label: 'M-Lobby', badge: 'MO' },
                { id: 'm-tables', label: 'M-Tables', badge: 'MO' },
                { id: 'm-buyin', label: 'M-BuyIn', badge: 'MO' },
                { id: 'm-table', label: 'M-Table', badge: 'MO' },
                { id: 'm-table-alt', label: 'M-Table Alt', badge: 'MO' },
                { id: 'showcase', label: 'Dev', badge: 'DEV' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigateTo(item.id);
                  setSwitcherOpen(false);
                }}
                className={`px-2 py-0.5 font-label-sm uppercase text-label-sm transition-all cursor-pointer flex items-center gap-1 ${
                  currentScreen === item.id
                    ? 'bg-primary-container text-on-primary-container shadow-[1px_1px_0px_#000000] -rotate-1 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[9px] opacity-60">[{item.badge}]</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {currentScreen === 'splash' && (
        <DesktopSplash
          onEnterLobby={session.isAuthenticated ? () => navigateTo('lobby') : undefined}
          onEnterLogin={() => navigateTo('login')}
        />
      )}

      {currentScreen === 'm-splash' && (
        <MobileSplash
          onEnter={() => navigateTo(session.isAuthenticated ? 'm-lobby' : 'm-login')}
        />
      )}

      {currentScreen === 'login' && (
        <DesktopLogin
          onLoginSuccess={(identifier) => {
            loginWithCredentials(identifier);
            navigateTo('lobby');
          }}
          onGoogleLogin={() => {
            loginWithGoogle();
            navigateTo('lobby');
          }}
          onGuestPlay={() => {
            startGuestSession('BOLT_ROOKIE', 'bolt');
            navigateTo('lobby');
          }}
          onNavigateToRegister={() => navigateTo('register')}
          onNavigateToLobby={() => navigateTo('lobby')}
        />
      )}

      {currentScreen === 'register' && (
        <DesktopRegister
          onRegisterSuccess={(callsign) => {
            registerAccount(callsign || 'CYBER_ACE_88');
            navigateTo(isMobileViewport() ? 'm-lobby' : 'lobby');
          }}
          onGuestPlay={() => {
            startGuestSession('SCRAP_ROOKIE', 'bolt');
            navigateTo(isMobileViewport() ? 'm-lobby' : 'lobby');
          }}
          onNavigateToLogin={() => navigateTo(isMobileViewport() ? 'm-login' : 'login')}
          onNavigateToLobby={() => navigateTo(isMobileViewport() ? 'm-lobby' : 'lobby')}
        />
      )}

      {currentScreen === 'lobby' && (
        <BattleLobby
          callsign={session.callsign}
          bankroll={session.bankroll}
          bonusClaimed={session.dailyBonusClaimed}
          onClaimBonus={() => claimDailyBonus(15000)}
          onRebuy={() => leaveTableSession(10000)}
          onLogout={() => {
            logout();
            navigateTo('login');
          }}
          onNavigateToTable={() => handleDesktopSelectTable()}
          onNavigateToCashBrowser={() => navigateTo('tables')}
          onNavigateToRankings={() => openRankingsFrom('lobby')}
        />
      )}

      {currentScreen === 'tables' && (
        <TableBrowser
          callsign={session.callsign}
          bankroll={session.bankroll}
          onNavigateToTable={handleDesktopSelectTable}
          onNavigateToLobby={() => navigateTo('lobby')}
          onNavigateToRankings={() => openRankingsFrom('tables')}
          onRebuy={() => leaveTableSession(10000)}
          onLogout={() => {
            logout();
            navigateTo('login');
          }}
        />
      )}

      {currentScreen === 'table' && (
        <BattleTable
          tableConfig={activeTableConfig}
          bankroll={session.bankroll}
          muted={session.muted}
          onToggleMute={toggleMute}
          onRequestRebuy={requestBankrollRebuy}
          onRequestTopOff={requestBankrollRebuy}
          onExitTable={(finalStack) => {
            leaveTableSession(finalStack);
            navigateTo('lobby');
          }}
          onBackToLobby={() => navigateTo('lobby')}
          onNavigateToRankings={() => openRankingsFrom('table')}
        />
      )}

      {currentScreen === 'hand-rankings' && (
        <HandRankings
          onBackToLobby={() => navigateTo(rankingsReturnScreen)}
          onNavigateToTable={() =>
            navigateTo(
              rankingsReturnScreen.startsWith('m-') ? 'm-table-alt' : 'table'
            )
          }
        />
      )}

      {currentScreen === 'm-login' && (
        <MobileLogin
          onLoginSuccess={(identifier) => {
            loginWithCredentials(identifier);
            navigateTo('m-lobby');
          }}
          onGoogleLogin={() => {
            loginWithGoogle();
            navigateTo('m-lobby');
          }}
          onGuestPlay={() => navigateTo('m-guest-setup')}
          onNavigateToRegister={() => navigateTo('register')}
        />
      )}

      {currentScreen === 'm-guest-setup' && (
        <MobileGuestSetup
          onBack={() => navigateTo('m-login')}
          onStartPlaying={(callsign, avatarId) => {
            startGuestSession(callsign, (avatarId as AvatarMaskId) || 'bolt');
            window.setTimeout(() => navigateTo('m-lobby'), 350);
          }}
        />
      )}

      {currentScreen === 'm-lobby' && (
        <MobileBattleLobby
          callsign={session.callsign}
          bankroll={session.bankroll}
          level={session.level}
          rankLabel={session.rankLabel}
          bonusClaimed={session.dailyBonusClaimed}
          onClaimBonus={() => claimDailyBonus(15000)}
          onRebuy={() => leaveTableSession(10000)}
          onLogout={() => {
            logout();
            navigateTo('m-login');
          }}
          onNavigateToTable={() => {
            seatAtTable();
            navigateTo('m-table');
          }}
          onNavigateToCashBrowser={() => navigateTo('m-tables')}
          onNavigateToRankings={() => openRankingsFrom('m-lobby')}
        />
      )}

      {currentScreen === 'm-tables' && (
        <MobileTableBrowser
          playerBalance={formatCompactChips(session.bankroll)}
          onBackToLobby={() => navigateTo('m-lobby')}
          onOpenFilters={() => {
            setBuyInSheetView('filters');
            navigateTo('m-buyin');
          }}
          onJoinTable={(tableId, entry) => {
            if (entry) {
              selectTableForBuyIn(parseMobileTableEntry(entry));
            } else {
              selectTableForBuyIn({ tableId });
            }
            setBuyInSheetView('buyin');
            window.setTimeout(() => navigateTo('m-buyin'), 300);
          }}
        />
      )}

      {currentScreen === 'm-buyin' && (
        <MobileBuyInSheet
          initialView={buyInSheetView}
          bankroll={session.bankroll}
          playerBalance={formatCompactChips(session.bankroll)}
          playerBankrollFull={`${session.bankroll.toLocaleString()} SCRAP`}
          tableName={selectedTable.tableName}
          blindsText={`${selectedTable.smallBlind} / ${selectedTable.bigBlind}`}
          bigBlind={selectedTable.bigBlind}
          minBuyIn={selectedTable.minBuyIn}
          maxBuyIn={selectedTable.maxBuyIn}
          initialBuyIn={selectedTable.buyInAmount}
          onBack={() => navigateTo('m-tables')}
          onApplyFilters={() => navigateTo('m-tables')}
          onClaimBonus={() => claimDailyBonus(25000)}
          onConfirmJoin={(buyInAmount, autoTopOff) => {
            seatAtTable({ buyInAmount, autoTopOff });
            const targetScreen: ScreenRoute =
              selectedTable.tableId === 'cyber-den-15' ? 'm-table-alt' : 'm-table';
            window.setTimeout(() => navigateTo(targetScreen), 450);
          }}
        />
      )}

      {currentScreen === 'm-table' && (
        <MobileBattleTable
          tableConfig={activeTableConfig}
          tableLabel={activeTableConfig.tableCode}
          bankroll={session.bankroll}
          muted={session.muted}
          onToggleMute={toggleMute}
          onRequestTopOff={requestBankrollRebuy}
          onExitTable={(finalStack) => {
            if (typeof finalStack === 'number') {
              leaveTableSession(finalStack);
            }
            navigateTo('m-tables');
          }}
          onNavigateToRankings={() => openRankingsFrom('m-table')}
        />
      )}

      {currentScreen === 'm-table-alt' && (
        <MobileBattleTableAlt
          tableConfig={activeTableConfig}
          tableLabel={activeTableConfig.tableCode}
          bankroll={session.bankroll}
          muted={session.muted}
          onToggleMute={toggleMute}
          onRequestTopOff={requestBankrollRebuy}
          onExitTable={(finalStack) => {
            if (typeof finalStack === 'number') {
              leaveTableSession(finalStack);
            }
            navigateTo('m-tables');
          }}
          onNavigateToRankings={() => openRankingsFrom('m-table-alt')}
        />
      )}

      {currentScreen === 'showcase' && <ComponentShowcase />}
    </div>
  );
};

export const App: React.FC = () => (
  <SessionProvider>
    <AppContent />
  </SessionProvider>
);

export default App;
