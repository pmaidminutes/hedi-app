import React from "react";
import { IButtonProps, ILinkProps, Button, Link } from "../index";

export interface IButtonHintLinkProps {
  button: IButtonProps;
  link: ILinkProps;
  text: string;
}

export const ButtonHintLink = (props: IButtonHintLinkProps) => {
  const { button, link, text } = props;
  return (
    <div className="hedi--button-hint-text">
      {button && <Button {...button} />}
      <span>
        {text && text}{" "}
        {link && <Link {...link} />}
      </span>
    </div>
  );
};
