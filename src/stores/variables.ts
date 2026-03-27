import { create, StateCreator } from "zustand";

type VariablesStore = {
  variables: Record<string, unknown>;
  addVariable: (name: string, value: unknown) => void;
}

const stateCreator: StateCreator<VariablesStore> = (set) => ({
  variables: {},
  addVariable: (name: string, value: unknown) => set(
    (state) => ({
      variables: {
        ...state.variables,
        [name]: value
      }
    })
  )
})

const useGuthrieVariables = create(
  stateCreator
);

export type {
  VariablesStore
}

export {
  useGuthrieVariables
}
