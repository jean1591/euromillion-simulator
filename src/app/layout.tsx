import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="bg-light-shade text-dark-shade min-h-screen">
          <div className="pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
