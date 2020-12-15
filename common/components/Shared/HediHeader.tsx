import { ILanguageSwitchOption, LanguageSwitch } from "@/common/components";
import { Search20 } from "@carbon/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchInput } from "../Search";

export interface HeaderProps {
  pageTitle: string;
  translations: ILanguageSwitchOption[];
}
export const HediHeader: React.FunctionComponent<HeaderProps> = ({
  pageTitle,
  translations,
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  return (
    <header className="hedi-header">
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col pb-s-sm">
            <h1>{pageTitle}</h1>
          </div>
          <div
            className="bx--col-sm-4 bx--col-md-2 bx--col-lg-4 py-s-xs"
            style={{ alignSelf: "center" }}>
            <div className="bx--form-item" style={{ alignItems: "flex-end" }}>
              <LanguageSwitch translations={translations} />
            </div>
          </div>
          <div
            className="bx--col bx--col-sm-4 bx--col-md-3 bx--col-lg-4 py-s-xs"
            style={{ alignSelf: "center" }}>
            <SearchInput
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
        </div>
      </div>
    </header>
  );
};
