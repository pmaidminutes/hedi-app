import { getUser } from "@/modules/auth/client";
import { getCurrentUserProfile } from "@/modules/profile/request/getCurrentUserProfile";
import { useRouter } from "next/router";
import { tryGet } from "@/modules/common/utils";
import {
  Button,
  ButtonSet,
  Column,
  FormLabel,
  Row,
} from "carbon-components-react";
import { useEffect } from "react";
import { IAppPage } from "@/modules/common/types/appPage";
import { GetStaticProps } from "next";
import { getProfileStatic } from "@/modules/profile/query";
import { Footer, Header } from "@/modules/shell/components";
import { Content } from "carbon-components-react";
import Head from "next/head";

interface IMyProfileProps {
  content: IAppPage;
  locale: string;
}
export const getStaticProps: GetStaticProps<IMyProfileProps> = async ({
  locale,
}) => {
  locale = locale ?? "de";
  const content = await getProfileStatic(locale);
  if (!content) {
    console.error("err");
    throw Error();
  }

  return {
    props: { content, locale },
  };
};

export default function myProfile({ locale, content }: IMyProfileProps) {
  const router = useRouter();
  const [user, userIsLoading] = getUser();
  const [currentProfile, currentProfileIsLoading] = getCurrentUserProfile(
    user,
    locale
  );
  useEffect(() => {
    if (!userIsLoading && !user) router.push("/" + locale);
    if (!currentProfileIsLoading && currentProfile)
      router.push(currentProfile.route);
  }, [
    user?.name,
    userIsLoading,
    currentProfile?.route,
    currentProfileIsLoading,
  ]);
  const noProfileElement = tryGet("no_profile", content.elements);

  return (
    <div>
      <Head>
        <title>HEDI - {content.label}</title>
      </Head>
      <Header {...content} />
      <Content>
        {!userIsLoading && user && (
          <Row>
            <Column>
              <ButtonSet stacked>
                <FormLabel>{noProfileElement?.description}</FormLabel>
                <Button href={"/" + locale + "/user/profile/edit"}>
                  {noProfileElement?.value}
                </Button>
              </ButtonSet>
            </Column>
          </Row>
        )}
      </Content>
      <Footer />
    </div>
  );
}
