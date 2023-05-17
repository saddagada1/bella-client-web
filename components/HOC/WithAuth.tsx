import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import Loading from "../Utils/Loading";
import { NextPage } from "next";

const WithAuth = (Page: NextPage) => {
  const AuthenticatedComponent = () => {
    const auth = useAppSelector((store) => store.auth);
    const router = useRouter();

    useEffect(() => {
      if (auth.isAuthenticated !== null && auth.user === null) {
        router.push("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, auth]);

    return !!auth.user ? <Page /> : <Loading />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
