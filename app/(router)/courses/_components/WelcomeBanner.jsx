import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  return (
    <div className="flex gap-5 items-center bg-white rounded-xl p-5">
      <Image src="/Banner.png" width={100} height={100} alt="banner" />
      <div>
        <h2 className="font-bold text-[27px]">
          Welcome to
          <span className="text-primary"> Coding India</span>
        </h2>
        <h2 className="text-gray-500">
          Explore, Learn and build All Real life Projects
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
