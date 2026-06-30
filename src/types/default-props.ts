import type { PropertiesDeclaration, RawPropertiesDeclaration } from "./element.js";

type DefaultPropertiesDeclaration = Record<string, PropertiesDeclaration>;

type DefaultRawPropertiesDeclaration = Record<string, RawPropertiesDeclaration>;

type DefaultPropertiesContextValue = Partial<{
  properties: DefaultPropertiesDeclaration,
  rawProperties: DefaultRawPropertiesDeclaration
}>;

export type {
  DefaultPropertiesDeclaration,
  DefaultRawPropertiesDeclaration,
  DefaultPropertiesContextValue
}
