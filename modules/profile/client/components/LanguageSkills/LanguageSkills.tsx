import React from "react";
import { ILanguageSkillsProps, useLanguageSkills } from "./useLanguageSkills";
import { Tile } from "carbon-components-react";
import { LanguageSkill } from "./LanguageSkill";

export const LanguageSkills = (props: ILanguageSkillsProps) => {
  const { languageSkills, headline } = useLanguageSkills(props);
  if (!languageSkills?.length) return null;
  return (
    <section className="hedi--language-skills">
      <Tile>
        <h3>{headline}</h3>
        <table>
          <tbody>
            {languageSkills.map((skill, index) => (
              // TODO other key
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
