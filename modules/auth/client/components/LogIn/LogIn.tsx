import { useState } from "react";
import { LogInModal } from "../LogInModal";
import ReactDOM from "react-dom";
import { Button } from "carbon-components-react";
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

      <Button type="button" onClick={() => setOpen(true)}>
        Login
      </Button>
    </>
  );
};
