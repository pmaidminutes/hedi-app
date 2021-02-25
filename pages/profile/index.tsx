import useSWR from "swr";
import { Content } from "carbon-components-react";
import { getUser, LogInOut } from "@/modules/auth/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { ISegmentParam } from "@/modules/editorial/types";
import { EditProfileForm } from "@/modules/EditProfile/components";
import { jsonFetcher } from "@/modules/common/utils";
import { IEditProfileLabels } from "@/modules/EditProfile/types";
import { GetProfileField } from "@/modules/EditProfile/query";


export const getStaticProps: GetStaticProps<
  any,
  ISegmentParam
> = async ({ params, locale }) => {
  let content;
  content =  await GetProfileField(["profile", "profile_parent", "profile_caregiver", "profile_midwife"], locale);
  return {
    props: {  content  },
  };


}; 

export default function EditProfilePage({content}: {content:IEditProfileLabels[]}) {
  const [user, loading] = getUser();
 const { data, error } =  useSWR(user ? '/api/account/editProfile' : null, url => jsonFetcher<any>(url));


  return (
    <div>
      <Content>
        <LogInOut />
         { data && <EditProfileForm labels={content} eagerValidate= {false} dataInput={data}></EditProfileForm> }
      </Content>
    </div>
  );
}
