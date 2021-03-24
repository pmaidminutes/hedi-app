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
  TextArea,
  ContentSwitcher,
  Switch,
  SelectableTile,
} from "carbon-components-react";
import {
  getTextInputProps,
  hasElement,
  tryGetValue,
} from "@/modules/common/utils";
import { Seperator } from "@/modules/common/components";
import { IEditProfileFormConfig, IUpsertProfile } from "../../types";
import { ServiceSelection } from "../ServiceSelection";
import { useProfileTypeSwitch } from "./useProfileTypeSwitch";
import { LanguageSkillsSelection } from "../LanguageSkillsSelection";

type EditProfileInputProps = FormProps & {
  config: IEditProfileFormConfig;
  data: IUpsertProfile;
  isValidating?: boolean;
};

export const EditProfileForm = ({
  config: {
    elements,
    conditionalElements,
    domainOptions,
    languageOptions,
    conditionalServiceGroups,
  },
  data: { success, errors, profile },
  isValidating,
  ...formProps
}: EditProfileInputProps) => {
  const { profileType, handleContentSwitcherChange } = useProfileTypeSwitch(
    profile?.type
  );
  return (
    <Form {...formProps}>
      {errors?.generic && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={errors.generic}
        />
      )}

      <input id="type" name="type" value={profileType} hidden={true} readOnly />

      <div className="hedi--group hedi--group--name">
        <FormGroup
          legendText={<h2>{tryGetValue("group-name", elements, "Name")}</h2>}>
          <Row>
            <Column lg={2}>
              <TextInput
                {...getTextInputProps("prefix", elements)}
                name="prefix"
                invalid={!!errors?.prefix}
                invalidText={errors?.prefix}
                defaultValue={profile?.prefix}
              />
            </Column>
            <Column lg={6}>
              <TextInput
                {...getTextInputProps("forename", elements)}
                name="forename"
                invalid={!!errors?.forename}
                invalidText={errors?.forename}
                defaultValue={profile?.forename}
              />
            </Column>
          </Row>
          <Row>
            <Column lg={6}>
              <TextInput
                {...getTextInputProps("surname", elements)}
                name="surname"
                invalid={!!errors?.surname}
                invalidText={errors?.surname}
                defaultValue={profile?.surname}
              />
            </Column>
          </Row>
        </FormGroup>
      </div>

      <Seperator />

      <div className="hedi--group hedi--group--address">
        <FormGroup
          legendText={
            <h2>{tryGetValue("group-address", elements, "Adresse")}</h2>
          }>
          <Row>
            <Column lg={6}>
              <TextInput
                {...getTextInputProps("city", elements)}
                name="city"
                invalid={!!errors?.city}
                invalidText={errors?.city}
                defaultValue={profile?.city}
              />
            </Column>
            <Column lg={2}>
              <TextInput
                {...getTextInputProps("postal_code", elements)}
                name="postal_code"
                invalid={!!errors?.postal_code}
                invalidText={errors?.postal_code}
                defaultValue={profile?.postal_code}
              />
            </Column>
          </Row>
          <Row>
            <Column lg={6}>
              <TextInput
                {...getTextInputProps("street", elements)}
                name="street"
                invalid={!!errors?.street}
                invalidText={errors?.street}
                defaultValue={profile?.street}
              />
            </Column>
            <Column lg={2}>
              <TextInput
                {...getTextInputProps("house_number", elements)}
                name="house_number"
                invalid={!!errors?.house_number}
                invalidText={errors?.house_number}
                defaultValue={profile?.house_number}
              />
            </Column>
          </Row>
          {hasElement("room", conditionalElements[profileType]) && (
            <Row>
              <Column lg={8}>
                <TextInput
                  {...getTextInputProps(
                    "room",
                    conditionalElements[profileType]
                  )}
                  name="room"
                  invalid={!!errors?.room}
                  invalidText={errors?.room}
                  defaultValue={profile?.room}
                />
              </Column>
            </Row>
          )}
        </FormGroup>
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--contact">
        <FormGroup
          legendText={
            <h2>{tryGetValue("group-contact", elements, "Kontakt")}</h2>
          }>
          <Row>
            <Column lg={6}>
              <TextInput
                {...getTextInputProps("phone", elements)}
                name="phone"
                invalid={!!errors?.phone}
                invalidText={errors?.phone}
                defaultValue={profile?.phone}
              />
            </Column>
            {hasElement("phone_private", conditionalElements[profileType]) && (
              <Column lg={6}>
                <TextInput
                  {...getTextInputProps(
                    "phone_private",
                    conditionalElements[profileType]
                  )}
                  name="phone_private"
                  invalid={!!errors?.phone_private}
                  invalidText={errors?.phone_private}
                  defaultValue={profile?.phone_private}
                />
              </Column>
            )}
          </Row>
          <Row>
            <Column lg={6}>
              <TextInput
                {...getTextInputProps("mail", elements)}
                name="mail"
                invalid={!!errors?.mail}
                invalidText={errors?.mail}
                defaultValue={profile?.mail}
                required
              />
            </Column>
            {hasElement("website", conditionalElements[profileType]) && (
              <Column lg={6}>
                <TextInput
                  {...getTextInputProps(
                    "website",
                    conditionalElements[profileType]
                  )}
                  name="website"
                  invalid={!!errors?.website}
                  invalidText={errors?.website}
                  defaultValue={profile?.website}
                />
              </Column>
            )}
          </Row>
          {hasElement(
            "consultation_hours",
            conditionalElements[profileType]
          ) && (
            <Row>
              <Column lg={6}>
                <TextArea
                  {...getTextInputProps(
                    "consultation_hours",
                    conditionalElements[profileType]
                  )}
                  name="consultation_hours"
                  invalid={!!errors?.consultation_hours}
                  invalidText={errors?.consultation_hours}
                  defaultValue={profile?.consultation_hours}
                  placeholder="Mo-Di, Do-Fr 09:00 - 15:00"
                />
              </Column>
            </Row>
          )}
        </FormGroup>
      </div>

      <Seperator />

      <div className="hedi--group hedi--group--language-skills">
        <FormGroup
          legendText={
            <h2>{tryGetValue("group-languageSkills", elements, "Sprachen")}</h2>
          }>
          <LanguageSkillsSelection
            config={{ elements, languageOptions }}
            data={profile?.languageSkills}
          />
        </FormGroup>
      </div>

      <div className="hedi--group hedi--group--profile-type">
        <FormGroup
          legendText={
            <h2>{tryGetValue("group-type", elements, "Tätigkeitsbereich")}</h2>
          }>
          <Row>
            <Column sm={4} md={6} lg={8}>
              <ContentSwitcher
                onChange={handleContentSwitcherChange}
                size="xl"
                selectedIndex={profileType === "Midwife" ? 0 : 1}>
                <Switch
                  name="Midwife"
                  text={tryGetValue("type-midwife", elements, "Hebamme")}
                  onClick={() => {}}
                  onKeyDown={() => {}}
                  defaultChecked={profileType === "Midwife"}
                />
                <Switch
                  name="Caregiver"
                  text={tryGetValue("type-caregiver", elements, "Betreuende")}
                  onClick={() => {}}
                  onKeyDown={() => {}}
                  defaultChecked={profileType === "Caregiver"}
                />
              </ContentSwitcher>
            </Column>
          </Row>
        </FormGroup>
      </div>

      {profileType !== "Parent" && profileType !== "Midwife" && (
        <div className="hedi--group hedi--group--domains">
          <FormGroup
            legendText={
              <h4>
                {tryGetValue("group-domains", elements, "Arbeitsschwerpunkt")}
              </h4>
            }>
            <Row>
              <Column sm={4} md={6} lg={8} role="group">
                {domainOptions.map((option, index) => (
                  <SelectableTile
                    key={option.route}
                    id={option.type + index}
                    //@ts-ignore
                    name="domains"
                    value={option.route}
                    selected={profile?.domains.includes(option.route)}
                    onChange={() => {}}>
                    {option.label}
                  </SelectableTile>
                ))}
              </Column>
            </Row>
          </FormGroup>
        </div>
      )}

      {!!conditionalServiceGroups[profileType] && (
        <div className="hedi--group hedi--group--services">
          <FormGroup
            legendText={
              <h2>{tryGetValue("group-services", elements, "Angebote")}</h2>
            }>
            <Row>
              {conditionalServiceGroups[profileType]?.map(serviceGroup => (
                <Column lg={8} key={serviceGroup.route}>
                  <ServiceSelection
                    config={{ elements, serviceGroup }}
                    data={profile?.services}
                  />
                </Column>
              ))}
            </Row>
          </FormGroup>
        </div>
      )}

      {hasElement("first_pregnancy", conditionalElements[profileType]) && (
        <div className="hedi--group">
          <FormGroup legendText="Parent">
            <Toggle
              id="first_pregnancy"
              name="first_pregnancy"
              labelText={
                getTextInputProps(
                  "first_pregnancy",
                  conditionalElements.Parent
                )?.labelText.toString() ?? ""
              }
              defaultToggled={profile?.first_pregnancy ?? false}
            />
          </FormGroup>
        </div>
      )}

      {isValidating ? (
        <InlineLoading status="active" />
      ) : (
        <Button type="submit">
          {tryGetValue("submit", elements, "Profil speichern")}
        </Button>
      )}
    </Form>
  );
};
