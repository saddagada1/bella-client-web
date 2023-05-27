import { NextPage } from "next";
import { createUrqlClient } from "@/utils/urql";
import Head from "next/head";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import { withUrqlClient } from "next-urql";
import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import { LikeDocument, ProductDocument } from "@/generated/graphql";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import clsx from "clsx";
import { useAppSelector } from "@/redux/hooks";

interface ProductProps {
  product: string;
  id: string;
}

const Product: NextPage<ProductProps> = ({ product, id }) => {
  const [{ data, error }] = useQuery({ query: ProductDocument, variables: { id: parseInt(id) } });
  const [imageIndex, setImageIndex] = useState(0);
  const [, like] = useMutation(LikeDocument);
  // const [, addProductToBag] = useMutation(AddProductToCartDocument);
  const user = useAppSelector((store) => store.auth.user);

  return (
    <>
      <Head>
        <title>{`${product.charAt(0).toUpperCase() + product.slice(1)} - Bella`}</title>
      </Head>
      <div className="mx-4 pt-4 flex text-sm font-medium">
        <Link className="flex items-center hover:underline" href="/">
          Home <FiChevronRight />
        </Link>
        <Link className="flex items-center hover:underline" href="/">
          {data?.product.department} <FiChevronRight />
        </Link>
        <Link className="flex items-center hover:underline" href="/">
          {data?.product.category} <FiChevronRight />
        </Link>
        <Link className="hover:underline" href="/">
          {data?.product.subcategory}
        </Link>
      </div>
      <div className="h-16 mx-4 pt-2 pb-3 border-b border-solid border-gray-300 flex">
        <div className="h-full aspect-square rounded relative overflow-hidden flex-shrink-0">
          <Image
            src="/media/utils/blank-profile.webp"
            alt="profile-picture"
            fill
            className="object-cover"
          />
        </div>
        <div className="pl-4 flex flex-col justify-between overflow-hidden relative">
          <Link
            href={`/${data?.product.store.user.username}`}
            className="font-display font-medium text-sm uppercase truncate mb-0.5"
          >
            {data?.product.store.user.username}
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <FaStar key={index} className="text-red-500" />
              ))}
            <p className="ml-1">(0)</p>
          </div>
        </div>
      </div>
      <div className="py-4 mx-4 border-b border-solid border-gray-300">
        <div className="w-full flex justify-center items-center aspect-square mb-4 rounded-xl relative overflow-hidden">
          <Image
            src={data?.product.images[imageIndex] as string}
            alt={data?.product.name as string}
            fill
            className="object-cover"
          />
          {data && data.product.images.length > 1 && (
            <>
              <button
                onClick={() => {
                  if (imageIndex === 0) {
                    setImageIndex(data!.product.images.length - 1);
                  } else {
                    setImageIndex(imageIndex - 1);
                  }
                }}
                className="absolute bg-primary left-2 p-1 text-3xl rounded-xl opacity-75"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => {
                  if (imageIndex === data!.product.images.length - 1) {
                    setImageIndex(0);
                  } else {
                    setImageIndex(imageIndex + 1);
                  }
                }}
                className="absolute bg-primary right-2 p-1 text-3xl rounded-xl opacity-75"
              >
                <FiChevronRight />
              </button>
              <div className="flex gap-2 bottom-2 absolute">
                {data?.product.images.map((_, index) => (
                  <span
                    key={index}
                    className={clsx(
                      "w-3 aspect-square rounded border-2 border-solid border-primary opacity-75",
                      imageIndex === index && "bg-primary"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between mb-6">
          <button
            onClick={async () => {
              await like({ id: parseInt(id) });
            }}
            className="text-3xl"
          >
            {data?.product.likes.find((like) => like.user_id === user?.id) ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FiHeart />
            )}
          </button>
          <p className="text-md font-medium">
            <span className="font-display">{data?.product.likes.length}</span> likes
          </p>
        </div>
        <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
          <p>Size</p>
          <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
          <p>{data?.product.size}</p>
        </div>
        <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
          <p>Condition</p>
          <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
          <p>{data?.product.condition}</p>
        </div>
        {data?.product.designer && (
          <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
            <p>Designer</p>
            <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
            <p>{data?.product.designer}</p>
          </div>
        )}
        {data?.product.colour && (
          <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
            <p>Colour</p>
            <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
            <p>{data?.product.colour}</p>
          </div>
        )}
        {data?.product.source && (
          <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
            <p>Source</p>
            <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
            <p>{data?.product.source}</p>
          </div>
        )}
        {data?.product.era && (
          <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
            <p>Era</p>
            <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
            <p>{data?.product.era}</p>
          </div>
        )}
        {data?.product.style && (
          <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
            <p>Style</p>
            <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
            <p>{data?.product.style}</p>
          </div>
        )}
        <p className="font-medium text-sm text-right">{`Listed ${new Date(
          parseFloat(data?.product.created_at as string)
        ).toDateString()}`}</p>
      </div>
      <div className="mx-4 pt-4 pb-20">
        <h1 className="font-display font-medium text-xl uppercase break-words mb-4">
          {data?.product.name}
        </h1>
        <p className="font-medium text-md break-words mb-4">{data?.product.description}</p>
        <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
          <p>Shipping</p>
          <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
          <p>CA$ {data?.product.shipping_price}</p>
        </div>
        {data?.product.offer_global_shipping && (
          <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-4">
            <p>Global Shipping</p>
            <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
            <p>CA$ {data?.product.global_shipping_price}</p>
          </div>
        )}
        <div className="bg-gray-200 rounded p-3 flex items-center justify-between font-semibold text-md mb-8">
          <p>Country</p>
          <span className="flex-1 border-b border-solid border-gray-300 mx-4" />
          <p>{data?.product.country}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-md font-bold font-display uppercase border-t border-solid border-gray-300 sm:fixed sm:z-20 sm:w-full sm:px-4 sm:bottom-0 sm:left-0 sm:bg-primary">
        <p className="text-xl">CA$ {data?.product.price}</p>
        <button
          // onClick={async () => {
          //   await addProductToBag({ id: parseInt(id) });
          // }}
          className="w-fit h-12 my-4 px-4 flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
        >
          Add to Bag
        </button>
      </div>
    </>
  );
};

Product.getInitialProps = ({ query }) => {
  return {
    product: query.product as string,
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Product);
