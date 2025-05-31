"use client";
import { ProductionDataType, StoreState } from "@/app/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdStar } from "react-icons/md";
import { FormattedPrice } from "../FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "@/app/redux";
import { HiMinus, HiPlus } from "react-icons/hi";
import { ButtonAction, ProductButton } from "../button";

export const ProductCard = ({ item }: { item: ProductionDataType }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: StoreState) => state?.marketVista);
  const isExist = cart.find((cartItem) => cartItem._id === item._id);
  console.log({ isExist });

  return (
    <div className="border border-px border-lightText/40 rounded-md relative group overflow-hidden flex flex-col">
      <div className="overflow-hidden">
        <Link href={`/product/${item?.slug.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt={item?.title}
            width={500}
            loading="lazy"
            height={500}
            className="w-full h-72 object-cover group-hover:scale-105 hoverEffect"
          />
        </Link>
      </div>

      <div className="px-6 flex flex-col items-center gap-2 flex-grow">
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

      <div className="h-8 flex items-center justify-center px-2 mb-2">
        {isExist && (
          <div className="flex items-center justify-center space-x-5 md:gap-3">
            <div className="w-4 md:w-6 flex justify-center">
              {isExist?.quantity > 1 && (
                <div className="border border-lightOrange p-2 rounded-lg text-lightOrange">
                  <HiMinus
                    className="hover:cursor-pointer"
                    onClick={() => dispatch(decreaseQuantity(item._id))}
                  />
                </div>
              )}
            </div>
            <p className="font-bold">{isExist?.quantity}</p>
            <div className="border border-lightOrange p-2 rounded-lg text-lightOrange">
              <HiPlus
                className="hover:cursor-pointer"
                onClick={() => dispatch(increaseQuantity(item._id))}
              />
            </div>
          </div>
        )}
      </div>

      {isExist ? (
        <ProductButton type={ButtonAction.REMOVE} item={item} />
      ) : (
        <ProductButton type={ButtonAction.ADD} item={item} />
      )}
    </div>
  );
};
