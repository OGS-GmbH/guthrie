import type { DynamicElementProps } from "./type";

type RendererProps = DynamicElementProps;

function Renderer ({elementProps}: RendererProps) {
  const elements = useGuthrieElements((state) => state.elements);
  const addRef = useGuthrieRefs((state) => state.addRef);
  const {element, ref: refName, children, ...props} = elementProps;
  const Element = elements[element as keyof typeof elementProps] as ElementType;
  const nodeRef = useRef(null);

  useEffect(() => {
    if (refName)
      addRef(refName, nodeRef);
  }, []);

  return (
    <Element ref={nodeRef} {...toUnreservedProps({
      ...props,
      ref: refName
    })}>
      {
        children?.map((child, index) => (
          <ContentRenderer
            key={index}
            elementProps={child}
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
