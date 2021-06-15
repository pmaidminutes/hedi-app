import {
  IComponent,
  isAudio,
  isBody,
  isButton,
  isFile,
  isImage,
  isLabel,
  isSvg,
  isTextArea,
  isTextInput,
  isVideo,
  isHeadline,
} from "@/modules/components/types";
import {
  TextArea,
  TextInput,
  Button,
  Body,
  Label,
  AudioPlayer,
  Image,
  DownloadFile,
  VideoPlayer,
  Svg,
  Headline,
} from "../index";
import React from "react";
interface IRendererProps {
  components: IComponent[];
}

export const ComponentRenderer = (props: IRendererProps) => {
  const { components } = props;
  return (
    <>
      {components &&
        components.map((component, index) => {
          if (isLabel(component))
            return <Label key={component.kind + index} {...component} />;
          if (isHeadline(component))
            return <Headline key={component.kind + index} {...component} />;
          if (isBody(component))
            return <Body key={component.kind + index} {...component} />;
          if (isButton(component))
            return <Button key={component.kind + index} {...component} />;
          if (isTextArea(component))
            return <TextArea key={component.kind + index} {...component} />;
          if (isTextInput(component))
            return <TextInput key={component.kind + index} {...component} />;
          if (isAudio(component))
            return <AudioPlayer key={component.kind + index} {...component} />;
          if (isImage(component))
            return <Image key={component.kind + index} {...component} />;
          if (isFile(component))
            return <DownloadFile key={component.kind + index} {...component} />;
          if (isVideo(component))
            return (
              <VideoPlayer key={component.kind + index} video={component} />
            );
          if (isSvg(component))
            return <Svg key={component.kind + index} {...component} />;
        })}
    </>
  );
};
