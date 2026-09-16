import { FAQ } from "@/utils/faq";
import { TICKET_PRICE } from "@/utils/prizeTiers";
import { siteUrl } from "@/lib/site";

// Emitted from the same data the page renders, so the markup never
// describes something a visitor cannot find on the page.
export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#simulateur`,
        name: "Simulateur Euromillions",
        url: `${siteUrl}/`,
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        inLanguage: "fr-FR",
        description: `Simulez des centaines de tirages Euromillions avec votre grille et comparez vos gains à votre mise de ${TICKET_PRICE} € par grille.`,
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "EUR",
        },
        author: {
          "@type": "Person",
          name: "Jean Robertou",
          url: "https://www.jeanrobertou.com",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: FAQ.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
