import { logout } from "@/modules/auth/client";
import { FormGroup } from "carbon-components-react";

export const LogOut = ({ label }: { label: string }) => (
  <FormGroup legendText={label ?? ""}>
    {/* HACK */}
    <div style={{ position: "relative" }}>
      <span
        style={{
          color: "#fff",
          fontSize: "0.8em",
          position: "absolute",
          top: "-15px",
          left: "-15px"
        }}>
        {label}
      </span>
      <button
        className="bx--btn bx--btn--primary hedi-login-button"
        type="button"
        onClick={logout}>
        Logout
      </button>
    </div>
  </FormGroup>
);
