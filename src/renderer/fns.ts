import { useGuthrieFns } from "../stores/fns";
import { useGuthrieVariables } from "../stores/variables";
import type { ExposableFn } from "./type";

async function callFn (
  fn: ExposableFn
): Promise<unknown> {
  const mappedArgs = await Promise.all(fn.args.map(async (arg) => {
    if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string")
      return arg;

    if (arg.type === "variable")
      return useGuthrieVariables.getState().variables[arg.name];

    if (arg.type === "arg") {
      delete arg.type;

      return arg;
    }

    delete arg.type;

    return callFn(arg);
  }));

  const fnRef = useGuthrieFns.getState().fns[fn.name]; // oxlint-disable-line eslint-plugin-react-hooks(rules-of-hooks)

  return Promise.resolve(
    fnRef(...mappedArgs)
  );
}

export {
  callFn
}
