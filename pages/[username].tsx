import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { createUrqlClient, urqlSsrCache } from "@/utils/createUrqlClient";
import Head from "next/head";
import React from "react";
import { UserByUsernameDocument } from "@/generated/graphql";
import { SSRData, useQuery } from "urql";

export const getServerSideProps: GetServerSideProps<{ urqlState: SSRData; username: string }> = async ({ params }) => {
  const client = createUrqlClient();
  await client.query(UserByUsernameDocument, { username: params!.username as string }).toPromise();
  return { props: { urqlState: urqlSsrCache.extractData(), username: params!.username as string } };
};

const Profile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ username }) => {
  const [{ data, fetching, error }] = useQuery({ query: UserByUsernameDocument, variables: { username: username } });

  return (
    <>
      <Head>
        <title>Profile - Bella</title>
      </Head>
      <div className="h-96 flex flex-col gap-2 text-primary p-2"></div>
    </>
  );
};
export default Profile;
