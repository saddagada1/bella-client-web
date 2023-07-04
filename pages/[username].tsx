import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FollowDocument, UnfollowDocument, UserByUsernameDocument } from "@/generated/graphql";
import { useMutation, useQuery } from "urql";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@/utils/urql";
import { useAppSelector } from "@/redux/hooks";
import { FiSettings, FiUserCheck, FiUserPlus } from "react-icons/fi";

interface UserStoreProps {
  username: string;
}

const UserStore: NextPage<UserStoreProps> = ({ username }) => {
  const user = useAppSelector((store) => store.auth.user);
  const [{ data, fetching, error }] = useQuery({
    query: UserByUsernameDocument,
    variables: { username: username },
  });
  const [, follow] = useMutation(FollowDocument);
  const [, unfollow] = useMutation(UnfollowDocument);

  return (
    <>
      <Head>
        <title>{`${username.charAt(0).toUpperCase() + username.slice(1)}'s Store - Bella`}</title>
      </Head>
      <div className="mx-4 pt-10">
        <div className="text-2xl pb-6 flex justify-between">
          <h1 className="font-black font-display uppercase truncate leading-none">{username}</h1>
          {user?.username === username ? (
            <Link className="text-2xl" href="/settings">
              <FiSettings />
            </Link>
          ) : data?.userByUsername?.followers.find((follower) => follower.id === user?.id) ? (
            <button
              onClick={async () => {
                await unfollow({ id: data!.userByUsername.id });
              }}
              className="text-2xl h-fit"
            >
              <FiUserCheck />
            </button>
          ) : (
            <button
              onClick={async () => {
                await follow({ id: data!.userByUsername.id });
              }}
              className="text-2xl h-fit"
            >
              <FiUserPlus />
            </button>
          )}
        </div>
        <div className="pb-4 border-b border-solid border-gray-300 grid grid-cols-4">
          <div className="aspect-square rounded-lg relative overflow-hidden flex-shrink-0">
            <Image
              src="/media/utils/blank-profile.webp"
              alt="profile-picture"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-3 pl-4 overflow-hidden flex flex-col">
            <p className="text-md font-medium">{`${data?.userByUsername?.first_name} ${data?.userByUsername?.last_name}`}</p>
            <div className="flex gap-1 text-sm font-medium">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <FaStar key={index} className="text-red-500" />
                ))}
              <p className="ml-1">(0)</p>
            </div>
            <div className="flex-1 font-medium text-sm flex justify-between items-end">
              <div>
                <p className="font-display">
                  {data?.userByUsername?.store
                    ? data.userByUsername.store.products.filter((product) => product.sold === true)
                        .length
                    : 0}
                </p>
                <p>Sold</p>
              </div>
              <div>
                <p className="font-display">
                  {data?.userByUsername?.store ? data.userByUsername.store.products.length : 0}
                </p>
                <p>Items</p>
              </div>
              <div>
                <p className="font-display">{data?.userByUsername?.num_followers}</p>
                <p>Followers</p>
              </div>
              <div>
                <p className="font-display">{data?.userByUsername?.num_following}</p>
                <p>Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.userByUsername?.bio && (
        <div className="py-2 mx-4 border-b border-solid border-gray-300">
          <p className="font-medium text-sm break-words">{data?.userByUsername.bio}</p>
        </div>
      )}
      <div className="mx-4 py-4 grid grid-cols-3 auto-rows-fr gap-2">
        {data?.userByUsername?.store?.products.map((product, index) => (
          <Link
            href={`/products/${encodeURIComponent(product.name)}?id=${product.id}`}
            key={index}
            className="aspect-square rounded-xl relative overflow-hidden will-change-transform transition-transform duration-500 hover:scale-95"
          >
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </Link>
        ))}
      </div>
    </>
  );
};

UserStore.getInitialProps = ({ query }) => {
  return {
    username: query.username as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: true })(UserStore);
