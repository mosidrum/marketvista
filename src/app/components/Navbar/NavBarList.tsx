"use client";

import { navBarItems } from "@/app/constants";
import Link from "next/link";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdSwitchAccount } from "react-icons/md";
import Image from "next/image";
import { CartNavItem } from "@/app";
import { useAuth } from "@/app/hooks";
import { showAlert } from "@/app/utils";
import { AlertType } from "@/app/types";

export const NavbarList = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  console.log("nav", user);

  const handleLogout = async () => {
    try {
      await logout();
      showAlert(`User logged out successfully`, AlertType.SUCCESS);
    } catch (error) {
      showAlert(error as string, AlertType.ERROR);
    }
  };

  if (loading) {
    return (
      <>
        <div className="hidden md:inline-flex items-center gap-7">
          {navBarItems?.map((items, index) => (
            <Link key={index} href={items?.link} className="navBarItem">
              {items?.title}
            </Link>
          ))}

          <CartNavItem />

          <div className="navBarItem">
            <div className="animate-pulse bg-gray-300 h-6 w-20 rounded"></div>
          </div>

          <Link href={"/studio"} className="navBarItem">
            Studio
          </Link>
        </div>
        <HiMenuAlt3 className="inline-flex md:hidden cursor-pointer text-2xl hover:text-darkOrange hoverEffect" />
      </>
    );
  }

  return (
    <>
      <div className="hidden md:inline-flex items-center gap-7">
        {navBarItems?.map((items, index) => (
          <Link key={index} href={items?.link} className="navBarItem">
            {items?.title}
          </Link>
        ))}

        <CartNavItem />

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="navBarItem flex items-center gap-2"
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || user.email || "User"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-darkOrange rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </div>
              )}
              <span className="hidden sm:inline">
                {user.displayName || user.email?.split("@")[0] || "User"}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="navBarItem flex items-center gap-2 text-red-600 hover:text-red-700"
              title="Logout"
            >
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link href="/signin" className="navBarItem flex items-center gap-2">
            <MdSwitchAccount className="text-xl" />
            <span>Sign In</span>
          </Link>
        )}

        <Link href={"/studio"} className="navBarItem">
          Studio
        </Link>
      </div>
      <HiMenuAlt3 className="inline-flex md:hidden cursor-pointer text-2xl hover:text-darkOrange hoverEffect" />
    </>
  );
};
