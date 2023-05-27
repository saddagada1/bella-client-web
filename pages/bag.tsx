import WithAuth from "@/components/HOC/WithAuth";
import { RemoveProductFromCartDocument } from "@/generated/graphql";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery } from "urql";
import { FiTrash2 } from "react-icons/fi";

interface BagProps {}

const Bag: NextPage<BagProps> = ({}) => {
  const [, removeProductFromCart] = useMutation(RemoveProductFromCartDocument);
  return (
    <>
      <Head>
        <title>Bag - Bella</title>
      </Head>
      <div className="px-2 pt-10">
        <h1 className="text-2xl font-black font-display uppercase pb-6 border-b border-solid border-gray-300">
          Bag
        </h1>
        {/* {data?.carts.map((cart, index) => (
          <div key={index} className="pt-2 flex flex-col gap-4">
            <div className="h-16 py-2 flex">
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
                  href={`/${cart.user.username}`}
                  className="font-display font-medium text-sm uppercase truncate mb-0.5"
                >
                  {`${cart.user.first_name} ${cart.user.last_name}`}
                </Link>
                <p className="flex items-center gap-1 text-sm font-medium">{`@${cart.user.username}`}</p>
              </div>
            </div>
            {cart.cart_items.map((cartItem, index) => (
              <div
                className="h-28 flex p-2 border border-solid border-gray-300 rounded-xl"
                key={index}
              >
                <div className="h-full aspect-square rounded relative overflow-hidden flex-shrink-0">
                  <Image
                    src={cartItem.images[0]}
                    alt="profile-picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-4 flex flex-col justify-between">
                  <Link
                    href={`/${cart.user.username}`}
                    className="font-display font-medium text-sm uppercase break-words"
                  >
                    {cartItem.name}
                  </Link>
                  <div className="flex justify-between">
                    <button
                      onClick={() => removeProductFromCart({ cartItemId: cartItem.id })}
                      className="text-xl"
                    >
                      <FiTrash2 />
                    </button>
                    <p className="font-display font-bold text-sm uppercase mt-2">{`CA$ ${cartItem.price}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))} */}
      </div>
    </>
  );
};
export default WithAuth(Bag);
