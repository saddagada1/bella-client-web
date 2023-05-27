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
import {
  CreateStoreDocument,
  PaypalMerchantLinkDocument,
  StoreDocument,
} from "@/generated/graphql";
import { setUser } from "@/redux/slices/authSlice";

const Dashboard: React.FC = () => {
  const [{ data: storeData, fetching: storeFetching }] = useQuery({ query: StoreDocument });
  const [{ data }] = useQuery({
    query: PaypalMerchantLinkDocument,
    variables: { storeId: storeData?.store.id as number },
    pause: storeFetching,
  });
  return <div>dash</div>;
};

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
        country: "",
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
        const response = await createStore({ createStoreInput: values });
        dispatch(setUser({ user: { ...user!, has_store: true } }));
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="w-full pb-10">
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
            unstyled
            placeholder=""
            isClearable
            onChange={(option, trigger) => {
              if (option) {
                setFieldValue("country", option.label);
              }
              if (trigger.action === "clear") {
                setFieldValue("country", "");
              }
            }}
            options={data?.countries.map((country) => ({
              value: country.name,
              label: country.name,
            }))}
          />

          <LoadingButton
            className="w-full h-14 mt-6 mb-12 text-md font-bold font-display flex justify-center items-center bg-secondary text-primary uppercase rounded border border-solid border-secondary"
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
  return (
    <>
      <Head>
        <title>Your Store - Bella</title>
      </Head>
      <div className="px-4 pt-10">
        <h1 className="text-2xl font-black font-display uppercase pb-6 border-b border-solid border-gray-300">
          Your Store
        </h1>
        {user!.has_store ? <Dashboard /> : <CreateStore />}
      </div>
    </>
  );
};

export default WithAuth(Store);
