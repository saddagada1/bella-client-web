"use client";

import LoadingButton from "@/components/LoadingButton";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpWithEmailValues {
  setEmail: Dispatch<SetStateAction<boolean>>;
}

const SignUpWithEmail: React.FC<SignUpWithEmailValues> = ({ setEmail }) => {
  const signUpFormRef = useRef<FormikProps<SignUpValues> | null>(null);

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
      onSubmit={async (values: SignUpValues, { setErrors }: FormikHelpers<SignUpValues>) => {}}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full pt-[1vmax]">
          <h3 className="text-[1.15vmax] flex items-center font-extrabold mb-[0.75vmax]">
            <button onClick={() => setEmail(false)} className="mr-[0.5vmax]">
              <BiArrowBack />
            </button>
            Sign Up
          </h3>
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
            className="w-full py-[0.5vmax] bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

interface SignUpHomeValues {
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
}

const SignUpHome: React.FC<SignUpHomeValues> = ({ setEmail, setView }) => {
  return (
    <>
      <h3 className="w-full text-[1.15vmax] flex items-center font-extrabold my-[1vmax]">
        Sign Up
      </h3>
      <button className="w-full flex items-center justify-center mb-[1vmax] py-[0.5vmax] border-[0.1vmin] border-solid border-secondary rounded-sm text-[0.75vmax] font-bold">
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
  );
};

interface LoginValues {
  email: string;
  password: string;
}

interface LoginWithEmailValues {
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
}

const LoginWithEmail: React.FC<LoginWithEmailValues> = ({ setEmail, setView }) => {
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
      onSubmit={async (values: LoginValues, { setErrors }: FormikHelpers<LoginValues>) => {}}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full pt-[1vmax]">
          <h3 className="text-[1.15vmax] flex items-center font-extrabold mb-[0.75vmax]">
            <button onClick={() => setEmail(false)} className="mr-[0.5vmax]">
              <BiArrowBack />
            </button>
            Login
          </h3>
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
            className="w-full py-[0.5vmax] bg-secondary text-primary rounded-sm text-[0.75vmax] font-bold border-[0.1vmin] border-solid border-secondary"
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
  setEmail: Dispatch<SetStateAction<boolean>>;
  setView: Dispatch<SetStateAction<string>>;
}

const LoginHome: React.FC<LoginHomeValues> = ({ setEmail, setView }) => {
  return (
    <>
      <h3 className="w-full text-[1.15vmax] flex items-center font-extrabold my-[1vmax]">Login</h3>
      <button className="w-full flex items-center justify-center mb-[1vmax] py-[0.5vmax] border-[0.1vmin] border-solid border-secondary rounded-sm text-[0.75vmax] font-bold">
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
}

const AuthModal: React.FC<AuthModalValues> = ({ setVisible, setView, view }) => {
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [signUpWithEmail, setSignUpWithEmail] = useState(false);

  return (
    <div className="w-screen h-screen z-50 fixed flex justify-center items-center">
      <div
        onClick={() => setVisible(false)}
        className="w-full h-full absolute bg-secondary opacity-50"
      />
      <div className="w-[20%] p-[1.5vmax] z-10 bg-primary flex flex-col items-center rounded-xl">
        <h1 className="w-full text-center text-[1.5vmax] pb-[1vmax] border-b-[0.1vmin] border-solid border-secondary leading-none font-display font-black uppercase">
          Welcome!
        </h1>
        {view === "login" ? (
          loginWithEmail ? (
            <LoginWithEmail setEmail={setLoginWithEmail} setView={setView} />
          ) : (
            <LoginHome setEmail={setLoginWithEmail} setView={setView} />
          )
        ) : signUpWithEmail ? (
          <SignUpWithEmail setEmail={setSignUpWithEmail} />
        ) : (
          <SignUpHome setEmail={setSignUpWithEmail} setView={setView} />
        )}
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const path = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState("");
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
              <button className="cursor-pointer py-[0.25vmax] px-[0.75vmax] flex items-center uppercase text-[0.7vmax] font-display bg-secondary text-primary">
                Search
              </button>
            </div>
            <div className="flex items-center text-[0.7vmax] font-medium font-display uppercase">
              <Link href={path === "/shop" ? "#" : "/shop"}>Shop</Link>
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthModalView("login");
                }}
                className="cursor-pointer uppercase ml-[1.25vmax] px-[0.75vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthModalView("signup");
                }}
                className="cursor-pointer uppercase ml-[1vmax] px-[0.75vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded bg-secondary text-primary"
              >
                Sign Up
              </button>
              {/* <Link href={path === "/profile" ? "#" : "/profile"}>
      <FiUser className="text-[0.9vmax]" />
    </Link>
    <Link className="ml-[1vmax]" href={path === "/bag" ? "#" : "/bag"}>
      <FiShoppingBag className="text-[0.9vmax]" />
    </Link> */}
            </div>
          </div>
        </div>
      </nav>
      {showAuthModal && (
        <AuthModal setVisible={setShowAuthModal} setView={setAuthModalView} view={authModalView} />
      )}
    </>
  );
};

export default Navbar;
