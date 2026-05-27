"use client";

import {ReactNode} from "react";
import {Fragment} from "react/jsx-runtime";
import type {Exposable} from "../renderer/type.js";
import {ScopedVariables} from "./scoped-variables.js";

/**
 * Props for the {@link ForEach} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type ForEachProps = {
  items: unknown[];
  children: ReactNode;
} & Partial<Exposable>;

function ForEach({ items, as, children }: ForEachProps) {

  if (!as) return items.map((_, index) => <Fragment key={index}>{children}</Fragment>);

  return items.map((item, index) => (
    <ScopedVariables key={index} as={as} value={item}>
      {children}
    </ScopedVariables>
  ));
}

export type { ForEachProps };

export { ForEach };
