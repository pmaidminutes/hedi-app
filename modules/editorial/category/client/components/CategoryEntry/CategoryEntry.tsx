import Image from "next/image";
import Link from "next/link";
import { ICategoryEntry } from "../../../types";
import { buildAssetUrl } from "@/common/utils";

export const CategoryEntry = ({
  category,
}: {
  category: ICategoryEntry;
}): JSX.Element => {
  const { image, label, route } = category;
  return (
    <Link href={route} passHref>
      <a className="hedi-unstyled-link">
        {image === null ? (
          <div
            className="bx--aspect-ratio bx--aspect-ratio--2x1"
            style={{ backgroundColor: "darkcyan" }}>
            {" "}
            picture here{" "}
          </div>
        ) : (
          <div className="bx--aspect-ratio bx--aspect-ratio--2x1">
            <Image
              className="hedi-responsive-image"
              src={buildAssetUrl(image?.url)}
              width={image?.width ?? 0}
              height={image?.height ?? 0}
              alt={image?.alt}
            />
          </div>
        )}
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
      </a>
    </Link>
  );
};
