"use client";

import { usePromise } from "@ogs-gmbh/react-hooks";
import { useEffect, useMemo } from "react";
import { callFn } from "../renderer/fns.js";
import { Renderer } from "../renderer/renderer.js";
import type { DynamicElementProps, ExposableFn } from "../renderer/type.js";

/**
 * Props for the {@link Fn} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type FnProps = ExposableFn;

/**
 * Executes a function without rendering any content.
 *
 * This component is used for side effects only. It calls the provided function
 * via {@link callFn} and does not produce any DOM output.
 *
 * If the function is exposable, its result will be made available as a variable
 * within the rendering context.
 *
 * @remarks
 * - Does not render anything
 * - Intended for triggering logic or exposing values
 *
 * @returns React Component (empty Fragment)
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function Fn({ ...props }: FnProps) {
  useEffect(() => void callFn(props), [props]);

  return <></>; // oxlint-disable-line eslint-plugin-react(jsx-no-useless-fragment)
}

type FnRendererProps = ExposableFn;

/**
 * Executes a function and renders its result.
 *
 * Unlike {@link Fn}, this component expects the called function to return
 * {@link DynamicElementProps}, which will then be rendered using {@link Renderer}.
 *
 * @remarks
 * - The function must resolve to {@link DynamicElementProps}
 * - Supports async functions via {@link https://www.npmjs.com/package/@ogs-gmbh/react-hooks | usePromise}
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
function FnRenderer(props: FnRendererProps) {
  const promise = useMemo(() => callFn(props) as Promise<DynamicElementProps>, [props]);
  const content = usePromise<DynamicElementProps>(promise);

  return content && <Renderer {...content} />;
}

export type { FnProps, FnRendererProps };

export { Fn, FnRenderer };
