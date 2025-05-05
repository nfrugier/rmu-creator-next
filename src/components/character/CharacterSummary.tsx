"use client";

import type { Character } from "@/types/character";

export default function CharacterSummary({ character }: { character: Character }) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className=" space-y-4">
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
          <div className="space-y-4">
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

        {character.skills && (
          <div className="space-y-4">
            <h3 className="font-semibold text-center">Compétences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <ul className="list-disc list-inside space-y-1 col-span-1">
                {Object.entries(character.skills).slice(0, Math.ceil(Object.entries(character.skills).length / 2)).map(([skill, ranks]) => (
                  <li key={skill}>
                    {skill}{" "}
                    <span className="text-xs text-(--foreground)/50">
                      ({ranks} rang{ranks > 1 ? "s" : ""})
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="list-disc list-inside space-y-1 col-span-1">
                {Object.entries(character.skills).slice(Math.ceil(Object.entries(character.skills).length / 2)).map(([skill, ranks]) => (
                  <li key={skill}>
                    {skill}{" "}
                    <span className="text-xs text-(--foreground)/50">
                      ({ranks} rang{ranks > 1 ? "s" : ""})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full mt-4">
        {character.cultureEffects.languages?.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Langues</h3>
            <ul className="list-disc list-inside">
              {character.cultureEffects.languages.map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>
        )}

        {character.cultureEffects.skills?.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Compétences culturelles</h3>
            <ul className="list-disc list-inside">
              {character.cultureEffects.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {character.talents && character.talents.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Talents</h3>
            <ul className="list-disc list-inside">
              {character.talents.map((t) => (
                <li key={t.name}>
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {character.flaws && character.flaws.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Défauts</h3>
            <ul className="list-disc list-inside">
              {character.flaws.map((f) => (
                <li key={f.name}>
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
