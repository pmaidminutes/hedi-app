import { ITyped } from "@/modules/model";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { ProfileListView } from "@/modules/profile/query";
import { ProfileListItem } from "./ProfileListItem";
import { useRouter } from "next/router";
import { useProfileList } from "../../hooks/useProfileList";
import { segmentsToRoute } from "@/modules/common/utils";

export const TryProfileList = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  if (content.type !== "ProfileList") return null;
  return <ProfileList content={content as ProfileListView} />;
};

export const ProfileList = ({ content }: { content: ProfileListView }) => {
  const {
    query: { segments },
    locale,
  } = useRouter();

  const routePath = segmentsToRoute(
    segments && Array.isArray(segments) ? segments : [],
    locale ?? "de"
  );

  const { data } = useProfileList(content as ProfileListView, routePath);

  const { elements } = content;
  return (
    <SimplePageView content={content} customKey="profile-list">
      {(data ? data : content).profiles.map(profile => (
        <ProfileListItem profile={profile} elements={elements} />
      ))}
    </SimplePageView>
  );
};
