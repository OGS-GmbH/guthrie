import {create} from "zustand"
import type {Fns} from "../renderer/type"
import {fnStoreHack} from "../options/fns.ts";

type FunctionsStore = {
  getFn: (name: string) => Function,
  setFns: (fns: Fns) => void
}

const useGuthrieFns = create<FunctionsStore>(() => ({
  getFn: (name: string) => fnStoreHack.get(name),
  setFns: (fns: Fns) => Object.entries(fns).forEach(([key, value]) => {
    fnStoreHack.set(key, value)
  })
}))

export type {
  FunctionsStore
}

export {
  useGuthrieFns
}
