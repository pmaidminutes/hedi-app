import { ClickableTile } from "carbon-components-react";
import { Room } from "matrix-js-sdk";

import { useMessagingService } from "../../context";
import { EventTile } from "../EventTile/EventTile";
import { useTimelineWindowSubscription } from "./useSubscription";
import { useTimelineWindow } from "./useTimelineWindow";

// handles the all messages and events of a room through the TimelineWindow class
// all events are grouped into timeline sets. the window class helps with pagination, loading, etc
export const Timeline = ({ room }: { room: Room }) => {
  const client = useMessagingService();
  const timelineWindow = useTimelineWindow(client, room);
  const events = useTimelineWindowSubscription(client, timelineWindow);
  return (
    <>
      <ClickableTile
        handleClick={() => {
          if (!timelineWindow.canPaginate("b")) timelineWindow.extend("b", 3);
          timelineWindow.paginate("b", 3);
        }}>
        older Messages
      </ClickableTile>
      {events.map(event => (
        <EventTile event={event} key={event.getId()} />
      ))}
    </>
  );
};
