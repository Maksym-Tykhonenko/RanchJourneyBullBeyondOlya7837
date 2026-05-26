import React, {createContext, useContext, useMemo} from 'react';
import {usePersistedState} from '../hooks/usePersistedState';
import {storageKeys} from '../core/storageKeys';

type Ctx = {
  passed: boolean;
  ready: boolean;
  markPassed: () => void;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export const OnboardingGateProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {value, write, ready} = usePersistedState<boolean>(
    storageKeys.onboardingDone,
    false,
  );

  const ctx = useMemo<Ctx>(
    () => ({passed: value, ready, markPassed: () => write(true)}),
    [value, ready, write],
  );

  return <OnboardingCtx.Provider value={ctx}>{children}</OnboardingCtx.Provider>;
};

export const useOnboardingGate = () => {
  const v = useContext(OnboardingCtx);
  if (!v) {
    throw new Error('OnboardingGateProvider missing');
  }
  return v;
};
