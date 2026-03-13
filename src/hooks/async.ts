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

export type UsePromise = <T>(promise: Promise<T>) => T | null;

const usePromise: UsePromise = <T>(promise: Promise<T>) => {
  const isMounted = useMountedState();
  const [state, setState] = useState<T | null>(null);
  const callback = useCallback((promise: Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      const onValue = (value) => {
        isMounted() && resolve(value);
      };
      const onError = (error) => {
        isMounted() && reject(error);
      };
      promise.then(onValue, onError);
    }), []);

  callback(promise).then((result) => setState(result));

  return state;
};

export {
  useMountedState,
  usePromise
};
