import { type RefObject } from "react";
import { addListener } from "../functions/internals";
import type { ExposableEvent } from "../renderer/type";

/**
 * Return type of {@link useGuthrieEventsCallback}.
 *
 * @since 1.0.0
 * @category Hooks
 * @author Simon Kovtyk
 */
type UseGuthrieEventsCallbackReturn = () => void;

/**
 * Creates a callback that attaches event listeners to a target.
 *
 * This hook returns a function that, when executed, registers all provided
 * events on the given target using {@link addListener}.
 *
 * @remarks
 * - Does not automatically attach listeners
 * - Intended to be used in controlled lifecycle scenarios
 *
 * @param target - Target element, window, or reference {@link Renderer}
 * @param events - List of exposable events to attach
 *
 * @returns Callback function that registers the event listeners
 *
 * @since 1.0.0
 * @category Hooks
 * @author Simon Kovtyk
 */
function useGuthrieEventsCallback(
  target: RefObject<HTMLElement | Window | string | null>,
  events: ExposableEvent[] | undefined
): UseGuthrieEventsCallbackReturn {
  return () => {
    events?.forEach((event) => {
      addListener(target.current, event.name, event.actions);
    });
  };
}

export type { UseGuthrieEventsCallbackReturn };

export { useGuthrieEventsCallback };
