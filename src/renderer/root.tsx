"use client";

import { useMountedEffect } from "@ogs-gmbh/react-hooks";
import { createContext, type RefObject, useContext, useEffect, useRef } from "react";
import { useGuthrieEventsCallback } from "../hooks/event.js";
import { useGuthrieElements } from "../stores/elements.js";
import { useGuthrieEventsConfig } from "../stores/events-config.js";
import { useGuthrieFns } from "../stores/fns.js";
import { useGuthrieOperators } from "../stores/operators.js";
import { useGuthrieRefs } from "../stores/refs.js";
import { callFnAsync } from "./fns.js";
import { Renderer } from "./renderer.js";
import type {
  DefaultProperties,
  Elements,
  EventConfig,
  Fns,
  Operators,
  Render,
  VariablesConfig
} from "./type.js";

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
  fns: Fns;
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
const DefaultPropsProvider = createContext<Record<string, DefaultProperties> | null>(null);
function useDefaultProps() {
  return useContext(DefaultPropsProvider);
}

function Guthrie({ elements, fns, render, operators, event }: GuthrieProps) {
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
    setOperators(operators);
  }, [operators]);

  useEffect(() => {
    setFns(fns);
  }, [fns]);

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
    <DefaultPropsProvider value={render.defaultProperties ?? null}>
      <Renderer {...render.content} />
    </DefaultPropsProvider>
  );
}

export type { GuthrieProps };

export { Guthrie, useDefaultProps };
