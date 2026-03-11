import type { Fns } from "../renderer/type";

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

const native: Fns = {
  "fetch": fetch,
  ...CONSOLE_METHODS
}

export {
  native
}
