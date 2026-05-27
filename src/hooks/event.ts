"use client";

import { type RefObject } from "react";
import { addListener } from "../functions/internals.js";
import type { EventFnAction, EventVarAction, ExposableEvent } from "../renderer/type.js";
import { touchByAccessAsync } from "../renderer/variables.js";
import { useGuthrieVariables } from "../stores/variables.js";
import { useScopedVariables } from "./scoped-variables.js";

/**
 * Return type of {@link useGuthrieEventsCallback}.
 *
 * @since 1.0.0
 * @category Hooks
 * @author Simon Kovtyk
 */
type UseGuthrieEventsCallbackReturn = (
  target: RefObject<HTMLElement | Window | string | null>,
  events: ExposableEvent[] | undefined
) => void;

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
function useGuthrieEventsCallback(): UseGuthrieEventsCallbackReturn {
  const scopedVariables = useScopedVariables();

  return (
    target: RefObject<HTMLElement | Window | string | null>,
    events: ExposableEvent[] | undefined
  ) => {
    events?.forEach((event) => {
      const actions = { fn: [] as EventFnAction[], var: [] as EventVarAction[] };

      event.actions.forEach((action) => {
        switch (action.type) {
          case "fn":
            actions.fn.push(action);
            break;
          case "var":
            actions.var.push(action);
            break;
        }
      });
      // oxlint-disable-next-line no-shadow
      addListener(target.current, event.name, actions.fn, async (...eventArgs: unknown[]) => {
        for (const variableAction of actions.var) {
          const variable =
            scopedVariables?.[variableAction.name] ??
            useGuthrieVariables.getState().variables[variableAction.name];
          const touched = (
            variableAction.access
              ? await touchByAccessAsync(variable, variableAction.access)
              : variable
          ) as (...eventArgs: unknown[]) => void;

          typeof touched === "function" && touched(eventArgs);
        }
      });
    });
  };
}

export type { UseGuthrieEventsCallbackReturn };

export { useGuthrieEventsCallback };
