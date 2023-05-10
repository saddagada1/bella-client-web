import Navbar from "./Navbar";
import { Inter, Unbounded } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded" });

export const metadata = {
  title: "Bella",
  description: "(izzy)",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={`${unbounded.variable} ${inter.variable} font-sans flex flex-col items-center`}
      >
        <Navbar />
        <main className="w-full h-fit min-h-screen mt-[7.5rem] flex-shrink-0">{children}</main>
      </div>
    </>
  );
};

export default Layout;
