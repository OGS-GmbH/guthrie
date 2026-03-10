import type {DynamicEvent, Fns} from "../renderer/type";
import {type RegisteredEvent, useGuthrieEventStore} from "../stores/events.ts";
import type {RefObject} from "react";

// oxlint-disable no-console
const CONSOLE_METHODS = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,

  table: console.table,
  dir: console.dir,
  dirxml: console.dirxml,

  group: console.group,
  groupCollapsed: console.groupCollapsed,
  groupEnd: console.groupEnd,

  count: console.count,
  countReset: console.countReset,

  time: console.time,
  timeLog: console.timeLog,
  timeEnd: console.timeEnd,

  trace: console.trace,

  assert: console.assert,

  clear: console.clear
};
// oxlint-enable no-console

const eventStoreHack: Map<string, RegisteredEvent> = new Map<string, RegisteredEvent>();
const fnStoreHack: Map<string, Function> = new Map<string, Function>();
const refStoreHack: Map<string, RefObject<HTMLElement | null>> = new Map<string, RefObject<HTMLElement | null>>()


function removeEvents(...eventRefNames: string[]) {
  eventRefNames.forEach((eventRefName) => {
    const event = eventStoreHack.get(eventRefName);

    if (!event)
      return;

    event.target.removeEventListener(event.listener.type, event.listener.fn);
    eventStoreHack.delete(eventRefName);
  });
}

const native: Fns = {
  "removeEvents": removeEvents,
  "addEvents": addEvent,
  "fetch": fetch,
  ...CONSOLE_METHODS
}

function addEvent(eventName: keyof GlobalEventHandlersEventMap, target: HTMLElement | Window | string, actions:  Array<{ fn: string, args: Array<unknown> }>) {
  const listener = (event: Event) =>
    /*TODO: expose event to args*/
    actions.forEach((action: { fn: string; args: Array<unknown> }) => {
      fnStoreHack.get(action.fn)(...action.args);
    });

  let domTarget: HTMLElement | Window;

  if (typeof target === "string")
    domTarget = refStoreHack.get(target).current;
  else
    domTarget = target;


  domTarget.addEventListener(eventName, listener);

/* TODO expose
  if (eventConfig.as)
    eventStoreHack.set(eventConfig.as, {target: domTarget, listener: {type: eventConfig.type, fn: listener}});*/
}

export {
  native,
  removeEvents,
  addEvent,
  eventStoreHack,
  fnStoreHack,
  refStoreHack
}
