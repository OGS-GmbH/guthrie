import { useCallback, useEffect, useState } from "react";
import { callFn } from "../renderer/fns.js";
import type { DynamicElementProps, DynamicValue, Variables } from "../renderer/type.js";
import { touchByAccess } from "../renderer/variables.js";
import { useGuthrieVariables } from "../stores/variables.js";

/**
 * Result type of {@link useGuthrieProperties} Hook.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Hooks
 */
type UseGuthriePropertiesResult = {
  static: Record<string, unknown>;
  dynamic: Record<string, DynamicElementProps>;
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
 * This hook processes a record of {@link DynamicValue} entries and separates them into:
 * - `static`: resolved values (static, variables, function results)
 * - `dynamic`: child elements that need to be rendered later
 *
 * @remarks
 * Supported dynamic value types:
 * - `static` → returned as-is
 * - `variable` → resolved via {@link touchByAccess}
 * - `child` → stored for recursive rendering
 * - `fn` → resolved via {@link callFn}
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
  properties?: Record<string, DynamicValue>,
  scopedVariables?: Variables
): UseGuthriePropertiesReturn {
  const [result, setResult] = useState<UseGuthriePropertiesReturn>(null);
  const variables = useGuthrieVariables((state) => state.variables);
  const handleProperties = useCallback(async () => {
    const staticProperties: Record<string, unknown> = {};
    const dynamicProperties: Record<string, DynamicElementProps> = {};

    if (!properties) return setResult(null);

    await Promise.all(
      Object.entries(properties).map(async ([key, dynamicValue]) => {
        switch (dynamicValue.type) {
          case "static":
            staticProperties[key] = dynamicValue.value;

            break;

          case "variable": {
            const variableValue =
              scopedVariables?.[dynamicValue.name] ?? variables[dynamicValue.name];

            if (!variableValue) return;

            staticProperties[key] = dynamicValue.access
              ? await touchByAccess(variableValue, dynamicValue.access)
              : variableValue;

            break;
          }

          case "child": {
            const { type, ...dynamicElementProps } = dynamicValue;

            dynamicProperties[key] = dynamicElementProps;

            break;
          }

          case "fn": {
            const { type, ...exposableFn } = dynamicValue;

            staticProperties[key] = await callFn(exposableFn);

            break;
          }
        }
      })
    );

    setResult({ static: staticProperties, dynamic: dynamicProperties });
  }, []);

  useEffect(() => {
    handleProperties();
  }, [properties, variables, scopedVariables]);

  return result;
}

export type { UseGuthriePropertiesResult, UseGuthriePropertiesReturn };

export { useGuthrieProperties };
