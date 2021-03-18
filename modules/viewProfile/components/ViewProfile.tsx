import { Column, Grid, Row } from "carbon-components-react";
import { IViewProfile } from "../types";
import { ProfileService } from "./ProfileService";
import { ProfileSummary } from "./ProfileSummary";
import { ProfileWorkhrs } from "./ProfileWorkhrs";
import { RelatedProfiles } from "./RelatedProfiles";
export const ViewProfile = ({ content }: { content: IViewProfile }) => {
  const main = content.AppPage.elements;
  return (
    <>
      {console.log(main)}
      <Grid>
        <Row>
          <Column>
            <ProfileSummary content={content}></ProfileSummary>
          </Column>
        </Row>
        <Row>
          <Column>
            <ProfileService content={content}></ProfileService>
          </Column>
          <Column>
            <ProfileWorkhrs content={content}></ProfileWorkhrs>
          </Column>
        </Row>
        <Row>
          <Column>
            <ProfileService content={content}></ProfileService>
          </Column>{" "}
        </Row>
        <Row>
          <RelatedProfiles content={content}></RelatedProfiles>
        </Row>
      </Grid>
    </>
  );
};
