import { useEffect, useState } from "react";
import { IRegisterError, IRegisterInfo } from "../../types";

export const useCredentialChange = (
  name: string,
  pass: string,
  errors?: IRegisterError,
  onChange?: (info: IRegisterInfo) => void
) => {
  const [isCheckCredentialError, setIsCheckCredentialError] = useState(true);
  useEffect(() => {
    if (onChange && (name || pass)) {
      onChange({ name, pass });
      setIsCheckCredentialError(false);
    }
  }, [name, pass]);
  useEffect(() => {
    setIsCheckCredentialError(true);
  }, [errors]);

  return { isCheckCredentialError, onChange };
};
