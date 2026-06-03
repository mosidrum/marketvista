import React from "react";
import { twMerge } from "tailwind-merge";

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

interface Props {
  amount: number;
  className?: string;
}

export const FormattedPrice = ({ amount, className }: Props) => {
  return (
    <span className={twMerge("text-base font-semibold", className)}>
      {formatter.format(Number(amount))}
    </span>
  );
};
