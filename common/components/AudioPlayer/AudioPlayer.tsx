export const AudioPlayer = ({ src }: { src?: string }) => {
  return (
    <audio
      controls
      src={src}
      style={{ width: "100%", height: "30px" }}>
      {/* TODO add possibility of multiple types */}
      <source src={src} type="video/webm" />
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};
