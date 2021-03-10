import {
  EventTimelineSet,
  MatrixClient,
  Room,
  TimelineWindow,
} from "matrix-js-sdk";
import { useEffect, useState } from "react";

// this property is used for comparison, although the original class stores the set
// it's not exposed as getter
export interface ITimelineWindow extends TimelineWindow {
  timelineSet: EventTimelineSet;
}

const createTimelineWindowState = (
  client: MatrixClient,
  timelineSet: EventTimelineSet
): ITimelineWindow => {
  //@ts-ignore
  const window: ITimelineWindow = new TimelineWindow(client, timelineSet, {
    windowLimit: Number.MAX_VALUE,
  });
  window.timelineSet = timelineSet;
  return window;
};

export const useTimelineWindow = (client: MatrixClient, room: Room) => {
  const [timelineWindowState, setTimelineWindowState] = useState(
    createTimelineWindowState(client, room.getUnfilteredTimelineSet())
  );
  timelineWindowState.load(); //means load at beginning, should later be application state, last read message
  useEffect(() => {
    if (room.getUnfilteredTimelineSet() !== timelineWindowState.timelineSet) {
      setTimelineWindowState(() => {
        const newTimelineWindowState = createTimelineWindowState(
          client,
          room.getUnfilteredTimelineSet()
        );
        newTimelineWindowState.load();
        return newTimelineWindowState;
      });
    }
  }, [client, room]);
  return timelineWindowState;
};
