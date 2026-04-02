import {Fragment} from "react";
import type {DynamicElementProps} from "../renderer/type";
import {Renderer} from "../renderer/renderer";

/**
 * Props for the {@link For} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type ForProps = {
  count: number,
  iterator: {
    children: DynamicElementProps[]
  }
}

/**
 * Repeats a set of elements a fixed number of times.
 *
 * This component renders the provided children multiple times based on the
 * given `count`. Each iteration renders the same set of dynamic elements.
 *
 * @remarks
 * - Does not expose the current index
 * - Intended for simple repetition use cases
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function For({count, iterator}: ForProps) {
  // oxlint-disable-next-line no-unused-vars
  return new Array(count).fill(null).map((_, index) => (
    <Fragment key={index}>
      {
        iterator.children.map((child, childIndex) => (
          <Renderer key={childIndex} {...child} />
        ))
      }
    </Fragment>
  ))
}

export type {
  ForProps
}
export {
  For
}
