import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {usePersistedState} from '../hooks/usePersistedState';
import {storageKeys} from '../core/storageKeys';

type Ctx = {
  best: number;
  submit: (score: number) => void;
};

const GameScoreCtx = createContext<Ctx | null>(null);

export const GameScoreProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {value, write} = usePersistedState<number>(storageKeys.bestScore, 0);

  const submit = useCallback(
    (score: number) => {
      if (score > value) {
        write(score);
      }
    },
    [value, write],
  );

  const ctx = useMemo<Ctx>(() => ({best: value, submit}), [value, submit]);
  return <GameScoreCtx.Provider value={ctx}>{children}</GameScoreCtx.Provider>;
};

export const useGameScore = () => {
  const v = useContext(GameScoreCtx);
  if (!v) {
    throw new Error('GameScoreProvider missing');
  }
  return v;
};
