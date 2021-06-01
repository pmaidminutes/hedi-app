import { useRouter } from "next/router";
import {
  SyntheticEvent,
  useState,
  FormEventHandler,
  FormEvent,
  useEffect,
} from "react";
import { useAuthorizedRedirect } from "@/modules/react/hooks";
import { login, getUser } from "@/modules/auth/client";

export function useLogin(redirectUrl: string) {
  const router = useRouter();
  const handleBackButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    router.back();
  };
  useAuthorizedRedirect(redirectUrl);
  const [user] = getUser();

  const [isLoggedIn, setIsLoggedIn] = useState(user !== undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user !== undefined);
  }, [user]);

  const handleLogin: FormEventHandler<HTMLFormElement> = event => {
    if (redirectUrl) router.prefetch(redirectUrl);
    setIsLoading(true);
    setHasError(false);
    setIsSuccess(false);
    submitLogin(event, redirectUrl).then(resp => {
      setIsLoading(false);
      if (!resp.ok) setHasError(true);
      else setIsSuccess(true);
    });
  };

  return { handleBackButtonClick, handleLogin, isLoading, hasError, isSuccess, isLoggedIn };
}

function submitLogin(event: FormEvent<HTMLFormElement>, redirectUrl?: string) {
  event.preventDefault();
  const {
    username: { value: username },
    password: { value: password },
  } = event.target as typeof event.target & {
    username: { value: string };
    password: { value: string };
  };
  return login(username, password, redirectUrl);
}
