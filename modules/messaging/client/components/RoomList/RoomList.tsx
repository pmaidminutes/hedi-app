import { Dispatch, SetStateAction } from "react";
import { Room } from "matrix-js-sdk";
import { useMessagingService } from "../../context/MessagingService";
import { RoomInfo } from "../RoomInfo";
import { useRoomListSubscription } from "./useSubscription";
import { useRoomSelectOptions } from "./useViewState";

// roomSelectionOptions instead of just radio buttons allowing multiple Room Views at the same time
export const RoomList = ({
  setSelection,
}: {
  setSelection?: Dispatch<SetStateAction<string[]>>;
}) => {
  const client = useMessagingService();
  const roomStates = useRoomListSubscription(client);

  const roomSelectOptions = useRoomSelectOptions(
    roomStates,
    setSelection,
    true
  );
  return (
    <>
      {roomSelectOptions.map(opt => {
        const room = client.getRoom(opt.roomId);
        return room ? (
          <RoomInfo
            room={client.getRoom(opt.roomId) as Room}
            value={opt.roomId}
            onChange={opt.onChange}
            selected={opt.selected}
            key={opt.roomId}
          />
        ) : null;
      })}
    </>
  );
};
