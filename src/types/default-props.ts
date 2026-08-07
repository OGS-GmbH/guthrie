import type { PropertiesDeclaration, RawPropertiesDeclaration } from "./element.js";

type DefaultPropertiesDeclaration = Record<string, PropertiesDeclaration | undefined>;

type DefaultRawPropertiesDeclaration = Record<string, RawPropertiesDeclaration | undefined>;

type DefaultPropertiesContextValue = Partial<{
  properties: DefaultPropertiesDeclaration,
  rawProperties: DefaultRawPropertiesDeclaration
}>;

export type {
  DefaultPropertiesDeclaration,
  DefaultRawPropertiesDeclaration,
  DefaultPropertiesContextValue
}
