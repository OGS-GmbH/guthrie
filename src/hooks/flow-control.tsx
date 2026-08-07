import {Renderer, useRendererProps} from "../renderer/renderer.js";
import {ScopedVariables} from "../components/scoped-variables.js";
import {ElementDeclaration} from "../types/element.js";
import {ForProps} from "../components/for.js";
import {ForEachProps} from "../components/foreach.js";
import {touchByAccessSync} from "../renderer/variables.js";

type ForEachDeclaration = Omit<ElementDeclaration, "element" | "rawProperties"> & {
  element: "for-each";
  rawProperties: ForEachProps;
};

type ForDeclaration = Omit<ElementDeclaration, "element" | "rawProperties"> & {
  element: "for";
  rawProperties: ForProps;
};

type FlowControlDeclaration =
  | ForEachDeclaration
  | ForDeclaration

function useFlowControlElements(flowControlDeclarations: FlowControlDeclaration[]) {
  const resolveProps = useRendererProps();

  const elements = (flowControlDeclarations)
    ?.map((declaration: FlowControlDeclaration, childIndex) => {
      const flowControlChildDefinition = declaration.children?.[0];

      const {Element, ...itemProps} = resolveProps(flowControlChildDefinition ?? declaration);

      if (!Element)
        return;

      switch (declaration.element) {
        case "for-each": {
          const as = declaration.rawProperties?.as;
          const scopedVariables: Record<string, unknown> = {};
          const items = declaration.rawProperties?.items;

          return items?.map((item: unknown, itemIndex: number) => {
            flowControlChildDefinition?.properties &&
            Object.entries(flowControlChildDefinition.properties).forEach(([prop, value]) => {
              if (value.type === "var" && value.name === as) {
                scopedVariables[prop] = value.access
                  ? touchByAccessSync(item, value.access)
                  : item;
              }
            });

            const childrenToRender = flowControlChildDefinition?.children?.map((child, index) => (
              <ScopedVariables key={index} as={as} value={items[itemIndex]}>
                <Renderer {...child} ref={child?.ref}/>
              </ScopedVariables>
            ));

            return (
              <Element
                key={itemIndex}
                ref={itemProps.ref}
                {...scopedVariables}
                {...flowControlChildDefinition?.rawProperties}>
                {childrenToRender}
              </Element>
            );
          });
        }
        case "for": {
          const as = declaration.rawProperties?.as;
          const scopedVariables: Record<string, unknown> = {};
          const count = declaration.rawProperties?.count;

          return new Array(count).fill(null).map((_: unknown, itemIndex: number) => {
            flowControlChildDefinition?.properties &&
            Object.entries(flowControlChildDefinition.properties).forEach(([prop, value]) => {
              if (value.type === "var" && value.name === as)
                scopedVariables[prop] = itemIndex
            });

            const childrenToRender = flowControlChildDefinition?.children?.map((child, index) => (
              <ScopedVariables key={index} as={as} value={itemIndex}>
                <Renderer {...child} ref={child?.ref}/>
              </ScopedVariables>
            ));

            return (
              <Element
                key={itemIndex}
                ref={itemProps.ref}
                {...scopedVariables}
                {...flowControlChildDefinition?.rawProperties}>
                {childrenToRender}
              </Element>
            );
          });
        }
        default: {
          const {renderedChildren: _, ...rest} = itemProps;
          const childrenToRender = (declaration as ElementDeclaration).children?.map((child, index) => (
            <Renderer key={index} {...child} ref={child?.ref}/>
          ));

          return (
            <Element
              key={childIndex}
              {...rest.props}
              ref={itemProps.ref}
            >
              {childrenToRender}
            </Element>
          );
        }
      }
    })
    .flat().filter(Boolean);

  return elements?.length > 0 ? elements : undefined;
}

export type { FlowControlDeclaration };
export {useFlowControlElements}
