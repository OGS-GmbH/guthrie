import { useGuthrieFns } from "../stores/fns";
import { useGuthrieVariables } from "../stores/variables";
import type { ExposableFn } from "./type";

async function callFn (
  fn: ExposableFn
): Promise<unknown> {
  const mappedArgs = await Promise.all(fn.args.map(async (arg) => {
    if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string")
      return arg;

    if (arg.type === "var")
      return useGuthrieVariables.getState().variables[arg.name];

    const {type, ...rest} = arg;

    if (type === "arg")
      return rest;

    return callFn(rest as ExposableFn);
  }));

  const fnRef = useGuthrieFns.getState().fns[fn.name]; // oxlint-disable-line eslint-plugin-react-hooks(rules-of-hooks)

  return Promise.resolve(
    fnRef(...mappedArgs)
  );
}

export {
  callFn
}
