/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Float'];
  last_name: Scalars['String'];
  line_1: Scalars['String'];
  line_2: Scalars['String'];
  province: Scalars['String'];
  user: User;
  user_id: Scalars['Float'];
  zip: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  access_token: Scalars['String'];
  expires_in: Scalars['Float'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  auth?: Maybe<Auth>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Cart = {
  __typename?: 'Cart';
  cart_items: Array<CartItem>;
  grand_total: Scalars['Float'];
  id: Scalars['Float'];
  shipping_total: Scalars['Float'];
  store: Store;
  store_id: Scalars['Float'];
  sub_total: Scalars['Float'];
  user: User;
  user_id: Scalars['Float'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  cart_id: Scalars['Float'];
  id: Scalars['Float'];
  images: Array<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  product: Product;
  product_id: Scalars['Float'];
  quantity: Scalars['Float'];
  shipping_price: Scalars['Float'];
};

export type ChangeAboutInput = {
  bio: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type ChangeForgotPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChangePasswordInput = {
  new_password: Scalars['String'];
  old_password: Scalars['String'];
};

export type CreateProductInput = {
  category: Scalars['String'];
  colour?: InputMaybe<Scalars['String']>;
  condition: Scalars['String'];
  country: Scalars['String'];
  department: Scalars['String'];
  description: Scalars['String'];
  designer?: InputMaybe<Scalars['String']>;
  era?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  num_of_images: Scalars['Float'];
  offer_free_shipping: Scalars['Boolean'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  shipping_price: Scalars['Float'];
  size?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  subcategory: Scalars['String'];
};

export type CreateProductResponse = {
  __typename?: 'CreateProductResponse';
  id: Scalars['Float'];
  upload_urls: Array<Scalars['String']>;
};

export type CreateStoreInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  line_1: Scalars['String'];
  line_2: Scalars['String'];
  province: Scalars['String'];
  zip: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  created_at: Scalars['String'];
  followed_by: User;
  followed_id: Scalars['Float'];
  followed_user: User;
  id: Scalars['Float'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float'];
  product: Product;
  product_id: Scalars['Float'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductToCart: Cart;
  changeAbout: User;
  changeEmail: UserResponse;
  changeForgotPassword: AuthResponse;
  changePassword: UserResponse;
  changeUsername: UserResponse;
  createProduct: CreateProductResponse;
  createStore: Store;
  deleteProduct: Scalars['Boolean'];
  follow: Follow;
  forgotPassword: Scalars['Boolean'];
  like: Like;
  login: AuthResponse;
  loginWithGoogle: AuthResponse;
  logout: Scalars['Boolean'];
  register: AuthResponse;
  registerWithGoogle: AuthResponse;
  removeProductFromCart: Scalars['Boolean'];
  sendVerifyEmail: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
  unlike: Scalars['Boolean'];
  verifyEmail: UserResponse;
};


export type MutationAddProductToCartArgs = {
  id: Scalars['Float'];
  quantity: Scalars['Float'];
};


export type MutationChangeAboutArgs = {
  changeAboutOptions: ChangeAboutInput;
};


export type MutationChangeEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangeForgotPasswordArgs = {
  changeForgotPasswordOptions: ChangeForgotPasswordInput;
};


export type MutationChangePasswordArgs = {
  changePasswordOptions: ChangePasswordInput;
};


export type MutationChangeUsernameArgs = {
  username: Scalars['String'];
};


export type MutationCreateProductArgs = {
  ProductInput: CreateProductInput;
};


export type MutationCreateStoreArgs = {
  createStoreInput: CreateStoreInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationFollowArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLikeArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  loginOptions: LoginInput;
};


export type MutationRegisterArgs = {
  registerOptions: RegisterInput;
};


export type MutationRegisterWithGoogleArgs = {
  registerOptions: RegisterWithGoogleInput;
};


export type MutationRemoveProductFromCartArgs = {
  cart_id: Scalars['Float'];
  cart_item_id: Scalars['Float'];
};


export type MutationUnfollowArgs = {
  id: Scalars['Float'];
};


export type MutationUnlikeArgs = {
  id: Scalars['Float'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  cart_items: Array<CartItem>;
  category: Scalars['String'];
  colour?: Maybe<Scalars['String']>;
  condition: Scalars['String'];
  country: Scalars['String'];
  created_at: Scalars['String'];
  department: Scalars['String'];
  description: Scalars['String'];
  designer?: Maybe<Scalars['String']>;
  era?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  images: Array<Scalars['String']>;
  likes: Array<Like>;
  name: Scalars['String'];
  num_likes: Scalars['Float'];
  offer_free_shipping: Scalars['Boolean'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  shipping_price: Scalars['Float'];
  size: Scalars['String'];
  sold: Scalars['Boolean'];
  source?: Maybe<Scalars['String']>;
  store: Store;
  store_id: Scalars['Float'];
  style?: Maybe<Scalars['String']>;
  subcategory: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cart: Cart;
  carts: Array<Cart>;
  product: Product;
  products: Array<Product>;
  store: Store;
  stripeAccountLink: Scalars['String'];
  userByUsername: User;
};


export type QueryCartArgs = {
  cart_id: Scalars['Float'];
};


export type QueryProductArgs = {
  id: Scalars['Float'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterWithGoogleInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  username: Scalars['String'];
};

export type Store = {
  __typename?: 'Store';
  carts: Array<Cart>;
  city: Scalars['String'];
  country: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Float'];
  last_name: Scalars['String'];
  line_1: Scalars['String'];
  line_2: Scalars['String'];
  products: Array<Product>;
  province: Scalars['String'];
  stripe_account_id: Scalars['String'];
  stripe_setup: Scalars['Boolean'];
  user: User;
  user_id: Scalars['Float'];
  zip: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  addresses: Array<Address>;
  bio: Scalars['String'];
  carts: Array<Cart>;
  created_at: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  followers: Array<Follow>;
  following: Array<Follow>;
  has_store: Scalars['Boolean'];
  id: Scalars['Float'];
  last_name: Scalars['String'];
  likes: Array<Like>;
  num_followers: Scalars['Float'];
  num_following: Scalars['Float'];
  oauth_user: Scalars['Boolean'];
  store?: Maybe<Store>;
  token_version: Scalars['Float'];
  updated_at: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AddressObjectFragment = { __typename?: 'Address', id: number, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number };

export type AuthObjectFragment = { __typename?: 'Auth', access_token: string, expires_in: number };

export type AuthResponseObjectFragment = { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, expires_in: number } | null };

export type CartItemObjectFragment = { __typename?: 'CartItem', id: number, name: string, quantity: number, price: number, shipping_price: number, images: Array<string>, product_id: number, cart_id: number };

export type CartObjectFragment = { __typename?: 'Cart', id: number, store_id: number, user_id: number, sub_total: number, shipping_total: number, grand_total: number };

export type FieldErrorObjectFragment = { __typename?: 'FieldError', field: string, message: string };

export type FollowObjectFragment = { __typename?: 'Follow', id: number, followed_id: number };

export type LikeObjectFragment = { __typename?: 'Like', id: number, product_id: number };

export type ProductObjectFragment = { __typename?: 'Product', id: number, images: Array<string>, name: string, description: string, department: string, category: string, subcategory: string, condition: string, quantity: number, size: string, designer?: string | null, colour?: string | null, source?: string | null, era?: string | null, style?: string | null, country: string, offer_free_shipping: boolean, shipping_price: number, price: number, sold: boolean, store_id: number, num_likes: number, updated_at: string, created_at: string };

export type StoreObjectFragment = { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number };

export type UserObjectFragment = { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string };

export type UserResponseObjectFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null };

export type AddProductToCartMutationVariables = Exact<{
  quantity: Scalars['Float'];
  productId: Scalars['Float'];
}>;


export type AddProductToCartMutation = { __typename?: 'Mutation', addProductToCart: { __typename?: 'Cart', id: number, store_id: number, user_id: number, sub_total: number, shipping_total: number, grand_total: number, cart_items: Array<{ __typename?: 'CartItem', id: number, name: string, quantity: number, price: number, shipping_price: number, images: Array<string>, product_id: number, cart_id: number }>, store: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number, user: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } } } };

export type ChangeAboutMutationVariables = Exact<{
  changeAboutOptions: ChangeAboutInput;
}>;


export type ChangeAboutMutation = { __typename?: 'Mutation', changeAbout: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } };

export type ChangeEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordOptions: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null } };

export type ChangeUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type ChangeUsernameMutation = { __typename?: 'Mutation', changeUsername: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null } };

export type CreateProductMutationVariables = Exact<{
  productInput: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'CreateProductResponse', id: number, upload_urls: Array<string> } };

