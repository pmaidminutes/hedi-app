import { IsIHTTPError } from "@/modules/common/error";
import { getServiceAuth } from "@/modules/auth/server";
import { GQLEndpoint } from "./config";
import { getClient } from "./getClient";

export async function getServiceClient(endpoint = GQLEndpoint.Public) {
  const headers = await getServiceAuth();
  if (!IsIHTTPError(headers)) return getClient(endpoint, headers);

  throw new Error("[API SERVICE]: service could not log in");
}
