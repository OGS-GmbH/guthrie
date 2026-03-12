import { Fragment, useEffect } from "react";
import type { ExposableFn } from "../renderer/type";
import { callFn } from "../renderer/fns";

type FnProps = ExposableFn;

function Fn ({ ...props }: ExposableFn) {
  useEffect(() => {
    callFn(props);
  }, []);

  return <Fragment />; // oxlint-disable-line eslint-plugin-react(jsx-no-useless-fragment)
}

export type {
  FnProps
}

export {
  Fn
}
