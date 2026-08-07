"use client";

import { useGuthrieFns } from "../stores/fns.js";
import { useGuthrieVariables } from "../stores/variables.js";
import { touchByAccessAsync, touchByAccessSync } from "./variables.js";
import {ExposableFnDeclaration, FnArgDeclaration} from "../types/function.js";
import {Variables} from "../types/variable.js";

type MapArgCallback = (arg: FnArgDeclaration, index: number) => unknown[];

function callFnSync(
  fn: ExposableFnDeclaration,
  argsSubs?: Record<number, unknown>,
  scopedVariables?: Variables
): unknown {
  const mapArgCallback: MapArgCallback = (arg: FnArgDeclaration, index: number) => {
    if (arg.type === "string" || arg.type === "number" || arg.type === "boolean" )
      return arg.value;

    const { type, ...rest } = arg;


    const overriddenArg = argsSubs?.[index]; /*TODO: no need to index argsubs (accessItem.type === "index")*/

    if (arg.type === "event")
      return arg.access ? touchByAccessSync(argsSubs, arg.access) : overriddenArg;

    if (arg.type === "form-issue")
      return arg.access ? touchByAccessSync(overriddenArg, arg.access) : overriddenArg;

    /*TODO: check cases*/
    /*if (overriddenArg && arg.access)
      return touchByAccessSync(overriddenArg, arg.access);*/

    if (arg.type === "var") {
      const variable =
        scopedVariables?.[arg.name] ?? useGuthrieVariables.getState().variables[arg.name];

      return arg.access && variable ? touchByAccessSync(variable, arg.access) : variable;
    }

    if (arg.type === "array")
      return arg.items.map(mapArgCallback);

    const result = callFnSync(rest as ExposableFnDeclaration, argsSubs, scopedVariables);

    if (arg.type === "fn" && arg.as) useGuthrieVariables.getState().addVariable(arg.as, result);

    return result;
  };

  const mappedArgs = fn.args?.map(mapArgCallback)!;

  const fnRef = useGuthrieFns.getState().fns[fn.name]!;

  const preResult = mappedArgs ? fnRef(...mappedArgs) : fnRef();
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
  fn: ExposableFnDeclaration,
  argsSubs?: Record<number, unknown>,
  scopedVariables?: Variables
): Promise<unknown> {
  const fnRef = useGuthrieFns.getState().fns[fn.name];

  const mappedArgs = await Promise.all(
    fn.args?.map(async (arg, index) => {
      if (arg.type === "string" || arg.type === "number" || arg.type === "boolean" )
        return arg.value;

      if (arg.type === "null" || arg.type === "undefined")
        return;

      const { type, ...rest } = arg;

      if (type === "any") return rest;

      const overriddenArg = argsSubs?.[index]; /*TODO: no need to index argsubs (accessItem.type === "index")*/

      if (arg.type === "event")
        return arg.access ? touchByAccessAsync(argsSubs, arg.access) : argsSubs;

      /*TODO: check cases*/
      /*if (overriddenArg && arg.access)
        return touchByAccessAsync(overriddenArg, arg.access);*/

      if (arg.type === "var") {
        const variable =
          scopedVariables?.[arg.name] ?? useGuthrieVariables.getState().variables[arg.name];

        return arg.access ? touchByAccessAsync(variable, arg.access) : variable;
      }

      return callFnAsync(rest as ExposableFnDeclaration).then((result) => {
        if (arg.type === "fn" && arg.as) useGuthrieVariables.getState().addVariable(arg.as, result);

        return result;
      });
    }) ?? []
  );

  return Promise.resolve(fnRef!(...mappedArgs)).then((result) => {
    const resolvedResult = fn.access ? touchByAccessAsync(result, fn.access) : result;

    if (fn.as) {
        useGuthrieVariables.getState().addVariable(fn.as, resolvedResult);

    return resolvedResult;
  }});
}

export { callFnSync, callFnAsync };
