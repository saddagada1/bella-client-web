import LoadingButton from "@/components/LoadingButton";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useMutation } from "urql";
import {
  AuthResponse,
  LoginDocument,
  LoginWithGoogleDocument,
  LogoutDocument,
  RegisterDocument,
  RegisterWithGoogleDocument,
} from "@/generated/graphql";
import { trimString } from "@/utils/trimString";
import { toErrorMap } from "@/utils/toErrorMap";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetAuthentication, setAuthentication } from "@/redux/slices/authSlice";
import { calcExpiresIn } from "@/utils/calc";
import { useGoogleLogin } from "@react-oauth/google";

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpWithEmailValues {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  onAuth: (response: AuthResponse) => void;
}

const SignUpWithEmail: React.FC<SignUpWithEmailValues> = ({ setEmail, onAuth, setDisabled }) => {
  const signUpFormRef = useRef<FormikProps<SignUpValues> | null>(null);
  const [, register] = useMutation(RegisterDocument);

  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length < 5) {
      error = "Min 5 Chars Required";
    }
    return error;
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid Email Format";
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length < 8) {
      error = "Min 8 Chars Required";
    }
    return error;
  };

  const validateConfirmPassword = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (signUpFormRef.current && signUpFormRef.current["values"]["password"] !== value) {
      error = "Entries do not Match";
    }
    return error;
  };

  return (
    <Formik
      innerRef={signUpFormRef}
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values: SignUpValues, { setErrors }: FormikHelpers<SignUpValues>) => {
        setDisabled(true);
        const request = {
          registerOptions: {
            username: values.username,
            email: trimString(values.email),
            password: values.password,
          },
        };
        const response = await register(request);
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.auth && response.data?.register.user) {
          onAuth(response.data.register);
          setDisabled(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full pt-[1vmax]">
          <h2 className="text-[1.15vmax] flex items-center font-extrabold mb-[0.75vmax]">
            <BiArrowBack onClick={() => setEmail(false)} className="cursor-pointer mr-[0.5vmax]" />
            Sign Up
          </h2>
          <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
            <label htmlFor="username">Username</label>
            {errors.username && touched.username && (
              <div className="text-red-500">{errors.username}</div>
            )}
          </div>
          <Field
            className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[0.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
            placeholder="e.g. Crafty"
            id="username"
            name="username"
            validate={validateUsername}
          />
          <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
            <label htmlFor="email">Email</label>
            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <Field
            className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[0.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
            id="email"
            name="email"
            placeholder="Bella@acme.ca"
            type="email"
            validate={validateEmail}
          />
          <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
            <label htmlFor="password">Password</label>
            {errors.password && touched.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <Field
            className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[0.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            validate={validatePassword}
          />
          <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
            <label htmlFor="confirm password">Confirm Password</label>
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>
          <Field
            className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[1.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            validate={validateConfirmPassword}
          />
          <LoadingButton
            className="w-full h-[2.5vmax] flex justify-center items-center bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
            dark
            loading={isSubmitting}
            disabled={isSubmitting}
            tabIndex={0}
          >
            Sign Up
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

interface SignUpHomeValues {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
  onAuth: (response: AuthResponse) => void;
}

const SignUpHome: React.FC<SignUpHomeValues> = ({ setEmail, setView, onAuth, setDisabled }) => {
  const [username, setUsername] = useState(false);
  const [googleAuthCode, setGoogleAuthCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, registerWithGoogle] = useMutation(RegisterWithGoogleDocument);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleAuthCode(codeResponse.code);
      setUsername(true);
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

  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length < 5) {
      error = "Min 5 Chars Required";
    }
    return error;
  };

  return (
    <>
      {!username && !googleAuthCode ? (
        <>
          <h2 className="w-full text-[1.15vmax] flex items-center font-extrabold my-[1vmax]">
            Sign Up
            {error && (
              <span className="bg-red-300 text-[0.75vmax] font-bold text-red-500 px-[0.25vmax] rounded-sm">
                {error}
              </span>
            )}
          </h2>
          <button
            onClick={() => {
              setDisabled(true);
              setError(null);
              login();
            }}
            className="w-full flex items-center justify-center mb-[1vmax] py-[0.5vmax] border-[0.1vmin] border-solid border-secondary rounded-sm text-[0.75vmax] font-bold"
          >
            <BsGoogle className="mr-[1vmax]" /> Continue with Google
          </button>
          <div className="w-full pt-[1vmax] border-t-[0.1vmin] border-solid border-secondary">
            <button
              onClick={() => setEmail(true)}
              className="w-full flex items-center justify-center py-[0.5vmax] bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
            >
              <MdEmail className="mr-[1vmax] text-[0.9vmax]" /> Sign Up with Email
            </button>
            <button
              onClick={() => setView("login")}
              className="w-full text-center mt-[1vmax] text-[0.6vmax] underline font-bold"
            >
              {"Already have an account? Log in."}
            </button>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            username: "",
          }}
          onSubmit={async (
            values: { username: string },
            { setErrors }: FormikHelpers<{ username: string }>
          ) => {
            setDisabled(true);
            const response = await registerWithGoogle(values, {
              fetchOptions: {
                credentials: "include",
                headers: {
                  Authorization: `Basic ${googleAuthCode}`,
                },
              },
            });
            if (response.data?.registerWithGoogle.errors) {
              setErrors(toErrorMap(response.data.registerWithGoogle.errors));
            } else if (
              response.data?.registerWithGoogle.user &&
              response.data?.registerWithGoogle.auth
            ) {
              onAuth(response.data.registerWithGoogle);
              setDisabled(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-full pt-[1vmax]">
              <h2 className="text-[1.15vmax] flex items-center font-extrabold mb-[0.75vmax]">
                <BiArrowBack
                  onClick={() => {
                    setUsername(false);
                    setGoogleAuthCode(null);
                    setDisabled(false);
                  }}
                  className="cursor-pointer mr-[0.5vmax]"
                />
                Create Username
              </h2>
              <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
                <label htmlFor="username">Username</label>
                {errors.username && touched.username && (
                  <div className="text-red-500">{errors.username}</div>
                )}
              </div>
              <Field
                className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[1.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
                placeholder="e.g. Crafty"
                id="username"
                name="username"
                validate={validateUsername}
              />
              <LoadingButton
                className="w-full h-[2.5vmax] flex justify-center items-center bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
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

interface LoginWithEmailValues {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  onAuth: (response: AuthResponse) => void;
}

const LoginWithEmail: React.FC<LoginWithEmailValues> = ({ setEmail, onAuth, setDisabled }) => {
  const [, login] = useMutation(LoginDocument);

  const validateEmail = (value: string) => {
    let error;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid Email Format";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values: LoginValues, { setErrors }: FormikHelpers<LoginValues>) => {
        setDisabled(true);
        const request = { loginOptions: values };
        const response = await login(request);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user && response.data?.login.auth) {
          onAuth(response.data.login);
          setDisabled(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full pt-[1vmax]">
          <h2 className="text-[1.15vmax] flex items-center font-extrabold mb-[0.75vmax]">
            <BiArrowBack onClick={() => setEmail(false)} className="cursor-pointer mr-[0.5vmax]" />
            Login
          </h2>
          <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
            <label htmlFor="email">Email</label>
            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <Field
            className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[0.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
            id="email"
            name="email"
            placeholder="Bella@acme.ca"
            type="email"
            validate={validateEmail}
          />
          <div className="flex justify-between text-[0.75vmax] font-bold my-[0.5vmax]">
            <label htmlFor="password">Password</label>
            {errors.password && touched.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <Field
            className="w-full bg-transparent text-[0.75vmax] font-medium px-[0.75vmax] py-[0.5vmax] mb-[0.75vmax] border-[0.1vmin] border-solid border-secondary rounded-sm"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
          />
          <p className="w-full text-right mb-[1vmax] text-[0.6vmax] underline font-bold">
            Forgotten Password?
          </p>
          <LoadingButton
            className="w-full h-[2.5vmax] flex justify-center items-center bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
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

interface LoginHomeValues {
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
  onAuth: (response: AuthResponse) => void;
}

const LoginHome: React.FC<LoginHomeValues> = ({ setEmail, setView, onAuth, setDisabled }) => {
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
      <h2 className="w-full text-[1.15vmax] flex items-center justify-between font-extrabold my-[1vmax]">
        Login
        {error && (
          <span className="bg-red-300 text-[0.75vmax] font-bold text-red-500 px-[0.25vmax] rounded-sm">
            {error}
          </span>
        )}
      </h2>
      <button
        onClick={() => {
          setDisabled(true);
          setError(null);
          login();
        }}
        className="w-full flex items-center justify-center mb-[1vmax] py-[0.5vmax] border-[0.1vmin] border-solid border-secondary rounded-sm text-[0.75vmax] font-bold"
      >
        <BsGoogle className="mr-[1vmax]" /> Continue with Google
      </button>
      <div className="w-full pt-[1vmax] border-t-[0.1vmin] border-solid border-secondary">
        <button
          onClick={() => setEmail(true)}
          className="w-full flex items-center justify-center py-[0.5vmax] bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
        >
          <MdEmail className="mr-[1vmax] text-[0.9vmax]" /> Login with Email
        </button>
        <button
          onClick={() => setView("signup")}
          className="w-full text-center mt-[1vmax] text-[0.6vmax] underline font-bold"
        >
          {"Don't have an account? Sign Up."}
        </button>
      </div>
    </>
  );
};

interface AuthModalValues {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
  view: string;
  onAuth: (response: AuthResponse) => void;
}

const AuthModal: React.FC<AuthModalValues> = ({ setVisible, setView, view, onAuth }) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [signUpWithEmail, setSignUpWithEmail] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="w-screen h-screen z-50 fixed flex justify-center items-center">
      <div
        onClick={() => !disabled && setVisible(false)}
        className="w-full h-full absolute bg-secondary opacity-50"
      />
      <div className="w-[20%] p-[1.5vmax] z-10 bg-primary flex flex-col items-center rounded-xl">
        <h1 className="w-full text-center text-[1.5vmax] pb-[1vmax] border-b-[0.1vmin] border-solid border-secondary leading-none font-display font-black uppercase">
          Welcome!
        </h1>
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

const Navbar: React.FC = () => {
  const path = usePathname();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState("");
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const [, logout] = useMutation(LogoutDocument);

  return (
    <>
      <nav className="w-full h-[6vmax] fixed z-40 flex flex-col border-b-[0.1vmin] border-solid border-secondary">
        <div className="w-full h-[3vmax] relative overflow-hidden">
          <div className="anim-grain" />
        </div>
        <div className="w-full h-[4vmax] mt-[-1vmax] z-10 bg-primary flex justify-center items-center border-t-[0.1vmin] border-x-[0.1vmin] border-solid border-secondary rounded-tr-xl rounded-tl-xl">
          <div className="2xl:w-[60%] xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[95%] flex justify-between items-center">
            <Link
              href={path === "/" ? "#" : "/"}
              className="text-[2vmax] leading-none font-display font-black uppercase"
            >
              Bella
            </Link>
            <div className="w-1/2 font-medium flex justify-between items-center mx-[1vmax] border-[0.1vmin] border-solid border-secondary rounded relative">
              <FiSearch className="text-[1.25vmax] ml-[0.5vmax]" />
              <input
                type="text"
                placeholder="Search"
                className="w-full mx-[0.5vmax] bg-transparent leading-none text-[0.75vmax] focus:outline-none"
              />
              <button
                onClick={async () => {
                  const response = await logout({});
                  if (response) {
                    dispatch(resetAuthentication());
                  }
                }}
                className="cursor-pointer py-[0.25vmax] px-[0.75vmax] flex items-center uppercase text-[0.7vmax] font-display bg-secondary text-primary"
              >
                Search
              </button>
            </div>
            <div className="flex items-center text-[0.7vmax] font-medium font-display uppercase">
              <Link href={path === "/shop" ? "#" : "/shop"}>Shop</Link>
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setAuthModalView("login");
                    }}
                    className="uppercase ml-[1.25vmax] px-[0.75vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setAuthModalView("signup");
                    }}
                    className="uppercase ml-[1vmax] px-[0.75vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded bg-secondary text-primary"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="uppercase ml-[1.25vmax] px-[0.75vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded"
                    href={path === "/profile" ? "#" : "/profile"}
                  >
                    Profile
                  </Link>
                  <Link
                    className="uppercase ml-[1vmax] px-[0.75vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded bg-secondary text-primary"
                    href={path === "/bag" ? "#" : "/bag"}
                  >
                    Bag - ( 0 )
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showAuthModal && (
        <AuthModal
          setVisible={setShowAuthModal}
          setView={setAuthModalView}
          view={authModalView}
          onAuth={(response) => {
            dispatch(
              setAuthentication({
                isAuthenticated: true,
                access_token: response!.auth!.access_token,
                expires_in: calcExpiresIn(response!.auth!.expires_in),
                user: response!.user!,
              })
            );
            setShowAuthModal(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
