import { AuthResponse, RegisterDocument, RegisterWithGoogleDocument, LoginDocument, LoginWithGoogleDocument } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { trimString } from "@/utils/trimString";
import { useGoogleLogin } from "@react-oauth/google";
import { Formik, FormikHelpers, Form, Field } from "formik";
import * as yup from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useMutation } from "urql";
import LoadingButton from "../Utils/LoadingButton";

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  first_name: string;
  last_name: string;
}

interface SignUpWithEmailProps {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  onAuth: (response: AuthResponse) => void;
}

const SignUpWithEmail: React.FC<SignUpWithEmailProps> = ({ setEmail, onAuth, setDisabled }) => {
  const [stepTwo, setStepTwo] = useState(false);
  const [, register] = useMutation(RegisterDocument);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        first_name: "",
        last_name: "",
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email("Invalid Format").required("Required"),
        username: yup
          .string()
          .min(3, "Min 3 Chars Required")
          .matches(/^[A-Za-z0-9]*$/, "Only ABC's & Numbers")
          .max(20, "Max 20 Chars")
          .required("Required"),
        password: yup.string().min(8, "Min 8 Chars Required").required("Required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Does Not Match"),
        first_name: yup.string().max(20, "Max 20 Chars").required("Required"),
        last_name: yup.string().max(20, "Max 20 Chars").required("Required"),
      })}
      onSubmit={async (values: SignUpValues, { setErrors }: FormikHelpers<SignUpValues>) => {
        setDisabled(true);
        const request = {
          registerOptions: {
            email: trimString(values.email),
            password: values.password,
            username: values.username.toLowerCase(),
            first_name: values.first_name,
            last_name: values.last_name,
          },
        };
        const response = await register(request);
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.auth && response.data?.register.user) {
          onAuth(response.data.register);
        }
        setDisabled(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full">
          <h1 className="text-2xl flex items-center font-bold font-display uppercase pb-2 mb-4 border-b border-solid border-gray-300">
            <BiArrowBack onClick={() => (stepTwo ? setStepTwo(false) : setEmail(false))} className="cursor-pointer text-3xl mr-4 flex-shrink-0" />
            Sign Up
          </h1>
          {!stepTwo ? (
            <>
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="email">Email</label>
                {errors.email && touched.email && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.email}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
                id="email"
                name="email"
                placeholder="Bella@acme.ca"
                type="email"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="password">Password</label>
                {errors.password && touched.password && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.password}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
                placeholder="Password"
                id="password"
                name="password"
                type="password"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="confirm password">Confirm Password</label>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-6 border border-solid border-secondary rounded"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="first-name">First Name</label>
                {errors.first_name && touched.first_name && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.first_name}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
                id="first_name"
                name="first_name"
                placeholder="First Name"
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
                className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="username">Username</label>
                {errors.username && touched.username && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.username}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-6 border border-solid border-secondary rounded"
                placeholder="e.g. Crafty"
                id="username"
                name="username"
              />
            </>
          )}
          {!stepTwo ? (
            <div
              onClick={() => {
                if (touched.email && touched.password && touched.confirmPassword && !errors.email && !errors.password && !errors.confirmPassword) {
                  setStepTwo(true);
                }
              }}
              className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
            >
              Continue
            </div>
          ) : (
            <LoadingButton
              className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
              dark
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign Up
            </LoadingButton>
          )}
        </Form>
      )}
    </Formik>
  );
};

interface SignUpWithGoogleValues {
  first_name: string;
  last_name: string;
  username: string;
}

interface SignUpHomeProps {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
  onAuth: (response: AuthResponse) => void;
}

