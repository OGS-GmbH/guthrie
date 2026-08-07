import type { ElementType } from "react";
import { ExposableEventDeclaration } from "./event.js";
import { MaybeAsync } from "./async.js";
import { ExposableFnDeclaration } from "./function.js";
import { WithType } from "./type.js";
import { VariableDeclaration } from "./variable.js";
import { CallbackDeclaration } from "./callback.js";

type NumberPropertyDeclaration = WithType<"number"> & {
  value: number;
}

type BooleanPropertyDeclaration = WithType<"boolean"> & {
  value: boolean;
}

type StringPropertyDeclaration = WithType<"string"> & {
  value: string;
}

type NullPropertyDeclaration = WithType<"null">;

type UndefinedPropertyDeclaration = WithType<"undefined">;

type AnyPropertyDeclaration = WithType<"any"> & {
  value: unknown
}

type VariablePropertyDeclaration = WithType<"var"> & VariableDeclaration & MaybeAsync;

type FunctionPropertyDeclaration = WithType<"fn"> & ExposableFnDeclaration & MaybeAsync;

type CallbackPropertyDeclaration = WithType<"callback"> & CallbackDeclaration & MaybeAsync;

type MaybeAsyncPropertyDeclaration = VariablePropertyDeclaration
  | FunctionPropertyDeclaration
  | CallbackPropertyDeclaration;

type ObjectPropertyDeclaration = WithType<"object"> & {
  properties: PropertiesDeclaration
};

type ArrayPropertyDeclaration = WithType<"array"> & {
  items: PropertyDeclaration[]
}

type ChildPropertyDeclaration = WithType<"child"> & ElementDeclaration;

type PropertyDeclaration = ChildPropertyDeclaration
  | NumberPropertyDeclaration
  | BooleanPropertyDeclaration
  | StringPropertyDeclaration
  | NullPropertyDeclaration
  | UndefinedPropertyDeclaration
  | AnyPropertyDeclaration
  | VariablePropertyDeclaration
  | FunctionPropertyDeclaration
  | ObjectPropertyDeclaration
  | ArrayPropertyDeclaration
  | CallbackPropertyDeclaration;

type PropertiesDeclaration = Record<string, PropertyDeclaration>;

type RawPropertiesDeclaration = Record<string, unknown>;

/**
 * Dynamic element definition used by the {@link Renderer}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */

type ElementDeclaration = {
  element: string;
  ref?: string;
  children?: ElementDeclaration[];
  events?: ExposableEventDeclaration[];
  properties?: PropertiesDeclaration;
  rawProperties?: RawPropertiesDeclaration;
};

/**
 * Context props passed to components.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @todo to be completed
 */
type DeclarationContext = {
  refname: string;
  events?: ExposableEventDeclaration[];
  // Map children to elements since children is reserved by React
  elements?: ElementDeclaration[];

  // HACK(simonkov): See https://github.com/mui/material-ui/blob/v9.1.2/packages/mui-material/src/Select/SelectInput.js#L736
  [p: string]: unknown;
};

/**
 * Registry of available elements.
 *
 * Maps string identifiers to React components.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Elements = Record<string, ElementType>;

export type {
  ChildPropertyDeclaration,
  NumberPropertyDeclaration,
  BooleanPropertyDeclaration,
  StringPropertyDeclaration,
  NullPropertyDeclaration,
  UndefinedPropertyDeclaration,
  AnyPropertyDeclaration,
  VariablePropertyDeclaration,
  FunctionPropertyDeclaration,
  CallbackPropertyDeclaration,
  PropertyDeclaration,
  PropertiesDeclaration,
  RawPropertiesDeclaration,
  MaybeAsyncPropertyDeclaration,
  Elements,
  ElementDeclaration,
  DeclarationContext
}
