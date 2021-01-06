import { logout } from "../../functions";
import { FormGroup } from "carbon-components-react";

export const LogOut = ({ label }: { label: string }) => (
  // <FormGroup legendText={label ?? ""}>
  <button
    className="bx--btn bx--btn--sm hedi-login-button"
    type="button"
    onClick={logout}>
    Logout
  </button>
  // </FormGroup>
);
