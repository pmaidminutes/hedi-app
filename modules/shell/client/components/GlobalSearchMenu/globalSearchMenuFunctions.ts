import React, { useState } from "react";
import { useRouter } from "next/router";

export function globalSearchMenuFunctions() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (query: string) => {
    setSearchText(query);
  };

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/search/" + searchText);
  };

  return {
    searchText,
    handleSearchInput,
    handleSearchSubmit,
  };
}
