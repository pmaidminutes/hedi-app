import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
// Modules
import { ILanguage, getAllLanguages } from "@/modules/editorial/languages";
// Components
import { LanguageSwitch, CustomSideNavLink } from "@/common/components";
import {
  Content,
  SideNav,
  ListItem,
  SideNavLink,
} from "carbon-components-react";

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  const languages = await getAllLanguages(locale);

  return { props: { locales, locale, languages } };
};

interface IIndexProps {
  locales: string[];
  locale: string;
  languages: ILanguage[];
}

export default function Index({ locales, locale, languages }: IIndexProps) {
  const router = useRouter();
  const { defaultLocale, pathname } = router;

  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side Navigation">
        <ListItem>
          <LanguageSwitch />
        </ListItem>
        <ListItem>This link wont work with language transition</ListItem>
        <SideNavLink href="/en/chat">Chat</SideNavLink>
        <ListItem>This link will</ListItem>
        <CustomSideNavLink href="/chat">Chat</CustomSideNavLink>
      </SideNav>
      <Content>
        <h1>HEDI App</h1>
        <p>HEDI App index, up and running</p>
        <p>{pathname}</p>
        <p>Current locale: {locale}</p>
        <p>Default locale: {defaultLocale}</p>
        <p>Configured locales: {JSON.stringify(locales)}</p>
        {languages.length > 0 ? (
          <div>
            <p>In drupal are the following languages available</p>
            <ul>
              {languages.map((language, index) => (
                <li key={index}>{language.translatedName}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Content>
    </div>
  );
}
