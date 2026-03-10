import { useEffect, useRef, type ElementType } from "react";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieRefs } from "../stores/refs";
import { type DynamicElementProps } from "./type";
import { toUnreservedProps } from "./props";

type RendererProps = DynamicElementProps;

function Renderer ({element, ref: refName, children, ...props}: RendererProps) {
  const elements = useGuthrieElements((state) => state.elements);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef(null);
  const Element = elements[element as keyof typeof elements] as ElementType;

  useEffect(() => {
    if (refName)
      addRef(refName, elementRef);
  }, []);

  return (
    <Element
      ref={elementRef}
      {
        ...toUnreservedProps({
          ...props,
          ref: refName
        })
      }>
      {
        children?.map((child, index) => (
          <Renderer
            key={index}
            {...child}
          />
        ))
      }
    </Element>
  );
}

export type {
  RendererProps
}

export {
  Renderer
}
