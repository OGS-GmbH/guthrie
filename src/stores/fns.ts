import { create } from "zustand"
import type {Elements, Fns} from "../renderer/type"

type FunctionsStore = {
  fns: Fns,
  setFns: (fns: Fns) => void
}

const useGuthrieFns = create<FunctionsStore>((set) => ({
  fns: {},
  setFns: (fns: Fns) => set({fns})
}))

export type {
  FunctionsStore
}

export {
  useGuthrieFns
}
