import type {ExposableEvent} from "../renderer/type.ts";
import { addListener } from "../options/fns.ts";
import { type RefObject } from "react";

type UseGuthrieEventsCallbackReturn = () => void;

function useGuthrieEventsCallback (
  target: RefObject<HTMLElement | Window | string | null>,
  events: ExposableEvent[] | undefined,
): UseGuthrieEventsCallbackReturn {
  return () => {
    events?.forEach((event) => {
      addListener(target.current, event.name, event.actions);
    });
  }
}

export {
  useGuthrieEventsCallback
}
