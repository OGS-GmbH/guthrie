import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

function useMountedEffect (effect: EffectCallback, deps?: DependencyList): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current)
      return;

    isMounted.current = true;
    return effect();
  }, deps);
}

export {
  useMountedEffect
}
