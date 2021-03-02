import {
  Tile,
  OrderedList,
  ListItem,
  TileGroup,
} from "carbon-components-react";
import { MessageComposer } from "../MessageComposer/MessageComposer";
import { useMessagingService } from "../../context/MessagingService";
import { Timeline } from "../Timeline/Timeline";

export const RoomView = ({ roomId }: { roomId: string }) => {
  const client = useMessagingService();
  const room = client.getRoom(roomId);
  //roomHeader
  //Timeline
  //MessageComposer

  // on Room -> onRoomLoaded
  // called when state.room is first initialised (either at initial load,
  // after a successful peek, or after we join the room).
  //on RoomState.event check send permission

  if (!room) return null;
  return (
    <>
      <h5>roomheader: {roomId}</h5>
      <Timeline room={room} />
      <MessageComposer roomId={roomId} />
    </>
  );
};
