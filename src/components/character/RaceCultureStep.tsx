"use client";

import React from "react";
import type { Character } from "@/types/character";
import { Check } from "lucide-react";


const races = ["Humain", "Elfe", "Nain", "Hobbit"];
const cultures = ["Urbaine", "Rurale", "Sylvestre", "Nomade"];

export default function RaceCultureStep({ character, setCharacter, onNext }: {
  character: { race: string; culture: string };
  setCharacter: (updater: (prev: Character) => Character) => void;
  onNext: () => void;
}) {

  const racialModifiers: Record<string, Record<string, number>> = {
    Humain: {
      Force: 0,
      Agilité: 0,
      Constitution: 0,
      Intelligence: 0,
    },
    Elfe: {
      Force: -5,
      Agilité: +10,
      Constitution: -5,
      Intelligence: +10,
    },
    Nain: {
      Force: +5,
      Agilité: -5,
      Constitution: +10,
      Intelligence: -5,
    },
    Hobbit: {
      Force: -10,
      Agilité: +5,
      Constitution: +5,
      Intelligence: 0,
    },
  };

  const cultureEffects: Record<string, { languages: string[]; skills: string[] }> = {
    Urbaine: {
      languages: ["Commun", "Argot local"],
      skills: ["Marchandage", "Étiquette", "Observation"],
    },
    Rurale: {
      languages: ["Commun", "Dialecte local"],
      skills: ["Survie", "Dressage", "Agriculture"],
    },
    Sylvestre: {
      languages: ["Commun", "Langue des bois"],
      skills: ["Discrétion", "Chasse", "Connaissance de la nature"],
    },
    Nomade: {
      languages: ["Commun", "Langue tribale"],
      skills: ["Orientation", "Cavalier", "Survie"],
    },
  };

  const racialTDP: Record<string, number> = {
    Humain: 6,
    Elfe: 5,
    Nain: 4,
    Hobbit: 5,
  };

  const isValid = !!character.race && !!character.culture;


  const handleRaceChange = (race: string) => {
    setCharacter((prev: Character) => ({
      ...prev,
      race,
      raceModifiers: racialModifiers[race] || {},
      tdp: racialTDP[race] || 0,
    }));
    console.log(character);

  };

  const handleCultureChange = (culture: string) => {
    setCharacter((prev: Character) => ({
      ...prev,
      culture,
      cultureEffects: cultureEffects[culture] || {
        languages: [],
        skills: [],
      },
    }));
    console.log(character);
  };

  return (
    <div className="text-(--foreground)">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-bold">Choix de la race et de la culture</h2>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-colors
            ${isValid
              ? "bg-yellow-700 border-yellow-500 text-white"
              : "bg-[--background] text-[--foreground] hover:bg-yellow-700 hover:border-yellow-500"}
            ${!isValid ? "disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400" : ""}
          `}
        >
          <Check className="w-5 h-5" strokeWidth={2.5} />
        </button>

      </div>
      <div>
        <label className="block font-semibold mb-1">Race</label>
        <select
          value={character.race}
          onChange={(e) => handleRaceChange(e.target.value)}
          className="w-full p-2 border border-yellow-700 rounded bg-white text-gray-900"
        >
          <option value="">-- Choisir une race --</option>
          {races.map((race) => (
            <option key={race} value={race}>{race}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Culture</label>
        <select
          value={character.culture}
           onChange={(e) => handleCultureChange(e.target.value)}
          className="w-full p-2 border border-yellow-700 rounded bg-white text-gray-900"
        >
          <option value="">-- Choisir une culture --</option>
          {cultures.map((culture) => (
            <option key={culture} value={culture}>{culture}</option>
          ))}
        </select>
      </div>

      {character.race && (
        <div className="mb-6 text-left">
          <h2 className="font-semibold text-lg mb-2">Modificateurs raciaux pour {character.race} :</h2>
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(racialModifiers[character.race] || {}).map(([stat, mod]) => (
              <li key={stat}>
                <span className="font-medium">{stat}</span> : {mod >= 0 ? `+${mod}` : mod}
              </li>
            ))}
          </ul>
        </div>
      )}

      {character.culture && (
        <div className="mb-6 text-left">
          <h2 className="font-semibold text-lg mb-2">Effets de la culture {character.culture} :</h2>
          <p className="mb-1"><strong>Langues :</strong> {cultureEffects[character.culture]?.languages.join(", ")}</p>
          <p><strong>Compétences bonus :</strong> {cultureEffects[character.culture]?.skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
