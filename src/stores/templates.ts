import { create, StateCreator } from "zustand";
import type {DynamicElementProps} from "../renderer/type.ts";

type TemplateStore = {
  templates: Record<string, DynamicElementProps[]>
  addTemplate: (name: string, dynamicElementProps: DynamicElementProps[]) => void
}

const stateCreator: StateCreator<TemplateStore> = (set) => ({
  templates: {},
  addTemplate: (name, dynamicElementProps) => set(
    (state) => ({
      templates: {
        ...state.templates,
        [name]: dynamicElementProps
      }
    })
  )
}) 

const useGuthrieTemplateStore = create(
  stateCreator
)

export {useGuthrieTemplateStore}
