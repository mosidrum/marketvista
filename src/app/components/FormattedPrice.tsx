import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  amount: number;
  className?: string;
}

export const FormattedPrice = ({ amount, className }: Props) => {
  const priceFormat = new Number(amount).toLocaleString("en-Us", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 1,
  });
  return (
    <span className={twMerge("text-base font-semibold", className)}>
      {priceFormat}
    </span>
  );
};
