import {VideoPlayer} from '@/modules/common/components'

const data = {
  subtitles: [
    { label: "Deutsch", langcode: "de", src: "/subtitle/de.vtt" },
    { label: "English", langcode: "en", src: "/subtitle/en.vtt" },
    { label: "Espagnol", langcode: "es", src: "/subtitle/es.vtt" },
  ],
  sources: [
    { mimeType: "webm", src: "/210211_Audio_Multitrack_Tryout_1015.webm" },
  ],
}


export default function ChatIndex() {

  return (
    <div>
      <VideoPlayer data={ data}/>
    </div>
  );
}
