import { useEffect, useState } from "react";

export const useRegistrationError = (registrationcode: string) => {
  const [isCheckRegisterCodeError, setIsCheckRegisterCodeError] = useState(
    false
  );

  useEffect(() => {
    if (registrationcode) {
      setIsCheckRegisterCodeError(false);
    }
  }, [registrationcode]);
  const handleCheckRegisterError = () => {
    setIsCheckRegisterCodeError(true);
  };
  return { isCheckRegisterCodeError, handleCheckRegisterError };
};
