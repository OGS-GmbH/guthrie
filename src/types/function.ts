import { type Accessible, type Exposable } from "./access.js";
import { type WithType } from "./type.js";
import { type VariableDeclaration } from "./variable.js";

type NumberFnArgDeclaration = WithType<"number"> & {
  value: number;
}

type BooleanFnArgDeclaration = WithType<"boolean"> & {
  value: boolean;
}

type StringFnArgDeclaration = WithType<"string"> & {
  value: string;
}

type NullFnArgDeclaration = WithType<"null">;

type UndefinedFnArgDeclaration = WithType<"undefined">;

type AnyFnArgDeclaration = WithType<"any"> & {
  value: unknown
}

/**
 * Object function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type ObjectFnArgDeclaration = WithType<"object"> & {
  properties: Record<string, FnArgDeclaration>;
};

type ArrayFnArgDeclaration = WithType<"array"> & {
  items: FnArgDeclaration[]
}

/**
 * Variable function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type VariableFnArgDeclaration = WithType<"var"> & VariableDeclaration;

/**
 * Recursive function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type NestedFnArgDeclaration = WithType<"fn"> & ExposableFnDeclaration;

/**
 * Event function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type EventFnArgDeclaration = WithType<"event"> & Accessible;

/**
 * Form function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type FormDataFnArgDeclaration = WithType<"form-data"> & Accessible;

type FormIssueFnArgDeclaration = WithType<"form-issue"> & Accessible;
type SchemaFnArgDeclaration = WithType<"schema"> & Accessible;

type FnArgDeclaration = VariableFnArgDeclaration
  | NestedFnArgDeclaration
  | ObjectFnArgDeclaration
  | ArrayFnArgDeclaration
  | NumberFnArgDeclaration
  | BooleanFnArgDeclaration
  | StringFnArgDeclaration
  | NullFnArgDeclaration
  | UndefinedFnArgDeclaration
  | AnyFnArgDeclaration
  | EventFnArgDeclaration
  | FormDataFnArgDeclaration
  | FormIssueFnArgDeclaration
  | SchemaFnArgDeclaration;

/**
 * Function definition.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type FnArgsDeclaration = FnArgDeclaration[];


type FnDeclaration = {
  name: string;
  args?: FnArgsDeclaration;
} & Accessible;

/**
 * Function with variable assignment support.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type ExposableFnDeclaration = FnDeclaration & Exposable;

/**
 * Function registry.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Functions = Record<string, Function>;

export type {
  VariableFnArgDeclaration,
  ObjectFnArgDeclaration,
  NestedFnArgDeclaration,
  EventFnArgDeclaration,
  FormDataFnArgDeclaration,
  FormIssueFnArgDeclaration,
  SchemaFnArgDeclaration,
  FnArgDeclaration,
  FnArgsDeclaration,
  FnDeclaration,
  ExposableFnDeclaration,
  Functions
}
