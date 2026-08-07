"use client";

import {Ref} from "react";
import {ElementDeclaration} from "../types/element.js";
import {useRendererProps} from "./hooks.js";

/**
 * Props for the {@link Renderer} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type RendererProps = ElementDeclaration & { rawRef?: Ref<unknown> };

/**
 * Core rendering engine for dynamic elements.
 *
 * This component resolves and renders elements defined by
 * {@link DynamicElementProps}. It connects the DSL layer with React
 * by dynamically selecting components, resolving properties,
 * handling refs, and applying events.
 *
 * @remarks
 * Responsibilities:
 * - Resolves element type via element registry
 * - Applies dynamic and static properties
 * - Handles recursive rendering of children
 * - Registers refs in the global store
 * - Attaches event listeners via {@link useGuthrieEventsCallback}
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 * @author David Schummer
 */

function Renderer({
  element,
  ref: refName,
  rawRef,
  children,
  events,
  properties,
  rawProperties,
  ...rest
}: RendererProps) {
  const resolveProps = useRendererProps();
  const { Element, ref, props, renderedChildren } = resolveProps({
    element,
    ref: refName,
    rawRef,
    children,
    events,
    properties,
    rawProperties,
    ...rest
  });

  if (!Element) return null;

  return (
    <Element {...props} ref={ref}>
      {renderedChildren}
    </Element>
  );
}

export type { RendererProps };

export { Renderer };
