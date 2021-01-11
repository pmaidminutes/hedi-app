import { IsIHTTPError } from "@/common/errorHandling";
import { queryServiceAuthHeader } from "@/modules/auth/query";
import { GQLEndpoint } from "./config";
import { getClient } from "./getClient";

export async function getServiceClient(endpoint = GQLEndpoint.Public) {
  if (!(process.env.SERVICE_USER && process.env.SERVICE_SECRET))
    throw new Error("[API SERVICE]: either service id or secret not specified");

  const headers = await queryServiceAuthHeader(
    process.env.SERVICE_USER,
    process.env.SERVICE_SECRET
  );
  if (!IsIHTTPError(headers)) return getClient(endpoint, headers);

  throw new Error("[API SERVICE]: service could not log in");
}
