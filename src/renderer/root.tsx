import type { Elements, Fns, Operators, Page } from "./type";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieVariables } from "../stores/variables";
import { Renderer } from "./renderer";
import { useMountedEffect } from "../hooks/effect";
import { useGuthrieOperators } from "../stores/operators";
import {type RefObject, useEffect} from "react";
import {useInitialze} from "../hooks/init.ts";
import {getDataSourceValue} from "./data-source.ts";
import {useGuthrieEventsConfigStore} from "../stores/events.ts";
import {useGuthrieFns} from "../stores/fns.ts";
import {useGuthrieEvents} from "../hooks/event.ts";

type GuthrieProps = {
  elements: Elements,
  fns: Fns,
  page: Page,
  operators: Operators,
  event?: {
    rootRef?: RefObject<HTMLElement | null>,
    autoApply?: boolean

  }
}

function Guthrie({elements, fns, page, operators, event}: GuthrieProps) {
  const setElements = useGuthrieElements((state) => state.setElements);
  const setOperators = useGuthrieOperators((state) => state.setOperators);
  const addVariable = useGuthrieVariables((state) => state.addVariable);
  const setEventsConfig = useGuthrieEventsConfigStore((state) => state.setConfig)
  const setFns = useGuthrieFns((state) => state.setFns)

  useInitialze(() => {
    setFns(fns);
    setEventsConfig({autoApply: event?.autoApply ?? true});
    setElements(elements);
    setOperators(operators);
  });

  useGuthrieEvents(event?.rootRef?.current ?? window, page.events);

  useMountedEffect(() => {
    if (page.dataSources) {
      page.dataSources.forEach((dataSource) => {
        const value = getDataSourceValue(dataSource, fns)

        addVariable(dataSource.as, value);
      })
    }
  }, [])

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
