import { GraphQLClient } from "graphql-request";
import { IAuthHeader } from "@/modules/auth/types";
import { GQLEndpoint } from "./config";
import { join } from "path";

export function getClient(endpoint = GQLEndpoint.Public, headers: IAuthHeader) {
  if (!process.env.GQL_URL) {
    throw new Error("[API]: no server url specified");
  }
  const clientURL = new URL(process.env.GQL_URL);
  clientURL.pathname = join(clientURL.pathname, endpoint);
  return new GraphQLClient(clientURL.href, { headers });
}
