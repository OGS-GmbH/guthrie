import {ElementType, useCallback, useEffect, useRef, useState} from "react";
import {useScopedVariables} from "./scoped-variables.js";
import {callFnAsync, callFnSync, touchByAccessAsync, touchByAccessSync, useGuthrieVariables} from "../public-api.js";
import {PropertiesDeclaration, PropertyDeclaration} from "../types/element.js";
import {produce} from "immer";
import {updateByPath} from "../utils/path.js";
import {useGuthriePropertiesRef} from "./property-refs.js";
import {useGuthrieAccessCallback} from "./access.js";

type UseGuthriePropertiesRewriteReturn = Record<string, unknown>;

type UseGuthriePropertiesRewriteOptions = {
  properties: PropertiesDeclaration,
  Renderer: ElementType
}

function useGuthriePropertiesRewrite({
  properties,
  Renderer
}: UseGuthriePropertiesRewriteOptions): UseGuthriePropertiesRewriteReturn {
  const scopedVariables = useScopedVariables();
  const variables = useGuthrieVariables((state) => state.variables);
  const addVariable = useGuthrieVariables((state) => state.addVariable);
  const commitRef = useRef<((value: unknown, path: Array<string | number>) => void) | null>(null);
  const deps = useGuthriePropertiesRef({ properties });
  const access = useGuthrieAccessCallback();
  const settleProperty = useCallback((property: PropertyDeclaration, path: Array<string | number>): unknown => {
    switch (property.type) {
      case "any":
      case "boolean":
      case "number":
      case "string": {
        return property.value;
      }

      case "null": {
        return null;
      }

      case "undefined": {
        return undefined;
      }

      case "array": {
        return property.items.map((item, index) => {
          const proceedingPath = path ? [...path, index] : [index];
          return settleProperty(item, proceedingPath);
        });
      }

      case "object": {
        return Object.fromEntries(
          Object.entries(property.properties).map(([key, value]) => {
            const proceedingPath = path ? [...path, key] : [key];
            return [key, settleProperty(value, proceedingPath)]
          })
        )
      }

      case "child": {
        return (
          <Renderer {...property} />
        )
      }

      case "fn": {
        if (property.async)
          return undefined;

        return callFnSync(property, undefined, scopedVariables);
      }

      case "callback": {
        if (property.async) {
          return async (...args: unknown[]) => {
            if (property.takeAs)
              addVariable(property.takeAs, args);

            await Promise.all(
              property.do.map(async (doItem) => {
                await callFnAsync(doItem, undefined, scopedVariables);
              })
            );
          }
        }

        return (...args: unknown[]) => {
          if (property.takeAs)
            addVariable(property.takeAs, args);

          const event = args.at(property.eventIndex ?? 0);

          property.do.forEach((doItem) => {
            switch (doItem.type) {
              case "fn": {
                callFnSync(doItem, {0: event}, scopedVariables);
                break;
              }

              case "var": {
                const value = scopedVariables[doItem.name] ?? variables[doItem.name];

                if (value === undefined)
                  break;

                doItem.access && access(
                  value,
                  doItem.access,
                  event as {}
                )

                break;
              }
            }
          })
        }
      }

      case "var": {
        const value = scopedVariables?.[property.name] ?? variables[property.name];

        if (value === undefined)
          return undefined;

        if (property.async) {
          const accessed = property.access
            ? touchByAccessAsync(
              value,
              property.access
            )
            : Promise.resolve(value);

          accessed.then((accessedValue) => {
            commitRef.current?.(accessedValue, path);
          });

          return undefined;
        }

        return property.access
          ? touchByAccessSync(value, property.access)
          : value;
      }
    }
  }, [Renderer, scopedVariables, variables, ...deps]);

  const [props, setProps] = useState<{}>((): {} => Object.fromEntries(
    Object.entries(properties)
      .map(([key, property]) => [key, settleProperty(property, [key])])
  ) as {});

  const commitProperty = useCallback((value: unknown, path: Array<string | number>) => {
    setProps(
      produce((previousProps) => {
        updateByPath(previousProps, value, path);
      })
    );
  }, [setProps, ...deps]);

  useEffect(() => {
    commitRef.current = commitProperty;
  }, [commitProperty])

  useEffect(() => {
    setProps(
      Object.fromEntries(
        Object.entries(properties)
          .map(([key, property]) => [key, settleProperty(property, [key])])
      )
    )
  }, deps);

  return props;
}

export type {
  UseGuthriePropertiesRewriteOptions,
  UseGuthriePropertiesRewriteReturn
}

export {
  useGuthriePropertiesRewrite
}
