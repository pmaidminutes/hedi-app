import React from "react";
import {
  IToastNotificationProps,
  transformToastNotification,
} from "./transformToastNotification";
import { ToastNotification as CarbonToastNotification } from "carbon-components-react";
export const ToastNotification = (props: IToastNotificationProps) => {
  const {
    caption,
    lowContrast,
    title,
    subtitle,
    hideCloseButton,
    kind,
    ariaRole,
  } = transformToastNotification(props);
  return (
    <CarbonToastNotification
      caption={caption}
      lowContrast={lowContrast}
      title={title}
      subtitle={subtitle}
      kind={kind}
      hideCloseButton={hideCloseButton}
      aria-role={ariaRole}></CarbonToastNotification>
  );
};
