import { Tile } from "carbon-components-react";
import { MatrixEvent } from "matrix-js-sdk";

export const MessageEvent = ({ event }: { event: MatrixEvent }) => {
  const sender = event.getSender().match(/@(.*):/)?.[1];
  const content = event.getContent();
  return (
    <Tile>
      {sender} - <em>{event.getDate().toLocaleString()}</em> - {content.msgtype}
      <p>{content.body}</p>
      {event.isSending() ? <em>sending...</em> : null}
    </Tile>
  );
};
