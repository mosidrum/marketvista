"use client";

import { useSelector } from "react-redux";
import { StoreState } from "../../types";
import { CartItem } from "./CartItem";

export const CartContainer = () => {
  const { cart } = useSelector((state: StoreState) => state?.marketVista);

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          <CartItem />
        </div>
      ) : (
        <div>No product</div>
      )}
    </div>
  );
};
