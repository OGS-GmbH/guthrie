import {type ElementType, useEffect, useRef} from "react";
import {useGuthrieElements, useGuthrieRefs} from "./hooks";
import {toUnreservedProps} from "./props";

type ElementProps = { element: string; ref?: string, children?: ElementProps[], [key: string]: unknown };
type RootChild = ElementProps;
type Page = {
  route: string;
  content: RootChild
};
type StageProps = {
  components: Record<string, ElementType>;
  page: Page
}

type ContentRendererProps = {
    elementProps: ElementProps;
}

function ContentRenderer({elementProps}: ContentRendererProps) {
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


function Stage({components, page}: StageProps) {
    const setElements = useGuthrieElements((state) => state.setElements);

    setElements(components);

    return <ContentRenderer elementProps={page.content} />
}


export {
  Stage,
  ContentRenderer
}

export type {
  ElementProps
}
