"use client";

import type { Character } from "@/types/character";

export default function CharacterSummary({ character }: { character: Character }) {
  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="font-semibold">Race</h3>
          <p>{character.race || <em>Non définie</em>}</p>
        </div>

        <div>
          <h3 className="font-semibold">Culture</h3>
          <p>{character.culture || <em>Non définie</em>}</p>
        </div>

        <div>
          <h3 className="font-semibold">Profession</h3>
          <p>{character.profession || <em>Non définie</em>}</p>
          {character.realm && <p className="text-xs text-(--foreground)/50">({character.realm})</p>}
        </div>
      </div>

      {character.stats && (
        <div className="flex-1 space-y-4">
          <h3 className="font-semibold">Caractéristiques</h3>
          <ul className="list-disc list-inside space-y-1">
            {character.stats &&
              Object.entries(character.stats.current).map(([key, value]) => (
                <li key={key}>
                  {key} : {value}
                  <span className="text-xs text-(--foreground)/50">
                    {" "}
                    / {character.stats?.potential?.[key] ?? "?"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {character.cultureEffects.languages?.length > 0 && (
        <div className="flex-1 space-y-4">
          <h3 className="font-semibold">Langues</h3>
          <ul className="list-disc list-inside">
            {character.cultureEffects.languages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </div>
      )}

      {character.cultureEffects.skills?.length > 0 && (
        <div className="flex-1 space-y-4">
          <h3 className="font-semibold">Compétences culturelles</h3>
          <ul className="list-disc list-inside">
            {character.cultureEffects.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
