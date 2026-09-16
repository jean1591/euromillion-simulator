import { FAQ } from "@/utils/faq";

export const Faq = () => {
  return (
    <section aria-labelledby="faq">
      <h2 id="faq" className="text-2xl sm:text-3xl font-normal text-calypso-600">
        Questions fréquentes
      </h2>

      <dl className="mt-6 max-w-3xl space-y-6">
        {FAQ.map((entry) => (
          <div key={entry.question}>
            <dt className="text-base font-medium text-calypso-600">
              {entry.question}
            </dt>
            <dd className="mt-2 leading-7">{entry.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
