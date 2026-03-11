import { useRef } from "react";

function useInitialize (
  callback: () => void
) {
  const initialized = useRef(false);

  if (initialized.current)
    return;

  initialized.current = true;
  callback();
}

export {
  useInitialize
}
