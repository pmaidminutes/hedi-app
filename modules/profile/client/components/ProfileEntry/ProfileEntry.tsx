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
        <a href="#" className="bx--tile bx--tile--clickable hedi-unstyled-link">
          <h4
            dangerouslySetInnerHTML={{
              __html: label,
            }}></h4>
          {display}
        </a>
      </Link>
    </>
  );
};
[];
