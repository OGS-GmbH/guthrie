import type {ExposableEvent} from "../renderer/type.ts";
import {useGuthrieEventsConfig} from "../stores/events.ts";
import {useMountedEffect} from "./effect.ts";
import { addListener } from "../options/fns.ts";
import type { RefObject } from "react";

function useGuthrieEventsApply (
  target: RefObject<HTMLElement | Window | string>,
  events: ExposableEvent[],
) {
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);

  useMountedEffect(() => {
    if (!eventsConfig.autoApply)
      return

    events.forEach((event) => {
      console.log(event);
      addListener(target.current, event.name, event.actions);
    });
  });
}

export {
  useGuthrieEventsApply
}
