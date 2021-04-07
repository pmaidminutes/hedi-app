import React from "react";
import {
  transformLanguageSkill,
  ILanguageSkillProps,
} from "./transformLanguageSkill";
import { Rating } from "@/modules/common/components";

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
