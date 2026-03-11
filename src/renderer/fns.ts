import type { ExposableFn, Fns } from "./type";

async function callFn (
  fn: ExposableFn,
  fns: Fns,
  variables: Record<string, unknown>
): Promise<unknown> {
  const mappedArgs = await Promise.all(fn.args.map(async (arg) => {
    if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string")
      return arg;

    if (arg.type === "variable")
      return variables[arg.name];

    if (arg.type === "arg") {
      delete arg.type;

      return arg;
    }

    delete arg.type;

    return callFn(arg, fns, variables);
  }));

  const fnRef = fns[fn.name];

  return Promise.resolve(
    fnRef(...mappedArgs)
  )
}

export {
  callFn
}
