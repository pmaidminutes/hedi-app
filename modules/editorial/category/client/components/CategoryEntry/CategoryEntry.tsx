import { buildAssetUrl } from "@/modules/common/utils";
import Image from "next/image";
import Link from "next/link";
import { ICategoryEntry } from "../../../types";
import { AspectRatio } from "carbon-components-react";

export const CategoryEntry = ({
  category,
}: {
  category: ICategoryEntry;
}): JSX.Element => {
  const { image, label, route } = category;
  return (
    <div className="hedi__categoryentry">
      <Link href={route} passHref>
        <a href={route}>
          {image === null ? (
            <Image
              src={"/dummy_img.png"}
              layout="responsive"
              width="auto"
              height="auto"
            />
          ) : (
            <AspectRatio ratio="2x1">
              <Image
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
    </div>
  );
};
