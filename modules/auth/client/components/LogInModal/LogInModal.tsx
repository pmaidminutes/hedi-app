import { useRef } from "react";
import { useOnClickOutside } from "@/modules/common/hooks";
import { LogInForm } from "../LogInForm";

export const LogInModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: VoidFunction;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => onClose());

  return (
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
        <LogInForm onClose={onClose} />
      </div>
      <span tabIndex={0}></span>
    </div>
  );
};