export type CreateStoreMutationVariables = Exact<{
  createStoreInput: CreateStoreInput;
}>;


export type CreateStoreMutation = { __typename?: 'Mutation', createStore: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type FollowMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'Follow', id: number, followed_id: number } };

export type LikeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: { __typename?: 'Like', id: number, product_id: number } };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, expires_in: number } | null } };

export type LoginWithGoogleMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginWithGoogleMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, expires_in: number } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerOptions: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, expires_in: number } | null } };

export type RegisterWithGoogleMutationVariables = Exact<{
  registerOptions: RegisterWithGoogleInput;
}>;


export type RegisterWithGoogleMutation = { __typename?: 'Mutation', registerWithGoogle: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, expires_in: number } | null } };

export type RemoveProductFromCartMutationVariables = Exact<{
  cartId: Scalars['Float'];
  cartItemId: Scalars['Float'];
}>;


export type RemoveProductFromCartMutation = { __typename?: 'Mutation', removeProductFromCart: boolean };

export type SendVerifyEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type SendVerifyEmailMutation = { __typename?: 'Mutation', sendVerifyEmail: boolean };

export type UnfollowMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: boolean };

export type UnlikeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UnlikeMutation = { __typename?: 'Mutation', unlike: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } | null } };

export type CartQueryVariables = Exact<{
  cartId: Scalars['Float'];
}>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: number, store_id: number, user_id: number, sub_total: number, shipping_total: number, grand_total: number, cart_items: Array<{ __typename?: 'CartItem', id: number, name: string, quantity: number, price: number, shipping_price: number, images: Array<string>, product_id: number, cart_id: number }>, user: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string, addresses: Array<{ __typename?: 'Address', id: number, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number }> }, store: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number, user: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } } } };

