import { ITyped } from "@/modules/model";
import { SimplePageView } from "@/modules/simplePage/client/components";
import type { ProfileListView } from "../../../server";
import { ProfileListItem } from "./ProfileListItem";
import { useProfileList } from "../../hooks/useProfileList";

export const TryProfileList = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  if (content.type !== "ProfileList") return null;
  return <ProfileList content={content as ProfileListView} />;
};

export const ProfileList = ({ content }: { content: ProfileListView }) => {
  const { data: profiles } = useProfileList(content.profiles, content.lang);

  const { elements } = content;
  return (
    <SimplePageView content={content} customKey="profile-list">
      {(profiles ?? content.profiles).map(profile => (
        <ProfileListItem
          profile={profile}
          elements={elements}
          key={profile.route}
        />
      ))}
    </SimplePageView>
  );
};
