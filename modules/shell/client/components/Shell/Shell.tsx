import Head from "next/head";
import { Content, Loading } from "carbon-components-react";
import { transformShell } from "./transformShell";
import { useShell } from "./useShell";
import { ScrollToTop } from "../ScrollToTop";
import { Layout } from "../Layout";

import { Header, Footer } from "..";
import { IPageProps } from "../../../types";
import { IAppPage } from "@/modules/common/types";

export const Shell: React.FC<IPageProps<IAppPage>> = props => {
  const { content, shell, children } = props;
  const { label } = transformShell(content);
  const { hasPageAccess, hediStyle, hasHeader, pageLayout, layout } = useShell(
    shell
  );

  return (
    <div className={hediStyle}>
      <Head>
        <title>HEDI{label ? ` - ${label}` : null}</title>
      </Head>
      {hasPageAccess ? (
        <>
          {hasHeader ? <Header {...shell} /> : null}
          <Content>
            {pageLayout && layout ? (
              <Layout layout={layout} content={content}>
                {children}
              </Layout>
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
