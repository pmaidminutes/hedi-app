import {
  Form,
  Button,
  FormGroup,
  Column,
  Row,
  TextInput,
  Toggle,
  InlineNotification,
  FormProps,
  InlineLoading,
} from "carbon-components-react";
import { IUIElementTexts } from "@/modules/model";
import { getTextInputProps } from "@/modules/common/utils";
import { IUpsertProfile } from "../types";

type ProfileTypes = "Parent" | "Caregiver" | "Midwife";

type UIElementMap = {
  main: IUIElementTexts[];
} & Record<ProfileTypes, IUIElementTexts[]>;

type EditProfileInputProps = FormProps & {
  uiElementMap: UIElementMap;
  data: IUpsertProfile;
  isValidating?: boolean;
};

export const EditProfileForm = ({
  uiElementMap,
  data: { success, errors, profile },
  isValidating,
  ...formProps
}: EditProfileInputProps) => {
  return (
    <Form {...formProps}>
      {errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={errors.generic}
        />
      )}

      <FormGroup legendText="Name">
        <Row>
          <Column>
            <TextInput
              {...getTextInputProps("prefix", uiElementMap.main)}
              name="prefix"
              invalid={!!errors?.prefix}
              invalidText={errors?.prefix}
              defaultValue={profile?.prefix}
            />
          </Column>
          <Column>
            <TextInput
              {...getTextInputProps("forename", uiElementMap.main)}
              name="forename"
              invalid={!!errors?.forename}
              invalidText={errors?.forename}
              defaultValue={profile?.forename}
            />
          </Column>
          <Column>
            <TextInput
              {...getTextInputProps("surname", uiElementMap.main)}
              name="surname"
              invalid={!!errors?.surname}
              invalidText={errors?.surname}
              defaultValue={profile?.surname}
            />
          </Column>
          <Column>
            <TextInput
              {...getTextInputProps("suffix", uiElementMap.main)}
              name="suffix"
              invalid={!!errors?.suffix}
              invalidText={errors?.suffix}
              defaultValue={profile?.suffix}
            />
          </Column>
        </Row>
      </FormGroup>
      <FormGroup legendText="Address">
        <Row>
          <Column>
            <TextInput
              {...getTextInputProps("street", uiElementMap.main)}
              name="street"
              invalid={!!errors?.street}
              invalidText={errors?.street}
              defaultValue={profile?.street}
            />
          </Column>
          <Column>
            <TextInput
              {...getTextInputProps("house_number", uiElementMap.main)}
              name="house_number"
              invalid={!!errors?.house_number}
              invalidText={errors?.house_number}
              defaultValue={profile?.house_number}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInput
              {...getTextInputProps("postal_code", uiElementMap.main)}
              name="postal_code"
              invalid={!!errors?.postal_code}
              invalidText={errors?.postal_code}
              defaultValue={profile?.postal_code}
            />
          </Column>
          <Column>
            <TextInput
              {...getTextInputProps("city", uiElementMap.main)}
              name="city"
              invalid={!!errors?.city}
              invalidText={errors?.city}
              defaultValue={profile?.city}
            />
          </Column>
        </Row>

        <TextInput
          {...getTextInputProps("mail", uiElementMap.main)}
          name="mail"
          invalid={!!errors?.mail}
          invalidText={errors?.mail}
          defaultValue={profile?.mail}
          required
        />
        <TextInput
          {...getTextInputProps("phone", uiElementMap.main)}
          name="phone"
          invalid={!!errors?.phone}
          invalidText={errors?.phone}
          defaultValue={profile?.phone}
        />
      </FormGroup>

      {profile?.profile_type === "Caregiver" ? (
        <FormGroup legendText="Caregiver">
          <TextInput
            {...getTextInputProps("room", uiElementMap.Caregiver)}
            name="room"
            invalid={!!errors?.room}
            invalidText={errors?.room}
            defaultValue={profile?.room}
          />
          <TextInput
            {...getTextInputProps("website", uiElementMap.Caregiver)}
            name="website"
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={profile?.website}
          />
          <TextInput
            {...getTextInputProps("consultation_hours", uiElementMap.Caregiver)}
            name="consultation_hours"
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={profile?.consultation_hours}
          />
        </FormGroup>
      ) : null}

      {profile?.profile_type === "Parent" ? (
        <FormGroup legendText="Parent">
          <Toggle
            id="first_pregnancy"
            name="first_pregnancy"
            labelText={
              getTextInputProps(
                "first_pregnancy",
                uiElementMap.Parent
              )?.labelText.toString() ?? ""
            }
            defaultToggled={profile?.first_pregnancy ?? false}
          />
        </FormGroup>
      ) : null}

      {profile?.profile_type === "Midwife" ? (
        <FormGroup legendText="Midwife">
          <TextInput
            {...getTextInputProps("phone_private", uiElementMap.Midwife)}
            name="phone_private"
            invalid={!!errors?.phone_private}
            invalidText={errors?.phone_private}
            defaultValue={profile?.phone_private}
          />
          <TextInput
            {...getTextInputProps("website", uiElementMap.Midwife)}
            name="website"
            invalid={!!errors?.website}
            invalidText={errors?.website}
            defaultValue={profile?.website}
          />
          <TextInput
            {...getTextInputProps("website", uiElementMap.Midwife)}
            name="consultation_hours"
            invalid={!!errors?.consultation_hours}
            invalidText={errors?.consultation_hours}
            defaultValue={profile?.consultation_hours}
          />
        </FormGroup>
      ) : null}

      {isValidating ? (
        <InlineLoading status="active" />
      ) : (
        <Button type="submit">Submit</Button>
      )}
    </Form>
  );
};
