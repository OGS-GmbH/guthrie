import { z } from "zod";
import { ExposableFn } from "../../../renderer/type.js";

type SchemaObject = {
  type: "object";
  properties: Record<string, Schema>;
};

type MinConstrainable = Partial<{
  min: [number, SchemaErrorParams];
}>;
type MaxConstrainable = Partial<{
  max: [number, SchemaErrorParams];
}>;
type LengthConstrainable = Partial<{
  length: [number, SchemaErrorParams];
}>;

type SchemaArray = {
  type: "array";
  innerSchema: Schema;
  nonempty: SchemaErrorParams;
} & Pipable &
  MaxConstrainable &
  MinConstrainable &
  LengthConstrainable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable &
  Catchable &
  Defaultable;

type SchemaOptional = {
  type: "optional";
  innerSchema: Schema;
} & ZodNullable &
  Refinable &
  Transformable &
  Pipable;

/*in and out schema must match*/
type SchemaPipe = {
  type: "pipe";
  value: [Schema, Schema];
} & Pipable &
  Transformable;

type SchemaTransform = {
  type: "transform";
  value: ExposableFn;
} & Pipable &
  Transformable;

type SchemaUnion = {
  type: "union";
  items: Schema[];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaXor = {
  type: "xor";
  items: Schema[];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

/*TODO: typesafe all items have the discriminator key*/
type SchemaDiscriminatedUnion = {
  type: "discriminatedUnion";
  discriminator: string;
  items: [SchemaObject, ...SchemaObject[]];
} & SchemaErrorParams &
  Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaIntersection = {
  type: "intersection";
  items: [SchemaObject, SchemaObject];
} & Pipable &
  ZodNullable &
  Refinable &
  Transformable;

/*The key schema can be any Zod schema that is assignable to string | number | symbol.*/
type SchemaRecord = {
  type: "record";
  items: [Schema, Schema];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaPartialRecord = {
  type: "partial-record";
  items: [Schema, Schema];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaLooseRecord = {
  type: "loose-record";
  items: [Schema, Schema];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaMap = {
  type: "map";
  items: [Schema, Schema];
  min: [number, SchemaErrorParams];
  max: [number, SchemaErrorParams];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaSet = {
  type: "set";
  items: [Schema, Schema];
  min: [number, SchemaErrorParams];
  max: [number, SchemaErrorParams];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaFile = {
  type: "file";
  min: [number, SchemaErrorParams];
  max: [number, SchemaErrorParams];
  mime: [z.util.MimeTypes, SchemaErrorParams];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaTuple = {
  type: "tuple";
  items: Schema[];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaNullish = {
  type: "nullish";
  innerSchema: Schema;
} & Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaAny = {
  type: "any";
} & Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaUnknown = {
  type: "unknown";
} & Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaNever = {
  type: "never";
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaStrictObject = {
  type: "strict-object";
  properties: Record<string, Schema>;
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaLooseObject = {
  type: "loose-object";
  properties: Record<string, Schema>;
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaCodec = {
  type: "codec";
  items: [Schema, Schema];
  decode: ExposableFn;
  encode: ExposableFn;
} & Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaEnum = {
  type: "enum";
  value: string[];
} & Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaNumber = {
  type: "number";
} & Pipable &
  NumberLike &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaInt = {
  type: "int";
} & NumberLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaInt32 = {
  type: "int32";
} & NumberLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaBigInt = {
  type: "bigint";
} & NumberLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaString = {
  type: "string";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaEmail = {
  type: "email";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaUrl = {
  type: "url";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaJwt = {
  type: "jwt";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaEmoji = {
  type: "emoji";
} & StringLike &
  SchemaErrorParams &
  Pipable &
  ZodNullable &
  Refinable;

type SchemaUuid = {
  type: "uuid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaUuidV4 = {
  type: "uuidv4";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaUuidV6 = {
  type: "uuidv6";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaUuidV7 = {
  type: "uuidv7";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaNonoid = {
  type: "nanoid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaGuid = {
  type: "guid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaCuid = {
  type: "cuid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaCuid2 = {
  type: "cuid2";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaUlid = {
  type: "ulid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaBase64 = {
  type: "base64";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaBase64url = {
  type: "base64url";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaXid = {
  type: "xid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaKsuid = {
  type: "ksuid";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaIpV4 = {
  type: "ipv4";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaIpV6 = {
  type: "ipv6";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaCidrV4 = {
  type: "cidrv4";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaCidrV6 = {
  type: "cidrv6";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaE164 = {
  type: "e164";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

/*z.iso.*/
type SchemaDatetime = {
  type: "datetime";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaDate = {
  type: "date";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaTime = {
  type: "time";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaDuration = {
  type: "duration";
} & StringLike &
  Pipable &
  SchemaErrorParams &
  ZodNullable &
  Refinable;

type SchemaBoolean = {
  type: "boolean";
} & SchemaErrorParams &
  Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaStringbool = {
  type: "stringbool";
} & Partial<{
  truthy: string[];
  falsy: string[];
  case: "sensitive" | "insensitive";
}> &
  ZodNullable &
  Pipable &
  SchemaErrorParams &
  Refinable &
  Transformable;

type SchemaJson = {
  type: "json";
} & SchemaErrorParams &
  Pipable &
  ZodNullable &
  Refinable &
  Transformable;

type SchemaFunction = {
  type: "function";
  input: SchemaArray | SchemaTuple | Schema[]; // parameters (must be an array or a ZodTuple)
  output: Schema;
} & Partial<{
  implement: ExposableFn;
  implementAsync: ExposableFn;
}> &
  ZodNullable &
  Pipable &
  Refinable &
  Transformable;

type Pipable = Partial<{
  pipe: Schema;
}>;

type Transformable = Partial<{
  transform: ExposableFn;
}>;

type MaybeFn = { type: "static"; value: unknown } | { type: "fn"; value: ExposableFn };

/*sync fn only*/
type Defaultable = Partial<{
  default: MaybeFn;
  prefault: MaybeFn;
}>;

type Catchable = Partial<{
  catch: unknown | ExposableFn;
}>;

type ZodReadonly = Partial<{
  readonly: boolean;
}>;

type StringLike = Partial<{
  min: [number, SchemaErrorParams];
  max: [number, SchemaErrorParams];
  startsWith: [string, SchemaErrorParams];
  endsWith: [string, SchemaErrorParams];
  regex: [RegExp, SchemaErrorParams];
  includes: [string, SchemaErrorParams];
  length: [number, SchemaErrorParams];
  nonempty: SchemaErrorParams;
  lowercase: SchemaErrorParams;
  uppercase: SchemaErrorParams;
  // transforms
  trim: boolean;
  normalize: ["NFC" | "NFD" | "NFKC" | "NFKD" | (string & {})];
  toLowerCase: boolean;
  toUpperCase: boolean;
  slugify: boolean;
}> &
  Transformable;

type NumberLike = {
  gt: [number, SchemaErrorParams];
  gte: [number, SchemaErrorParams];
  min: [number, SchemaErrorParams];
  lt: [number, SchemaErrorParams];
  lte: [number, SchemaErrorParams];
  max: [number, SchemaErrorParams];
  multipleOf: [number, SchemaErrorParams];
  int: SchemaErrorParams;
  positive: SchemaErrorParams;
  nonnegative: SchemaErrorParams;
  negative: SchemaErrorParams;
  nonpositive: SchemaErrorParams;
} & Transformable;

type SchemaErrorParams = Partial<{
  error: string | ExposableFn;
  abort: boolean;
}>;

type ZodNullable = Partial<{
  nullable: boolean;
}>;

type ErrorHandler = Check | Refine | SuperRefine;

type RefineHandler = { fn: ExposableFn; error: SchemaErrorParams };
type Check = {
  type: "check";
} & Omit<RefineHandler, "error">;
type Refine = {
  type: "refine";
} & RefineHandler;
type SuperRefine = {
  type: "super-refine";
} & RefineHandler;

type Refinable = {
  errorHandlers?: Array<ErrorHandler>;
};

type Schema = Pipable &
  Transformable &
  Defaultable &
  Catchable &
  ZodReadonly &
  (
    | SchemaObject
    | SchemaArray
    | SchemaUnion
    | SchemaOptional
    | SchemaPipe
    | SchemaTransform
    | SchemaXor
    | SchemaDiscriminatedUnion
    | SchemaIntersection
    | SchemaRecord
    | SchemaPartialRecord
    | SchemaLooseRecord
    | SchemaMap
    | SchemaTuple
    | SchemaSet
    | SchemaFile
    | SchemaNullish
    | SchemaBoolean
    | SchemaStringbool
    | SchemaAny
    | SchemaUnknown
    | SchemaNever
    | SchemaStrictObject
    | SchemaLooseObject
    | SchemaCodec
    | SchemaEnum
    | SchemaNumber
    | SchemaInt
    | SchemaInt32
    | SchemaBigInt
    | SchemaString
    | SchemaEmail
    | SchemaUrl
    | SchemaJwt
    | SchemaEmoji
    | SchemaUuid
    | SchemaUuidV4
    | SchemaUuidV6
    | SchemaUuidV7
    | SchemaNonoid
    | SchemaGuid
    | SchemaCuid
    | SchemaCuid2
    | SchemaUlid
    | SchemaBase64
    | SchemaBase64url
    | SchemaXid
    | SchemaKsuid
    | SchemaIpV4
    | SchemaIpV6
    | SchemaCidrV4
    | SchemaCidrV6
    | SchemaE164
    | SchemaDatetime
    | SchemaDate
    | SchemaTime
    | SchemaDuration
    | SchemaJson
    | SchemaFunction
  );

export type {
  SchemaObject,
  SchemaArray,
  SchemaOptional,
  SchemaPipe,
  SchemaTransform,
  SchemaUnion,
  SchemaXor,
  SchemaDiscriminatedUnion,
  SchemaIntersection,
  SchemaRecord,
  SchemaPartialRecord,
  SchemaLooseRecord,
  SchemaMap,
  SchemaSet,
  SchemaFile,
  SchemaTuple,
  SchemaNullish,
  SchemaAny,
  SchemaUnknown,
  SchemaNever,
  SchemaStrictObject,
  SchemaLooseObject,
  SchemaCodec,
  SchemaEnum,
  SchemaNumber,
  SchemaInt,
  SchemaInt32,
  SchemaBigInt,
  SchemaString,
  SchemaEmail,
  SchemaUrl,
  SchemaJwt,
  SchemaEmoji,
  SchemaUuid,
  SchemaUuidV4,
  SchemaUuidV6,
  SchemaUuidV7,
  SchemaNonoid,
  SchemaGuid,
  SchemaCuid,
  SchemaCuid2,
  SchemaUlid,
  SchemaBase64,
  SchemaBase64url,
  SchemaXid,
  SchemaKsuid,
  SchemaIpV4,
  SchemaIpV6,
  SchemaCidrV4,
  SchemaCidrV6,
  SchemaE164,
  SchemaDatetime,
  SchemaDate,
  SchemaTime,
  SchemaDuration,
  SchemaBoolean,
  SchemaStringbool,
  SchemaJson,
  SchemaFunction,
  MinConstrainable,
  MaxConstrainable,
  LengthConstrainable,
  Pipable,
  Transformable,
  Defaultable,
  Catchable,
  ZodReadonly,
  StringLike,
  NumberLike,
  SchemaErrorParams,
  ZodNullable,
  ErrorHandler,
  Refinable,
  Schema
};
