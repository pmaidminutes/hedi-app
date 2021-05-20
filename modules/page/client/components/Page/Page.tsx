import {
  findGroupInstance,
  isButton,
  isGroup,
  isLabel,
  isTextInput,
} from "@/modules/model/components";
import { IPage } from "@/modules/page/types";
import React from "react";
// import {
//   Button,
//   Label,
//   TextInput,
//   EditProfile,
//   Login,
// } from "@/modules/common/components";

export const Page = ({ content }: { content: IPage }) => {
  const { id } = content;
  const { components } = content;

  // const pageSwitch = (pageId: string) => {
  //   switch (pageId) {
  //     case "editProfile":
  //       return <EditProfile content={content} />;
  //     case "login":
  //       return <Login content={content} />;
  //     default:
  //       return <div>Muh</div>;
  //   }
  // };

  // const mainColumn = findGroupInstance(components, "main");
  return (
    <section>
      {/* {pageSwitch(id)} */}
      {/* {mainColumn &&
        mainColumn.components.map(component => {
          if (isTextInput(component)) {
            return <TextInput {...component} />;
          }
          if (isLabel(component)) return <Label {...component} />;
          if (isButton(component)) return <Button {...component} />;
          if (isGroup(component) && component.id === "lastChild")
            return <Group {...component} />;
        })} */}
    </section>
  );
};
