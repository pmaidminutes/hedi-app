import { useState } from "react";
import { useRouter } from "next/router";
import { Search32, Close32 } from "@carbon/icons-react";
import { Button, Form } from "carbon-components-react";
import { SearchInput } from "@/modules/search/client/components";

// UNUSED
export const GlobalSearchMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Button
        renderIcon={isVisible ? Close32 : Search32}
        iconDescription="Icon Description"
        hasIconOnly
        onClick={() => setIsVisible(prev => !prev)}
      />
      <Form
        style={{ width: "100%" }}
        onSubmit={e => {
          router.push("/search/" + searchText);
          e.preventDefault();
        }}
        className={isVisible ? "" : "hidden"}>
        <SearchInput
          onQueryChanged={e => setSearchText(e)}
          id={"search-header"}
          query={searchText}
        />
      </Form>
    </>
  );
};
