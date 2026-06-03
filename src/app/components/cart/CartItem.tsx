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
    <div className="w-full min-h-[72px] flex justify-between gap-4 p-4 mt-4 rounded-md shadow-custom">
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
        <div className="flex items-center gap-1 md:gap-6 px-2 py-1 rounded-lg" role="group" aria-label="Quantity controls">
          <div className="w-4 md:w-6 flex justify-center">
            {item?.quantity > 1 && (
              <button
                aria-label={`Decrease quantity of ${item.title}`}
                className="border border-lightOrange p-2 rounded-lg text-lightOrange"
                onClick={() => dispatch(decreaseQuantity(item._id))}
              >
                <HiMinus aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="font-medium" aria-label={`Quantity: ${item?.quantity}`}>{item?.quantity}</p>
          <button
            aria-label={`Increase quantity of ${item.title}`}
            className="border border-lightOrange p-2 rounded-lg text-lightOrange"
            onClick={() => dispatch(increaseQuantity(item._id))}
          >
            <HiPlus aria-hidden="true" />
          </button>
        </div>
        <FormattedPrice
          amount={item?.price * item?.quantity}
          className="text-lightGreen"
        />
        <button
          aria-label={`Remove ${item.title} from cart`}
          className="hover:cursor-pointer text-gray-500 hover:text-red-500 hoverEffect"
          onClick={() => {
            dispatch(removeItemFromCart(item?._id));
            showAlert(
              `${item.title.substring(0, 12)} removed from cart`,
              AlertType.SUCCESS
            );
          }}
        >
          <FaTimes aria-hidden="true" size={20} />
        </button>
      </div>
    </div>
  );
};
