import { ITyped } from "@/modules/model";
import type { ProfileListView } from "../../../server";
import { ProfileEntryLink } from "../ProfileEntry";
import { useProfileList } from "./useProfileList";

export const TryProfileList = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  if (content.type !== "ProfileList") return null;
  return <ProfileList content={content as ProfileListView} />;
};

export const ProfileList = ({ content }: { content: ProfileListView }) => {
  const { data: profileEntries } = useProfileList(
    content.profileEntries,
    content.lang
  );

  const { components } = content;
  return (
    <>
      {(profileEntries ?? content.profileEntries).map(profileEntry => (
        <ProfileEntryLink
          {...profileEntry} //append title components
          key={profileEntry.route}
        />
      ))}
    </>
  );
};
