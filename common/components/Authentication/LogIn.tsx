import {  useState } from "react";
import { LoginModal } from "./LoginModal";
import ReactDOM from "react-dom";


export const LogIn = () => {
  const [open, setOpen] = useState(false);

  // useOnClickOutside(ref, () => setOpen(false));
  return (
    <>
      {typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <LoginModal  open={open} onClose={() => setOpen(false)} />,
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
