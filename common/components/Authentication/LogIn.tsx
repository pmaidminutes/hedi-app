import { useState } from "react";
import { LogInModal } from "./LogInModal";
import ReactDOM from "react-dom";

export const LogIn = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <LogInModal open={open} onClose={() => setOpen(false)} />,
            document.body
          )}

      <button
        className="bx--btn bx--btn--primary hedi-login-button"
        type="button"
        onClick={() => setOpen(true)}>
        Login
      </button>
    </>
  );
};
