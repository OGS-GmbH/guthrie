import { EventConfig } from "src/renderer/type";
import { StateCreator, create } from "zustand";

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

const useGuthrieEventsConfig = create(stateCreator);

export {
  useGuthrieEventsConfig
}
