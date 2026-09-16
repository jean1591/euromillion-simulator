import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";
import { classNames } from "@/utils/classNames";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

const title = "Simulateur Euromillions : testez vos numéros et vos gains";
const description =
  "Jouez votre grille sur des centaines de tirages Euromillions en quelques secondes. Mises, gains, taux de retour : voyez ce que jouer rapporte vraiment.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Simulateur Euromillions",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Simulateur Euromillions",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Jean Robertou", url: "https://www.jeanrobertou.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={classNames(inter.className, "bg-ship-cove-100/50 text-calypso-500")}>
        <div className="pt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          {children}
        </div>
      </body>
    </html>
  );
}