export type CartsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartsQuery = { __typename?: 'Query', carts: Array<{ __typename?: 'Cart', id: number, store_id: number, user_id: number, sub_total: number, shipping_total: number, grand_total: number, cart_items: Array<{ __typename?: 'CartItem', id: number, name: string, quantity: number, price: number, shipping_price: number, images: Array<string>, product_id: number, cart_id: number }>, store: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number, user: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } } }> };

export type ProductQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, images: Array<string>, name: string, description: string, department: string, category: string, subcategory: string, condition: string, quantity: number, size: string, designer?: string | null, colour?: string | null, source?: string | null, era?: string | null, style?: string | null, country: string, offer_free_shipping: boolean, shipping_price: number, price: number, sold: boolean, store_id: number, num_likes: number, updated_at: string, created_at: string, store: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number, user: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string } }, likes: Array<{ __typename?: 'Like', id: number, product_id: number }> } };

export type StoreQueryVariables = Exact<{ [key: string]: never; }>;


export type StoreQuery = { __typename?: 'Query', store: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number, products: Array<{ __typename?: 'Product', id: number, images: Array<string>, name: string, description: string, department: string, category: string, subcategory: string, condition: string, quantity: number, size: string, designer?: string | null, colour?: string | null, source?: string | null, era?: string | null, style?: string | null, country: string, offer_free_shipping: boolean, shipping_price: number, price: number, sold: boolean, store_id: number, num_likes: number, updated_at: string, created_at: string }> } };

export type StripeAccountLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type StripeAccountLinkQuery = { __typename?: 'Query', stripeAccountLink: string };

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', userByUsername: { __typename?: 'User', id: number, verified: boolean, oauth_user: boolean, email: string, username: string, token_version: number, first_name: string, last_name: string, bio: string, num_followers: number, num_following: number, has_store: boolean, updated_at: string, created_at: string, followers: Array<{ __typename?: 'Follow', id: number, followed_id: number }>, following: Array<{ __typename?: 'Follow', id: number, followed_id: number }>, store?: { __typename?: 'Store', id: number, stripe_account_id: string, stripe_setup: boolean, first_name: string, last_name: string, line_1: string, line_2: string, city: string, province: string, zip: string, country: string, user_id: number, products: Array<{ __typename?: 'Product', id: number, images: Array<string>, name: string, description: string, department: string, category: string, subcategory: string, condition: string, quantity: number, size: string, designer?: string | null, colour?: string | null, source?: string | null, era?: string | null, style?: string | null, country: string, offer_free_shipping: boolean, shipping_price: number, price: number, sold: boolean, store_id: number, num_likes: number, updated_at: string, created_at: string }> } | null } };

