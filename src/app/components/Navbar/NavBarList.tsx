"use client";

import { navBarItems } from "@/app/constants";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdSwitchAccount } from "react-icons/md";
import Image from "next/image";
import { CartNavItem } from "@/app";
import { useAuth } from "@/app/hooks";
import { showAlert } from "@/app/utils";
import { AlertType } from "@/app/types";

export const NavbarList = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout, isAuthenticated } = useAuth();

  const close = () => setMobileOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      showAlert(`User logged out successfully`, AlertType.SUCCESS);
      close();
    } catch (error) {
      showAlert(error as string, AlertType.ERROR);
    }
  };

  const AuthSection = ({ mobile = false }: { mobile?: boolean }) => {
    if (loading) {
      return (
        <div
          className={
            mobile
              ? "animate-pulse bg-gray-200 h-8 w-28 rounded"
              : "animate-pulse bg-gray-300 h-6 w-20 rounded"
          }
        />
      );
    }
    if (isAuthenticated && user) {
      return (
        <div className={`flex ${mobile ? "flex-col gap-1" : "items-center gap-2"}`}>
          <Link
            href="/dashboard"
            onClick={close}
            className={`navBarItem flex items-center gap-2 ${mobile ? "py-3 border-b border-lightText/10 text-base" : ""}`}
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
            <span>{user.displayName || user.email?.split("@")[0] || "User"}</span>
          </Link>
          <button
            onClick={handleLogout}
            className={`navBarItem flex items-center gap-2 text-red-600 hover:text-red-700 ${mobile ? "py-3 border-b border-lightText/10 text-base text-left" : ""}`}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <Link
        href="/signin"
        onClick={close}
        className={`navBarItem flex items-center gap-2 ${mobile ? "py-3 border-b border-lightText/10 text-base" : ""}`}
      >
        <MdSwitchAccount className="text-xl" />
        <span>Sign In</span>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:inline-flex items-center gap-7">
        {navBarItems?.map((item, index) => (
          <Link key={index} href={item?.link} className="navBarItem">
            {item?.title}
          </Link>
        ))}
        <CartNavItem />
        <AuthSection />
      </div>

      {/* Mobile: cart + hamburger */}
      <div className="inline-flex md:hidden items-center gap-4">
        <CartNavItem />
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl hover:text-darkOrange hoverEffect"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 bg-accentWhite z-40 md:hidden overflow-y-auto border-t border-lightText/20 shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {navBarItems?.map((item, index) => (
              <Link
                key={index}
                href={item?.link}
                onClick={close}
                className="navBarItem py-4 border-b border-lightText/10 text-base"
              >
                {item?.title}
              </Link>
            ))}
            <div className="py-4 border-b border-lightText/10">
              <AuthSection mobile />
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
