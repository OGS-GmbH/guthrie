import { Fragment, useMemo } from "react";
import { Renderer } from "../renderer/renderer";
import type { DynamicElementProps, Exposable } from "../renderer/type";
import { ScopedVariables } from "./scoped-variables";

/**
 * Props for the {@link For} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type ForProps = {
  count: number;
  iterator: {
    children: DynamicElementProps[];
  };
} & Partial<Exposable>;

/**
 * Repeats a set of elements a fixed number of times.
 *
 * This component renders the provided children multiple times based on the
 * given `count`. Each iteration renders the same set of dynamic elements.
 *
 * @remarks
 * - Intended for simple repetition use cases
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function For({ count, as, iterator }: ForProps) {
  const children = useMemo(
    () => iterator.children.map((child, childIndex) => <Renderer key={childIndex} {...child} />),
    [iterator]
  );

  if (!as) {
    return new Array(count)
      .fill(null)
      .map((_, index) => <Fragment key={index}>{children}</Fragment>);
  }

  return new Array(count).fill(null).map((_, index) => (
    <ScopedVariables key={index} as={as} value={index}>
      {children}
    </ScopedVariables>
  ));
}

export type { ForProps };
export { For };
