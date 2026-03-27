import type {DynamicElementProps} from "../renderer/type";
import {useGuthrieTemplateStore} from "../stores/templates";
import {Renderer} from "../renderer/renderer";
import { useInitialize } from "@ogs-gmbh/react-hooks";

type SlotTemplateProps = {
  refName: string,
  _children: DynamicElementProps[]
}

function SlotTemplate ({refName, _children }: SlotTemplateProps) {
  const addTemplate = useGuthrieTemplateStore((state)=> state.addTemplate)

  useInitialize(() => {
    if (refName)
      addTemplate(refName, _children);
  });

  // oxlint-disable-next-line react/jsx-no-useless-fragment
  return <></>
}

type TemplateRendererProps = {
  templateRef: string
}

function SlotTemplateRenderer ({templateRef}: TemplateRendererProps) {
  const templates = useGuthrieTemplateStore((state)=> state.templates[templateRef]);

  return templates?.map((dynamicElementProps, index) => <Renderer key={index} {...dynamicElementProps}/>)
}

export {
  SlotTemplate,
  SlotTemplateRenderer
}
