import { writable } from "svelte/store";

function createFormStore() {
  const defaultStore = {
    lifeExpectancy: 75,
    dateOfBirth: "",
    collapsed: false,
  };

  const { subscribe, update } = writable(defaultStore);

  return {
    subscribe,
    setLifeExpectancy: (value) =>
      update((n) => {
        n.lifeExpectancy = value;

        return n;
      }),
    setDateOfBirth: (value) =>
      update((n) => {
        n.dateOfBirth = value;

        return n;
      }),
    setCollapsed: (value) =>
      update((n) => {
        n.collapsed = value;

        return n;
      }),
  };
}

export const formStore = createFormStore();
