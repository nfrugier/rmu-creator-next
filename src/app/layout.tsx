import "./globals.css";
import { Lora, Uncial_Antiqua } from "next/font/google";

const bodyFont = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const titleFont = Uncial_Antiqua({ subsets: ["latin"], weight: "400", variable: "--font-title" });

export const metadata = {
  title: "Création de personnage RMU",
  description: "Assistant de création pour Rolemaster Unified",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${titleFont.variable}`}>
      <body className={`${bodyFont.className} text-gray-900`}>
        <div className="min-h-screen flex justify-center items-start py-10 px-4">
          <div className="w-full max-w-9xl bg-parchment border border-yellow-700 shadow-lg rounded-lg p-6 space-y-6">
            <h1 className="text-2xl title text-(--foreground) text-center">Création de personnage</h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
