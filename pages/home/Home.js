import Image from "next/image";
import React from "react";
import hero from "../../public/img/hero.jpg";

const Home = () => {
  return (
    <div className="w-full sm:block md:hidden absolute">
      <Image
        src={hero}
        alt="hero"
        className="w-full h-full bg-cover object-cover"
      />
      <div className="absolute bottom-0 left-0 ml-8 mb-12 z-10 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl sm:text-6xl md:text-6xl font-bold text-white">
            New Autunm
          </h1>
          <h1 className="text-3xl sm:text-6xl md:text-6xl font-bold text-white">
            2022 collection
          </h1>
        </div>
        <p className="text-white ">Choose the perfect outfit in our website</p>
      </div>
      <div className="w-full h-[99.5%] bg-[#161616]/60 absolute top-0 left-0"></div>
    </div>
  );
};

export default Home;
