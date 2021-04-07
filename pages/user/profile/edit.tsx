import React from "react";
import { GetStaticProps } from "next/types";

import { IPageProps } from "@/modules/shell/types";
import { getShell } from "@/modules/shell/query";
import { useShell } from "@/modules/shell/hooks";
import { Shell } from "@/modules/shell/components";

import { IEditProfileView } from "@/modules/editProfile/types";
import { getEditProfileStatic } from "@/modules/editProfile/query";
import { EditProfile } from "@/modules/editProfile/client/components";

export const getStaticProps: GetStaticProps<
  IPageProps<IEditProfileView>
> = async ({ locale }) => {
  const shellKeys = {
    header: ["editprofile", "viewprofile", "profiles", "userfeedback"],
    footer: ["imprint", "privacy"],
    userMenu: ["login", "logout", "viewprofile"],
  };

  const [content, shellData] = await Promise.all([
    getEditProfileStatic(locale ?? "de"),
    getShell(locale, shellKeys),
  ]);

  if (!content) {
    console.error("err");
    throw Error();
  }

  const shell = useShell(content, shellData);
  shell.useHeader = true;
  shell.redirectUnAuthorized = "/" + locale;
  return {
    props: { content, shell },
  };
};

export default function segments(props: IPageProps<IEditProfileView>) {
  const { content } = props;
  return (
    <Shell {...props}>
      <EditProfile content={content as IEditProfileView} />
    </Shell>
  );
}
