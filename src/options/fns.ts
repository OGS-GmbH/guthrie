import type {Fns} from "../renderer/type";
import {addListener, removeListener} from "../functions/internals";

/**
 * Internal functions provided by the system.
 *
 * These functions are part of the internal runtime and are typically
 * not intended for direct use in user-defined configurations.
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 */
const internal: Fns = {
  "removeListener": removeListener,
  "addListener": addListener,
}

/**
 * Native functions available within the runtime.
 *
 * Includes browser APIs utilities that can be used
 * inside function definitions.
 *
 * @remarks
 * - Wraps native browser functionality
 * - Useful for debugging and side effects
 *
 * @since 1.0.0
 * @category Configuration
 * @author Simon Kovtyk
 * @todo To be completed
 */
const native: Fns = {
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
  internal,
}
