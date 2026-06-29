"use client";

import {Ref, useEffect, useMemo, useRef} from "react";
import {mergeRefs} from "react-merge-refs";
import {useGuthrieEventsCallback} from "../hooks/event.js";
import {useGuthrieProperties} from "../hooks/properties.js";
import {useGuthrieElements} from "../stores/elements.js";
import {useGuthrieEventsConfig} from "../stores/events-config.js";
import {useGuthrieRefs} from "../stores/refs.js";
import {useDefaultProps} from "./root.js";
import {DynamicChildProperty, type DynamicElementProps} from "./type.js";
import {toMerged} from "es-toolkit";

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
      toMerged(defaultProperties?.properties ?? {}, properties ?? {}) ,
      toMerged(defaultProperties?.rawProperties ?? {}, rawProperties ?? {})
    ],
    [element, defaultProperties, properties, rawProperties]
  );

  const resolvedProperties = useGuthrieProperties(propsWithDefaults);
  const registerEvents = useGuthrieEventsCallback();
  const elementProps = useMemo(
    () => {
        // oxlint-disable-next-line no-use-before-define
      const staticProperties = resolveStaticProperties(toMerged(resolvedProperties?.sync?.static ?? {}, resolvedProperties?.async?.static ?? {})) as Record<string, unknown>;
      const renderableProperties = Object.fromEntries(
        Object.entries(toMerged(resolvedProperties?.sync?.renderable ?? {}, resolvedProperties?.async?.renderable ?? {})).map(([key, dynamicElementProps]) => [
          key,
          <Renderer key={key} {...dynamicElementProps} />
        ])
      );

      return ({
        ...toMerged(toMerged(rawPropsWithDefaults, staticProperties), renderableProperties),
        events,
        refname: refName,
        elements: children
      })
    },
    [refName, events, children, resolvedProperties?.sync, resolvedProperties?.async]
  );

 /* useEffect(() => {
    console.log("yoyoyoyo", elementProps);
  }, [elementProps]);*/


  useEffect(() => {
    refName && elementRef.current && addRef(refName, elementRef.current);
    if (eventsConfig.autoApply && (elementRef.current || refNameAsRef.current))
      registerEvents(refNameAsRef.current ? refNameAsRef : elementRef, events);

  }, [Element, elementRef.current, refNameAsRef.current]);

  if (!Element) return null;

  return (
    <Element {...elementProps} ref={mergeRefs([elementRef, rawRef])}>
      {children?.map((child, index) => (
        <Renderer key={index} {...child} />
      ))}
    </Element>
  );
}

function resolveStaticProperties(
  value: unknown,
  key?: string
): unknown {
  if (value === undefined)
    return undefined;


  if (value === null || typeof value !== "object")
    return value;


  if (Array.isArray(value)) {
    return value.map((item, index) =>
      resolveStaticProperties(item, String(index))
    );
  }

  if ("type" in value && value.type === "child") {
    const { type, ...rest } = value as DynamicChildProperty;

    return (
      <Renderer
        key={key}
        {...(rest as DynamicElementProps)}
      />
    );
  }

  return Object.fromEntries(
    Object.entries(value).map(([childKey, childValue]) => [
      childKey,
      resolveStaticProperties(childValue, childKey),
    ])
  );
}

export type { RendererProps };

export { Renderer };
