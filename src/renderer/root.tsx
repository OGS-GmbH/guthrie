import type { Elements, Fns, Operators, Page } from "./type";
import { useGuthrieElements } from "../stores/elements";
import { Renderer } from "./renderer";
import { useMountedEffect } from "../hooks/effect";
import { useGuthrieOperators } from "../stores/operators";
import {useEffect, useRef, type RefObject} from "react";
import {useGuthrieEventsConfig} from "../stores/events.ts";
import {useGuthrieFns} from "../stores/fns.ts";
import type { Variables } from "../options/variables.ts";
import { callFn } from "./fns.ts";
import { useGuthrieRefs } from "../stores/refs.ts";
import { useGuthrieEventsCallback } from "../hooks/event.ts";

type GuthrieProps = {
  elements: Elements,
  fns: Fns,
  page: Page,
  operators: Operators,
  variables?: Variables,
  event?: {
    rootRef?: RefObject<HTMLElement | null>,
    autoApply?: boolean
  }
}

function Guthrie({elements, fns, page, operators, variables, event}: GuthrieProps) {
  const setElements = useGuthrieElements((state) => state.setElements);
  const setOperators = useGuthrieOperators((state) => state.setOperators);
  const setEventsConfig = useGuthrieEventsConfig((state) => state.setConfig)
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const setFns = useGuthrieFns((state) => state.setFns)
  const addRef = useGuthrieRefs((state) => state.addRef);
  const windowRef = useRef(window);
  const registerEvents = useGuthrieEventsCallback(
    event?.rootRef ?? windowRef,
    page.events
  );

  useEffect(() => {
    setElements(elements);
  }, [elements])

  useEffect(() => {
    setOperators(operators);
  }, [operators])

  useEffect(() => {
    setFns(fns);
  }, [fns])

  useEffect(() => {
    addRef("window", (event?.rootRef ?? windowRef).current);
    setEventsConfig({
      autoApply: event?.autoApply
    });
  }, [event])

  useEffect(() => {
    page.onInit?.forEach((onInitFn) => callFn(onInitFn));

    eventsConfig.autoApply && registerEvents();

    return () => page.onDestroy?.forEach((onDestryFn) => callFn(onDestryFn))
  }, [])

  useMountedEffect(() => {
    page.onRender?.forEach((onRenderFn) => callFn(onRenderFn));
  });

  return (
    <Renderer {...page.content} />
  )
}

export type {
  GuthrieProps
}

export {
  Guthrie
}
