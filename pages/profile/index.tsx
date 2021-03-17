import { Content } from "carbon-components-react";
import { getUser, LogInOut } from "@/modules/auth/client";
import { GetStaticProps } from "next";
import { ISegmentParam } from "@/modules/common/types";
import { EditProfile } from "@/modules/editProfile/components";
import { getProfileField } from "@/modules/editProfile/query";

export const getStaticProps: GetStaticProps<any, ISegmentParam> = async ({
  params,
  locale,
}) => {
  let labels;
  labels = await getProfileField(locale);
  return {
    props: { labels },
  };
};

export default function EditProfilePage({
  labels,
}: {
  labels: { [key: string]: string };
}) {
  const [user] = getUser();

  return (
    <div>
      <Content>
        <LogInOut />
        {!user ? (
          <div> permission is required. </div>
        ) : (
          <EditProfile infoLabels={labels} lang="de" />
        )}
      </Content>
    </div>
  );
}
