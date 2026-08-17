import {Renderer, RendererProps} from "./renderer.js";
import {useGuthrieElements} from "../stores/elements.js";
import {useGuthrieRefs} from "../stores/refs.js";
import {useEffect, useMemo, useRef} from "react";
import {useGuthrieEventsConfig} from "../stores/events-config.js";
import {useDefaultProperties} from "../hooks/props.js";
import {toMerged} from "es-toolkit";
import {useGuthriePropertiesRewrite} from "../hooks/properties-rewrite.js";
import {useGuthrieEventsCallback} from "../hooks/event.js";
import {mergeRefs} from "react-merge-refs";

function useRendererProps() {
  return ({
            element,
            ref: refName,
            rawRef,
            children,
            events,
            properties,
            rawProperties,
            ...rest
          }: RendererProps) => {
    const Element = useGuthrieElements((state) => state.elements[element]);
    const addRef = useGuthrieRefs((state) => state.addRef);
    const elementRef = useRef<HTMLElement | null>(null);
    const refNameAsRef = useRef(refName ?? null);
    const eventsConfig = useGuthrieEventsConfig((state) => state.config);
    const { properties: defaultProperties, rawProperties: defaultRawProperties } =
      useDefaultProperties(element);
    const propertiesDeclaration = useMemo(
      () => toMerged(defaultProperties || {}, properties || {}),
      [defaultProperties, properties]
    );
    const settledProperties = useGuthriePropertiesRewrite({
      properties: propertiesDeclaration,
      Renderer
    });
    const rawPropertyDeclaration = useMemo(
      () => toMerged(defaultRawProperties || {}, rawProperties || {}),
      [defaultRawProperties, rawProperties]
    );
    const props = useMemo(
      () => ({
        ...rest,
        ...toMerged(rawPropertyDeclaration, settledProperties),
        events,
        refname: refName,
        elements: children
      }),
      [rawPropertyDeclaration, settledProperties, refName, children, events, rest]
    );
    const registerEvents = useGuthrieEventsCallback();

    useEffect(() => {
      refName && elementRef.current && addRef(refName, elementRef.current);
      if (eventsConfig.autoApply && (elementRef.current || refNameAsRef.current))
        registerEvents(refNameAsRef.current ? refNameAsRef : elementRef, events);
    }, [Element, elementRef.current, refNameAsRef.current]);

    const renderedChildren = useMemo(
      () => children?.map((child, index) => <Renderer key={index} {...child} />),
      [children]
    );

    return { Element, ref: mergeRefs([elementRef, rawRef]), props, renderedChildren };
  };
}

export { useRendererProps}
