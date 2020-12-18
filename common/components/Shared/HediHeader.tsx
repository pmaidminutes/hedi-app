import { ILanguageSwitchOption, LanguageSwitch } from "@/common/components";

import { Logo } from "@components";
import { LogInOut } from "@components";
import { Form } from "carbon-components-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchInput } from "../Search";

export interface HeaderProps {
  pageTitle: string;
  translations: ILanguageSwitchOption[];
  // TODO: remove when integrated in drupal
  colorClass?: string;
}
export const HediHeader: React.FunctionComponent<HeaderProps> = ({
  pageTitle,
  translations,
  // TODO: remove when integrated in drupal
  colorClass = "hedi-category-color--default",
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  return (
    <header className={`hedi-header ${colorClass}`}>
      <div className="bx--grid">
        <div className="bx--row py-s-sm">
          <div className="bx--col bx--col-sm-4 bx--col-md-8 bx--col-lg-4 pb-s-sm">
            <Logo />
          </div>
          <div className="bx--col-sm-4 bx--col-md-2 bx--col-lg-4 py-s-xs hedi-align-header-items">
            <div className="bx--form-item">
              <LanguageSwitch translations={translations} />
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
