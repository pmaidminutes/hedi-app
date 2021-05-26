import {
  IComponent,
  isAudio,
  isBody,
  isButton,
  isFile,
  isImage,
  isLabel,
  isTextArea,
  isTextInput,
  isVideo,
} from "@/modules/model/components";
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
} from "@/modules/common/components";
import React from "react";
interface IRendererProps {
  components: IComponent[];
}

export const Renderer = (props: IRendererProps) => {
  const { components } = props;
  return (
    <>
      {components &&
        components.map((component, index) => {
          if (isLabel(component))
            return <Label key={component.id + index} {...component} />;
          if (isBody(component))
            return <Body key={component.id + index} {...component} />;
          if (isButton(component))
            return <Button key={component.id + index} {...component} />;
          if (isTextArea(component))
            return <TextArea key={component.id + index} {...component} />;
          if (isTextInput(component))
            return <TextInput key={component.id + index} {...component} />;
          if (isAudio(component))
            return <AudioPlayer key={component.id + index} {...component} />;
          if (isImage(component))
            return <Image key={component.id + index} {...component} />;
          if (isFile(component))
            return <DownloadFile key={component.id + index} {...component} />;
          if (isVideo(component))
            return <VideoPlayer key={component.id + index} video={component} />;
        
        })}
    </>
  );
};
