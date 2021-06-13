import {
  Form,
  Button,
  FormGroup,
  Column,
  Row,
  InlineNotification,
  InlineLoading,
  ToastNotification,
} from "carbon-components-react";

import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { Seperator } from "@/modules/common/components";

import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { useUpsertProfessional } from "./useUpsertProfessional";
import { getUpsertProfessionalViewDefinition } from "./getUpsertProfessionalViewDefinition";
import {
  AddressesInput,
  IAddressesInputDefinition,
  ConsultationHoursInput,
  IConsultationHoursInputDefinition,
  EmailsInput,
  IEmailsInputDefinition,
  LanguageSkillsInput,
  ILanguageSkillsInputDefinition,
  PhonesInput,
  IPhonesInputDefinition,
  WebsitesInput,
  IWebsitesInputDefinition,
} from "..";

export const TryProfileEdit = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null => {
  if (content.type !== "ProfileEdit") return null;
  return <ProfileEdit content={content as IPage} />;
};

export interface IUpsertProfessionalViewDefinition {
  professionSelect: ISelectComponent;
  nameLabel: ILabelComponent;
  prefixTextInput: ITextInputComponent;
  givenNameTextInput: ITextInputComponent;
  familyNameTextInput: ITextInputComponent;
  addressesInputDefinition: IAddressesInputDefinition;
  phonesInputDefinition: IPhonesInputDefinition;
  emailsInputDefinition: IEmailsInputDefinition;
  websitesInputDefinition: IWebsitesInputDefinition;
  languageSkillsInputDefinition: ILanguageSkillsInputDefinition;
  consultationHoursInputDefinition: IConsultationHoursInputDefinition;
}

// TODO handle upsertPersonal as well
// seems too similar to implement in another View
export const ProfileEdit = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}) => {
  const {
    profession,
    prefix,
    givenName,
    familyName,
    addresses,
    phones,
    emails,
    websites,
    languageLevels,
    consultationHours,
    isValidating,
    isSuccessfullySaved,
    handleSubmit,
  } = useUpsertProfessional(content.lang);

  const {
    professionSelect,
    nameLabel,
    prefixTextInput,
    givenNameTextInput,
    familyNameTextInput,
    addressesInputDefinition,
    phonesInputDefinition,
    emailsInputDefinition,
    websitesInputDefinition,
    languageSkillsInputDefinition,
    consultationHoursInputDefinition,
  } = getUpsertProfessionalViewDefinition(content.components);

  return (
    <Form className="hedi--edit-profile" onSubmit={handleSubmit}>
      {/* {errors && (
        <InlineNotification kind="error" title="Error" subtitle={errors} />
      )} */}

      <Row className="hedi--group hedi--group--profile-type">
        <FormGroup legendText={<h2>Tätigkeitsbereich</h2>}>
          <Select {...profession} {...professionSelect} />
        </FormGroup>
      </Row>

      <div className="hedi--group hedi--group--name">
        <FormGroup legendText={<Label {...nameLabel} />}>
          <Row>
            <Column lg={2} md={2}>
              <TextInput {...prefix} {...prefixTextInput} />
            </Column>
            <Column lg={6} md={6}>
              <TextInput {...givenName} {...givenNameTextInput} />
            </Column>
          </Row>
          <Row>
            <Column lg={6} md={6}>
              <TextInput {...familyName} {...familyNameTextInput} />
            </Column>
          </Row>
        </FormGroup>
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--address">
        <AddressesInput {...addresses} {...addressesInputDefinition} />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--contact">
        <PhonesInput {...phones} {...phonesInputDefinition} />
        <EmailsInput {...emails} {...emailsInputDefinition} />
        <WebsitesInput {...websites} {...websitesInputDefinition} />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--consultation-hours">
        <ConsultationHoursInput
          {...consultationHours}
          {...consultationHoursInputDefinition}
        />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--language-skills">
        <LanguageSkillsInput
          {...languageLevels}
          {...languageSkillsInputDefinition}
        />
      </div>

      <div className="hedi--group hedi--group--services">
        {/*<FormGroup legendText={<h2>Angebote</h2>}>
          <Row>
            <Column lg={8}>
               <ServiceSelection
                      config={{ elements, serviceGroup }}
                      data={profile?.services}
                    /> 
            </Column>
          </Row>
        </FormGroup>*/}
      </div>

      <Row>
        <Column lg={8} md={8}>
          {isValidating ? (
            <InlineLoading status="active" />
          ) : isSuccessfullySaved ? (
            <ToastNotification
              title={"Success"}
              subtitle={"success_message"}
              caption={<InlineLoading status="active" />}
              kind="success"
              lowContrast
              hideCloseButton
              style={{ width: "100%" }}
            />
          ) : (
            // ) : hasError() ? (
            //   <ToastNotification
            //     title={"Error"}
            //     subtitle={"error_message"}
            //     caption=""
            //     kind="error"
            //     lowContrast
            //     hideCloseButton
            //     style={{ width: "100%" }}
            //   />
            <Button type="submit">Profil speichern</Button>
          )}
        </Column>
      </Row>
    </Form>
  );
};
