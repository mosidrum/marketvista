import { getBannerData } from "@/lib";
import React from "react";

export const Banner = async () => {
  const bannerData = await getBannerData();
  console.log(bannerData);
  return <div>Banner</div>;
};
