import { getBannerData } from "@/lib";
import React from "react";
import { Container } from "@/app";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/app";
import { BannerDataType } from "@/app/types";
import Link from "next/link";
import { FormattedPrice } from "@/app";

export const Banner = async () => {
  const bannerData = await getBannerData();
  const singleBanner = bannerData[0];

  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
      {/* Hero banner */}
      <div className="md:col-span-2 bg-bgLight rounded-lg overflow-hidden group flex flex-col sm:flex-row min-h-[300px]">
        <div className="flex-1 flex flex-col justify-center gap-4 p-8 sm:p-10">
          <span className="bg-lightGreen text-white rounded-full w-fit px-4 py-1 text-sm font-semibold">
            Sale <FormattedPrice amount={singleBanner?.price} />
          </span>
          <p className="text-xl md:text-2xl font-semibold leading-snug">
            {singleBanner?.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {singleBanner?.subtitle}
          </h2>
          <p className="text-sm text-black/60 font-medium max-w-[220px]">
            {singleBanner?.description}
          </p>
          <Link href="/shop" className="w-fit mt-2">
            <Button className="w-36 py-2.5 text-sm">Shop Now</Button>
          </Link>
        </div>
        <div className="flex items-end justify-center sm:w-[45%] overflow-hidden">
          <Image
            src={urlFor(singleBanner?.image).url()}
            alt={singleBanner.title}
            width={400}
            priority
            height={400}
            className="object-contain h-56 sm:h-64 md:h-[380px] group-hover:scale-105 hoverEffect"
          />
        </div>
      </div>

      {/* Side banners */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
        {bannerData.slice(1, 3).map((item: BannerDataType) => (
          <div
            key={item?._id}
            className="bg-bgLight rounded-lg overflow-hidden flex items-center justify-between p-4 md:p-5 group"
          >
            <div className="flex flex-col gap-1.5">
              <p className="text-sm sm:text-base md:text-lg font-semibold leading-snug">
                {item?.title}
              </p>
              <p className="text-sm md:text-base font-bold">{item?.subtitle}</p>
              <p className="font-medium text-black/60 text-xs sm:text-sm">
                💰
                <FormattedPrice
                  amount={item?.price}
                  className="text-lightRed font-bold"
                />
              </p>
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-bold underline underline-offset-2 decoration-[1px] hover:text-lightRed hoverEffect"
              >
                Shop now!
              </Link>
            </div>
            <Image
              src={urlFor(item?.image).url()}
              alt={item?.title}
              width={300}
              priority
              height={300}
              className="object-contain h-20 sm:h-24 md:h-28 w-2/5 group-hover:scale-105 hoverEffect"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};
