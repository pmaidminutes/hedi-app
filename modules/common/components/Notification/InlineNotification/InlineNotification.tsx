import React from "react";
import {
  transformInlineNotification,
  IInlineNotificationProps,
} from "./transformInlineNotification";
import { InlineNotification as CarbonInlieNotification } from "carbon-components-react";

export const InlineNotification = (props: IInlineNotificationProps) => {
  const {
    title,
    subtitle,
    kind,
    lowContrast,
    hideCloseButton,
     ariaRole
  } = transformInlineNotification(props);
  return (
    <CarbonInlieNotification
      title={title}
      subtitle={subtitle}
      kind={kind}
      lowContrast={lowContrast}
      hideCloseButton={hideCloseButton}
      aria-role={ariaRole}
    />
  );
};
