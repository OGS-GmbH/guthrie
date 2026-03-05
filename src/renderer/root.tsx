import { useEffect } from "react";
import { useGuthrieElements } from "../hooks";
import type { Components, Page } from "./type";
import { Renderer } from "./renderer";

type GuthrieProps = {
  components: Components,
  page: Page
}

function Guthrie({components, page}: GuthrieProps) {
    const setElements = useGuthrieElements((state) => state.setElements);

    useEffect(() => {
      setElements(components);
    }, [components])

    return <Renderer elementProps={page.content} />
}

export type {
  
}

export {
  Guthrie
}
