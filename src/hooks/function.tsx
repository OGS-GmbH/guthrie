import { useCallback } from "react";
import { FnArgDeclaration, touchByAccessSync, useGuthrieVariables, useScopedVariables } from "../public-api.js";

function useGuthrieFnArgCallback() {
  const scopedVariables = useScopedVariables();
  const variables = useGuthrieVariables((state) => state.variables);

  const callback = useCallback((arg: FnArgDeclaration, event?: {}): unknown => {
    switch (arg.type) {
      case "any":
      case "boolean":
      case "number":
      case "string": {
        return arg.value;
      }

      case "null": {
        return null;
      }

      case "undefined": {
        return undefined;
      }

      case "array": {
        return arg.items.map((argItem) => callback(argItem, event));
      }

      case "object": {
        return Object.fromEntries(
          Object.entries(arg.properties).map(([key, value]): [string, unknown] => [key, callback(value, event)])
        )
      }

      case "event": {
        return arg.access ? touchByAccessSync(event, arg.access) : event;
      }

      case "fn": {
        return arg.args?.map((argItem) => callback(argItem, event));
      }

      case "var": {
        const value = scopedVariables?.[arg.name] ?? variables[arg.name];

        if (value === undefined)
          return null;

        return arg.access
          ? touchByAccessSync(value, arg.access)
          : value;
      }

      case "form-data":
      case "form-issue":
      case "schema": {
        return null;
      }
    }
  }, [scopedVariables, variables]);

  return callback;
}

export {
  useGuthrieFnArgCallback
}
