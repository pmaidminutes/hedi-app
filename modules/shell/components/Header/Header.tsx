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
import {
  FormItem,
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from "carbon-components-react";
import {
  Language32,
  Search32,
  Login32,
  Logout32,
  Menu32,
} from "@carbon/icons-react";

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
  const { locale } = router;
  const [searchText, setSearchText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CarbonHeader className={`hedi-header ${appstyle}`} aria-label="header">
      <HeaderName prefix="" href={`/${locale}`}>
        ♥ Hedi
      </HeaderName>
      <HeaderGlobalBar>
        {/* <HeaderGlobalAction aria-label="Search">

        </HeaderGlobalAction> */}
        <HeaderGlobalAction
          aria-label="Slide In Menu"
          onClick={() => setIsExpanded(prev => !prev)}>
          <Menu32 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel Language" expanded={isExpanded}>
        <LogInOut />

        {translations !== undefined ? (
          <LanguageSwitch translations={translations} />
        ) : null}
        <Form
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
      </HeaderPanel>
    </CarbonHeader>
  );
};
