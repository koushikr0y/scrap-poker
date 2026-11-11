import React, { useState, useEffect } from 'react';
import { TableBrowser } from './components/screens/TableBrowser';
import { BattleTable } from './components/screens/BattleTable';
import { BattleLobby } from './components/screens/BattleLobby';
import { DesktopLogin } from './components/screens/DesktopLogin';
import { DesktopRegister } from './components/screens/DesktopRegister';
import { HandRankings } from './components/screens/HandRankings';
import { DesktopSplash } from './components/screens/DesktopSplash';
import { MobileBattleLobby } from './components/screens/MobileBattleLobby';
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
    const route = screen === 'm-lobby' ? 'm/lobby' : screen;
    window.location.hash = `#/${route}`;
    setCurrentScreen(screen);
  };

  const [switcherOpen, setSwitcherOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Floating Screen Switcher Bar */}
      <div className="fixed bottom-3 right-3 z-50 flex items-center gap-1 bg-surface-container-lowest border-[2px] border-surface-container-highest p-1 shadow-[4px_4px_0px_#000000] opacity-80 hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setSwitcherOpen(!switcherOpen)}
          className="px-2 py-0.5 bg-surface-container font-label-sm uppercase text-label-sm text-on-surface flex items-center gap-1 cursor-pointer"
          title="Toggle Screen Switcher"
        >
          <span className="material-symbols-outlined text-[14px]">tune</span>
          <span className="font-bold">{currentScreen.toUpperCase()}</span>
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
          onNavigateToTable={() => navigateTo('table')}
          onNavigateToCashBrowser={() => navigateTo('tables')}
          onNavigateToRankings={() => navigateTo('hand-rankings')}
        />
      )}

      {currentScreen === 'showcase' && <ComponentShowcase />}
    </div>
  );
};

export default App;
