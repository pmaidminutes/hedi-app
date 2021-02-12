import { FormEvent } from "react";
import { Modal, TextInput, Form, Button } from "carbon-components-react";
import { login } from "../../functions";
import { useTextInput } from "@/modules/react/hooks";

export const LogInModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) => {
  const [username, setUsername] = useTextInput();
  const [password, setPassword] = useTextInput();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Modal
      open={open}
      hasForm
      aria-modal="true"
      modalAriaLabel="Login Modal"
      onRequestClose={onClose}
      passiveModal={true}
      modalHeading="Please log in">
      <Form onSubmit={handleSubmit}>
        <TextInput
          labelText="username additional info"
          placeholder="Username"
          id="username"
          value={username}
          onChange={setUsername}
          type="text"
        />
        <TextInput
          labelText="password additional info"
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit">login</Button>
      </Form>
    </Modal>
  );
};
