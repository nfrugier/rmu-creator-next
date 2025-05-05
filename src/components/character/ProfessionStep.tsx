"use client";

import { useState } from "react";
import type { Character } from "@/types/character";
import type { Profession } from "@/types/profession";

const PROFESSIONS: Profession[] = [
  // Royaume des Armes
  {
    name: "Guerrier",
    realm: "Royaume des Armes",
    description: "Expert du combat et de la puissance physique. Aucun pouvoir magique.",
    skillCosts: {
      "Animal": [2, 3],
      "Awareness": [2, 4],
      "Battle Expertise": [1, 2],
      "Body Discipline": [4, 6],
      "Brawn": [1, 3],
      "Combat Expertise": [1, 3],
      "Combat Training": [1, 2],
      "Composition": [3, 4],
      "Crafting": [2, 4],
      "Delving": [7, 10],
      "Environmental": [2, 4],
      "Gymnastic": [3, 4],
      "Lore": [2, 4],
      "Magical Expertise": [7, 10],
      "Medical": [3, 4],
      "Mental Discipline": [5, 7],
      "Movement": [2, 4],
      "Performance Art": [3, 4],
      "Power Manipulation": [9, 12],
      "Science": [5, 7],
      "Social": [2, 4],
      "Spells": [7, 10],
      "Subterfuge": [3, 5],
      "Technical": [5, 7],
      "Vocation": [3, 4],
    }
  },
  {
    name: "Voleur",
    realm: "Royaume des Armes",
    description: "Discret, agile et maître en subterfuge, pièges et survie urbaine.",
    skillCosts: {
      "Animal": [2, 3],
      "Awareness": [1, 2],
      "Battle Expertise": [3, 5],
      "Body Discipline": [6, 8],
      "Brawn": [4, 6],
      "Combat Expertise": [3, 5],
      "Combat Training": [2, 4],
      "Composition": [3, 4],
      "Crafting": [2, 3],
      "Delving": [5, 7],
      "Environmental": [2, 4],
      "Gymnastic": [2, 3],
      "Lore": [2, 4],
      "Magical Expertise": [7, 10],
      "Medical": [3, 4],
      "Mental Discipline": [4, 6],
      "Movement": [1, 3],
      "Performance Art": [2, 3],
      "Power Manipulation": [9, 12],
      "Science": [4, 6],
      "Social": [1, 3],
      "Spells": [7, 10],
      "Subterfuge": [1, 2],
      "Technical": [1, 2],
      "Vocation": [3, 4],
    }
  },

  // Royaume de la Canalisation
  {
    name: "Clerc",
    realm: "Royaume de la Canalisation",
    description: "Canalise la puissance divine pour soigner, bénir ou punir.",
    skillCosts: {
      "Animal": [3, 4],
      "Awareness": [4, 6],
      "Battle Expertise": [5, 7],
      "Body Discipline": [6, 8],
      "Brawn": [5, 7],
      "Combat Expertise": [7, 10],
      "Combat Training": [5, 7],
      "Composition": [3, 4],
      "Crafting": [3, 4],
      "Delving": [3, 4],
      "Environmental": [3, 5],
      "Gymnastic": [4, 6],
      "Lore": [2, 3],
      "Magical Expertise": [2, 3],
      "Medical": [2, 4],
      "Mental Discipline": [3, 4],
      "Movement": [3, 5],
      "Performance Art": [2, 3],
      "Power Manipulation": [2, 4],
      "Science": [3, 4],
      "Social": [1, 3],
      "Spells": [1, 2],
      "Technical": [5, 7],
      "Subterfuge": [6, 8],
      "Vocation": [3, 4],
    }
  },
  {
    name: "Druide",
    realm: "Royaume de la Canalisation",
    description: "Manie une magie divine tournée vers la nature et l’équilibre vital.",
    skillCosts: {
      "Animal": [1, 2],
      "Awareness": [3, 4],
      "Battle Expertise": [7, 10],
      "Body Discipline": [6, 8],
      "Brawn": [5, 7],
      "Combat Expertise": [7, 10],
      "Combat Training": [5, 7],
      "Composition": [3, 4],
      "Crafting": [3, 4],
      "Delving": [4, 6],
      "Environmental": [1, 3],
      "Gymnastic": [4, 6],
      "Lore": [2, 3],
      "Magical Expertise": [3, 4],
      "Medical": [2, 4],
      "Mental Discipline": [3, 4],
      "Movement": [3, 5],
      "Performance Art": [3, 4],
      "Power Manipulation": [2, 4],
      "Science": [3, 5],
      "Social": [3, 4],
      "Spells": [1, 2],
      "Subterfuge": [4, 6],
      "Technical": [5, 7],
      "Vocation": [3, 4],
    }
  },

  // Royaume de l'Essence
  {
    name: "Magicien",
    realm: "Royaume de l'Essence",
    description: "Maître des éléments et des forces naturelles du monde.",
    skillCosts: {
      "Animal": [3, 5],
      "Awareness": [4, 6],
      "Battle Expertise": [7, 10],
      "Body Discipline": [6, 8],
      "Brawn": [6, 8],
      "Combat Expertise": [7, 10],
      "Combat Training": [5, 7],
      "Composition": [2, 4],
      "Crafting": [3, 4],
      "Delving": [1, 2],
      "Environmental": [4, 6],
      "Gymnastic": [4, 6],
      "Lore": [1, 3],
      "Magical Expertise": [1, 2],
      "Medical": [3, 4],
      "Mental Discipline": [2, 4],
      "Movement": [4, 6],
      "Performance Art": [2, 4],
      "Power Manipulation": [2, 3],
      "Science": [2, 4],
      "Social": [3, 4],
      "Spells": [1, 2],
      "Subterfuge": [6, 8],
      "Technical": [5, 7],
      "Vocation": [3, 4],
    }
  },
  {
    name: "Illusionniste",
    realm: "Royaume de l'Essence",
    description: "Spécialiste des illusions trompant les sens.",
    skillCosts: {
      "Animal": [4, 6],
      "Awareness": [2, 4],
      "Battle Expertise": [7, 10],
      "Body Discipline": [6, 8],
      "Brawn": [6, 8],
      "Combat Expertise": [7, 10],
      "Combat Training": [6, 8], // Training 1
      "Composition": [1, 3],
      "Crafting": [3, 4],
      "Delving": [1, 2],
      "Environmental": [4, 6],
      "Gymnastic": [4, 6],
      "Lore": [1, 3],
      "Magical Expertise": [1, 2],
      "Medical": [4, 6],
      "Mental Discipline": [3, 5],
      "Movement": [4, 6],
      "Performance Art": [1, 3],
      "Power Manipulation": [2, 3],
      "Science": [3, 4],
      "Social": [3, 4],
      "Spells": [1, 2], // Base/Open
      "Subterfuge": [4, 6],
      "Technical": [5, 7],
      "Vocation": [3, 4],
    }
  },

  // Royaume du Mentalisme
  {
    name: "Mentaliste",
    realm: "Royaume du Mentalisme",
    description: "Utilise la puissance intérieure de l’esprit pour percevoir et influencer.",
    skillCosts: {
      "Animal": [4, 6],
      "Awareness": [3, 5],
      "Battle Expertise": [7, 10],
      "Body Discipline": [4, 6],
      "Brawn": [6, 8],
      "Combat Expertise": [7, 10],
      "Combat Training": [5, 7], // Training 1
      "Composition": [3, 4],
      "Crafting": [3, 4],
      "Delving": [2, 4],
      "Environmental": [4, 6],
      "Gymnastic": [4, 6],
      "Lore": [2, 3],
      "Magical Expertise": [1, 3],
      "Medical": [3, 5],
      "Mental Discipline": [1, 2],
      "Movement": [4, 6],
      "Performance Art": [3, 4],
      "Power Manipulation": [2, 3],
      "Science": [3, 4],
      "Social": [1, 3],
      "Spells": [1, 2], // Base/Open
      "Subterfuge": [5, 7],
      "Technical": [5, 7],
      "Vocation": [3, 4],
    }
  },
  {
    name: "Mystique",
    realm: "Royaume du Mentalisme",
    description: "Maître de l’esprit, de la perception et des réalités cachées. Entre méditation et révélation.",
    skillCosts: {
      "Animal": [4, 6],
      "Awareness": [1, 3],
      "Battle Expertise": [5, 7],
      "Body Discipline": [6, 8],
      "Brawn": [5, 7],
      "Combat Expertise": [4, 6],
      "Combat Training": [3, 5],
      "Composition": [2, 4],
      "Crafting": [3, 4],
      "Delving": [2, 3],
      "Environmental": [3, 5],
      "Gymnastic": [3, 5],
      "Lore": [2, 3],
      "Magical Expertise": [3, 5],
      "Medical": [3, 5],
      "Mental Discipline": [5, 7],
      "Movement": [3, 4],
      "Performance Art": [2, 4],
      "Power Manipulation": [3, 5],
      "Science": [5, 7],
      "Social": [2, 3],
      "Spells": [3, 4],
      "Subterfuge": [2, 4],
      "Technical": [2, 3],
      "Vocation": [3, 4]
    }
  },

  // Royaumes Hybrides
  {
    name: "Paladin",
    realm: "Royaumes Hybrides",
    description: "Combinaison de foi et d’armes : un chevalier sacré redoutable.",
    skillCosts: {
      "Animal": [2, 3],
      "Awareness": [3, 5],
      "Battle Expertise": [2, 3],
      "Body Discipline": [5, 7],
      "Brawn": [2, 4],
      "Combat Expertise": [3, 5],
      "Combat Training": [2, 4], // Training 1
      "Composition": [3, 4],
      "Crafting": [2, 4],
      "Delving": [6, 8],
      "Environmental": [3, 5],
      "Gymnastic": [2, 4],
      "Lore": [2, 4],
      "Magical Expertise": [3, 5],
      "Medical": [4, 6],
      "Mental Discipline": [5, 7],
      "Movement": [2, 3],
      "Performance Art": [3, 4],
      "Power Manipulation": [4, 6],
      "Science": [5, 7],
      "Social": [2, 3],
      "Spells": [3, 5], // Base/Open
      "Subterfuge": [4, 6],
      "Technical": [5, 7],
      "Vocation": [3, 4],
    }

  },
  {
    name: "Sorcier",
    realm: "Royaumes Hybrides",
    description: "Fusionne plusieurs magies pour produire des effets puissants et instables.",
    skillCosts: {
      "Animal": [4, 6],
      "Awareness": [1, 3],
      "Battle Expertise": [5, 7],
      "Body Discipline": [6, 8],
      "Brawn": [5, 7],
      "Combat Expertise": [4, 6],
      "Combat Training": [3, 5], // Training 1
      "Composition": [2, 4],
      "Crafting": [3, 4],
      "Delving": [2, 3],
      "Environmental": [3, 5],
      "Gymnastic": [3, 5],
      "Lore": [2, 3],
      "Magical Expertise": [3, 5],
      "Medical": [3, 5],
      "Mental Discipline": [5, 7],
      "Movement": [3, 4],
      "Performance Art": [2, 4],
      "Power Manipulation": [3, 5],
      "Science": [5, 7],
      "Social": [2, 3],
      "Spells": [3, 4], // Base/Open
      "Subterfuge": [2, 4],
      "Technical": [2, 3],
      "Vocation": [3, 4],
    }
  },
];




export default function ProfessionStep({
  character,
  setCharacter,
  onNext,
}: {
  character: Character;
  setCharacter: (updater: (prev: Character) => Character) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState(character.profession || "");

  const handleSelect = (name: string) => {
    setSelected(name);
    const chosen = PROFESSIONS.find((p) => p.name === name);
    setCharacter((prev) => ({
      ...prev,
      profession: name,
      realm: chosen?.realm || "Sans royaume",
      skillCosts: chosen?.skillCosts || {},
    }));
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
