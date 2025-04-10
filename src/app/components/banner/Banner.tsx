import { getBannerData } from "@/lib";
import React from "react";
import { Container } from "../Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Button } from "../button";

export const Banner = async () => {
  const bannerData = await getBannerData();
  const singleBanner = bannerData[0];

  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 md:max-h-[600px]">
      <div className="md:col-span-2 bg-bgLight relative flex items-end justify-end rounded-lg overflow-hidden group">
        <div className="h-full z-10 absolute left-10 top-0 flex flex-col justify-center isolate gap-5 md:gap-10">
          <div className="flex flex-col gap-1 md:gap-3">
            <button className="bg-lightGreen text-white rounded-full w-20 py-1 text-sm font-semibold hover:bg-green-600 hoverEffect">
              Sale {singleBanner?.price}
            </button>
            <p className="text-xl md:text-xl font-semibold">
              {singleBanner?.title}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {singleBanner?.subtitle}
            </h2>
            <p className="text-xs md:text-sm text-black/60 font-medium max-w-34">
              {singleBanner?.description}
            </p>
          </div>
          <Button className="w-36 text-sm">Showp Now</Button>
        </div>
        <Image
          src={urlFor(singleBanner?.image).url()}
          alt={singleBanner.title}
          width={500}
          height={500}
          className="object-contain h-72 md:h-full max-h-[600px] self-end group-hover:scale-105 hoverEffect"
        />
      </div>
      <div>
        <div></div>
      </div>
    </Container>
  );
};
