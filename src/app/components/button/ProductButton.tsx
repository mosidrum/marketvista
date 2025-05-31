"use client";
import { addToCart, removeItemFromCart } from "@/app/redux";
import { AlertType, ProductionDataType } from "@/app/types";
import { showAlert } from "@/app/utils";
import React from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

export enum ButtonAction {
  ADD = "Add",
  REMOVE = "Remove",
}

interface Props {
  item: ProductionDataType;
  className?: string;
  type: ButtonAction;
}

export const ProductButton = ({ item, className, type }: Props) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: ProductionDataType) => {
    dispatch(addToCart(item));
    showAlert(
      `${item.title.substring(0, 12)} added to cart`,
      AlertType.SUCCESS
    );
  };

  const removeFromCart = (item: ProductionDataType) => {
    dispatch(removeItemFromCart(item?._id));
    showAlert(
      `${item.title.substring(0, 12)} removed from cart`,
      AlertType.SUCCESS
    );
  };

  return (
    <button
      onClick={() =>
        type === ButtonAction.ADD ? handleAddToCart(item) : removeFromCart(item)
      }
      className={twMerge(
        `bg-accent text-white w-full py-2 border border-px border-accent hover:bg-darkOrange hover:border-darkOrange hoverEfffect font-semibold tracking-wide flex items-center justify-center gap-1`,
        className
      )}
    >
      {type === ButtonAction.ADD ? "Add to cart" : "Remove from cart"}
    </button>
  );
};
