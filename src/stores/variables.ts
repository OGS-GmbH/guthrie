import { create } from "zustand";

type VariablesStore = {
  variables: Record<string, unknown>;
  addVariable: (name: string, value: unknown) => void;
}

const useGuthrieVariables = create<VariablesStore>((set) => ({
  variables: {},
  addVariable: (name: string, value: unknown) => set((state) => ({
    variables: {
      ...state.variables,
      [name]: value
    }
  }))
}))

export type {
  VariablesStore
}

export {
  useGuthrieVariables
}
