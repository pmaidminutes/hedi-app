import { useEffect, useState } from "react";
import { FormLabel, Tile } from "carbon-components-react";
import { MatrixRoom, MatrixEvent } from "../../../types";
import { useMsgClient } from "../../context";

export const Messages = ({ room }: { room: MatrixRoom }) => {
  const [events, setEvents] = useState<MatrixEvent[]>([]);
  const client = useMsgClient();

  const listener = (_: any, targetRoom: MatrixRoom) => {
    if (room.roomId === targetRoom.roomId)
      setEvents([...targetRoom.getLiveTimeline().getEvents()]);
  };

  useEffect(() => {
    setEvents([...room.getLiveTimeline().getEvents()]);
    client?.removeListener("Room.timeline", listener);
    client?.addListener("Room.timeline", listener);
    return () => {
      client?.removeListener("Room.timeline", listener);
    };
  }, [client, room]);

  return (
    <div role="group">
      <FormLabel>Messages</FormLabel>
      {events
        .sort((a, b) => +a.event.origin_server_ts - +b.event.origin_server_ts)
        .map(({ event }) => {
          switch (event.type) {
            case "m.room.message":
              return (
                <Tile key={event.event_id}>
                  <p>{event.content.body}</p>
                  <h6>{`${event.sender.match(/@(.*):/)?.[1]} - ${new Date(
                    event.origin_server_ts
                  ).toLocaleString()}`}</h6>
                </Tile>
              );
            default:
              return (
                <div
                  key={event.event_id}
                  style={{
                    padding: "0.5rem",
                    fontSize: "0.8rem",
                    color: "dimgray",
                  }}>
                  debug: {JSON.stringify(event)}
                </div>
              );
          }
        })}
    </div>
  );
};
