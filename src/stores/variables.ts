"use client";

import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";
import { Variables } from "../renderer/type.js";

/**
 * Store for managing runtime variables.
 *
 * Variables are dynamically created and updated during execution
 * (e.g. via functions, events, or operations) and can be accessed
 * throughout the runtime.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type VariablesStore = {
  variables: Variables;
  addVariable: (name: string, value: unknown) => void;
};

const stateCreator: StateCreator<VariablesStore> = (set) => ({
  variables: {},
  addVariable: (name: string, value: unknown) =>
    set((state) => ({
      variables: {
        ...state.variables,
        [name]: value
      }
    }))
});

/**
 * Zustand store for accessing and managing variables.
 *
 * @remarks
 * Used by:
 * - {@link callFn} for variable assignment (`as`)
 * - property resolution and condition evaluation
 * - dynamic value access throughout the runtime
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieVariables: UseBoundStore<StoreApi<VariablesStore>> = create(stateCreator);

export type { VariablesStore };

export { useGuthrieVariables };
