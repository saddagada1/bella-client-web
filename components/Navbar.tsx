import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GrMenu } from "react-icons/gr";
import { useMutation } from "urql";
import { LogoutDocument } from "@/generated/graphql";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetAuthentication, setAuthentication } from "@/redux/slices/authSlice";
import { calcExpiresIn } from "@/utils/calc";
import AuthModal from "./AuthModal";
import { AnimatePresence, motion } from "framer-motion";

interface SideMenuProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const SideMenu: React.FC<SideMenuProps> = ({ setVisible }) => {
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
        className="w-5/6 h-full z-10 bg-primary shadow-2xl flex flex-col relative overflow-scroll"
      >
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Home
        </Link>
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Trending
        </Link>
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Menswear
        </Link>
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Womenswear
        </Link>
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Sneakers
        </Link>
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Accessorires
        </Link>
        <Link
          className="w-full py-6 pl-6 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Sell
        </Link>
        <Link
          className="w-full py-6 pl-6 mb-10 font-bold text-xl border-b border-solid border-secondary"
          href="/profile"
        >
          Shop
        </Link>
        <Link className="ml-6 mb-6 text-base uppercase" href="/profile">
          Help
        </Link>
        <Link className="ml-6 mb-6 text-base uppercase" href="/profile">
          FAQ
        </Link>
        <Link className="ml-6 mb-10 text-base uppercase" href="/profile">
          About
        </Link>
        <p className="ml-6 mb-6 text-sm uppercase">Bella &copy; 2023</p>
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
  const [, logout] = useMutation(LogoutDocument);

  return (
    <>
      <nav className="w-full h-[7.5rem] fixed z-40 flex-shrink-0 flex flex-col justify-center items-center bg-primary">
        <div className="w-full h-16 px-4 flex justify-between items-center border-b border-solid border-secondary">
          <div className="flex items-center">
            <button onClick={() => setShowSideMenu(true)} className="text-3xl mr-4">
              <GrMenu />
            </button>
            <Link href="/" className="text-2xl font-display font-black uppercase">
              Bella
            </Link>
          </div>
          <div className="w-1/2 font-medium justify-between hidden items-center mx-[1vmax] border-[0.1vmin] border-solid border-secondary rounded relative">
            <FiSearch className="text-[1.25vmax] ml-[0.5vmax]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full mx-[0.5vmax] bg-transparent text-[0.75vmax] focus:outline-none"
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
                <Link
                  className="hidden sm:block uppercase ml-2 py-2 px-3 border border-solid border-secondary rounded"
                  href="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="uppercase ml-2 py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary"
                  href="/bag"
                >
                  Bag - (99+)
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
          <div className="w-full h-full flex justify-between items-center text-sm font-bold border border-solid border-secondary rounded relative">
            <FiSearch className="text-lg ml-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search"
              className="w-full mx-3 bg-transparent focus:outline-none"
            />
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
      <AnimatePresence>{showSideMenu && <SideMenu setVisible={setShowSideMenu} />}</AnimatePresence>
    </>
  );
};

export default Navbar;
