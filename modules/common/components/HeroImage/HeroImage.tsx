import React from "react";
import { Grid } from "carbon-components-react";
import Image from "next/image";
import { transformHeroImage } from "./transformHeroImage";
import { IImageComponent } from "@/modules/components";
export const HeroImage = (props: IImageComponent) => {
  const { image, color } = transformHeroImage(props);
  return (
    <div style={{ backgroundColor: color }}>
      <Grid className="hedi--grid__no-padding">
        <div className="hedi--hero-image">
          <Image
            className="hedi--hero-image__image"
            {...image}
            layout="fill"
            objectFit="scale-down"
          />
        </div>
      </Grid>
    </div>
  );
};
