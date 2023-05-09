import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, fetchExchange, ssrExchange, makeOperation } from "urql";
import { resetAuthentication, setAuthentication } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { calcExpiresIn, calcIsExpiring } from "./calc";
import { fetchRefreshToken } from "./fetchWithAxios";
import { isServer } from "./isServer";
import Router from "next/router";

export const urqlSsrCache = ssrExchange({ isClient: !isServer() });

export const createUrqlClient = () =>
  createClient({
    url: process.env.GRAPHQL_SERVER_URL!,
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [
      cacheExchange(),
      authExchange(async () => {
        let { auth } = store.getState();
        return {
          addAuthToOperation(operation) {
            if (!auth.isAuthenticated || !auth.access_token) {
              return operation;
            }

            const fetchOptions =
              typeof operation.context.fetchOptions === "function"
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${auth.access_token}`,
                },
              },
            });
          },
          didAuthError(error, _operation) {
            return error.graphQLErrors.some((e) => e.message === "Not Authenticated");
          },
          async refreshAuth() {
            const data = await fetchRefreshToken();
            if ("error" in data) {
              console.log("forced log out");
              store.dispatch(resetAuthentication());
              Router.push("/");
            } else {
              console.log("refreshed auth");
              const expires_in = calcExpiresIn(data.expires_in);
              auth.access_token = data.access_token;
              auth.expires_in = expires_in;
              store.dispatch(
                setAuthentication({
                  isAuthenticated: true,
                  access_token: data.access_token,
                  expires_in: expires_in,
                  user: data.user,
                })
              );
            }
          },
          willAuthError(operation) {
            if (!auth.isAuthenticated || !auth.expires_in) {
              return !(
                operation.kind === "mutation" &&
                operation.query.definitions.some((definition) => {
                  return (
                    definition.kind === "OperationDefinition" &&
                    definition.selectionSet.selections.some((node) => {
                      return (
                        node.kind === "Field" &&
                        (node.name.value === "login" ||
                          node.name.value === "register" ||
                          node.name.value === "loginWithGoogle" ||
                          node.name.value === "registerWithGoogle" ||
                          node.name.value === "forgotPassword" ||
                          node.name.value === "changeForgotPassword")
                      );
                    })
                  );
                })
              );
            } else {
              const isExpiring = calcIsExpiring(auth.expires_in);
              console.log("token check");
              console.log(isExpiring ? "token expired" : "token good");
              return isExpiring;
            }
          },
        };
      }),
      fetchExchange,
    ],
  });
