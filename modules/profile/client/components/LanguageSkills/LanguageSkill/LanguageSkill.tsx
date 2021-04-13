import React from "react";
import { transformLanguageSkill } from "./transformLanguageSkill";
import { Rating } from "@/modules/common/components";
import { ILanguageSkillProps } from ".";

export const LanguageSkill = (props: ILanguageSkillProps) => {
  const { label, level } = transformLanguageSkill(props);
  return (
    <tr>
      <td>{label}</td>
      <td>
        <Rating level={level} />
      </td>
    </tr>
  );
};
