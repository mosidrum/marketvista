"use client";
import { addToCart } from "@/app/redux";
import { AlertType, ProductionDataType } from "@/app/types";
import { showAlert } from "@/app/utils";
import React from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

interface Props {
  item: ProductionDataType;
  className?: string;
}

export const AddToCartButton = ({ item, className }: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: ProductionDataType) => {
    dispatch(addToCart(item));
    showAlert(
      `${item.title.substring(0, 12)} added to cart`,
      AlertType.SUCCESS
    );
  };

  return (
    <button
      onClick={() => handleAddToCart(item)}
      className={twMerge(
        `bg-accent text-white w-full py-2 border border-px border-accent hover:bg-darkOrange hover:border-darkOrange hoverEfffect font-semibold tracking-wide flex items-center justify-center gap-1`,
        className
      )}
    >
      Add to cart
    </button>
  );
};
