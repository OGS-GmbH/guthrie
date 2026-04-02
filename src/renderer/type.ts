import type { ElementType } from "react";

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

/**
 * Allows assigning a result to a variable.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Exposable = {
  as?: string
}

/**
 * Allows accessing nested values.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type Accessible = {
  access?: Access
}

/**
 * Lifecycle hooks for {@link Page}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Lifecycle = Partial<{
  onInit: ExposableFn[],
  onRender: ExposableFn[],
  onDestroy: ExposableFn[]
}>;

/**
 * Page definition.
 *
 * Represents a complete renderable unit including content,
 * events, and lifecycle hooks.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @author David Schummer
 */
type Page = {
  route: string,
  content: DynamicElementProps,
  events?: ExposableEvent[]
} & Lifecycle;

/**
 * Event configuration.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type EventConfig = {
  autoApply: boolean
}

/**
 * Variable configuration.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovty
 */
type VariablesConfig = Partial<{
  mapping: Partial<{
    dataSource: (value: string) => string,
    event: (value: string) => string
  }>
}>

/**
 * Function definition.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type FnDefinition = {
  name: string,
  args?: Array<VariableFnArg | RecursiveFnArg | ObjectFnArg | PrimitiveFnArg  | EventFnArg>
} & Accessible

/**
 * Primitive function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type PrimitiveFnArg = string | number | boolean;

/**
 * Variable function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type VariableFnArg = VariableWithAccess & {
  type: "var",
}

/**
 * Object function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type ObjectFnArg = {
  type: "arg",
  [key: string]: unknown
}

/**
 * Recursive function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type RecursiveFnArg = ExposableFn & {
  type: "fn"
};

/**
 * Event function arguments.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type EventFnArg = Accessible & {type: "event"}

/**
 * Function with variable assignment support.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type ExposableFn = FnDefinition & Exposable;

/**
 * Function registry.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Fns = Record<string,  Function>;

/**
 * Event definition.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Event = {
  name: keyof GlobalEventHandlersEventMap,
  actions: ExposableFn[]
};

/**
 * Event with variable assignment support.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type ExposableEvent = Event & Exposable;

/**
 * Registered DOM events.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @author David Schummer
 */
type Events = Record<keyof GlobalEventHandlersEventMap, EventListener>;

/**
 * Dynamic value definition used in properties.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type DynamicValue =
  {type: "static", value: unknown}
  | {type: "variable"} & VariableWithAccess
  | {type: "child"} & DynamicElementProps
  | {type: "fn"} & ExposableFn

/**
 * Dynamic element definition used by the {@link Renderer}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type DynamicElementProps = {
  element: string;
  ref?: string,
  children?: DynamicElementProps[],
  events?: ExposableEvent[],
  properties?: Record<string, DynamicValue>,
  [key: string]: unknown
}

/**
 * Access chain for resolving nested values.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @author David Schummer
 */
type Access = Array<PrototypeAccess | PropertyAccess | IndexAccess>

/**
 * Variable provided in Variable Store {@link useGuthrieVariables}.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type VariableWithAccess = Accessible & {
  name: string,
}

/**
 * Describes property access on an object.
 *
 * Used by {@link touchByAccess} to resolve a value via a property key.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type PropertyAccess = {
  type: "property"
  read: string
};

/**
 * Describes index-based access on an array or array-like structure.
 *
 * Used by {@link touchByAccess} to resolve a value via a numeric index.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type IndexAccess = {
  type: "index"
  read: number
};

/**
 * Describes access to a property on an object's prototype.
 *
 * Used by {@link touchByAccess} to resolve values via the prototype chain.
 *
 * @since 1.0.0
 * @category Types
 * @author David Schummer
 */
type PrototypeAccess = {
  type: "prototype"
  read: string
};

/**
 * Primitive operator argument.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type PrimitiveOperatorArg = number | boolean | string;

/**
 * Represents an operator argument that may be a primitive value or a nested operation.
 *
 * Nested operations are recursively evaluated and resolved to a {@link PrimitiveOperatorArg}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperatorArg = PrimitiveOperatorArg | OperationDefinition;

/**
 * Represents the return type of an operator.
 *
 * Operators are expected to return primitive values
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperatorReturn = boolean | number;

/**
 * Function signature for an operator.
 *
 * Operators receive resolved primitive arguments and return a computed result.
 *
 * @param operationArgs - Resolved primitive arguments
 *
 * @returns Computed operator result
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperatorFn = (...operationArgs: PrimitiveOperatorArg[]) => OperatorReturn;

/**
 * Registry of available operators.
 *
 * Maps operator names to their corresponding implementation functions.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type Operators = Record<string, OperatorFn>;

/**
 * Represents an operation to be evaluated.
 *
 * An operation consists of a name referencing an operator and a list of arguments.
 * Arguments may be primitive values or nested operations.
 *
 * @remarks
 * Operations are evaluated recursively via {@link OperatorArg}.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 */
type OperationDefinition = {
  name: string,
  args: OperatorArg[]
}

/**
 * Context props passed to components.
 *
 * @since 1.0.0
 * @category Types
 * @author Simon Kovtyk
 * @todo to be completed
 */
type ContextProps = {
  refname: string,
  events?: ExposableEvent[]
  // Map children to elements since children is reserved by React
  elements?: DynamicElementProps[]
}

export type {
  EventConfig,
  Event,
  ExposableEvent,
  Exposable,
  Accessible,
  DynamicElementProps,
  DynamicValue,
  Elements,
  VariablesConfig,
  Access,
  VariableWithAccess,
  PrototypeAccess,
  PropertyAccess,
  IndexAccess,
  Events,
  OperatorArg,
  PrimitiveOperatorArg,
  OperatorReturn,
  OperatorFn,
  Operators,
  OperationDefinition,
  ExposableFn,
  PrimitiveFnArg,
  ObjectFnArg,
  VariableFnArg,
  EventFnArg,
  RecursiveFnArg,
  ContextProps,
  FnDefinition,
  Fns,
  Page,
  Lifecycle
}
