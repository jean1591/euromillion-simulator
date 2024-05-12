import "./globals.css";

import { Inter } from "next/font/google";
import { StoreProvider } from "@/lib/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr">
        <body className={inter.className}>
          <div className="bg-dark-shade/10 text-dark-shade min-h-screen">
            <div className="pt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
              {children}
            </div>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
