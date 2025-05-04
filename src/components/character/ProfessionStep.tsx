"use client";

import { useState } from "react";
import type { Character } from "@/types/character";

type Profession = {
  name: string;
  realm: "Royaume des Armes" | "Royaume de la Canalisation" | "Royaume de l'Essence" | "Royaume du Mentalisme" | "Royaumes Hybrides";
  description: string;
};

const PROFESSIONS: Profession[] = [
  // Royaume des Armes
  {
    name: "Guerrier",
    realm: "Royaume des Armes",
    description: "Expert du combat et de la puissance physique. Aucun pouvoir magique.",
  },
  {
    name: "Voleur",
    realm: "Royaume des Armes",
    description: "Discret, agile et maître en subterfuge, pièges et survie urbaine.",
  },

  // Royaume de la Canalisation
  {
    name: "Clerc",
    realm: "Royaume de la Canalisation",
    description: "Canalise la puissance divine pour soigner, bénir ou punir.",
  },
  {
    name: "Druide",
    realm: "Royaume de la Canalisation",
    description: "Manie une magie divine tournée vers la nature et l’équilibre vital.",
  },

  // Royaume de l'Essence
  {
    name: "Magicien",
    realm: "Royaume de l'Essence",
    description: "Maître des éléments et des forces naturelles du monde.",
  },
  {
    name: "Illusionniste",
    realm: "Royaume de l'Essence",
    description: "Spécialiste des illusions trompant les sens.",
  },

  // Royaume du Mentalisme
  {
    name: "Mentaliste",
    realm: "Royaume du Mentalisme",
    description: "Utilise la puissance intérieure de l’esprit pour percevoir et influencer.",
  },
  {
    name: "Prophète",
    realm: "Royaume du Mentalisme",
    description: "Maîtrise la divination, la perception du temps et la clairvoyance.",
  },

  // Royaumes Hybrides
  {
    name: "Paladin",
    realm: "Royaumes Hybrides",
    description: "Combinaison de foi et d’armes : un chevalier sacré redoutable.",
  },
  {
    name: "Sorcier",
    realm: "Royaumes Hybrides",
    description: "Fusionne plusieurs magies pour produire des effets puissants et instables.",
  },
];


export default function ProfessionStep({
  character,
  setCharacter,
  onNext,
}: {
  character: Character;
  setCharacter: (c: Character) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState(character.profession || "");

  const handleSelect = (name: string) => {
    setSelected(name);
    const chosen = PROFESSIONS.find((p) => p.name === name);
    setCharacter({ ...character, profession: name, realm: chosen?.realm || "Sans royaume" });
  };

  return (
    <div className="text-left space-y-4">
      <h2 className="text-xl font-bold text-center">Choix de la profession</h2>

      {["Royaume des Armes", "Royaume de la Canalisation", "Royaume de l'Essence", "Royaume du Mentalisme", "Royaumes Hybrides" ].map((realm) => (
        <div key={realm}>
          <h3 className="text-lg font-semibold mb-2">{realm}</h3>
          <div className="space-y-2">
            {PROFESSIONS.filter((p) => p.realm === realm).map((p) => (
              <div
                key={p.name}
                onClick={() => handleSelect(p.name)}
                className={`cursor-pointer p-3 rounded border-2 ${
                  selected === p.name
                    ? "border-indigo-600 bg-indigo-900 text-white"
                    : "border-gray-300 bg-white text-black"
                } hover:border-indigo-400 transition`}
              >
                <strong>{p.name}</strong>
                <p className="text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className=" text-center pt-4">
        <button
          onClick={onNext}
          disabled={!selected}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          ✅ Valider et continuer
        </button>
      </div>
    </div>
  );
}
