import { Form, TextArea, Button } from "carbon-components-react";
import { useTextInput } from "@/modules/react/hooks";
import { useMessagingService } from "../../context/MessagingService";

//handle sending different things here
export const MessageComposer = ({ roomId }: { roomId: string }) => {
  const client = useMessagingService();
  const [text, handleText, setText] = useTextInput("");
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          message: { value: string };
        };
        if (target.message.value) {
          setText("");
          client.sendTextMessage(roomId, target.message.value, "");
        }
      }}>
      <TextArea
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
