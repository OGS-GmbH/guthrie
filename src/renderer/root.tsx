"use client";

import { useMountedEffect } from "@ogs-gmbh/react-hooks";
import { type RefObject, useEffect, useRef } from "react";
import { useGuthrieEventsCallback } from "../hooks/event.js";
import { useGuthrieElements } from "../stores/elements.js";
import { useGuthrieEventsConfig } from "../stores/events-config.js";
import { useGuthrieFns } from "../stores/fns.js";
import { useGuthrieOperators } from "../stores/operators.js";
import { useGuthrieRefs } from "../stores/refs.js";
import { callFnAsync } from "./fns.js";
import { Renderer } from "./renderer.js";
import { Elements } from "../types/element.js";
import { Functions } from "../types/function.js";
import { Render } from "./types.js";
import { VariablesConfig } from "../types/variable.js";
import { EventConfig } from "../types/event.js";
import { DefaultPropertiesProvider } from "../components/default-properties.js";
import {Operators} from "../types/operation.js";

/**
 * Props for the {@link Guthrie} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 * @author David Schummer
 */
type GuthrieProps = {
  elements: Elements;
  functions: Functions;
  render: Render;
  operators: Operators;
  variables?: VariablesConfig;
  event?: {
    rootRef?: RefObject<HTMLElement | null>;
  } & Partial<EventConfig>;
};

/**
 * Root component of the Guthrie runtime.
 *
 * Initializes the runtime environment and renders the provided page.
 * This component wires together all core systems including elements,
 * functions, operators, events, and lifecycle execution.
 *
 * @remarks
 * Responsibilities:
 * - Registers element, function, and operator registries
 * - Configures global event handling
 * - Initializes references (e.g. "window")
 * - Executes lifecycle hooks (`onInit`, `onRender`, `onDestroy`)
 * - Delegates rendering to {@link Renderer}
 *
 * Lifecycle:
 * - `onInit` → executed on mount
 * - `onRender` → executed after render
 * - `onDestroy` → executed on unmount
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 * @author David Schummer
 */
function Guthrie({
  elements,
  functions,
  render,
  operators,
  event
}: GuthrieProps) {
  const setElements = useGuthrieElements((state) => state.setElements);
  const setOperators = useGuthrieOperators((state) => state.setOperators);
  const setEventsConfig = useGuthrieEventsConfig((state) => state.setConfig);
  const setFns = useGuthrieFns((state) => state.setFns);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const windowRef = useRef(typeof window === "undefined" ? null : window);
  const registerEvents = useGuthrieEventsCallback();

  useEffect(() => {
    setElements(elements);
  }, [elements]);

  useEffect(() => {
    setFns(functions);
  }, [functions]);

  useEffect(() => {
    setOperators(operators);
  }, [operators]);

  useEffect(() => {
    addRef("window", (event?.rootRef ?? windowRef).current);
    setEventsConfig({
      autoApply: event?.autoApply ?? true
    });
  }, [event]);

  useEffect(() => {
    render.onInit?.forEach((onInitFn) => callFnAsync(onInitFn));

    eventsConfig.autoApply && registerEvents(event?.rootRef ?? windowRef, render.events);

    return () => render.onDestroy?.forEach((onDestroyFn) => callFnAsync(onDestroyFn));
  }, []);

  useMountedEffect(() => {
    render.onRender?.forEach((onRenderFn) => callFnAsync(onRenderFn));
  });

  return (
    <DefaultPropertiesProvider
      properties={render.defaultProperties}
      rawProperties={render.defaultRawProperties}
    >
      <Renderer {...render.content} />
    </DefaultPropertiesProvider>
  );
}

export type { GuthrieProps };

export { Guthrie };
