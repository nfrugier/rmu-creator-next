export type SkillCosts = Record<string, [number, number]>;

export type Profession = {
  name: string;
  realm:
    | "Royaume des Armes"
    | "Royaume de la Canalisation"
    | "Royaume de l'Essence"
    | "Royaume du Mentalisme"
    | "Royaumes Hybrides";
  description: string;
  skillCosts: SkillCosts;
};
