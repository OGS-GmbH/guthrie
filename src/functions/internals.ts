import {useGuthrieRefs} from "../stores/refs";
import {useGuthrieEvents} from "../stores/events";
import {normalizeTargetName} from "./utils";
import {ExposableFn} from "../renderer/type";
import {callFn} from "../renderer/fns";

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

  if (typeof target === "string")
    domTarget = useGuthrieRefs.getState().refs[targetName]!;
  else
    domTarget = target;

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
 * @author David Schummer
 * @author Simon Kovtyk
 */
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
    domTarget = useGuthrieRefs.getState().refs[targetName]!;
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

export {
  removeListener,
  addListener
}
