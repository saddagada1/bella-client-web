import WithAuth from "@/components/HOC/WithAuth";
import { CartDocument } from "@/generated/graphql";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery } from "urql";
import { FiTrash2 } from "react-icons/fi";
import { FaStar, FaStripe } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { Field, Form, Formik } from "formik";
import LoadingButton from "@/components/Utils/LoadingButton";
import clsx from "clsx";
import * as yup from "yup";
import { Classifiers } from "@/utils/types";
import { fetcher } from "@/utils/fetcher";
import useSWRImmutable from "swr";
import Select from "react-select";

interface ShippingAddressValues {
  first_name: string;
  last_name: string;
  line_1: string;
  line_2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

const Pay: NextPage = () => {
  const params = useSearchParams();
  const { data: classifiersData } = useSWRImmutable<Classifiers>("/api/classifiers", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const [{ data, error }] = useQuery({
    query: CartDocument,
    variables: { cartId: parseInt(params.get("cart_id") as string) },
  });
  return (
    <>
      <Head>
        <title>Pay - Bella</title>
      </Head>
      <div className="px-4 py-10">
        <h1 className="text-2xl font-black font-display uppercase pb-6 border-b border-solid border-gray-300 leading-none">
          Pay
        </h1>
        <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
          Summary
        </h2>
        <div className="p-4 flex flex-col gap-4 bg-gray-200 rounded-xl">
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
                href={`/${data?.cart.store.user.username}`}
                className="font-display font-black text-lg uppercase truncate leading-none"
              >
                {data?.cart.store.user.username}
              </Link>
              <p className="text-sm font-semibold">{`${data?.cart.store.user.first_name} ${data?.cart.store.user.last_name}`}</p>
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
          {data?.cart.cart_items.map((cartItem, index) => (
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
                  href={`/${data?.cart.store.user.username}`}
                  className="font-display font-medium text-sm uppercase leading-none break-words"
                >
                  {cartItem.name}
                </Link>
                <div className="flex justify-between">
                  <button className="text-xl">
                    <FiTrash2 />
                  </button>
                  <p className="font-display font-bold text-sm uppercase mt-2">{`CA$ ${cartItem.price}`}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between text-xs font-medium font-display uppercase pb-2 mt-2 border-b border-solid border-gray-300">
            <p>Item(s)</p>
            <p>CA${data?.cart.sub_total}</p>
          </div>
          <div className="flex justify-between text-xs font-medium font-display uppercase pb-2 border-b border-solid border-gray-300">
            <p>Shipping</p>
            {data?.cart.shipping_total === 0 ? <p>Free</p> : <p>CA${data?.cart.shipping_total}</p>}
          </div>
          <div className="flex justify-between text-sm font-bold font-display uppercase">
            <p>Total</p>
            <p>CA${data?.cart.grand_total}</p>
          </div>
        </div>
        <Formik
          initialValues={{
            first_name: data ? data?.cart.user.first_name : "",
            last_name: data ? data?.cart.user.last_name : "",
            line_1: "",
            line_2: "",
            city: "",
            province: "",
            zip: "",
            country: "CA",
          }}
          validationSchema={yup.object().shape({
            first_name: yup.string().required("Required"),
            last_name: yup.string().required("Required"),
            line_1: yup.string().required("Required"),
            city: yup.string().required("Required"),
            province: yup.string().required("Required"),
            zip: yup.string().required("Required"),
            country: yup.string().required("Required"),
          })}
          onSubmit={async (values: ShippingAddressValues) => {}}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="w-full">
              <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
                Shipping Address
              </h2>
              <div className="p-4 bg-gray-200 rounded-xl">
                {data?.cart.user.addresses.length ? (
                  <></>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="first_name">First Name</label>
                      {errors.first_name && touched.first_name && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.first_name}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      placeholder="First Name"
                      id="first_name"
                      name="first_name"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="last_name">Last Name</label>
                      {errors.last_name && touched.last_name && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.last_name}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      placeholder="Last Name"
                      id="last_name"
                      name="last_name"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="line_1">Address Line 1</label>
                      {errors.line_1 && touched.line_1 && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.line_1}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      placeholder="Street Address"
                      id="line_1"
                      name="line_1"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="line_2">Address Line 2</label>
                      {errors.line_2 && touched.line_2 && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.line_2}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      id="line_2"
                      name="line_2"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="city">City</label>
                      {errors.city && touched.city && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.city}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      placeholder="City"
                      id="city"
                      name="city"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="province">State or Province</label>
                      {errors.province && touched.province && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.province}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      placeholder="State or Province"
                      id="province"
                      name="province"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="zip">Zip or Postal Code</label>
                      {errors.zip && touched.zip && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.zip}
                        </div>
                      )}
                    </div>
                    <Field
                      className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded focus:outline-none"
                      placeholder="Zip or Postal Code"
                      id="zip"
                      name="zip"
                    />
                    <div className="flex items-center justify-between text-md font-semibold mb-2">
                      <label htmlFor="country">Country</label>
                      {errors.country && touched.country && (
                        <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                          {errors.country}
                        </div>
                      )}
                    </div>
                    <Select
                      className="font-sans text-md font-medium"
                      classNames={{
                        control: () => "p-3 border border-solid border-secondary rounded",
                        menu: () =>
                          "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                        menuList: () => "flex flex-col gap-2",
                        option: ({ isSelected }) =>
                          clsx(
                            "py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded",
                            isSelected && "bg-secondary text-primary"
                          ),
                      }}
                      isDisabled
                      unstyled
                      placeholder="Canada"
                      isClearable
                      onChange={(option, trigger) => {
                        if (option) {
                          setFieldValue("country", option.value);
                        }
                        if (trigger.action === "clear") {
                          setFieldValue("country", "");
                        }
                      }}
                      options={classifiersData?.countries.map((country) => ({
                        value: country.code,
                        label: country.name,
                      }))}
                    />
                  </>
                )}
              </div>
              <LoadingButton
                className="w-full h-14 mt-6 text-xs font-bold font-display flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
                dark
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Checkout with <FaStripe className="text-5xl ml-2" />
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default WithAuth(Pay);
