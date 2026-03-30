import { create, StateCreator, StoreApi, type UseBoundStore } from "zustand"
import type { Elements } from "../renderer/type"

type ElementsStore = {
  elements: Elements,
  setElements: (elements: Elements) => void
}

const stateCreator: StateCreator<ElementsStore> = (set) => ({
  elements: {},
  setElements: (elements: Elements) => set({elements})
})

const useGuthrieElements: UseBoundStore<StoreApi<ElementsStore>> = create(
  stateCreator
);

export type {
  ElementsStore
}

export {
  useGuthrieElements
}
