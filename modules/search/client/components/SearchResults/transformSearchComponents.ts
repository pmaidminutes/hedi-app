import {
  findLabelInstance,
  findInlineNotificationInstance,
} from "@/modules/components";
import { ISearchResultProps } from "./useSearchResults";

export function transformSearchComponents(props: ISearchResultProps) {
  const { components } = props;

  const resultsHeadline = findLabelInstance(components, "headline");
  const errorToastMessage = findInlineNotificationInstance(
    components,
    "searchError"
  );
  return { resultsHeadline, errorToastMessage };
}
