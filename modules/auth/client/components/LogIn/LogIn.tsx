import { useState } from "react";
import { LogInModal } from "../LogInModal";
import ReactDOM from "react-dom";
import { Button } from "carbon-components-react";
export const LogIn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <LogInModal open={isOpen} onClose={() => setIsOpen(false)} />,
            document.body
          )}

      <Button type="button" onClick={() => setIsOpen(true)}>
        Login
      </Button>
    </>
  );
};
