export type SkillSelection = {
    [skillGroup: string]: number; // nombre de rangs achetés
  };

  export type SkillCosts = {
    [skillGroup: string]: [number, number]; // [coût du premier rang, coût des suivants]
  };