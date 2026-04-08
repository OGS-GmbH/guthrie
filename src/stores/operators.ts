import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";
import type { Operators } from "../renderer/type";

/**
 * Store for managing the operator registry.
 *
 * Holds all available operators used to evaluate operations.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type OperatorsStore = {
  operators: Operators;
  setOperators: (operators: Operators) => void;
};

const stateCreator: StateCreator<OperatorsStore> = (set) => ({
  operators: {},
  setOperators: (operators: Operators) => set({ operators })
});

/**
 * Zustand store for accessing and updating operators.
 *
 * @remarks
 * Used by {@link solveOperation} to resolve and execute operators by name.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieOperators: UseBoundStore<StoreApi<OperatorsStore>> = create(stateCreator);

export type { OperatorsStore };

export { useGuthrieOperators };
