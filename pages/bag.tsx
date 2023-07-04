import WithAuth from "@/components/HOC/WithAuth";
import { CartsDocument, RemoveProductFromCartDocument } from "@/generated/graphql";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery } from "urql";
import { FiTrash2 } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Bag: NextPage = ({}) => {
  const [{ data, error }] = useQuery({ query: CartsDocument });
  const [, removeProductFromCart] = useMutation(RemoveProductFromCartDocument);
  return (
    <>
      <Head>
        <title>Bag - Bella</title>
      </Head>
      <div className="px-4 py-10">
        <h1 className="text-2xl font-black font-display uppercase pb-6 border-b border-solid border-gray-300 leading-none">
          Bag
        </h1>
        {data?.carts.map((cart, index) => (
          <div key={index} className="mt-9 p-4 flex flex-col gap-4 bg-gray-200 rounded-xl">
            <div className="flex">
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
                  href={`/${cart.store.user.username}`}
                  className="font-display font-black text-lg uppercase truncate leading-none"
                >
                  {cart.store.user.username}
                </Link>
                <p className="text-sm font-semibold">{`${cart.store.user.first_name} ${cart.store.user.last_name}`}</p>
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
            {cart.cart_items.map((cartItem, index) => (
              <div className="flex p-2 bg-secondary text-primary rounded-xl" key={index}>
                <div className="w-1/4 aspect-square rounded-lg relative overflow-hidden flex-shrink-0">
                  <Image
                    src={cartItem.images[0]}
                    alt="profile-picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-4 flex flex-col justify-between">
                  <Link
                    href={`/${cart.store.user.username}`}
                    className="font-display font-medium text-sm uppercase leading-none break-words"
                  >
                    {cartItem.name}
                  </Link>
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        removeProductFromCart({ cartItemId: cartItem.id, cartId: cart.id })
                      }
                      className="text-xl"
                    >
                      <FiTrash2 />
                    </button>
                    <p className="font-display font-bold text-sm uppercase mt-2">{`CA$ ${cartItem.price}`}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-xs font-medium font-display uppercase pb-2 mt-2 border-b border-solid border-gray-300">
              <p>Item(s)</p>
              <p>CA${cart.sub_total}</p>
            </div>
            <div className="flex justify-between text-xs font-medium font-display uppercase pb-2 border-b border-solid border-gray-300">
              <p>Shipping</p>
              {cart.shipping_total === 0 ? <p>Free</p> : <p>CA${cart.shipping_total}</p>}
            </div>
            <div className="flex justify-between text-sm font-bold font-display uppercase pb-2 mb-4 border-b border-solid border-gray-300">
              <p>Total</p>
              <p>CA${cart.grand_total}</p>
            </div>
            <Link
              href={`/pay?cart_id=${cart.id}`}
              className="h-12 px-4 text-md font-bold font-display leading-none flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
            >
              Checkout
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default WithAuth(Bag);
