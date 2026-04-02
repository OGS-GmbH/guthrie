import type {DynamicElementProps, DynamicValue} from "../renderer/type";
import {useGuthrieVariables} from "../stores/variables";
import {useEffect, useState} from "react";
import {touchByAccess} from "../renderer/variables";
import {callFn} from "../renderer/fns";

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
 *
 * @returns Object containing resolved (`ready`) and recursive (`recursive`) properties, or `null` if no properties are provided
 *
 * @since 1.0.0
 * @category Hooks
 * @author David Schummer
 * @author Simon Kovtyk
 */
function useGuthrieProperties(properties?: Record<string, DynamicValue>) {
  const [props, setProps] = useState<{
    static: Record<string, unknown>,
    dynamic: Record<string, DynamicElementProps>
  } | null>(null);
  const variables = useGuthrieVariables((state) => state.variables);

  useEffect(() => {
    if (!properties) {
      setProps(null);
      return;
    }

    const run = async () => {
      const ready: Record<string, unknown> = {};
      const recursive: Record<string, DynamicElementProps> = {};

      await Promise.all(
        Object.entries(properties).map(async ([key, dynamicValue]) => {
          switch (dynamicValue.type) {
            case "static":
              ready[key] = dynamicValue.value;

              break;

            case "variable": {
              const storedVariable = variables[dynamicValue.name];

              if (storedVariable) {
                ready[key] = dynamicValue.access
                  ? await touchByAccess(storedVariable, dynamicValue.access)
                  : storedVariable;
              } else
                ready[key] = undefined;

              break;
            }

            case "child": {
              const { type, ...dynamicElementProps } = dynamicValue;

              recursive[key] = dynamicElementProps;

              break;
            }

            case "fn": {
              const { type, ...exposableFn } = dynamicValue;

              ready[key] = await callFn(exposableFn);

              break;
            }
          }
        })
      );

      setProps({ static: ready, dynamic: recursive });
    };

    void run();
  }, [properties, variables]);

  return props;
}

export {
  useGuthrieProperties
}
