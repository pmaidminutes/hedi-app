import { SingleColumn } from "@/modules/shell/client/components";
import { transformAppPageView, IAppPageProps } from "./transformAppPageView";
import Image from "next/image";

export const AppPageView: React.FC<IAppPageProps> = props => {
  const {
    posterImgSrc,
    posterImage,
    wrapperClass,
    condensed,
    narrow,
    headline,
    children,
    groupClass,
  } = transformAppPageView(props);

  return (
    <div className={wrapperClass}>
      {posterImage && posterImgSrc && (
        <Image
          className="hedi--hero-image"
          src={process.env.NEXT_PUBLIC_ASSETS_URL + posterImage.route}
          alt={posterImage.alt}
          width={posterImage.width}
          height={posterImage.height}
          layout="responsive"
        />
      )}

      <SingleColumn
        headline={headline}
        groupClass={groupClass}
        narrow={narrow}
        condensed={condensed}>
        {children}
      </SingleColumn>
    </div>
  );
};
