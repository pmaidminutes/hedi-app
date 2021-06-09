import { buildAssetUrl } from "@/modules/common/utils";
import { IAudio } from "@/modules/editorial/types";

import { useState, useEffect } from "react";
import { IArticleAction } from "../../../types";

export interface IActionBarProps {
  actions?: IArticleAction[];
  audio?: IAudio;
}

export function useActionBar(props: IActionBarProps) {
  const { actions, audio } = props;
  const [hasActionBar, setHasActionBar] = useState(actions! || audio);

  // const audioSrc = audio ? buildAssetUrl(audio.route) : null;
  // TODO remove when using real audio
  // const audioSrc = "/dummy/audio/audio.mp3";

  useEffect(() => {
    setHasActionBar(actions! || audio);
  }, [actions, audio]);

  return {
    hasActionBar,
    actions: actions === undefined ? null : actions,
    hasAudio: true,
    // hasAudio: audio === undefined ? false : true,
    // audioSrc,
  };
}
