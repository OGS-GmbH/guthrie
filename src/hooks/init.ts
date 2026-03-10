import { useRef } from "react";

function useInitialze (
  callback: () => void
) {
  const initialized = useRef(false);

  if (initialized.current)
    return;

  initialized.current = true;
  callback();
}
