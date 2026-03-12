import {Fragment} from "react";
import type {DynamicElementProps} from "../renderer/type";
import {Renderer} from "../renderer/renderer";

type ForProps = {
  count: number,
  iterator: {
    children: DynamicElementProps[]
  }
}

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

export {For}
