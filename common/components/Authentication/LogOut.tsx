import { logout } from "@/modules/auth/client";
import { Button, FormGroup } from "carbon-components-react";

export const LogOut = ({label}:{label:string}) => (
  <FormGroup legendText={label??''}>
    <Button type="submit" value="Logout" onClick={logout} label>Logout</Button>
  </FormGroup>
);