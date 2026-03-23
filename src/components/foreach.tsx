import { Fragment } from "react/jsx-runtime"
import type { DynamicElementProps } from "../renderer/type"
import { Renderer } from "../renderer/renderer"

type ForEachProps = {
  items: unknown[],
  iterator: {
    children: DynamicElementProps[]
  }
}

function ForEach ({ items, iterator }: ForEachProps) {
  return items.map((item, index) => ( // TODO: Expose item
    <Fragment key={index}>
      {
        iterator.children.map((child, childIndex) => (
          <Renderer key={childIndex} {...child} />
        ))
      }
    </Fragment>
  ))
}

export {
  ForEach
}