export const AddressObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]} as unknown as DocumentNode<AddressObjectFragment, unknown>;
export const FieldErrorObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<FieldErrorObjectFragment, unknown>;
export const UserObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<UserObjectFragment, unknown>;
export const AuthObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}}]} as unknown as DocumentNode<AuthObjectFragment, unknown>;
export const AuthResponseObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}}]} as unknown as DocumentNode<AuthResponseObjectFragment, unknown>;
export const CartItemObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartItemObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"cart_id"}}]}}]} as unknown as DocumentNode<CartItemObjectFragment, unknown>;
export const CartObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"sub_total"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_total"}},{"kind":"Field","name":{"kind":"Name","value":"grand_total"}}]}}]} as unknown as DocumentNode<CartObjectFragment, unknown>;
export const FollowObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followed_id"}}]}}]} as unknown as DocumentNode<FollowObjectFragment, unknown>;
export const LikeObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikeObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}}]}}]} as unknown as DocumentNode<LikeObjectFragment, unknown>;
export const ProductObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"designer"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"era"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"offer_free_shipping"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sold"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"num_likes"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<ProductObjectFragment, unknown>;
export const StoreObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]} as unknown as DocumentNode<StoreObjectFragment, unknown>;
export const UserResponseObjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<UserResponseObjectFragment, unknown>;
export const AddProductToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProductToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProductToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartObject"}},{"kind":"Field","name":{"kind":"Name","value":"cart_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartItemObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"sub_total"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_total"}},{"kind":"Field","name":{"kind":"Name","value":"grand_total"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartItemObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"cart_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<AddProductToCartMutation, AddProductToCartMutationVariables>;
export const ChangeAboutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeAbout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeAboutOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeAboutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeAbout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changeAboutOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeAboutOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<ChangeAboutMutation, ChangeAboutMutationVariables>;
export const ChangeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changePasswordOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changePasswordOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changePasswordOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]} as unknown as DocumentNode<ChangeUsernameMutation, ChangeUsernameMutationVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"upload_urls"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const CreateStoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createStoreInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStoreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createStoreInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createStoreInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]} as unknown as DocumentNode<CreateStoreMutation, CreateStoreMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followed_id"}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const LikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Like"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LikeObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikeObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}}]}}]} as unknown as DocumentNode<LikeMutation, LikeMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthObject"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LoginWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithGoogle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGoogle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthObject"}}]}}]}}]} as unknown as DocumentNode<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthObject"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RegisterWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterWithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterWithGoogleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Auth"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthObject"}}]}}]}}]} as unknown as DocumentNode<RegisterWithGoogleMutation, RegisterWithGoogleMutationVariables>;
export const RemoveProductFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProductFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProductFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cart_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}},{"kind":"Argument","name":{"kind":"Name","value":"cart_item_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartItemId"}}}]}]}}]} as unknown as DocumentNode<RemoveProductFromCartMutation, RemoveProductFromCartMutationVariables>;
export const SendVerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendVerifyEmail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendVerifyEmail"}}]}}]} as unknown as DocumentNode<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>;
export const UnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Unfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<UnfollowMutation, UnfollowMutationVariables>;
export const UnlikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Unlike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<UnlikeMutation, UnlikeMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserResponseObject"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FieldErrorObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FieldError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserResponseObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FieldErrorObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Cart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cart_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartObject"}},{"kind":"Field","name":{"kind":"Name","value":"cart_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartItemObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressObject"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"sub_total"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_total"}},{"kind":"Field","name":{"kind":"Name","value":"grand_total"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartItemObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"cart_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const CartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Carts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartObject"}},{"kind":"Field","name":{"kind":"Name","value":"cart_items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartItemObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"sub_total"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_total"}},{"kind":"Field","name":{"kind":"Name","value":"grand_total"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartItemObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CartItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"cart_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<CartsQuery, CartsQueryVariables>;
export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductObject"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LikeObject"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"designer"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"era"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"offer_free_shipping"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sold"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"num_likes"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikeObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const StoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductObject"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"designer"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"era"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"offer_free_shipping"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sold"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"num_likes"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<StoreQuery, StoreQueryVariables>;
export const StripeAccountLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StripeAccountLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripeAccountLink"}}]}}]} as unknown as DocumentNode<StripeAccountLinkQuery, StripeAccountLinkQueryVariables>;
export const UserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserObject"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowObject"}}]}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoreObject"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductObject"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"oauth_user"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token_version"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"num_followers"}},{"kind":"Field","name":{"kind":"Name","value":"num_following"}},{"kind":"Field","name":{"kind":"Name","value":"has_store"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followed_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoreObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Store"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_account_id"}},{"kind":"Field","name":{"kind":"Name","value":"stripe_setup"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"line_1"}},{"kind":"Field","name":{"kind":"Name","value":"line_2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductObject"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"designer"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"era"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"offer_free_shipping"}},{"kind":"Field","name":{"kind":"Name","value":"shipping_price"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sold"}},{"kind":"Field","name":{"kind":"Name","value":"store_id"}},{"kind":"Field","name":{"kind":"Name","value":"num_likes"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]} as unknown as DocumentNode<UserByUsernameQuery, UserByUsernameQueryVariables>;