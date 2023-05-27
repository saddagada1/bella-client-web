import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bella</title>
      </Head>
      <div className="h-96 flex flex-col gap-2 text-primary p-2">
        <Link
          href="/shop"
          className="h-2/3 bg-secondary rounded-xl p-4 flex items-end relative overflow-hidden will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 bottom-0 w-full h-full object-cover"
          >
            <source src="/media/videos/hero.mp4" />
          </video>
          <div className="anim-grain opacity-10 top-0" />
          <h1 className="font-display font-black uppercase text-3xl leading-none z-10">
            Embrace your own unique style.
          </h1>
          <div className="arrow bg-primary absolute w-1/6 aspect-square top-0 right-0" />
        </Link>
        <div className="h-1/3 flex gap-2">
          <div className="w-1/2 relative rounded-xl overflow-hidden">
            <Image
              src="/media/images/hero1.jpeg"
              alt="hero-1"
              fill
              className="object-cover saturate-50"
            />
            <div className="anim-grain opacity-10" />
          </div>
          <div className="flex-1 flex gap-2">
            <div className="w-1/2 relative rounded-xl overflow-hidden">
              <Image
                src="/media/images/hero2.jpeg"
                alt="hero-2"
                fill
                className="object-cover saturate-50"
              />
              <div className="anim-grain opacity-10" />
            </div>
            <div className="w-1/2 relative rounded-xl overflow-hidden">
              <Image
                src="/media/images/hero3.jpeg"
                alt="hero-3"
                fill
                className="object-cover saturate-50"
              />
              <div className="anim-grain opacity-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 text-sm flex justify-center font-display">
        <p className="w-11/12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, sapiente aperiam! Nihil
          quia autem unde dolore. Corporis adipisci consectetur libero possimus est doloremque,
          omnis ut alias facere, natus nisi eum.
        </p>
      </div>
    </>
  );
};

export default Home;
