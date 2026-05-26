import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {usePersistedState} from '../hooks/usePersistedState';
import {storageKeys} from '../core/storageKeys';
import {MyAnimal} from '../domain/models';

type Ctx = {
  items: MyAnimal[];
  add: (payload: Omit<MyAnimal, 'id' | 'createdAt'>) => void;
  remove: (id: string) => void;
};

const MyAnimalsCtx = createContext<Ctx | null>(null);

export const MyAnimalsProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {value, write} = usePersistedState<MyAnimal[]>(storageKeys.myAnimals, []);

  const add = useCallback(
    (payload: Omit<MyAnimal, 'id' | 'createdAt'>) => {
      const entry: MyAnimal = {
        ...payload,
        id: `user-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
        createdAt: Date.now(),
      };
      write(prev => [entry, ...prev]);
    },
    [write],
  );

  const remove = useCallback(
    (id: string) => write(prev => prev.filter(x => x.id !== id)),
    [write],
  );

  const ctx = useMemo<Ctx>(
    () => ({items: value, add, remove}),
    [value, add, remove],
  );

  return <MyAnimalsCtx.Provider value={ctx}>{children}</MyAnimalsCtx.Provider>;
};

export const useMyAnimals = () => {
  const v = useContext(MyAnimalsCtx);
  if (!v) {
    throw new Error('MyAnimalsProvider missing');
  }
  return v;
};
