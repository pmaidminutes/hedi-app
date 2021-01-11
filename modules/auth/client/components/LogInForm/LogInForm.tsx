import { FormEvent } from "react";
import { login } from "../../functions";
import { useTextInput } from "@/modules/react/hooks";
import { Form } from "carbon-components-react";

export const LogInForm = ({ onClose }: { onClose?: () => void }) => {
  const [username, setUsername] = useTextInput();
  const [password, setPassword] = useTextInput();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="bx--modal-header">
        <p
          className="bx--modal-header__heading bx--type-beta"
          id="modal-pyu0ribosn-heading">
          Please log in
        </p>
        {onClose && (
          <button
            className="bx--modal-close"
            type="button"
            data-modal-close
            aria-label="close modal"
            onClick={() => onClose()}>
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
        )}
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
        <button className="bx--btn bx--btn--primary" type="submit">
          log in
        </button>
      </div>
    </Form>
  );
};
