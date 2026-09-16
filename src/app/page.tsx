import { Faq } from "./components/content/faq";
import { Odds } from "./components/content/odds";
import { PrizeTable } from "./components/content/prizeTable";
import { Simulator } from "./components/simulator";
import { StructuredData } from "./components/content/structuredData";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-normal text-center text-calypso-600">
        Simulateur Euromillions
      </h1>

      <div className="flex items-center justify-center">
        <p className="mt-8 text-md sm:text-lg font-normal text-calypso-400 w-full sm:w-2/3 text-center leading-7">
          Visualisez vos parties d&apos;Euromillions, votre argent part vite,
          vos chances sont faibles 🥲
        </p>
      </div>

      <div className="mt-16">
        <Simulator />
      </div>

      <div className="mt-16">
        <PrizeTable />
      </div>

      <div className="mt-16">
        <Odds />
      </div>

      <div className="mt-16">
        <Faq />
      </div>

      <StructuredData />
    </div>
  );
}
