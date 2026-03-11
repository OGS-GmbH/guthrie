import type { Elements, Fns, Operators, Page } from "./type";
import { useGuthrieElements } from "../stores/elements";
import { Renderer } from "./renderer";
import { useMountedEffect } from "../hooks/effect";
import { useGuthrieOperators } from "../stores/operators";
import {useEffect, type RefObject} from "react";
import {useInitialize} from "../hooks/init.ts";
import {useGuthrieEventsConfigStore} from "../stores/events.ts";
import {useGuthrieFns} from "../stores/fns.ts";
import {useGuthrieEvents} from "../hooks/event.ts";
import type { Variables } from "../options/variables.ts";
import { callFn } from "./fns.ts";

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
  const setEventsConfig = useGuthrieEventsConfigStore((state) => state.setConfig)
  const setFns = useGuthrieFns((state) => state.setFns)

  useInitialize(() => {
    page.onInit?.forEach((onInitFn) => callFn(onInitFn, fns, variables));

    setFns(fns);
    setEventsConfig({autoApply: event?.autoApply ?? true});
    setElements(elements);
    setOperators(operators);
  });

  useGuthrieEvents(event?.rootRef?.current ?? window, page.events);

  useMountedEffect(() => {
    page.onRender?.forEach((onRenderFn) => callFn(onRenderFn, fns, variables));
  }, []);

  useEffect(() =>
    () => page.onDestroy?.forEach((onDestryFn) => callFn(onDestryFn, fns, variables)),
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
