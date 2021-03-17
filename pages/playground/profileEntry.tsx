import { IProfile } from "@/modules/model/IProfile";
import { ICaregiver, IMidwife } from "@/modules/profile/types";
import { ClickableTile } from "carbon-components-react";
import Link from "next/link";

export const ProfileEntry = ({
  profile,
}: {
  profile: IProfile | IMidwife | ICaregiver;
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
