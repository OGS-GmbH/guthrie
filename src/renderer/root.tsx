import type { Elements, Fns, Page } from "./type";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieVariables } from "../stores/variables";
import { getDataSourceValue } from "./util";
import { Renderer } from "./renderer";
import { useMountedEffect } from "../hooks/effect";

type GuthrieProps = {
  elements: Elements,
  fns: Fns,
  page: Page
}

function Guthrie({elements, fns, page}: GuthrieProps) {
  const setElements = useGuthrieElements((state) => state.setElements);
  const addVariable = useGuthrieVariables((state) => state.addVariable);
  setElements(elements);

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
