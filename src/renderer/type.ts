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

type DynamicElementProps = {
  element: string;
  ref?: string,
  children?: DynamicElementProps[],
  events?: ExposableEvent[]
  // Allow any additional props
  [key: string]: unknown
};

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
};

type PrimitiveFnArg = string | number | boolean;

type VariableFnArg = {
  type: "variable",
  name: string
}

type ObjectFnArg = {
  type: "arg",
  [key: string]: unknown
}

type RecursiveFnArg = {
  type: "fn"
} & ExposableFn;

type Fn = {
  name: string,
  args: Array<VariableFnArg | RecursiveFnArg | ObjectFnArg | PrimitiveFnArg>
}

type ExposableFn = Fn & Exposable;

type Fns = Record<string,  Function>;

type Lifecycle = Partial<{
  onInit: ExposableFn[],
  onRender: ExposableFn[],
  onDestroy: ExposableFn[]
}>;

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
  Elements,
  Variables,
  Events,
  OperatorArg,
  PrimitiveOperatorArg,
  OperatorReturn,
  OperatorFn,
  Operators,
  Operation,
  ExposableFn,
  PrimitiveFnArg,
  Fns,
  Page
}
