import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { Renderer } from "../renderer/renderer.js";
import type { DynamicElementProps, Exposable } from "../renderer/type.js";
import { ScopedVariables } from "./scoped-variables.js";

/**
 * Props for the {@link ForEach} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type ForEachProps = {
  items: unknown[];
  iterator: {
    children: DynamicElementProps[];
  };
} & Partial<Exposable>;

function ForEach({ items, as, iterator }: ForEachProps) {
  const children = useMemo(
    () => iterator.children.map((child, childIndex) => <Renderer key={childIndex} {...child} />),
    [iterator]
  );

  if (!as) return items.map((_, index) => <Fragment key={index}>{children}</Fragment>);

  return items.map((item, index) => (
    <ScopedVariables key={index} as={as} value={item}>
      {children}
    </ScopedVariables>
  ));
}

export type { ForEachProps };

export { ForEach };
