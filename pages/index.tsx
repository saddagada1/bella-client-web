import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>Bella</title>
      </Head>
      <div className="w-full h-[55vh] flex row gap-[1vmax] text-primary mt-[2vmax]">
        <div className="w-1/2 relative rounded-xl overflow-hidden">
          <Image src="/hero1.jpeg" alt="hero-1" fill style={{ objectFit: "cover" }} />
          <Link
            href="/trending"
            className="w-full h-full absolute flex items-end p-[1vmax] text-[0.75vmax] leading-none font-black uppercase backdrop-blur-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
          >
            <p>Trending</p>
          </Link>
        </div>
        <div className="w-1/2 flex flex-col gap-[1vmax]">
          <div className="h-3/5 bg-secondary rounded-xl p-[1vmax] flex items-end relative overflow-hidden">
            <div className="grain opacity-10" />
            <h1 className="font-display font-black uppercase text-[3vmax] leading-none z-10">
              Embrace your own personal style.
            </h1>
            <div className="arrow bg-primary absolute w-1/6 aspect-square top-0 right-0" />
          </div>
          <div className="flex-1 flex gap-[1vmax]">
            <div className="w-1/2 relative rounded-xl overflow-hidden">
              <Image src="/hero2.jpeg" alt="hero-2" fill style={{ objectFit: "cover" }} />
              <Link
                href="/womenswear"
                className="w-full h-full absolute flex items-end p-[1vmax] text-[0.75vmax] leading-none font-black uppercase backdrop-blur-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
              >
                <p>Womenswear</p>
              </Link>
            </div>
            <div className="w-1/2 relative rounded-xl overflow-hidden">
              <Image src="/hero3.jpeg" alt="hero-3" fill style={{ objectFit: "cover" }} />
              <Link
                href="/menswear"
                className="w-full h-full absolute flex items-end p-[1vmax] text-[0.75vmax] leading-none font-black uppercase backdrop-blur-xl transition-opacity duration-500 opacity-0 hover:opacity-100"
              >
                <p>Menswear</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="my-[3vmax] text-[1.5vmax] flex justify-center font-display">
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
