import { writable } from "svelte/store";
import type { FormModel } from "./types";

function createFormStore() {
  const defaultStore: FormModel = {
    lifeExpectancy: 75,
    dateOfBirth: "",
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
  };
}

export const formStore = createFormStore();
