import Head from "next/head";
import { Content, Loading } from "carbon-components-react";
import { transformShell } from "./transformShell";
import { useShell } from "./useShell";
import { IEntity } from "@/modules/model";
import { ScrollToTop } from "../ScrollToTop";

import { Header, Footer } from "..";
import { IPageProps } from "../../../types";

export const Shell: React.FC<IPageProps<IEntity>> = props => {
  const { content, shell, children } = props;
  const { label } = transformShell(content);
  const { hasPageAccess, hediStyle, hasHeader, pageLayout } = useShell(shell);

  return (
    <div className={hediStyle}>
      <Head>
        <title>HEDI{label ? ` - ${label}` : null}</title>
      </Head>
      {hasPageAccess ? (
        <>
          {hasHeader ? <Header {...shell} /> : null}
          <Content>
            {pageLayout ? (
              <div className={pageLayout}>{children}</div>
            ) : (
              <>{children}</>
            )}
          </Content>
          <Footer {...shell} />
          <ScrollToTop />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
