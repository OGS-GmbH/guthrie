"use client";

import { callFnAsync, callFnSync } from "../renderer/fns.js";
import { useGuthrieEvents } from "../stores/events.js";
import { useGuthrieRefs } from "../stores/refs.js";
import { normalizeTargetName } from "./utils.js";
import {FunctionEventActionDeclaration} from "../types/event.js";

/**
 * Removes a previously registered event listener.
 *
 * Resolves the target (element or reference name) and removes the associated
 * listener from both the DOM and the internal event store.
 *
 * @param target - Target element, window, or reference name
 * @param name - Event name
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 * @author David Schummer
 * @author Simon Kovtyk
 */
function removeListener(
  target: HTMLElement | Window | string,
  name: keyof GlobalEventHandlersEventMap
) {
  const targetName = normalizeTargetName(target);
  let domTarget: HTMLElement | Window;

  if (typeof target === "string") domTarget = useGuthrieRefs.getState().refs[targetName]!;
  else domTarget = target;

  domTarget.removeEventListener(name, useGuthrieEvents.getState().events[targetName]![name]);
  useGuthrieEvents.getState().removeEvent(targetName, name);
}

/**
 * Registers an event listener on a target and links it to exposable functions.
 *
 * This function:
 * - Resolves the target (element, window, or reference name)
 * - Creates a listener that executes {@link ExposableFn} actions
 * - Injects the DOM event into function arguments when requested
 * - Stores the listener internally for later removal
 *
 * @remarks
 * - Existing listeners for the same target and event will be replaced
 * - Event arguments are injected via `arg.type === "event"`
 *
 * @param target - Target element, window, or reference name
 * @param name - Event name
 * @param actions - Functions to execute when the event fires
 *
 * @since 1.0.0
 * @category Internal
 * @internal
 * @author Simon Kovtyk
 */
function addListener(
  target: HTMLElement | Window | string | null,
  name: keyof GlobalEventHandlersEventMap,
  actions: FunctionEventActionDeclaration[],
  onEvent?: (...eventArgs: unknown[]) => Promise<void>
) {
  if (target === null) return;

  const targetName = normalizeTargetName(target);
  const listener = (eventArgs: unknown[]) => {
    onEvent?.(eventArgs);

    actions.forEach((fn) => {
      if (fn.condition && !callFnSync(fn.condition, [eventArgs])) return;

      const argSubs: Record<number, unknown[]> = {};

      fn.args?.forEach((arg, index) => {
        if (arg.type === "number" || arg.type === "boolean" || arg.type === "string") return;

        if (arg.type === "event") argSubs[index] = eventArgs;
      });
      //void callFnAsync(fn, argSubs);
      void callFnAsync(fn, eventArgs);
    });
  };

  let domTarget: HTMLElement | Window;

  if (typeof target === "string") domTarget = useGuthrieRefs.getState().refs[targetName]!;
  else domTarget = target;

  if (domTarget === null) return;

  const oldListener = useGuthrieEvents.getState().events[targetName]?.[name];

  if (oldListener) domTarget.removeEventListener(name, oldListener);

  /*TODO: check listener type*/
  domTarget.addEventListener(name, listener);
  useGuthrieEvents.getState().addEvent(targetName, name, listener);
}

export { removeListener, addListener };
