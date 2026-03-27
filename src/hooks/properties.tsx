import type {DynamicElementProps, DynamicValue} from "../renderer/type";
import {useGuthrieVariables} from "../stores/variables";
import {useEffect, useState} from "react";
import {touchByAccess} from "../renderer/variables";
import {callFn} from "../renderer/fns";

function useGuthrieProperties(properties?: Record<string, DynamicValue>) {
  const [props, setProps] = useState<{
    ready: Record<string, unknown>,
    recursive: Record<string, DynamicElementProps>
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

      setProps({ ready, recursive });
    };

    void run();
  }, [properties, variables]);

  return props;
}

export {
  useGuthrieProperties
}
