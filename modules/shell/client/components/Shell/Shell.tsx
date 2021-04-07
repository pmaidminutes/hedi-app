import { useEffect, useState } from "react";
import Head from "next/head";
import { Content, Loading } from "carbon-components-react";

import { IEntity } from "@/modules/model";
import { getUser } from "@/modules/auth/client";
import { ScrollToTop } from "../ScrollToTop";

import { Header, Footer } from "..";
import { IPageProps } from "../../../types";
import { checkAccess } from "../../../utils";
import { usePageAccess } from "./usePageAccess";

export const Shell: React.FC<IPageProps<IEntity>> = props => {
  const { content, shell, children } = props;
  const [hediStyle, setHediStyle] = useState("");
  const [user, isLoading] = getUser();
  const [hasHeader, setHasHeader] = useState(shell.useHeader === true);
  useEffect(() => {
    setHasHeader(checkAccess(!!user, shell.useHeader));
  }, [shell.useHeader, user?.name, isLoading]);

  useEffect(() => {
    setHediStyle(shell?.appstyle ?? "");
  }, [shell.appstyle]);

  const hasPageAccess = usePageAccess(shell?.redirectUnAuthorized);
  return (
    <div className={hediStyle}>
      <Head>
        <title>HEDI{content.label ? ` - ${content.label}` : null}</title>
      </Head>
      {hasPageAccess ? (
        <>
          {hasHeader ? <Header {...shell} /> : null}
          <Content>{children}</Content>
          <Footer {...shell} />
          <ScrollToTop />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
