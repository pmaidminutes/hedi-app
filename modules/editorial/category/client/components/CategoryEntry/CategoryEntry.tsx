import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "carbon-components-react";
import {
  transformCategoryEntry,
  ICategoryEntryProps,
} from "./transformCategoryEntry";

export const CategoryEntry = (props: ICategoryEntryProps): JSX.Element => {
  const { route, image, label, imageSrc } = transformCategoryEntry(props);
  return (
    <div className="hedi__categoryentry">
      <Link href={route} passHref>
        <a href={route}>
          {image === null ? (
            <Image
              src={process.env.NEXT_PUBLIC_CATEGORY_HEADER_TMP || ""}
              layout="responsive"
              width="auto"
              height="auto"
            />
          ) : (
            <AspectRatio ratio="2x1">
              <Image
                src={imageSrc}
                width={image.width ?? 0}
                height={image.height ?? 0}
                alt={image.alt}
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
