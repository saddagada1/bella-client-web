import Layout from "@/components/Layout/Layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider as ReduxProvider } from "react-redux";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@/utils/urql";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID!}>
      <ReduxProvider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
};

export default withUrqlClient(createUrqlClient)(App);
