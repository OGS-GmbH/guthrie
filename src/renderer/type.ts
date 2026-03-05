import type { ElementType } from "react";

type DynamicElementProps = {
  element: string;
  ref?: string,
  children?: DynamicElementProps[],
  // Allow any additional props
  [key: string]: unknown
};

type Page = {
  route: string,
  content: DynamicElementProps
};

type Elements = Record<string, ElementType>;

export type {
  DynamicElementProps,
  Elements,
  Page
}
