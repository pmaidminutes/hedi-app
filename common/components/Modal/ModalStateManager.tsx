import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "./Modal";

export const ModalStateManager = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <Modal open={open} onClose={() => setOpen(false)} />,
            document.body
          )}

      <button
        className="bx--btn bx--btn--primary"
        type="button"
        data-modal-target="#modal-lokx1olb9q"
        onClick={() => setOpen(true)}>
        Show modal
      </button>
    </>
  );
};
