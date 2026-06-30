"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { callFnAsync, callFnSync } from "../renderer/fns.js";
import type { DynamicElementProps, DynamicNestedChildProperty, DynamicProperty, ExposableFn } from "../renderer/type.js";
import { touchByAccessAsync, touchByAccessSync } from "../renderer/variables.js";
import { useGuthrieVariables } from "../stores/variables.js";
import { useScopedVariables } from "./scoped-variables.js";
import { isPrimitive } from "es-toolkit";

type PartialGuthriePropertiesResult = {
  static: Record<string, unknown | DynamicNestedChildProperty>;
  renderable: Record<string, DynamicElementProps>;
} | null;
/**
 * Result type of {@link useGuthrieProperties} Hook.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Hooks
 */
type UseGuthriePropertiesResult = {
  sync: PartialGuthriePropertiesResult,
  async: PartialGuthriePropertiesResult
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

  const varArgsValues = Object.values(properties ?? {})
    .filter((value) => value.type === "fn")
    .map((value) => (value as ExposableFn).args?.filter((arg) => !isPrimitive(arg) && arg.type === "var"))
    .flat()
    .map((arg) => (arg as ExposableFn).name)
    .map((name) => scopedVariables[name] ?? variables[name]);

  const variableDeps = useMemo(() => Object.values(
    varArgsValues.map((value) => typeof value === "object" ? Object.values(value ?? {}) : value).flat()
  ).flatMap((val) => Object.values(val ?? {})), [...varArgsValues])

  const [syncProperties, asyncProperties] = useMemo(() => {
    const syncProps: Record<string, DynamicProperty> = {};
    const asyncProps: Record<string, DynamicProperty> = {};

    properties &&
      Object.entries(properties).forEach(([key, value]) => {
        if (value.async) asyncProps[key] = value;
        else syncProps[key] = value;
      });

    return [syncProps, asyncProps];
  }, [properties, ...variableDeps]);


  const initialState = useMemo(() => {
    const staticProperties: Record<string, unknown | DynamicNestedChildProperty> = {};
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

          staticProperties[key] = callFnSync(exposableFn, undefined, scopedVariables);
          break;
        }
      }
    });

    return { static: staticProperties, renderable: renderableProperties };
  }, [syncProperties, ...variableDeps]);

  const [result, setResult] = useState<PartialGuthriePropertiesResult>(initialState);
  const [asyncResult, setAsyncResult] = useState<PartialGuthriePropertiesResult>(initialState);

  useEffect(() => {
    setResult({
      static: initialState?.static ?? {}, renderable: initialState?.renderable ?? {}
    });
  }, [initialState]);

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

            staticProperties[key] = await callFnAsync(exposableFn, undefined, scopedVariables);

            break;
          }
        }
      })
    );

    setAsyncResult({
      static: staticProperties,
      renderable: renderableProperties
    });
  }, [asyncProperties, variables, scopedVariables, ...variableDeps]);

  useEffect(() => {
    void handleAsyncProperties();
  }, [asyncProperties, variables, scopedVariables]);

  return { sync: result, async: asyncResult };
}

export type { UseGuthriePropertiesResult, UseGuthriePropertiesReturn };

export { useGuthrieProperties };
