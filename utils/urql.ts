import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { fetchExchange, makeOperation, SSRExchange } from "urql";
import { resetAuthentication, setAuthentication } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { calcExpiresIn, calcIsExpiring } from "./calc";
import { fetchRefreshToken } from "./axios";
import Router from "next/router";
import { Cache, QueryInput } from "@urql/exchange-graphcache";

function updateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const createUrqlClient = (ssrExchange: SSRExchange) => ({
  url: process.env.GRAPHQL_SERVER_URL!,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            const key = "Query";
            cache.inspectFields(key).forEach((field) => {
              cache.invalidate(key, field.fieldKey);
            });
          },
          follow: (_result, args, cache, info) => {
            const key = "Query";
            cache
              .inspectFields(key)
              .filter((field) => field.fieldName === "userByUsername")
              .forEach((field) => {
                cache.invalidate(key, field.fieldKey);
              });
          },
          createProduct: (_result, args, cache, info) => {
            const { auth } = store.getState();
            const key = "Query";
            cache
              .inspectFields(key)
              .filter((field) => field.fieldName === "userByUsername")
              .forEach((field) => {
                if (field.arguments!.username === auth.user!.username) {
                  cache.invalidate(key, field.fieldKey);
                }
              });
          },
          like: (_result, args, cache, info) => {
            const key = "Query";
            cache
              .inspectFields(key)
              .filter((field) => field.fieldName === "product")
              .forEach((field) => {
                if (field.arguments!.id === args!.id) {
                  cache.invalidate(key, field.fieldKey);
                }
              });
          },
          addProductToCart: (_result, args, cache, info) => {
            cache.invalidate("Query", "carts");
          },
          removeProductFromCart: (_result, args, cache, info) => {
            cache.invalidate("Query", "carts");
          },
        },
      },
    }),
    ssrExchange,
    authExchange(async () => {
      return {
        addAuthToOperation(operation) {
          const { auth } = store.getState();
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
          const { auth } = store.getState();
          if (operation.kind === "query") {
            return false;
          } else if (!auth.isAuthenticated || !auth.expires_in) {
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
