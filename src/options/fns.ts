import {callFn} from "../renderer/fns";
import type {ExposableFn, Fns} from "../renderer/type";
import {useGuthrieEvents} from "../stores/events";
import {useGuthrieRefs} from "../stores/refs";

function normalizeTargetName (target: HTMLElement | Window | string): string {
  if (typeof target === "string")
    return target;

  if (target instanceof Window)
    return "window"

  return target.toString();
}

function removeListener(
  target: HTMLElement | Window | string,
  name: keyof GlobalEventHandlersEventMap
) {
  const targetName = normalizeTargetName(target);
  let domTarget: HTMLElement | Window;

  if (typeof target === "string")
    domTarget = useGuthrieRefs.getState().refs[targetName]!;
  else
    domTarget = target;

  domTarget.removeEventListener(name, useGuthrieEvents.getState().events[targetName]![name]);
  useGuthrieEvents.getState().removeEvent(targetName, name);
}

function addListener(
  target: HTMLElement | Window | string | null,
  name: keyof GlobalEventHandlersEventMap,
  actions: ExposableFn[]
) {
  if (target === null)
    return;

  const targetName = normalizeTargetName(target);
  const listener = (event: Event) => actions.forEach((fn) => {
      const argSubs: Record<number, Event> = {};

      fn.args?.forEach((arg, index) => {
        if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string")
          return;

        if(arg.type === "event")
          argSubs[index] = event;
      });

      void callFn(fn, argSubs);
    });

  let domTarget: HTMLElement | Window;

  if (typeof target === "string")
    domTarget = useGuthrieRefs.getState().getRef(targetName);
  else
    domTarget = target;

  if (domTarget === null)
    return;

  const oldListener = useGuthrieEvents.getState().events[targetName]?.[name];

  if (oldListener)
    domTarget.removeEventListener(name, oldListener);

  domTarget.addEventListener(name, listener);
  useGuthrieEvents.getState().addEvent(targetName, name, listener);
}

const native: Fns = {
  "removeListener": removeListener,
  "addListener": addListener,
  "fetch": fetch,
  // oxlint-disable no-console
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
  // oxlint-enable no-console
}

export {
  native,
  addListener,
  removeListener
}
