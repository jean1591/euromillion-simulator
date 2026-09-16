import { PRIZE_TIERS, TICKET_PRICE } from "@/utils/prizeTiers";
import { formatEuros, formatNumber } from "@/utils/format";

export const PrizeTable = () => {
  return (
    <section aria-labelledby="rangs-de-gains">
      <h2
        id="rangs-de-gains"
        className="text-2xl sm:text-3xl font-normal text-calypso-600"
      >
        Les {PRIZE_TIERS.length} rangs de gains de l&apos;Euromillions
      </h2>

      <p className="mt-4 max-w-3xl leading-7">
        Une grille coûte {formatEuros(TICKET_PRICE)} et vous fait cocher 5
        numéros sur 50 et 2 étoiles sur 12. Selon le nombre de bons numéros et
        de bonnes étoiles, votre grille tombe dans l&apos;un des rangs
        ci-dessous. Les montants sont des gains moyens constatés : un rang
        n&apos;a pas de gain fixe, il partage une part de la cagnotte entre
        tous les gagnants du rang.
      </p>

      <div className="mt-6 overflow-x-auto rounded-md border border-ship-cove-200 bg-light-shade shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Gain moyen et probabilité de chaque rang de l&apos;Euromillions
          </caption>

          <thead>
            <tr className="border-b border-ship-cove-200 text-xs uppercase text-ship-cove-600">
              <th scope="col" className="px-4 py-3 font-medium">
                Rang
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Bons numéros
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Gain moyen
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Probabilité
              </th>
            </tr>
          </thead>

          <tbody>
            {PRIZE_TIERS.map((tier) => (
              <tr
                key={tier.rank}
                className="border-b border-ship-cove-100 last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-4 py-3 font-medium tabular-nums text-ship-cove-600"
                >
                  {tier.rank}
                </th>
                <td className="px-4 py-3 tabular-nums">
                  {tier.matchedNumbers} numéro
                  {tier.matchedNumbers > 1 ? "s" : ""}
                  {tier.matchedStars > 0
                    ? ` + ${tier.matchedStars} étoile${
                        tier.matchedStars > 1 ? "s" : ""
                      }`
                    : ""}
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">
                  {formatEuros(tier.averageWinnings)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-ship-cove-600">
                  1 sur {formatNumber(Math.round(tier.oddsAgainst))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
