import { create, StateCreator } from "zustand"
import type { Elements } from "../renderer/type"

type ElementsStore = {
  elements: Elements,
  setElements: (elements: Elements) => void
}

const stateCreator: StateCreator<ElementsStore> = (set) => ({
  elements: {},
  setElements: (elements: Elements) => set({elements})
})

const useGuthrieElements = create(
  stateCreator
);

export type {
  ElementsStore
}

export {
  useGuthrieElements
}
