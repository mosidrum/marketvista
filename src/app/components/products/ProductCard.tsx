import { ProductionDataType } from "@/app/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdStar } from "react-icons/md";
import { FormattedPrice } from "../FormattedPrice";
import { AddToCartButton } from "../button";

export const ProductCard = ({ item }: { item: ProductionDataType }) => {
  return (
    <div className="border border-px border-lightText/40 rounded-md relative group overflow-hidden">
      <div className="overflow-hidden">
        <Link href={`/product/${item?.slug.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt={item?.title}
            width={500}
            height={500}
            className="w-full h-72 object-cover group-hover:scale-105 hoverEffect"
          />
        </Link>
      </div>
      <div className="px-6 flex flex-col items-center gap-2">
        <div className="text-base text-lightText flex items-center">
          {Array?.from({ length: 5 }).map((_, index) => {
            const filled = index + 1 <= Math.floor(item.ratings);
            const halfFilled =
              index + 1 > Math.floor(item.ratings) &&
              index < Math.ceil(item.ratings);
            return (
              <MdStar
                className={`${filled ? "text-[#fa8900]" : halfFilled ? "text-[#deb889]" : "text-lightText"}`}
                key={index}
              />
            );
          })}
        </div>
        <p className="uppercase text-sm font-bold text-lightOrange">
          {item.brand}
        </p>
        <h2 className="text-base font-semibold text-accent line-clamp-1">
          {item.title}
        </h2>
        <p className="text-center text-sm line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-3 mb-5">
          <FormattedPrice
            amount={item.rowprice}
            className="text-lightText line-through"
          />
          <FormattedPrice amount={item.price} className="text-darkOrange" />
        </div>
      </div>
      <AddToCartButton item={item} />
    </div>
  );
};
