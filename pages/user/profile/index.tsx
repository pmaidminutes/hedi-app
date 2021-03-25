import { GetStaticProps } from "next";

import { IPageProps } from "@/modules/shell/types";
import { getShell } from "@/modules/shell/query";
import { useShell } from "@/modules/shell/hooks";
import { Shell } from "@/modules/shell/components";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Column } from "carbon-components-react";

import { IAppPage } from "@/modules/common/types/appPage";
import { tryGet } from "@/modules/common/utils";
import { getUser } from "@/modules/auth/client";
import { getProfileStatic } from "@/modules/profile/query";
import { getCurrentUserProfile } from "@/modules/profile/request/getCurrentUserProfile";
import { SimplePageView } from "@/modules/simplePage/client/components";

export const getStaticProps: GetStaticProps<IPageProps<IAppPage>> = async ({
  locale,
}) => {
  const shellKeys = {
    header: ["editprofile", "viewprofile", "profiles", "userfeedback"],
    footer: ["imprint", "privacy"],
  };

  const [content, shellConfig] = await Promise.all([
    getProfileStatic(locale ?? "de"),
    getShell(locale, shellKeys),
  ]);

  if (!content) {
    console.error("err");
    throw Error();
  }

  const shell = useShell(content, shellConfig);

  return {
    props: { content, shell },
  };
};

export default function myProfile(props: IPageProps<IAppPage>) {
  const { content } = props;
  const router = useRouter();
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileIsLoading] = getCurrentUserProfile(
    user,
    content.lang
  );
  useEffect(() => {
    if (!userIsLoading && !user) router.push("/" + content.lang);
    if (!currentProfileIsLoading && currentProfile)
      router.push(currentProfile.route);
  }, [
    user?.name,
    userIsLoading,
    currentProfile?.route,
    currentProfileIsLoading,
  ]);
  const noProfileElement = tryGet("no_profile", content.elements);
  content.longTitle = "";
  content.label = "";
  content.body = noProfileElement?.description ?? "";
  return (
    <Shell {...props}>
      {!userIsLoading && user && (
        <SimplePageView
          url="/Pregnancy_pink80.svg"
          alt="Beschreibung des Bildes"
          content={content}>
          <Column lg={8} md={6}>
            <Button href={"/" + content.lang + "/user/profile/edit"}>
              {noProfileElement?.value}
            </Button>
          </Column>
        </SimplePageView>
      )}
    </Shell>
  );
}
