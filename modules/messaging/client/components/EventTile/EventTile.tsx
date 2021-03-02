import { MatrixEvent } from "matrix-js-sdk";
import { CodeSnippet } from "carbon-components-react";
import { MessageEvent } from "../MessageEvent";

export const EventTile = ({ event }: { event: MatrixEvent }) => {
  switch (event.getType()) {
    case "m.room.message":
    case "m.sticker":
      return <MessageEvent event={event} />;
    default:
      return (
        <CodeSnippet type="multi">{JSON.stringify(event, null, 2)}</CodeSnippet>
      );
  }
};

/* 
  TODO impl TextualEvent
  matrix-react sdk defines just two EventComponents, MessageEvent and TextualEvent
  the latter is used for notifications and calls
  'm.call.invite': 'messages.TextualEvent',
  'm.call.answer': 'messages.TextualEvent',
  'm.call.hangup': 'messages.TextualEvent',
  'm.call.reject': 'messages.TextualEvent',
*/
