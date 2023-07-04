import WithAuth from "@/components/HOC/WithAuth";
import LoadingButton from "@/components/Utils/LoadingButton";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { NextPage } from "next";
import Head from "next/head";
import useSWRImmutable from "swr";
import { Classifiers } from "@/utils/types";
import { fetcher } from "@/utils/fetcher";
import clsx from "clsx";
import { useMutation, useQuery } from "urql";
import { CreateStoreDocument, StoreDocument } from "@/generated/graphql";
import { setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiSettings, FiGrid, FiPlusSquare } from "react-icons/fi";
import Image from "next/image";

interface CreateStoreValues {
  first_name: string;
  last_name: string;
  line_1: string;
  line_2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

const CreateStore: React.FC = () => {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const { data } = useSWRImmutable<Classifiers>("/api/classifiers", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  const [, createStore] = useMutation(CreateStoreDocument);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        first_name: user!.first_name,
        last_name: user!.last_name,
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
      onSubmit={async (values: CreateStoreValues) => {
        await createStore({ createStoreInput: values });
        dispatch(setUser({ user: { ...user!, has_store: true } }));
        router.push("/store/settings");
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue, values }) => (
        <Form className="w-full">
          <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
            Billing Address
          </h2>
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
            className="font-sans text-md font-medium mb-6"
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
            options={data?.countries.map((country) => ({
              value: country.code,
              label: country.name,
            }))}
          />
          <LoadingButton
            className="w-full h-14 mt-6 text-md font-bold font-display flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
            dark
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Finish
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

const Store: NextPage = () => {
  const user = useAppSelector((store) => store.auth.user);
  const [{ data, fetching }] = useQuery({ query: StoreDocument, pause: !user!.has_store });
  return (
    <>
      <Head>
        <title>Your Store - Bella</title>
      </Head>
      <div className="px-4 py-10">
        <div className="text-2xl pb-6 border-b border-solid border-gray-300 flex justify-between">
          <h1 className="font-black font-display uppercase leading-none">Your Store</h1>
          {user!.has_store && (
            <div className="flex gap-4">
              <Link href="/store">
                <FiGrid />
              </Link>
              {data?.store.stripe_setup && (
                <Link href="/products/create">
                  <FiPlusSquare />
                </Link>
              )}
              <Link href="/store/settings">
                <FiSettings />
              </Link>
            </div>
          )}
        </div>
        {user!.has_store ? (
          <>
            <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
              This Week
            </h2>
            <div className="h-24 flex gap-2 text-md font-semibold">
              <Link
                href="/store/stats"
                className="w-1/3 flex justify-center items-end bg-gray-200 rounded-xl border border-gray-500 border-solid relative"
              >
                <p className="absolute top-2 left-3">Sold</p>
                <span className="font-display font-bold text-2xl mb-6">0</span>
              </Link>
              <Link
                href="/store/stats"
                className="flex-1 flex justify-center items-end bg-gray-200 rounded-xl border border-gray-500 border-solid relative"
              >
                <p className="absolute top-2 left-3">Revenue</p>
                <span className="font-display font-bold text-2xl mb-6">CA$0</span>
              </Link>
            </div>
            <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
              Selling
            </h2>
            <div className="mt-4 flex gap-2">
              {data?.store.products
                .filter((product) => !product.sold)
                .map((product, index) => (
                  <Link
                    href={`/products/${encodeURIComponent(product.name)}?id=${product.id}`}
                    key={index}
                    className="aspect-square w-1/3 rounded-xl relative overflow-hidden will-change-transform transition-transform duration-500 hover:scale-95"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                ))}
            </div>
            <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
              Sold
            </h2>
            <div className="mx-4 mt-4 grid grid-cols-3 auto-rows-fr gap-2">
              {data?.store.products
                .filter((product) => product.sold)
                .map((product, index) => (
                  <Link
                    href={`/products/${encodeURIComponent(product.name)}?id=${product.id}`}
                    key={index}
                    className="aspect-square rounded-xl relative overflow-hidden will-change-transform transition-transform duration-500 hover:scale-95"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                ))}
            </div>
          </>
        ) : (
          <CreateStore />
        )}
      </div>
    </>
  );
};

export default WithAuth(Store);
