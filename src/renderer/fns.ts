"use client";

import { isEqual } from "es-toolkit";
import { useGuthrieFns } from "../stores/fns.js";
import { useGuthrieVariables } from "../stores/variables.js";
import type { ExposableFn, Variables } from "./type.js";
import { touchByAccessAsync, touchByAccessSync } from "./variables.js";

function callFnSync(
  fn: ExposableFn,
  argsSubs?: Record<number, unknown>,
  scopedVariables?: Variables
): unknown {
  const mappedArgs = fn.args?.map((arg, index) => {
    if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string") return arg;

    const { type, ...rest } = arg;

    if (type === "arg") return rest;

    const overriddenArg = argsSubs?.[index];

    if (arg.type === "zod-callback")
      return arg.access ? touchByAccessSync(overriddenArg, arg.access) : overriddenArg;

    if (overriddenArg && arg.access)
      return touchByAccessSync(overriddenArg, arg.access);


    if (arg.type === "var") {
      const variable =
        scopedVariables?.[arg.name] ?? useGuthrieVariables.getState().variables[arg.name];

      if (arg.name === "BXVNM1-control")
        console.log(variable)
      return arg.access && variable ? touchByAccessSync(variable, arg.access) : variable;
    }

    const result = callFnSync(rest as ExposableFn, undefined, scopedVariables);

    if (arg.type === "fn" && arg.as) useGuthrieVariables.getState().addVariable(arg.as, result);

    return result;
  })!;

  const fnRef = useGuthrieFns.getState().fns[fn.name]!;
  const preResult = fnRef(...mappedArgs);
  const result = fn.access ? touchByAccessSync(preResult, fn.access) : preResult;

  if (fn.as) useGuthrieVariables.getState().addVariable(fn.as, result);

  return result;
}

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
async function callFnAsync(
  fn: ExposableFn,
  argsSubs?: Record<number, unknown>,
  scopedVariables?: Variables
): Promise<unknown> {
  const fnRef = useGuthrieFns.getState().fns[fn.name];

  const mappedArgs = await Promise.all(
    fn.args?.map(async (arg, index) => {
      if (arg.type === "primitive")
        return arg;

      const { type, ...rest } = arg;

      if (type === "arg") return rest;

      const overriddenArg = argsSubs?.[index];

      if (arg.type === "callback")
        return arg.access ? touchByAccessAsync(overriddenArg, arg.access) : overriddenArg;

      if (overriddenArg && arg.access) return touchByAccessAsync(overriddenArg, arg.access);

      if (arg.type === "var") {
        const variable =
          scopedVariables?.[arg.name] ?? useGuthrieVariables.getState().variables[arg.name];

        return arg.access ? touchByAccessAsync(variable, arg.access) : variable;
      }

      return callFnAsync(rest as ExposableFn).then((result) => {
        if (arg.type === "fn" && arg.as) useGuthrieVariables.getState().addVariable(arg.as, result);

        return result;
      });
    }) ?? []
  );

  return Promise.resolve(fnRef!(...mappedArgs)).then((result) => {
    const resolvedResult = fn.access ? touchByAccessAsync(result, fn.access) : result;

    if (fn.as) {
      const oldVar = useGuthrieVariables.getState().variables[fn.name];

      /*TODO: Do we need this check?*/
      if (!isEqual(resolvedResult, oldVar))
        useGuthrieVariables.getState().addVariable(fn.as, resolvedResult);
    }

    return resolvedResult;
  });
}

export { callFnSync, callFnAsync };
