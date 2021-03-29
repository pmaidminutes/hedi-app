import React from "react";
import { useLanguageSkill, ILanguageSkillProps } from "./useLanguageSkill";
import { Rating } from "@/modules/common/components";

export const LanguageSkill = (props: ILanguageSkillProps) => {
  const { label, level } = useLanguageSkill(props);
  return (
    <tr>
      <td>{label}</td>
      <td>
        <Rating level={level} />
      </td>
    </tr>
  );
};
