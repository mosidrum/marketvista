import Link from "next/link";
import React from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { Logo } from "./Navbar/Logo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StudioHeader = (props: any) => {
  return (
    <div>
      <div className="p-2 bg-accent text-gray-100 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold hover:text-darkOrange hoverEffect"
        >
          <IoReturnDownBack className="text-2xl" />
          Go to website
        </Link>
        <Logo className="text-white" />
        <p className="hidden md:inline-flex text-sm">
          Adim studio for marketvista shopping
        </p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};
