// src/app/page.tsx
//import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-900 text-white rounded-xl border-4 border-yellow-700 shadow-lg text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 title">RMU Character Creator</h1>
        <p className="text-base md:text-lg mb-6">
          Crée ton personnage pas à pas selon les règles de <strong>Rolemaster Unified</strong>.
          Choisis ta race, ta culture, ta profession, tes compétences et plus encore.
        </p>
        <a
          href="/create"
          className="inline-block px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
        >
          Commencer
        </a>
      </div>
    </main>
  );
}

