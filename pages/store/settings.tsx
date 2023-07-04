import LoadingButton from "@/components/Utils/LoadingButton";
import { StoreDocument, StripeAccountLinkDocument } from "@/generated/graphql";
import { fetcher } from "@/utils/fetcher";
import { Classifiers } from "@/utils/types";
import * as yup from "yup";
import useSWRImmutable from "swr";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { FaStripe } from "react-icons/fa";
import Select from "react-select";
import { useQuery } from "urql";
import WithAuth from "@/components/HOC/WithAuth";
import Link from "next/link";
import { FiGrid, FiPlusSquare, FiSettings } from "react-icons/fi";

interface EditStoreValues {
  first_name: string;
  last_name: string;
  line_1: string;
  line_2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

const Settings: NextPage = ({}) => {
  const [{ data: storeData, fetching: storeFetching }] = useQuery({ query: StoreDocument });
  const [{ data }] = useQuery({
    query: StripeAccountLinkDocument,
    pause: storeFetching || storeData?.store.stripe_setup,
  });
  const router = useRouter();
  const { data: classifiersData } = useSWRImmutable<Classifiers>("/api/classifiers", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (storeFetching || !storeData) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Edit Store - Bella</title>
      </Head>
      <div className="px-4 py-10">
        <div className="text-2xl pb-6 border-b border-solid border-gray-300 flex justify-between">
          <h1 className="font-black font-display uppercase leading-none">Your Store</h1>
          <div className="flex gap-4">
            <Link href="/store">
              <FiGrid />
            </Link>
            {storeData?.store.stripe_setup && (
              <Link href="/products/create">
                <FiPlusSquare />
              </Link>
            )}
            <Link href="/store/settings">
              <FiSettings />
            </Link>
          </div>
        </div>
        <h2 className="text-lg font-bold font-display uppercase mt-9 pb-4 mb-4 border-b border-solid border-gray-300">
          Payments
        </h2>
        {!storeData.store.stripe_setup ? (
          <button
            onClick={() => data && router.push(data.stripeAccountLink)}
            className="px-4 mt-6 mb-12 text-xs font-bold font-display flex items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
          >
            Connect with <FaStripe className="text-5xl ml-2" />
          </button>
        ) : (
          <button className="px-4 mt-6 mb-12 text-xs font-bold font-display flex items-center uppercase rounded border border-solid border-secondary">
            Connected with <FaStripe className="text-5xl ml-2" />
          </button>
        )}
        <Formik
          initialValues={{
            first_name: storeData.store.first_name,
            last_name: storeData.store.last_name,
            line_1: storeData.store.line_1,
            line_2: storeData.store.line_2,
            city: storeData.store.city,
            province: storeData.store.province,
            zip: storeData.store.zip,
            country: storeData.store.country,
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
          onSubmit={async (values: EditStoreValues) => {}}
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
                options={classifiersData?.countries.map((country) => ({
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
                Save
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default WithAuth(Settings);
