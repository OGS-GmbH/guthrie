import {type ElementType, useEffect, useMemo, useRef} from "react";
import {useGuthrieElements, useGuthrieRefs} from "./hooks";
import {DEFAULT_COMPONENTS} from "./constants";

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

function ContentRenderer({elementProps}: ContentRendererProps) {
    const elements = useGuthrieElements((state) => state.elements);
    const addRef = useGuthrieRefs((state) => state.addRef);
    const {element, ref, children, ...props} = elementProps;
    const Element = elements[element as keyof typeof elementProps] as ElementType;
    const nodeRef = useRef(null);

    useEffect(() => {
        if (ref) addRef(ref, nodeRef);
    }, [])

    return (
        <Element ref={nodeRef} {...props}>
            {children?.map((child, index) => (<ContentRenderer key={index} elementProps={child}/>))}
        </Element>
    );
}

function Stage({components, page}: StageProps) {
    const componentSet = useMemo(() => ({...components, ...DEFAULT_COMPONENTS}), [components])
    const setElements = useGuthrieElements((state) => state.setElements);

    setElements(componentSet);

    return <ContentRenderer elementProps={page.content}/>
}

type ContentRendererProps = {
    elementProps: ElementProps;
}



export {Stage}
