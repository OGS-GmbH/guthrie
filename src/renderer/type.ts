import type { ElementType } from "react";

type EventConfig = {
  autoApply: boolean
}

type Exposable = {
  as?: string
}

type Event = {
  name: keyof GlobalEventHandlersEventMap,
  actions: ExposableFn[]
};

type ExposableEvent = Event & Exposable;

type DynamicValue =
  {type: "static", value: unknown}
  | {type: "variable"} & VariableWithAccess
  | {type: "child"} & DynamicElementProps
  | {type: "fn"} & ExposableFn

type DynamicElementProps = {
  element: string;
  ref?: string,
  children?: DynamicElementProps[],
  events?: ExposableEvent[],
  properties?: Record<string, DynamicValue>,
  [key: string]: unknown
}

type Events = Record<keyof GlobalEventHandlersEventMap, EventListener>;

type Variables = Record<string, unknown>;

type PrimitiveOperatorArg = number | boolean;

type OperatorArg = PrimitiveOperatorArg | Operation;

type OperatorReturn = boolean | number;

type OperatorFn = (...operationArgs: PrimitiveOperatorArg[]) => OperatorReturn;

type Operators = Record<string, OperatorFn>;

type Operation = {
  name: string,
  args: OperatorArg[]
}

type PrimitiveFnArg = string | number | boolean;

type Access = Array<PrototypeAccess | PropertyAccess | IndexAccess>

type Accessible = {
  access?: Access
}

type VariableWithAccess = Accessible & {
  name: string,
}

type PropertyAccess = {
  type: "property"
  read: string
};
type PrototypeAccess = {
  type: "prototype"
  read: string
};
type IndexAccess = {
  type: "index"
  read: number
};

type VariableFnArg = VariableWithAccess & {
  type: "var",
}

type ObjectFnArg = {
  type: "arg",
  [key: string]: unknown
}

type RecursiveFnArg = ExposableFn & {
  type: "fn"
};

type EventFnArg = Accessible & {type: "event"}

type Fn = {
  name: string,
  args?: Array<VariableFnArg | RecursiveFnArg | ObjectFnArg | PrimitiveFnArg  | EventFnArg>
} & Accessible

type ExposableFn = Fn & Exposable;

type Fns = Record<string,  Function>;

type Lifecycle = Partial<{
  onInit: ExposableFn[],
  onRender: ExposableFn[],
  onDestroy: ExposableFn[]
}>;

type ContextProps = {
  refname: string,
  events?: ExposableEvent[]
  // Map children to elements since children is reserved by React
  elements?: DynamicElementProps[]
}

type Page = {
  route: string,
  content: DynamicElementProps,
  events?: ExposableEvent[]
} & Lifecycle;

type Elements = Record<string, ElementType>;

export type {
  EventConfig,
  Event,
  ExposableEvent,
  Exposable,
  DynamicElementProps,
  DynamicValue,
  Elements,
  Variables,
  Access,
  VariableWithAccess,
  Events,
  OperatorArg,
  PrimitiveOperatorArg,
  OperatorReturn,
  OperatorFn,
  Operators,
  Operation,
  ExposableFn,
  PrimitiveFnArg,
  ObjectFnArg,
  VariableFnArg,
  RecursiveFnArg,
  ContextProps,
  Fns,
  Page
}
