import { MAX_RECENT_WINNING_DRAWS, SimulationStatus, useSimulationStore } from "./store";
import { beforeEach, describe, expect, it, vi } from "vitest";

const JACKPOT_DRAW = [1, 2, 3, 4, 5, 1, 2];
const JACKPOT = 17000000;

// A fixed draw makes every aggregate exact: each draw pays the jackpot,
// so counts and sums can be asserted rather than approximated.
vi.mock("@/utils/generateDraw", () => ({
  generateDraw: () => [...JACKPOT_DRAW],
}));

const initialState = useSimulationStore.getState();

describe("runDraws", () => {
  beforeEach(() => {
    useSimulationStore.setState({
      ...initialState,
      myNumbers: [...JACKPOT_DRAW],
      drawsNumber: 0,
      recentWinningDraws: [],
      winningDrawsCount: 0,
      winnings: 0,
      biggestWin: 0,
      numberOfDraws: 1000,
    });
  });

  it("aggregates the draws it resolves", () => {
    useSimulationStore.getState().runDraws(3);

    const { drawsNumber, winningDrawsCount, winnings, biggestWin } =
      useSimulationStore.getState();

    expect(drawsNumber).toBe(3);
    expect(winningDrawsCount).toBe(3);
    expect(winnings).toBe(3 * JACKPOT);
    expect(biggestWin).toBe(JACKPOT);
  });

  it("never runs past the number of draws asked for", () => {
    useSimulationStore.setState({ numberOfDraws: 5 });

    useSimulationStore.getState().runDraws(100);

    expect(useSimulationStore.getState().drawsNumber).toBe(5);
  });

  it("does nothing once every draw has been resolved", () => {
    useSimulationStore.setState({ numberOfDraws: 2 });

    useSimulationStore.getState().runDraws(2);
    useSimulationStore.getState().runDraws(2);

    expect(useSimulationStore.getState().drawsNumber).toBe(2);
    expect(useSimulationStore.getState().winningDrawsCount).toBe(2);
  });

  it("keeps the most recent winning draws first, without dropping the count", () => {
    const drawsToRun = MAX_RECENT_WINNING_DRAWS + 50;

    useSimulationStore.getState().runDraws(drawsToRun);

    const { recentWinningDraws, winningDrawsCount } =
      useSimulationStore.getState();

    expect(winningDrawsCount).toBe(drawsToRun);
    expect(recentWinningDraws).toHaveLength(MAX_RECENT_WINNING_DRAWS);
    expect(recentWinningDraws[0].id).toBe(drawsToRun);
    expect(recentWinningDraws.at(-1)?.id).toBe(
      drawsToRun - MAX_RECENT_WINNING_DRAWS + 1
    );
  });

  it("gives every winning draw a unique id across batches", () => {
    useSimulationStore.getState().runDraws(10);
    useSimulationStore.getState().runDraws(10);

    const ids = useSimulationStore
      .getState()
      .recentWinningDraws.map((winningDraw) => winningDraw.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([...ids].sort((a, b) => b - a));
  });
});

describe("skipToEnd", () => {
  it("resolves the remaining draws and stops the simulation", () => {
    useSimulationStore.setState({
      ...initialState,
      myNumbers: [...JACKPOT_DRAW],
      drawsNumber: 0,
      recentWinningDraws: [],
      winningDrawsCount: 0,
      winnings: 0,
      biggestWin: 0,
      numberOfDraws: 40,
      simulationStatus: SimulationStatus.Running,
    });

    useSimulationStore.getState().runDraws(10);
    useSimulationStore.getState().skipToEnd();

    expect(useSimulationStore.getState().drawsNumber).toBe(40);
    expect(useSimulationStore.getState().simulationStatus).toBe(
      SimulationStatus.Idle
    );
  });
});
