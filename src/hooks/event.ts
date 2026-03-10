import type {DynamicEvent} from "../renderer/type.ts";
import {useGuthrieEventsConfigStore} from "../stores/events.ts";
import {type RefObject} from "react";
import {eventStoreHack, fnStoreHack} from "../options/fns.ts";
import {useMountedEffect} from "./effect.ts";


function addEventListener(eventConfig: DynamicEvent, domTarget: HTMLElement | Window) {
  const listener = (event: Event) =>
    /*TODO: expose event to args*/
    eventConfig.actions.forEach((action: { fn: string; args: Array<unknown> }) => {
      fnStoreHack.get(action.fn)(...action.args);
    });

  domTarget.addEventListener(eventConfig.type, listener);

  if (eventConfig.as)
    eventStoreHack.set(eventConfig.as, {target: domTarget, listener: {type: eventConfig.type, fn: listener}});
}

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

    eventConfigs?.forEach((eventConfig) => addEventListener(eventConfig, domTarget));
  }, []);
}

export {useGuthrieEvents}
