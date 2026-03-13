import { useEffect, useMemo, useRef } from "react";
import { useGuthrieElements } from "../stores/elements";
import { useGuthrieRefs } from "../stores/refs";
import { type DynamicElementProps } from "./type";
import { useGuthrieEventsCallback } from "../hooks/event";
import { useGuthrieEventsConfig } from "../stores/events";

type RendererProps = DynamicElementProps;

function Renderer ({element, ref: refName, children, events, ...props}: RendererProps) {
  const Element = useGuthrieElements((state) => state.elements[element]);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef<HTMLElement| null>(null);
  const refNameAsRef = useRef(refName ?? null);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const elementProps = useMemo(() => ({
    ...props,
    events,
    refname: refName,
    elements: children
  }), [props, refName, events, children])
  const registerEvents = useGuthrieEventsCallback(
    refNameAsRef,
    events
  );

  useEffect(() => {
    if (refName)
      addRef(refName, elementRef.current);

    eventsConfig.autoApply && registerEvents();
  }, []);


  if (!Element)
    return null;

  return (
    <Element
      ref={elementRef}
      {...elementProps}
    >
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
