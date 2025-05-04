"use client";

import { useEffect, useState } from "react";
import type { Character, StatBlock } from "@/types/character";

const STAT_NAMES = [
  "Agilité", "Charisme", "Constitution", "Force", "Intelligence",
  "Intuition", "Mémoire", "Présence", "Raison", "Vitesse"
];

function rollStat(): [number, number] {
  const rolls: number[] = [];

  while (rolls.length < 3) {
    const roll = Math.floor(Math.random() * 90) + 11; // 11 → 100 inclus
    rolls.push(roll);
  }

  rolls.sort((a, b) => b - a);
  return [rolls[1], rolls[0]]; // [temporaire, potentiel]
}

export default function StatsStep({
  character,
  setCharacter,
  onNext,
}: {
  character: Character;
  setCharacter: (c: Character) => void;
  onNext: () => void;
}) {
  /*const [rolled, setRolled] = useState(false);
  const [tempStats, setTempStats] = useState<StatBlock>(
  character.stats?.current || {}
);
  const [potStats, setPotStats] = useState<StatBlock>(
    character.stats?.potential || {}
  );*/
  const [tempStats, setTempStats] = useState<StatBlock>({});
  const [potStats, setPotStats] = useState<StatBlock>({});
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    if (character.stats) {
      setTempStats(character.stats.current);
      setPotStats(character.stats.potential);
      setRolled(true);
    }
  }, [character.stats]);

  const handleRollAll = () => {
    const temp: StatBlock = {};
    const pot: StatBlock = {};

    STAT_NAMES.forEach((stat) => {
      const [tempVal, potVal] = rollStat();
      temp[stat] = tempVal;
      pot[stat] = potVal;
    });

    setTempStats(temp);
    setPotStats(pot);
    setRolled(true);
  };

  const handleValidate = () => {
    setCharacter({
      ...character,
      stats: {
        current: tempStats,
        potential: potStats,
      },
    });
    onNext();
  };

  return (
    <div className="text-left space-y-4">
      <h2 className="text-xl font-bold text-center">Caractéristiques</h2>

      {STAT_NAMES.map((stat) => (
        <div key={stat} className="flex justify-between items-center border-b pb-1">
          <span className="font-semibold">{stat}</span>
          {rolled ? (
            <div className="text-right">
              <div className="text-sm">Temporaire : {tempStats[stat]}</div>
              <div className="text-xs text-gray-400">Potentiel : {potStats[stat]}</div>
            </div>
          ) : (
            <span className="italic text-gray-400">?</span>
          )}
        </div>
      ))}

      <div className="text-center pt-6 space-y-3">
  {!rolled ? (
    <button
      className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      onClick={handleRollAll}
    >
      🎲 Lancer les caractéristiques
    </button>
  ) : (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button
        className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        onClick={handleRollAll}
      >
        🔁 Relancer
      </button>
      <button
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
        onClick={handleValidate}
      >
        ✅ Valider et continuer
      </button>
    </div>
  )}
</div>

    </div>
  );
}
