import {Fragment, type ReactNode} from "react";

type ForProps = { count: number, children: ReactNode }

function For({count, children}: ForProps) {

  // oxlint-disable-next-line no-unused-vars
  return new Array(count).fill(null).map((_, index)=> <Fragment key={index}>{children}</Fragment>)
}

export {For}
