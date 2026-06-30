"use client";

import { Ref, useEffect, useMemo, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { useGuthrieEventsCallback } from "../hooks/event.js";
import { useGuthrieElements } from "../stores/elements.js";
import { useGuthrieEventsConfig } from "../stores/events-config.js";
import { useGuthrieRefs } from "../stores/refs.js";
import { toMerged } from "es-toolkit";
import { ElementDeclaration } from "../types/element.js";
import { useDefaultProperties } from "../hooks/props.js";
import { useGuthriePropertiesRewrite } from "../hooks/properties-rewrite.js";

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
  const Element = useGuthrieElements((state) => state.elements[element]);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef<HTMLElement | null>(null);
  const refNameAsRef = useRef(refName ?? null);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const {
    properties: defaultProperties,
    rawProperties: defaultRawProperties
  } = useDefaultProperties(element);
  const propertiesDeclaration = useMemo(() =>
    toMerged(defaultProperties || {}, properties || {}),
    [defaultProperties, properties]
  );
  const settledProperties = useGuthriePropertiesRewrite({ properties: propertiesDeclaration, Renderer });
  const rawPropertyDeclaration = useMemo(() =>
    toMerged(defaultRawProperties || {}, rawProperties || {}),
    [defaultRawProperties, rawProperties]
  );
  const props = useMemo(() => ({
    ...rest,
    ...toMerged(rawPropertyDeclaration, settledProperties),
    events,
    refname: refName,
    elements: children
  }), [rawPropertyDeclaration, settledProperties, refName, children, events, rest]);
  const registerEvents = useGuthrieEventsCallback();

  useEffect(() => {
    refName && elementRef.current && addRef(refName, elementRef.current);
    if (eventsConfig.autoApply && (elementRef.current || refNameAsRef.current))
      registerEvents(refNameAsRef.current ? refNameAsRef : elementRef, events);

  }, [Element, elementRef.current, refNameAsRef.current]);

  console.log(Element, children);

  const renderedChildren = useMemo(() => children?.map((child, index) => (
    <Renderer key={index} {...child} />
  )), [children])

  console.log(renderedChildren);

  if (!Element) return null;

  return (
    <Element {...props} ref={mergeRefs([elementRef, rawRef])}>
      {renderedChildren}
    </Element>
  );
}

export type { RendererProps };

export { Renderer };
