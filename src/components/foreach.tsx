"use client";

import {ReactNode} from "react";
import {Fragment} from "react/jsx-runtime";
import {ScopedVariables} from "./scoped-variables.js";
import {Exposable} from "../types/access.js";
import {ElementDeclaration} from "../types/element.js";

/**
 * Props for the {@link ForEach} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type ForEachProps = {
  items: unknown[];
  elements: ElementDeclaration[]
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
