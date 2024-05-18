import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";
import { StoreProvider } from "@/lib/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulateur Euromillions - Jean Robertou",
  description: "Simulation de tirages d'Euromillions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr">
        <body className={inter.className}>
          <div className="bg-ship-cove-100/50 text-calypso-500 min-h-screen">
            <div className="pt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
              {children}
            </div>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
