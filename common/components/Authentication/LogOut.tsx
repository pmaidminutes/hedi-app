import { logout } from "@/modules/auth/client";
import { FormGroup } from "carbon-components-react";

export const LogOut = ({ label }: { label: string }) => (
  <FormGroup legendText={label ?? ""}>
    <button
      className="bx--btn bx--btn--primary hedi-login-button"
      type="button"
      onClick={logout}>
      Logout
    </button>
  </FormGroup>
);
