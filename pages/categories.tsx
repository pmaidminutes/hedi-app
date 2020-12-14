import Head from "next/head";
import { getAllCategories } from "@/modules/editorial/category";
import { ICategory } from "@/modules/editorial/types/category";
import { GetStaticProps } from "next";
import { LogInOut } from "@/hedi-components/Authentication/LogInOut";
import { ModalStateManager as Modal } from "@components";

import { Content } from "carbon-components-react";

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  const categories = await getAllCategories(locale);

  return { props: { locales, locale, categories } };
};

interface ICategoriesProps {
  locales: string[];
  locale: string;
  categories: ICategory[];
}

export default function Categories({ categories }: ICategoriesProps) {
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <Content>
        <LogInOut />
        <Modal />
      </Content>
    </div>
  );
}
