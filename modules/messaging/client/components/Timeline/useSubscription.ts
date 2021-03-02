import { EventTimeline, MatrixClient, MatrixEvent, Room } from "matrix-js-sdk";
import { useState } from "react";
import { useListener } from "../../hooks";
import { ITimelineWindow } from "./useTimelineWindow";

export const useTimelineWindowSubscription = (
  client: MatrixClient,
  timelineWindow: ITimelineWindow
) => {
  const [events, setEvents] = useState<MatrixEvent[]>(
    timelineWindow.getEvents()
  );

  // either new data arrived, or pagination was requested
  useListener(
    client,
    "Room.timeline",
    (
      event: MatrixEvent,
      room: Room,
      toStartOfTimeline: boolean,
      removed: boolean,
      data: { timeline: EventTimeline; liveEvent: boolean }
    ) => {
      if (data.timeline.getTimelineSet() === timelineWindow.timelineSet) {
        if (data.liveEvent && event.getType() === "m.room.message") {
          timelineWindow
            .paginate("f", 1)
            .then(() => setEvents(timelineWindow.getEvents()));
        } else {
          //console.log("other timeline event", event);
          setEvents(timelineWindow.getEvents());
        }
      }
    },
    [client, timelineWindow]
  );

  // existing event state change, e.g. sending state of a message
  // seems the listener is sometimes returning something else than an event...
  useListener(
    client,
    "event",
    (event: MatrixEvent) => {
      if (event.getId && events.find(ev => ev.getId() === event.getId())) {
        setEvents(prev => [...prev]);
      }
    },
    [events]
  );
  return events;
};
