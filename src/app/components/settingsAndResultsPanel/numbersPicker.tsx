import {
  BASE_NUMBERS_COUNT,
  HIGHEST_BASE_NUMBER,
  HIGHEST_STAR_NUMBER,
  STAR_NUMBERS_COUNT,
  baseNumbersOf,
  range,
  starNumbersOf,
} from "@/utils/euromillions";

import { classNames } from "@/utils/classNames";
import { useState } from "react";

interface Props {
  myNumbers: number[];
  onCancel: () => void;
  onConfirm: (myNumbers: number[]) => void;
}

export const NumbersPicker = ({ myNumbers, onCancel, onConfirm }: Props) => {
  const [baseNumbers, setBaseNumbers] = useState(baseNumbersOf(myNumbers));
  const [starNumbers, setStarNumbers] = useState(starNumbersOf(myNumbers));

  const isComplete =
    baseNumbers.length === BASE_NUMBERS_COUNT &&
    starNumbers.length === STAR_NUMBERS_COUNT;

  const toggle = (
    selected: number[],
    setSelected: (numbers: number[]) => void,
    limit: number
  ) => {
    return (number: number) => {
      if (selected.includes(number)) {
        setSelected(selected.filter((selection) => selection !== number));
        return;
      }

      if (selected.length < limit) {
        setSelected([...selected, number].sort((a, b) => a - b));
      }
    };
  };

  return (
    <div className="mt-4 rounded-md border border-ship-cove-200 bg-ship-cove-100/40 p-4">
      <NumbersGrid
        legend="Numéros"
        highest={HIGHEST_BASE_NUMBER}
        limit={BASE_NUMBERS_COUNT}
        selected={baseNumbers}
        onToggle={toggle(baseNumbers, setBaseNumbers, BASE_NUMBERS_COUNT)}
      />

      <div className="mt-4">
        <NumbersGrid
          legend="Étoiles"
          highest={HIGHEST_STAR_NUMBER}
          limit={STAR_NUMBERS_COUNT}
          selected={starNumbers}
          onToggle={toggle(starNumbers, setStarNumbers, STAR_NUMBERS_COUNT)}
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-medium text-calypso-500 hover:bg-ship-cove-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
        >
          Annuler
        </button>

        <button
          type="button"
          disabled={!isComplete}
          onClick={() => onConfirm([...baseNumbers, ...starNumbers])}
          className="rounded-md bg-calypso-500 px-4 py-2 text-sm font-medium text-light-shade shadow-sm hover:bg-calypso-600 disabled:cursor-not-allowed disabled:bg-ship-cove-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

const NumbersGrid = ({
  legend,
  highest,
  limit,
  selected,
  onToggle,
}: {
  legend: string;
  highest: number;
  limit: number;
  selected: number[];
  onToggle: (number: number) => void;
}) => {
  const isFull = selected.length === limit;

  return (
    <fieldset>
      <legend className="flex w-full items-baseline justify-between pb-2 text-sm font-medium">
        <span>{legend}</span>
        <span
          className={classNames(
            isFull ? "text-calypso-500" : "text-ship-cove-600",
            "text-xs tabular-nums"
          )}
        >
          {selected.length}/{limit}
        </span>
      </legend>

      <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
        {range(highest).map((number) => {
          const isSelected = selected.includes(number);

          return (
            <button
              key={number}
              type="button"
              aria-pressed={isSelected}
              disabled={isFull && !isSelected}
              onClick={() => onToggle(number)}
              className={classNames(
                isSelected
                  ? "border-calypso-500 bg-calypso-500 font-semibold text-light-shade"
                  : "border-ship-cove-200 bg-light-shade hover:border-ship-cove-400 disabled:opacity-40 disabled:hover:border-ship-cove-200",
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs tabular-nums transition-colors disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
              )}
            >
              {number}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
