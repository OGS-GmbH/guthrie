import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type VariablesStore = {
  variables: Record<string, unknown>;
  addVariable: (name: string, value: unknown) => void;
}

const useGuthrieVariables = create<VariablesStore>()(
  immer((set) => ({
    variables: {},
    addVariable: (name: string, value: unknown) => set(
      (state) => {
        state.variables[name] = value
      }
    )
  })
))

export type {
  VariablesStore
}

export {
  useGuthrieVariables
}
