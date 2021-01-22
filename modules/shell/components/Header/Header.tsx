import { useState } from "react";
import { useRouter } from "next/router";
import { Form } from "carbon-components-react";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { LogInOut } from "@/modules/auth/client";
import { SearchInput } from "@/modules/search/client/components";
import { LanguageSwitch } from "../LanguageSwitch";
import { Logo } from "../Logo";
import { Grid, Row, Column, FormItem } from "carbon-components-react";

type HeaderProps = Pick<
  IEntityTranslated<IEntityLocalized>,
  "label" | "translations"
> &
  Partial<IAppStyled>;

export const Header: React.FunctionComponent<HeaderProps> = ({
  label,
  translations,
  appstyle = "hedi-category-color--default",
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  return (
    <header className={`hedi-header ${appstyle}`}>
      <Grid>
        <Row className="py-s-sm">
          <Column sm={4} md={8} lg={4} className="pb-s-sm">
            <Logo />
          </Column>

          <Column
            sm={4}
            md={2}
            lg={4}
            className="py-s-xs hedi-align-header-items">
            <FormItem>
              <LanguageSwitch translations={translations} />
            </FormItem>
          </Column>

          <Column
            sm={3}
            md={3}
            lg={4}
            className="py-s-xs hedi-align-header-items">
            <Form
              className="hedi-pos-rel"
              onSubmit={e => {
                router.push("/search/" + searchText);
                e.preventDefault();
              }}>
              <SearchInput
                size={"sm"}
                onQueryChanged={e => setSearchText(e)}
                id={"search-header"}
                query={searchText}
              />
            </Form>
          </Column>
          <Column
            sm={3}
            md={3}
            lg={4}
            className="py-s-xs hedi-align-header-items">
            <LogInOut />
          </Column>
        </Row>
      </Grid>
    </header>
  );
};
