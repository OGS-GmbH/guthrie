import type { Elements, Fns, Operators, Page } from "./type";
import { useGuthrieElements } from "../stores/elements";
import { Renderer } from "./renderer";
import { useMountedEffect } from "../hooks/effect";
import { useGuthrieOperators } from "../stores/operators";
import {useEffect, useRef, type RefObject} from "react";
import {useInitialize} from "../hooks/init.ts";
import {useGuthrieEventsConfig} from "../stores/events.ts";
import {useGuthrieFns} from "../stores/fns.ts";
import type { Variables } from "../options/variables.ts";
import { callFn } from "./fns.ts";
import { useGuthrieRefs } from "../stores/refs.ts";
import { useGuthrieEventsApply } from "../hooks/event.ts";

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
  const setFns = useGuthrieFns((state) => state.setFns)
  const addRefs = useGuthrieRefs((state) => state.addRef);
  const windowRef = useRef(window);

  useGuthrieEventsApply(
    event?.rootRef ?? windowRef,
    page.events
  );

  useInitialize(() => {
    addRefs("window", event?.rootRef ?? windowRef)
    page.onInit?.forEach((onInitFn) => callFn(onInitFn));

    setFns(fns);
    setEventsConfig({
      autoApply: event?.autoApply ?? true
    });
    setElements(elements);
    setOperators(operators);
  });

  useMountedEffect(() => {
    page.onRender?.forEach((onRenderFn) => callFn(onRenderFn));
  });

  useEffect(() =>
    () => page.onDestroy?.forEach((onDestryFn) => callFn(onDestryFn)),
    []
  );

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
