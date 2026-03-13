import { useEffect, useRef } from "react";

function useInitialize (
  callback: () => void
) {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    initialized.current = true;
  }, []);

  if (initialized.current)
    return;

  callback();
}

export {
  useInitialize
}
