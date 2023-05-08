"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";

const Navbar: React.FC = () => {
  const path = usePathname();
  return (
    <nav className="w-full h-[6vmax] fixed z-50 flex flex-col border-b-[0.1vmin] border-solid border-secondary">
      <div className="w-full h-[3vmax] relative overflow-hidden">
        <div className="anim-grain" />
      </div>
      <div className="w-full h-[4vmax] mt-[-1vmax] z-10 bg-primary flex justify-center items-center border-t-[0.1vmin] border-x-[0.1vmin] border-solid border-secondary rounded-tr-xl rounded-tl-xl">
        <div className="2xl:w-[60%] xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[95%] flex justify-between items-center">
          <Link
            href={path === "/" ? "#" : "/"}
            className="text-[1.75vmax] leading-none font-display font-black uppercase"
          >
            Bella
          </Link>
          <div className="w-1/2 font-medium flex justify-between items-center mx-[1vmax] border-[0.1vmin] border-solid border-secondary rounded relative">
            <FiSearch className="text-[1vmax] ml-[0.5vmax]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full mx-[0.5vmax] bg-transparent leading-none text-[0.6vmax] focus:outline-none"
            />
            <div className="cursor-pointer py-[0.35vmax] px-[0.5vmax] flex items-center uppercase text-[0.6vmax] font-display bg-secondary text-primary">
              Search
            </div>
          </div>
          <div className="flex items-center text-[0.6vmax] font-medium font-display uppercase">
            <Link href={path === "/shop" ? "#" : "/shop"}>Shop</Link>
            <div className="cursor-pointer ml-[1.25vmax] px-[0.5vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded">
              Login
            </div>
            <div className="cursor-pointer ml-[1vmax] px-[0.5vmax] py-[0.25vmax] border-[0.1vmin] border-solid border-secondary rounded bg-secondary text-primary">
              Sign Up
            </div>
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
  );
};

export default Navbar;
