"use client";

import { useState, useEffect } from "react";
import type { Character } from "@/types/character";
import type { SkillSelection } from "@/types/skills";
import { Check } from "lucide-react";

const MAX_DP = 50;

export default function SkillStep({
  character,
  setCharacter,
  onNext,
}: {
  character: Character;
  setCharacter: (updater: (prev: Character) => Character) => void;
  onNext: () => void;
}) {
  const skillGroups = Object.keys(character.skillCosts || {});
  const defaultSkills: SkillSelection = skillGroups.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as SkillSelection);

  const [skills, setSkills] = useState<SkillSelection>({
  ...defaultSkills,
  ...(character.skills || {}),
  });
  const [availableDP, setAvailableDP] = useState<number>(character.availableDP ?? MAX_DP);

  useEffect(() => {
    if (!character.skills) {
      setCharacter((prev) => ({ ...prev, availableDP: MAX_DP }));
    }
  }, [character.skills, setCharacter]);

  const handleChange = (group: string, value: number) => {
    const [cost1, cost2] = character.skillCosts?.[group] || [99, 99];
    const cost = value === 0 ? 0 : cost1 + (value - 1) * cost2;
    const prevValue = skills[group] || 0;
    const prevCost = prevValue === 0 ? 0 : cost1 + (prevValue - 1) * cost2;
    const dpDelta = cost - prevCost;

    if (availableDP - dpDelta < 0) return;

    setSkills((prev) => ({ ...prev, [group]: value }));
    setAvailableDP((prev) => prev - dpDelta);
  };

  const handleNext = () => {
    setCharacter((prev) => ({
      ...prev,
      skills,
      availableDP,
    }));
    onNext();
  };

  return (
    <div className="text-(--foreground)">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Répartition des compétences</h2>
        <button
          onClick={handleNext}
          className="w-9 h-9 flex items-center justify-center rounded-full
          border-2 border-yellow-500 bg-(--background) text-(--foreground) hover:bg-yellow-700 hover:border-yellow-500
          disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
        >
          <Check className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
      <p className="mb-2">DP restants : {availableDP}</p>
      <div className="space-y-4">
        {character.skillCosts &&
          Object.entries(character.skillCosts).map(([group, [cost1, cost2]]) => (
            <div key={group} className="flex justify-between items-center border-b pb-2">
              <div className="w-1/3">{group}</div>
              <div className="w-1/3 text-sm text-(--foreground)/50">{cost1} / {cost2}</div>
              <div className="w-1/3 flex items-center justify-end gap-2">
                {[0, 1, 2].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleChange(group, val)}
                    className={`px-2 py-1 rounded ${
                      skills[group] === val
                        ? "bg-yellow-600 text-white"
                        : "bg-(--foreground) hover:bg-(--background) hover:text-(--foreground) border-1 border-transparent hover:border-yellow-600 text-(--background)"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
