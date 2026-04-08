import { useMountedEffect } from "@ogs-gmbh/react-hooks";
import { type RefObject, useEffect, useRef } from "react";
import { useGuthrieEventsCallback } from "../hooks/event";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieEventsConfig } from "../stores/events-config";
import { useGuthrieFns } from "../stores/fns";
import { useGuthrieOperators } from "../stores/operators";
import { useGuthrieRefs } from "../stores/refs";
import { callFn } from "./fns";
import { Renderer } from "./renderer";
import type { Elements, EventConfig, Fns, Operators, Page, VariablesConfig } from "./type";

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
  page: Page;
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
function Guthrie({ elements, fns, page, operators, event }: GuthrieProps) {
  const setElements = useGuthrieElements((state) => state.setElements);
  const setOperators = useGuthrieOperators((state) => state.setOperators);
  const setEventsConfig = useGuthrieEventsConfig((state) => state.setConfig);
  const setFns = useGuthrieFns((state) => state.setFns);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const windowRef = useRef(window);
  const registerEvents = useGuthrieEventsCallback(event?.rootRef ?? windowRef, page.events);

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
    page.onInit?.forEach((onInitFn) => callFn(onInitFn));

    eventsConfig.autoApply && registerEvents();

    return () => page.onDestroy?.forEach((onDestryFn) => callFn(onDestryFn));
  }, []);

  useMountedEffect(() => {
    page.onRender?.forEach((onRenderFn) => callFn(onRenderFn));
  });

  return <Renderer {...page.content} />;
}

export type { GuthrieProps };

export { Guthrie };
