import {create, StateCreator} from "zustand"
import type {Fns} from "../renderer/type"

type FunctionsStore = {
  fns: Fns,
  setFns: (fns: Fns) => void
}

const stateCreator: StateCreator<FunctionsStore> = (set) => ({
  fns: {},
  setFns: (fns: Fns) => set({fns})
})

const useGuthrieFns = create(
  stateCreator
)

export type {
  FunctionsStore
}

export {
  useGuthrieFns
}
