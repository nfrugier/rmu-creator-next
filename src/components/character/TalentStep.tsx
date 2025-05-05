import { useState } from "react";
import type { Character } from "@/types/character";
import type { Talent } from "@/types/talents";
import { Check } from "lucide-react";

const mockTalents: Talent[] = [
  { name: "Vision Nocturne", description: "Peut voir dans l'obscurité.", cost: 2 },
  { name: "Chanceux", description: "Peut relancer un jet critique par jour.", cost: 3 },
  { name: "Résistance magique", description: "Bonus contre les sorts hostiles.", cost: 1 },
];

const mockFlaws: Talent[] = [
  { name: "Boiteux", description: "Vitesses réduites.", cost: -2 },
  { name: "Arrogant", description: "Malus aux interactions sociales.", cost: -1 },
  { name: "Sensible à la lumière", description: "Malus en plein jour.", cost: -2 },
];

type TalentStepProps = {
  character: Character;
  setCharacter: (c: Character) => void;
  onNext: () => void;
};

export default function TalentStep({ character, setCharacter, onNext }: TalentStepProps) {
  const baseTDP = character.tdp || 0;
  const [selected, setSelected] = useState<Talent[]>([
    ...(character.talents || []),
    ...(character.flaws || []),
  ]);
  

  const totalUsed = selected.reduce((sum, t) => sum + t.cost, 0);
  const remaining = baseTDP - totalUsed;

  const toggleTalent = (talent: Talent) => {
    setSelected((prev) =>
      prev.find((t) => t.name === talent.name)
        ? prev.filter((t) => t.name !== talent.name)
        : [...prev, talent]
    );
  };

  const handleNext = () => {
    setCharacter({
      ...character,
      talents: selected.filter((t) => t.cost > 0),
      flaws: selected.filter((t) => t.cost < 0),
    });
    onNext();
  };

  //const isValid = remaining >= 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Talents et défauts</h2>
        <button
          onClick={handleNext}
          disabled={!selected}
          className="w-9 h-9 flex items-center justify-center rounded-full
                     border-2 border-yellow-500 bg-(--background) text-(--foreground) hover:bg-yellow-700 hover:border-yellow-500
                     disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
        >
          <Check className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      <p className="mb-4 text-sm text-(--foreground)">
        Points de talents disponibles : <strong>{baseTDP}</strong><br />
        Total utilisé : <strong className={remaining < 0 ? "text-red-500" : ""}>{totalUsed}</strong><br />
        Restant : <strong className={remaining < 0 ? "text-red-500" : "text-green-600"}>{remaining}</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Talents</h3>
          {mockTalents.map((talent) => (
            <div
              key={talent.name}
              className={`cursor-pointer p-3 rounded border-2 ${
                selected.some((t) => t.name === talent.name)
                  ? "border-yellow-600 bg-yellow-900 text-white"
                  : "border-gray-300 bg-white text-black"
              } hover:border-yellow-400 hover:bg-yellow-200 hover:text-black transition`}
              onClick={() => toggleTalent(talent)}
            >
              <strong>{talent.name}</strong> <span className="text-sm ">(Coût : {talent.cost})</span>
              <p className="text-sm">{talent.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Défauts</h3>
          {mockFlaws.map((flaw) => (
            <div
              key={flaw.name}
              className={`cursor-pointer p-3 rounded border-2 ${
                selected.some((t) => t.name === flaw.name)
                  ? "border-yellow-600 bg-yellow-900 text-white"
                    : "border-gray-300 bg-white text-black"
                } hover:border-yellow-400 hover:bg-yellow-200 hover:text-black transition`}
              onClick={() => toggleTalent(flaw)}
            >
              <strong>{flaw.name}</strong> <span className="text-sm">(Bonus : {Math.abs(flaw.cost)})</span>
              <p className="text-sm">{flaw.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
