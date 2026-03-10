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

type DataSourceFn = {
  type: "fn",
  fn: string,
  args: Array<unknown>
}

type DataSourceConstant = {
  type: "constant",
  value: unknown 
}

type DataSourceCommon = {
  as: string
}

type DataSource = DataSourceCommon & (
  DataSourceConstant | DataSourceFn
);

type Fns = Record<string,  Function>;

type Page = {
  route: string,
  dataSources?: DataSource[],
  content: DynamicElementProps,
} & { events?: DynamicEvent[] };

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
  Fns,
  DataSourceFn,
  DataSourceConstant,
  DataSourceCommon,
  DataSource,
  Page
}
