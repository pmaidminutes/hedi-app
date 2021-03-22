import React from "react";
import { IWithLanguageSkills } from "@/modules/model";
import { Tile } from "carbon-components-react";
import { LanguageSkill } from "./LanguageSkill";
export const LanguageSkills = ({ languageSkills }: IWithLanguageSkills) => {
  return (
    <section className="hedi__language-skills">
      <Tile>
        {/* TODO von appages holen */}
        <h3>Sprachen</h3>
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
