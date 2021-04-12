import { IAuthHeader } from "@/modules/auth/types";
import { IsIHTTPError } from "@/modules/common/error";
import { GraphQLClient } from "graphql-request";
import {
  Variables,
  RequestDocument,
  ClientError,
} from "graphql-request/dist/types";
import { getServiceAuth } from "@/modules/auth/server/serviceSession";
import { IGQLError } from "./types";
import { internalClient, publicClient, userClient } from "./clients";

export const publicGQuery = async <T>(
  headers: IAuthHeader,
  document: RequestDocument,
  variables?: Variables
) => gQuery<T>(publicClient, headers, document, variables);

export const userGQuery = async <T>(
  headers: IAuthHeader,
  document: RequestDocument,
  variables?: Variables
) => gQuery<T>(userClient, headers, document, variables);

export const serviceGQuery = async <T>(
  document: RequestDocument,
  variables?: Variables,
  client = internalClient
) => {
  const headers = await getServiceAuth();

  if (IsIHTTPError(headers)) return headers as IGQLError;
  return gQuery<T>(client, headers, document, variables);
};

async function gQuery<T>(
  client: GraphQLClient,
  headers: IAuthHeader,
  document: RequestDocument,
  variables?: Variables
) {
  return client
    .setHeaders(headers)
    .request<T>(document, variables)
    .catch<IGQLError>((e: ClientError) =>
      e.response.status === 200 // means query (string) had errors
        ? {
            status: 400,
            errors: e.response.errors,
          }
        : {
            status: e.response.status,
            errors: [{ message: e.response.message }],
          }
    );
}
