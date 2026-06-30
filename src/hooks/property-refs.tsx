import { DependencyList, useCallback, useMemo } from "react";
import { PropertiesDeclaration, PropertyDeclaration } from "../types/element.js";
import { touchByAccessAsync, touchByAccessSync, useGuthrieFns, useGuthrieVariables, useScopedVariables } from "../public-api.js";

type UseGuthriePropertiesRefOptions = {
  properties: PropertiesDeclaration
}

type UseGuthriePropertiesRefReturn = DependencyList;

function useGuthriePropertiesRef({ properties }: UseGuthriePropertiesRefOptions): UseGuthriePropertiesRefReturn {
  const scopedVariables = useScopedVariables();
  const variables = useGuthrieVariables((state) => state.variables);
  const functions = useGuthrieFns((state) => state.fns);
  const findRef = useCallback((property: PropertyDeclaration): unknown => {

    switch (property.type) {
      case "object": {
        const deps: unknown[] = [];

        Object.values(property.properties).map((nestedProperty) => {
          const ref = findRef(nestedProperty);

          if (ref === null)
            return;

          deps.push(
            ref
          )
        });

        return deps;
      }

      case "array": {
        const deps: unknown[] = [];

        property.items.map((nestedProperty) => {
          const ref = findRef(nestedProperty);

          if (ref === null)
            return;

          deps.push(
            ref
          );
        })

        return deps;
      }

      case "fn": {
        return functions[property.name]
      }

      case "var": {
        const value = scopedVariables?.[property.name] ?? variables[property.name];

        if (value === undefined)
          return null;

        if (property.async) {
          const accessed = property.access
            ? touchByAccessAsync(
              value,
              property.access
            )
            : Promise.resolve(value);

          return accessed;
        }

        return property.access
          ? touchByAccessSync(value, property.access)
          : value;
      }

      default: {
        return null;
      }
    }
  }, [scopedVariables, variables, functions])

  return useMemo(() => {
    const deps: unknown[] = [];

    for (const property of Object.values(properties)) {
      const ref = findRef(property);

      if (ref === null)
        continue;

      deps.push(ref);
    }

    return deps;
  }, [properties])
}

export type {
  UseGuthriePropertiesRefOptions,
  UseGuthriePropertiesRefReturn
}

export {
  useGuthriePropertiesRef
}
