import { navBarItems } from "@/app/constants";
import Link from "next/link";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { auth } from "@/auth";
import { MdSwitchAccount } from "react-icons/md";
import Image from "next/image";
import { CartNavItem } from "./CartNavItem";

export const NavbarList = async () => {
  const session = await auth();

  return (
    <>
      <div className="hidden md:inline-flex items-center gap-7">
        {navBarItems?.map((items, index) => (
          <Link key={index} href={items?.link} className="navBarItem">
            {items?.title}
          </Link>
        ))}
        
        {/* Cart Navigation Item */}
        <CartNavItem />
        
        {/* Profile Navigation Item */}
        <Link
          href={session?.user ? "/dashboard" : "/signin"}
          className="navBarItem flex items-center gap-2"
        >
          {session?.user ? (
            <>
              <Image
                src={session.user.image as string}
                alt={session.user.name as string}
                width={24}
                height={24}
                className="rounded-full"
              />
            </>
          ) : (
            <>
              <MdSwitchAccount className="text-xl" />
              <span>Sign In</span>
            </>
          )}
        </Link>
        
        <Link href={"/studio"} className="navBarItem">
          Studio
        </Link>
      </div>
      <HiMenuAlt3 className="inline-flex md:hidden cursor-pointer text-2xl hover:text-darkOrange hoverEffect" />
    </>
  );
};
