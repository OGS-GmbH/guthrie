import {Fragment, useEffect, useMemo} from "react";
import type {DynamicElementProps, ExposableFn} from "../renderer/type";
import {callFn} from "../renderer/fns";
import {usePromise} from "@ogs-gmbh/react-hooks";
import {Renderer} from "../renderer/renderer.tsx";

type FnProps = ExposableFn;

function Fn ({ ...props }: FnProps) {
  useEffect(() => void callFn(props), [props]);

  return <Fragment />; // oxlint-disable-line eslint-plugin-react(jsx-no-useless-fragment)
}

type FnRendererProps = ExposableFn

function FnRenderer(props: FnRendererProps) {
  const promise = useMemo(() => callFn(props) as Promise<DynamicElementProps>, [props]);
  const content = usePromise<DynamicElementProps>(promise);

  return content && (<Renderer {...content}/>)
}


export type {
  FnProps,
  FnRendererProps
}

export {
  Fn,
  FnRenderer
}
