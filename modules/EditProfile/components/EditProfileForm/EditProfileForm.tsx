import { FormEvent, useState } from "react";
import { Form, Button, InlineNotification } from "carbon-components-react";
import { EditProfileInputs } from "../EditProfileInputs";
import {
  IEditProfileInfo,
  IEditProfileLabels,
  IEditProfileRequest,
  IProfile,
} from "../../types";
import { IsIHTTPError } from "@/modules/common/error";
import useSWR from "swr";

function postProfile(url: string, profile: IProfile) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(profile),
  });
}

export function EditProfileForm({
  eagerValidate,
  labels,
  dataInput,
}: {
  eagerValidate?: boolean;
  labels?: IEditProfileLabels[];
  dataInput?: IEditProfileRequest | undefined;
}) {
  const [info, setInfo] = useState<IEditProfileInfo>();
  const [commit, setCommit] = useState(false);

  let data: IEditProfileRequest | undefined;
  let error: any;

  const response = data && !IsIHTTPError(data) ? data : undefined;

  useSWR(
    [info ? "/api/account/editProfile" : null, info?.profile],
    (url, profile) => postProfile(url, profile)
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommit(true);
  };

  const editProfileData = {
    infoLabels: labels,
    onChange: setInfo,
    errors: error,
    data: dataInput,
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={error.generic}
        />
      )}

      <EditProfileInputs {...editProfileData} />

      <Button type="submit" size="field">
        Submit
      </Button>
    </Form>
  );
}
