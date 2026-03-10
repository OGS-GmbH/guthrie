import {create} from "zustand";

type EventsStore = {
  events: Record<string, {
    target: HTMLElement | Window,
    listener: Function
  }>,
  addEvent: (name: string, target: HTMLElement | Window, listener: Function) => void
}

const useGuthrieEventsStore = create<EventsStore>((set)=> ({
  events: {},
  addEvent: (name: string, target: HTMLElement | Window, listener: Function) => set((state) => ({
    events: {
      ...state.events,
      [name]: {target, listener}
    }
  }))
}));

type EventsConfigStore = {
  config: {autoApply: boolean};
  setConfig: (config: {autoApply: boolean}) => void
}

const useGuthrieEventsConfigStore = create<EventsConfigStore>((set) => ({
  config: {autoApply: true},
  setConfig: (config: {autoApply: boolean}) => set({config})
}))


export {
  useGuthrieEventsStore,
  useGuthrieEventsConfigStore
}
