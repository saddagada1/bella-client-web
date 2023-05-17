import { useAppDispatch } from "@/redux/hooks";
import Navbar from "../Navbar/Navbar";
import { Inter, Unbounded } from "next/font/google";
import { useEffect } from "react";
import { fetchRefreshToken } from "@/utils/fetchWithAxios";
import { setAuthentication } from "@/redux/slices/authSlice";
import { calcExpiresIn } from "@/utils/calc";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded" });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      const data = await fetchRefreshToken();
      if ("error" in data) {
        dispatch(
          setAuthentication({
            isAuthenticated: false,
            access_token: null,
            expires_in: null,
            user: null,
          })
        );
      } else {
        const expires_in = calcExpiresIn(data.expires_in);
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            access_token: data.access_token,
            expires_in: expires_in,
            user: data.user,
          })
        );
      }
    };

    initializeAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`${unbounded.variable} ${inter.variable} font-sans flex flex-col items-center`}>
        <Navbar />
        <main className="w-full h-full mt-[7.5rem]">{children}</main>
      </div>
    </>
  );
};

export default Layout;
