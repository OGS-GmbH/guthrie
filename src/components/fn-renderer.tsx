import {useMemo} from "react";
import type {DynamicElementProps, ExposableFn} from "../renderer/type.ts";
import {Renderer} from "../renderer/renderer.tsx";
import {callFn} from "../renderer/fns.ts";
import { usePromise } from "@ogs-gmbh/react-hooks";

type FnRendererProps = ExposableFn

function FnRenderer(props: FnRendererProps) {
  const promise = useMemo(() => callFn(props) as Promise<DynamicElementProps>, [props]);
  const content = usePromise<DynamicElementProps>(promise);

  return content && (<Renderer {...content}/>)
}

export type {FnRendererProps}

export {FnRenderer}

