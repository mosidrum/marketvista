import { navBarItems } from "@/app/constants";
import Link from "next/link";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";

export const NavbarList = () => {
  return (
    <>
      <div className="hidden md:inline-flex items-center gap-7">
        {navBarItems?.map((items, index) => (
          <Link key={index} href={items?.link} className="navBarItem">
            {items?.title}
          </Link>
        ))}
        <Link href={"/signin"} className="navBarItem">
          Sign In
        </Link>
        <Link href={"/studio"} className="navBarItem">
          Studio
        </Link>
      </div>
      <HiMenuAlt3 className="inline-flex md:hidden cursor-pointer text-2xl hover:text-darkOrange hoverEffect" />
    </>
  );
};
