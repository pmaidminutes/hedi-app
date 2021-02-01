import Link from "next/link";
import { ICaregiver, IMidwife } from "../../../types";

export const ProfileEntry = ({
  profile,
}: {
  profile: IMidwife | ICaregiver;
}): JSX.Element => {
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
