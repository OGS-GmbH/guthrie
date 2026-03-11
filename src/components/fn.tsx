import { Fragment, useEffect } from "react";
import type { ExposableFn } from "../renderer/type";
import { useGuthrieFns } from "../stores/fns";
import { useGuthrieVariables } from "../stores/variables";
import { callFn } from "../renderer/fns";

type FnProps = ExposableFn;

function Fn ({ ...props }: ExposableFn) {
  const fns = useGuthrieFns((state) => state.fns);
  const variables = useGuthrieVariables((state) => state.variables);

  useEffect(() => {
    callFn(props, fns, variables);
  }, []);

  return <Fragment />; // oxlint-disable-line eslint-plugin-react(jsx-no-useless-fragment)
}

export type {
  FnProps
}

export {
  Fn
}
