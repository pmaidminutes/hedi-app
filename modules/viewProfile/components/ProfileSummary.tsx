import { IViewProfile } from "../types";
export const ProfileSummary = ({ content }: { content: IViewProfile }) => {
  const main = content.AppPage.elements;
  return <>{"Summary"} </>;
};
