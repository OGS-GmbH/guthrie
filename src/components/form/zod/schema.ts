// oxlint-disable no-use-before-define

import { z, ZodType } from "zod";
import { $ZodFunctionArgs, $ZodTypeInternals } from "zod/v4/core";
import { buildCallback, buildErrorCallback, buildTransformCallback } from "./callbacks.js";
import { addConstraints } from "./constraints.js";
import { addOperations } from "./operation.js";
import {
  Pipable,
  Schema,
  SchemaAny,
  SchemaArray,
  SchemaBase64,
  SchemaBase64url,
  SchemaBigInt,
  SchemaBoolean,
  SchemaCidrV4,
  SchemaCidrV6,
  SchemaCodec,
  SchemaCuid,
  SchemaCuid2,
  SchemaDate,
  SchemaDatetime,
  SchemaDiscriminatedUnion,
  SchemaDuration,
  SchemaE164,
  SchemaEmail,
  SchemaEmoji,
  SchemaEnum,
  SchemaFile,
  SchemaFunction,
  SchemaGuid,
  SchemaInt,
  SchemaInt32,
  SchemaIntersection,
  SchemaIpV4,
  SchemaIpV6,
  SchemaJson,
  SchemaJwt,
  SchemaKsuid,
  SchemaLooseObject,
  SchemaLooseRecord,
  SchemaMap,
  SchemaNever,
  SchemaNonoid,
  SchemaNullish,
  SchemaNumber,
  SchemaObject,
  SchemaOptional,
  SchemaPartialRecord,
  SchemaPipe,
  SchemaRecord,
  SchemaSet,
  SchemaStrictObject,
  SchemaString,
  SchemaStringbool,
  SchemaTime,
  SchemaTransform,
  SchemaTuple,
  SchemaUlid,
  SchemaUnion,
  SchemaUnknown,
  SchemaUrl,
  SchemaUuid,
  SchemaUuidV4,
  SchemaUuidV6,
  SchemaUuidV7,
  SchemaXid,
  SchemaXor
} from "./types.js";

function buildSchema(schema: Schema): ZodType {
  switch (schema.type) {
    case "object":
      return buildObject(schema);
    case "array":
      return buildArray(schema);
    case "optional":
      return buildOptional(schema);
    case "pipe":
      return buildPipe(schema);
    case "transform":
      return buildTransform(schema);
    case "union":
      return buildUnion(schema);
    case "xor":
      return buildXor(schema);
    case "discriminatedUnion":
      return buildDiscriminatedUnion(schema);
    case "intersection":
      return buildIntersection(schema);
    case "record":
      return buildRecord(schema);
    case "partial-record":
      return buildPartialRecord(schema);
    case "loose-record":
      return buildLooseRecord(schema);
    case "map":
      return buildMap(schema);
    case "set":
      return buildSet(schema);
    case "file":
      return buildFile(schema);
    case "tuple":
      return buildTuple(schema);
    case "nullish":
      return buildNullish(schema);
    case "any":
      return buildAny(schema);
    case "unknown":
      return buildUnknown(schema);
    case "never":
      return buildNever(schema);
    case "strict-object":
      return buildStrictObject(schema);
    case "loose-object":
      return buildLooseObject(schema);
    case "codec":
      return buildCodec(schema);
    case "enum":
      return buildEnum(schema);
    case "number":
      return buildNumber(schema);
    case "int":
      return buildInt(schema);
    case "int32":
      return buildInt32(schema);
    case "bigint":
      return buildBigInt(schema);
    case "string":
      return buildString(schema);
    case "email":
      return buildEmail(schema);
    case "url":
      return buildUrl(schema);
    case "jwt":
      return buildJwt(schema);
    case "emoji":
      return buildEmoji(schema);
    case "uuid":
      return buildUuid(schema);
    case "uuidv4":
      return buildUuidV4(schema);
    case "uuidv6":
      return buildUuidV6(schema);
    case "uuidv7":
      return buildUuidV7(schema);
    case "nanoid":
      return buildNonoid(schema);
    case "guid":
      return buildGuid(schema);
    case "cuid":
      return buildCuid(schema);
    case "cuid2":
      return buildCuid2(schema);
    case "ulid":
      return buildUlid(schema);
    case "base64":
      return buildBase64(schema);
    case "base64url":
      return buildBase64Url(schema);
    case "xid":
      return buildXid(schema);
    case "ksuid":
      return buildKsuid(schema);
    case "ipv4":
      return buildIpV4(schema);
    case "ipv6":
      return buildIpV6(schema);
    case "cidrv4":
      return buildCidrV4(schema);
    case "cidrv6":
      return buildCidrV6(schema);
    case "e164":
      return buildE164(schema);
    case "datetime":
      return buildDateTime(schema);
    case "date":
      return buildDate(schema);
    case "time":
      return buildTime(schema);
    case "duration":
      return buildDuration(schema);
    case "boolean":
      return buildBoolean(schema);
    case "stringbool":
      return buildStringBool(schema);
    case "json":
      return buildJson(schema);
    case "function":
      z.function();
      return buildFunction(schema);
  }
}

