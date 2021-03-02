import { MatrixClient, MatrixEvent, Room, RoomState } from "matrix-js-sdk";
import { useState } from "react";
import { useListener } from "../../../hooks";

// subscribes to MatrixClient events and tracks their state
export const useRoomListSubscription = (client: MatrixClient) => {
  const [roomStateList, setRoomStateList] = useState<RoomState[]>([]);

  // "Room" event fires whenever a room is added
  useListener(
    client,
    "Room",
    (room: Room) => {
      setRoomStateList(list => [room.currentState, ...list]);
    },
    []
  );

  //which event fires on new room state?
  const onRoomStateEvents = (event: MatrixEvent, state: RoomState) => {
    const room = roomStateList.find(r => r.roomId === state.roomId);
    if (room) {
      console.log("RoomState.event", event);
    }
  };

  useListener(client, "RoomState.events", onRoomStateEvents, []);
  return roomStateList;
};
