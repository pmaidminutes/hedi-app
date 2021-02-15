import { useEffect, useState } from "react";
import { TileGroup, RadioTile, InlineLoading } from "carbon-components-react";
import { useMsgClient } from "../../context";
import { MatrixRoom } from "../../../types";

export const Rooms = ({
  onSelect,
}: {
  onSelect: (room: MatrixRoom) => void;
}) => {
  const [rooms, setRooms] = useState<MatrixRoom[]>();
  const client = useMsgClient();

  const updateRooms = (formerRooms: MatrixRoom[], room: MatrixRoom) => {
    const formerIndex = formerRooms.findIndex(r => r.roomId === room.roomId);
    if (formerIndex < 0) return [...formerRooms, room];
    else {
      formerRooms[formerIndex] = room;
      return [...formerRooms];
    }
  };

  const listener = (room: MatrixRoom) => {
    if (room.hasMembershipState(client.credentials.userId, "invite")) {
      console.log("joined", room.name);
      client.joinRoom(room.roomId, { syncRoom: true });
    }

    setRooms(prev => updateRooms(prev ?? [], room));
  };

  useEffect(() => {
    setRooms(client.getRooms());
    client?.removeListener("Room", listener);
    client?.addListener("Room", listener);
    return () => {
      client?.removeListener("Room", listener);
    };
  }, [client]);

  return !rooms ? (
    <InlineLoading />
  ) : (
    <TileGroup
      name="Conversations"
      legend="Conversations"
      onChange={e => {
        const room = rooms?.find(r => r.name === e.valueOf());
        if (room) onSelect(room);
      }}>
      {rooms.map(room => (
        <RadioTile value={room.name} key={room.name}>
          {room.name}
        </RadioTile>
      ))}
    </TileGroup>
  );
};
