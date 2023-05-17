import WithAuth from "@/components/HOC/WithAuth";
import { useAppSelector } from "@/redux/hooks";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const Profile: NextPage = ({}) => {
  const user = useAppSelector((store) => store.auth.user);
  return (
    <>
      <Head>
        <title>Profile - Bella</title>
      </Head>
      <div className="h-40 mx-4 py-4 border-b border-solid border-gray-300 flex">
        <div className="h-full aspect-square rounded-full relative overflow-hidden flex-shrink-0">
          <Image src="/media/utils/blank-profile.webp" alt="profile-picture" fill className="object-cover" />
        </div>
        <div className="pl-4 pt-1 overflow-hidden relative">
          <h1 className="font-display font-medium text-lg uppercase text-ellipsis whitespace-nowrap overflow-hidden mb-0.5">{`${user!.first_name} ${
            user!.last_name
          }`}</h1>
          <p className="text-sm font-medium mb-1">{`@${user!.username}`}</p>
          <div className="flex items-center gap-1 text-sm font-medium">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <FaStar key={index} className="text-red-500" />
              ))}
            <p className="ml-1">(0)</p>
          </div>
          <Link
            className="font-display font-medium text-sm uppercase py-2 px-3 border border-solid border-secondary rounded bg-secondary text-primary absolute bottom-0"
            href="/settings"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="py-2 mx-4 border-b border-solid border-gray-300 flex justify-between items-center">
        <div>
          <p className="font-display font-medium text-sm">32</p>
          <p className="font-medium text-sm">Sold</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">12</p>
          <p className="font-medium text-sm">Items</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">1232</p>
          <p className="font-medium text-sm">Followers</p>
        </div>
        <div>
          <p className="font-display font-medium text-sm">1345</p>
          <p className="font-medium text-sm">Following</p>
        </div>
      </div>
      {user!.bio && (
        <div className="py-2 mx-4 border-b border-solid border-gray-300">
          <p className="font-medium text-sm break-words">{user!.bio}</p>
        </div>
      )}
      <div className="mx-4 mt-4 grid grid-cols-3 auto-rows-fr gap-4">
        <div className="bg-black aspect-square rounded-xl">f</div>
        <div className="bg-black aspect-square rounded-xl"></div>
        <div className="bg-black aspect-square rounded-xl"></div>
        <div className="bg-black aspect-square rounded-xl"></div>
      </div>
    </>
  );
};

export default WithAuth(Profile);
