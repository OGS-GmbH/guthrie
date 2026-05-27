"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { callFnAsync, callFnSync } from "../renderer/fns.js";
import type { DynamicElementProps, DynamicProperty } from "../renderer/type.js";
import { touchByAccessAsync, touchByAccessSync } from "../renderer/variables.js";
import { useGuthrieVariables } from "../stores/variables.js";
import { useScopedVariables } from "./scoped-variables.js";

/**
 * Result type of {@link useGuthrieProperties} Hook.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Hooks
 */
type UseGuthriePropertiesResult = {
  static: Record<string, unknown>;
  renderable: Record<string, DynamicElementProps>;
};

/**
 * Return type of {@link useGuthrieProperties} Hook.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Hooks
 */
type UseGuthriePropertiesReturn = UseGuthriePropertiesResult | null;

/**
 * Resolves dynamic properties into usable values.
 *
 * This hook processes a record of {@link DynamicProperty} entries and separates them into:
 * - `static`: resolved values (static, variables, function results)
 * - `dynamic`: child elements that need to be rendered later
 *
 * @remarks
 * Supported dynamic value types:
 * - `static` → returned as-is
 * - `variable` → resolved via {@link touchByAccessAsync}
 * - `child` → stored for recursive rendering
 * - `fn` → resolved via {@link callFnAsync}
 *
 * @param properties - Record of dynamic properties to resolve
 * @param scopedVariables - {@link Variables} to prioritize
 *
 * @returns Object containing resolved (`static`) and recursive (`dynamic`) properties, or `null` if no properties are provided
 *
 * @since 1.0.0
 * @category Hooks
 * @author David Schummer
 * @author Simon Kovtyk
 */
function useGuthrieProperties(
  properties?: Record<string, DynamicProperty>
): UseGuthriePropertiesReturn {
  const scopedVariables = useScopedVariables();
  const variables = useGuthrieVariables((state) => state.variables);
  const [syncProperties, asyncProperties] = useMemo(() => {
    const syncProps: Record<string, DynamicProperty> = {};
    const asyncProps: Record<string, DynamicProperty> = {};

    properties &&
      Object.entries(properties).forEach(([key, value]) => {
        if (value.async) asyncProps[key] = value;
        else syncProps[key] = value;
      });

    return [syncProps, asyncProps];
  }, [properties]);

  const [result, setResult] = useState<UseGuthriePropertiesReturn>(
    useMemo(() => {
      const staticProperties: Record<string, unknown> = {};
      const renderableProperties: Record<string, DynamicElementProps> = {};

      if (!syncProperties) return null;

      Object.entries(syncProperties).forEach(([key, dynamicValue]) => {
        switch (dynamicValue.type) {
          case "callback": {

            const variableValue =
              scopedVariables?.[dynamicValue.name] ?? variables[dynamicValue.name];

            if (!variableValue) return;

             const touched = (dynamicValue.access
              ? touchByAccessSync(variableValue, dynamicValue.access)
              : variableValue) as Function;

            staticProperties[key] = (...args: unknown[]) => {
              debugger
              touched(dynamicValue.access ? touchByAccessSync(args, dynamicValue.access) : args)
            }

            break;
          }
          case "static":
            staticProperties[key] = dynamicValue.value;

            break;

          case "var": {
            const variableValue =
              scopedVariables?.[dynamicValue.name] ?? variables[dynamicValue.name];

            if (!variableValue) return;

            staticProperties[key] = dynamicValue.access
              ? touchByAccessSync(variableValue, dynamicValue.access)
              : variableValue;

            break;
          }

          case "child": {
            const { type, ...dynamicElementProps } = dynamicValue;

            renderableProperties[key] = dynamicElementProps;

            break;
          }

          case "fn": {
            const { type, ...exposableFn } = dynamicValue;

            staticProperties[key] = callFnSync(exposableFn);

            break;
          }
        }
      });

      console.log("syncProperties", syncProperties)
      console.log("staticProperties", staticProperties)
      return { static: staticProperties, renderable: renderableProperties };
    }, [syncProperties])
  );

  const handleAsyncProperties = useCallback(async () => {
    const staticProperties: Record<string, unknown> = {};
    const renderableProperties: Record<string, DynamicElementProps> = {};

    if (!asyncProperties) return;

    await Promise.all(
      Object.entries(asyncProperties).map(async ([key, dynamicValue]) => {
        switch (dynamicValue.type) {
          case "static":
            staticProperties[key] = dynamicValue.value;

            break;

          case "var": {
            const variableValue =
              scopedVariables?.[dynamicValue.name] ?? variables[dynamicValue.name];

            if (!variableValue) return;

            staticProperties[key] = dynamicValue.access
              ? await touchByAccessAsync(variableValue, dynamicValue.access)
              : variableValue;

            break;
          }

          case "child": {
            const { type, ...dynamicElementProps } = dynamicValue;

            renderableProperties[key] = dynamicElementProps;

            break;
          }

          case "fn": {
            const { type, ...exposableFn } = dynamicValue;

            staticProperties[key] = await callFnAsync(exposableFn);

            break;
          }
        }
      })
    );

    setResult({
      static: { ...staticProperties, ...result?.static },
      renderable: { ...renderableProperties, ...result?.renderable }
    });
  }, [asyncProperties, variables, scopedVariables]);

  useEffect(() => {
    void handleAsyncProperties();
  }, [asyncProperties, variables, scopedVariables]);

  return result;
}

export type { UseGuthriePropertiesResult, UseGuthriePropertiesReturn };

export { useGuthrieProperties };
