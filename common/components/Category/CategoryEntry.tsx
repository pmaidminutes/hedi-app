import Image from "next/image";
import Link from "next/link";
import { ICategoryEntry } from "@/modules/editorial/types";
import { buildAssetUrl } from "../../utils";

export const CategoryEntry = ({ category }: { category: ICategoryEntry }) => (
  <Link href={category.route} passHref>
    <a className="hedi-unstyled-link">
      {category.image === null ? (
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
            src={buildAssetUrl(category.image?.url)}
            width={category.image?.width ?? 0}
            height={category.image?.height ?? 0}
            alt={category.image?.alt}
          />
        </div>
      )}
      <h4
        dangerouslySetInnerHTML={{
          __html: category.label,
        }}></h4>
    </a>
  </Link>
);
