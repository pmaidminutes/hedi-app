import { jsonFetcher } from "@/modules/common/utils";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { currentUserHasFeedbackAPIUrl } from "../../types";

export function getCurrentUserHasFeedback(
  user: User | undefined
): [boolean, boolean] {
  const [hasFeedback, setHasFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestHasFeedback = async () => {
      setLoading(true);
      const resp = await jsonFetcher<boolean | null>(
        currentUserHasFeedbackAPIUrl
      );
      if (resp) setHasFeedback(resp);

      setLoading(false);
    };

    if (user?.name) requestHasFeedback();
  }, [user?.name]);

  return [hasFeedback, loading];
}
