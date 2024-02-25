import Image from "next/image";
import React from "react";

function WelcomeBannerDashboard({ user }) {
  return (
    <div className="bg-purple-200 rounded-sm p-5 flex gap-5 items-center ">
      <Image
        src="/Banner.png"
        width={100}
        height={100}
        alt="banner"
        className="h-auto w-auto sm:h-4 sm:w-4"
      />
      <div>
        <h2 className="font-light text-[32px]">
          Welcome Back,
          <span className=" font-bold text-primary">{user?.fullName}</span>
        </h2>
        <h2 className="text-[16px] font-light text-gray-500">
          Explore, Learn and build All Real life Projects
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