const SignUpHome: React.FC<SignUpHomeProps> = ({ setEmail, setView, onAuth, setDisabled }) => {
  const [stepTwo, setStepTwo] = useState(false);
  const [googleAuthCode, setGoogleAuthCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, registerWithGoogle] = useMutation(RegisterWithGoogleDocument);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleAuthCode(codeResponse.code);
      setStepTwo(true);
    },
    onError: () => {
      setError("Something went wrong...");
      setDisabled(false);
    },
    onNonOAuthError: () => {
      setDisabled(false);
    },
    flow: "auth-code",
  });

  return (
    <>
      {!stepTwo && !googleAuthCode ? (
        <>
          <h1 className="w-full text-2xl flex items-center justify-between font-bold font-display uppercase pb-2 mb-4 border-b border-solid border-gray-300">
            Sign Up
            {error && (
              <span className="bg-red-100 text-xs sm:text-sm font-medium font-sans normal-case text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                {error}
              </span>
            )}
          </h1>
          <button
            onClick={() => {
              setDisabled(true);
              setError(null);
              login();
            }}
            className="w-full flex items-center justify-center mb-4 py-3 border border-solid border-secondary rounded text-md font-bold"
          >
            <BsGoogle className="mr-2" /> Continue with Google
          </button>
          <div className="w-full pt-4 border-t border-solid border-gray-300">
            <button
              onClick={() => setEmail(true)}
              className="w-full flex items-center justify-center mb-4 py-3 rounded bg-secondary text-primary text-md font-bold border border-solid border-secondary"
            >
              <MdEmail className="mr-2 text-lg" /> Sign Up with Email
            </button>
            <button onClick={() => setView("login")} className="w-full text-center text-sm underline font-medium">
              {"Already have an account? Log in."}
            </button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            username: "",
          }}
          validationSchema={yup.object().shape({
            username: yup
              .string()
              .min(3, "Min 3 Chars Required")
              .matches(/^[A-Za-z0-9]*$/, "Only ABC's & Numbers")
              .max(20, "Max 20 Chars")
              .required("Required"),
            first_name: yup.string().max(20, "Max 20 Chars").required("Required"),
            last_name: yup.string().max(20, "Max 20 Chars").required("Required"),
          })}
          onSubmit={async (values: SignUpWithGoogleValues, { setErrors }: FormikHelpers<SignUpWithGoogleValues>) => {
            setDisabled(true);
            const request = {
              registerOptions: {
                username: values.username.toLowerCase(),
                first_name: values.first_name,
                last_name: values.last_name,
              },
            };
            const response = await registerWithGoogle(request, {
              fetchOptions: {
                credentials: "include",
                headers: {
                  Authorization: `Basic ${googleAuthCode}`,
                },
              },
            });
            if (response.data?.registerWithGoogle.errors) {
              setErrors(toErrorMap(response.data.registerWithGoogle.errors));
            } else if (response.data?.registerWithGoogle.user && response.data?.registerWithGoogle.auth) {
              onAuth(response.data.registerWithGoogle);
            }
            setDisabled(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full">
              <h1 className="text-2xl flex items-center font-bold font-display uppercase pb-2 mb-4 border-b border-solid border-gray-300">
                <BiArrowBack
                  onClick={() => {
                    setStepTwo(false);
                    setGoogleAuthCode(null);
                    setDisabled(false);
                  }}
                  className="cursor-pointer text-3xl mr-4 flex-shrink-0"
                />
                Sign Up
              </h1>
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="first-name">First Name</label>
                {errors.first_name && touched.first_name && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.first_name}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
                id="first_name"
                name="first_name"
                placeholder="First Name"
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
                className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
              />
              <div className="flex items-center justify-between text-md font-semibold mb-2">
                <label htmlFor="username">Username</label>
                {errors.username && touched.username && (
                  <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                    {errors.username}
                  </div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-md font-medium p-2 mb-6 border border-solid border-secondary rounded"
                placeholder="e.g. Crafty"
                id="username"
                name="username"
              />
              <LoadingButton
                className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
                dark
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Sign Up
              </LoadingButton>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

interface LoginValues {
  email: string;
  password: string;
}

interface LoginWithEmailProps {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  onAuth: (response: AuthResponse) => void;
}

const LoginWithEmail: React.FC<LoginWithEmailProps> = ({ setEmail, onAuth, setDisabled }) => {
  const [, login] = useMutation(LoginDocument);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email("Invalid Format").required("Required"),
      })}
      onSubmit={async (values: LoginValues, { setErrors }: FormikHelpers<LoginValues>) => {
        setDisabled(true);
        const request = {
          loginOptions: { email: trimString(values.email), password: values.password },
        };
        const response = await login(request);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user && response.data?.login.auth) {
          onAuth(response.data.login);
        }
        setDisabled(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full">
          <h1 className="text-2xl flex items-center font-bold font-display uppercase pb-2 mb-4 border-b border-solid border-gray-300">
            <BiArrowBack onClick={() => setEmail(false)} className="cursor-pointer text-3xl mr-4 flex-shrink-0" />
            Login
          </h1>
          <div className="flex items-center justify-between text-md font-semibold mb-2">
            <label htmlFor="email">Email</label>
            {errors.email && touched.email && (
              <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                {errors.email}
              </div>
            )}
          </div>
          <Field
            className="w-full bg-transparent text-md font-medium p-2 mb-4 border border-solid border-secondary rounded"
            id="email"
            name="email"
            placeholder="Bella@acme.ca"
            type="email"
          />
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <label htmlFor="password">Password</label>
            {errors.password && touched.password && (
              <div className="bg-red-100 text-xs sm:text-sm font-medium text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
                {errors.password}
              </div>
            )}
          </div>
          <Field
            className="w-full bg-transparent text-md font-medium p-2 mb-2 border border-solid border-secondary rounded"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
          />
          <p className="w-full text-right mb-6 text-sm underline font-medium">Forgotten Password?</p>
          <LoadingButton
            className="w-full h-14 flex justify-center items-center bg-secondary text-primary rounded text-md font-bold font-display uppercase border border-solid border-secondary"
            dark
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

interface LoginHomeProps {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
  onAuth: (response: AuthResponse) => void;
}

const LoginHome: React.FC<LoginHomeProps> = ({ setEmail, setView, onAuth, setDisabled }) => {
  const [error, setError] = useState<string | null>(null);
  const [, loginWithGoogle] = useMutation(LoginWithGoogleDocument);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await loginWithGoogle(
        {},
        {
          fetchOptions: {
            credentials: "include",
            headers: {
              Authorization: `Basic ${codeResponse.code}`,
            },
          },
        }
      );
      if (response.data?.loginWithGoogle.errors) {
        setError(response.data.loginWithGoogle.errors[0].message);
      } else if (response.data?.loginWithGoogle.user && response.data?.loginWithGoogle.auth) {
        onAuth(response.data.loginWithGoogle);
        setDisabled(false);
      }
    },
    onError: () => {
      setError("Something went wrong...");
      setDisabled(false);
    },
    onNonOAuthError: () => {
      setDisabled(false);
    },
    flow: "auth-code",
  });

  return (
    <>
      <h1 className="w-full text-2xl flex items-center justify-between font-bold uppercase font-display pb-2 mb-4 border-b border-solid border-gray-300">
        Login
        {error && (
          <span className="bg-red-100 text-xs sm:text-sm font-medium font-sans normal-case text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
            {error}
          </span>
        )}
      </h1>
      <button
        onClick={() => {
          setDisabled(true);
          setError(null);
          login();
        }}
        className="w-full flex items-center justify-center mb-4 py-3 border border-solid border-secondary rounded text-md font-bold"
      >
        <BsGoogle className="mr-2" /> Continue with Google
      </button>
      <div className="w-full pt-4 border-t border-solid border-gray-300">
        <button
          onClick={() => setEmail(true)}
          className="w-full flex items-center justify-center mb-4 py-3 rounded bg-secondary text-primary text-md font-bold border border-solid border-secondary"
        >
          <MdEmail className="mr-2 text-lg" /> Login with Email
        </button>
        <button onClick={() => setView("signup")} className="w-full text-center text-sm underline font-medium">
          {"Don't have an account? Sign Up."}
        </button>
      </div>
    </>
  );
};

interface AuthModalProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
  view: string;
  onAuth: (response: AuthResponse) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ setVisible, setView, view, onAuth }) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [signUpWithEmail, setSignUpWithEmail] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="w-screen h-screen z-50 fixed flex justify-center items-center">
      <div onClick={() => !disabled && setVisible(false)} className="w-full h-full absolute bg-secondary opacity-50" />
      <div className="w-11/12 sm:w-10/12 p-6 z-10 bg-primary flex flex-col items-center rounded-xl">
        {view === "login" ? (
          loginWithEmail ? (
            <LoginWithEmail
              setDisabled={setDisabled}
              setEmail={setLoginWithEmail}
              onAuth={(response) => {
                onAuth(response);
              }}
            />
          ) : (
            <LoginHome
              setDisabled={setDisabled}
              setEmail={setLoginWithEmail}
              setView={setView}
              onAuth={(response) => {
                onAuth(response);
              }}
            />
          )
        ) : signUpWithEmail ? (
          <SignUpWithEmail
            setDisabled={setDisabled}
            setEmail={setSignUpWithEmail}
            onAuth={(response) => {
              onAuth(response);
            }}
          />
        ) : (
          <SignUpHome
            setDisabled={setDisabled}
            setEmail={setSignUpWithEmail}
            setView={setView}
            onAuth={(response) => {
              onAuth(response);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
