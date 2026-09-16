import {
  BASE_NUMBERS_COUNT,
  HIGHEST_BASE_NUMBER,
  HIGHEST_STAR_NUMBER,
  STAR_NUMBERS_COUNT,
} from "@/utils/euromillions";
import {
  ODDS_AGAINST_ANY_PRIZE,
  PRIZE_TIERS,
  TICKET_PRICE,
  TOTAL_COMBINATIONS,
  combinations,
  oddsAgainst,
} from "@/utils/prizeTiers";
import { formatEuros, formatNumber } from "@/utils/format";

const jackpotOdds = oddsAgainst(5, 2);
const smallestPrize = PRIZE_TIERS[PRIZE_TIERS.length - 1];
const smallestPrizeOdds = Math.round(
  oddsAgainst(smallestPrize.matchedNumbers, smallestPrize.matchedStars)
);

const numberCombinations = combinations(
  HIGHEST_BASE_NUMBER,
  BASE_NUMBERS_COUNT
);
const starCombinations = combinations(HIGHEST_STAR_NUMBER, STAR_NUMBERS_COUNT);

// Two draws a week, the current French schedule.
const DRAWS_PER_YEAR = 104;
const yearsOfDrawsForEveryCombination = Math.round(
  jackpotOdds / DRAWS_PER_YEAR
);

export const Odds = () => {
  return (
    <section aria-labelledby="probabilites">
      <h2
        id="probabilites"
        className="text-2xl sm:text-3xl font-normal text-calypso-600"
      >
        Quelles sont vos chances de gagner ?
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Figure
          value={`1 sur ${formatNumber(jackpotOdds)}`}
          label="Décrocher le jackpot avec une grille"
        />
        <Figure
          value={`1 sur ${Math.round(ODDS_AGAINST_ANY_PRIZE)}`}
          label="Gagner quelque chose, ne serait-ce que quelques euros"
        />
        <Figure
          value={`${formatNumber(yearsOfDrawsForEveryCombination)} ans`}
          label="À deux tirages par semaine, pour jouer autant de tirages qu'il existe de combinaisons"
        />
      </div>

      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        <p>
          Une grille d&apos;Euromillions a {formatNumber(TOTAL_COMBINATIONS)}{" "}
          résultats possibles : les {formatNumber(numberCombinations)} façons de
          tirer {BASE_NUMBERS_COUNT} numéros sur {HIGHEST_BASE_NUMBER},
          multipliées par les {starCombinations} façons de tirer{" "}
          {STAR_NUMBERS_COUNT} étoiles sur {HIGHEST_STAR_NUMBER}. Une seule
          d&apos;entre elles est la vôtre.
        </p>

        <p>
          Le rang le plus accessible reste modeste :{" "}
          {smallestPrize.matchedNumbers} bons numéros rapportent en moyenne{" "}
          {formatEuros(smallestPrize.averageWinnings)}, soit moins que les{" "}
          {formatEuros(TICKET_PRICE)} de la grille, et cela n&apos;arrive
          qu&apos;une fois sur {smallestPrizeOdds}. C&apos;est tout le propos du
          simulateur ci-dessus : au lieu de lire ces probabilités, vous les
          jouez sur des centaines de tirages et vous regardez le total dépensé
          s&apos;éloigner du total gagné.
        </p>

        <p>
          Ces probabilités sont exactes et recalculées à chaque affichage : elles
          viennent du dénombrement des combinaisons, pas d&apos;une estimation.
          Les montants, eux, sont des moyennes. Un gain réel dépend de la
          cagnotte du soir et du nombre de gagnants qui la partagent.
        </p>
      </div>
    </section>
  );
};

const Figure = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="rounded-md border border-ship-cove-200 bg-light-shade p-5 shadow-sm">
      <p className="text-2xl font-semibold tabular-nums text-calypso-600">
        {value}
      </p>
      <p className="mt-2 text-sm text-ship-cove-600">{label}</p>
    </div>
  );
};
