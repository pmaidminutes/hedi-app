import { useEffect, useState } from "react";
import Head from "next/head";
import { Content } from "carbon-components-react";

import { IEntity } from "@/modules/model";
import { ScrollToTop } from "../ScrollToTop";

import { Header, Footer } from "..";
import { IPageProps } from "../../types";

export const Shell: React.FC<IPageProps<IEntity>> = props => {
  const { content, shell, children } = props;
  const [hediStyle, setHediStyle] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  useEffect(() => {
    setHasHeader(shell.useHeader ?? true);
  }, [shell.useHeader]);

  useEffect(() => {
    setHediStyle(shell?.appstyle ?? "");
  }, [shell.appstyle]);

  return (
    <div className={hediStyle}>
      <Head>
        <title>HEDI{content.label ? ` - ${content.label}` : null}</title>
      </Head>
      {hasHeader ? <Header {...shell} /> : null}
      <Content>{children}</Content>
      <Footer {...shell} />
      <ScrollToTop />
    </div>
  );
};
