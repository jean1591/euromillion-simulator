import {
  ODDS_AGAINST_ANY_PRIZE,
  TICKET_PRICE,
  TOTAL_COMBINATIONS,
  oddsAgainst,
  winningsFor,
} from "./prizeTiers";
import { formatEuros, formatNumber } from "./format";

export interface FaqEntry {
  question: string;
  answer: string;
}

// Plain strings rather than JSX: the same text feeds the page and the
// FAQPage structured data, so the two cannot drift apart.
export const FAQ: FaqEntry[] = [
  {
    question: "Comment fonctionne ce simulateur Euromillions ?",
    answer: `Vous choisissez une grille de 5 numéros et 2 étoiles, une durée en semaines et un nombre de tirages par semaine. Le simulateur tire ensuite autant de grilles au hasard, compare chacune à la vôtre et additionne les gains. Vous voyez en continu ce que vous auriez dépensé, ce que vous auriez gagné et la différence entre les deux.`,
  },
  {
    question: "Quelles sont les chances de gagner à l'Euromillions ?",
    answer: `Une grille a ${formatNumber(
      TOTAL_COMBINATIONS
    )} résultats possibles, donc 1 chance sur ${formatNumber(
      oddsAgainst(5, 2)
    )} de décrocher le jackpot. Gagner quelque chose, tous rangs confondus, arrive environ 1 fois sur ${Math.round(
      ODDS_AGAINST_ANY_PRIZE
    )}, le plus souvent pour un montant inférieur au prix de la grille.`,
  },
  {
    question: "Combien coûte une grille Euromillions ?",
    answer: `Une grille simple coûte ${formatEuros(
      TICKET_PRICE
    )}. À deux tirages par semaine, jouer une grille par tirage revient à ${formatEuros(
      TICKET_PRICE * 104
    )} par an, ce que le simulateur affiche dans la case « Total dépensé ».`,
  },
  {
    question: "Combien rapportent 2 bons numéros à l'Euromillions ?",
    answer: `Deux bons numéros sans étoile rapportent en moyenne ${formatEuros(
      winningsFor(2, 0)
    )}, pour une grille à ${formatEuros(
      TICKET_PRICE
    )}. C'est le rang le plus accessible et il arrive environ 1 fois sur ${Math.round(
      oddsAgainst(2, 0)
    )} : il ne couvre pas la mise.`,
  },
  {
    question: "Peut-on augmenter ses chances en choisissant ses numéros ?",
    answer: `Non. Chaque combinaison a exactement la même probabilité de sortir, qu'elle soit « 1 2 3 4 5 » ou n'importe quelle autre. Choisir des numéros peu joués ne change pas vos chances de gagner, seulement le nombre de personnes avec qui vous partageriez la cagnotte. Vous pouvez le vérifier ici : lancez deux simulations avec des grilles différentes, les résultats se ressemblent.`,
  },
  {
    question: "Les gains affichés sont-ils les vrais gains ?",
    answer: `Les probabilités sont exactes, elles se déduisent du nombre de combinaisons. Les montants, eux, sont des moyennes constatées. Un gain réel dépend de la cagnotte du tirage et du nombre de gagnants qui se la partagent, il n'est donc jamais fixe d'un tirage à l'autre.`,
  },
];
