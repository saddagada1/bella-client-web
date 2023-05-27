/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment AuthObject on Auth {\n  access_token\n  expires_in\n}": types.AuthObjectFragmentDoc,
    "fragment AuthResponseObject on AuthResponse {\n  errors {\n    ...FieldErrorObject\n  }\n  user {\n    ...UserObject\n  }\n  auth {\n    ...AuthObject\n  }\n}": types.AuthResponseObjectFragmentDoc,
    "fragment CartItemObject on CartItem {\n  id\n  name\n  price\n  shipping_price\n  images\n  product_id\n  cart_id\n}": types.CartItemObjectFragmentDoc,
    "fragment CartObject on Cart {\n  id\n  store_id\n  user_id\n}": types.CartObjectFragmentDoc,
    "fragment FieldErrorObject on FieldError {\n  field\n  message\n}": types.FieldErrorObjectFragmentDoc,
    "fragment FollowObject on Follow {\n  id\n  followed_by_id\n  followed_id\n  created_at\n}": types.FollowObjectFragmentDoc,
    "fragment LikeObject on Like {\n  id\n  user_id\n  product_id\n}": types.LikeObjectFragmentDoc,
    "fragment ProductObject on Product {\n  id\n  images\n  name\n  description\n  department\n  category\n  subcategory\n  condition\n  quantity\n  size\n  designer\n  colour\n  source\n  era\n  style\n  country\n  offer_free_shipping\n  shipping_price\n  offer_global_shipping\n  global_shipping_price\n  price\n  sold\n  store_id\n  updated_at\n  created_at\n}": types.ProductObjectFragmentDoc,
    "fragment StoreObject on Store {\n  id\n  paypal_merchant_id\n  paypal_setup\n  first_name\n  last_name\n  line_1\n  line_2\n  city\n  province\n  zip\n  country\n  user_id\n}": types.StoreObjectFragmentDoc,
    "fragment UserObject on User {\n  id\n  verified\n  oauth_user\n  email\n  username\n  token_version\n  first_name\n  last_name\n  bio\n  has_store\n  updated_at\n  created_at\n}": types.UserObjectFragmentDoc,
    "fragment UserResponseObject on UserResponse {\n  errors {\n    ...FieldErrorObject\n  }\n  user {\n    ...UserObject\n  }\n}": types.UserResponseObjectFragmentDoc,
    "mutation ChangeAbout($changeAboutOptions: ChangeAboutInput!) {\n  changeAbout(changeAboutOptions: $changeAboutOptions) {\n    ...UserObject\n  }\n}": types.ChangeAboutDocument,
    "mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    ...UserResponseObject\n  }\n}": types.ChangeEmailDocument,
    "mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    ...UserResponseObject\n  }\n}": types.ChangePasswordDocument,
    "mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    ...UserResponseObject\n  }\n}": types.ChangeUsernameDocument,
    "mutation CreateProduct($productInput: CreateProductInput!) {\n  createProduct(ProductInput: $productInput) {\n    id\n    upload_urls\n  }\n}": types.CreateProductDocument,
    "mutation CreateStore($createStoreInput: CreateStoreInput!) {\n  createStore(createStoreInput: $createStoreInput) {\n    ...StoreObject\n  }\n}": types.CreateStoreDocument,
    "mutation DeleteProduct($id: Float!) {\n  deleteProduct(id: $id)\n}": types.DeleteProductDocument,
    "mutation Follow($id: Float!) {\n  follow(id: $id)\n}": types.FollowDocument,
    "mutation Like($id: Float!) {\n  like(id: $id)\n}": types.LikeDocument,
    "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    ...AuthResponseObject\n  }\n}": types.LoginDocument,
    "mutation LoginWithGoogle {\n  loginWithGoogle {\n    ...AuthResponseObject\n  }\n}": types.LoginWithGoogleDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    ...AuthResponseObject\n  }\n}": types.RegisterDocument,
    "mutation RegisterWithGoogle($registerOptions: RegisterWithGoogleInput!) {\n  registerWithGoogle(registerOptions: $registerOptions) {\n    ...AuthResponseObject\n  }\n}": types.RegisterWithGoogleDocument,
    "mutation RemoveProductFromCart($cartItemId: Float!) {\n  removeProductFromCart(cart_item_id: $cartItemId)\n}": types.RemoveProductFromCartDocument,
    "mutation SendVerifyEmail {\n  sendVerifyEmail\n}": types.SendVerifyEmailDocument,
    "mutation SetPaypalMerchantId($paypalMerchantId: String!) {\n  setPaypalMerchantId(paypal_merchant_id: $paypalMerchantId) {\n    ...StoreObject\n  }\n}": types.SetPaypalMerchantIdDocument,
    "mutation SetPaypalMerchantStatus($paypalMerchantStatus: Boolean!) {\n  setPaypalMerchantStatus(paypal_merchant_status: $paypalMerchantStatus) {\n    ...StoreObject\n  }\n}": types.SetPaypalMerchantStatusDocument,
    "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    ...UserResponseObject\n  }\n}": types.VerifyEmailDocument,
    "query PaypalMerchantLink($storeId: Float!) {\n  paypalMerchantLink(store_id: $storeId) {\n    links {\n      href\n      rel\n      method\n    }\n    fetch_error {\n      error\n    }\n  }\n}": types.PaypalMerchantLinkDocument,
    "query Product($id: Float!) {\n  product(id: $id) {\n    ...ProductObject\n    store {\n      ...StoreObject\n      user {\n        ...UserObject\n      }\n    }\n    likes {\n      ...LikeObject\n    }\n  }\n}": types.ProductDocument,
    "query Store {\n  store {\n    ...StoreObject\n  }\n}": types.StoreDocument,
    "query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    ...UserObject\n    followers {\n      ...FollowObject\n    }\n    following {\n      ...FollowObject\n    }\n    store {\n      products {\n        ...ProductObject\n      }\n    }\n  }\n}": types.UserByUsernameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AuthObject on Auth {\n  access_token\n  expires_in\n}"): (typeof documents)["fragment AuthObject on Auth {\n  access_token\n  expires_in\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AuthResponseObject on AuthResponse {\n  errors {\n    ...FieldErrorObject\n  }\n  user {\n    ...UserObject\n  }\n  auth {\n    ...AuthObject\n  }\n}"): (typeof documents)["fragment AuthResponseObject on AuthResponse {\n  errors {\n    ...FieldErrorObject\n  }\n  user {\n    ...UserObject\n  }\n  auth {\n    ...AuthObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartItemObject on CartItem {\n  id\n  name\n  price\n  shipping_price\n  images\n  product_id\n  cart_id\n}"): (typeof documents)["fragment CartItemObject on CartItem {\n  id\n  name\n  price\n  shipping_price\n  images\n  product_id\n  cart_id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartObject on Cart {\n  id\n  store_id\n  user_id\n}"): (typeof documents)["fragment CartObject on Cart {\n  id\n  store_id\n  user_id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FieldErrorObject on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment FieldErrorObject on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FollowObject on Follow {\n  id\n  followed_by_id\n  followed_id\n  created_at\n}"): (typeof documents)["fragment FollowObject on Follow {\n  id\n  followed_by_id\n  followed_id\n  created_at\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment LikeObject on Like {\n  id\n  user_id\n  product_id\n}"): (typeof documents)["fragment LikeObject on Like {\n  id\n  user_id\n  product_id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductObject on Product {\n  id\n  images\n  name\n  description\n  department\n  category\n  subcategory\n  condition\n  quantity\n  size\n  designer\n  colour\n  source\n  era\n  style\n  country\n  offer_free_shipping\n  shipping_price\n  offer_global_shipping\n  global_shipping_price\n  price\n  sold\n  store_id\n  updated_at\n  created_at\n}"): (typeof documents)["fragment ProductObject on Product {\n  id\n  images\n  name\n  description\n  department\n  category\n  subcategory\n  condition\n  quantity\n  size\n  designer\n  colour\n  source\n  era\n  style\n  country\n  offer_free_shipping\n  shipping_price\n  offer_global_shipping\n  global_shipping_price\n  price\n  sold\n  store_id\n  updated_at\n  created_at\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment StoreObject on Store {\n  id\n  paypal_merchant_id\n  paypal_setup\n  first_name\n  last_name\n  line_1\n  line_2\n  city\n  province\n  zip\n  country\n  user_id\n}"): (typeof documents)["fragment StoreObject on Store {\n  id\n  paypal_merchant_id\n  paypal_setup\n  first_name\n  last_name\n  line_1\n  line_2\n  city\n  province\n  zip\n  country\n  user_id\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserObject on User {\n  id\n  verified\n  oauth_user\n  email\n  username\n  token_version\n  first_name\n  last_name\n  bio\n  has_store\n  updated_at\n  created_at\n}"): (typeof documents)["fragment UserObject on User {\n  id\n  verified\n  oauth_user\n  email\n  username\n  token_version\n  first_name\n  last_name\n  bio\n  has_store\n  updated_at\n  created_at\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserResponseObject on UserResponse {\n  errors {\n    ...FieldErrorObject\n  }\n  user {\n    ...UserObject\n  }\n}"): (typeof documents)["fragment UserResponseObject on UserResponse {\n  errors {\n    ...FieldErrorObject\n  }\n  user {\n    ...UserObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeAbout($changeAboutOptions: ChangeAboutInput!) {\n  changeAbout(changeAboutOptions: $changeAboutOptions) {\n    ...UserObject\n  }\n}"): (typeof documents)["mutation ChangeAbout($changeAboutOptions: ChangeAboutInput!) {\n  changeAbout(changeAboutOptions: $changeAboutOptions) {\n    ...UserObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    ...UserResponseObject\n  }\n}"): (typeof documents)["mutation ChangeEmail($email: String!) {\n  changeEmail(email: $email) {\n    ...UserResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    ...UserResponseObject\n  }\n}"): (typeof documents)["mutation ChangePassword($changePasswordOptions: ChangePasswordInput!) {\n  changePassword(changePasswordOptions: $changePasswordOptions) {\n    ...UserResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    ...UserResponseObject\n  }\n}"): (typeof documents)["mutation ChangeUsername($username: String!) {\n  changeUsername(username: $username) {\n    ...UserResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProduct($productInput: CreateProductInput!) {\n  createProduct(ProductInput: $productInput) {\n    id\n    upload_urls\n  }\n}"): (typeof documents)["mutation CreateProduct($productInput: CreateProductInput!) {\n  createProduct(ProductInput: $productInput) {\n    id\n    upload_urls\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateStore($createStoreInput: CreateStoreInput!) {\n  createStore(createStoreInput: $createStoreInput) {\n    ...StoreObject\n  }\n}"): (typeof documents)["mutation CreateStore($createStoreInput: CreateStoreInput!) {\n  createStore(createStoreInput: $createStoreInput) {\n    ...StoreObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteProduct($id: Float!) {\n  deleteProduct(id: $id)\n}"): (typeof documents)["mutation DeleteProduct($id: Float!) {\n  deleteProduct(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Follow($id: Float!) {\n  follow(id: $id)\n}"): (typeof documents)["mutation Follow($id: Float!) {\n  follow(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Like($id: Float!) {\n  like(id: $id)\n}"): (typeof documents)["mutation Like($id: Float!) {\n  like(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    ...AuthResponseObject\n  }\n}"): (typeof documents)["mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    ...AuthResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginWithGoogle {\n  loginWithGoogle {\n    ...AuthResponseObject\n  }\n}"): (typeof documents)["mutation LoginWithGoogle {\n  loginWithGoogle {\n    ...AuthResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    ...AuthResponseObject\n  }\n}"): (typeof documents)["mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    ...AuthResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterWithGoogle($registerOptions: RegisterWithGoogleInput!) {\n  registerWithGoogle(registerOptions: $registerOptions) {\n    ...AuthResponseObject\n  }\n}"): (typeof documents)["mutation RegisterWithGoogle($registerOptions: RegisterWithGoogleInput!) {\n  registerWithGoogle(registerOptions: $registerOptions) {\n    ...AuthResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveProductFromCart($cartItemId: Float!) {\n  removeProductFromCart(cart_item_id: $cartItemId)\n}"): (typeof documents)["mutation RemoveProductFromCart($cartItemId: Float!) {\n  removeProductFromCart(cart_item_id: $cartItemId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendVerifyEmail {\n  sendVerifyEmail\n}"): (typeof documents)["mutation SendVerifyEmail {\n  sendVerifyEmail\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetPaypalMerchantId($paypalMerchantId: String!) {\n  setPaypalMerchantId(paypal_merchant_id: $paypalMerchantId) {\n    ...StoreObject\n  }\n}"): (typeof documents)["mutation SetPaypalMerchantId($paypalMerchantId: String!) {\n  setPaypalMerchantId(paypal_merchant_id: $paypalMerchantId) {\n    ...StoreObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetPaypalMerchantStatus($paypalMerchantStatus: Boolean!) {\n  setPaypalMerchantStatus(paypal_merchant_status: $paypalMerchantStatus) {\n    ...StoreObject\n  }\n}"): (typeof documents)["mutation SetPaypalMerchantStatus($paypalMerchantStatus: Boolean!) {\n  setPaypalMerchantStatus(paypal_merchant_status: $paypalMerchantStatus) {\n    ...StoreObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    ...UserResponseObject\n  }\n}"): (typeof documents)["mutation VerifyEmail($token: String!) {\n  verifyEmail(token: $token) {\n    ...UserResponseObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PaypalMerchantLink($storeId: Float!) {\n  paypalMerchantLink(store_id: $storeId) {\n    links {\n      href\n      rel\n      method\n    }\n    fetch_error {\n      error\n    }\n  }\n}"): (typeof documents)["query PaypalMerchantLink($storeId: Float!) {\n  paypalMerchantLink(store_id: $storeId) {\n    links {\n      href\n      rel\n      method\n    }\n    fetch_error {\n      error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Product($id: Float!) {\n  product(id: $id) {\n    ...ProductObject\n    store {\n      ...StoreObject\n      user {\n        ...UserObject\n      }\n    }\n    likes {\n      ...LikeObject\n    }\n  }\n}"): (typeof documents)["query Product($id: Float!) {\n  product(id: $id) {\n    ...ProductObject\n    store {\n      ...StoreObject\n      user {\n        ...UserObject\n      }\n    }\n    likes {\n      ...LikeObject\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Store {\n  store {\n    ...StoreObject\n  }\n}"): (typeof documents)["query Store {\n  store {\n    ...StoreObject\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    ...UserObject\n    followers {\n      ...FollowObject\n    }\n    following {\n      ...FollowObject\n    }\n    store {\n      products {\n        ...ProductObject\n      }\n    }\n  }\n}"): (typeof documents)["query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    ...UserObject\n    followers {\n      ...FollowObject\n    }\n    following {\n      ...FollowObject\n    }\n    store {\n      products {\n        ...ProductObject\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;