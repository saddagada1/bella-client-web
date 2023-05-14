import Layout from "@/components/Layout/Layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { createUrqlClient, urqlSsrCache } from "@/utils/createUrqlClient";
import type { AppProps } from "next/app";
import withRedux from "next-redux-wrapper";
import { Provider as UrqlProvider } from "urql";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DominoSpinner } from "react-spinners-kit";
import { fetchRefreshToken } from "@/utils/fetchWithAxios";
import { calcExpiresIn } from "@/utils/calc";
import { setAuthentication } from "@/redux/slices/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Loading = () => {
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

    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-screem h-screen flex justify-center items-center">
      <DominoSpinner size={8} color="#151515" loading={true} sizeUnit="vmax" />
    </div>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  pageProps.urqlState && urqlSsrCache.restoreData(pageProps.urqlState);
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const urqlClient = useMemo(() => {
    if (isAuthenticated === null) {
      return null;
    }
    return createUrqlClient();
  }, [isAuthenticated]);

  if (!urqlClient) {
    return <Loading />;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID!}>
      <UrqlProvider value={urqlClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UrqlProvider>
    </GoogleOAuthProvider>
  );
};

export default withRedux(() => store)(App);
