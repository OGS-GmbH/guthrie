import {create, StateCreator, StoreApi, UseBoundStore} from "zustand"
import type {Fns} from "../renderer/type"

/**
 * Store for managing the function registry.
 *
 * Holds all available functions that can be executed via {@link callFn}.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type FunctionsStore = {
  fns: Fns,
  setFns: (fns: Fns) => void
}

const stateCreator: StateCreator<FunctionsStore> = (set) => ({
  fns: {},
  setFns: (fns: Fns) => set({fns})
})

/**
 * Zustand store for accessing and updating available functions.
 *
 * @remarks
 * Used by {@link callFn} to resolve and execute functions by name.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieFns: UseBoundStore<StoreApi<FunctionsStore>> = create(
  stateCreator
)

export type {
  FunctionsStore
}

export {
  useGuthrieFns
}
