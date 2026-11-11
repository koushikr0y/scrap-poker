import React, { useState, useEffect } from 'react';
import { TableBrowser } from './components/screens/TableBrowser';
import { BattleTable } from './components/screens/BattleTable';
import { BattleLobby } from './components/screens/BattleLobby';
import { DesktopLogin } from './components/screens/DesktopLogin';
import { DesktopRegister } from './components/screens/DesktopRegister';
import { HandRankings } from './components/screens/HandRankings';
import { DesktopSplash } from './components/screens/DesktopSplash';
import { MobileBattleLobby } from './components/screens/MobileBattleLobby';
import { MobileTableBrowser } from './components/screens/MobileTableBrowser';
import { MobileBattleTable } from './components/screens/MobileBattleTable';
import { MobileBattleTableAlt } from './components/screens/MobileBattleTableAlt';
import { MobileBuyInSheet } from './components/screens/MobileBuyInSheet';
import { MobileLogin } from './components/screens/MobileLogin';
import { MobileGuestSetup } from './components/screens/MobileGuestSetup';
import { ComponentShowcase } from './components/dev/ComponentShowcase';

export type ScreenRoute =
  | 'lobby'
  | 'tables'
  | 'table'
  | 'login'
  | 'register'
  | 'hand-rankings'
  | 'splash'
  | 'm-lobby'
  | 'm-tables'
  | 'm-buyin'
  | 'm-table'
  | 'm-table-alt'
  | 'm-login'
  | 'm-guest-setup'
  | 'showcase';

export const App: React.FC = () => {
  const getScreenFromHash = (): ScreenRoute => {
    const rawHash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
    if (rawHash === 'lobby') return 'lobby';
    if (rawHash === 'table') return 'table';
    if (rawHash === 'tables' || rawHash === 'browser') return 'tables';
    if (rawHash === 'login') return 'login';
    if (rawHash === 'register') return 'register';
    if (rawHash === 'hand-rankings' || rawHash === 'rankings') return 'hand-rankings';
    if (rawHash === 'splash') return 'splash';
    if (rawHash === 'm/lobby' || rawHash === 'm-lobby') return 'm-lobby';
    if (rawHash === 'm/tables' || rawHash === 'm-tables') return 'm-tables';
    if (rawHash === 'm/tables/buy-in' || rawHash === 'm-buyin') return 'm-buyin';
    if (rawHash === 'm/table' || rawHash === 'm-table') return 'm-table';
    if (rawHash.startsWith('m/table/') || rawHash === 'm-table-alt') return 'm-table-alt';
    if (rawHash === 'm/login' || rawHash === 'm-login') return 'm-login';
    if (rawHash === 'm/guest-setup' || rawHash === 'm-guest-setup') return 'm-guest-setup';
    if (rawHash === 'showcase' || rawHash === 'dev') return 'showcase';
    return 'lobby';
  };

  const [currentScreen, setCurrentScreen] = useState<ScreenRoute>(getScreenFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentScreen(getScreenFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (screen: ScreenRoute) => {
    const routeMap: Partial<Record<ScreenRoute, string>> = {
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

  const [switcherOpen, setSwitcherOpen] = useState(false);

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
                { id: 'lobby', label: 'Lobby', badge: 'DT' },
                { id: 'tables', label: 'Tables', badge: 'DT' },
                { id: 'table', label: 'Battle', badge: 'DT' },
                { id: 'hand-rankings', label: 'Rankings', badge: 'DT' },
                { id: 'splash', label: 'Splash', badge: 'DT' },
                { id: 'login', label: 'Login', badge: 'DT' },
                { id: 'register', label: 'Register', badge: 'DT' },
                { id: 'm-lobby', label: 'M-Lobby', badge: 'MO' },
                { id: 'm-tables', label: 'M-Tables', badge: 'MO' },
                { id: 'm-buyin', label: 'M-BuyIn', badge: 'MO' },
                { id: 'm-table', label: 'M-Table', badge: 'MO' },
                { id: 'm-table-alt', label: 'M-Table Alt', badge: 'MO' },
                { id: 'm-login', label: 'M-Login', badge: 'MO' },
                { id: 'm-guest-setup', label: 'M-Guest', badge: 'MO' },
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

      {currentScreen === 'lobby' && (
        <BattleLobby
          onNavigateToTable={() => navigateTo('table')}
          onNavigateToCashBrowser={() => navigateTo('tables')}
        />
      )}

      {currentScreen === 'tables' && (
        <TableBrowser
          onNavigateToTable={() => navigateTo('table')}
          onNavigateToLobby={() => navigateTo('lobby')}
        />
      )}

      {currentScreen === 'table' && (
        <BattleTable onBackToLobby={() => navigateTo('lobby')} />
      )}

      {currentScreen === 'hand-rankings' && (
        <HandRankings
          onBackToLobby={() => navigateTo('lobby')}
          onNavigateToTable={() => navigateTo('table')}
        />
      )}

      {currentScreen === 'splash' && (
        <DesktopSplash
          onEnterLobby={() => navigateTo('lobby')}
          onEnterLogin={() => navigateTo('login')}
        />
      )}

      {currentScreen === 'login' && (
        <DesktopLogin
          onLoginSuccess={() => navigateTo('lobby')}
          onNavigateToRegister={() => navigateTo('register')}
          onNavigateToLobby={() => navigateTo('lobby')}
        />
      )}

      {currentScreen === 'register' && (
        <DesktopRegister
          onRegisterSuccess={() => navigateTo('lobby')}
          onNavigateToLogin={() => navigateTo('login')}
          onNavigateToLobby={() => navigateTo('lobby')}
        />
      )}

      {currentScreen === 'm-lobby' && (
        <MobileBattleLobby
          onNavigateToTable={() => navigateTo('m-table')}
          onNavigateToCashBrowser={() => navigateTo('m-tables')}
          onNavigateToRankings={() => navigateTo('hand-rankings')}
        />
      )}

      {currentScreen === 'm-tables' && (
        <MobileTableBrowser
          onBackToLobby={() => navigateTo('m-lobby')}
          onOpenFilters={() => navigateTo('m-buyin')}
          onJoinTable={(tableId) =>
            window.setTimeout(
              () => navigateTo(tableId === 'cyber-den-15' ? 'm-table-alt' : 'm-table'),
              450
            )
          }
        />
      )}

      {currentScreen === 'm-buyin' && (
        <MobileBuyInSheet
          onBack={() => navigateTo('m-tables')}
          onConfirmJoin={() => window.setTimeout(() => navigateTo('m-table'), 900)}
        />
      )}

      {currentScreen === 'm-table' && (
        <MobileBattleTable
          onExitTable={() => navigateTo('m-tables')}
          onNavigateToRankings={() => navigateTo('hand-rankings')}
        />
      )}

      {currentScreen === 'm-table-alt' && (
        <MobileBattleTableAlt
          onExitTable={() => navigateTo('m-tables')}
          onNavigateToRankings={() => navigateTo('hand-rankings')}
        />
      )}

      {currentScreen === 'm-login' && (
        <MobileLogin
          onLoginSuccess={() => navigateTo('m-lobby')}
          onGuestPlay={() => navigateTo('m-guest-setup')}
          onNavigateToRegister={() => navigateTo('register')}
        />
      )}

      {currentScreen === 'm-guest-setup' && (
        <MobileGuestSetup
          onBack={() => navigateTo('m-login')}
          onStartPlaying={() => window.setTimeout(() => navigateTo('m-lobby'), 600)}
        />
      )}

      {currentScreen === 'showcase' && <ComponentShowcase />}
    </div>
  );
};

export default App;
