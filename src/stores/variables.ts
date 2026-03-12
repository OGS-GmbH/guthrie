import { produce } from "immer";
import { create } from "zustand";

type VariablesStore = {
  variables: Record<string, unknown>;
  addVariable: (name: string, value: unknown) => void;
}

const useGuthrieVariables = create<VariablesStore>((set) => ({
  variables: {},
  addVariable: (name: string, value: unknown) => set(
    produce((state) => {
      state.variables[name] = value;
    })
  )
}))

export type {
  VariablesStore
}

export {
  useGuthrieVariables
}
