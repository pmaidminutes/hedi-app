import { Form, TextInput, Button } from "carbon-components-react";
import { useTextInput } from "@/modules/react/hooks";
import { MatrixRoom } from "../../../types";
import { useMsgClient } from "../../context";

export const MessageInput = ({ room }: { room: MatrixRoom }) => {
  const [text, handleText, setText] = useTextInput("");
  const client = useMsgClient();
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          message: { value: string };
        };
        if (target.message.value) {
          setText("");
          client.sendTextMessage(room.roomId, target.message.value, "");
        }
      }}>
      <TextInput
        id="message"
        labelText="asdf"
        hideLabel
        placeholder="..."
        value={text}
        onChange={handleText}
      />
      <Button type="submit" size="field">
        Send
      </Button>
    </Form>
  );
};
