import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { FollowDocument, UserByUsernameDocument } from "@/generated/graphql";
import { useMutation, useQuery } from "urql";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@/utils/urql";
import { useAppSelector } from "@/redux/hooks";

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
  return (
    <>
      <Head>
        <title>{`${username.charAt(0).toUpperCase() + username.slice(1)}'s Store - Bella`}</title>
      </Head>
      <div className="h-40 mx-4 py-4 border-b border-solid border-gray-300 flex">
        <div className="h-full aspect-square rounded-xl relative overflow-hidden flex-shrink-0">
          <Image
            src="/media/utils/blank-profile.webp"
            alt="profile-picture"
            fill
            className="object-cover"
          />
        </div>
        <div className="pl-4 pt-1 overflow-hidden relative">
          <h1 className="font-display font-medium text-lg uppercase truncate mb-0.5">
            {`${data?.userByUsername?.first_name} ${data?.userByUsername?.last_name}`}
          </h1>
          <p className="text-sm font-medium mb-1">{`@${username}`}</p>
          <div className="flex items-center gap-1 text-sm font-medium">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <FaStar key={index} className="text-red-500" />
              ))}
            <p className="ml-1">(0)</p>
          </div>
          {user?.id === data?.userByUsername.id ? (
            <Link
              className="font-display font-medium text-sm uppercase py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary absolute bottom-0"
              href="/settings"
            >
              Edit Profile
            </Link>
          ) : (
            <button
              onClick={async () => {
                await follow({ id: data!.userByUsername.id });
              }}
              className="font-display font-medium text-sm uppercase py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary absolute bottom-0"
            >
              {!data?.userByUsername.followers.find(
                (follower) => follower.followed_by_id === user?.id
              )
                ? "Follow"
                : "Unfollow"}
            </button>
          )}
        </div>
      </div>
      <div className="py-2 mx-4 border-b border-solid border-gray-300 flex justify-between items-center">
        <div>
          <p className="font-display font-medium text-sm">
            {data?.userByUsername?.store
              ? data.userByUsername.store.products.filter((product) => product.sold === true).length
              : 0}
          </p>
          <p className="font-medium text-sm">Sold</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">
            {data?.userByUsername?.store ? data.userByUsername.store.products.length : 0}
          </p>
          <p className="font-medium text-sm">Items</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">
            {data?.userByUsername.followers.length}
          </p>
          <p className="font-medium text-sm">Followers</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">
            {data?.userByUsername?.following.length}
          </p>
          <p className="font-medium text-sm">Following</p>
        </div>
      </div>
      {data?.userByUsername?.bio && (
        <div className="py-2 mx-4 border-b border-solid border-gray-300">
          <p className="font-medium text-sm break-words">{data?.userByUsername.bio}</p>
        </div>
      )}
      <div className="mx-4 mt-4 grid grid-cols-3 auto-rows-fr gap-2">
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
