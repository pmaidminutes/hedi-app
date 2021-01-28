import { HTMLWithNextImage } from "@/modules/react/html";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICaregiver, IMidwife } from "../../../types";
import { ClickableTile } from "carbon-components-react";

export const ProfileEntry = ({
  profile,
}: {
  profile: IMidwife | ICaregiver;
}): JSX.Element => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const { label, route } = profile;
  return (
    <Link href={route} passHref>
      <ClickableTile href={route}>
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
        <HTMLWithNextImage
          data={label}
          locale={locale === defaultLocale ? null : locale}
        />
      </ClickableTile>
    </Link>
  );
};
[];
