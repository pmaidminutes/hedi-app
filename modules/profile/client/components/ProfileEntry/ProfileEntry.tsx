import { IProfile } from "@/modules/model/IProfile";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";
import {
  ICaregiver,
  IInstitution,
  IMidwife,
  IOrganisation,
} from "../../../types";

export const ProfileEntry = ({
  profile,
}: {
  profile: IProfile | IMidwife | ICaregiver | IOrganisation | IInstitution;
}): JSX.Element => {
  const { label, route, displayName } = profile;

  return (
    <>
      <Link href={route} passHref>
        <ClickableTile href={route}>
          <h4
            dangerouslySetInnerHTML={{
              __html: label,
            }}></h4>

          {displayName}
        </ClickableTile>
      </Link>
    </>
  );
};
[];
