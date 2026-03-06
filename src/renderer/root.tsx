import { useEffect } from "react";
import type { Elements, Page } from "./type";
import { Renderer } from "./renderer";
import { useGuthrieElements } from "../stores/elements";

type GuthrieProps = {
  elements: Elements,
  page: Page
}

function Guthrie({elements, page}: GuthrieProps) {
    const setElements = useGuthrieElements((state) => state.setElements);

    useEffect(() => {
      setElements(elements);
    }, [elements])

    return (
      <Renderer elementProps={page.content} />
    )
}

export type {
  GuthrieProps
}

export {
  Guthrie
}
