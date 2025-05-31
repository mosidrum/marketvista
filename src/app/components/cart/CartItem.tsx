import Image from "next/image";
import React from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { AlertType, ProductionDataType } from "@/app/types";
import { urlFor } from "@/sanity/lib/image";
import { FormattedPrice } from "../FormattedPrice";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from "@/app/redux";
import Link from "next/link";
import { showAlert } from "@/app/utils";

type CartItemType = {
  item: ProductionDataType;
};

export const CartItem = ({ item }: CartItemType) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-20 flex justify-between gap-4 p-4 mt-4 rounded-md shadow-custom">
      <div className="flex items-center gap-4">
        <Link href={`/product/${item.slug.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt={item.title}
            width={500}
            height={500}
            className="h-10 w-10 md:h-16 md:w-16 object-contain"
          />
        </Link>
        <div>
          <p className="text-xs md:text-sm font-bold">{item?.title}</p>
          <p className="text-xs md:text-sm text-lightOrange">{item?.brand}</p>
        </div>
      </div>
      <div className="w-2/4 md:w-1/2 flex items-center justify-end gap-4 md:justify-between">
        <div className="flex items-center gap-1 md:gap-6 px-2 py-1 rounded-lg">
          <div className="w-4 md:w-6 flex justify-center">
            {item?.quantity > 1 ? (
              <div className="border border-lightOrange p-2 rounded-lg text-lightOrange">
                <HiMinus
                  className="hover:cursor-pointer"
                  onClick={() => dispatch(decreaseQuantity(item._id))}
                />
              </div>
            ) : (
              <div className="border border-lightOrange p-2 rounded-lg text-lightOrange">
                <HiMinus className="invisible" />
              </div>
            )}
          </div>
          <p className="font-medium">{item?.quantity}</p>
          <div className="border border-lightOrange p-2 rounded-lg text-lightOrange">
            <HiPlus
              className="hover:cursor-pointer"
              onClick={() => dispatch(increaseQuantity(item._id))}
            />
          </div>
        </div>
        <FormattedPrice
          amount={item?.price * item?.quantity}
          className="text-lightGreen"
        />
        <FaTimes
          className="hover:cursor-pointer"
          size={20}
          onClick={() => {
            dispatch(removeItemFromCart(item?._id));
            showAlert(
              `${item.title.substring(0, 12)} removed from cart`,
              AlertType.SUCCESS
            );
          }}
        />
      </div>
    </div>
  );
};
