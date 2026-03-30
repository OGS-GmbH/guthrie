import {create, StateCreator, StoreApi, UseBoundStore} from "zustand"
import type {Fns} from "../renderer/type"

type FunctionsStore = {
  fns: Fns,
  setFns: (fns: Fns) => void
}

const stateCreator: StateCreator<FunctionsStore> = (set) => ({
  fns: {},
  setFns: (fns: Fns) => set({fns})
})

const useGuthrieFns: UseBoundStore<StoreApi<FunctionsStore>> = create(
  stateCreator
)

export type {
  FunctionsStore
}

export {
  useGuthrieFns
}
