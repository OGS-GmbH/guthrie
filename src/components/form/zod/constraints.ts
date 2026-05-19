import { ZodType } from "zod";
import { buildErrorCallback } from "./callbacks.js";
import { Schema, SchemaErrorParams } from "./types.js";

function addMinConstraint(zSchema: ZodType, schema: Schema): ZodType {
  if (!("min" in schema) || !schema.min) return zSchema;
  if ("min" in zSchema && typeof (zSchema as any).min === "function") {
    const errorCallback = buildErrorCallback(schema.min[1]);

    return (zSchema as any).min(schema.min[0], errorCallback);
  }

  return zSchema;
}
function addMaxConstraint(zSchema: ZodType, schema: Schema): ZodType {
  if (!("max" in schema) || !schema.max) return zSchema;
  if ("max" in zSchema && typeof (zSchema as any).max === "function") {
    return (zSchema as any).max(schema.max[0], buildErrorCallback(schema.max[1]));
  }

  return zSchema;
}

function addLengthConstraint(zSchema: ZodType, schema: Schema): ZodType {
  if (!("length" in schema) || !schema.length) return zSchema;

  if ("length" in zSchema && typeof (zSchema as any).length === "function") {
    return (zSchema as any).min(schema.length[0], buildErrorCallback(schema.length[1]));
  }

  return zSchema;
}

function addNullableConstraint(zSchema: ZodType, schema: Schema): ZodType {
  if (!("nullable" in schema) || !schema.nullable) return zSchema;

  if ("nullable" in zSchema && typeof (zSchema as any).nullable === "function")
    return (zSchema as any).nullable();

  return zSchema;
}

function addNonemptyConstraint(zSchema: ZodType, schema: Schema) {
  if (!("nonempty" in schema)) return zSchema;

  if ("nonempty" in zSchema && typeof (zSchema as any).nonempty === "function") {
    return (zSchema as any).nonempty(buildErrorCallback(schema.nonempty as SchemaErrorParams));
  }

  return zSchema;
}

// oxlint-disable no-param-reassign
function addConstraints(zSchema: ZodType, schema: Schema) {
  zSchema = addMinConstraint(zSchema, schema);
  zSchema = addMaxConstraint(zSchema, schema);
  zSchema = addLengthConstraint(zSchema, schema);
  zSchema = addNonemptyConstraint(zSchema, schema);

  return addNullableConstraint(zSchema, schema);
}
// oxlint-enable no-param-reassign

export {
  addMinConstraint,
  addMaxConstraint,
  addLengthConstraint,
  addNonemptyConstraint,
  addNullableConstraint,
  addConstraints
};
