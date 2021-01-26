import { buildAssetUrl } from "@/modules/common/utils";
import Image from "next/image";
import Link from "next/link";
import { ICategoryEntry } from "../../../types";
import { AspectRatio, Link as CarbonLink } from "carbon-components-react";

export const CategoryEntry = ({
  category,
}: {
  category: ICategoryEntry;
}): JSX.Element => {
  const { image, label, route } = category;
  return (
    <Link href={route} passHref>
      <a href={route} className="hedi-unstyled-link">
        {image === null ? (
          <AspectRatio ratio="2x1" style={{ backgroundColor: "darkcyan" }}>
            {" "}
            picture here{" "}
          </AspectRatio>
        ) : (
          <AspectRatio ratio="2x1">
            <Image
              className="hedi-responsive-image"
              src={buildAssetUrl(image?.route)}
              width={image?.width ?? 0}
              height={image?.height ?? 0}
              alt={image?.alt}
            />
          </AspectRatio>
        )}
        <h4
          dangerouslySetInnerHTML={{
            __html: label,
          }}></h4>
      </a>
    </Link>
  );
};
