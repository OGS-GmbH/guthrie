import { create, StateCreator } from "zustand"
import type { Operators } from "../renderer/type"

type OperatorsStore = {
  operators: Operators,
  setOperators: (operators: Operators) => void
}

const stateCreator: StateCreator<OperatorsStore> = (set) => ({
  operators: {},
  setOperators: (operators: Operators) => set({operators})
})

const useGuthrieOperators = create(
  stateCreator
)

export type {
  OperatorsStore
}

export {
  useGuthrieOperators
}
