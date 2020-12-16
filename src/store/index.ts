import { writable } from "svelte/store";
import { getAge } from "../helpers/dateHelper";
import type { FormModel } from "../types";

function createFormStore() {
  const defaultStore: FormModel = {
    lifeExpectancy: 75,
    dateOfBirth: "",
    age: null,
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
        n.age = getAge(value);

        return n;
      }),
  };
}

export const formStore = createFormStore();
