import { create } from "zustand"
import type { Elements } from "../renderer/type"
import { immer } from "zustand/middleware/immer"

type ElementsStore = {
  elements: Elements,
  setElements: (elements: Elements) => void
}

const useGuthrieElements = create<ElementsStore>()(
  immer((set) => ({
    elements: {},
    setElements: (elements: Elements) => set({elements})
  }))
);

export type {
  ElementsStore
}

export {
  useGuthrieElements
}