type KeySchema = ZodType<unknown, unknown, $ZodTypeInternals<string | number | symbol>>;

function applyMods(zSchema: ZodType, schema: Schema) {
  // oxlint-disable no-param-reassign

  zSchema = addConstraints(zSchema, schema);
  zSchema = addOperations(zSchema, schema);

  return addPipe(zSchema, schema);
  // oxlint-enable no-param-reassign
}

function addPipe(zSchema: ZodType, schema: Pipable): ZodType {
  if (!schema.pipe) return zSchema;

  return zSchema.pipe(buildSchema(schema.pipe));
}

function buildObjectProperties(properties: Record<string, Schema>) {
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [key, buildSchema(value)])
  );
}

function buildObject(schema: SchemaObject) {
  return z.object(buildObjectProperties(schema.properties));
}

function buildArray(schema: SchemaArray) {
  return applyMods(z.array(buildSchema(schema.innerSchema), buildErrorCallback(schema)), schema);
}

function buildOptional(schema: SchemaOptional) {
  return applyMods(z.optional(buildSchema(schema.innerSchema)), schema);
}

function buildPipe(schema: SchemaPipe) {
  return applyMods(z.pipe(buildSchema(schema.value[0]), buildSchema(schema.value[1])), schema);
}

function buildTransform(schema: SchemaTransform) {
  return applyMods(z.transform(buildTransformCallback(schema.value)), schema);
}

function buildUnion(schema: SchemaUnion) {
  return applyMods(z.union(schema.items.map(buildSchema), buildErrorCallback(schema)), schema);
}

function buildXor(schema: SchemaXor) {
  return applyMods(z.xor(schema.items.map(buildSchema), buildErrorCallback(schema)), schema);
}

function buildDiscriminatedUnion(schema: SchemaDiscriminatedUnion) {
  return applyMods(
    z.discriminatedUnion(
      schema.discriminator,
      schema.items.map(buildObject) as [z.ZodObject<any>, ...z.ZodObject<any>[]],
      buildErrorCallback(schema)
    ),
    schema
  );
}

function buildIntersection(schema: SchemaIntersection) {
  return applyMods(
    z.intersection(buildSchema(schema.items[0]), buildSchema(schema.items[1])),
    schema
  );
}

function buildRecord(schema: SchemaRecord) {
  return applyMods(
    z.record(
      buildSchema(schema.items[0]) as KeySchema,
      buildSchema(schema.items[1]),
      buildErrorCallback(schema)
    ),
    schema
  );
}

function buildPartialRecord(schema: SchemaPartialRecord) {
  return applyMods(
    z.partialRecord(
      buildSchema(schema.items[0]) as KeySchema,
      buildSchema(schema.items[1]),
      buildErrorCallback(schema)
    ),
    schema
  );
}

function buildLooseRecord(schema: SchemaLooseRecord) {
  return applyMods(
    z.looseRecord(
      buildSchema(schema.items[0]) as KeySchema,
      buildSchema(schema.items[1]),
      buildErrorCallback(schema)
    ),
    schema
  );
}

function buildMap(schema: SchemaMap) {
  return applyMods(
    z.map(
      buildSchema(schema.items[0]) as KeySchema,
      buildSchema(schema.items[1]),
      buildErrorCallback(schema)
    ),
    schema
  );
}

function buildSet(schema: SchemaSet) {
  return applyMods(
    z.map(
      buildSchema(schema.items[0]) as KeySchema,
      buildSchema(schema.items[1]),
      buildErrorCallback(schema)
    ),
    schema
  );
}

function buildFile(schema: SchemaFile) {
  return applyMods(z.file(buildErrorCallback(schema)), schema);
}

function buildTuple(schema: SchemaTuple) {
  return applyMods(z.tuple(schema.items.map(buildSchema) as [ZodType, ...ZodType[]]), schema);
}

function buildNullish(schema: SchemaNullish) {
  return applyMods(z.nullish(buildSchema(schema.innerSchema)), schema);
}

function buildAny(schema: SchemaAny) {
  return applyMods(z.any(), schema);
}

function buildUnknown(schema: SchemaUnknown) {
  return applyMods(z.unknown(), schema);
}

function buildNever(schema: SchemaNever) {
  return applyMods(z.never(buildErrorCallback(schema)), schema);
}

function buildStrictObject(schema: SchemaStrictObject) {
  return applyMods(
    z.strictObject(buildObjectProperties(schema.properties), buildErrorCallback(schema)),
    schema
  );
}

function buildLooseObject(schema: SchemaLooseObject) {
  return applyMods(
    z.looseObject(buildObjectProperties(schema.properties), buildErrorCallback(schema)),
    schema
  );
}

function buildCodec(schema: SchemaCodec) {
  return applyMods(
    z.codec(buildSchema(schema.items[0]), buildSchema(schema.items[1]), {
      decode: buildCallback(schema.decode),
      encode: buildCallback(schema.encode)
    }),
    schema
  );
}

function buildEnum(schema: SchemaEnum) {
  return applyMods(z.enum(schema.value, buildErrorCallback(schema)), schema);
}

