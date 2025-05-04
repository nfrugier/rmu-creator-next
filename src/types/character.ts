export type StatBlock = Record<string, number>;

export type Character = {
  name?: string;
  race: string;
  culture: string;
  raceModifiers: StatBlock;
  cultureEffects: {
    languages: string[];
    skills: string[];
  };
  stats?: {
    current: StatBlock;
    potential: StatBlock;
  };
  profession: string;
  realm: string;
};

