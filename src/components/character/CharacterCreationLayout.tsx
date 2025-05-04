"use client";

import { useState } from "react";
import RaceCultureStep from "./RaceCultureStep";
import StatsStep from "./StatsStep";
import ProfessionStep from "./ProfessionStep";
import CharacterSummary from "./CharacterSummary";
import type { Character } from "@/types/character";
import ConfirmDialog from "../ui/ConfirmDialog";


const steps = [
  { label: "Race & Culture", key: "race" },
  { label: "Caractéristiques", key: "stats" },
  { label: "Profession", key: "profession" },
];

export default function CharacterCreationLayout() {
  const [activeStep, setActiveStep] = useState(0);

  /*Effets d'ui*/
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [stepKey, setStepKey] = useState(Date.now()); // force le remount pour l'effet fade


  const [character, setCharacter] = useState<Character>({
    race: "",
    culture: "",
    raceModifiers: {},
    cultureEffects: { languages: [], skills: [] },
    stats: undefined,
    profession: "",
    realm: "",
  });

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <RaceCultureStep
            character={character}
            setCharacter={setCharacter}
            onNext={() => goToStep(1)}
          />
        );
      case 1:
        return (
          <StatsStep
            character={character}
            setCharacter={setCharacter}
            onNext={() => goToStep(2)}
          />
        );
      case 2:
        return (
          <ProfessionStep
            character={character}
            setCharacter={setCharacter}
            onNext={() => goToStep(2)} // ou future étape
          />
        );
      default:
        return null;
    }
  };

  const goToStep = (index: number) => {
  if (index === activeStep) return;
  setLoading(true);
  setTimeout(() => {
    setActiveStep(index);
    setLoading(false);
  }, 1000);
};


  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Colonne gauche : navigation + contenu */}
      <div className="flex-1 space-y-4 min-w-[40%]">
        <div className="mb-4">
          <input
            type="text"
            value={character.name || ""}
            onChange={(e) => setCharacter({ ...character, name: e.target.value })}
            className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            placeholder="Nom du héros..."
          />
        </div>
        <div className="flex gap-2 ">
          {steps.map((step, i) => (
            <button
              key={step.key}
              onClick={() => setActiveStep(i)}
              className={`px-4 py-2 rounded border-2 ${
                activeStep === i
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-800 border-gray-400"
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        <div className="bg-gray-900 text-white rounded-lg p-6 shadow-inner min-h-[300px] w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <div className="animate-spin h-8 w-8 border-4 border-yellow-600 border-t-transparent rounded-full mb-4" />
              <span className="italic">Chargement...</span>
            </div>
          ) : (
            renderStep()
          )}
        </div>

      </div>

      {/* Colonne droite : résumé */}
      <div className="flex-2 w-1/3 bg-gray-800 rounded-lg p-4 shadow-inner">
        <h2 className="text-lg font-bold mb-2 text-center">Résumé</h2>
        <CharacterSummary character={character} />
      </div>
      {character.race && character.culture && character.stats && character.profession && (
        <div className="fixed top-14 right-11 flex flex-col gap-3 z-50">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(character, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              const name = character.name?.trim().replace(/\s+/g, "_") || "personnage";
              const date = new Date().toISOString();
              const datePart = date.split("T")[0];
              const timePart = date.split("T")[1].split(".")[0].replace(/:/g, "-");
              link.download = `${name}-export-${datePart}-${timePart}.json`;
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
          >
            📄 Exporter
          </button>
        </div>
      )}
      <div className="fixed top-14 left-10 flex flex-col gap-3 z-50">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
        >
          ♻️ Réinitialiser
        </button>
      </div>
      {showResetConfirm && (
        <ConfirmDialog
          message="Réinitialiser le personnage ? Cette action est irréversible."
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={() => {
            setCharacter({
              race: "",
              culture: "",
              raceModifiers: {},
              cultureEffects: { languages: [], skills: [] },
              stats: undefined,
              profession: "",
              realm: "",
            });
            setActiveStep(0);
            setShowResetConfirm(false);
          }}
        />
      )}
    </div>
  );
}
