import {create} from "zustand"
import type {Fns} from "../renderer/type"
import { immer } from "zustand/middleware/immer"

type FunctionsStore = {
  fns: Fns,
  setFns: (fns: Fns) => void
}

const useGuthrieFns = create<FunctionsStore>()(
  immer((set) => ({
    fns: {},
    setFns: (fns: Fns) => set({fns})
  }))
)

export type {
  FunctionsStore
}

export {
  useGuthrieFns
}
