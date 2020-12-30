import { writable } from "svelte/store";
import type { DefaultStore } from "../types";

function createFormStore() {
  const defaultStore: DefaultStore = {
    lifeExpectancy: 75,
    dateOfBirth: "",
    collapsed: false,
  };

  const { subscribe, update } = writable(defaultStore);

  return {
    subscribe,
    setLifeExpectancy: (value: number) =>
      update((n) => {
        n.lifeExpectancy = value;

        return n;
      }),
    setDateOfBirth: (value: string) =>
      update((n) => {
        n.dateOfBirth = value;

        return n;
      }),
    setCollapsed: (value: boolean) =>
      update((n) => {
        n.collapsed = value;

        return n;
      }),
  };
}

export const formStore = createFormStore();
