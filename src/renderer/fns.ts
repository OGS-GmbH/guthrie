import {useGuthrieFns} from "../stores/fns";
import {useGuthrieVariables} from "../stores/variables";
import type {ExposableFn} from "./type";
import {touchByAccess} from "./variables.ts";

async function callFn(
  fn: ExposableFn, argsSubs?: Record<number, unknown>
): Promise<unknown> {
  const mappedArgs = await Promise.all(fn.args?.map(async (arg, index) => {
    if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string")
      return arg;

    const {type, ...rest} = arg;

    if (type === "arg")
      return rest;

    const overriddenArg = argsSubs?.[index];

    if (overriddenArg)
      return touchByAccess(overriddenArg, arg.access)

    if (arg.type === "var") {
      const variable = useGuthrieVariables.getState().variables[arg.name];

      return arg.access ? touchByAccess(variable, arg.access) : variable;
    }

    return callFn(rest as ExposableFn).then((result) => {
      if (arg.type === "fn" && arg.as)
        useGuthrieVariables.getState().addVariable(arg.as, result);

      return result;
    });
  }));

  const fnRef = useGuthrieFns.getState().fns[fn.name];

  return Promise.resolve(fnRef(...mappedArgs)).then((result) => {
    const resolvedResult = fn.access ? touchByAccess(result, fn.access) : result;

    if (fn.as)
      useGuthrieVariables.getState().addVariable(fn.as, resolvedResult);

    return resolvedResult;
  });
}

export {
  callFn
}
