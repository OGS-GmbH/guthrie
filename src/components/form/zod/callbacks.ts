import { $ZodErrorMap, $ZodIssueBase, CheckFn } from "zod/v4/core";
import { callFnSync } from "../../../renderer/fns.js";
import { ExposableFn } from "../../../renderer/type.js";
import { SchemaErrorParams } from "./types.js";

function isPrimitive(value: unknown) {
  return typeof value === "number" || typeof value === "boolean" || typeof value === "string";
}

type ErrorCallback<T extends $ZodIssueBase> =
  | string
  | { error: $ZodErrorMap<T>; abort: boolean }
  | undefined;

function buildErrorCallback<T extends $ZodIssueBase>(params: SchemaErrorParams): ErrorCallback<T> {
  if (!params.error) return;

  if (typeof params.error === "string") return params.error as ErrorCallback<T>;

  return {
    abort: params.abort ?? false,
    error: (issue) => {
      const argSubs: Record<number, unknown> = {};
      const errorFn = params.error as ExposableFn;

      errorFn.args?.forEach((arg, index) => {
        if (isPrimitive(arg)) return;

        if (arg.type === "form-issue") argSubs[index] = issue;
      });

      return { message: callFnSync(errorFn, argSubs) as string };
    }
  };
}
function buildCallback(fn: ExposableFn) {
  return (val: unknown) => {
    const argSubs: Record<number, unknown> = {};

    fn.args?.forEach((arg, index) => {
      if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string") return;

      if (arg.type === "zod-callback") argSubs[index] = val;
    });

    return callFnSync(fn, argSubs);
  };
}

function buildCheckCallback(fn: ExposableFn) {
  return buildCallback(fn) as CheckFn<unknown>;
}

function buildRefineCallback(fn: ExposableFn) {
  return buildCheckCallback(fn) as (arg: unknown) => unknown;
}

function buildSuperRefineCallback(fn: ExposableFn) {
  return (val: unknown, ctx: unknown) => {
    const argSubs: Record<number, unknown> = {};

    fn.args?.forEach((arg, index) => {
      if (isPrimitive(arg)) return;

      if (arg.type === "zod-callback") argSubs[index] = { val, ctx };
    });

    void callFnSync(fn, argSubs);
  };
}

function buildTransformCallback(fn: ExposableFn) {
  return buildSuperRefineCallback(fn);
}

export {
  buildErrorCallback,
  buildCallback,
  buildCheckCallback,
  buildRefineCallback,
  buildTransformCallback,
  buildSuperRefineCallback
};
export type { ErrorCallback };
