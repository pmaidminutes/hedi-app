import { ILanguageSwitchOption, LanguageSwitch } from "@/common/components";
import { Search20 } from "@carbon/icons-react";
import { LogInOut } from "@components";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchInput } from "../Search";

export interface HeaderProps {
  pageTitle: string;
  translations: ILanguageSwitchOption[];
  // TODO: remove when integrated in drupal
  colorClass: string;
}
export const HediHeader: React.FunctionComponent<HeaderProps> = ({
  pageTitle,
  translations,
   // TODO: remove when integrated in drupal
  colorClass
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  return (
    <header className={`hedi-header ${colorClass}`}>
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col bx--col-sm-4 bx--col-md-8 bx--col-lg-6 pb-s-sm">
            <h1>{pageTitle}</h1>
          </div>
          <div className="bx--col-sm-4 bx--col-md-2 bx--col-lg-4 py-s-xs hedi-align-header-items">
            <div className="bx--form-item">
              <LanguageSwitch translations={translations} />
            </div>
          </div>

          <div className="bx--col bx--col-sm-4 bx--col-md-3 bx--col-lg-4 py-s-xs hedi-align-header-items">
            <SearchInput size={"sm"}
              inputText={e => setSearchText(e)}
              textTyped={searchText}
            />
          </div>
          <Search20
            style={{ position: "relative", alignSelf: "center" }}
            id="se-id"
            onClick={() =>
              router.push({ pathname: "/search", query: { searchText } })
            }
          />
          <div className="bx--col hedi-align-header-items">
            <LogInOut />
          </div>
        </div>
      </div>
    </header>
  );
};
