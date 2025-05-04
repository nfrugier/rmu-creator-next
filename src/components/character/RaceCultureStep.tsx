"use client";

import React from "react";

const races = ["Humain", "Elfe", "Nain", "Hobbit"];
const cultures = ["Urbaine", "Rurale", "Sylvestre", "Nomade"];

export default function RaceCultureStep({ character, setCharacter, onNext }: {
  character: { race: string; culture: string };
  setCharacter: (c: any) => void;
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

  const handleRaceChange = (race: string) => {
    setCharacter((prev: Character) => ({
      ...prev,
      race,
      raceModifiers: racialModifiers[race] || {},
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
    <div>
      <div className="mb-4">
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

      <button
        onClick={onNext}
        disabled={!character.race || !character.culture}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        ✅ Valider et continuer
      </button>
    </div>
  );
}
