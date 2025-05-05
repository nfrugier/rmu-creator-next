"use client";

import { useEffect, useState } from "react";
import type { Character, StatBlock } from "@/types/character";
import { Dice6, Check } from "lucide-react";

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
  /*const [isConfirmed, setIsConfirmed] = useState(false);*/
  const isConfirmed = !!character.stats;


  useEffect(() => {
    if (character.stats) {
      setTempStats(character.stats.current);
      setPotStats(character.stats.potential);
      setRolled(true);
    }
  }, [character.stats]);
  const canValidate = rolled && Object.keys(tempStats).length === STAT_NAMES.length;

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
    /*setIsConfirmed(true);*/
    onNext();
  };

  return (
    <div className="text-left space-y-4 text-(--foreground)">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Caractéristiques</h2>

        <div className="flex gap-2">
          {!rolled ? (
            <button
              onClick={handleRollAll}
              className="w-9 h-9 rounded-full bg-(--background) border-2 border-yellow-500 text-(--foreground) hover:bg-yellow-700 hover:border-yellow-500 flex items-center justify-center transition"
            >
              <Dice6 className="w-5 h-5" strokeWidth={2.25} />
            </button>
          ) : (
            <>
              <button
                onClick={handleRollAll}
                className="w-9 h-9 rounded-full bg-(--background) border-2 border-yellow-500 text-(--foreground) hover:bg-yellow-700 hover:border-yellow-500 flex items-center justify-center transition"
              >
                <Dice6 className="w-5 h-5" strokeWidth={2.25} />
              </button>
              <button
                onClick={handleValidate}
                disabled={!canValidate}
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2 transition-colors
                  ${isConfirmed
                    ? "bg-yellow-700 border-yellow-500 text-white"
                    : "bg-[--background] text-[--foreground] hover:bg-yellow-700 hover:border-yellow-500"}
                  ${!canValidate ? "disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400" : ""}
                `}
              >
                <Check className="w-5 h-5" strokeWidth={2.5} />
              </button>

            </>
          )}
        </div>
      </div>

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

    </div>
  );
}
