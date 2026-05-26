import React from 'react';
import {OnboardingGateProvider} from './OnboardingGateContext';
import {SavedRegistryProvider} from './SavedRegistryContext';
import {MyAnimalsProvider} from './MyAnimalsContext';
import {GameScoreProvider} from './GameScoreContext';

export const StateProviders: React.FC<{children: React.ReactNode}> = ({
  children,
}) => (
  <OnboardingGateProvider>
    <SavedRegistryProvider>
      <MyAnimalsProvider>
        <GameScoreProvider>{children}</GameScoreProvider>
      </MyAnimalsProvider>
    </SavedRegistryProvider>
  </OnboardingGateProvider>
);
