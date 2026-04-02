import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";
import type {DynamicElementProps} from "../renderer/type.ts";

/**
 * Store for managing reusable templates.
 *
 * Templates are collections of {@link DynamicElementProps} that can be
 * registered and later rendered via template references.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
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

/**
 * Zustand store for accessing and managing templates.
 *
 * @remarks
 * Used by template components (e.g. {@link SlotTemplate}, {@link SlotTemplateRenderer})
 * to register and render reusable element structures.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieTemplateStore: UseBoundStore<StoreApi<TemplateStore>> = create(
  stateCreator
)

export type {
  TemplateStore
}

export {
  useGuthrieTemplateStore
}
