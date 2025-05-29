import Image from "next/image";
import React from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { ProductionDataType } from "@/app/types";
import { urlFor } from "@/sanity/lib/image";

type CartItemType = {
  item: ProductionDataType;
};

export const CartItem = ({ item }: CartItemType) => {
  return (
    <div className="w-full h-20 flex justify-between gap-4 p-4 mt-4 rounded-md shadow-custom">
      <div className="flex items-center gap-4">
        <Image
          src={urlFor(item?.image).url()}
          alt="cart"
          width={500}
          height={500}
          className="h-10 w-10 md:h-16 md:w-16"
        />
        <div>
          <p className="text-xs md:text-sm font-bold">{item?.title}</p>
          <p className="text-xs md:text-sm text-lightOrange">{item?.brand}</p>
        </div>
      </div>
      <div className="w-2/4 md:w-1/2 flex items-center justify-end gap-4 md:justify-between">
        <div className="flex items-center gap-1 md:gap-3 px-2 py-1 border border-lightText rounded-lg">
          <HiPlus className="hover:cursor-pointer" />
          <p>{item?.quantity}</p>
          <HiMinus className="hover:cursor-pointer" />
        </div>
        <p className="text-sm md:text-base font-bold text-lightOrange">
          {item?.price}
        </p>
        <FaTimes className="hover:cursor-pointer" size={20} />
      </div>
    </div>
  );
};
