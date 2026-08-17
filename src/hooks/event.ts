"use client";

import { type RefObject } from "react";
import { addListener } from "../functions/internals.js";
import { touchByAccessAsync } from "../renderer/variables.js";
import { useGuthrieVariables } from "../stores/variables.js";
import {
  CallbackEventActionDeclaration,
  ExposableEventDeclaration,
  FunctionEventActionDeclaration,
  VariableEventActionDeclaration
} from "../types/event.js";
import { useScopedVariables } from "./scoped-variables.js";
import {callFnSync} from "../renderer/fns.js";

/**
 * Return type of {@link useGuthrieEventsCallback}.
 *
 * @since 1.0.0
 * @category Hooks
 * @author Simon Kovtyk
 */
type UseGuthrieEventsCallbackReturn = (
  target: RefObject<HTMLElement | Window | string | null>,
  events: ExposableEventDeclaration[] | undefined
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
    events: ExposableEventDeclaration[] | undefined
  ) => {
    events?.forEach((event) => {
      const actions = {
        fn: [] as FunctionEventActionDeclaration[],
        var: [] as VariableEventActionDeclaration[],
        callback: [] as CallbackEventActionDeclaration[]
      };

      event.actions.forEach((action) => {
        switch (action.type) {
          case "fn":
            actions.fn.push(action);
            break;
          case "var":
            actions.var.push(action);
            break;
          case "callback":
            actions.callback.push(action);
            break;
        }
      });

      // oxlint-disable-next-line no-shadow
      addListener(target.current, event.name, actions.fn, async (...eventArgs: unknown[]) => {
        for (const callbackAction of actions.callback) {
          if (!callbackAction.access) continue;

          if (callbackAction.condition && !callFnSync(callbackAction.condition, eventArgs, scopedVariables)) continue;

          await touchByAccessAsync(eventArgs, callbackAction.access);
        }

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
