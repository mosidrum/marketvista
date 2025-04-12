import { ProductionDataType } from "@/app/types";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  item: ProductionDataType;
  className?: string;
}

export const AddToCartButton = ({ item, className }: props) => {
  return (
    <button
      className={twMerge(
        `bg-accent text-white w-full py-2 border border-px border-accent hover:bg-darkOrange hover:border-darkOrange hoverEfffect font-semibold tracking-wide flex items-center justify-center gap-1`
      )}
    >
      Add to cart
    </button>
  );
};
