import type { ElementType } from "react";

type DynamicEvent = {
  type: keyof GlobalEventHandlersEventMap,
  as?: string,
  actions: Array<{
    fn: string,
    args: Array<unknown>
  }>
};

type DynamicElementProps = {
  element: string;
  ref?: string,
  children?: DynamicElementProps[],
  events?: DynamicEvent[]
  // Allow any additional props
  [key: string]: unknown
};

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

type ExposableFn = Fn & {
  as?: string
}

type Fns = Record<string,  Function>;

type Lifecycle = Partial<{
  onInit: ExposableFn[],
  onRender: ExposableFn[],
  onDestroy: ExposableFn[]
}>;

type Page = {
  route: string,
  content: DynamicElementProps,
  events?: DynamicEvent[]
} & Lifecycle;

type Elements = Record<string, ElementType>;

export type {
  DynamicEvent,
  DynamicElementProps,
  Elements,
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
