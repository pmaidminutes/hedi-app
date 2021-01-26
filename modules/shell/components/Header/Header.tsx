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
      <div className="bx--grid">
        <div className="bx--row py-s-sm">
          <div className="bx--col bx--col-sm-4 bx--col-md-8 bx--col-lg-4 pb-s-sm">
            <Logo />
          </div>
          <div className="bx--col-sm-4 bx--col-md-2 bx--col-lg-4 py-s-xs hedi-align-header-items">
            <div className="bx--form-item">
              {translations !== undefined ? (
                <LanguageSwitch translations={translations} />
              ) : null}
            </div>
          </div>

          <div className="bx--col bx--col-sm-3 bx--col-md-3 bx--col-lg-4 py-s-xs hedi-align-header-items">
            <Form
              // TODO: remove inline Style
              style={{ position: "relative" }}
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
          </div>
          <div className="bx--col bx--col-sm-3 bx--col-md-3 bx--col-lg-4 py-s-xs hedi-align-header-items">
            <LogInOut />
          </div>
        </div>
      </div>
    </header>
  );
};
