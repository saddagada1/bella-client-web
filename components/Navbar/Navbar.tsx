import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { FiSearch, FiMail, FiUser, FiShoppingBag, FiArrowRight, FiHeart, FiHome } from "react-icons/fi";
import { GrMenu } from "react-icons/gr";
import { useMutation } from "urql";
import { LogoutDocument } from "@/generated/graphql";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetAuthentication, setAuthentication } from "@/redux/slices/authSlice";
import { calcExpiresIn } from "@/utils/calc";
import AuthModal from "../AuthModal/AuthModal";
import { AnimatePresence, motion } from "framer-motion";

interface SideMenuProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  showAuth: Dispatch<SetStateAction<boolean>>;
  authView: Dispatch<SetStateAction<string>>;
}

const SideMenu: React.FC<SideMenuProps> = ({ setVisible, showAuth, authView }) => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const [, logout] = useMutation(LogoutDocument);

  return (
    <div className="w-screen h-screen z-50 fixed flex">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => setVisible(false)}
        className="w-full h-full absolute bg-secondary"
      />
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: "0%" }}
        exit={{ translateX: "-100%" }}
        transition={{ type: "tween", duration: 0.2 }}
        className="w-11/12 sm:w-5/6 h-full z-10 bg-primary shadow-2xl flex flex-col relative overflow-scroll"
      >
        <h1 className="font-display font-black text-4xl my-6 ml-6 uppercase">Bella</h1>
        {isAuthenticated ? (
          <div className="mx-6 mb-6 grid grid-cols-2 grid-rows-2">
            <Link className="flex items-center py-4" href="/profile">
              <FiUser className="text-2xl sm:text-3xl" />
              <span className="ml-2 text-md sm:ml-4 sm:text-lg uppercase font-bold">Profile</span>
            </Link>
            <Link className="flex items-center py-4" href="/profile">
              <FiHome className="text-2xl sm:text-3xl" /> <span className="ml-2 text-md sm:ml-4 sm:text-lg uppercase font-bold">Store</span>
            </Link>
            <Link className="flex items-center py-4" href="/profile">
              <FiHeart className="text-2xl sm:text-3xl" /> <span className="ml-2 text-md sm:ml-4 sm:text-lg uppercase font-bold">Likes</span>
            </Link>
            <Link className="flex items-center py-4" href="/profile">
              <FiMail className="text-2xl sm:text-3xl" /> <span className="ml-2 text-md sm:ml-4 sm:text-lg uppercase font-bold">Messages</span>
            </Link>
          </div>
        ) : (
          <div className="flex mx-6 mb-6 text-md font-display font-medium">
            <button
              onClick={() => {
                setVisible(false);
                showAuth(true);
                authView("login");
              }}
              className="uppercase py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary"
            >
              Login
            </button>
            <button
              onClick={() => {
                setVisible(false);
                showAuth(true);
                authView("signup");
              }}
              className="ml-6 uppercase py-2 px-3 border border-solid border-secondary rounded"
            >
              Sign Up
            </button>
          </div>
        )}
        <h2 className="mx-6 py-6 font-bold text-xl uppercase border-t border-solid border-gray-300">Browse Inventory</h2>
        <Link className="mx-6 py-4 flex justify-between items-center font-medium text-md border-b border-solid border-gray-300" href="/profile">
          Menswear <FiArrowRight className="text-2xl" />
        </Link>
        <Link className="mx-6 py-4 flex justify-between items-center font-medium text-md border-b border-solid border-gray-300" href="/profile">
          Womenswear <FiArrowRight className="text-2xl" />
        </Link>
        <Link className="mx-6 py-4 flex justify-between items-center font-medium text-md border-b border-solid border-gray-300" href="/profile">
          Footwear <FiArrowRight className="text-2xl" />
        </Link>
        <Link className="mx-6 py-4 flex justify-between items-center font-medium text-md border-b border-solid border-gray-300" href="/profile">
          Accessories <FiArrowRight className="text-2xl" />
        </Link>
        <Link className="mx-6 py-4 flex justify-between items-center font-medium text-md border-b border-solid border-gray-300" href="/profile">
          Jewelry <FiArrowRight className="text-2xl" />
        </Link>
        <Link className="mx-6 py-4 mb-10 flex justify-between items-center font-medium text-md border-b border-solid border-gray-300" href="/profile">
          Brands <FiArrowRight className="text-2xl" />
        </Link>
        <Link className="ml-6 mb-6 text-sm uppercase" href="/profile">
          Help
        </Link>
        <Link className="ml-6 mb-6 text-sm uppercase" href="/profile">
          FAQ
        </Link>
        <Link className="ml-6 mb-10 text-sm uppercase" href="/profile">
          About
        </Link>
        {isAuthenticated && (
          <button
            onClick={async () => {
              const response = await logout({});
              if (response) {
                dispatch(resetAuthentication());
                setVisible(false);
              }
            }}
            className="-mt-4 ml-6 mb-10 text-sm uppercase w-fit text-red-700"
          >
            Sign Out
          </button>
        )}
        <p className="ml-6 mb-6 text-xs uppercase">Bella &copy; 2023</p>
      </motion.div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState("");
  const [showSideMenu, setShowSideMenu] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  return (
    <>
      <nav className="w-full h-[7.5rem] fixed z-40 flex-shrink-0 flex flex-col justify-center items-center bg-primary">
        <div className="w-full h-16 px-4 flex justify-between items-center border-b border-solid border-secondary">
          <div className="flex items-center">
            <button onClick={() => setShowSideMenu(true)} className="text-3xl mr-4">
              <GrMenu />
            </button>
            <Link href="/" className="text-3xl mt-0.5 font-display font-black uppercase">
              Bella
            </Link>
          </div>
          <div className="w-1/2 font-medium justify-between hidden items-center mx-[1vmax] border-[0.1vmin] border-solid border-secondary rounded relative">
            <FiSearch className="text-[1.25vmax] ml-[0.5vmax]" />
            <input type="text" placeholder="Search" className="w-full mx-[0.5vmax] bg-transparent text-[0.75vmax] focus:outline-none" />
            <button className="cursor-pointer py-[0.25vmax] px-[0.75vmax] flex items-center uppercase text-[0.7vmax] font-display bg-secondary text-primary">
              Search
            </button>
          </div>
          <div className="flex items-center text-sm font-medium font-display uppercase">
            <Link className="hidden" href="/shop">
              Shop
            </Link>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthModalView("signup");
                  }}
                  className="hidden sm:block uppercase ml-2 py-2 px-3 border border-solid border-secondary rounded"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthModalView("login");
                  }}
                  className="uppercase ml-2 py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <Link className="hidden sm:block ml-6 text-3xl" href="/messages">
                  <FiMail />
                </Link>
                <Link className="ml-6 text-3xl" href="/profile">
                  <FiUser />
                </Link>
                <Link className="ml-6 text-3xl relative" href="/bag">
                  <FiShoppingBag />
                  <span className="absolute -top-1 -right-1 px-1 pt-0.5 bg-red-500 text-primary text-xs rounded-md">9+</span>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="w-full h-14 p-2 flex items-center justify-center border-b border-solid border-secondary">
          <div className="w-full hidden justify-between text-md font-bold uppercase">
            <Link href="/profile">Trending</Link>
            <Link href="/profile">Menswear</Link>
            <Link href="/profile">Womenswear</Link>
            <Link href="/profile">Sneakers</Link>
            <Link href="/profile">Accessorires</Link>
          </div>
          <div className="w-full h-full flex justify-between items-center text-md font-medium border border-solid border-secondary rounded relative">
            <FiSearch className="text-lg ml-2 flex-shrink-0" />
            <input type="text" placeholder="Search" className="w-full mx-3 bg-transparent focus:outline-none" />
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
      <AnimatePresence>
        {showSideMenu && <SideMenu setVisible={setShowSideMenu} showAuth={setShowAuthModal} authView={setAuthModalView} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
