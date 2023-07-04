import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { fetchExchange, gql, makeOperation, SSRExchange } from "urql";
import { resetAuthentication, setAuthentication } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { calcExpiresIn, calcIsExpiring } from "./calc";
import { fetchRefreshToken } from "./axios";
import Router from "next/router";
import { Cart, CartsDocument, ProductDocument, UserByUsernameDocument } from "@/generated/graphql";
import { devtoolsExchange } from "@urql/devtools";

export const createUrqlClient = (ssrExchange: SSRExchange) => ({
  url: process.env.GRAPHQL_SERVER_URL!,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    devtoolsExchange,
    cacheExchange({
      resolvers: {
        Query: {},
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            const key = "Query";
            cache.inspectFields(key).forEach((field) => {
              cache.invalidate(key, field.fieldKey);
            });
          },
          follow: (result, args, cache, info) => {
            const { auth } = store.getState();
            const followed_id = args.id;
            const followed = cache.readFragment(
              gql`
                fragment username on User {
                  id
                  username
                }
              `,
              { id: followed_id } as any
            );
            if (followed) {
              cache.updateQuery(
                { query: UserByUsernameDocument, variables: { username: followed.username } },
                (data) => {
                  if (!data) {
                    return null;
                  }
                  data.userByUsername.followers = [
                    ...data.userByUsername.followers,
                    result.follow as any,
                  ];
                  data.userByUsername.num_followers = data.userByUsername.num_followers + 1;
                  return data;
                }
              );
            }
            cache.updateQuery(
              { query: UserByUsernameDocument, variables: { username: auth.user!.username } },
              (data) => {
                if (!data) {
                  return null;
                }
                data.userByUsername.following = [
                  ...data.userByUsername.following,
                  result.follow as any,
                ];
                data.userByUsername.num_following = data.userByUsername.num_following + 1;
                return data;
              }
            );
          },
          unfollow: (_result, args, cache, info) => {
            const { auth } = store.getState();
            const unfollowed_id = args.id;
            const unfollowed = cache.readFragment(
              gql`
                fragment username on User {
                  id
                  username
                }
              `,
              { id: unfollowed_id } as any
            );
            if (unfollowed) {
              cache.updateQuery(
                { query: UserByUsernameDocument, variables: { username: unfollowed.username } },
                (data) => {
                  if (!data) {
                    return null;
                  }
                  data.userByUsername.followers = data.userByUsername.followers.filter(
                    (follower) => follower.id !== auth.user!.id
                  );
                  data.userByUsername.num_followers = data.userByUsername.num_followers - 1;
                  return data;
                }
              );
            }
            cache.updateQuery(
              { query: UserByUsernameDocument, variables: { username: auth.user!.username } },
              (data) => {
                if (!data) {
                  return null;
                }
                data.userByUsername.following = data.userByUsername.following.filter(
                  (followed) => followed.followed_id !== unfollowed_id
                );
                data.userByUsername.num_following = data.userByUsername.num_following - 1;
                return data;
              }
            );
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
          like: (result, args, cache, info) => {
            const product_id = args.id;
            cache.updateQuery(
              { query: ProductDocument, variables: { id: product_id as number } },
              (data) => {
                if (!data) {
                  return null;
                }
                data.product.likes = [...data.product.likes, result.like as any];
                data.product.num_likes = data.product.num_likes + 1;
                return data;
              }
            );
          },
          unlike: (_result, args, cache, info) => {
            const { auth } = store.getState();
            const product_id = args.id;
            cache.updateQuery(
              { query: ProductDocument, variables: { id: product_id as number } },
              (data) => {
                if (!data) {
                  return null;
                }
                data.product.likes = data.product.likes.filter((like) => like.id !== auth.user!.id);
                data.product.num_likes = data.product.num_likes - 1;
                return data;
              }
            );
          },
          addProductToCart: (result, args, cache, info) => {
            cache.updateQuery({ query: CartsDocument }, (data) => {
              if (!data) {
                return null;
              }
              if (!result || !result.addProductToCart) {
                return data;
              }
              const res = result.addProductToCart as Cart;
              if (data.carts.find((cart) => cart.id === res.id)) {
                data.carts = data.carts.map((cart) => {
                  if (cart.id === res.id) {
                    return res;
                  }
                  return cart;
                });
              } else {
                data.carts = [...data.carts, res];
              }
              return data;
            });
          },
          removeProductFromCart: (_result, args, cache, info) => {
            const cart_id = args.cart_id;
            const cart_item_id = args.cart_item_id;
            cache.updateQuery({ query: CartsDocument }, (data) => {
              if (!data) {
                return null;
              }
              const cart = data.carts.find((cart) => cart.id === cart_id);
              const cartIndex = data.carts.findIndex((cart) => cart.id === cart_id);

              if (!cart) {
                return data;
              }
              if (cart.cart_items.length <= 1) {
                data.carts = data.carts.filter((cart) => cart.id !== cart_id);
              } else {
                const newCart = cart.cart_items.filter((item) => item.id !== cart_item_id);
                data.carts = data.carts.filter((cart, index) => {
                  if (index === cartIndex) {
                    return newCart;
                  }
                  return cart;
                });
              }
              return data;
            });
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
