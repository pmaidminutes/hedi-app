import { logout } from "../../functions";
import { Button } from "carbon-components-react";

export const LogOut = ({ label }: { label: string }) => (
  <Button type="button" onClick={logout}>
    Logout
  </Button>
);
