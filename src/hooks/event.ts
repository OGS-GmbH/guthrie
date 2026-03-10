import type {DynamicEvent} from "../renderer/type.ts";
import {useGuthrieEventsConfigStore} from "../stores/events.ts";
import {type RefObject} from "react";
import {addEvent} from "../options/fns.ts";
import {useMountedEffect} from "./effect.ts";


function useGuthrieEvents(target: HTMLElement | Window | RefObject<HTMLElement | null>, eventConfigs?: DynamicEvent[]) {
  const eventContext = useGuthrieEventsConfigStore((state) => state.config);

  useMountedEffect(() => {
    if (!eventContext.autoApply || !eventConfigs)
      return

    let domTarget: HTMLElement | Window;

    if (target instanceof HTMLElement || target instanceof Window)
      domTarget = target;
    else
      domTarget = target.current;

    if (!domTarget)
      return;

    eventConfigs?.forEach((eventConfig) => addEvent(eventConfig.type, domTarget, eventConfig.actions));
  }, []);
}

export {useGuthrieEvents}
