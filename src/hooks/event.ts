import type {DynamicEvent} from "../renderer/type.ts";
import {useGuthrieEventsConfigStore, useGuthrieEventsStore} from "../stores/events.ts";
import {useGuthrieFns} from "../stores/fns.ts";
import {type RefObject, useEffect} from "react";


function useGuthrieEvents(target: HTMLElement | Window | RefObject<HTMLElement | null>, eventConfigs?: DynamicEvent[]) {
  const eventContext = useGuthrieEventsConfigStore((state) => state.config);
  const fns = useGuthrieFns((state) => state.fns);
  const addEvent = useGuthrieEventsStore((state) => state.addEvent)

  useEffect(() => {
    if (!eventContext.autoApply || !eventConfigs)
      return

    let domTarget: HTMLElement | Window;

    if (target instanceof HTMLElement || target instanceof Window)
      domTarget = target;
    else
      domTarget = target.current;

    if (!domTarget)
      return;

    eventConfigs?.forEach((eventConfig) => {
      const listener = (event: Event) =>
        /*TODO: expose event to args*/
        eventConfig.actions.forEach((action: { fn: string; args: Array<unknown> }) => {
          fns[action.fn](...action.args)
        });

      domTarget.addEventListener(eventConfig.type, listener);

      if (eventConfig.as)
        addEvent(eventConfig.as, domTarget, listener);
    });
  }, []);
}

export {useGuthrieEvents}
