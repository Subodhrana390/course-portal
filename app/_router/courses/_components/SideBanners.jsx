import GlobalAPI from "@/app/_utils/GlobalAPI";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SideBanners() {
  const [SideBannerList, setSideBannerList] = useState([]);
  useEffect(() => {
    getSideBanners();
  }, []);

  const getSideBanners = () => {
    GlobalAPI.getSideBanner().then((resp) => {
      setSideBannerList(resp.sideBanners);
    });
  };

  return (
    <div>
      {SideBannerList.map((item, index) => (
        <div key={index}>
          <Image
            src={item.banner.url}
            alt="banner"
            width={500}
            height={300}
            onClick={() => {
              window.open(item?.url);
            }}
            className="rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}

export default SideBanners;
