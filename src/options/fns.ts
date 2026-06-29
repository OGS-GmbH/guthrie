"use client";

import { addListener, removeListener } from "../functions/internals.js";
import type { Fns } from "../renderer/type.js";
import {useGuthrieVariables} from "../stores/variables.js";

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
  "remove-listener": removeListener,
  "add-listener": addListener
};

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
  fetch: fetch,
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
  clear: console.clear,
  // oxlint-enable no-console
  toNumber: (val: unknown) => Number(val),
  toString: (val: unknown) => String(val),
  toBoolean: (val: unknown) => Boolean(val),
  join: (separator: string, ...args: string[]) => args.join(separator),
  when: (condition: boolean, ifCase: unknown, elseCase?: unknown, elseCondition=true) =>
    condition ? ifCase : elseCondition ? elseCase : undefined,

  // TODO: Array

  /*
   * https://es-toolkit.dev/
   *
   * */
  map: (iterable: unknown[], callback: (value: unknown, index: number) => unknown[]) =>
    iterable.map(callback),
  forEach: (iterable: unknown[], callback: (value: unknown, index: number) => void) =>
    iterable.map(callback),
  filter: (iterable: unknown[], callback: (value: unknown, index: number) => boolean) =>
    iterable.map(callback),

  "set-variable": (name: string, value: unknown) => {
    console.log("set-variable", name, value);
    useGuthrieVariables.getState().variables[name] = value;
  }
};

export { native, internal };
