import React from "react";
import { transformLanguageSkill } from "./transformLanguageSkill";
import { Rating } from "@/modules/common/components";
import { ILanguageSkill } from "@/modules/model";

export const LanguageSkill = (props: { languageSkill: ILanguageSkill }) => {
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
