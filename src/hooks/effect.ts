import { useEffect, useRef, type EffectCallback } from "react";

function useMountedEffect (effect: EffectCallback): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current)
      return;

    isMounted.current = true;
    return effect();
  }, []);
}

export {
  useMountedEffect
}
