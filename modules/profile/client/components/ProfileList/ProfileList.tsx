import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { IProfileEntry } from "../../../types";
import { getProfileEntryDefinition, ProfileEntryLink } from "../ProfileEntry";
import { useProfileList } from "./useProfileList";

export type ProfileListView = IPage & {
  profileEntries: IProfileEntry[];
};

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

  const profileEntryDefinition = getProfileEntryDefinition(content.components);
  return (
    <>
      {(profileEntries ?? content.profileEntries).map(profileEntry => (
        <ProfileEntryLink
          {...profileEntry}
          {...profileEntryDefinition}
          key={profileEntry.route}
        />
      ))}
    </>
  );
};
