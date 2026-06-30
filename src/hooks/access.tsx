import { useCallback } from "react";
import { AccessDeclaration } from "../public-api.js";
import { useGuthrieFnArgCallback } from "./function.js";

function useGuthrieAccessCallback() {
  const fnArgCallback = useGuthrieFnArgCallback();

  const callback = useCallback((value: unknown, access: AccessDeclaration, event?: {}) => {
    let touchedValue: unknown = value;

    for (const accessItem of access) {
      switch (accessItem.type) {
        case "prototype":
          if (accessItem.optional) {
            touchedValue = (touchedValue as Record<string, (args?: unknown[]) => unknown>)
              ?.[accessItem.read]
              ?.(
                accessItem.args
                  ? accessItem.args?.map((arg) => fnArgCallback(arg, event))
                  : undefined
              ) ?? touchedValue;
          }
          else {
            touchedValue = (touchedValue as Record<string, (args?: unknown[]) => unknown>)[accessItem.read]!(
              accessItem.args
                ? accessItem.args?.map((arg) => fnArgCallback(arg, event))
                : undefined
            );
          }
          break;

        default:
          if (accessItem.optional)
            touchedValue = (touchedValue as Record<string, unknown>)?.[accessItem.read] ?? touchedValue;
          else
            touchedValue = (touchedValue as Record<string, unknown>)[accessItem.read]!;
      }
    }

    return touchedValue;
  }, []);

  return callback;
}

export {
  useGuthrieAccessCallback
}
