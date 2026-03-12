import { useEffect, useRef, type ElementType } from "react";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieRefs } from "../stores/refs";
import { type DynamicElementProps } from "./type";
import { toUnreservedProps } from "./props";
import { useGuthrieEventsApply } from "../hooks/event";

type RendererProps = DynamicElementProps;

function Renderer ({element, ref: refName, children, events, ...props}: RendererProps) {
  const elements = useGuthrieElements((state) => state.elements);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef(null);
  const Element = elements[element as keyof typeof elements] as ElementType;
  const guthrieContext = {
    ...toUnreservedProps({
      ...props,
      ref: refName,
      events
    })
  };

  useGuthrieEventsApply(
    elementRef,
    events
  );

  useEffect(() => {
    if (refName)
      addRef(refName, elementRef);
  }, []);

  return (
    <Element
      ref={elementRef}
      {...guthrieContext}>
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
