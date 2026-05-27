"use client";

import { Ref, useEffect, useMemo, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { useGuthrieEventsCallback } from "../hooks/event.js";
import { useGuthrieProperties } from "../hooks/properties.js";
import { useGuthrieElements } from "../stores/elements.js";
import { useGuthrieEventsConfig } from "../stores/events-config.js";
import { useGuthrieRefs } from "../stores/refs.js";
import { useDefaultProps } from "./root.js";
import { type DynamicElementProps } from "./type.js";

/**
 * Props for the {@link Renderer} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 */
type RendererProps = DynamicElementProps & { rawRef?: Ref<unknown> };

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
  rawProperties
}: RendererProps) {
  const elements = useGuthrieElements((state) => state.elements);
  const Element = useMemo(() => elements[element], [elements]);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef<HTMLElement | null>(null);
  const refNameAsRef = useRef(refName ?? null);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);

  const defaultProperties = useDefaultProps()?.[element];
  const [propsWithDefaults, rawPropsWithDefaults] = useMemo(
    () => [
      { ...properties, ...defaultProperties?.properties },
      { ...rawProperties, ...defaultProperties?.rawProperties }
    ],
    [element, defaultProperties, properties, rawProperties]
  );

  const resolvedProperties = useGuthrieProperties(propsWithDefaults);
  const registerEvents = useGuthrieEventsCallback();
  const elementProps = useMemo(
    () => ({
      ...rawPropsWithDefaults,
      ...resolvedProperties?.static,
      ...(resolvedProperties?.renderable
        ? Object.fromEntries(
            Object.entries(resolvedProperties?.renderable).map(([key, dynamicElementProps]) => [
              key,
              <Renderer key={key} {...dynamicElementProps} />
            ])
          )
        : {}),
      events,
      refname: refName,
      elements: children
    }),
    [refName, events, children, resolvedProperties]
  );

  useEffect(() => {
    refName && elementRef.current && addRef(refName, elementRef.current);
    if (eventsConfig.autoApply && (elementRef.current || refNameAsRef.current))
      registerEvents(refNameAsRef.current ? refNameAsRef : elementRef, events);

  }, [Element, elementRef.current, refNameAsRef.current]);

  if (!Element) return null;

  if (element === "mui-menu-item")
    console.log(elementProps)

  return (
    <Element {...elementProps} ref={mergeRefs([elementRef, rawRef])}>
      {children?.map((child, index) => (
        <Renderer key={index} {...child} />
      ))}
    </Element>
  );
}

export type { RendererProps };

export { Renderer };
