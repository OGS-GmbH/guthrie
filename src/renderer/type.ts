import type { ElementType } from "react";

type DynamicElementProps = {
  element: string;
  ref?: string,
  children?: DynamicElementProps[],
  // Allow any additional props
  [key: string]: unknown
};

type DataSourceFn = {
  type: "fn",
  fn: string,
  args: Array<unknown>
}

type DataSourceConstant = {
  type: "constant",
  value: string
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
  content: DynamicElementProps
};

type Elements = Record<string, ElementType>;

export type {
  DynamicElementProps,
  Elements,
  Fns,
  DataSourceFn,
  DataSourceConstant,
  DataSourceCommon,
  DataSource,
  Page
}
