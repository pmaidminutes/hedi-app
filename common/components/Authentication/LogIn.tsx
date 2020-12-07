import { login } from "@/modules/auth/client";
import { Button, Form, TextInput } from "carbon-components-react";
import { ChangeEvent, FormEvent, useState } from "react";

export const LogIn = () => {
  const [username, setUsername] = useTextInput();
  const [password, setPassword] = useTextInput();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username,password);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <TextInput labelText="Username" id="username" value={username} onChange={setUsername} />
      <TextInput type="password" labelText="Password" id="password" value={password} onChange={setPassword}/>
      <Button type="submit" value="Submit">Login</Button>
    </Form>
  );
};

function useTextInput(defaultText = ''){
  const [value,setValue] = useState(defaultText);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);    
  };
  return [value,handleChange] as const;
}
