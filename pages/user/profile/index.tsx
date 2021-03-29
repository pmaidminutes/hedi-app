import { GetStaticProps } from "next";
import Link from "next/link";

import { IPageProps } from "@/modules/shell/types";
import { getShell } from "@/modules/shell/query";
import { useShell } from "@/modules/shell/hooks";
import { Shell } from "@/modules/shell/components";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Column, Row } from "carbon-components-react";

import { IAppPage } from "@/modules/common/types/appPage";
import { getUser } from "@/modules/auth/client";
import { getProfileStatic } from "@/modules/profile/query";
import { useCurrentProfileEntity } from "@/modules/profile/client/hooks";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { IShellLink } from "@/modules/shell/types/shellLinks";

export interface INoProfileView extends IAppPage {
  links: IShellLink[];
}

export const getStaticProps: GetStaticProps<
  IPageProps<INoProfileView>
> = async ({ locale }) => {
  const shellKeys = {
    header: ["editprofile", "viewprofile", "profiles", "userfeedback"],
    footer: ["imprint", "privacy"],
    userMenu: ["login", "logout", "viewprofile"],
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
  shell.useHeader = "AUTHORIZED";
  shell.redirectUnAuthorized = "/" + locale;
  const withLinks: INoProfileView = {
    ...content,
    links: [],
  };
  const editProfileLink = shell.header?.find(l => l.key === "editprofile");
  if (editProfileLink) withLinks.links.push(editProfileLink);
  return {
    props: { content: withLinks, shell },
  };
};

export default function myProfile(props: IPageProps<INoProfileView>) {
  const { content } = props;
  const router = useRouter();
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileIsLoading] = useCurrentProfileEntity(
    user,
    content.lang
  );
  useEffect(() => {
    if (!currentProfileIsLoading && currentProfile)
      router.push(currentProfile.route);
  }, [
    user?.name,
    userIsLoading,
    currentProfile?.route,
    currentProfileIsLoading,
  ]);
  const editLink = content.links.find(l => l.key === "editprofile");
  const editLinkHref = editLink?.route ?? `/${content.lang}/user/profile/edit`;
  const editLinkLabel = editLink?.longTitle ?? editLink?.label;
  return (
    <Shell {...props}>
      {!userIsLoading && user && (
        <SimplePageView
          url="/Pregnancy_pink80.svg"
          alt="Beschreibung des Bildes"
          content={content}
          rightColumnProps={{ md: 4, lg: 6, xlg: 6 }}>
          <Row>
            <Column>
              <Link href={editLinkHref} passHref>
                <Button>{editLinkLabel}</Button>
              </Link>
            </Column>
          </Row>
        </SimplePageView>
      )}
    </Shell>
  );
}
