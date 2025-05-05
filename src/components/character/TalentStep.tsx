import { useState } from "react";
import type { Character } from "@/types/character";
import type { Talent } from "@/types/talents";
import { Check } from "lucide-react";

const mockTalents: Talent[] = [
  { name: "Vision Nocturne", description: "Peut voir clairement dans une obscurité totale jusqu'à 30 mètres.", cost: 2 },
  { name: "Chanceux", description: "Peut relancer un jet d’échec critique une fois par jour.", cost: 3 },
  { name: "Résistance magique", description: "Bonus de +10 contre les sorts hostiles.", cost: 1 },
  { name: "Ambidextre", description: "N’applique pas de malus à l’utilisation de la main non dominante.", cost: 2 },
  { name: "Rapide", description: "+10 à l’initiative et à la vitesse de déplacement.", cost: 2 },
  { name: "Mémoire Eidétique", description: "Souvenir précis de tout ce qui a été lu ou vu récemment.", cost: 3 },
  { name: "Langage Naturel", description: "+25 en apprentissage des langues.", cost: 1 },
  { name: "Perception Aiguisée", description: "+10 aux tests de perception visuelle et auditive.", cost: 2 },
  { name: "Volonté de Fer", description: "+15 contre les effets mentaux ou de peur.", cost: 2 },
  { name: "Sang-froid", description: "Immunisé à la panique et au choc de combat.", cost: 1 },
];


const mockFlaws: Talent[] = [
  { name: "Boiteux", description: "Vitesses de déplacement réduites de moitié.", cost: -2 },
  { name: "Arrogant", description: "Malus de -10 à toutes les interactions sociales.", cost: -1 },
  { name: "Sensible à la lumière", description: "Malus de -15 en plein soleil.", cost: -2 },
  { name: "Névrosé", description: "Jet de peur requis dans toute situation stressante.", cost: -2 },
  { name: "Anémie", description: "Moins de points de vie ; récupération ralentie.", cost: -1 },
  { name: "Entêté", description: "Refuse souvent les ordres ; malus social contextuel.", cost: -1 },
  { name: "Sommeil Léger", description: "Facilement réveillé ; repos moins efficace.", cost: -1 },
  { name: "Voix Grave ou Aigüe", description: "Malus en diplomatie, chant, etc.", cost: -1 },
  { name: "Mains Tremblantes", description: "Malus de -10 aux actions de précision.", cost: -2 },
  { name: "Peur du feu", description: "Jet de panique à proximité de flammes.", cost: -2 },
];

const MAX_TALENT_COST = 6;


type TalentStepProps = {
  character: Character;
  setCharacter: (c: Character) => void;
  onNext: () => void;
};

export default function TalentStep({ character, setCharacter, onNext }: TalentStepProps) {
  const [selected, setSelected] = useState<Talent[]>([
    ...(character.talents || []),
    ...(character.flaws || []),
  ]);
  
  const totalTalentCost = selected
    .filter((t) => t.cost > 0)
    .reduce((sum, t) => sum + t.cost, 0);

  const totalFlawBonus = selected
    .filter((t) => t.cost < 0)
    .reduce((sum, t) => sum + t.cost, 0); // total négatif

  const effectiveTDP = (character.tdp || 0) + Math.abs(totalFlawBonus);

  /*const totalUsed = selected.reduce((sum, t) => sum + t.cost, 0);*/
  const remaining = effectiveTDP - totalTalentCost;


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

  /*const isValid = totalTalentCost <= MAX_TALENT_COST && remaining >= 0;*/


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
        TDP raciaux : <strong>{character.tdp}</strong><br />
        Bonus de flaws : <strong className="text-green-700">{Math.abs(totalFlawBonus)}</strong><br />
        <span className="text-(--foreground)">TDP disponibles : </span>
        <strong>{effectiveTDP}</strong> (max 6 utilisés dans les talents)<br />
        Coût actuel des talents :{" "}
        <strong className={totalTalentCost > MAX_TALENT_COST ? "text-red-500" : ""}>
          {totalTalentCost}
        </strong><br />
        TDP restants :{" "}
        <strong className={remaining < 0 ? "text-red-500" : "text-green-600"}>{remaining}</strong>
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
