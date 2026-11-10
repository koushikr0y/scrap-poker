import React, { useState, useEffect } from 'react';
import { TableBrowser } from './components/screens/TableBrowser';
import { BattleTable } from './components/screens/BattleTable';
import { BattleLobby } from './components/screens/BattleLobby';
import { DesktopLogin } from './components/screens/DesktopLogin';
import { DesktopRegister } from './components/screens/DesktopRegister';
import { ComponentShowcase } from './components/dev/ComponentShowcase';

export type ScreenRoute = 'lobby' | 'tables' | 'table' | 'login' | 'register' | 'showcase';

export const App: React.FC = () => {
  const getScreenFromHash = (): ScreenRoute => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
    if (hash === 'lobby') return 'lobby';
    if (hash === 'table') return 'table';
    if (hash === 'tables' || hash === 'browser') return 'tables';
    if (hash === 'login') return 'login';
    if (hash === 'register') return 'register';
    if (hash === 'showcase' || hash === 'dev') return 'showcase';
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
    window.location.hash = `#/${screen}`;
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
          <div className="flex flex-wrap items-center gap-1 pl-1 border-l border-surface-container-highest">
            {(
              [
                { id: 'lobby', label: 'Lobby' },
                { id: 'tables', label: 'Tables' },
                { id: 'table', label: 'Battle' },
                { id: 'login', label: 'Login' },
                { id: 'register', label: 'Register' },
                { id: 'showcase', label: 'Dev' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigateTo(item.id);
                  setSwitcherOpen(false);
                }}
                className={`px-2 py-0.5 font-label-sm uppercase text-label-sm transition-all cursor-pointer ${
                  currentScreen === item.id
                    ? 'bg-primary-container text-on-primary-container shadow-[1px_1px_0px_#000000] -rotate-1 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
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

      {currentScreen === 'showcase' && <ComponentShowcase />}
    </div>
  );
};

export default App;
