import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { UserByUsernameDocument, UserProductsDocument } from "@/generated/graphql";
import { useQuery } from "urql";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@/utils/urql";

interface UserStoreProps {
  username: string;
}

const UserStore: NextPage<UserStoreProps> = ({ username }) => {
  const [{ data, fetching, error }] = useQuery({
    query: UserByUsernameDocument,
    variables: { username: username },
  });
  const [{ data: productsData, error: productsError }] = useQuery({
    query: UserProductsDocument,
    variables: { user_id: data?.userByUsername.id as number },
    pause: fetching,
  });

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
          <button className="font-display font-medium text-sm uppercase py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary absolute bottom-0">
            Follow
          </button>
        </div>
      </div>
      <div className="py-2 mx-4 border-b border-solid border-gray-300 flex justify-between items-center">
        <div>
          <p className="font-display font-medium text-sm">32</p>
          <p className="font-medium text-sm">Sold</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">12</p>
          <p className="font-medium text-sm">Items</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">1232</p>
          <p className="font-medium text-sm">Followers</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">1345</p>
          <p className="font-medium text-sm">Following</p>
        </div>
      </div>
      {data?.userByUsername?.bio && (
        <div className="py-2 mx-4 border-b border-solid border-gray-300">
          <p className="font-medium text-sm break-words">{data?.userByUsername.bio}</p>
        </div>
      )}
      <div className="mx-4 mt-4 grid grid-cols-3 auto-rows-fr gap-2">
        {productsData?.userProducts!.map((product, index) => (
          <Link
            href={`/products/${product.name}?id=${product.id}`}
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
