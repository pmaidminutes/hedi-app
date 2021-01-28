import { HTMLWithNextImage } from "@/modules/react/html";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICaregiver, IMidwife } from "../types";

export const Profile = ({
  profile,
}: {
  profile: IMidwife | ICaregiver;
}): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { label, route } = profile;
  const MapWithNoSSR = dynamic<any>(
    () => import("@/modules/common/components/Map/MapClient"),
    {
      ssr: false,
    }
  );
  return (
    <>
      <Link href={route} passHref>
        <a href="#" className="bx--tile bx--tile--clickable hedi-unstyled-link">
          <h4
            dangerouslySetInnerHTML={{
              __html: label,
            }}></h4>
          <HTMLWithNextImage
            data={label}
            locale={locale === defaultLocale ? null : locale}
          />
        </a>
      </Link>
      {<MapWithNoSSR {...(profile.lat + "," + profile.long)} />}
    </>
  );
};
[];
