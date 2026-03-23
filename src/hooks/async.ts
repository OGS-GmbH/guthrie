import {useCallback, useEffect, useRef, useState} from 'react';

function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
}

type UsePromise = <T>(promise: Promise<T>) => T | null;

const usePromise: UsePromise = <T>(promise: Promise<T>) => {
  const isMounted = useMountedState();
  const [state, setState] = useState<T | null>(null);
  const callback = useCallback((promise: Promise<T>) => // oxlint-disable-line eslint(no-shadow)
    new Promise<T>((resolve, reject) => {
      const onValue = (value: T) => {
        isMounted() && resolve(value);
      };
      const onError = (error: T) => {
        isMounted() && reject(error);
      };
      promise.then(onValue, onError);
    }), []);

  callback(promise).then((result) => setState(result));

  return state;
};

export type {
  UsePromise
}

export {
  useMountedState,
  usePromise
};
