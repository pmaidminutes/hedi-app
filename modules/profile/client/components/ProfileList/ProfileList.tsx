import { ITyped } from "@/modules/model";
import { SimplePageView } from "@/modules/simplePage/client/components";
import { ProfileListView } from "@/modules/profile/query";
import { ProfileListItem } from "./ProfileListItem";

export const TryProfileList = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  if (content.type !== "ProfileList") return null;
  return <ProfileList content={content as ProfileListView} />;
};

export const ProfileList = ({ content }: { content: ProfileListView }) => {
  const { elements } = content;
  return (
    <SimplePageView content={content} customKey="profile-list">
      {content.profiles.map(profile => (
        <ProfileListItem profile={profile} elements={elements} />
      ))}
    </SimplePageView>
  );
};
