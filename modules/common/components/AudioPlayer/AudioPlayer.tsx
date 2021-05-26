import { Audio } from "@/modules/model/components";
import { transformAudio } from "./transformAudio";

export const AudioPlayer = (props: Audio) => {
  const { src, mimeType } = transformAudio(props);
  return (
    <>
      <audio controls src={src} className="hedi__audioplayer">
        {/* TODO add possibility of multiple types */}
        <source src={src} type={mimeType} />
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </>
  );
};
