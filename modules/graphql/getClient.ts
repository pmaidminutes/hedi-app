import { GraphQLClient } from "graphql-request";
import { IAuthHeader } from "@/modules/auth/types";
import { GQLEndpoint } from "./config";

export function getClient(endpoint = GQLEndpoint.Public, headers: IAuthHeader) {
  if (!process.env.GQL_URL) throw new Error("[API]: no server url specified");

  return new GraphQLClient(process.env.GQL_URL + endpoint, { headers });
}
