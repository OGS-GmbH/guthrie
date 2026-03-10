import type {Fns} from "../renderer/type";
import {type RegisteredEvent, useGuthrieEventStore} from "../stores/events.ts";

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
  "fetch": fetch,
  ...CONSOLE_METHODS
}

export {
  native,
  removeEvents,
  eventStoreHack,
  fnStoreHack
}
