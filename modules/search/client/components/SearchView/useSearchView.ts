import { IsIErrorResponse } from "@/modules/common/error";
import {
  findGroupInstance,
  ILabelComponent,
  isLabel,
} from "@/modules/components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSearch } from "../../hooks";
// const filterTypes = ["articles", "categories", "glossary"];

export interface ISearchProps {
  // TODO type after removing app page
  content: any;
}
export function useSearchView(props: ISearchProps) {
  //TODO pick it up from env file for now 5kms around
  const [distance, setDistance] = useState("5");
  const [location, setLocation] = useState("");

  const locations: Location[] = [];

  const handleLocation = async (typedLocation: string) => {
    const typedAddress = typedLocation.replace(/\s/g, "+");
    setLocation(typedAddress);
  };

  const handleDistanceChange = (value: number) => {
    setDistance(value.toString());
  };

  let initialQueryText = "";
  const router = useRouter();
  const { segments } = router.query;

  if (Array.isArray(segments) && segments.length > 1) {
    const path = [...segments];
    path.shift(); // discard 'search' or 'suche' etc
    initialQueryText = path.join(" ");
  }

  const [queryText, setQueryText] = useState(initialQueryText);
  useEffect(() => {
    setQueryText(initialQueryText);
  }, [initialQueryText]);

  const handleQueryChanged = (e: string) => {
    setQueryText(e.trim());
  };

  const [filter, setFilter] = useState("");

  const handleFilter = (filterText: string) => {
    setFilter(filterText);
  };

  const {
    content,
    content: { components },
  } = props;

  let loading = true;

  const locale = router.locale ?? "de";
  const { defaultLocale } = router;

  const filterTypes = findGroupInstance(components, "filter");

  let filterLabel: ILabelComponent[] = [];
  if (filterTypes)
    filterTypes.components.forEach(a => {
      if (isLabel(a)) filterLabel.push(a);
    });

  const { data, error } = useSearch(
    queryText,
    locale,
    location,
    distance,
    filter
  );

  if (error) {
    console.log("for now error");
  } else if (IsIErrorResponse(data)) {
    // errorMessage?.text = data.errors.http ?? `Try again`;
  } else {
    loading = false;
  }

  // console.log({ data }, { initialQueryText });

  return {
    handleFilter,
    handleQueryChanged,
    initialQueryText,
    loading,
    data: data ?? null,
    components,
    locale,
    defaultLocale,
    content,
    handleLocation,
    locations,
    handleDistanceChange,
    filterTypes: filterLabel,
  };
}
