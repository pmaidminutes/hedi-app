import { GraphQLClient } from "graphql-request";
import {
  toAuthHeader,
  getServiceAuth,
  IAuthHeader,
} from "@/modules/auth/server";

export { gql } from "graphql-request";

export enum GQLEndpoint {
  Public = "/public",
  Secure = "/secure",
}

export function getClient(endpoint = GQLEndpoint.Public, headers: IAuthHeader) {
  if (!process.env.GQL_URL) throw new Error("[API]: no server url specified");

  return new GraphQLClient(process.env.GQL_URL + endpoint, { headers });
}

export async function getServiceClient(endpoint = GQLEndpoint.Public) {
  if (!(process.env.SERVICE_USER && process.env.SERVICE_SECRET))
    throw new Error("[API SERVICE]: either service id or secret not specified");

  const headers = await getServiceAuth(
    process.env.SERVICE_USER,
    process.env.SERVICE_SECRET
  );
  if (headers) return getClient(endpoint, toAuthHeader(headers));

  throw new Error("[API SERVICE]: service could not log in");
}
