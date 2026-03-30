import { EventConfig } from "src/renderer/type";
import { StateCreator, create, StoreApi, UseBoundStore } from "zustand";

type EventsConfigStore = {
  config: EventConfig;
  setConfig: (config: EventConfig) => void
}

const stateCreator: StateCreator<EventsConfigStore> = (set) => ({
  config: {
    autoApply: true
  },
  setConfig: (config: EventConfig) => set({config})
})

const useGuthrieEventsConfig: UseBoundStore<StoreApi<EventsConfigStore>> = create(stateCreator);

export {
  useGuthrieEventsConfig
}
