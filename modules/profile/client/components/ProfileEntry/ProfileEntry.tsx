import { ClickableTile } from "carbon-components-react";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICaregiver, IMidwife } from "../../../types";

export const ProfileEntry = ({
  profile,
}: {
  profile: IMidwife | ICaregiver;
}): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { label, route, display } = profile;

  return (
    <>
      <Link href={route} passHref>
        <ClickableTile href={route}>
          <h4
            dangerouslySetInnerHTML={{
              __html: label,
            }}></h4>

          {label}
        </ClickableTile>
      </Link>
    </>
  );
};
[];
