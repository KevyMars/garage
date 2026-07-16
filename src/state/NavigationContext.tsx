import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ScreenName, ScreenParams, StackEntry, TabName } from '../types';

interface NavigationContextValue {
  stack: StackEntry[];
  current: StackEntry;
  activeTab: TabName;
  showTabBar: boolean;
  push: (name: ScreenName, params?: ScreenParams) => void;
  pop: () => void;
  goToTab: (tab: TabName) => void;
  resetToGarage: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<StackEntry[]>([{ name: 'garage', params: {} }]);
  const [activeTab, setActiveTab] = useState<TabName>('garage');

  const push = useCallback((name: ScreenName, params: ScreenParams = {}) => {
    setStack((s) => [...s, { name, params }]);
  }, []);

  const pop = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const goToTab = useCallback((tab: TabName) => {
    setStack([{ name: tab === 'log' ? 'log' : tab, params: {} }]);
    setActiveTab(tab);
  }, []);

  const resetToGarage = useCallback(() => {
    setStack([{ name: 'garage', params: {} }]);
    setActiveTab('garage');
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      stack,
      current: stack[stack.length - 1],
      activeTab,
      showTabBar: stack.length === 1,
      push,
      pop,
      goToTab,
      resetToGarage,
    }),
    [stack, activeTab, push, pop, goToTab, resetToGarage],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
