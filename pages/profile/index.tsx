import useSWR from "swr";
import { Content } from "carbon-components-react";
import { getUser, LogInOut } from "@/modules/auth/client";
import { GetStaticProps } from "next";

import { EditProfileForm } from "@/modules/editProfile/components";
import { jsonFetcher } from "@/modules/common/utils";
import { getProfileField } from "@/modules/editProfile/query";
import { IEditProfileResponse } from "@/modules/editProfile/types";

export const getStaticProps: GetStaticProps<any> = async ({
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
  const { data, error } = useSWR(
    user ? "/api/account/editProfile" : null,
    url => jsonFetcher<any>(url)
  );

  return (
    <div>
      <Content>
        <LogInOut />
        {error ? (
          <div> An error occurred here. Please try again .... </div>
        ) : !data || !(data as IEditProfileResponse)?.success ? (
          <div> permission is required. </div>
        ) : (
          <EditProfileForm
            infoLabels={labels}
            data={data.profile}></EditProfileForm>
        )}
      </Content>
    </div>
  );
}
