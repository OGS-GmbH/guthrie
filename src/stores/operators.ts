import { create } from "zustand"
import type { Operators } from "../renderer/type"
import { immer } from "zustand/middleware/immer"

type OperatorsStore = {
  operators: Operators,
  setOperators: (operators: Operators) => void
}

const useGuthrieOperators = create<OperatorsStore>()(
  immer((set) => ({
    operators: {},
    setOperators: (operators: Operators) => set({operators})
  }))
)

export type {
  OperatorsStore
}

export {
  useGuthrieOperators
}
