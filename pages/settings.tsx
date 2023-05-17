import LoadingButton from "@/components/Utils/LoadingButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Select from "react-select";
import { NextPage } from "next";
import Head from "next/head";
import * as yup from "yup";
import clsx from "clsx";
import WithAuth from "@/components/HOC/WithAuth";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Classifiers, Country } from "@/utils/types";
import { useMutation } from "urql";
import {
  ChangeAboutDocument,
  ChangeEmailDocument,
  ChangePasswordDocument,
  ChangeUsernameDocument,
  SendVerifyEmailDocument,
  VerifyEmailDocument,
} from "@/generated/graphql";
import { setUser } from "@/redux/slices/authSlice";
import { Dispatch, SetStateAction, useState } from "react";
import { toErrorMap } from "@/utils/toErrorMap";

interface BasicResponse {
  ok: boolean;
  message: string;
}

interface VerifyEmailModalProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({ setVisible }) => {
  const [, sendVerifyEmail] = useMutation(SendVerifyEmailDocument);
  const [, verifyEmail] = useMutation(VerifyEmailDocument);
  const dispatch = useAppDispatch();
  const [verifyResponse, setVerifyResponse] = useState<BasicResponse | null>(null);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="w-screen h-screen z-50 fixed top-0 flex justify-center items-center">
      <div onClick={() => !disabled && setVisible(false)} className="w-full h-full absolute bg-secondary opacity-50" />
      <div className="w-11/12 sm:w-10/12 p-6 z-10 bg-primary flex flex-col items-center rounded-xl">
        <Formik
          initialValues={{
            token: "",
          }}
          validationSchema={yup.object().shape({
            token: yup.string().min(6, "Token must be 6 Chars").required("Required"),
          })}
          onSubmit={async (values: { token: string }, { setErrors }: FormikHelpers<{ token: string }>) => {
            setDisabled(true);
            setVerifyResponse(null);
            const response = await verifyEmail({ token: values.token });
            if (response.data?.verifyEmail.errors) {
              setErrors(toErrorMap(response.data.verifyEmail.errors));
            } else if (response.data?.verifyEmail.user) {
              setVerifyResponse({ ok: true, message: "Success" });
              dispatch(setUser({ user: response.data.verifyEmail.user }));
            } else {
              setVerifyResponse({ ok: false, message: "Something went wrong..." });
            }
            setDisabled(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full">
              <h1 className="text-2xl flex justify-between items-center font-bold font-display uppercase pb-2 mb-4 border-b border-solid border-gray-300">
                Verify Email
                {verifyResponse && (
                  <span
                    className={`${verifyResponse.ok ? "bg-green-100" : "bg-red-100"} text-xs sm:text-sm font-medium font-sans normal-case ${
                      verifyResponse.ok ? "text-green-500" : "text-red-500"
                    } border border-solid ${verifyResponse.ok ? "border-green-500" : "border-red-500"} px-2 py-0.5 rounded`}
                  >
                    {verifyResponse.message}
                  </span>
                )}
              </h1>
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="token">Token</label>
                {errors.token && touched.token && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.token}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-2 border border-solid border-secondary rounded"
                id="token"
                name="token"
                placeholder="******"
              />
              <p
                onClick={async () => {
                  setDisabled(true);
                  const response = await sendVerifyEmail({});
                  if (!response.data?.sendVerifyEmail.valueOf) {
                    setVerifyResponse({ ok: false, message: "Something went wrong..." });
                  } else {
                    setVerifyResponse({ ok: true, message: "Success" });
                  }
                  setDisabled(false);
                }}
                className="w-full text-right mb-6 text-sm underline font-medium"
              >
                Token Expired? Retry
              </p>
              <LoadingButton
                className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
                dark
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Verify
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

interface GeneralValues {
  username: string;
  email: string;
}

interface AboutValues {
  first_name: string;
  last_name: string;
  bio: string;
  country: string;
}

interface SecurityValues {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const Settings: NextPage = () => {
  const user = useAppSelector((store) => store.auth.user);
  const { data } = useSWR<Classifiers>("/api/classifiers", fetcher, { revalidateIfStale: false });
  const dispatch = useAppDispatch();
  const [, changeUsername] = useMutation(ChangeUsernameDocument);
  const [, changeEmail] = useMutation(ChangeEmailDocument);
  const [generalResponse, setGeneralResponse] = useState<BasicResponse | null>(null);
  const [, changeAbout] = useMutation(ChangeAboutDocument);
  const [aboutResponse, setAboutResponse] = useState<BasicResponse | null>(null);
  const [, changePassword] = useMutation(ChangePasswordDocument);
  const [securityResponse, setSecurityResponse] = useState<BasicResponse | null>(null);
  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);

  return (
    <>
      <Head>
        <title>Settings - Bella</title>
      </Head>
      {showVerifyEmailModal && <VerifyEmailModal setVisible={setShowVerifyEmailModal} />}
      {!user!.verified && (
        <button
          onClick={() => setShowVerifyEmailModal(true)}
          className="w-full bg-secondary text-primary text-base font-medium text-center underline py-4 z-20 fixed bottom-0"
        >
          Click Here to Verify your Email Address
        </button>
      )}
      <div className="pt-10 pb-20 px-4">
        <h1 className="text-2xl font-black font-display uppercase pb-6 border-b border-solid border-gray-300">Edit Profile</h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format"),
            username: yup
              .string()
              .min(3, "Min 3 Chars Required")
              .matches(/^[A-Za-z0-9]*$/, "Only ABC's & Numbers")
              .max(20, "Max 20 Chars"),
          })}
          onSubmit={async (values: GeneralValues, { setErrors, resetForm }: FormikHelpers<GeneralValues>) => {
            if (values.username) {
              const response = await changeUsername({ username: values.username });
              if (response.data?.changeUsername.errors) {
                setErrors(toErrorMap(response.data.changeUsername.errors));
              } else if (response.data?.changeUsername.user) {
                dispatch(setUser({ user: response.data.changeUsername.user }));
                setGeneralResponse({ ok: true, message: "Success" });
                resetForm();
              } else {
                setGeneralResponse({ ok: false, message: "Something went wrong..." });
              }
            }

            if (values.email) {
              const response = await changeEmail({ email: values.email });
              if (response.data?.changeEmail.errors) {
                setErrors(toErrorMap(response.data.changeEmail.errors));
              } else if (response.data?.changeEmail.user) {
                dispatch(setUser({ user: response.data.changeEmail.user }));
                setGeneralResponse({ ok: true, message: "Success" });
                resetForm();
              } else {
                setGeneralResponse({ ok: false, message: "Something went wrong..." });
              }
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full">
              <h2 className="text-lg flex justify-between items-center font-bold font-display uppercase mt-9 pb-2 mb-4 border-b border-solid border-gray-300">
                General
                {generalResponse && (
                  <span
                    className={`${generalResponse.ok ? "bg-green-100" : "bg-red-100"} text-xs sm:text-sm font-medium font-sans normal-case ${
                      generalResponse.ok ? "text-green-500" : "text-red-500"
                    } border border-solid ${generalResponse.ok ? "border-green-500" : "border-red-500"} px-2 py-0.5 rounded`}
                  >
                    {generalResponse.message}
                  </span>
                )}
              </h2>
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="username">Username</label>
                {errors.username && touched.username && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.username}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                id="username"
                name="username"
                placeholder={user!.username}
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="email">Email</label>
                {errors.email && touched.email && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.email}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-6 border border-solid border-secondary rounded"
                id="email"
                name="email"
                placeholder={user!.email}
                type="email"
              />
              <LoadingButton
                className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
                dark
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Save
              </LoadingButton>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            old_password: "",
            new_password: "",
            confirm_password: "",
          }}
          validationSchema={yup.object().shape({
            old_password: yup.string().test("is-oauth", "Required", function () {
              if (user!.oauth_user) {
                return true;
              }

              return false;
            }),
            new_password: yup.string().min(8, "Min 8 Chars Required").required("Required"),
            confirm_password: yup.string().oneOf([yup.ref("new_password"), undefined], "Does Not Match"),
          })}
          onSubmit={async (values: SecurityValues, { setErrors, resetForm }: FormikHelpers<SecurityValues>) => {
            const request = {
              changePasswordOptions: {
                old_password: values.old_password,
                new_password: values.new_password,
              },
            };
            const response = await changePassword(request);
            if (response.data?.changePassword.errors) {
              setErrors(toErrorMap(response.data.changePassword.errors));
            } else if (response.data?.changePassword.user) {
              dispatch(setUser({ user: response.data.changePassword.user }));
              setSecurityResponse({ ok: true, message: "Success" });
              resetForm();
            } else {
              setSecurityResponse({ ok: true, message: "Something went wrong..." });
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full">
              <h2 className="text-lg flex justify-between items-center font-bold font-display uppercase mt-9 pb-2 mb-4 border-b border-solid border-gray-300">
                Security
                {securityResponse && (
                  <span
                    className={`${securityResponse.ok ? "bg-green-100" : "bg-red-100"} text-xs sm:text-sm font-medium font-sans normal-case ${
                      securityResponse.ok ? "text-green-500" : "text-red-500"
                    } border border-solid ${securityResponse.ok ? "border-green-500" : "border-red-500"} px-2 py-0.5 rounded`}
                  >
                    {securityResponse.message}
                  </span>
                )}
              </h2>
              {!user!.oauth_user && (
                <>
                  <div className="flex items-center justify-between text-md font-semibold mb-2">
                    <label htmlFor="new-password">Current Password</label>
                    {errors.old_password && touched.old_password && (
                      <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                        {errors.old_password}
                      </div>
                    )}
                  </div>
                  <Field
                    className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                    placeholder="Password"
                    id="old_password"
                    name="old_password"
                    type="password"
                  />
                </>
              )}
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="new-password">New Password</label>
                {errors.new_password && touched.new_password && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.new_password}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                placeholder="Password"
                id="new_password"
                name="new_password"
                type="password"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="confirm-new-password">Confirm Password</label>
                {errors.confirm_password && touched.confirm_password && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.confirm_password}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-6 border border-solid border-secondary rounded"
                placeholder="Confirm Password"
                id="confirm_password"
                name="confirm_password"
                type="password"
              />
              <LoadingButton
                className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
                dark
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Save
              </LoadingButton>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            first_name: user!.first_name,
            last_name: user!.last_name,
            bio: user!.bio,
            country: user!.country,
          }}
          validationSchema={yup.object().shape({
            first_name: yup.string().max(20, "Max 20 Chars"),
            last_name: yup.string().max(20, "Max 20 Chars"),
            bio: yup.string().max(500, "Max 500 Chars"),
          })}
          onSubmit={async (values: AboutValues) => {
            setAboutResponse(null);
            const request = {
              changeAboutOptions: values,
            };
            const response = await changeAbout(request);
            if (response.data?.changeAbout) {
              dispatch(setUser({ user: response.data.changeAbout }));
              setAboutResponse({ ok: true, message: "Success" });
            } else {
              setAboutResponse({ ok: false, message: "Something went wrong..." });
            }
          }}
        >
          {({ errors, touched, values, setFieldValue, isSubmitting }) => (
            <Form className="w-full">
              <h2 className="text-lg flex justify-between items-center font-bold font-display uppercase mt-9 pb-2 mb-4 border-b border-solid border-gray-300">
                About
                {aboutResponse && (
                  <span
                    className={`${aboutResponse.ok ? "bg-green-100" : "bg-red-100"} text-xs sm:text-sm font-medium font-sans normal-case ${
                      aboutResponse.ok ? "text-green-500" : "text-red-500"
                    } border border-solid ${aboutResponse.ok ? "border-green-500" : "border-red-500"} px-2 py-0.5 rounded`}
                  >
                    {aboutResponse.message}
                  </span>
                )}
              </h2>
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="first-name">First Name</label>
                {errors.first_name && touched.first_name && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.first_name}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                id="first_name"
                name="first_name"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="last-name">Last Name</label>
                {errors.last_name && touched.last_name && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.last_name}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-3 mb-4 border border-solid border-secondary rounded"
                id="last_name"
                name="last_name"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="bio">Bio</label>
                {errors.bio && touched.bio && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.bio}
                  </div>
                )}
              </div>
              <Field
                className="w-full h-24 bg-transparent text-md font-medium p-3 border border-solid border-secondary rounded resize-none focus:outline-none"
                id="bio"
                name="bio"
                as="textarea"
              />
              <p className="w-full text-right text-sm text-gray-500">{values.bio ? 500 - values.bio.length : 500} Chars Left</p>
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
                  menu: () => "p-2 mt-2 bg-primary border border-solid border-secondary rounded shadow-2xl",
                  menuList: () => "flex flex-col gap-2",
                  option: ({ isSelected }) =>
                    clsx("py-2 px-3 hover:bg-gray-300 hover:text-secondary rounded", isSelected && "bg-secondary text-primary"),
                }}
                defaultValue={{ value: values.country, label: values.country }}
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
                options={data?.countries.map((country: Country) => ({ value: country.name, label: country.name }))}
              />
              <LoadingButton
                className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
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
