import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";

// Needs data like this
// {
//   subtitles: [
//     { label: "Deutsch", langcode: "de", src: "/subtitle/de.vtt" },
//     { label: "English", langcode: "en", src: "/subtitle/en.vtt" },
//     { label: "Espagnol", langcode: "es", src: "/subtitle/es.vtt" },
//   ],
//   sources: [
//     { mimeType: "mp4", src: "/sintel-short.mp4" },
//     { mimeType: "webm", src: "/sintel-short.webm" },
//   ],
// }

interface IVideoPlayer {
  data: {
    sources: ISources[];
    subtitles: ISubtitles[];
  };
}

interface ISources {
  mimeType: string;
  src: string;
}
interface ISubtitles {
  label: string;
  langcode: string;
  src: string;
}

export const VideoPlayer = ({ data }: IVideoPlayer): JSX.Element => {
  const router = useRouter();
  const { locale } = router;
  const { sources, subtitles } = data;

  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(0);

  const videoJSOptions = {
    autoplay: "muted",
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
    language: locale,
    aspectRatio: "16:9",
  };

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.on("ended", () => {
          console.log("ended");
        });
        player.on("timeupdate", () => {
          setCurrentTime(player.currentTime());
        });
        console.log("Player Ready");
      });
    }

    return () => {};
  }, []);

  return (
    <div data-vjs-player>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js">
        {sources.map((source, index) => (
          <source
            src={source.src}
            key={index}
            type={`video/${source.mimeType}`}
          />
        ))}
        {subtitles.map((subtitle, index) => (
          <track
            label={subtitle.label}
            key={`subtitle-${index}`}
            kind="subtitles"
            srcLang={subtitle.langcode}
            src={subtitle.src}></track>
        ))}
      </video>
    </div>
  );
};
