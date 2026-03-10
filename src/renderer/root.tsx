import type { Elements, Fns, Operators, Page } from "./type";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieVariables } from "../stores/variables";
import { getDataSourceValue } from "./util";
import { Renderer } from "./renderer";
import { useMountedEffect } from "../hooks/effect";
import { useGuthrieOperators } from "../stores/operators";
import { useInitialze } from "../hooks/init";

type GuthrieProps = {
  elements: Elements,
  fns: Fns,
  page: Page,
  operators: Operators
}

function Guthrie({elements, fns, page, operators}: GuthrieProps) {
  const setElements = useGuthrieElements((state) => state.setElements);
  const setOperators = useGuthrieOperators((state) => state.setOperators);
  const addVariable = useGuthrieVariables((state) => state.addVariable);

  useInitialze(() => {
    setElements(elements);
    setOperators(operators);
  })

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
