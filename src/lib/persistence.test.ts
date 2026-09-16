import { PERSIST_KEY, SimulationStatus, useSimulationStore } from "./store";
import { beforeEach, describe, expect, it } from "vitest";

const memoryStorage = () => {
  const entries = new Map<string, string>();

  return {
    get length() {
      return entries.size;
    },
    clear: () => entries.clear(),
    getItem: (key: string) => entries.get(key) ?? null,
    key: (index: number) => [...entries.keys()][index] ?? null,
    removeItem: (key: string) => {
      entries.delete(key);
    },
    setItem: (key: string, value: string) => {
      entries.set(key, value);
    },
  };
};

const persistedState = () =>
  JSON.parse(window.localStorage.getItem(PERSIST_KEY) ?? "{}").state;

describe("persistence", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: memoryStorage() },
    });
  });

  it("writes the simulation to storage as it changes", () => {
    useSimulationStore.getState().setNumberOfWeeksToPlay(80);

    expect(persistedState().numberOfWeeksToPlay).toBe(80);
    expect(persistedState().numberOfDraws).toBe(160);
  });

  it("leaves simulationStatus out, a run must not resume by itself", () => {
    useSimulationStore.getState().setSimulationStatus(SimulationStatus.Running);

    expect(persistedState()).not.toHaveProperty("simulationStatus");
  });

  it("restores what was stored", async () => {
    useSimulationStore.getState().setMyNumbers([8, 16, 24, 32, 40, 4, 8]);
    useSimulationStore.getState().setSpeed(100);
    const lastVisit = window.localStorage.getItem(PERSIST_KEY) ?? "";

    // A fresh visit: the store starts from its defaults and storage still
    // holds what the previous visit left. Every write goes through the
    // middleware, so the stored value has to be put back by hand.
    useSimulationStore.setState({ myNumbers: [1, 2, 3, 4, 5, 1, 2], speed: 1 });
    window.localStorage.setItem(PERSIST_KEY, lastVisit);

    // Rehydration is asynchronous even over synchronous storage, which is
    // why useRestoreSimulation waits on it before touching the store.
    await useSimulationStore.persist.rehydrate();

    expect(useSimulationStore.getState().myNumbers).toEqual([
      8, 16, 24, 32, 40, 4, 8,
    ]);
    expect(useSimulationStore.getState().speed).toBe(100);
  });

  it("degrades to a no-op when site data is blocked", async () => {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        get localStorage(): Storage {
          throw new Error("site data blocked");
        },
      },
    });

    expect(() => useSimulationStore.getState().setSpeed(10)).not.toThrow();
    await expect(useSimulationStore.persist.rehydrate()).resolves.not.toThrow();
    expect(useSimulationStore.getState().speed).toBe(10);
  });
});
