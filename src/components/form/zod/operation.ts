import { ZodType } from "zod";
import { callFnSync } from "../../../renderer/fns.js";
import {
  buildCheckCallback,
  buildErrorCallback,
  buildRefineCallback,
  buildSuperRefineCallback
} from "./callbacks.js";
import { Refinable, Schema, Transformable } from "./types.js";

function addRefinements(zSchema: ZodType, schema: Refinable): ZodType {
  schema.errorHandlers?.forEach((handler) => {
    // oxlint-disable no-param-reassign
    switch (handler.type) {
      case "check":
        zSchema = zSchema.check(buildCheckCallback(handler.fn));
        break;
      case "refine":
        zSchema = zSchema.refine(
          buildRefineCallback(handler.fn),
          buildErrorCallback(handler.error)
        );
        break;
      case "super-refine":
        zSchema = zSchema.superRefine(buildSuperRefineCallback(handler.fn));
        break;
    }
    // oxlint-enable no-param-reassign
  });

  return zSchema;
}

function addDefault(zSchema: ZodType, schema: Schema): ZodType {
  if (!schema.default) return zSchema;

  if (schema.default.type === "static") return zSchema.default(schema.default.value);

  return zSchema.default(callFnSync(schema.default.value));
}

function addPrefault(zSchema: ZodType, schema: Schema): ZodType {
  if (!schema.prefault) return zSchema;

  if (schema.prefault.type === "static") return zSchema.prefault(schema.prefault.value);

  return zSchema.prefault(callFnSync(schema.prefault.value));
}

function addTransform(zSchema: ZodType, schema: Transformable): ZodType {
  if (!schema.transform) return zSchema;

  const transformCallback = (val: unknown) => {
    const argSubs: Record<number, unknown> = {};
    const fn = schema.transform!;

    fn.args?.forEach((arg, index) => {
      if (typeof arg === "number" || typeof arg === "boolean" || typeof arg === "string") return;

      if (arg.type === "zod-callback") argSubs[index] = val;
    });

    return callFnSync(fn, argSubs);
  };

  return zSchema.transform(transformCallback);
}

// oxlint-disable no-param-reassign
function addOperations(zSchema: ZodType, schema: Schema): ZodType {
  zSchema = addDefault(zSchema, schema);
  zSchema = addPrefault(zSchema, schema);
  zSchema = addTransform(zSchema, schema);

  if ("errorHandlers" in schema) zSchema = addRefinements(zSchema, schema);

  return zSchema;
}
// oxlint-enable no-param-reassign

export { addRefinements, addDefault, addPrefault, addTransform, addOperations };
