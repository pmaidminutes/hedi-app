import { useRef } from "react";
import { login } from "@/modules/auth/client";
import { useOnClickOutside, useTextInput } from "@/common/hooks";

export const LoginModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) => {
  const [username, setUsername] = useTextInput();
  const [password, setPassword] = useTextInput();
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose();
  };
  useOnClickOutside(ref, () => handleClose());

  // TODO: handle TS
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <form action={handleSubmit}>
      <div
        className={`bx--modal ${open ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        // TODO: add label and description
        // aria-labelledby="modal-pyu0ribosn-label"
        // aria-describedby="modal-pyu0ribosn-heading"
        tabIndex={-1}>
        {/* TODO: typescript def */}
        <div className="bx--modal-container" ref={ref}>
          <div className="bx--modal-header">
            <p
              className="bx--modal-header__heading bx--type-beta"
              id="modal-pyu0ribosn-heading">
              Please log in
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

          <div className="bx--modal-content bx--modal-content--with-form">
            <div className="bx--form-item">
              <label htmlFor="username" className="bx--label">
                username additional info
              </label>
              <input
                type="text"
                className="bx--text-input"
                placeholder="Username"
                id="username"
                value={username}
                onChange={setUsername}
              />
              <br />
              <label htmlFor="password" className="bx--label">
                password additional info
              </label>
              <input
                className="bx--text-input"
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={setPassword}
              />
            </div>
          </div>

          <div className="hedi-modal-footer">
            <button
              className="bx--btn bx--btn--secondary"
              type="button"
              onClick={() => handleClose()}>
              close
            </button>
            <button className="bx--btn bx--btn--primary" type="submit">
              log in
            </button>
          </div>
        </div>
        <span tabIndex={0}></span>
      </div>
    </form>
  );
};
