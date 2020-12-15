import React from "react";

export const Modal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div
        data-modal
        id="modal-lokx1olb9q"
        className={`bx--modal ${open ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-lokx1olb9q-label"
        aria-describedby="modal-lokx1olb9q-heading"
        tabIndex={-1}>
        <div className="bx--modal-container">
          <div className="bx--modal-header">
            <p
              className="bx--modal-header__label bx--type-delta"
              id="modal-lokx1olb9q-label">
              Optional label
            </p>
            <p
              className="bx--modal-header__heading bx--type-beta"
              id="modal-lokx1olb9q-heading">
              Modal heading
            </p>
            <button
              className="bx--modal-close"
              type="button"
              data-modal-close
              aria-label="close modal"
              onClick={() => handleClose()}>
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                // style={{will-change: "transform";}}
                xmlns="http://www.w3.org/2000/svg"
                className="bx--modal-close__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true">
                <path d="M12 4.7L11.3 4 8 7.3 4.7 4 4 4.7 7.3 8 4 11.3 4.7 12 8 8.7 11.3 12 12 11.3 8.7 8z"></path>
              </svg>
            </button>
          </div>
          {/* 
    <!-- Note: Modals with content that scrolls, at any viewport, requires `tabindex="0"` on the `bx--modal-content` element --> */}

          <div className="bx--modal-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{" "}
            </p>
          </div>
          <div className="bx--modal-content--overflow-indicator"></div>

          <div className="bx--modal-footer">
            <button
              className="bx--btn bx--btn--secondary"
              type="button"
              data-modal-close>
              Secondary button
            </button>
            <button
              className="bx--btn bx--btn--primary"
              type="button"
              data-modal-primary-focus>
              Primary button
            </button>
          </div>
        </div>
        {/* <!-- Note: focusable span allows for focus wrap feature within Modals --> */}
        <span tabIndex={0}></span>
      </div>
    </>
  );
};
