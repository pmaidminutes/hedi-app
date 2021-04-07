import React from "react";
import {
  ILanguageSkillsProps,
  transfromLanguageSkills,
} from "./transformLanguageSkills";
import { Tile } from "carbon-components-react";
import { LanguageSkill } from "./LanguageSkill";

export const LanguageSkills = (props: ILanguageSkillsProps) => {
  const { languageSkills, headline } = transfromLanguageSkills(props);
  if (!languageSkills?.length) return null;
  return (
    <section className="hedi--language-skills hedi--profile--tile">
      <Tile>
        <h3>{headline}</h3>
        <table>
          <tbody>
            {languageSkills.map((skill, index) => (
              <LanguageSkill
                key={index + skill.language.label}
                languageSkill={skill}
              />
            ))}
          </tbody>
        </table>
      </Tile>
    </section>
  );
};
