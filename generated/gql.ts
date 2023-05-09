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
    "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}": types.LoginDocument,
    "mutation LoginWithGoogle {\n  loginWithGoogle {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}": types.LoginWithGoogleDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}": types.RegisterDocument,
    "mutation RegisterWithGoogle($username: String!) {\n  registerWithGoogle(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}": types.RegisterWithGoogleDocument,
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
export function graphql(source: "mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation Login($loginOptions: LoginInput!) {\n  login(loginOptions: $loginOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginWithGoogle {\n  loginWithGoogle {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation LoginWithGoogle {\n  loginWithGoogle {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation Register($registerOptions: RegisterInput!) {\n  register(registerOptions: $registerOptions) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterWithGoogle($username: String!) {\n  registerWithGoogle(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"): (typeof documents)["mutation RegisterWithGoogle($username: String!) {\n  registerWithGoogle(username: $username) {\n    errors {\n      field\n      message\n    }\n    user {\n      id\n      verified\n      email\n      username\n      created_at\n      updated_at\n    }\n    auth {\n      access_token\n      expires_in\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;