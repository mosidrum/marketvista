import Link from "next/link";
import React from "react";
import { MdSwitchAccount } from "react-icons/md";
import { Cart } from "./cart/Cart";

export const Sidebar = () => {
  return (
    <div className="fixed top-80 right-2 z-20 gap-2 flex flex-col">
      <Link
        href={"/signin"}
        className="bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-lightGreen group overflow-hidden"
      >
        <div className="flex items-center justify-center">
          <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
          <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
        </div>
        <p className="text-sm font-semibold">Profile</p>
      </Link>

      <Cart />
    </div>
  );
};
