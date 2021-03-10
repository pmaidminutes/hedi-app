import { Room } from "matrix-js-sdk";
import {
  ListItem,
  UnorderedList,
  SelectableTile,
  SelectableTileProps,
} from "carbon-components-react";
import { useMessagingService } from "../../context/MessagingService";

//we should get latest message
//and toggle visual state along receipt state

export const RoomInfo = ({
  room,
  ...selectableTileProps
}: { room: Room } & SelectableTileProps) => {
  const client = useMessagingService();

  return (
    <SelectableTile {...selectableTileProps}>
      <h6>{room.name}</h6>
      <UnorderedList>
        {room
          .getJoinedMembers()
          .filter(m => m.userId !== client.currentUserId)
          .map(m => (
            <ListItem key={m.userId}>{m.name}</ListItem>
          ))}
      </UnorderedList>
    </SelectableTile>
  );
};
