import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Button = ({ className, children }: Props) => {
  return (
    <button
      className={twMerge(
        "bg-lightOrange text-base text-white hover:text-darkOrange hoverEffect md:px-8 md:py-3 rounded-full font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
};
