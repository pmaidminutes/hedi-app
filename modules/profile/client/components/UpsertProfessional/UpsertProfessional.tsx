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
import { Seperator } from "@/modules/common/components";

import { IPage } from "@/modules/page/types";
import { getUser } from "@/modules/auth/client";
import { ISelectComponent, Select } from "@/modules/components";
import { useUpsertProfessional } from "./useUpsertProfessional";
import { getUpsertProfessionalViewDefinition } from "./getUpsertProfessionalViewDefinition";
import {
  AddressesInput,
  IAddressesInputDefinition,
  ConsultationHoursInput,
  IConsultationHoursInputDefinition,
  DetailedNameInput,
  IDetailedNameInputDefinition,
  EmailsInput,
  IEmailsInputDefinition,
  LanguageSkillsInput,
  ILanguageSkillsInputDefinition,
  PhonesInput,
  IPhonesInputDefinition,
  WebsitesInput,
  IWebsitesInputDefinition,
} from "..";

export interface IUpsertProfessionalViewDefinition {
  professionSelect: ISelectComponent;
  detailedNameInputDefinition: IDetailedNameInputDefinition;
  addressesInputDefinition: IAddressesInputDefinition;
  phonesInputDefinition: IPhonesInputDefinition;
  emailsInputDefinition: IEmailsInputDefinition;
  websitesInputDefinition: IWebsitesInputDefinition;
  languageSkillsInputDefinition: ILanguageSkillsInputDefinition;
  consultationHoursInputDefinition: IConsultationHoursInputDefinition;
}

export const UpsertProfessionalView = ({ content }: { content: IPage }) => {
  const [user, isLoading] = getUser();
  const {
    data: { success, errors, profile, route },
    isValidating,
    isSuccessfullySaved,
    handleSubmit,
  } = useUpsertProfessional(content.lang, user?.name);

  const {
    prefix,
    givenName,
    familyName,
    addresses,
    phones,
    emails,
    websites,
    languageLevels,
    consultationHours,
    profession,
    services,
  } = profile;

  const {
    professionSelect,
    detailedNameInputDefinition,
    addressesInputDefinition,
    phonesInputDefinition,
    emailsInputDefinition,
    websitesInputDefinition,
    languageSkillsInputDefinition,
    consultationHoursInputDefinition,
  } = getUpsertProfessionalViewDefinition(content.components);

  return (
    <Form className="hedi--edit-profile" onSubmit={handleSubmit}>
      {errors && (
        <InlineNotification kind="error" title="Error" subtitle={errors} />
      )}

      <Row className="hedi--group hedi--group--profile-type">
        <FormGroup legendText={<h2>Tätigkeitsbereich</h2>}>
          <Select defaultValue={profession} {...professionSelect} />
        </FormGroup>
      </Row>

      <div className="hedi--group hedi--group--name">
        <DetailedNameInput
          {...{ prefix, givenName, familyName }}
          {...detailedNameInputDefinition}
        />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--address">
        <AddressesInput value={addresses} {...addressesInputDefinition} />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--contact">
        <PhonesInput phones={phones} {...phonesInputDefinition} />
        <EmailsInput emails={emails} {...emailsInputDefinition} />
        <WebsitesInput websites={websites} {...websitesInputDefinition} />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--consultation-hours">
        <ConsultationHoursInput
          value={consultationHours}
          {...consultationHoursInputDefinition}
        />
      </div>
      <Seperator />

      <div className="hedi--group hedi--group--language-skills">
        <LanguageSkillsInput
          languageLevels={languageLevels}
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
