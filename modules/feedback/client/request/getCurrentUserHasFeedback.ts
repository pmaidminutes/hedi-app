import { jsonFetcher } from "@/modules/common/utils";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { currentUserHasFeedbackAPIUrl } from "../../types";

export function getCurrentUserHasFeedback(
  user: User | undefined
): [boolean, boolean] {
  const [hasFeedback, setHasFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestHasFeedback = async () => {
      setIsLoading(true);
      const resp = await jsonFetcher<boolean | null>(
        currentUserHasFeedbackAPIUrl
      );
      if (resp) setHasFeedback(resp);

      setIsLoading(false);
    };

    if (user?.name) requestHasFeedback();
  }, [user?.name]);

  return [hasFeedback, isLoading];
}
