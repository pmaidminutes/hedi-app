import Link from "next/link";
import { ICategoryEntry } from "@/modules/editorial/types";
import { buildAssetUrl } from "../../utils";

export function CategoryEntry({ category }: { category: ICategoryEntry }) {
  return (
    <div
      className="bx--col bx--col-sm-4 bx--col-md-4 bx--col-lg-4 mt-s-md"
      style={{ overflowWrap: "break-word" }}
      key={category.urlpath}>
      <Link href={category.urlpath} passHref>
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
              <img
                className="hedi-responsive-image"
                src={buildAssetUrl(category.image?.url)}
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
    </div>
  );
}
