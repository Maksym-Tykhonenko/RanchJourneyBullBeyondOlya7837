import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {usePersistedState} from '../hooks/usePersistedState';
import {storageKeys} from '../core/storageKeys';

type Ctx = {
  locations: string[];
  isLocationSaved: (id: string) => boolean;
  toggleLocation: (id: string) => void;
  clearLocations: () => void;
};

const SavedCtx = createContext<Ctx | null>(null);

const toggleIn = (list: string[], id: string) =>
  list.includes(id) ? list.filter(x => x !== id) : [...list, id];

export const SavedRegistryProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {value, write} = usePersistedState<string[]>(
    storageKeys.savedLocations,
    [],
  );

  const toggle = useCallback(
    (id: string) => write(prev => toggleIn(prev, id)),
    [write],
  );
  const clear = useCallback(() => write([]), [write]);

  const ctx = useMemo<Ctx>(
    () => ({
      locations: value,
      isLocationSaved: id => value.includes(id),
      toggleLocation: toggle,
      clearLocations: clear,
    }),
    [value, toggle, clear],
  );

  return <SavedCtx.Provider value={ctx}>{children}</SavedCtx.Provider>;
};

export const useSavedRegistry = () => {
  const v = useContext(SavedCtx);
  if (!v) {
    throw new Error('SavedRegistryProvider missing');
  }
  return v;
};
