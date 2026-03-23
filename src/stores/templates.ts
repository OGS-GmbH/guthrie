import {create} from "zustand";
import type {DynamicElementProps} from "../renderer/type.ts";
import { immer } from "zustand/middleware/immer";

type TemplateStore = {
  templates: Record<string, DynamicElementProps[]>
  addTemplate: (name: string, dynamicElementProps: DynamicElementProps[]) => void
}

const useGuthrieTemplateStore = create<TemplateStore>()(
  immer((set) => ({
    templates: {},
    addTemplate: (name, dynamicElementProps) => set((state) => ({
      templates: {
        ...state.templates,
        [name]: dynamicElementProps
      }
    }))
  }))
)

export {useGuthrieTemplateStore}
