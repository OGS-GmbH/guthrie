import { create } from "zustand"
import type { Elements } from "../renderer/type"

type ElementsStore = {
  elements: Elements,
  setElements: (elements: Elements) => void
}

const useGuthrieElements = create<ElementsStore>((set) => ({
  elements: {},
  setElements: (elements: Elements) => set({elements})
}))

export type {
  ElementsStore
}

export {
  useGuthrieElements
}
