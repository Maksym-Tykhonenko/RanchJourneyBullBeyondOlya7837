import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (mounted && raw !== null) {
          setValue(JSON.parse(raw) as T);
        }
      } catch {}
      if (mounted) {
        setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [key]);

  const write = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue(prev => {
        const resolved =
          typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        AsyncStorage.setItem(key, JSON.stringify(resolved)).catch(() => {});
        return resolved;
      });
    },
    [key],
  );

  return {value, write, ready};
}
