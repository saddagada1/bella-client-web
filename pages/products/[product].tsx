import { NextPage } from "next";
import { createUrqlClient } from "@/utils/urql";
import Head from "next/head";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import { withUrqlClient } from "next-urql";
import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import {
  AddProductToCartDocument,
  LikeDocument,
  ProductDocument,
  UnlikeDocument,
} from "@/generated/graphql";
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
  const [, unlike] = useMutation(UnlikeDocument);
  const [, addProductToBag] = useMutation(AddProductToCartDocument);
  const user = useAppSelector((store) => store.auth.user);

  return (
    <>
      <Head>
        <title>{`${product.charAt(0).toUpperCase() + product.slice(1)} - Bella`}</title>
      </Head>
      <div className="flex justify-center items-center aspect-square relative">
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
      <div className="mx-4">
        <div className="flex justify-between mt-4 mb-9">
          {data?.product.likes.find((like) => like.id === user?.id) ? (
            <button
              onClick={async () => {
                await unlike({ id: parseInt(id) });
              }}
              className="text-3xl"
            >
              <FaHeart className="text-red-500" />
            </button>
          ) : (
            <button
              onClick={async () => {
                await like({ id: parseInt(id) });
              }}
              className="text-3xl"
            >
              <FiHeart />
            </button>
          )}
          <p className="text-md font-medium">
            <span className="font-display">{data?.product.num_likes}</span> likes
          </p>
        </div>
        <h1 className="text-2xl font-black font-display uppercase break-words leading-none mb-4">
          {data?.product.name}
        </h1>
        <p className="font-medium text-md break-words mb-9">{data?.product.description}</p>
        <div className="flex items-end justify-between mb-9">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold font-display leading-none">CA$ {data?.product.price}</p>
            <p className="w-fit font-medium text-sm text-gray-500 bg-gray-200 border border-gray-500 border-solid px-2 py-0.5 rounded">
              {!data?.product.offer_free_shipping
                ? `CA$ ${data?.product.shipping_price} Shipping`
                : "Free Shipping"}
            </p>
          </div>
          <button
            onClick={async () => {
              await addProductToBag({ quantity: 1, productId: parseInt(id) });
            }}
            className="w-fit h-12 px-4 text-md font-bold font-display leading-none flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
          >
            Add to Bag
          </button>
        </div>
        <div className="flex flex-wrap gap-4 font-semibold text-sm">
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Country
            <span className="font-display font-bold uppercase ml-2">{data?.product.country}</span>
          </p>
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Quantity
            <span className="font-display font-bold uppercase ml-2">{data?.product.quantity}</span>
          </p>
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Size
            <span className="font-display font-bold uppercase ml-2">{data?.product.size}</span>
          </p>
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Condition
            <span className="font-display font-bold uppercase ml-2">{data?.product.condition}</span>
          </p>
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Department
            <span className="font-display font-bold uppercase ml-2">
              {data?.product.department}
            </span>
          </p>
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Category
            <span className="font-display font-bold uppercase ml-2">{data?.product.category}</span>
          </p>
          <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
            Subcategory
            <span className="font-display font-bold uppercase ml-2">
              {data?.product.subcategory}
            </span>
          </p>
          {data?.product.designer && (
            <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
              Designer
              <span className="font-display font-bold uppercase ml-2">
                {data?.product.designer}
              </span>
            </p>
          )}
          {data?.product.colour && (
            <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
              Colour
              <span className="font-display font-bold uppercase ml-2">{data?.product.colour}</span>
            </p>
          )}
          {data?.product.source && (
            <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
              Source
              <span className="font-display font-bold uppercase ml-2">{data?.product.source}</span>
            </p>
          )}
          {data?.product.era && (
            <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
              Era
              <span className="font-display font-bold uppercase ml-2">{data?.product.era}</span>
            </p>
          )}
          {data?.product.style && (
            <p className="bg-gray-200 border border-gray-500 border-solid rounded-lg px-3 py-2">
              Style
              <span className="font-display font-bold uppercase ml-2">{data?.product.style}</span>
            </p>
          )}
        </div>
      </div>
      <div className="mx-4 mt-10 flex">
        <div className="w-1/6 aspect-square rounded-lg relative overflow-hidden flex-shrink-0">
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
            className="font-display font-black text-lg uppercase truncate leading-none"
          >
            {data?.product.store.user.username}
          </Link>
          <p className="text-sm font-medium">{`${data?.product.store.user.first_name} ${data?.product.store.user.last_name}`}</p>
          <div className="flex items-center gap-1 text-xs font-medium">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <FaStar key={index} className="text-red-500" />
              ))}
            <p className="ml-1">(0)</p>
          </div>
        </div>
      </div>
      <p className="ml-4 font-medium text-sm mt-6 mb-9">{`Listed ${new Date(
        parseFloat(data?.product.created_at as string)
      ).toDateString()}`}</p>
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
