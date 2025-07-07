import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  disable?: boolean;
}

export const Button = ({
  className,
  children,
  onClick,
  disable = false,
}: Props) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={twMerge(
        "bg-lightOrange text-base text-white hover:bg-darkOrange hoverEffect px-4 py-2 rounded-lg font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
};
