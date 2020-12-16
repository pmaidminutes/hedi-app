// TODO change when audiofiles are available
const audioFile =
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3";
export const AudioPlayer = ({ src }: { src?: string }) => {
  return (
    <audio controls src={audioFile} style={{ width: "100%", height: "30px" }}>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};