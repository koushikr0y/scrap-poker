import React, { useState } from 'react';
import { TableBrowser } from './components/screens/TableBrowser';
import { BattleTable } from './components/screens/BattleTable';
import { ComponentShowcase } from './components/dev/ComponentShowcase';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'browser' | 'table' | 'showcase'>('browser');

  return (
    <div className="relative min-h-screen">
      {/* Floating Screen Switcher Bar */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 bg-surface-container-lowest border-[2px] border-surface-container-highest p-1 shadow-[3px_3px_0px_#000000]">
        <button
          type="button"
          onClick={() => setCurrentScreen('browser')}
          className={`px-3 py-1 font-label-md uppercase text-label-md transition-all ${
            currentScreen === 'browser'
              ? 'bg-primary-container text-on-primary-container shadow-[1px_1px_0px_#000000] -rotate-1'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Table Browser
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('table')}
          className={`px-3 py-1 font-label-md uppercase text-label-md transition-all ${
            currentScreen === 'table'
              ? 'bg-primary-container text-on-primary-container shadow-[1px_1px_0px_#000000] -rotate-1'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Battle Table
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('showcase')}
          className={`px-3 py-1 font-label-md uppercase text-label-md transition-all ${
            currentScreen === 'showcase'
              ? 'bg-primary-container text-on-primary-container shadow-[1px_1px_0px_#000000] -rotate-1'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Dev Showcase
        </button>
      </div>

      {currentScreen === 'browser' && (
        <TableBrowser
          onNavigateToTable={() => setCurrentScreen('table')}
          onNavigateToLobby={() => setCurrentScreen('browser')}
        />
      )}

      {currentScreen === 'table' && (
        <BattleTable onBackToLobby={() => setCurrentScreen('browser')} />
      )}

      {currentScreen === 'showcase' && <ComponentShowcase />}
    </div>
  );
};

export default App;
