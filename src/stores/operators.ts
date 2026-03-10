import { create } from "zustand"
import type { Operators } from "../renderer/type"

type OperatorsStore = {
  operators: Operators,
  setOperators: (operators: Operators) => void
}

const useGuthrieOperators = create<OperatorsStore>((set) => ({
  operators: {},
  setOperators: (operators: Operators) => set({operators})
}))

export type {
  OperatorsStore
}

export {
  useGuthrieOperators
}
