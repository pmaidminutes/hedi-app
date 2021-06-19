import React from "react";
import { Grid } from "carbon-components-react";
import Image from "next/image";
import { transformHeroImage, IHeroImage } from "./transformHeroImage";
export const HeroImage = (props: IHeroImage) => {
  const { image, containerClass } = transformHeroImage(props);
  return (
    <div className={containerClass}>
      <Grid className="hedi--grid__no-padding">
        <Image
          className="hedi--hero-image__image"
          {...image}
          layout="responsive"
        />
      </Grid>
    </div>
  );
};
