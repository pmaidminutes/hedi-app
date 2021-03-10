import { Grid, Row, Column } from "carbon-components-react";
import { useState } from "react";
import { getUser } from "@/modules/auth/client";
import { useMessagingService } from "../context";
import { RoomList, RoomView } from ".";
import { Dev } from "./Dev/Dev";

// HACK only for dev usage
export const MessagingAllInOne = () => {
  const client = useMessagingService();
  const [user, loading] = getUser();
  if (user) client.loginSSO();

  const [roomSelection, setRoomSelection] = useState<string[]>([]);
  return (
    <Grid condensed fullWidth>
      <Row>
        <Column>
          <Dev />
        </Column>
      </Row>
      <Row>
        <Column sm={2} md={2} lg={3}>
          <RoomList setSelection={setRoomSelection} />
        </Column>
        {roomSelection.map(roomId => (
          <Column key={roomId}>
            <RoomView roomId={roomId} />
          </Column>
        ))}
      </Row>
    </Grid>
  );
};
