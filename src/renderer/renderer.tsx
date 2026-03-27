import {useEffect, useMemo, useRef} from "react";
import {useGuthrieElements} from "../stores/elements";
import {useGuthrieRefs} from "../stores/refs";
import {type DynamicElementProps} from "./type";
import {useGuthrieEventsCallback} from "../hooks/event";
import {useGuthrieEventsConfig} from "../stores/events";
import {useGuthrieProperties} from "../hooks/properties";

type RendererProps = DynamicElementProps;

function Renderer ({element, ref: refName, children, events, properties, ...props}: RendererProps) {
  const elements = useGuthrieElements((state) => state.elements);
  const Element = useMemo(()=> elements[element], [elements]);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const elementRef = useRef<HTMLElement| null>(null);
  const refNameAsRef = useRef(refName ?? null);
  const eventsConfig = useGuthrieEventsConfig((state) => state.config);
  const resolvedProperties = useGuthrieProperties(properties);

  const elementProps = useMemo(() => ({
    ...props,
    ...resolvedProperties?.ready,
    ...(resolvedProperties?.recursive ? Object.fromEntries(Object.entries(resolvedProperties?.recursive).map(([key, dynamicElementProps])=> [key, <Renderer key={key} {...dynamicElementProps}/>] )) : {}),
    ref: elementRef,
    events,
    refname: refName,
    elements: children
  }), [props, refName, events, children, resolvedProperties])
  const registerEvents = useGuthrieEventsCallback(
    refNameAsRef,
    events
  );

  useEffect(() => {
    if (refName && elementRef.current)
      addRef(refName, elementRef.current);

    if (elementRef.current && eventsConfig.autoApply)
      registerEvents();

  }, [Element]);


  if (!Element)
    return null;

  return (
    <Element
      {...elementProps}
      ref={elementRef}
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
