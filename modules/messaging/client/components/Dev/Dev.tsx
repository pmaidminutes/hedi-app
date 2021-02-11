import {
  Form,
  TextInput,
  Button,
  Checkbox,
  ExpandableTile,
  TileBelowTheFoldContent,
  TileAboveTheFoldContent,
} from "carbon-components-react";
import { useTextInput } from "@/modules/react/hooks";
import { useMsgClient } from "../../context";

export const Dev = () => {
  const [newRoom, handleNewRoom, setNewRoom] = useTextInput("");
  const [username, handleUsername, setUserName] = useTextInput("");
  const [inviteRoom, handleInviteRoom, setInviteRoom] = useTextInput("");
  const client = useMsgClient();
  return (
    <ExpandableTile>
      <TileAboveTheFoldContent>
        <h4>dev only</h4>
        {client.credentials.userId}
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <Form
          onSubmit={e => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              newRoomName: { value: string };
              visibility: { checked?: boolean };
            };
            if (target.newRoomName.value) {
              setNewRoom("");
              client.createRoom({
                name: target.newRoomName.value,
                visibility: target.visibility.checked ? "public" : "private",
              });
            }
          }}>
          <TextInput
            id="newRoomName"
            labelText="Room Name"
            placeholder="..."
            value={newRoom}
            onChange={handleNewRoom}
          />
          <Checkbox id="visibility" labelText="is public" />
          <Button type="submit" size="field">
            Create Room
          </Button>
        </Form>
        <Form
          onSubmit={e => {
            e.preventDefault();
            const {
              username: { value: name },
              inviteRoomName: { value: roomname },
            } = e.target as typeof e.target & {
              username: { value: string };
              inviteRoomName: { value: string };
            };
            if (name && roomname) {
              const room = client
                .getRooms()
                .find(r => r.name.includes(roomname));
              if (room) {
                setUserName("");
                setInviteRoom("");
                client.invite(room.roomId, `@${name}:hedi.msg`);
              }
            }
          }}>
          <TextInput
            id="username"
            labelText="User"
            placeholder="..."
            value={username}
            onChange={handleUsername}
          />
          <TextInput
            id="inviteRoomName"
            labelText="Room"
            placeholder="..."
            value={inviteRoom}
            onChange={handleInviteRoom}
          />
          <Button type="submit" size="field">
            Invite
          </Button>
        </Form>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
};