function buildNumber(schema: SchemaNumber) {
  const params = buildErrorCallback(schema);
  return applyMods(z.number(params), schema);
}

function buildInt(schema: SchemaInt) {
  return applyMods(z.int(buildErrorCallback(schema)), schema);
}

function buildInt32(schema: SchemaInt32) {
  return applyMods(z.int32(buildErrorCallback(schema)), schema);
}

function buildBigInt(schema: SchemaBigInt) {
  return applyMods(z.bigint(buildErrorCallback(schema)), schema);
}

function buildString(schema: SchemaString) {
  return applyMods(z.string(buildErrorCallback(schema)), schema);
}

function buildEmail(schema: SchemaEmail) {
  return applyMods(z.email(buildErrorCallback(schema)), schema);
}

function buildUrl(schema: SchemaUrl) {
  return applyMods(z.url(buildErrorCallback(schema)), schema);
}

function buildJwt(schema: SchemaJwt) {
  return applyMods(z.jwt(buildErrorCallback(schema)), schema);
}

function buildEmoji(schema: SchemaEmoji) {
  return applyMods(z.emoji(buildErrorCallback(schema)), schema);
}

function buildUuid(schema: SchemaUuid) {
  return applyMods(z.uuid(buildErrorCallback(schema)), schema);
}

function buildUuidV4(schema: SchemaUuidV4) {
  return applyMods(z.uuidv4(buildErrorCallback(schema)), schema);
}

function buildUuidV6(schema: SchemaUuidV6) {
  return applyMods(z.uuidv6(buildErrorCallback(schema)), schema);
}

function buildUuidV7(schema: SchemaUuidV7) {
  return applyMods(z.uuidv7(buildErrorCallback(schema)), schema);
}

function buildNonoid(schema: SchemaNonoid) {
  return applyMods(z.nanoid(buildErrorCallback(schema)), schema);
}

function buildGuid(schema: SchemaGuid) {
  return applyMods(z.guid(buildErrorCallback(schema)), schema);
}

function buildCuid(schema: SchemaCuid) {
  return applyMods(z.cuid(buildErrorCallback(schema)), schema);
}

function buildCuid2(schema: SchemaCuid2) {
  return applyMods(z.cuid2(buildErrorCallback(schema)), schema);
}

function buildUlid(schema: SchemaUlid) {
  return applyMods(z.ulid(buildErrorCallback(schema)), schema);
}

function buildBase64(schema: SchemaBase64) {
  return applyMods(z.base64(buildErrorCallback(schema)), schema);
}

function buildBase64Url(schema: SchemaBase64url) {
  return applyMods(z.base64url(buildErrorCallback(schema)), schema);
}

function buildXid(schema: SchemaXid) {
  return applyMods(z.xid(buildErrorCallback(schema)), schema);
}

function buildKsuid(schema: SchemaKsuid) {
  return applyMods(z.ksuid(buildErrorCallback(schema)), schema);
}

function buildIpV4(schema: SchemaIpV4) {
  return applyMods(z.ipv4(buildErrorCallback(schema)), schema);
}

function buildIpV6(schema: SchemaIpV6) {
  return applyMods(z.ipv6(buildErrorCallback(schema)), schema);
}

function buildCidrV4(schema: SchemaCidrV4) {
  return applyMods(z.cidrv4(buildErrorCallback(schema)), schema);
}

function buildCidrV6(schema: SchemaCidrV6) {
  return applyMods(z.cidrv6(buildErrorCallback(schema)), schema);
}

function buildE164(schema: SchemaE164) {
  return applyMods(z.e164(buildErrorCallback(schema)), schema);
}

function buildDateTime(schema: SchemaDatetime) {
  return applyMods(z.iso.datetime(buildErrorCallback(schema)), schema);
}

function buildDate(schema: SchemaDate) {
  return applyMods(z.iso.date(buildErrorCallback(schema)), schema);
}

function buildTime(schema: SchemaTime) {
  return applyMods(z.iso.time(buildErrorCallback(schema)), schema);
}

function buildDuration(schema: SchemaDuration) {
  return applyMods(z.iso.duration(buildErrorCallback(schema)), schema);
}

function buildBoolean(schema: SchemaBoolean) {
  return applyMods(z.boolean(buildErrorCallback(schema)), schema);
}

function buildStringBool(schema: SchemaStringbool) {
  return applyMods(z.stringbool(buildErrorCallback(schema)), schema);
}

function buildJson(schema: SchemaJson) {
  return applyMods(z.json(buildErrorCallback(schema)), schema);
}

function buildFunction(schema: SchemaFunction) {
  /*TODO: prop "implement"*/
  if (Array.isArray(schema.input)) {
    return applyMods(
      z.function({
        input: schema.input.map(buildSchema),
        output: buildSchema(schema.output)
      }),
      schema
    );
  }

  return applyMods(
    z.function({
      input: buildSchema(schema.input) as $ZodFunctionArgs,
      output: buildSchema(schema.output)
    }),
    schema
  );
}
// oxlint-enable no-use-before-define

export { buildSchema };
