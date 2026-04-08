import { useGuthrieFns } from "../stores/fns";
import { useGuthrieVariables } from "../stores/variables";
import type { ExposableFn, Variables } from "./type";
import { touchByAccess } from "./variables";

/**
 * Executes an exposable function and resolves its arguments.
 *
 * This is the core function execution mechanism of the runtime.
 * It resolves arguments, supports nested function calls, variable access,
 * and optional result assignment.
 *
 * @remarks
 * Argument resolution supports:
 * - primitive values (string, number, boolean)
 * - variables (`var`)
 * - nested functions (`fn`)
 * - argument injection (`arg`)
 * - event overrides via `argsSubs`
 *
 * Additional features:
 * - Access resolution via {@link touchByAccess}
 * - Result assignment via `fn.as`
 * - Nested execution with variable injection
 *
 * @param fn - Function definition to execute
 * @param argsSubs - Optional argument overrides (e.g. event injection)
 *
 * @returns Promise resolving to the computed result
 *
 * @since 1.0.0
 * @category Function
 * @author Simon Kovtyk
 * @author David Schummer
 */
async function callFn(
  fn: ExposableFn,
  argsSubs?: Record<number, unknown>,
  scopedVariables?: Variables
): Promise<unknown> {
  const mappedArgs = await Promise.all(
    fn.args?.map(async (arg, index) => {
      if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string")
        return arg;

      const { type, ...rest } = arg;

      if (type === "arg") return rest;

      const overriddenArg = argsSubs?.[index];

      if (overriddenArg && arg.access) return touchByAccess(overriddenArg, arg.access);

      if (arg.type === "var") {
        const variable =
          scopedVariables?.[arg.name] ?? useGuthrieVariables.getState().variables[arg.name];

        return arg.access ? touchByAccess(variable, arg.access) : variable;
      }

      return callFn(rest as ExposableFn).then((result) => {
        if (arg.type === "fn" && arg.as) useGuthrieVariables.getState().addVariable(arg.as, result);

        return result;
      });
    })!
  );

  const fnRef = useGuthrieFns.getState().fns[fn.name]!;

  return Promise.resolve(fnRef(...mappedArgs)).then((result) => {
    const resolvedResult = fn.access ? touchByAccess(result, fn.access) : result;

    if (fn.as) useGuthrieVariables.getState().addVariable(fn.as, resolvedResult);

    return resolvedResult;
  });
}

export { callFn };
