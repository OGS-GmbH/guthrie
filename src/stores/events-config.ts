import { EventConfig } from "src/renderer/type";
import { StateCreator, create, StoreApi, UseBoundStore } from "zustand";

/**
 * Store for managing event system configuration.
 *
 * Controls global behavior of event handling within the runtime.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
type EventsConfigStore = {
  config: EventConfig;
  setConfig: (config: EventConfig) => void;
};

const stateCreator: StateCreator<EventsConfigStore> = (set) => ({
  config: {
    autoApply: true
  },
  setConfig: (config: EventConfig) => set({ config })
});

/**
 * Zustand store for accessing and updating event configuration.
 *
 * @remarks
 * Used to control whether events are automatically attached during rendering.
 *
 * @since 1.0.0
 * @category Stores
 * @author Simon Kovtyk
 */
const useGuthrieEventsConfig: UseBoundStore<StoreApi<EventsConfigStore>> = create(stateCreator);

export type { EventsConfigStore };

export { useGuthrieEventsConfig };
