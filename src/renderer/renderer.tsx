"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGuthrieEventsCallback } from "../hooks/event.js";
import { useGuthrieProperties } from "../hooks/properties.js";
import { useScopedVariables } from "../hooks/scoped-variables.js";
import { useGuthrieElements } from "../stores/elements.js";
import { useGuthrieEventsConfig } from "../stores/events-config.js";
import { useGuthrieRefs } from "../stores/refs.js";
import { type DynamicElementProps } from "./type.js";

/**
 * Props for the {@link Renderer} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type RendererProps = DynamicElementProps;

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
  children,
  events,
  properties,
  ...props
}: RendererProps) {
  const elements = useGuthrieElements((state) => state.elements);
  const Element = useMemo(() => elements[element], [elements]);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef<HTMLElement | null>(null);
  const refNameAsRef = useRef(refName ?? null);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const scopedVariables = useScopedVariables();
  const resolvedProperties = useGuthrieProperties(properties, scopedVariables);

  const elementProps = useMemo(
    () => ({
      ...props,
      ...resolvedProperties?.static,
      ...(resolvedProperties?.dynamic
        ? Object.fromEntries(
            Object.entries(resolvedProperties?.dynamic).map(([key, dynamicElementProps]) => [
              key,
              <Renderer key={key} {...dynamicElementProps} />
            ])
          )
        : {}),
      ref: elementRef,
      events,
      refname: refName,
      elements: children
    }),
    [props, refName, events, children, resolvedProperties]
  );
  const registerEvents = useGuthrieEventsCallback(refNameAsRef, events);

  useEffect(() => {
    if (refName && elementRef.current) addRef(refName, elementRef.current);

    if (elementRef.current && eventsConfig.autoApply) registerEvents();
  }, [Element]);

  if (!Element) return null;

  return (
    <Element {...elementProps} ref={elementRef}>
      {children?.map((child, index) => (
        <Renderer key={index} {...child} />
      ))}
    </Element>
  );
}

export type { RendererProps };

export { Renderer };
