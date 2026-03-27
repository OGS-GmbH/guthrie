import { create, StateCreator } from "zustand";
import type {DynamicElementProps} from "../renderer/type.ts";
import { immer } from "zustand/middleware/immer";

type TemplateStore = {
  templates: Record<string, DynamicElementProps[]>
  addTemplate: (name: string, dynamicElementProps: DynamicElementProps[]) => void
}

const stateCreator: StateCreator<TemplateStore, [['zustand/immer', never]]> = 
    (set) => ({
      templates: {},
      addTemplate: (name, dynamicElementProps) => set(
        (state) => {
          state.templates[name] = dynamicElementProps
        }
      )
    }) 

const useGuthrieTemplateStore = create<TemplateStore>()(
  immer(
    stateCreator
  )
)

export {useGuthrieTemplateStore}
