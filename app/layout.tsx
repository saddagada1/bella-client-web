import Link from "next/link";
import Navbar from "./Navbar";
import "./globals.css";
import { Inter, Unbounded } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded" });

export const metadata = {
  title: "Bella",
  description: "(izzy)",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${inter.variable} font-sans bg-primary text-secondary flex flex-col items-center border-x-[0.1vmin] border-solid border-secondary`}
      >
        <Navbar />
        <div className="w-full flex justify-center mt-[6vmax] py-[0.5vmax] border-b-[0.1vmin] border-solid border-secondary">
          <div className="2xl:w-[60%] xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[95%] flex justify-between text-[0.6vmax] font-bold uppercase">
            <Link href="/profile">Trending</Link>
            <Link href="/profile">Menswear</Link>
            <Link href="/profile">Womenswear</Link>
            <Link href="/profile">Sneakers</Link>
            <Link href="/profile">Accessorires</Link>
          </div>
        </div>
        <main className="2xl:w-[60%] xl:w-[70%] lg:w-[80%] md:w-[90%] sm:w-[95%] h-fit min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
