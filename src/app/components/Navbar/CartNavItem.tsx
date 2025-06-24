"use client";

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../types";
import { RiShoppingCart2Fill } from "react-icons/ri";

export const CartNavItem = () => {
  const { cart } = useSelector((state: StoreState) => state?.marketVista);

  return (
    <Link href="/cart" className="navBarItem relative flex items-center gap-2">
      <RiShoppingCart2Fill className="text-xl" />
      <span>Cart</span>
      <span className="absolute -top-2 -right-2 bg-darkOrange text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
        {cart.length > 0 ? cart.length : 0}
      </span>
    </Link>
  );
}; 